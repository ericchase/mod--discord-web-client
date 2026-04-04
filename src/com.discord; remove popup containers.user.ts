// ==UserScript==
// @name        com.discord; remove popup containers
// @match       https://discord.com/*
// @version     1.0.0
// @description 2026-04-04
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

const observer = WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'div[class*=coachmarkContainer_]',
});
observer.subscribe((element) => {
  if (element instanceof HTMLDivElement) {
    if (element.parentElement?.className.includes('container_')) {
      if (element.parentElement?.parentElement?.className.includes('layerContainer_')) {
        element.parentElement?.parentElement?.remove();
      } else {
        element.parentElement?.remove();
      }
    } else {
      element.remove();
    }
  }
});
