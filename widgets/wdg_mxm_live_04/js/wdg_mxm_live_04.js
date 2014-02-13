;jQuery(function($){ 
    (function($,T){
    	
    	var activo_img = 0;
		var activo_vid = 0;	
		
function ocultar(){
			$('.wdg_mxm_live_04 .not_here').hide();
			$('.wdg_mxm_live_04 .vid_player_01 .not_here').hide();
			$('.wdg_mxm_live_04 .img_stage_01 .not_here').hide();
			$('.wdg_mxm_live_04 .vid_player_01 .not_here').css('display','none');
			$('.wdg_mxm_live_04 .img_stage_01 .not_here').css('display','none');
			$('.wdg_mxm_live_04 .tvsa-videocamera').removeClass("tvsa-error");
			$('.tvsa-camera').show(); 
	};
	     //Click camera
        $('.wdg_mxm_live_04 .tvsa-camera').on('click',function(event){
			$('.wdg_mxm_live_04 .tvsa-videocamera').removeClass("textcolor-title1"); 
			$('.wdg_mxm_live_04 .tvsa-camera').removeClass("textcolor-title1");
			$('.wdg_mxm_live_04 .vid_player_01').removeClass('here').addClass('not_here');
			$('.wdg_mxm_live_04 .img_stage_01').removeClass('here').addClass('not_here');
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
        
        //Click videocamera
         $('.wdg_mxm_live_04 .tvsa-videocamera').on('click',function(event){ 
		 	// $('.tvsa-videocamera').removeClass("active");          
			activo_vid = $(this).attr('class');
			console.log(activo_vid);
			// alert(activo_vid);
			if(activo_vid == "tvsa-videocamera" || activo_vid == "tvsa-videocamera slvzr-hover" || activo_vid == "tvsa-videocamera active slvzr-hover"){
				//Esconder todo
				$('.vid_player_01').hide();
				$('.tvsa-videocamera').removeClass("tvsa-error"); 
				$('.tvsa-videocamera').removeClass("textcolor-title1"); 
				$('.img_stage_01').hide();
				$('.tvsa-camera').removeClass("textcolor-title1");	
				$('.tvsa-camera').show();			
			}
			
			//vsa-videocamera textcolor-title1 active tvsa-error
			$(this).addClass("active");
            $(this).parent().siblings('.vid_player_01').toggle();
            $(this).toggleClass("textcolor-title1");
            $(this).parent().siblings('.img_stage_01').hide();
            $(this).parent().siblings('.icon-interactive2').find('i').toggle();
            $(this).toggleClass('tvsa-error');
			activo_vid2 = $(this).attr('class');
			
			if( activo_vid2 == "tvsa-videocamera active"){
				$('.tvsa-videocamera').removeClass("active");
			}
			
        }); 

		$('.ie7 .wdg_mxm_live_04 .tvsa-videocamera').on('click',function(event){
			$('.ie7 .wdg_mxm_live_04 .tvsa-error').hide();
			$('.ie7 .wdg_mxm_live_04 .tvsa-videocamera').show();
			$(this).hide();
			$(this).next('i').show();
		});

		$('.ie7 .wdg_mxm_live_04 .tvsa-error').on('click',function(event){
			$(this).hide();
			$('.ie7 .wdg_mxm_live_04 .tvsa-videocamera').show();
			$('.ie7 .wdg_mxm_live_04 .tvsa-camera').show();
			$('.ie7 .wdg_mxm_live_04 .vid_player_01').hide();
		});

    })($,Televisa);
});