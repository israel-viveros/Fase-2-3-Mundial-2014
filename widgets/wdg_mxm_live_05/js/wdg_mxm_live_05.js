;jQuery(function($){ 
    (function($,T){

         $(window).resize(function() {
            $('.wdg_mxm_live_05 .tvsa-videocamera').click(function(eventObj){
                if($(window).width()>960){
                    var $title = $(this).parent().siblings('.chronic').text();
                    $(this).parent().siblings('.img_stage_01').hide();
                    var $toLightbox = '';
                    $toLightbox =  $(this).parents('li').html();
                    $toLightbox =  $toLightbox.replace("tvsa-videocamera", "tvsa-error close");
                    $('.wdg_mxm_live_05_list_lightbox').html($toLightbox);
                    $('.form-container').lightbox_me({
                        centered: true, 
                        lightboxSpeed: "normal",
                        overlayCSS: {background: '#efefef', opacity: 0.9, 'margin-top': '148px',
                        closeSelector: ".tvsa-error"}
                    });
                    
                    $('.vid_player_01_black').text($title);
                                    
                    eventObj.preventDefault();
                }
            }); 
        });
            $('.wdg_mxm_live_05 .tvsa-videocamera').click(function(eventObj){
        if($(window).width()>=960){
                var $title = $(this).parent().siblings('.chronic').text();
                $(this).parent().siblings('.img_stage_01').hide();
                var $toLightbox = '';
                $toLightbox =  $(this).parents('li').html();
                $toLightbox =  $toLightbox.replace("tvsa-videocamera", "tvsa-error close");
                $('.wdg_mxm_live_05_list_lightbox').html($toLightbox);
                $('.form-container').lightbox_me({
                    centered: true, 
                    lightboxSpeed: "normal",
                    overlayCSS: {background: '#efefef', opacity: 0.9, 'margin-top': '148px',
                    closeSelector: ".tvsa-error"}
                });
                
                $('.vid_player_01_black').text($title);
                                
                eventObj.preventDefault();
        }
            });



        $('.tvsa-error').trigger('close');
        $('.wdg_mxm_live_05').each(function(ix,element){
            
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $this.find('.wdg_mxm_live_05_list');
                
            
            $this.find('a.prev, a.next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height()
                }, 500);
            });
            
            $this.find('a.next').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height()
                }, 500);

            });
            
        });
        

        $('.wdg_mxm_live_05 .tvsa-camera').on('click',function(event){
            $(this).parent().siblings('.img_stage_01').toggle();
            $(this).toggleClass("textcolor-title1");
            $(this).parent().siblings('.vid_player_01').hide();
            $(this).parent().siblings('.icon-interactive').find('i').removeClass("textcolor-title1");
        });
        //  $('.wdg_mxm_live_05 .tvsa-videocamera').on('click',function(event){
        //     console.log( $(this).parent().siblings('.vid_player_01'));
        //     $(this).parent().siblings('.vid_player_01').toggle();
        //     $(this).toggleClass("textcolor-title1");
        //     $(this).parent().siblings('.img_stage_01').hide();
        //     $(this).parent().siblings('.icon-interactive2').find('i').toggle();
        //     // $(this).parent().toggleClass('background-color1');
        //     $(this).toggleClass('tvsa-error');
        // });
		
		$('.wdg_mxm_live_05 .wdg_mxm_live_05_list').scroll(function() {
			  altura =  parseInt($('.wdg_mxm_live_05 .wdg_mxm_live_05_list').prop('scrollHeight'));
			  altura = altura;
			  $scrollTop = parseInt( $('.wdg_mxm_live_05 .wdg_mxm_live_05_list').height()) + parseInt($('.wdg_mxm_live_05 .wdg_mxm_live_05_list').scrollTop());
			  $scrollTop = $scrollTop;
			if( $('.wdg_mxm_live_05 .wdg_mxm_live_05_list').height() + $('.wdg_mxm_live_05 .wdg_mxm_live_05_list').scrollTop() == altura) {
           		 $('.wdg_mxm_live_05 .degradado').css("visibility","hidden");
      			}else{
				 $('.wdg_mxm_live_05 .degradado').css("visibility","visible");
				}
			});	 
		
    })($,Televisa);
});