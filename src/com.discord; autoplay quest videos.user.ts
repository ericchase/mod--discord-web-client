// ==UserScript==
// @name        com.discord: autoplay quest videos
// @match       https://discord.com/discovery/quests*
// @version     1.0.0
// @description 7/19/2025, 2:53:33 PM
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

async function main() {
  WebPlatform_DOM_Element_Added_Observer_Class({
    selector: 'video[disablepictureinpicture=""]',
  }).subscribe(async (video) => {
    console.log('found:', video);
    if (video instanceof HTMLVideoElement) {
      setInterval(() => {
        if (video.paused === true) {
          video.play();
        }
      }, 1000);
    }
  });
}

main();
