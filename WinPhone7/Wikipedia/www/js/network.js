window.network = function () {
    var currentXhr = null;

    function makeRequest(options) {
        //"http://toolserver.org/~brion/mobile-proxy/?url=" + options.url + "&callback=?"
        //"http://twitter.com/status/user_timeline/benlobaugh.json?count=10&callback=?"
        //"http://toolserver.org/~brion/mobile-proxy/?url=" + "http://en.m.wikipedia.org" + "&callback=?",
        currentXhr = $.ajax({
            url: options.url,
            type: 'GET',
            dataType: "HTML",
            success: function (data, xhr) {
                console.log("makeRequest success");
                if (data == '') {
                    // Sometimes we get an empty response. Why? Not sure.
                    options.error(xhr);
                } else {
                    options.success(data, xhr);
                }
                currentXhr = null;
            },
            error: function (xhr, data, errorThrown) {
                console.log("makeRequest error " + errorThrown);
                options.error(xhr);
                currentXhr = null;
            }
        });
    }

    function stopCurrentRequest() {
        if (currentXhr) {
            currentXhr.abort();
            currentXhr = null
        }
    }

    function isConnected() {
        return window.navigator.onLine;
    }

    return {
        makeRequest: makeRequest,
        stopCurrentRequest: stopCurrentRequest,
        isConnected: isConnected
    };

} ();
