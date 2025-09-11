// ==UserScript==
// @name        com.discord; fix servers sidebar svg icons
// @match       https://discord.com/*
// @version     1.0
// @description 5/1/2025, 1:12:12 AM
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
              if (tree_walker.currentNode instanceof Element && tree_walker.currentNode.matches(this.config.selector) === true) {
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
            if (tree_walker.currentNode instanceof Element && tree_walker.currentNode.matches(this.config.selector) === true) {
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
          if (child instanceof Element && child.matches(this.config.selector) === true) {
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

// src/com.discord; fix servers sidebar svg icons.user.ts
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="tutorialContainer_"] >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Direct Messages"] >div >div[class*="listItem_"] >div[class*="pill_"] +div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"][class*="isExpanded_"] >ul >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);
function mutate(element) {
  if ('viewBox' in element) {
    const viewBox = element.viewBox;
    viewBox.baseVal.width = 48;
    viewBox.baseVal.height = 48;
    viewBox.baseVal.x = 0;
    viewBox.baseVal.y = 0;
  }
  for (const mask of element.querySelectorAll('mask')) {
    mask.remove();
  }
}
