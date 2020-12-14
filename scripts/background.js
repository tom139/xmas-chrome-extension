'use strict';

chrome.runtime.onInstalled.addListener(function() {  
  // open a tab
  const url = chrome.extension.getURL(`web-accessibles/welcome-page/index.html`);
  chrome.tabs.create({url: url}, function (tab) {
      console.log(`New tab launched with ${url} in ${tab}`);
  });
});
