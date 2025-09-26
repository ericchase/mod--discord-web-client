// ==UserScript==
// @name        com.discord; remove members button in server settings
// @match       https://discord.com/*
// @version     1.0.0
// @description 2025-09-25
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

const observer1 = WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'div[aria-label="Members"] > div[class*="rowContainer"] > div',
});
observer1.subscribe((element1) => {
  if (element1.textContent === 'Members') {
    element1.parentElement?.parentElement?.remove();
  }
});
