(function() {

/**
 * Synchronously load relevant platform PhoneGap scripts during startup.
 */

// Is there a way that PhoneGap can more reliably identify its presence and platform before deviceready?
var platform = 'unknown',
	includes = ['platform.js'],
	ua = navigator.userAgent;
if (ua.match(/; Android /)) {
	// Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus One Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
	platform = 'android';
} else if (ua.match(/\((iPhone|iPod|iPad)/)) {
	// Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8H7
	platform = 'ios';
} else if (ua.match(/Windows Phone/)) {
	//  Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; Microsoft; XDeviceEmulator)
	platform = 'winphone';
} else {
    platform = 'winphone';
}

if (platform == 'unknown') {
	// Assume we're a generic web browser.
	platform = 'web';
} else {
	includes.push('phonegap-1.4.1.js');
	var plugins = {
		android: [
			'menu/menu.android.js',
			'urlcache/URLCache.js',
			'softkeyboard/softkeyboard.js',
			'toast/phonegap-toast.js',
			'share/share.js',
			'cachemode/cachemode.js',
			'globalization/globalization.js'
		],
		ios: [
			'ActionSheet.js'
		],
	};
	if (platform in plugins) {
		$.each(plugins[platform], function(i, path) {
			includes.push('plugins/' + path);
		})
	}
}

function includePlatformFile(name) {
	var path = platform + '/' + name,
		line = '<script type="text/javascript" charset="utf-8" src="' + path + '"></script>';
	document.writeln(line);
}

$.each(includes, function(i, path) {
	includePlatformFile(path);
});

})();
