// ==UserScript==
// @name        com.discord; reformat dates
// @match       https://discord.com/*
// @version     1.0
// @description 2025-09-11
// @run-at      document-start
// @grant       none
// ==/UserScript==

// TODO: Add settings for changing format

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

const observer = WebPlatform_DOM_Element_Added_Observer_Class({
  selector: 'time',
});

observer.subscribe((element) => {
  const datetime = element.getAttribute('datetime');
  if (datetime) {
    for (const node of element.childNodes) {
      if (node.nodeType === node.TEXT_NODE) {
        node.nodeValue = formatUTCDateString(datetime);
      }
    }
  }
});

function formatUTCDateString(utcString: string) {
  const date = new Date(utcString);
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    hh = date.getHours(),
    mm = date.getMinutes(),
    ss = date.getSeconds(),
    ap = hh < 12 ? 'AM' : 'PM';
  hh = hh % 12 || 12; // Convert to 12-hour format, ensuring 12 instead of 0
  return (
    '' + // keeps formatting
    y +
    '-' +
    ((m < 10 ? '0' : '') + m) + //
    '-' +
    ((d < 10 ? '0' : '') + d) + //
    (' ' + (hh < 10 ? '0' : '') + hh) + //
    (':' + (mm < 10 ? '0' : '') + mm) + //
    // (':' + (ss < 10 ? '0' : '') + ss) + //
    ' ' +
    ap
  );
}
