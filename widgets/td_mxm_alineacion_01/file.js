 $(document).ready(function() {	
 
 
 	$('.btn_6prog_02 .left2').click(function(e) {
        e.preventDefault();
		if($(window).width() > 960){var $b62_move = 972;}
		if ($.browser.msie && parseInt($.browser.version, 10) <= 9){var $b62_move = 995;}
			
		$(this).parent().parent().parent().siblings('.carrusel').animate({
			'scrollLeft': $(this).parent().parent().parent().siblings('.carrusel').scrollLeft() - $b62_move
		}, 500);		
	});
	
	$('.btn_6prog_02 .right2').click(function(e) {
        e.preventDefault();
		if($(window).width() > 960){var $b62_move = 972;}
		if ($.browser.msie && parseInt($.browser.version, 10) <= 9){var $b62_move = 995;}
		
		$(this).parent().parent().parent().siblings('.carrusel').animate({
			'scrollLeft': $(this).parent().parent().parent().siblings('.carrusel').scrollLeft() + $b62_move
		}, 500);		
	});
	
	
	
	
	if ($(window).width()>624){
	 	 $('.btn_6prog_02 .carrusel').on('swiperight',function(e) {
	        e.preventDefault();
	        
	        $(this).animate({
	            'scrollLeft': $('.btn_6prog_02 .carrusel').scrollLeft() - 648
	        });    
	    });

	    $('.btn_6prog_02 .carrusel').on('swipeleft',function(e) {
	        e.preventDefault();
	        
	       $(this).animate({
	            'scrollLeft': $('.btn_6prog_02 .carrusel').scrollLeft() + 648
	        });
	    });
 	}else{
	 	 $('.btn_6prog_02 .carrusel').on('swiperight',function(e) {
	        e.preventDefault();
	        if($(window).width() > 624){$b6p2_move = 320;}else{$b6p2_move = 325;}
	        $(this).animate({
	            'scrollLeft': $('.btn_6prog_02 .carrusel').scrollLeft() - $b6p2_move
	        });    
	    });

	    $('.btn_6prog_02 .carrusel').on('swipeleft',function(e) {
	        e.preventDefault();
	        if($(window).width() > 624){$b6p2_move = 320;}else{$b6p2_move = 325;}
	        $(this).animate({
	            'scrollLeft': $('.btn_6prog_02 .carrusel').scrollLeft() + $b6p2_move
	        });
	    });
 	}
	
    var lis = $('.btn_6prog_02 .type1a .carrusel ul li');
    var margin = 0;
    var ulWidth = 0;
    for(var i=0; i<lis.length; i++){
        margin += parseInt($(lis[i]).css("margin-left"));
        ulWidth += $(lis[i]).width();
    }
	$(window).load(function(){
		if($(window).width() < 624){var extra = 12;}else{var extra = 0;}
		ancho = ulWidth + margin + extra;
		$(".btn_6prog_02 .type1a .carrusel ul").width(ancho);
		// Sacamos el ancho total del UL del carrusel
		anchoTotalUL = $(".btn_6prog_02 .type1a .carrusel ul").width(); // 100%
	});

	// sacamos cuantas imagenes
	//var totalImagenes = $(".btn_6prog_02 .type1a .carrusel ul").length;
	
	// Sacamos el ancho total del UL del carrusel
	var anchoTotalUL = $(".btn_6prog_02 .type1a .carrusel ul").width(); // 100%
	
	
	var bulletSelected;
	var scrollLeft;
	
	if ($.browser.msie && parseInt($.browser.version, 10) <= 7){
		var anchoVentna = document.body.offsetWidth;
		//alert($.width());
		//alert(document.body.offsetWidth);
	}
	else{
		var anchoVentna =  $(window).width();
	}
	
	
	$('.btn_6prog_02 .type1a .carrusel').scroll(function(e){
		var $widthT = $('.btn_6prog_02 .type1a .carrusel').scrollLeft() + $('.btn_6prog_02 .type1a .carrusel').width();
		$('.btn_6prog_02 .type1a .carrusel ul').width();
		if($(this).scrollLeft()==0){
			$('.btn_6prog_02 .carouselArrowLeft i').addClass('inactive');
			// $('.btn_6prog_02 .carouselArrowLeft i').removeClass('arrow_active');	
		}
		else{
			$('.btn_6prog_02 .carouselArrowLeft i').removeClass('inactive');
			// $('.btn_6prog_02 .carouselArrowLeft i').addClass('arrow_active');	
		}
		
		
		if($widthT>=$('.btn_6prog_02 .type1a .carrusel ul').width()){
			$('.btn_6prog_02 .carouselArrowRight i').addClass('inactive');
			// $('.btn_6prog_02 .carouselArrowRight i').removeClass('arrow_active');	
		}
		else{
			$('.btn_6prog_02 .carouselArrowRight i').removeClass('inactive');
			// $('.btn_6prog_02 .carouselArrowRight i').addClass('arrow_active');	
		}

		if ($(window).width()<624){
			scrollLeft = $(this).scrollLeft()  + (anchoVentna/2.5) ;
			var porcentaje =  ( scrollLeft * 100) / anchoTotalUL; 
			if( scrollLeft <= 320)
				bulletSelected = 1;
			else if( scrollLeft >= 321 && scrollLeft <= 630)
				bulletSelected = 2;
			else if( scrollLeft >= 630 && scrollLeft <= 940)
				bulletSelected = 3;
			else if( scrollLeft >= 940 && scrollLeft <= 1250)
				bulletSelected = 4;
			else if( scrollLeft >= 1250 && scrollLeft <= 1560)
				bulletSelected = 5;
			else 
				bulletSelected = 6;
			$(this).parents('.type1a').siblings('.bullets').find('li').removeClass('background-color1');
			
			$(this).parents('.type1a').siblings('.bullets').find('li:nth-child('+bulletSelected+')').addClass('background-color1');
		}else{
			scrollLeft = $(this).scrollLeft()  + (anchoVentna/2.5) ;
			var porcentaje =  ( scrollLeft * 100) / anchoTotalUL; 
			if( scrollLeft <= 520)
				bulletSelected = 1;
			else if( scrollLeft >= 520 && scrollLeft <= 980)
				bulletSelected = 2;
			else 
				bulletSelected = 3;
			$(this).parents('.type1a').siblings('.bullets').find('li').removeClass('background-color1');
			
			$(this).parents('.type1a').siblings('.bullets').find('li:nth-child('+bulletSelected+')').addClass('background-color1');
		}
    });

});;$(document).ready(function() {
 
    ;(function ($, T) {
    	
		 var altura = $('.wdg_team_align_01 .principal').height();
		 altura = altura -71;
		 //alert("Verifica alto: " + altura);
		 /*Asigno altura dinámica separador*/
		 //$('.wdg_team_align_01 .separador').css('height',altura);
		 $firstTeam = $('.wdg_team_align_01 .first_team .logo span').text();
		 $secondTeam = $('.wdg_team_align_01 .second_team .logo span').text();

		 $('.wdg_team_align_01 .team1_name span').text($firstTeam);
		 $('.wdg_team_align_01 .team2_name span').text($secondTeam);

		 $firstImg = $('.wdg_team_align_01 .first_team .logo img').attr('src');
		 $secondImg = $('.wdg_team_align_01 .second_team .logo img').attr('src');

		 $('.wdg_team_align_01 .team1_name img').attr('src',$firstImg);
		 $('.wdg_team_align_01 .team2_name img').attr('src',$secondImg);

		 $('.wdg_team_align_01 .team1_name').on('click',function(){
		 	$('.wdg_team_align_01 .second_team').hide();
		 	$('.wdg_team_align_01 .first_team').show();
		 	$(this).addClass('current');
		 	$(this).siblings('div').removeClass('current');
		 	$('.wdg_team_align_01 .art_latestnews_01_arrow').css('left','24%');
		 });
		 $('.wdg_team_align_01 .team2_name').on('click',function(){
		 	$('.wdg_team_align_01 .second_team').show();
		 	$('.wdg_team_align_01 .first_team').hide();
		 	$(this).addClass('current');
		 	$(this).siblings('div').removeClass('current');
		 	$('.wdg_team_align_01 .art_latestnews_01_arrow').css('left','74%');
		 });
		
		var firstTeamArray = $( ".first_team table .widget_player_stats tr" );
		for (i=0;i<firstTeamArray.length;i++){
			$(firstTeamArray[i]).height();
		};

		var secondTeamArray = $( ".second_team table .widget_player_stats tr" );
		for (i=0;i<secondTeamArray.length;i++){
			$(secondTeamArray[i]).height();
		}

		for (j=0;j<27;j++){
			firstItem = $(firstTeamArray[j]).height();
			secondItem = $(secondTeamArray[j]).height();
			
			console.log(firstItem + ' = ' + secondItem);
			if(firstItem > secondItem){
				 $(secondTeamArray[j]).css('height',firstItem);
			}else if(firstItem > secondItem){
				 $(firstTeamArray[j]).css('height',firstItem);		
			}
		}
		$(window).resize(function() {
			 if( $(window).width() > 624  ){
			 	$('.wdg_team_align_01 .second_team').show();
		 		$('.wdg_team_align_01 .first_team').show();
			 }else{
			 	$('.wdg_team_align_01 .second_team').hide();
			 }
			 for (j=0;j<27;j++){
				firstItem = $(firstTeamArray[j]).height();
				secondItem = $(secondTeamArray[j]).height();
				if(firstItem > secondItem){
				 	$(secondTeamArray[j]).height(firstItem);
				}else if(firstItem < secondItem){
					 $(firstTeamArray[j]).height(secondItem);		
				}
			}
		});
  	}(jQuery, Televisa)); 
 });;jQuery(function($){ 
	 (function(T, $) {
		 
		 if ($(window).width() > 624) {
			$('.nav_smnu_sports_01 .nav_smnu_sports_01_bar a').on('mouseenter',function(e){
				$(this).parent('li').addClass('border-top1');
				$(this).addClass('textcolor-title1');
			}).on('mouseleave',function(e){
				if (! $(this).parent().hasClass('textcolor-title1')){
					//$(this).removeClass('textcolor-title1');
					$(this).parent('li').removeClass('border-top1');
					$(this).removeClass('textcolor-title1');
				}else{
					//No elimina clase
				}
			});
		 }
			
			/*Monitorero flechas*/
			$('.nav_smnu_sports_01 .navarrowleft').click(function(e) {
                e.preventDefault();
                $('.nav_smnu_sports_01 .container').animate({
                    'scrollLeft': $('.nav_smnu_sports_01 .container').scrollLeft() - 80
                });    
            });

            $('.nav_smnu_sports_01 .navarrowright').click(function(e) {
                e.preventDefault();
               $('.nav_smnu_sports_01 .container').animate({
                    'scrollLeft': $('.nav_smnu_sports_01 .container').scrollLeft() + 80
                });
            });
			
			$('.nav_smnu_sports_01 .container').scroll(function(e){
				//var $widthT = $('.nav_smnu_sports_01 .container').scrollLeft() + $('.nav_smnu_sports_01 .container').width();
				
				if($(this).scrollLeft()==0){
					$('.nav_smnu_sports_01 a .navlefticon i').addClass('inactive');
					$('.nav_smnu_sports_01 a .navlefticon i').removeClass('active');	
				}
				else{
					$('.nav_smnu_sports_01 a .navlefticon i').addClass('active');
					$('.nav_smnu_sports_01 a .navlefticon i').removeClass('inactive');
					
					$('.nav_smnu_sports_01 a .navrighticon i').removeClass('inactive');
					$('.nav_smnu_sports_01 a .navrighticon i').addClass('active');	
				}
				
				if($(this).scrollLeft() >= 145){
					$('.nav_smnu_sports_01 a .navrighticon i').removeClass('active');
					$('.nav_smnu_sports_01 a .navrighticon i').addClass('inactive');	
				}
				else{
					$('.nav_smnu_sports_01 a .navrighticon i').removeClass('inactive');
					$('.nav_smnu_sports_01 a .navrighticon i').addClass('active');	
				}
			});
	
			 	
	 }(Televisa, jQuery));
});/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
(function ($) {
    var nav_header = {
        speed : 500,
        init : function() {
            nav_header.initTopNav();
            nav_header.initMainNav();
            nav_header.initSearch();
            nav_header.initResize();
        },
        initResize : function() {
            $(window).resize(function(){
                //console.log('resize.');
            });
        },
        initTopNav : function() {
        	if ($(window).width() < 624) {
	        	var nHeight = $('header.nav_header_01 div.topnav div.inner > nav').show().height();
	    		$('header.nav_header_01 div.topnav div.inner > nav').attr('height',nHeight).hide(); // store height
        	}
        	
	        	$('header.nav_header_01 div.topnav div.inner > a.menu').click(function(){
	        		// @todo show submenu in mobile
	        		if ($(this).hasClass('active')) {
	        			// hide
	        			$('header.nav_header_01 div.inner a.arrow i.tvsa-caret-up').removeClass('tvsa-caret-up').addClass('tvsa-caret-down');
	        			$('header.nav_header_01 div.topnav div.inner > nav').animate({height:0},250,'easeInOutExpo',function(){$(this).hide();});
	        		} else  {
	        			// show
	        			$('header.nav_header_01 div.inner a.arrow i.tvsa-caret-down').removeClass('tvsa-caret-down').addClass('tvsa-caret-up');
	        			var h = $('header.nav_header_01 div.topnav div.inner > nav').attr('height');
                        
	        			$('header.nav_header_01 div.topnav div.inner > nav').show().css('height',0).animate({height:h+'px'},250,'easeInOutExpo');
	        		}
	        		$(this).toggleClass('active');
	        	});
        	
        	
        	$('header.nav_header_01 div.collapsable-verticals').show();
            $('header.nav_header_01 div.collapsable-verticals div.inner > div').each(function(){

               if ($.browser.msie && parseInt($.browser.version, 10) == 7)
                    $(this).attr('data-height',$(this).innerHeight()-100);
                else
                    $(this).attr('data-height',$(this).innerHeight());
            });
            $('header.nav_header_01 div.collapsable-verticals').hide();
            
            if ($(window).width() > 623) {
            $("header.nav_header_01 div.topnav nav li a").click(function(e){
                var c = $(this).data('collapsable'); // value of data-collapsable="attribute"
                
                var th = $('header.nav_header_01 div.'+c).data('height'); // content height
                //alert(th);
                var active = $(this).parent().hasClass('active');
                var visible = false;
                if ($('header.nav_header_01 div.collapsable-verticals').height() > 0 && $('header.nav_header_01 div.collapsable-verticals').css('display') !== 'none') {
                    visible = true; // test if collapsable is currently opened
                }
                var open = false;
                if (active && visible) {
                    open = true;
                }
                
                // store dom element(s) in order to reuse them without searching the dom again...
                $collapsable = $('header.nav_header_01 div.collapsable-verticals div.collapsable-content.'+c);
                $collapsables = $('header.nav_header_01 div.collapsable-verticals div.collapsable-content');
                
                $(this).parents('ul').find('li').removeClass('active');
                $(this).parent().addClass('active');
                
                // 3 scenarios:
                if (visible) {
                    if ($('header.nav_header_01 div.collapsable-verticals div.collapsable-content.open').hasClass(c)) {
                        nav_header.closeCollapsible(e, $collapsable, $collapsables, c);
                    } else {
                        // show different collapsible
                        $('header.nav_header_01 div.collapsable-verticals div.collapsable-content.open').animate({height:0},header.speed,'easeInOutExpo', function(){
                            $(this).hide().removeClass('open');
                        });
                        $collapsable.addClass('open').css({height:0}).show().animate({height:th+'px'},header.speed,'easeInOutExpo');
                    }
                } else {
                    // show a collapsible
                    $collapsables.removeClass('open');
                    $('header.nav_header_01 div.collapsable-verticals').show();
                    $('header.nav_header_01 div.collapsable-verticals div.collapsable-content').hide();
                    $('header.nav_header_01 div.collapsable-verticals div.'+c).css({height:0}).show().animate({height:th+'px'},header.speed,'easeInOutExpo').show();
                        $collapsable.addClass('open').css({height:0}).show().animate({height:th+'px'},header.speed,'easeInOutExpo',function(){
                    });
                    $(this).parent().addClass('active');
                }
                return false;
            });
            }
        },
        
        closeCollapsible: function(e, col, cols, c){
            col.animate({height:0},650,'easeInOutExpo', function() {
                $(e).hide();
            });
            $('header.nav_header_01 div.collapsable-verticals div.'+c).animate({height:0},header.speed,'easeInOutExpo', function(){
                $(this).hide();
                cols.removeClass('open');
            });
            $('header.nav_header_01 div.topnav ul li').removeClass('active');
        },
        
        initSearch : function() {
            if ( $.browser.msie ) {
                //alert( 'You are using Internet Exploiter v' + $.browser.version );
                /**
                 * @todo add placeholder text for IE (as value)
                 */
            }
            $("header.nav_header_01 div.topnav button.search_submit").click(function(){
                if ($(this).parent().hasClass('open')) {
                    nav_header.closeSearch();
                } else {
                    nav_header.openSearch();
                }
                return false;
            });
            
            $("header.nav_header_01 div.topnav form input[type=text]").keypress(function (e) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    $("header.nav_header_01 div.topnav form").submit();
                } else {
                    return true;
                }
            });;
        },
        
        initMainNav : function() {
        	$('header.nav_header_01 a:not(header.nav_header_01 nav.social a)').hover(
                function(){
                    nav_header.closeSocialNav();
                }
            );
            $('header.nav_header_01 li').hover(function(){
                $('.header.nav_header_01 .mas-deportes .tvsa-caret-down').show();
            });
            $('header.nav_header_01 div.mainnav a').click(
                function(){
                    nav_header.closeMoreSportsDropdown();
                    nav_header.closeSearch();
                }
            );
            $('header.nav_header_01 div.mainnav nav li a').each(function(){
                var classname = $(this).data('more');
                $('div.collapsable-mainnav').show();
                $(this).attr('data-height',$('div.collapsable-mainnav > div.'+classname).height());
                $('div.collapsable-mainnav').hide();
            });
            
            $("header.nav_header_01 div.mainnav nav li a").click(function(){
                nav_header.closeSearch();
                var classname = $(this).data('more');
                if (classname !== "" || classname !== "undefined") {
	                // only applies to links that have a more attribute
                	if ($('div.collapsable-mainnav > div.'+classname).length === 0) {
	                	// if there's no collapsible, send the visitor to the link
                		document.location = $(this).attr("href");
	                }
                }
                $(this).parents('div.mainnav').find('li').removeClass('active');
                if($(this).parent().text() == "Futbol " || $(this).parent().text() == "Boxeo" || $(this).parent().text() == "Beisbol"
                	|| $(this).parent().text() == "NFL"){
                	$(this).parent().addClass('active');
                }
                if ($(this).attr('data-more')) {
                    var classname = $(this).data('more');
                    var myheight = $(this).data('height');
                    
                    if ($(this).hasClass('open') === false) {
                        $('div.collapsable-mainnav, div.collapsable-mainnav > div').show();
                        $('div.collapsable-mainnav > div').hide();
                        $('header.nav_header_01 div.mainnav nav.main li a').removeClass('open').find('i.tvsa-caret-up').removeClass('tvsa-caret-up').addClass('tvsa-caret-down');
                        $('div.collapsable-mainnav div.'+classname).css({height:0}).show().animate({height:myheight+'px'},header.speed,'easeInOutExpo');
                        $(this).addClass('open').find('i').removeClass('tvsa-caret-down').addClass('tvsa-caret-up');
                    } else {
                        $('div.collapsable-mainnav div.'+classname).animate({myheight:0},header.speed,'easeInOutExpo',function(){
                            $('div.collapsable-mainnav, div.collapsable-mainnav > div').hide();
                            $('header.nav_header_01 div.mainnav nav.main li a i.tvsa-caret-up').removeClass('tvsa-caret-up').addClass('tvsa-caret-down');
                        });
                        $(this).removeClass('open');
                        $(this).parent().removeClass('active');
                    }
                } else {
                    $('div.collapsable-mainnav > div').hide();
                    $('header.nav_header_01 div.mainnav nav.main li a').removeClass('open').find('i.tvsa-caret-up').removeClass('tvsa-caret-up').addClass('tvsa-caret-down');
                }
                return false;
            });
            
            $("header.nav_header_01 div.mainnav nav.social li a").click(function(){
                $(this).parents('div.mainnav').find('li').removeClass('active');
                $(this).parent().addClass('active');
                return false;
            });
            
            $('header.nav_header_01 div.mainnav nav.social a.toggle').click(function(){
                nav_header.closeSearch();
                if ($(this).hasClass('open')) {
                    nav_header.closeSocialNav();
                } else {
                    nav_header.openSocialNav(this);
                }
                return false;
            });
            
            $('header.nav_header_01 div.collapsable-mainnav nav.tabs a').click(function(){
                var tab = $(this).data('tab');
                $(this).parents('ul').find('li').removeClass('active'); // remove active state from all
                $(this).parent().addClass('active'); // add active state to current
                $(this).parents("div.dropdown-content").find('div.maintab').hide(); // hide all
                $(this).parents("div.dropdown-content").find("div[data-tab='"+tab+"']").show();
                return false;
            });
            
            $('header.nav_header_01 div.collapsable-mainnav ul.subtabs a').click(function(){
                var tab = $(this).data('subtab');
                $(this).parents('ul.subtabs').find('li').removeClass('active'); // remove active state from all
                $(this).parent().addClass('active'); // add active state to current
                $(this).parents("div.maintab:eq(0)").find('div.subtab').hide(); // hide all
                $(this).parents("div.maintab:eq(0)").find("div.subtab[data-subtab='"+tab+"']").show();
                return false;
            });
        },
        
        openSocialNav : function(e) {
            nav_header.closeSearch();
            $('header.nav_header_01 div.mainnav nav.social ul').show();
            $(e).find('i').removeClass('tvsa-double-caret-down').addClass('tvsa-double-caret-up');
            $(e).addClass('open');
        },
        
        closeSocialNav : function() {
            $('header.nav_header_01 div.mainnav nav.social ul').hide();
            $('header.nav_header_01 div.mainnav nav.social a.toggle').removeClass('open').find('i').removeClass('tvsa-double-caret-up').addClass('tvsa-double-caret-down');
        },
        closeMoreSportsDropdown : function () {
            $('header.nav_header_01 div.mainnav nav.main li').removeClass('active');
        },
        
        openSearch : function() {
        	if ($(window).width() < 624) {
//        		$('form.site_search').addClass('open').find("input.search_term:eq(0)").show().animate({height:'36px'},150,'easeInOutExpo',function(){
//	            }).focus();
        		$('form.site_search').addClass('open').find("input.search_term:eq(0)").show().focus();
        	} else {
	        	$('form.site_search').addClass('open').find("input.search_term:eq(0)").show().animate({width:'180px'},150,'easeInOutExpo',function(){
	            }).focus();
        	}
            nav_header.closeSocialNav();
        },
        
        closeSearch : function() {
        	// submit the form if the value is not empty
        	// otherwise just hide the text input
    		if ($(window).width() < 624) {
//        		$('form.site_search').removeClass('open').find("input.search_term:eq(0)").animate({height:'0'},150,'easeInOutExpo',function(){
//                    $(this).hide();
//                });
        		$('form.site_search').removeClass('open').find("input.search_term:eq(0)").slideUp(333,'easeInOutExpo').blur();
        	} else {
        		$('form.site_search').removeClass('open').find("input.search_term:eq(0)").animate({width:'0'},150,'easeInOutExpo',function(){
                    $(this).hide();
                });
        	}
    		if (document.getElementById('search_term').value.length > 0) {
    			$("header.nav_header_01 div.topnav form").submit();
        	} 
        }
    };
    
    $(document).ready(function(){
        nav_header.init();
    });
})(jQuery);$(document).ready(function(){
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
});/*$(document).ready(function(e) {
	
	$(window).resize(function() {	
			if( $(window).width() < 624){
				//Nothing
			}
			else
			{
			    $('.collapsable').siblings().show();
			}
	});
	
	$('.collapsable').on('click',function(e){
		e.preventDefault();
		$(this).siblings().slideToggle('slow');
		$(this).find('i').toggleClass('tvsa-caret-down','tvsa-caret-up');
		var add = $(this).parent().attr('class');
		var directo = $('.'+add+' .str_pleca_01').css('margin-bottom');
		//console.log("Margin-bottom antes vale: " +add+ " bottom: " +directo);
		if(directo == "0px")
		{
			$('.'+add+' .str_pleca_01').css('margin-bottom',0);
		}
		else
		{
			$('.'+add+' .str_pleca_01').css('margin-bottom',0);
		}
		//console.log("Margin-bottom despues vale: " +add+ " bottom: " +directo);
	});	
});*/;jQuery(function($){ 
    (function($,T){
        $('.wdg_goalsanoted_01').each(function(ix,element){
            
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $this.find('.scroll-carrusel')
            ;
            
            $this.find('a.prev, a.next, .deportes-prev, .deportes-next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev, .deportes-prev').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height()
                }, 500);
            });
            
            $this.find('a.next, .deportes-next').bind(Pointer.DOWN,function(){
                $theUl.animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height()
                }, 500);

            });
            
        });
		
		var altura1 = $('.wdg_goalsanoted_01 .convocados').height();
		var altura2 = $('.wdg_goalsanoted_01 .wdg_mxm_penalties_01').height();
		var altura = altura1 +altura2;
		$('.wdg_goalsanoted_01 .scroll').scroll(function() {
				$scrollTop = parseInt($('.wdg_goalsanoted_01 .scroll').scrollTop()) + parseInt($('.wdg_goalsanoted_01 .scroll').height());
			if( parseInt($scrollTop) == parseInt(altura)) {
           		 $('.wdg_goalsanoted_01 .degradado').css("visibility","hidden");
      			}else{
				 $('.wdg_goalsanoted_01 .degradado').css("visibility","visible");
				}
			});	    
    })($,Televisa);
	
});


$(document).ready(function() {
	var $nav_footer_retorna = 0;
	$('.nav_footer_01 .icon-social').bind('touchstart', function(e) {
		e.preventDefault();
	});
	$('.nav_footer_01 .back').click(function(e) {
        e.preventDefault();
		jQuery('body,html').animate({
					scrollTop: 0
					}, 800);
					return false;
	});
});