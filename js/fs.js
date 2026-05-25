// Virtual File System for macOS Web OS

export const mockFS = {
  name: '~',
  type: 'dir',
  children: {
    'Desktop': {
      type: 'dir',
      children: {
        'Welcome.txt': { 
          type: 'file', 
          content: 'Welcome to macOS Web OS!\n\nThis is a premium, high-fidelity replica of macOS built from scratch using modern web technologies.\n\nExplore and enjoy: \n- Fully drag-and-drop window manager\n- Dock icon magnification and active states\n- Interactive Terminal with multiple utilities (try neofetch, theme, matrix!)\n- LocalStorage-backed Notes app\n- Working macOS calculator\n- Control Center display/volume controls\n- Custom wallpaper switching in System Settings' 
        },
        'System_Specs.txt': { 
          type: 'file', 
          content: 'SYSTEM SPECIFICATIONS:\n----------------------\n- Core Chip: Apple M3 Ultra (Virtual Stack)\n- Graphics Architecture: 76-core GPU Core Custom Array\n- Unified Memory: 128 GB LPDDR5 Memory Space\n- Boot Storage: Macintosh HD SSD NVMe 4TB\n- Virtual Display: Retina display 3200x1800 Super-Res\n- Clock Speed: 4.05 GHz Octa-Performance Cores' 
        }
      }
    },
    'Documents': {
      type: 'dir',
      children: {
        'Todo.txt': { 
          type: 'file', 
          content: 'MY OS TODO LIST:\n-----------------\n[x] Setup premium glassmorphism styling\n[x] Implement startup lock screen transition\n[x] Write startup chime sound\n[x] Finish window positioning and layers\n[ ] Create custom mini-games in Terminal\n[ ] Integrate custom weather API coordinates widget' 
        },
        'Developer_Readme.md': { 
          type: 'file', 
          content: '# macOS Web OS Engine v15\n\nThis engine represents modular architecture using Vanilla ES6 scripting. Global listeners manage drag/focus bounds, while separate components handle calculations, inputs, and Control Center sliders.' 
        }
      }
    },
    'Downloads': {
      type: 'dir',
      children: {
        'README_First.txt': { 
          type: 'file', 
          content: 'Thank you for loading this macOS Web edition!\n\nThis project is fully designed and optimized. If you experience any sizing hiccups, double-click window header bars to auto-maximize!' 
        }
      }
    },
    'System': {
      type: 'dir',
      children: {
        'BuildInfo.txt': { 
          type: 'file', 
          content: 'Build: 15A3445-WebOS\nDate: May 2026\nDeveloper: Vedant Bhatnagar\nBranch: Main/Release' 
        }
      }
    }
  }
};

/**
 * Traverses the virtual file system tree and returns the node at the specified path array
 * @param {string[]} pathArray - Array representing directory hops (e.g. ['Desktop'])
 * @returns {object|null} The filesystem node or null if not found
 */
export function getNodeByPath(pathArray) {
  let current = mockFS;
  
  for (const part of pathArray) {
    if (part === '~' || part === '') continue;
    if (current.type !== 'dir' || !current.children[part]) {
      return null;
    }
    current = current.children[part];
  }
  
  return current;
}

/**
 * Creates a new directory inside the parent directory in the virtual file system
 * @param {string[]} parentPathArray - Path array of the parent directory
 * @returns {string|null} The folder name that was created, or null on failure
 */
export function createNewFolderInFS(parentPathArray) {
  const parentNode = getNodeByPath(parentPathArray);
  if (!parentNode || parentNode.type !== 'dir') return null;
  
  let baseName = 'Untitled Folder';
  let folderName = baseName;
  let counter = 2;
  
  while (parentNode.children[folderName]) {
    folderName = `${baseName} ${counter}`;
    counter++;
  }
  
  parentNode.children[folderName] = {
    type: 'dir',
    children: {}
  };
  
  // Dispatch a custom filesystem change event
  window.dispatchEvent(new CustomEvent('fs-change'));
  
  return folderName;
}
