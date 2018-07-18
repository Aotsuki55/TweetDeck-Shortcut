// ==UserScript==
// @name         Twitter-Shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  To use shortcut-key on TweetDeck!
// @author       Aotsuki
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// ==/UserScript==

var pXPathStr = '//*[@id="container"]/div/section[1]/div/div[1]/div[1]/div[5]/div/article[1]/div/div/footer/ul/li[3]/a';
var shortcutKey = 'l';
var disableKey = false;
var INPUTS = ['INPUT', 'TEXTAREA'];
var elm;

document.addEventListener('keydown', function (e) {
    var pressed = String.fromCharCode(e.which).toLowerCase();
    pressed = (e.ctrlKey ? 'C-' : '') + (e.altKey ? 'A-' : '') + (e.shiftKey ? 'S-' : '') + pressed;
    if (INPUTS.indexOf(e.target.tagName) == -1 && pressed == shortcutKey) {
        e.preventDefault();
        if (!disableKey) {
            disableKey = true;
            //document.getElementById("hdtb-tls").click();
            //document.getElementByClassName("hdtb-tls").click();


            pXPathStr = getXpath(elm);
            //alert(pXPathStr);
            //pXPathStr = '/html/body/div[3]/div[2]/div[3]/div/section[1]/div/div[1]/div[1]/div[5]/div/article[1]/div/div/footer/ul/li[3]/a/i';
            var u=0;
            for(var t=0;t<14;++t){
                while(pXPathStr[u]!='/'){
                    ++u;
                }
                ++u;
            }
            --u;
            pXPathStr=pXPathStr.substr(0,u);
            var likeXpath = pXPathStr + "/div/div/footer/ul/li[3]/a";
            var dlXpath = pXPathStr + "/div/div/footer/ul/li[4]/a";

            var elemFound = document.evaluate(likeXpath, document, null, 0, null).iterateNext();
            elemFound.click();

            var elemFound2 = document.evaluate(dlXpath, document, null, 0, null).iterateNext();
            elemFound2.click();

            // 処理
            disableKey = false;
        }
    }
}, false);

/*
document.body.onclick = function ( e ) {

	var x = e.clientX ;
	var y = e.clientY ;
	var element = document.elementFromPoint( x, y ) ;
	alert(element);
}*/

document.onmouseover = function (e){
    elm = document.elementFromPoint(e.clientX, e.clientY);
};
/*
document.onmousemove = function (e){
    elm = document.elementFromPoint(e.clientX, e.clientY);
};*/


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

