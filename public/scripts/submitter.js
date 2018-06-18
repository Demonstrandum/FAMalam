$(document).ready(() => {
  let clock = get_clock();

  $('form').submit(() => {
    $.ajax({
      type: 'POST',
      url: '/program',
      async: false,
      data: {
        title: $('input[name=title]').val(),
        code:  $('textarea[name=code]').val(),
        alloc: get_alloc(),
        clock: clock,
      },
      error: () => {
        console.log('Code could not be sent!');
      },
      success: (m) => {
        stepper();
      }
    });
    return false;
  });
  $('#submit').click(() => {
    $('form').submit();
    return false;
  });
})
