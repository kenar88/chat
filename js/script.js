'use strict'

// Динамическое изменение высоты <textarea> под контент

const textareaResize = (event, lineHeight, minLineCount) => {
  const minLineHeight = minLineCount * lineHeight,
        obj = event.target, 
        div = document.getElementById(obj.id + '-div');

  div.innerHTML = obj.value;

  let objHeight = div.offsetHeight;

  if (event.keyCode == 13) {
    objHeight += lineHeight;
  } else if (objHeight < minLineHeight) {
    objHeight = minLineHeight;
  }

  obj.style.height = objHeight + 'px';
}
// --- --- ---

