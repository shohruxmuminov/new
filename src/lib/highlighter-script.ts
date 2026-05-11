export const highlighterScript = `
(function() {
  const style = document.createElement('style');
  style.textContent = \`
    .ielts-highlight {
      background-color: #ffff00 !important;
      color: black !important;
    }
    #ielts-context-menu {
      position: fixed;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 8px;
      z-index: 10000;
      display: none;
      padding: 4px;
      min-width: 150px;
    }
    .ielts-menu-item {
      padding: 8px 12px;
      cursor: pointer;
      font-family: sans-serif;
      font-size: 14px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #333;
    }
    .ielts-menu-item:hover {
      background: #f0f0f0;
    }
  \`;
  document.head.appendChild(style);

  const menu = document.createElement('div');
  menu.id = 'ielts-context-menu';
  menu.innerHTML = \`
    <div class="ielts-menu-item" id="ielts-highlight-btn">
      <span style="width: 16px; height: 16px; background: #ffff00; border: 1px solid #ccc; border-radius: 2px;"></span>
      Highlight
    </div>
    <div class="ielts-menu-item" id="ielts-clear-btn">
      <span style="font-size: 16px;">✕</span>
      Clear Highlight
    </div>
  \`;
  document.body.appendChild(menu);

  let currentSelection = null;

  document.addEventListener('contextmenu', (e) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      e.preventDefault();
      currentSelection = selection.getRangeAt(0).cloneRange();
      menu.style.display = 'block';
      menu.style.left = e.clientX + 'px';
      menu.style.top = e.clientY + 'px';
    } else {
      // Check if clicking on an existing highlight to clear it
      const target = e.target;
      if (target.classList.contains('ielts-highlight')) {
        e.preventDefault();
        currentSelection = target;
        menu.style.display = 'block';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';
      } else {
        menu.style.display = 'none';
      }
    }
  });

  document.addEventListener('click', () => {
    menu.style.display = 'none';
  });

  document.getElementById('ielts-highlight-btn').addEventListener('click', () => {
    if (currentSelection instanceof Range) {
      const span = document.createElement('span');
      span.className = 'ielts-highlight';
      try {
        currentSelection.surroundContents(span);
      } catch (e) {
        console.error('Highlight failed', e);
      }
    }
    window.getSelection().removeAllRanges();
    menu.style.display = 'none';
  });

  document.getElementById('ielts-clear-btn').addEventListener('click', () => {
    if (currentSelection instanceof HTMLElement && currentSelection.classList.contains('ielts-highlight')) {
      const parent = currentSelection.parentNode;
      while (currentSelection.firstChild) {
        parent.insertBefore(currentSelection.firstChild, currentSelection);
      }
      parent.removeChild(currentSelection);
    }
    menu.style.display = 'none';
  });
})();
`;
