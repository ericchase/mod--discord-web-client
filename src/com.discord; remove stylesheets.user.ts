// ==UserScript==
// @name        com.discord: remove stylesheets
// @match       https://discord.com/*
// @version     1.0
// @description 5/26/2025, 3:35:01 PM
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'link' }).subscribe(mutate);

function mutate(element: Element) {
  if (element instanceof HTMLLinkElement) {
    if (element.rel === 'stylesheet') {
      console.log(element.href);
      // if (element.href.includes("12633.4aef715a81018f00.css")) {
      if (element.href.includes('12633.79a9dbdfb8f3b47b.css')) {
        console.log('removing', element.href);
        element.remove();
      }
    }
  }
}
