// ==UserScript==
// @name        com.discord; rainbow disco
// @match       https://discord.com/*
// @version     1.0.0
// @description 2025-09-11
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from '../src/lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

function clickNitroStoreButton() {
  const observer = WebPlatform_DOM_Element_Added_Observer_Class({
    selector: 'a[href="/store"]',
  });
  observer.subscribe((element) => {
    if (element instanceof HTMLAnchorElement) {
      observer.disconnect();
      element.click();
    }
  });
}

// function click() {
//   const o2 = WebPlatform_DOM_Element_Added_Observer_Class({
//     selector: '.bentoBoxButton_abac7b',
//   });
//   o2.subscribe((element) => {
//     if (element instanceof HTMLAnchorElement) {
//       observer.disconnect();
//       element.click();

//       const o3 = WebPlatform_DOM_Element_Added_Observer_Class({
//         selector: '.resetButton__5a2df > .button__6af3a:nth-child(1)',
//       });
//       o3.subscribe((element) => {
//         if (element instanceof HTMLAnchorElement) {
//           observer.disconnect();
//           element.click();

//           const o4 = WebPlatform_DOM_Element_Added_Observer_Class({
//             selector: '.resetButton__5a2df > .button__6af3a:nth-child(1)',
//           });
//           o4.subscribe((element) => {
//             if (element instanceof HTMLAnchorElement) {
//               observer.disconnect();
//               element.click();
//             }
//           });
//         }
//       });
//     }
//   });

//   setTimeout(() => {
//     let changeThemeBtn = document.querySelector('.resetButton__5a2df > .button__6af3a:nth-child(1)');
//     changeThemeBtn.click();

//     setTimeout(() => {
//       let themeMenu = document.querySelector('.container__5a2df');
//       themeMenu.style.display = 'none';
//     }, 5000);
//   }, 5000);
// }
