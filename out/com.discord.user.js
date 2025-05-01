// ==UserScript==
// @name        discord: fix server svg
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 5/1/2025, 1:12:12 AM
// ==/UserScript==

// src/lib/ericchase/Platform/Web/DOM/MutationObserver/ElementAdded.ts
class ElementAddedObserver {
  constructor({
    source = document.documentElement,
    options = { subtree: true },
    selector,
    includeExistingElements = true
  }) {
    this.mutationObserver = new MutationObserver((mutationRecords) => {
      for (const record of mutationRecords) {
        if (record.target instanceof Element && record.target.matches(selector)) {
          this.send(record.target);
        }
        const treeWalker = document.createTreeWalker(record.target, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
          if (treeWalker.currentNode.matches(selector)) {
            this.send(treeWalker.currentNode);
          }
        }
      }
    });
    this.mutationObserver.observe(source, {
      childList: true,
      subtree: options.subtree ?? true
    });
    if (includeExistingElements === true) {
      const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
      while (treeWalker.nextNode()) {
        if (treeWalker.currentNode.matches(selector)) {
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

// src/com.discord.user.ts
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="tutorialContainer_"] >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Direct Messages"] >div >div[class*="listItem_"] >div[class*="pill_"] +div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"][class*="isExpanded_"] >ul >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);
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
