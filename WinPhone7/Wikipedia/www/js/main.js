var currentHistoryIndex = -1;

var pageHistory = [];

function init() {
    jQuery.support.cors = true;
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    chrome.initialize();
}

function onBackKeyDown() {
    chrome.goBack();
}

function homePage() {
	app.navigateToPage(app.baseURL);
}

function aboutPage() {
	chrome.hideOverlays();
	chrome.hideContent();
	$("#about-page-overlay").localize().show();
	chrome.doFocusHack();
}