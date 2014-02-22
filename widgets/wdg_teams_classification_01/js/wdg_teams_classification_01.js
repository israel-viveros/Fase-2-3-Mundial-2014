;jQuery(function($){ 
    (function($,T){








        var $parent = $('.wdg_teams_classification_01');
        var $dropdownAnchor = $parent.find('.wdg_teams_classification_01_grupos .filter');
        $dropdownAnchor.on('click', function(evt) {
            var $listItems = $(this).find('.wdg_teams_classification_01_grupos_dropdownlist');
            var $visibility = $listItems.css('visibility');
            var padre =$(this);
            if ( $visibility == 'hidden' ) 
                $listItems.css({
                    visibility: 'visible',
                    height: 'auto',
                    'max-height' : '156px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden'         
                });
             else 
                 $listItems.css({
                    visibility: 'hidden',
                    height: '0px'
            });
              var $dropdownItems2 = $(this).find('.wdg_teams_classification_01_grupos_dropdownlist li');
            $dropdownItems2.bind('click', function(evt) {
                evt.preventDefault();
                padre.find('.wdg_teams_classification_01_grupos_dropdowncontent p').html($(this).find('p').html());
            });
           
            $listItems.bind('mouseleave', function(evt) {
                evt.preventDefault();
                var visibilidad = $(this).css('visibility');
                if ( visibilidad == 'visible' ) {
                     $(this).css({
                        visibility: 'hidden',
                        height: '0px'       
                    });
                } 
            });
        });















        $('.wdg_teams_classification_01').each(function(ix,element){
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $('.wdg_teams_classification_01 .scroll');
            
            $this.find('a.prev, a.next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev').bind(Pointer.DOWN,function(){
				$(this).parent().parent().siblings('.scroll').animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height() - 2
                }, 500);
            });
            
            $this.find('a.next').bind(Pointer.DOWN,function(){
                $(this).parent().parent().siblings('.scroll').animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height() + 2
                }, 500);
            });
     	});
		
		/*Swipe*/
		$(document).ready(function(){
		$wtc =  164;
			$('.wdg_teams_classification_01 .scroll').bind('swipeup',function(){
				$(this).animate({
						'scrollTop': $(this).scrollTop() + $wtc
					}, 500);
			});
			$('.wdg_teams_classification_01 .scroll').bind('swipedown',function(){
				$(this).animate({
						'scrollTop': $(this).scrollTop() - $wtc
					}, 500);
			});	
		});
		
		
		/*Monitoreo scroll*/
		var $wtc_altura = $('.wdg_teams_classification_01 .datos').height();
		$('.wdg_teams_classification_01 .scroll').scroll(function() {
				
				
				
				if($(this).scrollTop() + $(this).height() == $wtc_altura) {
           		 $(this).siblings('.degraded').css("visibility","hidden");
				 //$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-down').css('color','#000');
				  $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').addClass('bginactive');
				  $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').removeClass('bgactive');
      			}
				else if ($.browser.msie && parseInt($.browser.version, 10) <= 8 && $(this).scrollTop() >= 475){
					
					$(this).siblings('.degraded').css("visibility","hidden");
				 	
				  	$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').addClass('bginactive');
				  	$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').removeClass('bgactive');
				}
				else{
				 $(this).siblings('.degraded').css("visibility","visible");
				 //$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-down').css('color','#FFF');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').addClass('bgactive');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').removeClass('bginactive');
				}
				
				if($(this).scrollTop() == 0){
				 //$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-up').css('color','#000');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').addClass('bginactive');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').removeClass('bgactive');
				}
				else
				{
				//$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-up').css('color','#FFF');	
				$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').addClass('bgactive');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').removeClass('bginactive');
				}
			});	   
    })($,Televisa);
});
