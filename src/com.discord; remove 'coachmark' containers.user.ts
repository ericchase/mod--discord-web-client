// ==UserScript==
// @name        com.discord; remove 'coachmark' containers
// @match       https://discord.com/*
// @version     1.0.1
// @description 2026-04-04
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'div[class*=coachmarkContainer_]',
}).subscribe((element) => {
  if (element.parentElement?.className?.includes?.('container_')) {
    element.parentElement.style.display = 'none';
  } else {
    element.style.display = 'none';
  }
});
