// ==UserScript==
// @name        com.discord; remove Nitro, Shop, and Quests buttons
// @match       https://discord.com/channels/@me
// @version     1.0.0
// @description 2026-04-10
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'ul[aria-label="Direct Messages"]>*',
}).subscribe((element) => {
  if (element.querySelector('a[href="/store"],a[href="/shop"],a[href="/quest-home"]')) {
    element.style.display = 'none';
  }
});
