// ==UserScript==
// @name        com.discord; fix servers sidebar svg icons
// @match       https://discord.com/*
// @version     1.0.0
// @description 5/1/2025, 1:12:12 AM
// @run-at      document-start
// @grant       none
// ==/UserScript==

import { WebPlatform_DOM_Element_Added_Observer_Class } from './lib/ericchase/WebPlatform_DOM_Element_Added_Observer_Class.js';

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
        >div[class*="listItem_"]:not(:has(div[class*="guildSeparator_"])) {
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

WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="tutorialContainer_"] >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Direct Messages"] >div >div[class*="listItem_"] >div[class*="pill_"] +div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"] >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[aria-label="Servers"] >div[class*="folderGroup_"][class*="isExpanded_"] >ul >div[class*="listItem_"] >div[class*="pill_"] +div >div >div >svg' }).subscribe(mutate);
WebPlatform_DOM_Element_Added_Observer_Class({ selector: 'nav[aria-label="Servers sidebar"] >ul >div >div >div[class*="listItem_"] >div[class*="listItemWrapper_"] >div >svg' }).subscribe(mutate);

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
