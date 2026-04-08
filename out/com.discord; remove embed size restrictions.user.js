// ==UserScript==
// @name        com.discord; remove embed size restrictions
// @match       https://discord.com/*
// @version     1.0.0
// @description 2026-04-08
// @run-at      document-start
// @grant       none
// ==/UserScript==

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

// src/lib/ericchase/WebPlatform_Utility_Ancestor_Node.ts
function WebPlatform_Utility_Get_Ancestor_List(node) {
  const list = [];
  let parent = node.parentNode;
  while (parent !== null) {
    list.push(parent);
    parent = parent.parentNode;
  }
  return list.reverse();
}

// src/com.discord; remove embed size restrictions.user.ts
WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '[class*=messageListItem_] iframe',
}).subscribe(async (iframe) => {
  if (iframe instanceof HTMLIFrameElement) {
    iframe.width = '1920';
    iframe.height = '1080';
    iframe.style.width = '1920px';
    iframe.style.height = '1080px';
    iframe.style.maxWidth = '100%';
    iframe.style.maxHeight = '600px';
    iframe.style.aspectRatio = '1920 / 1080';
    iframe.style.position = 'static';
    iframe.parentElement.style.paddingBottom = '0';
    const container = iframe.closest('[class*=messageListItem_]');
    const article = iframe.closest('article');
    if (isStyleElement(container) && isStyleElement(article)) {
      for (const ancestor of WebPlatform_Utility_Get_Ancestor_List(iframe).reverse()) {
        if (isStyleElement(ancestor)) {
          ancestor.style.width = 'auto';
          ancestor.style.height = 'auto';
          ancestor.style.maxWidth = 'max-content';
          ancestor.style.maxHeight = 'max-content';
          ancestor.style.minWidth = 'none';
          ancestor.style.minHeight = 'none';
        }
        if (ancestor === container) {
          break;
        }
      }
    }
  }
});
