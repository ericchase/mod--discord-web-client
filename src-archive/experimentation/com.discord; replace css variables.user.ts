// ==UserScript==
// @name        com.discord; replace css variables
// @match       https://discord.com/*
// @version     1.0
// @description 5/26/2025, 3:35:01 PM
// @run-at      document-end
// @grant       GM_addStyle
// ==/UserScript==

import { Async_WebPlatform_DOM_ReadyState_Callback } from '../lib/ericchase/WebPlatform_DOM_ReadyState_Callback.js';

function process(element: Element) {
  if (element instanceof HTMLElement) {
    console.log('processed:', element);
  }
}

const queue: Element[] = [];
let head = 0;
let interval: ReturnType<typeof setInterval> | undefined = undefined;

function processBatch() {
  if (head < queue.length) {
    process(queue[head++]);
  }
  if (head > 1000) {
    queue.splice(0, head);
    head = 0;
  }
  if (head < queue.length) {
  } else {
    clearInterval(interval);
    interval = undefined;
  }
}

Async_WebPlatform_DOM_ReadyState_Callback({
  async load() {
    queue.push(...document.getElementsByTagName('*'));
    if (interval === undefined) {
      interval = setInterval(processBatch, 1);
    }
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1 && node instanceof Element) {
            queue.push(node);
            queue.push(...node.getElementsByTagName('*'));
          }
        }
      }
      if (interval === undefined) {
        interval = setInterval(processBatch, 1);
      }
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  },
});
