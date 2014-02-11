;jQuery(function($){ 
    (function(T, $) {
        // var $widthF = $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width() - 5;
        var $x = $('.wdg_matchesresult_01_nav');
        var $y = $('.wdg_matchesresult_01_nav ul li');
        var $z = $('.wdg_matchesresult_01_nav ul li:first-child');
        var $show = $('.wdg_matchesresult_hide');
        var $hide = $('.wdg_matchesresult_show');
        var $totalWidth = 0;
        var $slide = $z.outerWidth(true);
        $y.each(function() {
            $totalWidth += $(this).outerWidth(true);
        });
        var $m = $('.wdg_matchesresult_01_components'),
        animationDelay = 500;
        var $w = $('.wdg_matchesresult_01_components ul li');
        var $count = 0;
        $w.each(function() {
            $count ++;
        });
        var $unitary = $w.outerWidth(true);
        var $unitaryH = $w.outerHeight(true);
        var $round = 1;
        if($.browser.msie && parseFloat($.browser.version) <= 8){
        }
        else{
            $(window).resize(function() {
                var visShow = $show.css('visibility');
                //var visHide = $hide.css('visibility'); 
                $unitary = $w.outerWidth(true);
                $totalWidth = 0;
                $y.each(function() {
                    $totalWidth += $(this).outerWidth(true);
                });
	
                if( $(window).width() > 960  ){
                    $round = Math.round($count/3);
                    if( ($count / 3) > $round )
                        $m.find('ul').width(800);
                    else
                        $m.find('ul').width(800);
                    $m.find('ul').height(575);
                    $m.height(575);
                    $x.find('ul').width(800);
                    if ( visShow == 'hidden' ) {
                        $('.wdg_matchesresult_01').animate({
                            'height': 700
                        }, 0);
                    }
                }
                if( $(window).width() > 623 && $(window).width() <= 960){
                    $round = Math.round($count/2);
					
					// Se comentan estas lineas ya que modifican el ancho del ul del carrusel y descuadra en tablet
                    /*if( ($count / 2) > $round )
                        $m.find('ul').width( (($round + 1) * $unitary) - 152);
                    else
                        $m.find('ul').width( ($round * $unitary) - 152);
					
                    $m.find('ul').height($unitaryH * 2);*/
                    $m.height($unitaryH * 2);
                    //$x.find('ul').width( $totalWidth + 20 );
                    if ( visShow == 'hidden' ) {
                        $('.wdg_matchesresult_01').animate({
                            'height': 460
                        }, 0);
                    }
                }
                if( $(window).width() < 624 ){    
                    $round = Math.round($count);
                    $m.find('ul').width( ($round * $unitary) - 6);
                    $m.height($unitaryH + 28);
                    $m.find('ul').height($unitaryH);
                    /*if ( visShow == 'hidden' ) {

                    }*/
                    $('.wdg_matchesresult_01').animate({
                        'height': 218
                    }, 0);

                }
                $m.animate({
                    'scrollLeft': 0
                }, 0);  


            });
        }
        $m.each(function() {
            var $parent = $(this);
            var $items = $(this).find('ul li');
            $count = 0;
            $items.each(function() {
                $count ++;
            });
            if (T.getDeviceSize() === 'large') {
                $round = Math.round($count/3);
                if( ($count / 3) > $round )
                    $(this).find('ul').width( ($round + 1) * $unitary);
                else
                    $(this).find('ul').width( $round * $unitary);
                $(this).find('ul').height($unitaryH * 3);
                $(this).height($unitaryH * 3);
            }
            if (T.getDeviceSize() === 'medium') {
                $round = Math.round($count/2);
                /*if( ($count / 2) > $round )
                    $(this).find('ul').width( ($round + 1) * $unitary);
                else
                    $(this).find('ul').width( $round * $unitary);*/
                $(this).find('ul').height($unitaryH * 2);
                $(this).height($unitaryH * 2);
            }
            if (T.getDeviceSize() === 'small') {
                $round = Math.round($count);
                $(this).find('ul').width( ($round * $unitary));
                $(this).find('ul').height($unitaryH);
                $(this).height($unitaryH + 28);
            }
			/*Arrows Mobile*/
            $parent.parent().find('.wdg_matchesresult_01_mobileleft a.wdg_matchesresult_left').click(function(e) {
                e.preventDefault();
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() - 222
                }, animationDelay,"linear",function(){
					/*Verifico posición del scroll*/ 
					var large_tot = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_list').width();
					large_tot = large_tot -220;
					var position = $parent.scrollLeft();//alert("termine izq " + position +" "+ large_tot);
					if(position < 222)
						{
							//$('.wdg_matchesresult_01 #left').addClass('end');
							$('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#6C0808');
						}
						else
						{
							//$('.wdg_matchesresult_01 #left').removeClass('end');
							$('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#D6A256');
						}  
					if(position == large_tot)
						{
							$('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#6C0808');
						}
						else
						{
							$('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#D6A256');
						}
					});  
				
            });
						
            $parent.parent().find('.wdg_matchesresult_01_mobileright a.wdg_matchesresult_right').click(function(e) {
                e.preventDefault();
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() + 222
                }, animationDelay,"linear",function(){
					/*Verifico posición del scroll*/ 
					var large_tot = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_list').width();
					large_tot = large_tot -220;
					var position2 = $parent.scrollLeft();//alert("termine der " + position2);
					if(position2 < 222)
						{
							//$('.wdg_matchesresult_01 #left').addClass('end');
							$('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#6C0808');
						}
						else
						{
							//$('.wdg_matchesresult_01 #left').removeClass('end');
							$('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#D6A256');
						} 
						if(position2 >= large_tot)
						{
							$('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#6C0808');
						}
						else
						{
							$('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#D6A256');
						}
					});
					  
            	});
				/*Arrows Tablet*/
				$parent.parent().find('.wdg_matchesresult_01_arrows a.wdg_matchesresult_left').click(function(e) {
                	e.preventDefault();
               	 	$parent.animate({
                   	 	'scrollLeft': $parent.scrollLeft() - 370
                	}, 500);
            	});
				$parent.parent().find('.wdg_matchesresult_01_arrows a.wdg_matchesresult_right').click(function(e) {
                	e.preventDefault();
               	 	$parent.animate({
                   	 	'scrollLeft': $parent.scrollLeft() + 370
                	}, 500);
            	});
			
        });
        $(document).ready(function(){
			if($(window).width()>=948){$_brinca = 888}
			if($(window).width()>=624){$_brinca = 370}
			if($(window).width()<624){$_brinca = 222}	
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').bind('swipeleft',function(){
                        $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').animate({
                                'scrollLeft': $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scrollLeft() + $_brinca
                            }, 500);
                    });
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').bind('swiperight',function(){
                        $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').animate({
                                'scrollLeft': $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scrollLeft() - $_brinca
                            }, 500);
                    }); 
        });

		/*Monitorea scroll*/
		$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').scroll(function() {

            var $scroll = $('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components');
            var $width = $('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width()-5;
            var $widthT = $scroll.scrollLeft() + $scroll.width();
                // var $height = $parent.height();
                $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left').css('color','#D6A256');
                if($scroll.scrollLeft()==0){
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-left').css('color','#6C0808');
                } 
                else{
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-left, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-left').css('color','#D6A256');
                }
                if($width<$widthT){
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-right, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-right').css('color','#6C0808');
                } 
                else{
                    $('.wdg_matchesresult_01 .wdg_matchesresult_01_mobileleft .tvsa-double-caret-right, .wdg_matchesresult_01 .wdg_matchesresult_01_arrows .tvsa-double-caret-right').css('color','#D6A256');  
                }


			var position3 = $(this).scrollLeft();
			var large_tot = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_list').width();
					large_tot = large_tot -220;
			if(position3 < 222)
						{
							//$('.wdg_matchesresult_01 #left').addClass('end');
							$('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#6C0808');
						}
						else
						{
							//$('.wdg_matchesresult_01 #left').removeClass('end');
							$('.wdg_matchesresult_01 .wdg_matchesresult_left').css('color', '#D6A256');
						} 
						if(position3 >= large_tot)
						{
							$('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#6C0808');
						}
						else
						{
							$('.wdg_matchesresult_01 .wdg_matchesresult_right').css('color', '#D6A256');
						}
		});

		
        $x.each(function() {

            var $parent = $(this);

            if (T.getDeviceSize() === 'small') {
                $x.find('ul').width( $totalWidth + 20 );
            }
			$p = 0;
			$slide = 0;
			
			
			/*Sub menu principal*/
            $parent.parent().find('a.wdg_matchesresult_navleft').click(function(e) {
                e.preventDefault();
				//calculate move
				/*for($i=1;$i<4;$i++)
					{
					$z = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_theme li:nth-child('+$i+')');
						$sl = $z.outerWidth(true);
						$slide = $slide + $sl;
					}*/
                $parent.stop(true).animate({
                    'scrollLeft': $parent.scrollLeft() - 250
                }, animationDelay,"linear",function(){ 
				/*Verifico posición del scroll*/ 
					var large_tot = $(this).children().width();
					var position = $parent.scrollLeft();
					med = position + $(this).parent().width();
					if(position == 0)
						{
						$(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
						}
						else
						{
						$(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
						}  
					if(position != 0)
						{
						$(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#6C0808');
						}
						else
						{
						$(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#D6A256');
						}
					});        
            });

            
			$parent.stop(true).parent().find('a.wdg_matchesresult_navright').click(function(e) {
                e.preventDefault();
				//calculate move
				/*for($i=1;$i<4;$i++)
					{
					$z = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_theme li:nth-child('+$i+')');
						$sl = $z.outerWidth(true);
						$slide = $slide + $sl;
					}*/
                $parent.animate({
                    'scrollLeft': $parent.scrollLeft() + 250
                }, animationDelay,"linear",function(){ 
				/*Verifico posición del scroll*/ 
					var large_tot = $(this).children().width();
					var position = $parent.scrollLeft();
					med = position + $(this).parent().width();
					console.log('This es:'+$(this).attr('class')+' position: '+position);	
					if(position == 0)
						{
						$(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
						}
						else
						{
						$(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
						}  
					if(position != 0)
						{
						$(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#6C0808');
						}
						else
						{
						$(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#D6A256');
						}
					});    
            });
        });  
		
		/*Monitorea scroll sub menu principal*/
		$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_navcontainer .wdg_matchesresult_01_nav').scroll(function() {
			var position4 = $(this).scrollLeft();
			var large_tot4 = $('.wdg_matchesresult_01 ul.wdg_matchesresult_01_theme').width();
					large_tot4 = large_tot4 - 245;
			if(position4 < 57)
						{
						$(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#6C0808');
						}
						else
						{
						$(this).siblings('.wdg_matchesresult_navarrowleft').children().children().css('color', '#D6A256');
						}
						console.log('position: '+position4+' largo: '+large_tot4); 
						if(position4 >= large_tot4)
						{
						$(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#6C0808');
						}
						else
						{
						$(this).siblings('.wdg_matchesresult_navarrowright').children().children().css('color', '#D6A256');
						}
		});      

        $hide.click(function(e) {
            e.preventDefault();
            var $closeElement = $(this).closest('.wdg_matchesresult_01');
            $show = $closeElement.find('.wdg_matchesresult_hide');
            $hide = $closeElement.find('.wdg_matchesresult_show');
            var visShow = $show.css('visibility');
			 if (T.getDeviceSize() === 'large') {
			 $('.wdg_matchesresult_01 .wdg_matchesresult_01_left .wdg_matchesresult_visible').css('margin-top','32%');
			 }
            $closeElement.animate({
                'height': 218
            }, animationDelay);
            $(this).closest('.wdg_matchesresult_01_left').find('.wdg_matchesresult_01_bottom').hide();
            if ( visShow == 'hidden' ) {
                $show.css({
                    visibility: 'visible'      
                });
                $hide.css({
                    visibility: 'hidden'      
                });
                
            } else {
                $show.css({
                    visibility: 'hidden'
                });
                $hide.css({
                    visibility: 'visible'      
                });
            }
        });


        $show.click(function(e) {
            e.preventDefault();
            var $closeElement = $(this).closest('.wdg_matchesresult_01');
            $show = $closeElement.find('.wdg_matchesresult_hide');
            $hide = $closeElement.find('.wdg_matchesresult_show');
            var visHide = $hide.css('visibility'); 

            if (T.getDeviceSize() === 'large') {
				$('.wdg_matchesresult_01 .wdg_matchesresult_01_left .wdg_matchesresult_visible').css('margin-top','95%');
				$('.wdg_matchesresult_01 .wdg_matchesresult_01_container .wdg_matchesresult_01_right .wdg_matchesresult_01_components').css('height','575px');
                $closeElement.animate({
                    'height': 700
                }, animationDelay);
            }
            if (T.getDeviceSize() === 'medium') {
                $closeElement.animate({
                    'height': 460
                }, animationDelay);              
            }
            $(this).closest('.wdg_matchesresult_01_left').find('.wdg_matchesresult_01_bottom').show();
            if ( visHide == 'hidden' ) {
                $hide.css({
                    visibility: 'visible'      
                });
                $show.css({
                    visibility: 'hidden'
                });
                
            } else {
                $show.css({
                    visibility: 'visible'
                });
                $hide.css({
                    visibility: 'hidden'
                });
            }
        });
$(window).load(function(){
			if($(window).width() >= 948){$('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(800)}
			if($(window).width() < 948 && $(window).width() >= 624){$('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(1482)}
			if($(window).width() < 624){$('.wdg_matchesresult_01 .wdg_matchesresult_01_list').width(3546)}
});
		

    }(Televisa, jQuery));
});
