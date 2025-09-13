// ==UserScript==
// @name        com.discord; hide members list recent activity
// @match       https://discord.com/*
// @version     1.0.0
// @description 2025-09-13
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

WatchForMembersList();

function WatchForMembersList() {
  const observer = WebPlatform_DOM_Element_Added_Observer_Class({
    selector: 'div[role="list"][aria-label="Members"]',
  });
  observer.subscribe((element) => {
    // console.log(element);
    if (element instanceof HTMLDivElement) {
      ObserveMembersList(element);
    }
  });
}

function ObserveMembersList(members_list: HTMLDivElement) {
  const observer = WebPlatform_DOM_Element_Added_Observer_Class({
    selector: 'h3,div',
    options: {
      subtree: false,
    },
    source: members_list,
  });
  observer.subscribe((element) => {
    // console.log(element);
    if (element instanceof HTMLDivElement) {
      if (element.attributes.length === 0) {
        element.style.setProperty('display', 'none');
        // console.log('hide div');
      }
    } else if (element instanceof HTMLHeadingElement) {
      if (element.textContent.startsWith('Activity')) {
        element.style.setProperty('display', 'none');
        // console.log('hide h3');
      }
    }
  });
}
