;jQuery(function($){ 
    (function($,T){
		
		function ocultar(){
			$('.wdg_mxm_live_03 .not_here').hide();
			$('.wdg_mxm_live_03 .vid_player_01 .not_here').hide();
			$('.wdg_mxm_live_03 .img_stage_01 .not_here').hide();
			$('.wdg_mxm_live_03 .vid_player_01 .not_here').css('display','none');
			$('.wdg_mxm_live_03 .img_stage_01 .not_here').css('display','none');
			$('.wdg_mxm_live_03 .tvsa-videocamera').removeClass("tvsa-error");
			$('.wdg_mxm_live_03 .tvsa-camera').show(); 
		};
		
		
        $('.wdg_mxm_live_03').each(function(ix,element){
            
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $this.find('.wdg_mxm_live_03_list');
                
            
            $this.find('a.prev, a.next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev').bind(Pointer.DOWN,function(){
                $('.wdg_mxm_live_03 .scroll').animate({
                    'scrollTop': $('.wdg_mxm_live_03 .scroll').scrollTop() - $theUl.height()
                }, 500);
            });
            
            $this.find('a.next').bind(Pointer.DOWN,function(){
                $('.wdg_mxm_live_03 .scroll').animate({
                    'scrollTop': $('.wdg_mxm_live_03 .scroll').scrollTop() + $theUl.height()
                }, 500);

            });
            
        });
        
        $('.wdg_mxm_live_03 .wdg_mxm_live_03_verMas').click(function(event){
            event.preventDefault();
            $('.wdg_mxm_live_03 ul').css('height','auto');
            $('.wdg_mxm_live_03 .wdg_mxm_live_03_verMas').hide();
			$('.wdg_mxm_live_03 .degradado').hide();
        });
		
		var activo_img = 0;
        var activo_vid = 0;
        $('.wdg_mxm_live_03 .tvsa-camera').on('click',function(event){
        	
			$('.wdg_mxm_live_03 .tvsa-videocamera').removeClass("textcolor-title1"); 
			$('.wdg_mxm_live_03 .tvsa-camera').removeClass("textcolor-title1");
			$('.wdg_mxm_live_03 .vid_player_01').removeClass('here').addClass('not_here');
			$('.wdg_mxm_live_03 .img_stage_01').removeClass('here').addClass('not_here');
			$(this).parent().next('.img_stage_01').removeClass('not_here').addClass('here');
			ocultar();
			
			var edo_this = $(this).parent().next('.img_stage_01').css('display'); 
			if(edo_this == 'block' ){
				$(this).parent().next('.img_stage_01').removeClass('here').addClass('not_here');
				$(this).parent().next('.img_stage_01').hide();
				$(this).addClass("textcolor-title1");
				
			}
			else{
				$(this).parent().next('.img_stage_01').show();
			}
			
            $(this).toggleClass("textcolor-title1");
			$(this).parent().siblings('.not_here').hide();
            $(this).parent().siblings('.vid_player_01').hide();
            $(this).parent().siblings('.icon-interactive').find('i').removeClass("textcolor-title1");
			
        });
         $('.wdg_mxm_live_03 .tvsa-videocamera').on('click',function(event){
            /*console.log( $(this).parent().siblings('.vid_player_01'));
			$alt_prev = $(this).parent().attr('data-nombre');
			$alt_prev2 = $(this).parent().attr('class')
			$hermano_del_padre = $(this).parent().siblings('.chronic');
			console.log($(this).parent().siblings('.chronic'));*/
			//console.log("entro: "+$(this).attr('class'));
        	 $('.tvsa-videocamera').removeClass("active");
			activo_vid = $(this).attr('class');
			if(activo_vid == "tvsa-videocamera"){
				/*Esconder todo*/
				$('.vid_player_01').hide();
				$('.tvsa-videocamera').removeClass("tvsa-error"); 
				$('.tvsa-videocamera').removeClass("textcolor-title1"); 
				$('.img_stage_01').hide();
				$('.tvsa-camera').removeClass("textcolor-title1");
				$('.tvsa-camera').show();
				//alert("mostrar video");		
				/*.............*/
			
			}
			//vsa-videocamera textcolor-title1 active tvsa-error
			$(this).addClass("active");
            $(this).parent().siblings('.vid_player_01').toggle();
            $(this).toggleClass("textcolor-title1");
            $(this).parent().siblings('.img_stage_01').hide();
            $(this).parent().siblings('.icon-interactive2').find('i').toggle();
            $(this).toggleClass('tvsa-error');
			activo_vid2 = $(this).attr('class');
			if( activo_vid2 == "tvsa-videocamera active")
			{
				//alert("cerrar video");
				$('.tvsa-videocamera').removeClass("active");				
			}
			//console.log("salgo: "+$(this).attr('class'));
        });
		
		
		/*Mido ancho pantalla
		anchoVentana = $(window).width();
		calc = anchoVentana - 22;
		if(anchoVentana < 624)
		{
			$('.wdg_mxm_live_03 .mantener').css('width',calc);
		}
		else
		{
			$('.wdg_mxm_live_03 .mantener').css('width','100%');
		}
		Diferente ventana
		$(window).resize(function() {
			if( $(window).width() > 960  ){
				$('.wdg_mxm_live_03 .mantener').css('width',624);
			}
			if( $(window).width() > 624 && $(window).width() < 960  ){
				$('.wdg_mxm_live_03 .mantener').css('width',624);
			}
			if( $(window).width() < 624 ){
				$('.wdg_mxm_live_03 .mantener').css('width',calc);
			}
		});*/
		
		
		$('.wdg_mxm_live_03 .scroll').scroll(function() {
			var altura = $('.wdg_mxm_live_03 .wdg_mxm_live_03_list').height();
				$scrollTop = parseInt($('.wdg_mxm_live_03 .scroll').scrollTop()) + parseInt($('.wdg_mxm_live_03 .scroll').height());
			if( parseInt($scrollTop) == parseInt(altura)) {
           		 $('.wdg_mxm_live_03 .degraded').css("visibility","hidden");
      			}else{
				 $('.wdg_mxm_live_03 .degraded').css("visibility","visible");
				}
			});	    
		
    })($,Televisa);
});


