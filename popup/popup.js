'use strict';

/**
 * Save the updated configurations
 */
function save() {
  chrome.storage.sync.set({
    replaceImages: document.getElementById('replaceImages').checked,
    makeItSnow: document.getElementById('makeItSnow').checked,
  }, function() {
    // update the value of the submit button to 'Salvato'
    document.getElementById('submit').value = 'Salvato';
  });
}

/**
 * Set the value of the inputs (checkboxes, …) to the saved ones
 */
function restore() {
  chrome.storage.sync.get({
    replaceImages: false,
    makeItSnow: false,
  }, function(items) {
    document.getElementById('replaceImages').checked = items.replaceImages;
    document.getElementById('makeItSnow').checked = items.makeItSnow;
  });
}

/**
 * Is called any time an input change value
 * useful to change the label of the submit button
 */
function changed() {
  document.getElementById('submit').value = 'Conferma';
}

/**
 * Used to catch the submit event
 * @param {*} e the event called
 */
function enter(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    save();
  }
}

/**
 * Open the help page in a new tab
 */
function openHelp() {
  // open a tab with the welcome page
  const url = chrome.extension.getURL(`web-accessibles/welcome-page/index.html`);
  chrome.tabs.create({url: url}, function (tab) {
      console.log(`New tab launched with ${url} in ${tab}`);
  });
}

// catch all needed events
document.addEventListener('DOMContentLoaded', restore);
document.getElementById('submit').addEventListener('click', save);
document.getElementById('replaceImages').addEventListener('click', changed);
document.getElementById('openHelpLink').addEventListener('click', openHelp);
