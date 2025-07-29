// ==UserScript==
// @name        remove stylesheets
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 5/26/2025, 3:35:01 PM
// ==/UserScript==

import { ElementAddedObserver } from './lib/ericchase/Platform/Web/DOM/MutationObserver/ElementAdded.js';

new ElementAddedObserver({ selector: 'link' }).subscribe(mutate);

function mutate(element: Element) {
  if (element instanceof HTMLLinkElement) {
    if (element.rel === 'stylesheet') {
      console.log(element.href);
      if (element.href.includes('12633.79a9dbdfb8f3b47b.css')) {
        console.log('removing', element.href);
        element.remove();
      }
    }
  }
}
