window.network = function () {
    var currentXhr = null;

    function makeRequest(options) {
        //"http://toolserver.org/~brion/mobile-proxy/?url=" + options.url + "&callback=?"
        //"http://twitter.com/status/user_timeline/benlobaugh.json?count=10&callback=?"
        currentXhr = $.ajax({
            url: "http://toolserver.org/~brion/mobile-proxy/?url=" + "http://en.m.wikipedia.org" + "&callback=?",
            type: 'GET',
            dataType: "json",
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

        //http://forum.jquery.com/topic/cross-domain-ajax-and-ie


       



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
