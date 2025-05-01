// ==UserScript==
// @name        discord: fix server svg
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 5/1/2025, 1:12:12 AM
// ==/UserScript==

import { ElementAddedObserver } from './lib/ericchase/Platform/Web/DOM/MutationObserver/ElementAdded.js';

/* @me
nav[aria-label="Servers sidebar"] {
  >ul {
    >div {
      >div {
        >div[class*="tutorialContainer_"] {
          >div[class*="listItem_"] {
            >div[class*="listItemWrapper_"] {
              >div {
                >svg {}
              }
            }
          }
        }
      }
    }
  }
}
*/

/* Direct Messages
nav[aria-label="Servers sidebar"] {
  >ul {
    >div {
      >div {
        >div[aria-label="Direct Messages"] {
          >div {
            >div[class*="listItem_"] {
              >div[class*="pill_"] {
                +div {
                  >div {
                    >svg {}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

/* Servers > listItem
nav[aria-label="Servers sidebar"] {
  >ul {
    >div {
      >div {
        >div[aria-label="Servers"] {
          >div[class*="listItem_"] {
            >div[class*="pill_"] {
              +div {
                >div {
                  >div {
                    >svg {}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

/* Servers > folderGroup
nav[aria-label="Servers sidebar"] {
  >ul {
    >div {
      >div {
        >div[aria-label="Servers"] {
          >div[class*="folderGroup_"] {
            >div[class*="listItem_"] {
              >div[class*="pill_"] {
                +div {
                  >div {
                    >div {
                      >svg {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

/* Servers > folderGroup.isExpanded_ > listItem
nav[aria-label="Servers sidebar"] {
  >ul {
    >div {
      >div {
        >div[aria-label="Servers"] {
          >div[class*="folderGroup_"][class*="isExpanded_"] {
            >ul {
              >div[class*="listItem_"] {
                >div[class*="pill_"] {
                  +div {
                    >div {
                      >div {
                        >svg {}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

/* Discover & Download Apps
nav[aria-label="Servers sidebar"] {
  >ul {
    >div {
      >div {
        >div[class*="listItem_"] {
          >div[class*="listItemWrapper_"] {
            >div {
              >svg {}
            }
          }
        }
      }
    }
  }
}
*/

/*
nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="tutorialContainer_"] >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg,
nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Direct Messages"] >div >div[class*="listItem_"] >div[class*="pill_"] +div >div >svg
nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg,
nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg,
nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"][class*="isExpanded_"] >ul >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg
nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg
*/

new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="tutorialContainer_"] >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Direct Messages"] >div >div[class*="listItem_"] >div[class*="pill_"] +div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"][class*="isExpanded_"] >ul >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
new ElementAddedObserver({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);

function mutate(element: Element) {
  if ('viewBox' in element) {
    const viewBox: SVGAnimatedRect = element.viewBox as any;
    viewBox.baseVal.width = 48;
    viewBox.baseVal.height = 48;
    viewBox.baseVal.x = 0;
    viewBox.baseVal.y = 0;
  }
  // remove discord's mask
  for (const mask of element.querySelectorAll('mask')) {
    mask.remove();
  }
}
