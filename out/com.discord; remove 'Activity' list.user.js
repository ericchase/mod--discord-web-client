// ==UserScript==
// @name        com.discord; remove 'Activity' list
// @match       https://discord.com/*
// @version     1.0.0
// @description 2025-09-13
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

// src/com.discord; remove 'Activity' list.user.ts
var activity_hidden = false;
WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '[role="list"][aria-label="Members"] > [class*="membersGroup_"]:has(> [class*="headerContainer"])',
}).subscribe((element_activity) => {
  console.log({ element_activity });
  if (activity_hidden !== true) {
    const button_settings = element_activity.querySelector('div[role="button"]');
    if (button_settings instanceof HTMLElement) {
      console.log({ button_settings });
      const observer = WebPlatform_DOM_Element_Added_Observer_Class({
        selector: '#member-list-settings-menu-hide',
      });
      observer.subscribe((element_checkbox) => {
        console.log({ element_checkbox });
        if (element_checkbox instanceof HTMLElement) {
          observer.disconnect();
          if (element_checkbox.getAttribute('aria-checked') !== 'true') {
            element_checkbox.click();
          } else {
            button_settings.click();
          }
          activity_hidden = true;
          element_activity.style.display = 'none';
        }
      });
      button_settings.click();
    }
  } else {
    element_activity.style.display = 'none';
  }
});
