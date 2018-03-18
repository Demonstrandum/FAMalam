let draw_step = (step) => {
  if (step['ERROR']) { return; }

}

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
