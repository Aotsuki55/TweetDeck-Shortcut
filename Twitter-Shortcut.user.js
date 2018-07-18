// ==UserScript==
// @name         Twitter-Shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  To use shortcut-key on TweetDeck!
// @author       Aotsuki
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// ==/UserScript==

var pXPathStr;
var shortcutKey1 = 'd';     //download and like
var shortcutKey2 = 'l';     //like
var shortcutKey3 = 'r';     //return
var disableKey = false;
var INPUTS = ['INPUT', 'TEXTAREA'];
var elm;

document.addEventListener('keydown', function (e) {
    var pressed = String.fromCharCode(e.which).toLowerCase();
    pressed = (e.ctrlKey ? 'C-' : '') + (e.altKey ? 'A-' : '') + (e.shiftKey ? 'S-' : '') + pressed;
    if (INPUTS.indexOf(e.target.tagName) == -1 && (pressed == shortcutKey1 || pressed == shortcutKey2 || pressed == shortcutKey3 )) {
        e.preventDefault();
        if (!disableKey) {
            disableKey = true;
            pXPathStr = getXpath(elm);
            var u=0;
            switch(pressed){
              case shortcutKey1:
              case shortcutKey2:
                for(var t=0;t<14;++t){
                    while(pXPathStr[u]!='/'){
                        ++u;
                        if(u>300) {
                            disableKey = false;
                            return;
                        }
                    }
                    ++u;
                }
                --u;
                pXPathStr=pXPathStr.substr(0,u);
                var likeXpath = pXPathStr + "/div/div/footer/ul/li[3]/a";
                var dlXpath = pXPathStr + "/div/div/footer/ul/li[4]/a";

                var elemFound = document.evaluate(likeXpath, document, null, 0, null).iterateNext();
                elemFound.click();

                if(pressed != shortcutKey2){
                  var elemFound2 = document.evaluate(dlXpath, document, null, 0, null).iterateNext();
                  elemFound2.click();
                }
                break;
              case shortcutKey3:
                for(var s=0;s<10;++s){
                    while(pXPathStr[u]!='/'){
                        ++u;
                        if(u>300) {
                            disableKey = false;
                            return;
                        }
                    }
                    ++u;
                }
                --u;
                pXPathStr=pXPathStr.substr(0,u);
                var retXpath = pXPathStr + "/header/a";
                var elemFound3 = document.evaluate(retXpath, document, null, 0, null).iterateNext();
                if(elemFound3){
                    elemFound3.click();
                }
            }

            disableKey = false;
        }
    }
}, false);


document.onmouseover = function (e){
    elm = document.elementFromPoint(e.clientX, e.clientY);
};


function getXpath(element) {
  if(element && element.nodeType == document.ELEMENT_NODE) {
    var xpath = getXpath(element.parentNode) + '/' + element.tagName;
    var siblings = [];
    for(var i = 0; i < element.parentNode.childNodes.length; i++) {
      var e = element.parentNode.childNodes[i];
      if(e.nodeType == document.ELEMENT_NODE && e.tagName == element.tagName) {
        siblings.push(e);
      }
    }
    if(1 < siblings.length) {
      for(var j = 0; j < siblings.length; j++) {
        if(siblings[j] === element) {
          xpath += '[' + (j+1) + ']';
          break;
        }
      }
    }
    return xpath.toLowerCase();
  }
  return '';
}
