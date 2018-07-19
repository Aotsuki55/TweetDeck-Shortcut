// @name         TweetDeck-Shortcut
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add shortcut-key on TweetDeck!
// @author       Aotsuki
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// ==/UserScript==

var shortcutKey1 = 'o';     //download and like
var shortcutKey2 = 'l';     //like
var shortcutKey3 = 'b';     //back
var shortcutKey4 = 'c';     //clear


var pXPathStr;
var disableKey = false;
var INPUTS = ['INPUT', 'TEXTAREA'];
var elm;
var elemFound;
var elemFound2;
var num = 0;

document.addEventListener('keydown', function (e) {
    var pressed = String.fromCharCode(e.which).toLowerCase();
    pressed = (e.ctrlKey ? 'C-' : '') + (e.altKey ? 'A-' : '') + (e.shiftKey ? 'S-' : '') + pressed;
    if (pressed != shortcutKey4){
      num=0;
    }
    if (INPUTS.indexOf(e.target.tagName) == -1 && (pressed == shortcutKey1 || pressed == shortcutKey2 || pressed == shortcutKey3 || pressed == shortcutKey4 )) {
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

                elemFound = document.evaluate(likeXpath, document, null, 0, null).iterateNext();
                if(elemFound){
                      elemFound.click();
                }

                if(pressed != shortcutKey2){
                  elemFound = document.evaluate(dlXpath, document, null, 0, null).iterateNext();
                  if(elemFound){
                        elemFound.click();
                  }
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
                elemFound = document.evaluate(retXpath, document, null, 0, null).iterateNext();
                if(elemFound){
                    elemFound.click();
                }
                break;
              case shortcutKey4:
                for(var v=0;v<10;++v){
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
                var clearXpath;
                var clearXpath2;
                if(num==0){
                  num=1;
                  clearXpath = pXPathStr + "/header/div/div[1]";
                }else if(num==1) {
                  num=2;
                  clearXpath = pXPathStr + "/header/div/div[2]/a[3]";
                  elemFound = document.evaluate(clearXpath, document, null, 0, null).iterateNext();
                  if(!elemFound){
                    clearXpath = clearXpath.slice( 0, -3 );
                  }
                }else if(num==2) {
                  num=0;
                  clearXpath = pXPathStr + "/div[1]/div[1]/div[1]/form/fieldset[2]/div[3]/button";
                  clearXpath2 = pXPathStr + "/header/div/div[2]/a[3]";
                  elemFound2 = document.evaluate(clearXpath2, document, null, 0, null).iterateNext();
                  if(!elemFound2){
                    clearXpath2 = clearXpath.slice( 0, -3 );
                    elemFound2 = document.evaluate(clearXpath2, document, null, 0, null).iterateNext();
                  }
                }
                elemFound = document.evaluate(clearXpath, document, null, 0, null).iterateNext();
                if(elemFound){
                  elemFound.click();
                  if(num==0){
                      if(elemFound){
                          elemFound2.click();
                      }
                  }
                }
                break;
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
