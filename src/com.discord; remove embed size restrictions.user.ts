// ==UserScript==
// @name        com.discord; remove embed size restrictions
// @match       https://discord.com/*
// @version     1.0.0
// @description 2026-04-08
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { isStyleElement, WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';
import { WebPlatform_Utility_Get_Ancestor_List } from './lib/ericchase/WebPlatform_Utility_Ancestor_Node.js';

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '[class*=messageListItem_] iframe',
}).subscribe(async (iframe) => {
  if (iframe instanceof HTMLIFrameElement) {
    iframe.width = '1920';
    iframe.height = '1080';
    iframe.style.width = '1920px';
    iframe.style.height = '1080px';
    iframe.style.maxWidth = '100%';
    iframe.style.maxHeight = '600px';
    iframe.style.aspectRatio = '1920 / 1080';
    iframe.style.position = 'static';
    iframe.parentElement!.style.paddingBottom = '0';
    const container = iframe.closest('[class*=messageListItem_]');
    const article = iframe.closest('article');
    if (isStyleElement(container) && isStyleElement(article)) {
      for (const ancestor of WebPlatform_Utility_Get_Ancestor_List(iframe).reverse()) {
        if (isStyleElement(ancestor)) {
          ancestor.style.width = 'auto';
          ancestor.style.height = 'auto';
          ancestor.style.maxWidth = 'max-content';
          ancestor.style.maxHeight = 'max-content';
          ancestor.style.minWidth = 'none';
          ancestor.style.minHeight = 'none';
        }
        if (ancestor === container) {
          break;
        }
      }
    }
  }
});
