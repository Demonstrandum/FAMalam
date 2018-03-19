let get_clock = () => {
  let c = Math.abs($('input[name=clock]').val() - 0) + 0.001;
  if (c > 21) {
    $('input[name=clock]').val("20");
    get_clock();
  }
  return c;
}

let stepper = () => {
  let clock = get_clock();
  let clock_clallback;

  let response = () => {
    let step = {};
    $.ajax({
        url: "/program/step.json",
        async: false,
        dataType: 'json',
        success: (data) => {
            step = data;
        }
    });
    if (step['ERROR']) {
      window.clearInterval(clock_clallback);
    }
    return step;
  }

  let update = () => {
    let step = response();
    console.log("Errors: ", step['ERROR']);
    console.log("Step:   ", step);
    draw_step(step);
  }

  clock_clallback = window.setInterval(update, (1.0 / clock) * 1000);
  $('input[name=clock]').on("change paste keyup", () => {
    clock = get_clock();
    window.clearInterval(clock_clallback);
    clock_clallback = window.setInterval(update, (1.0 / clock) * 1000);
  });
}
