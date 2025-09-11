// ==UserScript==
// @name        com.discord; replace stylesheets
// @match       https://discord.com/*
// @version     1.0
// @description 5/26/2025, 3:35:01 PM
// @run-at      document-start
// @grant       GM_addStyle
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from '../lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';
import { SERVERHOST } from '../lib/server/info.js';

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'link',
}).subscribe((element, unsubscribe) => {
  if (element instanceof HTMLLinkElement) {
    if (element.getAttribute('rel') === 'stylesheet') {
      console.log('href:', element.getAttribute('href'));
      if (element.getAttribute('href')?.startsWith('/assets/12633.')) {
        element.remove();
        unsubscribe();
      }
    }
  }
});

(async () => {
  const response = await fetch(`http://${SERVERHOST()}/styles.css`);
  const css = await response.text();
  GM_addStyle(css);
})();
