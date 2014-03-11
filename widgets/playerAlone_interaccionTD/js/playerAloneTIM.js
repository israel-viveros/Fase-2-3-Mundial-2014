;
(function() {
    $.fn.playerAlone = function(options) {
        var settings = $.extend({
            'idMatch': 0
        }, options);
        var GlobalThis = this;
        var playerAloneObj = {
            idMatchKeep: 0,
            loadFeed: function() {
                $.ajax({
                    url: 'http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/js/feedPlayerAlone.js',
                    type: 'GET',
                    dataType: 'jsonp',
                    cache: false,
                    jsonpCallback: 'playeralonemxm'
                })
                    .done(function(data) {
                        console.log("success");

                        for (var i = 0; i < data.playeralone.length; i++) {
                            console.log(data.playeralone[i]);
                            if (parseInt(settings.idMatch) === parseInt(data.playeralone[i].idMatch)) {
                                playerAloneObj.idMatchKeep = parseInt(settings.idMatch);
                            }
                        };

                        if (playerAloneObj.idMatchKeep !== 0) {
                            console.log(GlobalThis);
                            GlobalThis.html('<iframe src="' + data.playeralone[playerAloneObj.idMatchKeep].urlPlayer + '" width="100%" height="100%" id="tagPlayeralong"></iframe>')
                        } else {
                            console.log("no hay ninguna coincidencia");
                        }
                    })
                    .fail(function() {
                        console.log("Error al Cargar el Feed");
                    })


            }
        };

        playerAloneObj.loadFeed();
    }
})(jQuery);