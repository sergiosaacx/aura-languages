(function(){
  var _range = null;
  var toolbar = document.getElementById('nm-color-toolbar');
  if (!toolbar) return;

  function showToolbar() {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) { hideToolbar(); return; }
    var r = sel.getRangeAt(0);
    var editor = document.getElementById('nm-titulo');
    if (!editor || !editor.contains(r.commonAncestorContainer)) { hideToolbar(); return; }
    _range = r.cloneRange();
    var rect = r.getBoundingClientRect();
    toolbar.style.display = 'flex';
    var tbW = toolbar.offsetWidth || 260;
    var left = Math.min(rect.left, window.innerWidth - tbW - 10);
    toolbar.style.left = Math.max(8, left) + 'px';
    toolbar.style.top  = (rect.top + window.scrollY - (toolbar.offsetHeight || 44) - 8) + 'px';
  }

  function hideToolbar() { toolbar.style.display = 'none'; }

  function restoreRange() {
    if (!_range) return false;
    var editor = document.getElementById('nm-titulo');
    if (!editor) return false;
    editor.focus();
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(_range);
    return true;
  }

  window.applyTitleColor = function(color) {
    if (!restoreRange()) return;
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    var r = sel.getRangeAt(0);
    if (!color) {
      var plain = r.toString();
      r.deleteContents();
      r.insertNode(document.createTextNode(plain));
    } else {
      var span = document.createElement('span');
      span.style.color = color;
      try { r.surroundContents(span); }
      catch(e) { var frag = r.extractContents(); span.appendChild(frag); r.insertNode(span); }
    }
    _range = null;
    hideToolbar();
  };

  document.getElementById('nct-custom').addEventListener('change', function(){
    applyTitleColor(this.value);
  });

  document.addEventListener('mouseup', function(e) {
    setTimeout(function() {
      var editor = document.getElementById('nm-titulo');
      if (editor && editor.contains(e.target)) { showToolbar(); return; }
      if (!toolbar.contains(e.target)) {
        var sel = window.getSelection();
        if (!sel || sel.isCollapsed) hideToolbar();
      }
    }, 15);
  });

  document.addEventListener('keyup', function(e) {
    var editor = document.getElementById('nm-titulo');
    if (editor && (editor === e.target || editor.contains(e.target))) showToolbar();
  });

  document.addEventListener('mousedown', function(e) {
    if (toolbar.contains(e.target)) return;
    var sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    hideToolbar();
  });
})();
