'use strict';

// The URL of the image that will be replaced 
var url = '';
/**
 * Image names of 
 */
const imageNames = [
	'santa-squared-2.png',
	'santa-squared.jpg',
	'santa-wide-2.jpg',
	'santa-wide-3.jpg',
	'santa-wide.jpg',
	'grinch-portrait.jpg',
]

function replace() {
	let images = document.getElementsByTagName("img");
	for (let i = 0; i < images.length; i++) {
		images[i].src = url;
	}
}

function getRandomImageUrl() {
	const imagesCount = imageNames.length;
	const index = Math.floor(Math.random() * imagesCount);
	return chrome.extension.getURL(`web-accessibles/images/${imageNames[index]}`);
}

chrome.storage.sync.get({
	replaceImages: false,
	makeItSnow: false,
}, function(items) {
	// create a new CSS to inject in the page
	let css = document.createElement("style");
	css.innerHTML = '';

	// if replaceImages is true, get a URL and replace all images
	if (items.replaceImages) {
		// get the image to use
		url = getRandomImageUrl();
		// replace all images with it	
		css.innerHTML += "img { content: url(\"" + url + "\") !important; object-fit: cover !important; }\n";

		// replace now and then wait 3 seconds to replace
		window.setInterval(replace, 3000);
		replace();
	}

	// if makeItSnow is true load the snow.js script
	if (items.makeItSnow) {
		// set update the css with margin and size
		css.innerHTML += "html,body { margin:0; height:100%; }\n";

		// create and append the script file
		let link = document.createElement('script');
		link.src = chrome.extension.getURL('web-accessibles/scripts/snow.js');
		document.head.appendChild(link);
	}

	// append the css file
	document.body.appendChild(css);
});
