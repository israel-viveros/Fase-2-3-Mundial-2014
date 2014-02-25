$(document).ready(function(){
	function loadAlineacion(el,type) {
		// var url = 'http://mxm.televisadeportes.esmas.com/futbol/data/284/20839/previo_alineacion.js?185';
		var url = '../wdg_alineacion_field_01/' + type + '.json'; // just an example using plain text files
		$.ajax({
		  url: url,
		  dataType: 'json',
		  cache: false,
		  context: document.body,
		  success: function(data) {
			var miHTML = '';
			/* each player */
			for (var i=0;i<data.length;i++) { 
				/* arrow styles based on px values */
				var arrow = '';
				if (data[i]['pos-x'] <= 290 && data[i]['pos-y'] <= 140) arrow = 'grid1';
				else if (data[i]['pos-x'] <= 290 && data[i]['pos-y'] > 140) arrow = 'grid3';
				else if (data[i]['pos-x'] > 290 && data[i]['pos-y'] <= 140) arrow = 'grid2';
				else arrow = 'grid4';
				
				/* each players actions */
				var actions = '';
				for (var a=0;a<data[i]['actions'].length;a++) {
					actions += '<i class="tvsa-'+data[i]['actions'][a]['type']+'"></i>'+data[i]['actions'][a]['minute']+'\'';
				}
				/* the html */
				miHTML += '<span class="player '+data[i]['team']+' '+arrow+'" style="left:'+data[i]['pos-x']+'px;top:'+data[i]['pos-y']+'px;">'+
					'<a href="#" title="'+data[i]['firstname']+' '+data[i]['lastname']+'">'+
						'<span class="number textcolor-title2">'+data[i]['number']+'</span>'+
						'<span class="tooltip">'+
							'<img class="playerfoto" src="http://lorempixel.com/51/38" alt="'+data[i]['firstname']+' '+data[i]['lastname']+'" width="51" height="38" />'+
							'<span class="arrow"></span>'+
							'<span class="name">'+data[i]['firstname']+' '+data[i]['lastname']+'</span>'+
							'<span class="position textcolor-title2">'+data[i]['position']+'</span>'+
							'<em>acciones</em>'+
							'<span class="actions">'+ actions + 
							'</span>'+
						'</span>'+
					'</a>'+
				'</span>';
			}
			el.find('span.players').html(miHTML);
			if ( $.browser.msie && $.browser.version < 9) {
					$('section.wdg_alineacion_field_01 .player a span.number').corner("cc:#418E00");
			   }
		  }
		}).done(function() {
			// post update
		});
	}
	$('section.wdg_alineacion_field_01').each(function(){
		/* Show Retina Version */
		var root = (typeof exports == 'undefined' ? window : exports);
		var config = {check_mime_type: true};
		root.Retina = Retina;
		function Retina() {}
		Retina.configure = function(options) {
		    if (options == null) options = {};
		    for (var prop in options) config[prop] = options[prop];
		};
		Retina.isRetina = function(){
			var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
	                           (min--moz-device-pixel-ratio: 1.5),\
	                           (-o-min-device-pixel-ratio: 3/2),\
	                           (min-resolution: 1.5dppx)";
			if (root.devicePixelRatio > 1) 
				return true;
			if (root.matchMedia && root.matchMedia(mediaQuery).matches)
				return true;
			return false;
		};
		
		var $parent = $(this); // store component
		
		if (Retina.isRetina()) {
			var low = $parent.find('img.cancha').attr('src');
			$parent.find('img.cancha').attr('src',low.replace('.png','@2x.png'));
		}
		
		// attach click event to navigation
		$parent.find('ul.menu a').click(function(){
			$(this).parents('ul.menu').find('li').removeClass('active');
			$(this).parent().addClass('active');
			//console.log('loading players...');
			loadAlineacion($parent, $(this).data('query'));
			return false;
		});
		
		// fire a click on the first link
		$parent.find('ul.menu a:eq(0)').click();
	});
});