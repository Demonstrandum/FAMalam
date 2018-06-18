const get_clock = () => {
  let c = Math.abs($('input[name=clock]').val() - 0) + 0.001;
  if (c > 21) {
    $('input[name=clock]').val("20");
    get_clock();
  }
  return c;
}

const handle_input = interval => {
  interval.disable();
  let input_box = $('input[name=input]')
  input_box.prop('disabled', false);
  input_box.focus();

  let input;
  const wait = () => {
    console.log('waiting...');
    if (!input_box.val()) window.setTimeout(wait, 5);
    else {
      input = input_box.val();
      interval.enable();
      input_box
        .val('')
        .attr('placeholder', input)
        .blur()
        .prop('disabled', true);

      $.ajax({
        type: 'POST',
        url: '/program/input',
        async: false,
        data: { input: input + " ...in" },
        error: (s, e) => {
          console.log(
            'An error occured in posting input!\nERROR: ',
            s, '\n\n', e
          );
        }
      });
      return;
    }
  }
  wait();
  input_box.attr('placeholder', '');
  return input;
}

class ClockInterval {
  constructor(f, speed) {
    this.lambda = f;
    this.speed = speed;
    this.interval = null;
  }
  enable(speed=this.speed) {
    this.speed = speed;
    this.interval = window.setInterval(this.lambda, (1.0 / speed) * 1000);
  }
  disable() {
    window.clearInterval(this.interval);
  }
}


const stepper = () => {
  let clock = get_clock();
  let step_interval;

  const response = () => {
    let step = {};
    $.ajax({
        url: "/program/step.json",
        async: false,
        dataType: 'json',
        success: (data) => {
            step = data;
        }
    });
    if (step['ERROR'])     step_interval.disable();
    if (step['inputting']) handle_input(step_interval);
    return step;
  }

  const update = () => {
    let step = response();
    console.log("Errors: ", step['ERROR']);
    console.log("Step:   ", step);
    draw_step(step);
  }


  step_interval = new ClockInterval(update, clock)
  step_interval.enable();
  $('input[name=clock]').on("change paste keyup", () => {
    clock = get_clock();
    step_interval.disable();
    step_interval.enable(clock);
  });
}
