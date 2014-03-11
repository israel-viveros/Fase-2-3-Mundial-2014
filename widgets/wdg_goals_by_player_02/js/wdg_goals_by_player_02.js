$(document).ready(function() {
    var onDocumentReady = function() {
        
		// TODO: refactor for a better approach
        var $parent = $('.wdg_goals_by_player_02');
        var $dropdownAnchor = $parent.find('.wdg_goals_by_player_02_dropdown');
		
        var $firstItem = $('.wdg_goals_by_player_02_dropdownlist li:first-child');        
        $('.pleca_superior .wdg_goals_by_player_02_dropdowncontent p').html($firstItem.find('p').html());
		
		var $firstItem2 = $('.pleca_inferior .wdg_goals_by_player_02_dropdownlist li:first-child'); 
		$('.pleca_inferior .wdg_goals_by_player_02_dropdowncontent p').html($firstItem2.find('p').html());
        
        $dropdownAnchor.bind('click', function(evt) {
            
			evt.preventDefault();
            
			var listItems = $(this).find('.wdg_goals_by_player_02_listcontainer').find('.wdg_goals_by_player_02_dropdownlist');
            var padre = $(this);
            var visibilidad = listItems.css('visibility'); 
            
			if ( visibilidad == 'hidden' ) 
                listItems.css({
                    visibility: 'visible',
                    height: 'auto',
                    'max-height' : '180px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden'         
                });
             else 
                 listItems.css({
                    visibility: 'hidden',
                    height: '0px'
                });
				
          
			
			var $dropdownItems2 = $(this).find('.wdg_goals_by_player_02_dropdownlist li');
            $dropdownItems2.bind('click', function(evt) {
               
                evt.preventDefault();
                padre.find('.wdg_goals_by_player_02_dropdowncontent p').html($(this).find('p').html());
				
				// ORDENAR LA TABLA //
				var orden = $(this).find('p').attr('data-sort');
				var sorting = [[orden,0]]; 
				// sort on the first column 
				$(".wdg_goals_by_player_02 #tableDraftOperation").trigger("sorton",[sorting]); 
				customize_table(orden);
            });
			
			
        });
		
		
        $(".wdg_goals_by_player_02 #tableDraftOperation thead tr:nth-child(1) th").click(function(e) {
            
			var orden = $('.wdg_goals_by_player_02 #tableDraftOperation thead tr:nth-child(1) th').index(this);
			//$('.wdg_goals_by_player_02 .pleca_inferior .wdg_goals_by_player_02_dropdowncontent p').text($(this).text());
			customize_table(orden);
        });
		
		
		$(function() {
			$("#tableDraftOperation").tablesorter({
				//sortList: [[0,0]] 
				
			});
		});
		$dropdownAnchor.bind('mouseleave', function(evt) {
            evt.preventDefault();
            var $listItems = $(this).find('.wdg_goals_by_player_02_dropdownlist');
            var visibilidad = $listItems.css('visibility');
            if ( visibilidad == 'visible' ) {
                $listItems.css({
                    visibility: 'hidden',
                    height: '0px'       
                });
            } 
        });
         
    };
    $(onDocumentReady);

  
	function customize_table(orden){
		
		$('.wdg_goals_by_player_02 #tableDraftOperation thead tr:nth-child(2) th').removeClass('sel');
		var ordenmas1 = parseInt(orden)+1;
		//alert(ordenmas1);
		$('.wdg_goals_by_player_02 #tableDraftOperation thead tr:nth-child(2) th:nth-child('+ordenmas1+')').addClass('sel');
		
		$('.wdg_goals_by_player_02 #tableDraftOperation td').removeClass('sel');
		$('.wdg_goals_by_player_02 #tableDraftOperation td:nth-child('+ordenmas1+')').addClass('sel');
	}

	$(function() {
    var zIndexNumber = 1000;
    $('.wdg_goals_by_player_02 div.pleca_inferior').each(function() {
        $(this).css('zIndex', zIndexNumber);
        zIndexNumber -= 10;
    });
});
});