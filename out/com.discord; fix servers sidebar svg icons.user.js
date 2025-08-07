// ==UserScript==
// @name        com.discord: fix servers sidebar svg icons
// @match       https://discord.com/*
// @version     1.0
// @description 5/1/2025, 1:12:12 AM
// @run-at      document-start
// @grant       none
// ==/UserScript==

// src/lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.ts
class Class_WebPlatform_DOM_Element_Added_Observer_Class {
  constructor(config) {
    config.include_existing_elements ??= true;
    config.options ??= {};
    config.options.subtree ??= true;
    config.source ??= document.documentElement;
    this.mutationObserver = new MutationObserver((mutationRecords) => {
      for (const record of mutationRecords) {
        if (record.target instanceof Element && record.target.matches(config.selector)) {
          this.send(record.target);
        }
        const treeWalker = document.createTreeWalker(record.target, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
          if (treeWalker.currentNode.matches(config.selector)) {
            this.send(treeWalker.currentNode);
          }
        }
      }
    });
    this.mutationObserver.observe(config.source, {
      childList: true,
      subtree: config.options.subtree ?? true
    });
    if (config.include_existing_elements === true) {
      const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
      while (treeWalker.nextNode()) {
        if (treeWalker.currentNode.matches(config.selector)) {
          this.send(treeWalker.currentNode);
        }
      }
    }
  }
  disconnect() {
    this.mutationObserver.disconnect();
    for (const callback of this.subscriptionSet) {
      this.subscriptionSet.delete(callback);
    }
  }
  subscribe(callback) {
    this.subscriptionSet.add(callback);
    let abort = false;
    for (const element of this.matchSet) {
      callback(element, () => {
        this.subscriptionSet.delete(callback);
        abort = true;
      });
      if (abort)
        return () => {};
    }
    return () => {
      this.subscriptionSet.delete(callback);
    };
  }
  mutationObserver;
  matchSet = new Set;
  subscriptionSet = new Set;
  send(element) {
    if (!this.matchSet.has(element)) {
      this.matchSet.add(element);
      for (const callback of this.subscriptionSet) {
        callback(element, () => {
          this.subscriptionSet.delete(callback);
        });
      }
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
  if ("viewBox" in element) {
    const viewBox = element.viewBox;
    viewBox.baseVal.width = 48;
    viewBox.baseVal.height = 48;
    viewBox.baseVal.x = 0;
    viewBox.baseVal.y = 0;
  }
  for (const mask of element.querySelectorAll("mask")) {
    mask.remove();
  }
}
