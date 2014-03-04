;jQuery(function($){ 
    (function($,T){
		var $h_position = 0;
		var $cant = 19;
        $('.wdg_videoteca_01').each(function(ix,element){ 
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $this.find('.content_carru');
            
            $this.find('a.prev, a.next').click(function(event){
                event.preventDefault();
            });
			
			if ($.browser.msie){
				$cant = 10;
			}
			else{
				$cant = 12;
			}
            
            $this.find('a.prev').bind(Pointer.DOWN,function(){
				if($h_position == 0){}else{$h_position = $h_position -1;}
                $theUl.animate({
                    'scrollTop': $('.wdg_videoteca_01 .content_carru').scrollTop() - $('.wdg_videoteca_01 .content_carru').height() - $cant - 5 
                }, 500);
            });
            
            $this.find('a.next').bind(Pointer.DOWN,function(){
				if($h_position == 3){}else{$h_position = $h_position +1;}
                $theUl.animate({
                    'scrollTop': $('.wdg_videoteca_01 .content_carru').scrollTop() + $('.wdg_videoteca_01 .content_carru').height() + $cant + 5
                }, 500);
            }); 
			
        });
		
		
		
		
		$(window).load(function(){	
			$wv1_altura = $('.wdg_videoteca_01 .content_carru ul').height();
			if($(window).width() >= 948){$wv1_recorre = 317;}
			if($(window).width() < 948 && $(window).width() >= 624){$wv1_recorre = 309;}
			if($(window).width() < 624){$wv1_recorre = 315;}
		});
		$(window).resize(function() {
			$wv1_altura = $('.wdg_videoteca_01 .content_carru ul').height();
			if($(window).width() >= 948){$wv1_recorre = 317;}
			if($(window).width() < 948 && $(window).width() >= 624){$wv1_recorre = 309;}
			if($(window).width() < 624){$wv1_recorre = 315;}
		});
		
		
		
		
		$('.wdg_videoteca_01 .content_carru').scroll(function() {
				
				$wv1_position = $(this).scrollTop();
				$wv1_med = $(this).scrollTop() + $(this).height();
				
				$wv1_altura = $(this).find('ul').height();
				
				if($wv1_position == 0){
				 	$(this).siblings('.view').children('.prev').addClass('bginactive');
				}else{
					$(this).siblings('.view').children('.prev').removeClass('bginactive');
				}
				if($wv1_med >= $wv1_altura){
					$(this).siblings('.degraded').css("visibility","hidden");
					$(this).siblings('.view').children('.next').addClass('bginactive');
				}
				else
				{
					$(this).siblings('.degraded').css("visibility","visible");
					$(this).siblings('.view').children('.next').removeClass('bginactive');
				}
			});	
		/*Swipe*/
		$('.wdg_videoteca_01 .content_carru').bind('swipeup',function(){
			if($h_position == 3){}else{$h_position = $h_position +1;}
			$(this).animate({
                    'scrollTop': $(this).scrollTop() + $wv1_recorre
                }, 500);
				/*Desbloquea*/
				$wdvt_scrollH = $(this).scrollTop() + $(this).height();
                if($wv1_altura == $wdvt_scrollH){
                    $('body,html').animate({
                        scrollTop: $(window).scrollTop() + 100
                    }, 500);
                    return false;
                }
			});
		$('.wdg_videoteca_01 .content_carru').bind('swipedown',function(){
			if($h_position == 0){}else{$h_position = $h_position -1;}
			$(this).animate({
                    'scrollTop': $(this).scrollTop() - $wv1_recorre
                }, 500);
				/*Desbloquea*/
				$wdvt_scrollH = $(this).scrollTop() + $(this).height();
                if($(this).scrollTop() == 0){
                    $('body,html').animate({
                        scrollTop: $(window).scrollTop() - 100
                    }, 500);
                    return false;
                }
			});

        var $parent = $('.wdg_videoteca_01');
        var $dropdownAnchor = $parent.find('.lineaResultado');
        $dropdownAnchor.on('click', function(evt) {
            var $listItems = $(this).find('.wdg_videoteca_012_dropdownlist');
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
              var $dropdownItems2 = $(this).find('.wdg_videoteca_012_dropdownlist li');
            $dropdownItems2.bind('click', function(evt) {
                console.log('Entando');
                evt.preventDefault();
                padre.find('.wdg_videoteca_012_dropdowncontent p').html($(this).find('p').html());
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

    })($,Televisa);
});

if ($.browser.msie && parseInt($.browser.version, 10) <= 7){
      $(function() {
        var zIndexNumber = 1000;
        $('.wdg_videoteca_01 div').each(function() {
            $(this).css('zIndex', zIndexNumber);
            zIndexNumber -= 10;
        });
    });
 }
 