// ==UserScript==
// @name        com.discord; fix 'Servers sidebar' icons
// @match       https://discord.com/*
// @version     1.0.2
// @description 2026-04-04
// @run-at      document-start
// @grant       none
// ==/UserScript==

// src/lib/ericchase/WebPlatform_DOM_ChildList_Observer_Class.ts
class Class_WebPlatform_DOM_ChildList_Observer_Class {
  $mutation_observer;
  $subscription_set = new Set();
  constructor(config) {
    config.options ??= {};
    this.$mutation_observer = new MutationObserver((mutationRecords) => {
      for (const record of mutationRecords) {
        this.$send(record);
      }
    });
    this.$mutation_observer.observe(config.source ?? document.documentElement, {
      childList: true,
      subtree: config.options.subtree ?? true,
    });
  }
  disconnect() {
    this.$mutation_observer.disconnect();
    for (const callback of this.$subscription_set) {
      this.$subscription_set.delete(callback);
    }
  }
  subscribe(callback) {
    this.$subscription_set.add(callback);
    return () => {
      this.$subscription_set.delete(callback);
    };
  }
  $send(record) {
    for (const callback of this.$subscription_set) {
      callback(record, () => {
        this.$subscription_set.delete(callback);
      });
    }
  }
}
function WebPlatform_DOM_ChildList_Observer_Class(config) {
  return new Class_WebPlatform_DOM_ChildList_Observer_Class(config);
}

// src/lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.ts
class Class_WebPlatform_DOM_Element_Added_Observer_Class {
  config;
  $match_set = new Set();
  $mutation_observer;
  $subscription_set = new Set();
  constructor(config) {
    this.config = {
      include_existing_elements: config.include_existing_elements ?? true,
      options: {
        subtree: config.options?.subtree ?? true,
      },
      selector: config.selector,
      source: config.source ?? document.documentElement,
    };
    this.$mutation_observer = new MutationObserver((mutationRecords) => {
      const sent_set = new Set();
      for (const record of mutationRecords) {
        for (const node of record.addedNodes) {
          const tree_walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
          const processCurrentNode = () => {
            if (sent_set.has(tree_walker.currentNode) === false) {
              if (isStyleElement(tree_walker.currentNode) && tree_walker.currentNode.matches(this.config.selector) === true) {
                this.$send(tree_walker.currentNode);
                sent_set.add(tree_walker.currentNode);
              }
            }
          };
          processCurrentNode();
          if (this.config.options.subtree === true) {
            while (tree_walker.nextNode()) {
              processCurrentNode();
            }
          }
        }
      }
    });
    this.$mutation_observer.observe(this.config.source, {
      childList: true,
      subtree: this.config.options.subtree,
    });
    if (this.config.include_existing_elements === true) {
      if (this.config.options.subtree === true) {
        const sent_set = new Set();
        const tree_walker = document.createTreeWalker(this.config.source, NodeFilter.SHOW_ELEMENT);
        const processCurrentNode = () => {
          if (sent_set.has(tree_walker.currentNode) === false) {
            if (isStyleElement(tree_walker.currentNode) && tree_walker.currentNode.matches(this.config.selector) === true) {
              this.$send(tree_walker.currentNode);
              sent_set.add(tree_walker.currentNode);
            }
          }
        };
        while (tree_walker.nextNode()) {
          processCurrentNode();
        }
      } else {
        for (const child of this.config.source.childNodes) {
          if (isStyleElement(child) && child.matches(this.config.selector) === true) {
            this.$send(child);
          }
        }
      }
    }
  }
  disconnect() {
    this.$mutation_observer.disconnect();
    for (const callback of this.$subscription_set) {
      this.$subscription_set.delete(callback);
    }
  }
  subscribe(callback) {
    this.$subscription_set.add(callback);
    let abort = false;
    for (const element of this.$match_set) {
      callback(element, () => {
        this.$subscription_set.delete(callback);
        abort = true;
      });
      if (abort) {
        return () => {};
      }
    }
    return () => {
      this.$subscription_set.delete(callback);
    };
  }
  $send(element) {
    this.$match_set.add(element);
    for (const callback of this.$subscription_set) {
      callback(element, () => {
        this.$subscription_set.delete(callback);
      });
    }
  }
}
function WebPlatform_DOM_Element_Added_Observer_Class(config) {
  return new Class_WebPlatform_DOM_Element_Added_Observer_Class(config);
}
function isStyleElement(node) {
  return node && node.style instanceof CSSStyleDeclaration && node instanceof Element;
}

// src/com.discord; fix 'Servers sidebar' icons.user.ts
WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '[aria-label="Servers sidebar"] [class*=listItem_]',
}).subscribe((element) => {
  processListItem(element);
  WebPlatform_DOM_ChildList_Observer_Class({
    source: element,
  }).subscribe((record) => {
    if (record.addedNodes[0] instanceof Element && record.addedNodes[0].matches('[class*=pill_] *')) {
      record.addedNodes[0].toggleAttribute('data-skip', true);
    } else if (record.removedNodes[0] instanceof Element && record.removedNodes[0].hasAttribute('data-skip')) {
    } else {
      processListItem(element);
    }
  });
});
function processListItem(element) {
  if (element.querySelector('[class*=guildSeparator_]')) {
  } else {
    for (const node of iterateDescendentsInReverseDepth(element)) {
      if (node instanceof SVGMaskElement) {
        node.remove();
        continue;
      }
      if (node.className?.includes?.('folderPreview')) {
        continue;
      }
      _attributes(node);
      if (isStyleElement(node)) {
        const computed = window.getComputedStyle(node);
        _size(node, computed, 'width');
        _size(node, computed, 'height');
        _styles(node, computed);
        _svg(node, computed);
      }
    }
  }
}
function _attributes(node) {
  node.removeAttribute('mask');
}
function _size(node, computed, prop) {
  if (node[prop]?.baseVal?.valueAsString === '40') {
    node[prop].baseVal.valueAsString = '48';
  }
  if (node[prop] === '40') {
    node[prop] = '48';
  }
  if (node[prop] === 40) {
    node[prop] = 48;
  }
  if (computed[prop] === '40px') {
    node.style[prop] = '48px';
  }
}
function _styles(node, computed) {
  if (computed.padding !== '0px') {
    node.style.padding = '0px';
  }
}
function _svg(node, computed) {
  if (node.viewBox?.baseVal?.x === -4) {
    node.viewBox.baseVal.x = 0;
  }
  if (node.viewBox?.baseVal?.y === -4) {
    node.viewBox.baseVal.y = 0;
  }
  if (computed.insetInlineStart === '-4px') {
    node.style.insetInlineStart = '0';
  }
  if (computed.top === '-4px') {
    node.style.top = '0';
  }
}
function* iterateDescendentsInReverseDepth(root) {
  const map = new Map();
  let depth = 0;
  let group = [root];
  while (group.length > 0) {
    const children = [];
    for (let i = 0; i < group.length; i++) {
      children.push(...group[i].children);
    }
    if (children.length > 0) {
      map.set(depth, children);
    }
    depth++;
    group = children;
  }
  for (let i = depth - 1; i >= 0; i--) {
    for (const node of map.get(i) ?? []) {
      yield node;
    }
  }
}
