// ==UserScript==
// @name        com.discord; remove 'Activity' list
// @match       https://discord.com/*
// @version     1.0.0
// @description 2025-09-13
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

let activity_hidden = false;

WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '[role="list"][aria-label="Members"] > [class*="membersGroup_"]:has(> [class*="headerContainer"])',
}).subscribe((element_activity) => {
  console.log({ element_activity });
  if (activity_hidden !== true) {
    const button_settings = element_activity.querySelector('div[role="button"]');
    if (button_settings instanceof HTMLElement) {
      console.log({ button_settings });
      const observer = WebPlatform_DOM_Element_Added_Observer_Class({
        selector: '#member-list-settings-menu-hide',
      });
      observer.subscribe((element_checkbox) => {
        console.log({ element_checkbox });
        if (element_checkbox instanceof HTMLElement) {
          observer.disconnect();
          if (element_checkbox.getAttribute('aria-checked') !== 'true') {
            element_checkbox.click();
          } else {
            button_settings.click();
          }
          activity_hidden = true;
          element_activity.style.display = 'none';
        }
      });
      button_settings.click();
    }
  } else {
    element_activity.style.display = 'none';
  }
});
