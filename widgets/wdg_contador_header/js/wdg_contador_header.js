;
(function() {
    $.fn.contadorHeader = function(parametros) {
        var setting = $.extend({
            'FechaTarget': new Date(),
            'linkButton': '#',
            'ticker': ''
        }, parametros);

        var globalThis = this;

        var CountDownHeader = {


            spanish: function() {
                $.countdown.regionalOptions['es'] = {
                    labels: ['A\u00F1os', 'Meses', 'Semanas', 'D\u00EDas', 'Hrs.', 'Min.', 'Seg.'],
                    labels1: ['A\u00F1o', 'Mes', 'Semana', 'D\u00EDas', 'Hrs.', 'Min.', 'Seg.'],
                    compactLabels: ['a', 'm', 's', 'g'],
                    whichLabels: null,
                    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    timeSeparator: ':',
                    isRTL: false
                };
                $.countdown.setDefaults($.countdown.regionalOptions['es']);
            },

            startContador: function() {

                var maquetado = "";
                maquetado += '<section class="wdg_contador_Header" style="display:none">';
                maquetado += '<div class="title_contador_header">Inicia en...</div>';
                maquetado += '<span class="countdown-row"  id="contador-Fase2y3">';
                maquetado += '<span class="countdown-section">';
                maquetado += '<span class="countdown-amount">000</span>';
                maquetado += '<span class="countdown-period">D\u00EDas</span>';
                maquetado += '</span>';
                maquetado += '<span class="countdown-section">';
                maquetado += '<span class="countdown-amount">000</span>';
                maquetado += '<span class="countdown-period">Hrs.</span>';
                maquetado += '</span>';
                maquetado += '<span class="countdown-section">';
                maquetado += '<span class="countdown-amount">000</span>';
                maquetado += '<span class="countdown-period">Min.</span>';
                maquetado += '</span>';
                maquetado += '<span class="countdown-section">';
                maquetado += '<span class="countdown-amount">000</span>';
                maquetado += '<span class="countdown-period">Seg.</span>';
                maquetado += '</span>';
                maquetado += '</span>';
                maquetado += '<div class="right_contador_header">';
                maquetado += '<div id="targetTIMCount"></div>';
                maquetado += '</section>';
                globalThis.empty().html(maquetado);
                //$("#VentasContaTIM").clone().appendTo("#targetTIMCount");


                CountDownHeader.spanish();
                var tiempoMundial = setting.FechaTarget;
                globalThis.find("#contador-Fase2y3").countdown({
                    until: tiempoMundial,
                    format: 'DHMS',
                    padZeroes: true,
                    onExpiry: CountDownHeader.expire
                });

                var comprobando = globalThis.find("#contador-Fase2y3").countdown('getTimes');
                Array.prototype.contando = function(buscame) {
                    var i, count = 0;
                    for (i in this) {
                        if (Object.prototype.hasOwnProperty.call(this, i)) {
                            if (this[i] instanceof Array) count += this[i].contando(buscame);
                            else if (this[i] === buscame) count++;
                        }
                    }
                    return count;
                }

                if (comprobando.contando(0) === 7) {
                    CountDownHeader.expire();
                } else {
                    globalThis.find(".wdg_contador_Header").fadeIn("slow");
                }
            },

            expire: function() {
                try {
                    CountDownHeader.horaServidor();
                } catch (e) {
                    console.log(e);
                }
                //console.log("Se agoto el contador...");
            },

            horaServidor: function() {
                $.ajax({
                    url: "http://mxm.televisadeportes.esmas.com/deportes/home/timetvjsonp.js",
                    async: false,
                    cache: false,
                    dataType: 'jsonp',
                    jsonpCallback: 'timetv',
                    success: function(data) {
                        var arr = '';
                        var m = 0;
                        var anio = 0;

                        horas = data.timetv;
                        arr = data.fechatv.replace(/_/gi, "-").split("-");
                        m = parseInt(arr[1]) + 1;

                        if (String(m).length == 1) {
                            m = '0' + m;
                        }
                        anio = parseInt(arr[2]) + 1900;
                        fechas = m + '-' + arr[0] + '-' + anio;
                        fechas = fechas + ' ' + horas + ':00';

                        CountDownHeader.evalua(fechas);

                    }
                });
            },

            evalua: function(now) {
                var arraytemp = new Array(),
                    arrayFecha = new Array(),
                    arrayHora = new Array();
                $.ajax({
                    url: 'http://lab.israelviveros.com/deportes/wdg_matchesresult_01/pruebas/TickerFutbol_' + setting.ticker + 'jsonp.js',
                    type: 'GET',
                    dataType: 'jsonp',
                    cache: false,
                    jsonpCallback: 'wtdata'
                })
                    .done(function(data) {
                        var fechaItem, horaItem, extras, fecha, hora, splitfecha, fechaAct, tmpM, tmpD, tmpY, horaAct, bandera = 0,
                            aH, hA, gg;

                        for (var i = 0; i < data.matches.match.length; i++) {
                            extras = String(data.matches.match[i].extras);
                            fechaItem = data.matches.match[i].MatchDate;
                            horaItem = data.matches.match[i].MatchHour;
                            // console.log("dia-> " + fechaItem + " HoraItem-> " + horaItem);
                            arraytemp.push(extras);
                            arrayFecha.push(fechaItem);
                            arrayHora.push(horaItem);
                        };
                        //console.log(arraytemp);
                        splitfecha = now.split(" ");
                        fechaAct = new Date(splitfecha[0]).getTime();
                        horaAct = splitfecha[1];

                        for (var x = 0; x < arrayFecha.length; x++) {
                            var tmpF = arrayFecha[x].split("/");
                            tmpM = parseInt(tmpF[1]) - 1;
                            tmpD = tmpF[0];
                            tmpY = tmpF[2];
                            //console.log("comparando: " + fechaAct + ' -- ' + new Date(tmpY, tmpM, tmpD).getTime())
                            if (fechaAct === new Date(tmpY, tmpM, tmpD).getTime()) {
                                //console.log("son fechas Iguales")
                                aH = String(arrayHora[x]).split(":");
                                hA = String(horaAct).split(":");
                                gg = parseInt(aH[0]) + 2;
                                if (parseInt(hA[0]) >= parseInt(aH[0]) && parseInt(hA[0]) < gg) {
                                    bandera = x;
                                }

                            }
                        };


                        if (arraytemp.indexOf("vivo") !== -1) {
                            CountDownHeader.creacontenido("vivo", data.matches.match[parseInt(arraytemp.indexOf("vivo"))]);
                        } else if (bandera !== 0) {
                            CountDownHeader.creacontenido("vivo", data.matches.match[parseInt(bandera)]);
                        } else if (arraytemp.indexOf("proximo") !== -1) {
                            CountDownHeader.creacontenido("proximo", data.matches.match[parseInt(arraytemp.indexOf("proximo"))]);
                        } else if (arraytemp.indexOf("previo") !== -1) {
                            CountDownHeader.creacontenido("previo", data.matches.match[parseInt(arraytemp.indexOf("previo"))]);
                        } else if (arraytemp.indexOf("revive") !== -1) {
                            CountDownHeader.creacontenido("revive", data.matches.match[parseInt(arraytemp.indexOf("revive"))]);
                        } else {
                            var ultimo = parseInt(data.matches.match.length) - 1;
                            CountDownHeader.creacontenido("revive", data.matches.match[ultimo]);

                        }


                    })
                    .fail(function() {
                        console.log("Error al cargar el ticker: " + setting.ticker);
                    })



            },
            creacontenido: function(type, data) {
                var maquetado = "",
                    numForlocal = 0,
                    numForVisit = 0;
                $.ajax({
                    //url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/copa-mundial-fifa-brasil-2014/teams.jsonp',
                    url: 'http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/js/teams.jsonp',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'getTeams'
                })
                    .done(function(banderas) {
                        //var paisActual1 = data.equipos.local.name.toLowerCase().replace(/á/g,"\u00e1").replace(/é/g,"\u00e9").replace(/í/g,"\u00ed").replace(/ó/g,"\u00f3").replace(/ú/g,"\u00fa").replace(/ñ/g,"\u00f1");
                        //var paisActual2 = data.equipos.visit.name.toLowerCase().replace(/á/g,"\u00e1").replace(/é/g,"\u00e9").replace(/í/g,"\u00ed").replace(/ó/g,"\u00f3").replace(/ú/g,"\u00fa").replace(/ñ/g,"\u00f1");
                        var paisActual1 = data.equipos.local.name.toLowerCase();
                        var paisActual2 = data.equipos.visit.name.toLowerCase();

                        for (var i = 0; i < banderas.teams.length; i++) {
                            //console.log("comparando: "+paisActual1 +" - "+banderas.teams[i].nombre.toLowerCase());
                            if (paisActual1 === banderas.teams[i].nombre.toLowerCase()) {
                                //console.log("----");
                                numForlocal = i;
                            }
                            //console.log("comparando: "+paisActual2 +" - "+banderas.teams[i].nombre.toLowerCase());
                            if (paisActual2 === banderas.teams[i].nombre.toLowerCase()) {
                                //console.log("----");
                                numForVisit = i;
                            }
                        };

                        switch (type) {
                            case "vivo":
                                maquetado += '<section class="wdg_contador_Header_vivo">';
                                maquetado += '<a href="' + data.Website + '" class="ui-link">';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/camara2.png"></a>';
                                maquetado += '<span class="separador">|</span>';
                                maquetado += '<div class="title_contador_header_vivo"><a href="' + data.Website + '">VER EN VIVO AHORA</a>';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/arrow2.png">';
                                maquetado += '</div>';
                                maquetado += '<div class="right_contador_header_vivo">';
                                maquetado += '<div class="wdg_paises">';
                                maquetado += '<div>';
                                maquetado += (numForlocal > 0) ? banderas.teams[numForlocal].alias : data.equipos.local.name.substring(0, 3);
                                maquetado += (numForlocal > 0) ? '<img src="' + banderas.teams[numForlocal].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += '</div>';
                                maquetado += '<div class="vs_wdg_paises">VS</div>';
                                maquetado += '<div>';
                                maquetado += (numForVisit > 0) ? '<img src="' + banderas.teams[numForVisit].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += (numForVisit > 0) ? banderas.teams[numForVisit].alias : data.equipos.visit.name.substring(0, 3);
                                maquetado += '</div>';
                                maquetado += '</div>';
                                maquetado += '<div id="targetTIMCount"></div>';
                                maquetado += '</div>';
                                maquetado += '</section>';
                                maquetado += '<div class="wdg_contador_aside" style="display:none"> <a href="' + setting.linkButton + '">';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/hand_icon.png">';
                                maquetado += '<span>PARTICIPA EN</span>';
                                maquetado += '<span>NTERACCI\u00D3N TD</span></a>';
                                maquetado += '</div>';
                                break;
                            case "proximo":
                                var mesNum = parseInt(data.MatchDate.substring(3, 5)),
                                    nameMes = "";
                                switch (mesNum) {
                                    case 1:
                                        nameMes = "Ene.";
                                        break;
                                    case 2:
                                        nameMes = "Feb.";
                                        break;
                                    case 3:
                                        nameMes = "Mar.";
                                        break;
                                    case 4:
                                        nameMes = "Abr.";
                                        break;
                                    case 5:
                                        nameMes = "May.";
                                        break;
                                    case 6:
                                        nameMes = "Jun.";
                                        break;
                                    case 7:
                                        nameMes = "Jul.";
                                        break;
                                    case 8:
                                        nameMes = "Ago.";
                                        break;
                                    case 9:
                                        nameMes = "Sep.";
                                        break;
                                    case 10:
                                        nameMes = "Oct.";
                                        break;
                                    case 11:
                                        nameMes = "Nov.";
                                        break;
                                    case 12:
                                        nameMes = "Dic.";
                                        break;
                                    default:
                                        nameMes = mesNum;
                                        break;
                                }
                                maquetado += '<section class="wdg_contador_Header_proximo" style="display:none">';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/camara2.png">';
                                maquetado += '<span class="separador_proximo">|</span>';
                                maquetado += '<div class="title_contador_header_proximo"><a href="' + data.Website + '">Próximo partido</a>';
                                maquetado += '</div>';
                                maquetado += '<div class="right_contador_header_proximo">';
                                maquetado += '<div class="wdg_paises">';
                                maquetado += '<div>';
                                maquetado += (numForlocal > 0) ? banderas.teams[numForlocal].alias : data.equipos.local.name.substring(0, 3);
                                maquetado += (numForlocal > 0) ? '<img src="' + banderas.teams[numForlocal].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += '</div>';
                                maquetado += '<div class="vs_wdg_paises">VS</div>';
                                maquetado += '<div>';
                                maquetado += (numForVisit > 0) ? '<img src="' + banderas.teams[numForVisit].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += (numForVisit > 0) ? banderas.teams[numForVisit].alias : data.equipos.visit.name.substring(0, 3);
                                maquetado += '</div>';
                                maquetado += '</div>';
                                maquetado += '<div id="targetTIMCount"></div>';
                                maquetado += '</div>';
                                maquetado += '<span class="countdown-section_proximo" id="contador-Fase2y3">';
                                maquetado += '<span class="fecha">' + data.MatchDate.substring(0, 2) + ' ' + nameMes + ' ' + data.MatchHour.substring(0, 6) + ' hrs</span>';
                                maquetado += '</span>';
                                maquetado += '</section>';
                                maquetado += '<div class="wdg_contador_aside_proximo" style="display:none">';
                                maquetado += '<a href="#"><span>INTERACT\u00DAA CON</span>';
                                maquetado += '<div class="line"></div>';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/logolajugada.png"></a>';
                                maquetado += '</div>';
                                break;
                            case "previo":
                                maquetado += '<section class="wdg_contador_Header_conecta" style="display:none">';
                                maquetado += '<div class="title_contador_header_conecta"><a href="' + data.Website + '">PREVIO</a></div>';
                                maquetado += '<a href="' + data.Website + '"><img class="imgconect" src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/logoconecta_td.png"></a>';
                                maquetado += '<div class="right_contador_header_conecta">';
                                maquetado += '<div class="wdg_paises">';
                                maquetado += '<div>';
                                maquetado += (numForlocal > 0) ? banderas.teams[numForlocal].alias : data.equipos.local.name.substring(0, 3);
                                maquetado += (numForlocal > 0) ? '<img src="' + banderas.teams[numForlocal].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += '</div>';
                                maquetado += '<div class="vs_wdg_paises">VS</div>';
                                maquetado += '<div>';
                                maquetado += (numForVisit > 0) ? '<img src="' + banderas.teams[numForVisit].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += (numForVisit > 0) ? banderas.teams[numForVisit].alias : data.equipos.visit.name.substring(0, 3);
                                maquetado += '</div>';
                                maquetado += '</div>';
                                maquetado += '<div id="targetTIMCount"></div>';
                                maquetado += '</div>';
                                maquetado += '</section>';
                                break;
                            case "revive":
                                maquetado += '<section class="wdg_contador_Header_revive" style="display:none">';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/camara.png" class="imgfx">';
                                maquetado += '<span class="separador_revive">|</span>';
                                maquetado += '<div class="title_contador_header_revive"><a href="' + data.Website + '">REVIVE EL PARTIDO</a>';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/arrow3.png">';
                                maquetado += '</div>';
                                maquetado += '<div class="right_contador_header_revive">';
                                maquetado += '<div class="wdg_paises">';
                                maquetado += '<div>';
                                maquetado += (numForlocal > 0) ? banderas.teams[numForlocal].alias : data.equipos.local.name.substring(0, 3);
                                maquetado += (numForlocal > 0) ? '<img src="' + banderas.teams[numForlocal].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgbanderaCon">';
                                maquetado += '</div>';
                                maquetado += '<div class="vs_wdg_paises">VS</div>';
                                maquetado += '<div>';
                                maquetado += (numForVisit > 0) ? '<img src="' + banderas.teams[numForVisit].bandera + '" class="imgbanderaCon">' : '<img src="http://i2.esmas.com/img/spacer.gif" class="imgfxbanderaCon">';
                                maquetado += (numForVisit > 0) ? banderas.teams[numForVisit].alias : data.equipos.visit.name.substring(0, 3);
                                maquetado += '<div id="targetTIMCount"></div>';
                                maquetado += '</div>';
                                maquetado += '</section>';
                                maquetado += '<div class="wdg_contador_aside_revive" style="display:none">';
                                maquetado += '<a href="' + setting.linkButton + '" class="ui-link">';
                                maquetado += '<span>INTERACT\u00DAA CON</span>';
                                maquetado += '<div class="line"></div>';
                                maquetado += '<img src="http://i2.esmas.com/deportes30/copa-mundial-fifa-brasil-2014/Fase2yFase3/img/logolajugada.png">';
                                maquetado += '</a>';
                                maquetado += '</div>';
                                break;
                        }


                        globalThis.html(maquetado).children().fadeIn('slow');
                        //$("#VentasContaTIM").clone().appendTo("#targetTIMCount");

                    })
                    .fail(function() {
                        console.log("error al cargar las banderas");
                    })



            }



        }

        CountDownHeader.startContador();

    }
})(jQuery);