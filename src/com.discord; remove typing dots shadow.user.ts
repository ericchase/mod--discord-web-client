// ==UserScript==
// @name        com.discord; remove typing dots shadow
// @match       https://discord.com/*
// @version     1.0.0
// @description 2025-09-13
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

const observer = WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'div[class*=chatGradientBase]',
});
observer.subscribe((element) => {
  if (element instanceof HTMLDivElement) {
    element.style.setProperty('display', 'none');
  }
});
