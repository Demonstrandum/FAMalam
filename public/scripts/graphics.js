const pad = (n, width, char) => {
  char = char || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(char) + n;
}

const draw_step = (step) => {
  if (step['ERROR']) {
    $('#alloc').removeAttr('disabled');
    return;
  }
  $('#alloc').prop('disabled', true);
  for (let i = 0; i < step['ram'].length; i++) {
    let elem = $('.address:nth-child(' + (i + 1) + ') > .value')
    if (elem.html() != '' + step['ram'][i]) {
      elem.empty();
      elem.html(step['ram'][i])
      elem.stop().css({ backgroundColor: '#ffff9c' });
      elem.animate({ backgroundColor: '#ffffff' }, 3200 / get_clock());
    }
  }

  let reg_elem = $('.cpu .registers');
  reg_elem.empty();
  for (let i = 0; i < Object.keys(step['registers']).length; i++) {
    reg_elem.append(
      `<div class="register">
        <div class="name">`
          + Object.keys(step['registers'])[i]
      + `</div>
         <div class="value">`
         + Object.values(step['registers'])[i]
      + `</div>
      </div>`);
  }

  let out_elem = $('.cpu .output');
  if (step['output'] != '') {
    out_elem.append(`<div>` + step['output'] + `</div>`);
    out_elem.animate({ scrollTop: out_elem.prop("scrollHeight")}, 100);
  }
}

let get_alloc = () => {
  return $('#alloc').val() - 0;
}

draw_ram = () => {
  let alloc = get_alloc();
  $('.ram').empty();
  for (let i = 0; i < get_alloc(); i++) {
    $('.ram').append(`
      <div class="address">
        <div class="number">` + pad(i, 3) + `</div>
        <div class="value">NULL</div>
      </div>
    `);
    $('.address:nth-child(' + (i + 1) + ') .value').css({
      width: (500 / alloc) + 'em'
    });
    $('.address:nth-child(' + (i + 1) + ') .number').css({
      width: (200 / alloc) + 'em'
    });
  }
}
$('#alloc').change(draw_ram);

$(document).ready(() => {
  // disable inputs
  $('input[name=input]').prop('disabled', true);
  // Initiate RAM
  draw_ram();
});

// Textbox tab handling
let tab_level = 0;
$(document).delegate('#code', 'keydown', function(e) {
  let tab = "    ";

  let key_code = e.keyCode || e.which;
  if (key_code == 9 && tab) {  // Tab key
    let start = this.selectionStart;
    let end = this.selectionEnd;
    $(this).val($(this).val().substring(0, start)
      + tab
      + $(this).val().substring(end));
    this.selectionStart = this.selectionEnd = start + tab.length;
    tab_level++;
    return false
  }
  if (key_code == 13) {  // Autotab on enter
    let start = this.selectionStart;
    let end = this.selectionEnd;
    $(this).val($(this).val().substring(0, start)
      + "\n"
      + (new Array(tab.length * tab_level + 1).join(tab))
      + $(this).val().substring(end));
    this.selectionStart = this.selectionEnd = 1 + start + tab.length * tab_level;
    return false;
  }
  if (key_code == 8) {  // Backspace key
    let start = this.selectionStart;
    let end = this.selectionEnd;
    if ($(this).val().substring(start, start - tab.length) == tab) {
      $(this).val($(this).val().substring(0, start-tab.length)
        + $(this).val().substring(end));
      this.selectionStart = this.selectionEnd = start - tab.length;
      if (tab_level > 0) { tab_level--; }
      return false;
    }
  }
});
