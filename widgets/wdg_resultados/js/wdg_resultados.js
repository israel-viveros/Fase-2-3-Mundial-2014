;jQuery(function($){ 
    (function($,T){
    	/*Swipe*/
    	var altWdgResult01 = 0;
    	if ($(window).width() < 978 && $(window).width() > 624){
    		altWdgResult01 = 568;
    	}
    	else{
    		altWdgResult01 = 163;  		
    	} 
    	
		$('.wdg_resultados .deg').bind('swipeup',function(){
			$(this).animate({
                    'scrollTop': $(this).scrollTop() + altWdgResult01
                }, 500);
		});
		$('.wdg_resultados .deg').bind('swipedown',function(){
			$(this).animate({
                    'scrollTop': $(this).scrollTop() - altWdgResult01
                }, 500);
		});   		
		
    	
        $('.wdg_resultados').each(function(ix,element){ 
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $this.find('>ul')
            ;
            
            $this.find('a.prev, a.next, .deportes-prev, .deportes-next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev, .deportes-prev').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height()-7
                }, 500);
            });
            
            $this.find('a.next, .deportes-next').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height()+7
                }, 500);
            }); 
        });
		

      	$list = $('.wdg_resultados .deg li').size();
		$altura_li = parseInt($('.wdg_resultados .deg li').height());
		$altura = ($altura_li * $list) + $list;

        
      /*Monitoreo scroll*/
		$('.wdg_resultados .deg').scroll(function() {
				var $war1_position = $(this).scrollTop();
				
				//alert($(this).height());
				if($(window).width() < 624 ){$war1_altura = 813;}
				if ($.browser.msie ){$war1_altura = 470;}
				else{$war1_altura = $(this).height()}
				
				
				if($war1_position >= $war1_altura) {
					$(this).siblings('.degraded').css("visibility","hidden");
					//$(this).siblings('.controls').children('.next').children('.tvsa-caret-down').css('color','#000');
					
					$(this).siblings('.controls').children().children('.tvsa-caret-down').parent().removeClass('bgactive');
					$(this).siblings('.controls').children().children('.tvsa-caret-down').parent().addClass('bginactive');
					
      			}else{
					$(this).siblings('.degraded').css("visibility","visible");
					//$(this).siblings('.controls').children().children('.tvsa-caret-down').css('color','#FFF');
					$(this).siblings('.controls').children().children('.tvsa-caret-down').parent().removeClass('bginactive');
					$(this).siblings('.controls').children().children('.tvsa-caret-down').parent().addClass('bgactive');
				}
				
				if($war1_position == 0){
					//$(this).siblings('.controls').children('.prev').children('.tvsa-caret-up').css('color','#000');
					$(this).siblings('.controls').children().children('.tvsa-caret-up').parent().removeClass('bgactive');
					$(this).siblings('.controls').children().children('.tvsa-caret-up').parent().addClass('bginactive');
				}
				else{
					//$(this).siblings('.controls').children('.prev').children('.tvsa-caret-up').css('color','#FFF');
					$(this).siblings('.controls').children().children('.tvsa-caret-up').parent().removeClass('bginactive');
					$(this).siblings('.controls').children().children('.tvsa-caret-up').parent().addClass('bgactive');
				}
				//console.log('Scroll: '+$war1_position+' suma: '+$(this).height());
			});	   
        

    })($,Televisa);
});

if ($.browser.msie && parseInt($.browser.version, 10) <= 7){
      $(function() {
        var zIndexNumber = 1000;
        $('.wdg_resultados div').each(function() {
            $(this).css('zIndex', zIndexNumber);
            zIndexNumber -= 10;
        });
    });
 }
 