// macOS Spotlight Search & Apple Intelligence Controller Module
import { mockFS } from './fs.js';
import { createWindow } from './window.js';

let activeIndex = -1;
let currentResults = [];

/**
 * Initializes the Spotlight Search overlay, key listeners, triggers, and result rendering
 */
export function initSpotlight() {
  const overlay = document.getElementById('spotlight-overlay');
  const input = document.getElementById('spotlight-input');
  const trigger = document.getElementById('spotlight-trigger');

  if (!overlay || !input) return;

  // A. Toggle Spotlight via Menu Bar Search Icon
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSpotlight();
    });
  }

  // B. Toggle via global Cmd + Space (or Ctrl + Space fallback)
  document.addEventListener('keydown', (e) => {
    const isCmd = e.metaKey || e.ctrlKey;
    if (isCmd && e.key === ' ') {
      e.preventDefault();
      toggleSpotlight();
    } else if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeSpotlight();
    }
  });

  // C. Close when clicking background backdrop
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeSpotlight();
    }
  });

  // D. Search Input Handler
  input.addEventListener('input', () => {
    const query = input.value.trim();
    performSearch(query);
  });

  // E. Keyboard Navigation inside Spotlight results
  input.addEventListener('keydown', (e) => {
    const container = document.getElementById('spotlight-container');
    const resultElements = document.querySelectorAll('.spotlight-result-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (resultElements.length === 0) return;
      activeIndex = (activeIndex + 1) % resultElements.length;
      updateActiveItem(resultElements);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (resultElements.length === 0) return;
      activeIndex = (activeIndex - 1 + resultElements.length) % resultElements.length;
      updateActiveItem(resultElements);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < currentResults.length) {
        triggerResult(currentResults[activeIndex]);
      } else if (queryHasCalculation(input.value)) {
        // Evaluate math instantly
        const mathResult = evaluateMath(input.value);
        input.value = mathResult;
        performSearch(mathResult);
      } else if (input.value.trim().length > 0) {
        // Trigger Apple Intelligence
        triggerAppleIntelligenceQuery(input.value.trim());
      }
    }
  });
}

function toggleSpotlight() {
  const overlay = document.getElementById('spotlight-overlay');
  const input = document.getElementById('spotlight-input');
  
  if (!overlay || !input) return;

  const isHidden = overlay.classList.contains('hidden');
  
  if (isHidden) {
    // Open Spotlight
    overlay.classList.remove('hidden');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    input.value = '';
    input.focus();
    performSearch('');
    
    // Close other dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = '');
    const cc = document.getElementById('control-center-panel');
    if (cc) cc.classList.add('hidden');
  } else {
    closeSpotlight();
  }
}

export function closeSpotlight() {
  const overlay = document.getElementById('spotlight-overlay');
  const container = document.getElementById('spotlight-container');
  if (!overlay) return;
  
  overlay.style.opacity = '0';
  if (container) container.classList.remove('ai-active');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 200);
}

/**
 * Searches virtual directories and app names
 */
function performSearch(query) {
  const resultsContainer = document.getElementById('spotlight-results');
  const container = document.getElementById('spotlight-container');
  if (!resultsContainer || !container) return;

  resultsContainer.innerHTML = '';
  activeIndex = -1;
  currentResults = [];

  if (container) container.classList.remove('ai-active');

  if (!query) {
    // Render top default suggestions (Top Hits / Quick Launches)
    renderDefaultSuggestions(resultsContainer);
    return;
  }

  // 1. Math Calculation Evaluator
  if (queryHasCalculation(query)) {
    const mathResult = evaluateMath(query);
    if (mathResult !== null) {
      const mathItem = {
        title: `= ${mathResult}`,
        desc: 'Calculator Formula Hit',
        icon: 'calculator',
        action: () => {
          const input = document.getElementById('spotlight-input');
          if (input) {
            input.value = mathResult;
            performSearch(mathResult);
          }
        }
      };
      currentResults.push(mathItem);
      renderResultItem(resultsContainer, mathItem, 0);
    }
  }

  // 2. Apps Search
  const apps = [
    { title: 'Finder', desc: 'macOS File Manager', icon: 'folder', appId: 'finder' },
    { title: 'Safari', desc: 'Liquid Glass Web Browser', icon: 'compass', appId: 'safari' },
    { title: 'Terminal', desc: 'Virtual Developer Shell', icon: 'terminal', appId: 'terminal' },
    { title: 'Notes', desc: 'Autosaved Workspace Memo', icon: 'file-text', appId: 'notes' },
    { title: 'Calculator', desc: 'Mathematic operations', icon: 'calculator', appId: 'calculator' },
    { title: 'Games', desc: 'Tahoe Retro Arcade Platform', icon: 'gamepad-2', appId: 'games' },
    { title: 'System Settings', desc: 'Liquid customizer console', icon: 'sliders', appId: 'settings' }
  ];

  const matchedApps = apps.filter(app => app.title.toLowerCase().includes(query.toLowerCase()));
  if (matchedApps.length > 0) {
    const appHeader = document.createElement('div');
    appHeader.className = 'spotlight-section-header';
    appHeader.textContent = 'Applications';
    resultsContainer.appendChild(appHeader);

    matchedApps.forEach(app => {
      const item = {
        title: app.title,
        desc: app.desc,
        icon: app.icon,
        action: () => {
          closeSpotlight();
          launchAppById(app.appId);
        }
      };
      currentResults.push(item);
      renderResultItem(resultsContainer, item, currentResults.length - 1);
    });
  }

  // 3. Virtual File System Search
  const fileResults = [];
  recursiveFileSearch(mockFS, query, ['~'], fileResults);

  if (fileResults.length > 0) {
    const fileHeader = document.createElement('div');
    fileHeader.className = 'spotlight-section-header';
    fileHeader.textContent = 'Documents & Files';
    resultsContainer.appendChild(fileHeader);

    fileResults.slice(0, 5).forEach(file => {
      const item = {
        title: file.name,
        desc: `Path: ${file.path}`,
        icon: file.type === 'file' ? 'file-text' : 'folder',
        action: () => {
          closeSpotlight();
          if (file.type === 'file') {
            alertFileViewer(file.name, file.content);
          } else {
            launchAppById('finder');
          }
        }
      };
      currentResults.push(item);
      renderResultItem(resultsContainer, item, currentResults.length - 1);
    });
  }

  // 4. Apple Intelligence Simulated Assistant Offer
  if (query.length > 2) {
    // Add shimmering glow animation on input border
    container.classList.add('ai-active');

    const aiHeader = document.createElement('div');
    aiHeader.className = 'spotlight-section-header';
    aiHeader.textContent = 'Apple Intelligence';
    resultsContainer.appendChild(aiHeader);

    const aiItem = {
      title: `Ask Apple Intelligence: "${query}"`,
      desc: 'Synthetic neural answers in Tahoe Core',
      icon: 'sparkles',
      action: () => {
        triggerAppleIntelligenceQuery(query);
      }
    };
    currentResults.push(aiItem);
    renderResultItem(resultsContainer, aiItem, currentResults.length - 1);
  }

  if (currentResults.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'spotlight-results-empty';
    empty.innerHTML = `No results found for "<strong>${query}</strong>"`;
    resultsContainer.appendChild(empty);
  }

  if (window.lucide) window.lucide.createIcons();
}

function renderDefaultSuggestions(container) {
  const suggestions = [
    { title: 'Safari Browser', desc: 'Launch Web Browser', icon: 'compass', action: () => { closeSpotlight(); launchAppById('safari'); } },
    { title: 'Tahoe Skiing Adventure', desc: 'WWDC Games app arcade', icon: 'gamepad-2', action: () => { closeSpotlight(); launchAppById('games'); } },
    { title: 'Terminal Bash', desc: 'Open developer diagnostics', icon: 'terminal', action: () => { closeSpotlight(); launchAppById('terminal'); } },
    { title: 'Ask Siri...', desc: 'Start an Apple Intelligence dialogue', icon: 'sparkles', action: () => { closeSpotlight(); triggerSiriPanelOpen(); } }
  ];

  const header = document.createElement('div');
  header.className = 'spotlight-section-header';
  header.textContent = 'Top Suggestions';
  container.appendChild(header);

  suggestions.forEach((sug, index) => {
    const item = {
      title: sug.title,
      desc: sug.desc,
      icon: sug.icon,
      action: sug.action
    };
    currentResults.push(item);
    renderResultItem(container, item, index);
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderResultItem(parentContainer, item, index) {
  const el = document.createElement('div');
  el.className = `spotlight-result-item ${index === activeIndex ? 'selected' : ''}`;
  el.dataset.index = index;

  el.innerHTML = `
    <i data-lucide="${item.icon}" class="spotlight-result-icon"></i>
    <div class="spotlight-result-info">
      <span class="spotlight-result-title">${item.title}</span>
      <span class="spotlight-result-desc">${item.desc}</span>
    </div>
  `;

  el.addEventListener('click', () => {
    triggerResult(item);
  });

  parentContainer.appendChild(el);
}

function updateActiveItem(elements) {
  elements.forEach((el, index) => {
    if (index === activeIndex) {
      el.classList.add('selected');
      el.scrollIntoView({ block: 'nearest' });
    } else {
      el.classList.remove('selected');
    }
  });
}

function triggerResult(item) {
  if (item && typeof item.action === 'function') {
    item.action();
  }
}

function recursiveFileSearch(node, query, pathArray, results) {
  if (node.type === 'dir') {
    Object.entries(node.children).forEach(([name, child]) => {
      const newPath = [...pathArray, name];
      if (name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ name, path: newPath.join('/'), type: child.type, content: child.content || '' });
      }
      recursiveFileSearch(child, query, newPath, results);
    });
  }
}

function queryHasCalculation(str) {
  // Matches basic arithmetic operations e.g. 10 * 5, 230 - 45 + 1.2
  return /^[0-9+\-*/\s.()]+$/.test(str) && /[+\-*/]/.test(str);
}

function evaluateMath(str) {
  try {
    // Sanitized eval fallback for calculations
    const cleanStr = str.replace(/[^0-9+\-*/\s.()]/g, '');
    const res = Function(`"use strict"; return (${cleanStr})`)();
    if (typeof res === 'number' && !isNaN(res)) {
      return String(res);
    }
  } catch (err) {}
  return null;
}

function launchAppById(appId) {
  // Fire dock icon launch triggers
  const dockItem = document.querySelector(`.dock-item-wrapper[data-app="${appId}"]`);
  if (dockItem) {
    const icon = dockItem.querySelector('.dock-item');
    if (icon) icon.click();
  }
}

function triggerSiriPanelOpen() {
  const siriPanel = document.getElementById('siri-panel');
  if (siriPanel) {
    siriPanel.classList.remove('hidden');
    const input = document.getElementById('siri-input-box');
    if (input) input.focus();
  }
}

function triggerAppleIntelligenceQuery(query) {
  closeSpotlight();
  triggerSiriPanelOpen();
  
  const siriInput = document.getElementById('siri-input-box');
  const sendBtn = document.getElementById('siri-send-btn');
  
  if (siriInput && sendBtn) {
    siriInput.value = query;
    sendBtn.click();
  }
}

function alertFileViewer(title, content) {
  const viewerId = `viewer-${Date.now()}`;
  const htmlPayload = `
    <div style="padding: 16px; font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: var(--text-primary); overflow: auto; height: 100%;">
      <h4 style="margin-bottom:12px; font-weight:700;">${title}</h4>
      <p style="white-space: pre-wrap; font-family: inherit;">${content}</p>
    </div>
  `;
  createWindow(viewerId, `Text Editor - ${title}`, htmlPayload, { width: 420, height: 280 });
}
