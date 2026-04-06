// ==UserScript==
// @name        com.discord; fix 'Servers sidebar' icons
// @match       https://discord.com/*
// @version     1.0.2
// @description 2026-04-04
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_ChildList_Observer_Class } from './lib/ericchase/WebPlatform_DOM_ChildList_Observer_Class.js';
import { isStyleElement, WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

// remove native icon masks
// remove native border radius
// fix icon layouts
WebPlatform_DOM_Element_Added_Observer_Class({
  selector: '[aria-label="Servers sidebar"] [class*=listItem_]',
}).subscribe((element) => {
  processListItem(element);
  WebPlatform_DOM_ChildList_Observer_Class({
    source: element,
  }).subscribe((record) => {
    if (record.addedNodes[0] instanceof Element && record.addedNodes[0].matches('[class*=pill_] *')) {
      record.addedNodes[0].toggleAttribute('data-skip', true);
      // skip
    } else if (record.removedNodes[0] instanceof Element && record.removedNodes[0].hasAttribute('data-skip')) {
      // skip
    } else {
      // reprocess for good measure
      processListItem(element);
    }
  });
});

function processListItem(element: Element & { style: CSSStyleDeclaration }) {
  if (element.querySelector('[class*=guildSeparator_]')) {
    // skip separator
  } else {
    for (const node of iterateDescendentsInReverseDepth(element)) {
      // we make our own masks
      if (node instanceof SVGMaskElement) {
        node.remove();
        continue;
      }

      // these are handled in the user stylesheet
      if (node.className?.includes?.('folderPreview')) {
        // svg elements' className is their literal instance constructor,
        // rather than strings, so they don't have "includes"
        continue;
      }

      _attributes(node);

      if (isStyleElement(node)) {
        const computed = window.getComputedStyle(node);
        _size(node, computed, 'width');
        _size(node, computed, 'height');
        _styles(node, computed);
        _svg(node, computed);
      }
    }
  }
}

function _attributes(node: Element) {
  node.removeAttribute('mask');
}

function _size(node: any, computed: CSSStyleDeclaration, prop: string & keyof CSSStyleDeclaration) {
  if (node[prop]?.baseVal?.valueAsString === '40') {
    node[prop].baseVal.valueAsString = '48';
  }
  if (node[prop] === '40') {
    node[prop] = '48';
  }
  if (node[prop] === 40) {
    node[prop] = 48;
  }
  if (computed[prop] === '40px') {
    node.style[prop] = '48px';
  }
}

function _styles(node: any, computed: CSSStyleDeclaration) {
  if (computed.padding !== '0px') {
    node.style.padding = '0px';
  }
}

function _svg(node: any, computed: CSSStyleDeclaration) {
  if (node.viewBox?.baseVal?.x === -4) {
    node.viewBox.baseVal.x = 0;
  }
  if (node.viewBox?.baseVal?.y === -4) {
    node.viewBox.baseVal.y = 0;
  }
  if (computed.insetInlineStart === '-4px') {
    node.style.insetInlineStart = '0';
  }
  if (computed.top === '-4px') {
    node.style.top = '0';
  }
}

function* iterateDescendentsInReverseDepth(root: Element) {
  const map = new Map<number, Element[]>();
  let depth = 0;
  let group: Element[] = [root];
  while (group.length > 0) {
    const children: Element[] = [];
    for (let i = 0; i < group.length; i++) {
      children.push(...group[i].children);
    }
    if (children.length > 0) {
      map.set(depth, children);
    }
    depth++;
    group = children;
  }
  for (/* reverse order iteration */ let i = depth - 1; i >= 0; i--) {
    for (const node of map.get(i) ?? []) {
      yield node;
    }
  }
}
