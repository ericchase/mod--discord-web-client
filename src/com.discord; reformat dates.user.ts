// ==UserScript==
// @name        com.discord; reformat dates
// @match       https://discord.com/*
// @version     1.0.1
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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function formatUTCDateString(utcString: string) {
  const date = new Date(utcString);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let am_pm = hour < 12 ? 'AM' : 'PM';
  let month_string = months[month];
  // adjust for display
  month = month + 1;
  hour = hour % 12 || 12; // Convert to 12-hour format, ensuring 12 instead of 0
  return (
    '' + // keeps prettier formatting
    year +
    '-' +
    ((month < 10 ? '0' : '') + month) +
    '-' +
    ((day < 10 ? '0' : '') + day) +
    (' ' + (hour < 10 ? '0' : '') + hour) +
    (':' + (minute < 10 ? '0' : '') + minute) +
    // (':' + (second < 10 ? '0' : '') + second) + //
    (' ' + am_pm) +
    (' ' + '(' + month_string + ' ' + day + ')')
  );
}
