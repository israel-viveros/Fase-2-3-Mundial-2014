$(document).ready(function(){
	 // set vars
	 var container = Math.round(Number($(".image-container").width() * 0.8)),
	 autoplaySpeed = 3000,
	 img_vis = Math.floor(container / (67+12)),
	 IMG_WIDTH = img_vis * (67+12),
	 currentImg = 0,
	 img_count = Number($(this).find("div.carousel li").length),
	 maxImages = Math.ceil(img_count / img_vis),
	 speed=500;
	 
	 // set sidebar height on page load (after image is loaded)
	 if ($(window).width() > 947) {
		  var image = new Image();
		  image.onload = function(){
			   setSidebarHeight();
			   setRelatedDimensions(); // always set dimensions of related content box on load
		  };
		  image.src = $("img.mainimage:eq(0)").attr('src');
	 }
	 
	 $("a.play").click(function(){
		  if ($(this).find("i").hasClass('tvsa-play')) {
			   // start autoplay
			   $(this).find("i").removeClass('tvsa-play');
			   $(this).find("i").addClass('tvsa-pause');
			   $(".img_fotogalfull_01").addClass('autoplay');
			   var num = -1;
			   if (img_count > 2) {
				  window.setInterval(function () {
					  if ($(".img_fotogalfull_01").hasClass('autoplay')) {
						  num = (num + 1) % img_count;
						  if (num == img_count - 1) {
							   $(".img_fotogalfull_01").removeClass('autoplay');
							   $("a.play").find("i").addClass('tvsa-play');
							   $("a.play").find("i").removeClass('tvsa-pause');
						  }
						  $(".img_fotogalfull_01").find('ul.carousel li a:eq(' + num + ')').click();
						  $(".img_fotogalfull_01").attr('data-currpos', num);
					  }
				  }, autoplaySpeed);
			  }
		  } else {
			   // stop autoplay
			   $(this).find("i").addClass('tvsa-play');
			   $(this).find("i").removeClass('tvsa-pause');
			   $(".img_fotogalfull_01").removeClass('autoplay');
		  }
		  return false;
	 });
	 
	 $("a.replay").click(function(){
		  $("ul.carousel li:eq(0) a").click();
		  return false;
	 });
	 
	 // add swipe
	 $('.img_fotogalfull_01').each(function(){
		  var $this = $(this);
		  var imgs = $(this).find("div.carousel ul:eq(0)");

		  // active states of arrows
		  if (img_count <= img_vis) {
			   $(this).find("a.right").addClass('disabled');
		  }
		  
		  //Init touch swipe - fails in IE7
		  imgs.swipe({
			   triggerOnTouchEnd : true,
			   swipeStatus : swipeStatus,
			   allowPageScroll:"vertical"
		  });
		  
		  // left/right arrows
		  $("a.right").click(function(){
			   nextImage();
			   if ($('ul.carousel').attr('data-swipepos') < maxImages - 1 ) {
					$('ul.carousel').attr('data-swipepos', Number($("ul.carousel").attr('data-swipepos')) + 1);
			   }
			   $('a.left').removeClass('disabled');
			   if ($('ul.carousel').attr('data-swipepos') == maxImages - 1) {
					$(this).addClass('disabled');
			   }
			   return false;
		  });
		  
		  $("a.left").click(function(){
			   previousImage();
			   if ($('ul.carousel').attr('data-swipepos') == 1) {
					$(this).addClass('disabled');
			   }
			   if ($('ul.carousel').attr('data-swipepos') > 0) {
					$('ul.carousel').attr('data-swipepos', Number($('ul.carousel').attr('data-swipepos')) - 1);
			   }
			   $('a.right').removeClass('disabled');
			   return false;
		  });
		  
		  // click on thumbnail
		  $("ul.carousel a").click(function(){
			   
			   /**
				* @todo change social share count upon image change
				* @todo adjust hash parsing as soon as the functionality will be changed to serve static HTML pages for each image.
				*/
			   
			   var twitter = 'https://twitter.com/intent/tweet/?url=<URL>&amp;text=<DESCRIPTION>',
			   facebook = 'https://www.facebook.com/sharer/sharer.php?u=<URL>',
			   pinterest = 'http://pinterest.com/pin/create/button/?url=<URL>&amp;media=<IMG>&amp;description=<DESCRIPTION>';
			   
			   $("ul.carousel li").removeClass('active');
			   $li = $(this).parent();
			   $li.addClass('active');
			   var pos = Number($li.attr('data-pos')),
			   title = $(this).attr('title'),
			   desc = htmlspecialchars_decode($(this).attr('data-description')),
			   base = document.location.pathname, // @todo make dynamic
			   src = $(this).attr('data-src');
			   
			   if (pos + 1 === img_count) {
					$(".image-container").hide();
					$(".related-container").show();
			   } else {
					$(".image-container").show();
					$(".related-container").hide();
					// control the swipe
					if (pos === 0) {
						 for (var i=0;i<= img_count / img_vis;i++) {
							  $("a.left").click();
						 }
					}
					if (pos >= img_vis) {
						 var diff = Math.floor(pos / img_vis) - (Number($("ul.carousel").attr('data-swipepos')) + 1);
						 if (Math.floor(pos / img_vis) > Number($("ul.carousel").attr('data-swipepos'))) {
							  // console.log('go right');
							  for (var i=0;i<=diff;i++) {
								   $("a.right").click();
							  }
						 }
						 if (pos <= img_vis * (Number($("ul.carousel").attr('data-swipepos'))) - 1 || pos <= img_vis) {
							  // console.log('go left');
							  $("a.left").click();
						 }
					}
					
					// load image
					$("img.mainimage").on('load', function() {
					 setSidebarHeight();
					}).attr("src",src).each(function() {
					 if(this.complete) $(this).load();
						// update URL
						var stateObj = { position: pos };
						var slug = (str_replace(' ','-',title)+'').toLowerCase();
						var pos = Number($li.data("pos"));
						document.title = title; // updates title in browser tab
						var stateObj = { position: pos };
						
						// with hash or not?
						var stateObj = { position: pos };
						try {
							 history.pushState(title, title, base + '#' + pos +"-"+slug); // adds a new entry to the browser history
						} catch (errror) {
							 // do nothing
						}
						$('.image-container').attr('data-currpos',pos);
						
						// update description
						$("p.imageDescription").html(desc);
						$(".lnk_twitter").attr("href", buildLink(twitter, title, src));
						$(".lnk_facebook").attr("href", buildLink(facebook, title, src));
						$(".lnk_pinterest").attr("href", buildLink(pinterest, title, src));
				 });
			   }
			   // update desc, social links
			   return false;
		  });
		  
		  // use cursor to navigate through images
		$(document).keydown(function(e){
			 var curpos = Number($('.image-container').attr('data-currpos'));
			 var img_count = Number($(this).find("div.carousel li").length);
			 if (!e.altKey && !e.ctrlKey && !e.metaKey) {
				// next image
				if (e.keyCode == 39) {
					 var goto = (curpos + 1);
					 if( goto >= img_count) {
						  goto = 0;
					 }
					$("ul.carousel li a:eq("+ goto +")").click();
					return false;
				}
				
				// previous
				if (e.keyCode == 37) { 
					 $("ul.carousel li a:eq("+ (curpos - 1) +")").click();
					return false;
				}
			}
		});
		  if(window.location.hash) {
			   
			   /**
				* @example http://televisa-deportes/img_fotogalfull_01/#11-the-image-position-followed-by-the-title
				* @var position
				* @var title
				*/ 
			   var first_dash = (window.location.hash + '').indexOf('-', 0);
			   if (first_dash === -1) {
					// error: no dash was found
			   } else {
					
					// with hash or not?
					
					var newpos = window.location.hash.substring(1,first_dash); // starts after the hash symbol until first occurence of a dash
					$("ul.carousel li").removeClass("active");
					$("ul.carousel li:eq("+newpos+") a").click();
			   }
		  }
		  
		  /**
		  * Catch each phase of the swipe.
		  * move : we drag the div.
		  * cancel : we animate back to where we were
		  * end : we animate to the next image
		  */

		$positionImgAbsolute=0;  
		$('.forward').on('click',function(){

			if($positionImgAbsolute < ($('ul.carousel li').length-2)){
		  	$positionImgAbsolute++;
			  	$positionImg = ($('.carousel li[data-pos='+$positionImgAbsolute+']').find('a').attr('data-src'));
			  	$('.mainimage').attr('src',$positionImg);
			  	$positionDescription = ($('.carousel li[data-pos='+$positionImgAbsolute+']').find('a').attr('title'));
			  	$('.imageDescription').html($positionDescription);
			}		  	
		});
		$('.rewind').on('click',function(){

			if($positionImgAbsolute > 0){
		  		$positionImgAbsolute--;
			  	$positionImg = ($('.carousel li[data-pos='+$positionImgAbsolute+']').find('a').attr('data-src'));
			  	$('.mainimage').attr('src',$positionImg);
			  	$positionDescription = ($('.carousel li[data-pos='+$positionImgAbsolute+']').find('a').attr('title'));
			  	$('.imageDescription').html($positionDescription);
			}		  	
		});

		  function swipeStatus(event, phase, direction, distance, fingers) {
			   //If we are moving before swipe, and we are going L or R, then manually drag the images
			   if( phase=="move" && (direction=="left" || direction=="right") ) {
					var duration=0;
					if (direction == "left")
						 scrollImages((IMG_WIDTH * currentImg) + distance, duration);
					else if (direction == "right")
						 scrollImages((IMG_WIDTH * currentImg) - distance, duration);
			   }

			   //Else, cancel means snap back to the begining
			   else if ( phase == "cancel") {
					scrollImages(IMG_WIDTH * currentImg, speed);
			   }

			   //Else end means the swipe was completed, so move to the next image
			   else if ( phase =="end" ) {
					if (direction == "right")
						 previousImage()
					else if (direction == "left")
						 nextImage()
			   }
		  }

		  function previousImage() {
			   currentImg = Math.max(currentImg-1, 0);
			   scrollImages( IMG_WIDTH * currentImg, speed);
		  }

		  function nextImage() {
			   currentImg = Math.min(currentImg+1, maxImages-1);
			   scrollImages( IMG_WIDTH * currentImg, speed);
		  }

		  function buildLink(url, description, image) {
			   url = str_replace('<URL>', encodeURIComponent(document.location.href), url);
			   url = str_replace('<DESCRIPTION>', encodeURIComponent(description), url);
			   url = str_replace('<IMG>', encodeURIComponent(image), url);
			   return url;
		  }
		  
		  /**
		   * Manually update the position of the imgs on drag
		   */
		  function scrollImages(distance, duration) {
			   var dur = (duration/1000).toFixed(1),
			   value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
			   
			   // CSS Transforms for modern browsers:
			   
			   if ($("html:eq(0)").hasClass("csstransforms") && !$("html:eq(0)").hasClass("ie9")) {
					imgs.css({
						 "-webkit-transform-style" : "flat",
						 "-moz-transform-style" : "flat",
						 "-ms-transform-style" : "flat",
						 "-o-transform-style" : "flat",
						 "transform-style" : "flat",
						 "-webkit-transition-duration" : dur + "s",
						 "-moz-transition-duration" : dur + "s",
						 "-ms-transition-duration" : dur + "s",
						 "-o-transition-duration" : dur + "s",
						 "transition-duration" : dur + "s",
						 "-webkit-transform" : "translate3d("+value +"px,0px,0px)",
						 "-moz-transform" : "translate3d("+value +"px,0px,0px)",
						 "-ms-transform" : "translate3d("+value +"px,0px,0px)",
						 "-o-transform" : "translate3d("+value +"px,0px,0px)",
						 "transform" : "translate3d("+value +"px,0px,0px)"
					});
			   } 
			   
			   // plain jQuery animation for old browsers
			   else {
					imgs.animate({ 'marginLeft': value}, dur, 'easeInOutExpo');
			   }
		  }
		  
		  function strpos (haystack, needle, offset) {
				 var i = (haystack + '').indexOf(needle, (offset || 0));
				 return i === -1 ? false : i;
			   }
		  
		  /**
		   * html special char decode
		   */
		  function htmlspecialchars_decode (string, quote_style) {
				 var optTemp = 0,
				   i = 0,
				   noquotes = false;
				 if (typeof quote_style === 'undefined') {
				   quote_style = 2;
				 }
				 string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
				 var OPTS = {
				   'ENT_NOQUOTES': 0,
				   'ENT_HTML_QUOTE_SINGLE': 1,
				   'ENT_HTML_QUOTE_DOUBLE': 2,
				   'ENT_COMPAT': 2,
				   'ENT_QUOTES': 3,
				   'ENT_IGNORE': 4
				 };
				 if (quote_style === 0) {
				   noquotes = true;
				 }
				 if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
				   quote_style = [].concat(quote_style);
				   for (i = 0; i < quote_style.length; i++) {
					 // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
					 if (OPTS[quote_style[i]] === 0) {
					   noquotes = true;
					 } else if (OPTS[quote_style[i]]) {
					   optTemp = optTemp | OPTS[quote_style[i]];
					 }
				   }
				   quote_style = optTemp;
				 }
				 if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
				   string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
				   // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
				 }
				 if (!noquotes) {
				   string = string.replace(/&quot;/g, '"');
				 }
				 // Put this in last place to avoid escape being double-decoded
				 string = string.replace(/&amp;/g, '&');
				 return string;
			   }
		  
		  /**
		   * str_replace
		   */
		  function str_replace (search, replace, subject, count) {
				 var i = 0,
				   j = 0,
				   temp = '',
				   repl = '',
				   sl = 0,
				   fl = 0,
				   f = [].concat(search),
				   r = [].concat(replace),
				   s = subject,
				   ra = Object.prototype.toString.call(r) === '[object Array]',
				   sa = Object.prototype.toString.call(s) === '[object Array]';
				 s = [].concat(s);
				 if (count     ) {
				   this.window[count] = 0;
				 }

				 for (i = 0, sl = s.length; i < sl; i++) {
				   if (s[i] === '') {
					 continue;
				   }
				   for (j = 0, fl = f.length; j < fl; j++) {
					 temp = s[i] + '';
					 repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					 s[i] = (temp).split(f[j]).join(repl);
					 if (count && s[i] !== temp) {
					   this.window[count] += (temp.length - s[i].length) / f[j].length;
					 }
				   }
				 }
				 return sa ? s : s[0];
			   }
	 });
});

$(window).resize(function(){
	 // set sidebar height on resize
	 if ($(window).width() > 947) {
		  setSidebarHeight();
		  setRelatedDimensions();
	 }
	 
	 if ($(window).width() < 624) {
		  $(".image-container").show();
		  $(".related-container").hide();
	 }
});

/**
 * sets the sidebar height to the content height
 */
function setSidebarHeight() {
	 $('#col2').height($('.img_fotogalfull_01 .image-container').height()+'px');
	 setRelatedDimensions();
}
function setRelatedDimensions() {
	 var h = $('.img_fotogalfull_01 .image-container').height(),
	 w = $('.img_fotogalfull_01 #col1_content').width();
	 $('.related-container').css({height:h+'px', width:w+'px'});
}/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.3
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*
* Changelog
* $Date: 2010-12-12 (Wed, 12 Dec 2010) $
* $version: 1.0.0
* $version: 1.0.1 - removed multibyte comments
*
* $Date: 2011-21-02 (Mon, 21 Feb 2011) $
* $version: 1.1.0     - added allowPageScroll property to allow swiping and scrolling of page
*                    - changed handler signatures so one handler can be used for multiple events
* $Date: 2011-23-02 (Wed, 23 Feb 2011) $
* $version: 1.2.0     - added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
*                    - If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
* $version: 1.2.1     - removed console log!
*
* $version: 1.2.2     - Fixed bug where scope was not preserved in callback methods.
*
* $Date: 2011-28-04 (Thurs, 28 April 2011) $
* $version: 1.2.4     - Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
*
* $Date: 2011-27-09 (Tues, 27 September 2011) $
* $version: 1.2.5     - Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
*
* $Date: 2012-14-05 (Mon, 14 May 2012) $
* $version: 1.2.6     - Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.7     - Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.8     - Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
*
* $Date: 2012-06-06 (Wed, 06 June 2012) $
* $version: 1.3.0     - Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
*
* $Date: 2012-05-06 (Fri, 05 June 2012) $
* $version: 1.3.1     - Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
*
* $Date: 2012-29-07 (Sun, 29 July 2012) $
* $version: 1.3.2    - Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
*             - Added "all" fingers value to the fingers property, so any combinatin of fingers triggers the swipe, allowing event handlers to check the finger count
*
* $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
* $version: 1.3.3    - Code tidy prep for minified version
*
* $Date: 2012-04-10 (wed, 4 Oct 2012) $
* $version: 1.4.0    - Added pinch support, pinchIn and pinchOut
*
* $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
* $version: 1.5.0    - Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
*
* $Date: 2012-22-10 (Mon, 22 Oct 2012) $
* $version: 1.5.1    - Fixed bug with jQuery 1.8 and trailing comma in excludedElements
*                    - Fixed bug with IE and eventPreventDefault()
* $Date: 2013-01-12 (Fri, 12 Jan 2013) $
* $version: 1.6.0    - Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
*                    - made the demo site all static local HTML pages so they can be run locally by a developer
*                    - added jsDoc comments and added documentation for the plugin    
*                    - code tidy
*                    - added triggerOnTouchLeave property that will end the event when the user swipes off the element.
* $Date: 2013-03-23 (Sat, 23 Mar 2013) $
* $version: 1.6.1    - Added support for ie8 touch events
* $version: 1.6.2    - Added support for events binding with on / off / bind in jQ for all callback names.
*                   - Deprecated the 'click' handler in favour of tap.
*                   - added cancelThreshold property
*                   - added option method to update init options at runtime
*
* $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
* $Date: 2013-04-04 (Thurs, 04 April 2013) $
* $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
*/

/**
 * See (http://jquery.com/).
 * @name $
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */
 
/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

(function ($) {
    "use strict";

    //Constants
    var LEFT = "left",
        RIGHT = "right",
        UP = "up",
        DOWN = "down",
        IN = "in",
        OUT = "out",

        NONE = "none",
        AUTO = "auto",
        
        SWIPE = "swipe",
        PINCH = "pinch",
        TAP = "tap",
        DOUBLE_TAP = "doubletap",
        LONG_TAP = "longtap",
        
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",

        ALL_FINGERS = "all",
        
        DOUBLE_TAP_THRESHOLD = 10,

        PHASE_START = "start",
        PHASE_MOVE = "move",
        PHASE_END = "end",
        PHASE_CANCEL = "cancel",

        SUPPORTS_TOUCH = 'ontouchstart' in window,

        PLUGIN_NS = 'TouchSwipe';



    /**
    * The default configuration, and available options to configure touch swipe with.
    * You can set the default values by updating any of the properties prior to instantiation.
    * @name $.fn.swipe.defaults
    * @namespace
    * @property {int} [fingers=1] The number of fingers to detect in a swipe. Any swipes that do not meet this requirement will NOT trigger swipe handlers.
    * @property {int} [threshold=75] The number of pixels that the user must move their finger by before it is considered a swipe. 
    * @property {int} [cancelThreshold=null] The number of pixels that the user must move their finger back from the original swipe direction to cancel the gesture.
    * @property {int} [pinchThreshold=20] The number of pixels that the user must pinch their finger by before it is considered a pinch. 
    * @property {int} [maxTimeThreshold=null] Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe. 
    * @property {int} [fingerReleaseThreshold=250] Time in milliseconds between releasing multiple fingers.  If 2 fingers are down, and are released one after the other, if they are within this threshold, it counts as a simultaneous release. 
    * @property {int} [longTapThreshold=500] Time in milliseconds between tap and release for a long tap
    * @property {int} [doubleTapThreshold=200] Time in milliseconds between 2 taps to count as a doubletap
    * @property {function} [swipe=null] A handler to catch all swipes. See {@link $.fn.swipe#event:swipe}
    * @property {function} [swipeLeft=null] A handler that is triggered for "left" swipes. See {@link $.fn.swipe#event:swipeLeft}
    * @property {function} [swipeRight=null] A handler that is triggered for "right" swipes. See {@link $.fn.swipe#event:swipeRight}
    * @property {function} [swipeUp=null] A handler that is triggered for "up" swipes. See {@link $.fn.swipe#event:swipeUp}
    * @property {function} [swipeDown=null] A handler that is triggered for "down" swipes. See {@link $.fn.swipe#event:swipeDown}
    * @property {function} [swipeStatus=null] A handler triggered for every phase of the swipe. See {@link $.fn.swipe#event:swipeStatus}
    * @property {function} [pinchIn=null] A handler triggered for pinch in events. See {@link $.fn.swipe#event:pinchIn}
    * @property {function} [pinchOut=null] A handler triggered for pinch out events. See {@link $.fn.swipe#event:pinchOut}
    * @property {function} [pinchStatus=null] A handler triggered for every phase of a pinch. See {@link $.fn.swipe#event:pinchStatus}
    * @property {function} [tap=null] A handler triggered when a user just taps on the item, rather than swipes it. If they do not move, tap is triggered, if they do move, it is not. 
    * @property {function} [doubleTap=null] A handler triggered when a user double taps on the item. The delay between taps can be set with the doubleTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
    * @property {function} [longTap=null] A handler triggered when a user long taps on the item. The delay between start and end can be set with the longTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
    * @property {boolean} [triggerOnTouchEnd=true] If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically. 
    * @property {boolean} [triggerOnTouchLeave=false] If true, then when the user leaves the swipe object, the swipe will end and trigger appropriate handlers. 
    * @property {string} [allowPageScroll='auto'] How the browser handles page scrolls when the user is swiping on a touchSwipe object. See {@link $.fn.swipe.pageScroll}.  <br/><br/>
                                        <code>"auto"</code> : all undefined swipes will cause the page to scroll in that direction. <br/>
                                        <code>"none"</code> : the page will not scroll when user swipes. <br/>
                                        <code>"horizontal"</code> : will force page to scroll on horizontal swipes. <br/>
                                        <code>"vertical"</code> : will force page to scroll on vertical swipes. <br/>
    * @property {boolean} [fallbackToMouseEvents=true] If true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non tocuh devices. 
    * @property {string} [excludedElements="button, input, select, textarea, a, .noSwipe"] A jquery selector that specifies child elements that do NOT trigger swipes. By default this excludes all form, input, select, button, anchor and .noSwipe elements. 
    
    */
    var defaults = {
        fingers: 1,         
        threshold: 75,     
        cancelThreshold:null,    
        pinchThreshold:20,
        maxTimeThreshold: null, 
        fingerReleaseThreshold:250, 
        longTapThreshold:500,
        doubleTapThreshold:200,
        swipe: null,         
        swipeLeft: null,     
        swipeRight: null,     
        swipeUp: null,         
        swipeDown: null,     
        swipeStatus: null,     
        pinchIn:null,        
        pinchOut:null,        
        pinchStatus:null,    
        click:null, //Deprecated since 1.6.2
        tap:null,
        doubleTap:null,
        longTap:null,         
        triggerOnTouchEnd: true, 
        triggerOnTouchLeave:false, 
        allowPageScroll: "auto", 
        fallbackToMouseEvents: true,    
        excludedElements:"button, input, select, textarea, a, .noSwipe"
    };



    /**
    * Applies TouchSwipe behaviour to one or more jQuery objects.
    * The TouchSwipe plugin can be instantiated via this method, or methods within 
    * TouchSwipe can be executed via this method as per jQuery plugin architecture.
    * @see TouchSwipe
    * @class
    * @param {Mixed} method If the current DOMNode is a TouchSwipe object, and <code>method</code> is a TouchSwipe method, then
    * the <code>method</code> is executed, and any following arguments are passed to the TouchSwipe method.
    * If <code>method</code> is an object, then the TouchSwipe class is instantiated on the current DOMNode, passing the 
    * configuration properties defined in the object. See TouchSwipe
    *
    */
    $.fn.swipe = function (method) {
        var $this = $(this),
            plugin = $this.data(PLUGIN_NS);

        //Check if we are already instantiated and trying to execute a method    
        if (plugin && typeof method === 'string') {
            if (plugin[method]) {
                return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.swipe');
            }
        }
        //Else not instantiated and trying to pass init object (or nothing)
        else if (!plugin && (typeof method === 'object' || !method)) {
            return init.apply(this, arguments);
        }

        return $this;
    };

    //Expose our defaults so a user could override the plugin defaults
    $.fn.swipe.defaults = defaults;

    /**
    * The phases that a touch event goes through.  The <code>phase</code> is passed to the event handlers. 
    * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
    * @namespace
    * @readonly
    * @property {string} PHASE_START Constant indicating the start phase of the touch event. Value is <code>"start"</code>.
    * @property {string} PHASE_MOVE Constant indicating the move phase of the touch event. Value is <code>"move"</code>.
    * @property {string} PHASE_END Constant indicating the end phase of the touch event. Value is <code>"end"</code>.
    * @property {string} PHASE_CANCEL Constant indicating the cancel phase of the touch event. Value is <code>"cancel"</code>.
    */
    $.fn.swipe.phases = {
        PHASE_START: PHASE_START,
        PHASE_MOVE: PHASE_MOVE,
        PHASE_END: PHASE_END,
        PHASE_CANCEL: PHASE_CANCEL
    };

    /**
    * The direction constants that are passed to the event handlers. 
    * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
    * @namespace
    * @readonly
    * @property {string} LEFT Constant indicating the left direction. Value is <code>"left"</code>.
    * @property {string} RIGHT Constant indicating the right direction. Value is <code>"right"</code>.
    * @property {string} UP Constant indicating the up direction. Value is <code>"up"</code>.
    * @property {string} DOWN Constant indicating the down direction. Value is <code>"cancel"</code>.
    * @property {string} IN Constant indicating the in direction. Value is <code>"in"</code>.
    * @property {string} OUT Constant indicating the out direction. Value is <code>"out"</code>.
    */
    $.fn.swipe.directions = {
        LEFT: LEFT,
        RIGHT: RIGHT,
        UP: UP,
        DOWN: DOWN,
        IN : IN,
        OUT: OUT
    };
    
    /**
    * The page scroll constants that can be used to set the value of <code>allowPageScroll</code> option
    * These properties are read only
    * @namespace
    * @readonly
    * @see $.fn.swipe.defaults#allowPageScroll
    * @property {string} NONE Constant indicating no page scrolling is allowed. Value is <code>"none"</code>.
    * @property {string} HORIZONTAL Constant indicating horizontal page scrolling is allowed. Value is <code>"horizontal"</code>.
    * @property {string} VERTICAL Constant indicating vertical page scrolling is allowed. Value is <code>"vertical"</code>.
    * @property {string} AUTO Constant indicating either horizontal or vertical will be allowed, depending on the swipe handlers registered. Value is <code>"auto"</code>.
    */
    $.fn.swipe.pageScroll = {
        NONE: NONE,
        HORIZONTAL: HORIZONTAL,
        VERTICAL: VERTICAL,
        AUTO: AUTO
    };

    /**
    * Constants representing the number of fingers used in a swipe.  These are used to set both the value of <code>fingers</code> in the 
    * options object, as well as the value of the <code>fingers</code> event property.
    * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
    * @namespace
    * @readonly
    * @see $.fn.swipe.defaults#fingers
    * @property {string} ONE Constant indicating 1 finger is to be detected / was detected. Value is <code>1</code>.
    * @property {string} TWO Constant indicating 2 fingers are to be detected / were detected. Value is <code>1</code>.
    * @property {string} THREE Constant indicating 3 finger are to be detected / were detected. Value is <code>1</code>.
    * @property {string} ALL Constant indicating any combination of finger are to be detected.  Value is <code>"all"</code>.
    */
    $.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: ALL_FINGERS
    };

    /**
    * Initialise the plugin for each DOM element matched
    * This creates a new instance of the main TouchSwipe class for each DOM element, and then
    * saves a reference to that instance in the elements data property.
    * @internal
    */
    function init(options) {
        //Prep and extend the options
        if (options && (options.allowPageScroll === undefined && (options.swipe !== undefined || options.swipeStatus !== undefined))) {
            options.allowPageScroll = NONE;
        }
        
        //Check for deprecated options
        //Ensure that any old click handlers are assigned to the new tap, unless we have a tap
        if(options.click!==undefined && options.tap===undefined) {
            options.tap = options.click;
        }

        if (!options) {
            options = {};
        }
        
        //pass empty object so we dont modify the defaults
        options = $.extend({}, $.fn.swipe.defaults, options);

        //For each element instantiate the plugin
        return this.each(function () {
            var $this = $(this);

            //Check we havent already initialised the plugin
            var plugin = $this.data(PLUGIN_NS);

            if (!plugin) {
                plugin = new TouchSwipe(this, options);
                $this.data(PLUGIN_NS, plugin);
            }
        });
    }

    /**
    * Main TouchSwipe Plugin Class.
    * Do not use this to construct your TouchSwipe object, use the jQuery plugin method $.fn.swipe(); {@link $.fn.swipe}
    * @private
    * @name TouchSwipe
    * @param {DOMNode} element The HTML DOM object to apply to plugin to
    * @param {Object} options The options to configure the plugin with.  @link {$.fn.swipe.defaults}
    * @see $.fh.swipe.defaults
    * @see $.fh.swipe
    * @class
    */
    function TouchSwipe(element, options) {
        var useTouchEvents = (SUPPORTS_TOUCH || !options.fallbackToMouseEvents),
            START_EV = useTouchEvents ? 'touchstart' : 'mousedown',
            MOVE_EV = useTouchEvents ? 'touchmove' : 'mousemove',
            END_EV = useTouchEvents ? 'touchend' : 'mouseup',
            LEAVE_EV = useTouchEvents ? null : 'mouseleave', //we manually detect leave on touch devices, so null event here
            CANCEL_EV = 'touchcancel';



        //touch properties
        var distance = 0,
            direction = null,
            duration = 0,
            startTouchesDistance = 0,
            endTouchesDistance = 0,
            pinchZoom = 1,
            pinchDistance = 0,
            pinchDirection = 0,
            maximumsMap=null;

        
        
        //jQuery wrapped element for this instance
        var $element = $(element);
        
        //Current phase of th touch cycle
        var phase = "start";

        // the current number of fingers being used.
        var fingerCount = 0;             

        //track mouse points / delta
        var fingerData=null;

        //track times
        var startTime = 0,
            endTime = 0,
            previousTouchEndTime=0,
            previousTouchFingerCount=0,
            doubleTapStartTime=0;

        //Timeouts
        var singleTapTimeout=null;
        
        // Add gestures to all swipable areas if supported
        try {
            $element.bind(START_EV, touchStart);
            $element.bind(CANCEL_EV, touchCancel);
        }
        catch (e) {
            $.error('events not supported ' + START_EV + ',' + CANCEL_EV + ' on jQuery.swipe');
        }

        //
        //Public methods
        //
        
        /**
        * re-enables the swipe plugin with the previous configuration
        * @function
        * @name $.fn.swipe#enable
        * @return {DOMNode} The Dom element that was registered with TouchSwipe 
        * @example $("#element").swipe("enable");
        */
        this.enable = function () {
            $element.bind(START_EV, touchStart);
            $element.bind(CANCEL_EV, touchCancel);
            return $element;
        };

        /**
        * disables the swipe plugin
        * @function
        * @name $.fn.swipe#disable
        * @return {DOMNode} The Dom element that is now registered with TouchSwipe
        * @example $("#element").swipe("disable");
        */
        this.disable = function () {
            removeListeners();
            return $element;
        };

        /**
        * Destroy the swipe plugin completely. To use any swipe methods, you must re initialise the plugin.
        * @function
        * @name $.fn.swipe#destroy
        * @return {DOMNode} The Dom element that was registered with TouchSwipe 
        * @example $("#element").swipe("destroy");
        */
        this.destroy = function () {
            removeListeners();
            $element.data(PLUGIN_NS, null);
            return $element;
        };


        /**
         * Allows run time updating of the swipe configuration options.
         * @function
         * @name $.fn.swipe#option
         * @param {String} property The option property to get or set
         * @param {Object} [value] The value to set the property to
         * @return {Object} If only a property name is passed, then that property value is returned.
         * @example $("#element").swipe("option", "threshold"); // return the threshold
         * @example $("#element").swipe("option", "threshold", 100); // set the threshold after init
         * @see $.fn.swipe.defaults
         *
         */
        this.option = function (property, value) {
            if(options[property]!==undefined) {
                if(value===undefined) {
                    return options[property];
                } else {
                    options[property] = value;
                }
            } else {
                $.error('Option ' + property + ' does not exist on jQuery.swipe.options');
            }
        }

        //
        // Private methods
        //
        
        //
        // EVENTS
        //
        /**
        * Event handler for a touch start event.
        * Stops the default click event from triggering and stores where we touched
        * @inner
        * @param {object} jqEvent The normalised jQuery event object.
        */
        function touchStart(jqEvent) {
            //If we already in a touch event (a finger already in use) then ignore subsequent ones..
            if( getTouchInProgress() )
                return;
            
            //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DONT swipe
            if( $(jqEvent.target).closest( options.excludedElements, $element ).length>0 ) 
                return;
                
            //As we use Jquery bind for events, we need to target the original event object
            //If these events are being programatically triggered, we dont have an orignal event object, so use the Jq one.
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
            
            var ret,
                evt = SUPPORTS_TOUCH ? event.touches[0] : event;

            phase = PHASE_START;

            //If we support touches, get the finger count
            if (SUPPORTS_TOUCH) {
                // get the total number of fingers touching the screen
                fingerCount = event.touches.length;
            }
            //Else this is the desktop, so stop the browser from dragging the image
            else {
                jqEvent.preventDefault(); //call this on jq event so we are cross browser
            }

            //clear vars..
            distance = 0;
            direction = null;
            pinchDirection=null;
            duration = 0;
            startTouchesDistance=0;
            endTouchesDistance=0;
            pinchZoom = 1;
            pinchDistance = 0;
            fingerData=createAllFingerData();
            maximumsMap=createMaximumsData();
            cancelMultiFingerRelease();

            
            // check the number of fingers is what we are looking for, or we are capturing pinches
            if (!SUPPORTS_TOUCH || (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || hasPinches()) {
                // get the coordinates of the touch
                createFingerData( 0, evt );
                startTime = getTimeStamp();
                
                if(fingerCount==2) {
                    //Keep track of the initial pinch distance, so we can calculate the diff later
                    //Store second finger data as start
                    createFingerData( 1, event.touches[1] );
                    startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
                }
                
                if (options.swipeStatus || options.pinchStatus) {
                    ret = triggerHandler(event, phase);
                }
            }
            else {
                //A touch with more or less than the fingers we are looking for, so cancel
                ret = false; 
            }

            //If we have a return value from the users handler, then return and cancel
            if (ret === false) {
                phase = PHASE_CANCEL;
                triggerHandler(event, phase);
                return ret;
            }
            else {
                setTouchInProgress(true);
            }
        };
        
        
        
        /**
        * Event handler for a touch move event. 
        * If we change fingers during move, then cancel the event
        * @inner
        * @param {object} jqEvent The normalised jQuery event object.
        */
        function touchMove(jqEvent) {
            
            //As we use Jquery bind for events, we need to target the original event object
            //If these events are being programatically triggered, we dont have an orignal event object, so use the Jq one.
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
            
            //If we are ending, cancelling, or within the threshold of 2 fingers being released, dont track anything..
            if (phase === PHASE_END || phase === PHASE_CANCEL || inMultiFingerRelease())
                return;

            var ret,
                evt = SUPPORTS_TOUCH ? event.touches[0] : event;
            

            //Update the  finger data 
            var currentFinger = updateFingerData(evt);
            endTime = getTimeStamp();
            
            if (SUPPORTS_TOUCH) {
                fingerCount = event.touches.length;
            }

            phase = PHASE_MOVE;

            //If we have 2 fingers get Touches distance as well
            if(fingerCount==2) {
                
                //Keep track of the initial pinch distance, so we can calculate the diff later
                //We do this here as well as the start event, incase they start with 1 finger, and the press 2 fingers
                if(startTouchesDistance==0) {
                    //Create second finger if this is the first time...
                    createFingerData( 1, event.touches[1] );
                    
                    startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
                } else {
                    //Else just update the second finger
                    updateFingerData(event.touches[1]);
                
                    endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
                    pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);
                }
                
                
                pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
                pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance);
            }
            
            
            if ( (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH || hasPinches() ) {
                
                direction = calculateDirection(currentFinger.start, currentFinger.end);
                
                //Check if we need to prevent default evnet (page scroll / pinch zoom) or not
                validateDefaultEvent(jqEvent, direction);

                //Distance and duration are all off the main finger
                distance = calculateDistance(currentFinger.start, currentFinger.end);
                duration = calculateDuration();

                //Cache the maximum distance we made in this direction
                setMaxDistance(direction, distance);


                if (options.swipeStatus || options.pinchStatus) {
                    ret = triggerHandler(event, phase);
                }
                
                
                //If we trigger end events when threshold are met, or trigger events when touch leves element
                if(!options.triggerOnTouchEnd || options.triggerOnTouchLeave) {
                    
                    var inBounds = true;
                    
                    //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
                    if(options.triggerOnTouchLeave) {
                        var bounds = getbounds( this );
                        inBounds = isInBounds( currentFinger.end, bounds );
                    }
                    
                    //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
                    if(!options.triggerOnTouchEnd && inBounds) {
                        phase = getNextPhase( PHASE_MOVE );
                    } 
                    //We end if out of bounds here, so set current phase to END, and check if its modified 
                    else if(options.triggerOnTouchLeave && !inBounds ) {
                        phase = getNextPhase( PHASE_END );
                    }
                        
                    if(phase==PHASE_CANCEL || phase==PHASE_END)    {
                        triggerHandler(event, phase);
                    }                
                }
            }
            else {
                phase = PHASE_CANCEL;
                triggerHandler(event, phase);
            }

            if (ret === false) {
                phase = PHASE_CANCEL;
                triggerHandler(event, phase);
            }
        }



        /**
        * Event handler for a touch end event. 
        * Calculate the direction and trigger events
        * @inner
        * @param {object} jqEvent The normalised jQuery event object.
        */
        function touchEnd(jqEvent) {
            //As we use Jquery bind for events, we need to target the original event object
            var event = jqEvent.originalEvent;
                

            //If we are still in a touch with another finger return
            //This allows us to wait a fraction and see if the other finger comes up, if it does within the threshold, then we treat it as a multi release, not a single release.
            if (SUPPORTS_TOUCH) {
                if(event.touches.length>0) {
                    startMultiFingerRelease();
                    return true;
                }
            }
            
            //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
            //This is used to allow 2 fingers to release fractionally after each other, whilst maintainig the event as containg 2 fingers, not 1
            if(inMultiFingerRelease()) {    
                fingerCount=previousTouchFingerCount;
            }    
                 
            //call this on jq event so we are cross browser 
            jqEvent.preventDefault(); 
            
            //Set end of swipe
            endTime = getTimeStamp();
            
            //Get duration incase move was never fired
            duration = calculateDuration();
            
            //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
            if(didSwipeBackToCancel()) {
                phase = PHASE_CANCEL;
                triggerHandler(event, phase);
            } else if (options.triggerOnTouchEnd || (options.triggerOnTouchEnd == false && phase === PHASE_MOVE)) {
                phase = PHASE_END;
                triggerHandler(event, phase);
            }
            //Special cases - A tap should always fire on touch end regardless,
            //So here we manually trigger the tap end handler by itself
            //We dont run trigger handler as it will re-trigger events that may have fired already
            else if (!options.triggerOnTouchEnd && hasTap()) {
                //Trigger the pinch events...
                phase = PHASE_END;
                triggerHandlerForGesture(event, phase, TAP);
            }
            else if (phase === PHASE_MOVE) {
                phase = PHASE_CANCEL;
                triggerHandler(event, phase);
            }

            setTouchInProgress(false);
        }



        /**
        * Event handler for a touch cancel event. 
        * Clears current vars
        * @inner
        */
        function touchCancel() {
            // reset the variables back to default values
            fingerCount = 0;
            endTime = 0;
            startTime = 0;
            startTouchesDistance=0;
            endTouchesDistance=0;
            pinchZoom=1;
            
            //If we were in progress of tracking a possible multi touch end, then re set it.
            cancelMultiFingerRelease();
            
            setTouchInProgress(false);
        }
        
        
        /**
        * Event handler for a touch leave event. 
        * This is only triggered on desktops, in touch we work this out manually
        * as the touchleave event is not supported in webkit
        * @inner
        */
        function touchLeave(jqEvent) {
            var event = jqEvent.originalEvent;
            
            //If we have the trigger on leve property set....
            if(options.triggerOnTouchLeave) {
                phase = getNextPhase( PHASE_END );
                triggerHandler(event, phase);
            }
        }
        
        /**
        * Removes all listeners that were associated with the plugin
        * @inner
        */
        function removeListeners() {
            $element.unbind(START_EV, touchStart);
            $element.unbind(CANCEL_EV, touchCancel);
            $element.unbind(MOVE_EV, touchMove);
            $element.unbind(END_EV, touchEnd);
            
            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if(LEAVE_EV) { 
                $element.unbind(LEAVE_EV, touchLeave);
            }
            
            setTouchInProgress(false);
        }

        
        /**
         * Checks if the time and distance thresholds have been met, and if so then the appropriate handlers are fired.
         */
        function getNextPhase(currentPhase) {
            
            var nextPhase = currentPhase;
            
            // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
            var validTime = validateSwipeTime();
            var validDistance = validateSwipeDistance();
            var didCancel = didSwipeBackToCancel();
                        
            //If we have exceeded our time, then cancel    
            if(!validTime || didCancel) {
                nextPhase = PHASE_CANCEL;
            }
            //Else if we are moving, and have reached distance then end
            else if (validDistance && currentPhase == PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave) ) {
                nextPhase = PHASE_END;
            } 
            //Else if we have ended by leaving and didnt reach distance, then cancel
            else if (!validDistance && currentPhase==PHASE_END && options.triggerOnTouchLeave) {
                nextPhase = PHASE_CANCEL;
            }
            
            return nextPhase;
        }
        
        
        /**
        * Trigger the relevant event handler
        * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
        * @param {object} event the original event object
        * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
        * @inner
        */
        function triggerHandler(event, phase) {
            
            var ret = undefined;
            
            // SWIPE GESTURES
            if(didSwipe() || hasSwipes()) { //hasSwipes as status needs to fire even if swipe is invalid
                //Trigger the swipe events...
                ret = triggerHandlerForGesture(event, phase, SWIPE);
            } 
            
            // PINCH GESTURES (if the above didnt cancel)
            else if((didPinch() || hasPinches()) && ret!==false) {
                //Trigger the pinch events...
                ret = triggerHandlerForGesture(event, phase, PINCH);
            }
            
            // CLICK / TAP (if the above didnt cancel)
            if(didDoubleTap() && ret!==false) {
                //Trigger the tap events...
                ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP);
            }
            
            // CLICK / TAP (if the above didnt cancel)
            else if(didLongTap() && ret!==false) {
                //Trigger the tap events...
                ret = triggerHandlerForGesture(event, phase, LONG_TAP);
            }

            // CLICK / TAP (if the above didnt cancel)
            else if(didTap() && ret!==false) {
                //Trigger the tap event..
                ret = triggerHandlerForGesture(event, phase, TAP);
            }
            
            
            
            // If we are cancelling the gesture, then manually trigger the reset handler
            if (phase === PHASE_CANCEL) {
                touchCancel(event);
            }
            
            // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
            if(phase === PHASE_END) {
                //If we support touch, then check that all fingers are off before we cancel
                if (SUPPORTS_TOUCH) {
                    if(event.touches.length==0) {
                        touchCancel(event);    
                    }
                } 
                else {
                    touchCancel(event);
                }
            }
                    
            return ret;
        }
        
        
        
        /**
        * Trigger the relevant event handler
        * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
        * @param {object} event the original event object
        * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
        * @param {string} gesture the gesture to triger a handler for : PINCH or SWIPE {@link $.fn.swipe.gestures}
        * @return Boolean False, to indicate that the event should stop propagation, or void.
        * @inner
        */
        function triggerHandlerForGesture(event, phase, gesture) {    
            
            var ret=undefined;
            
            //SWIPES....
            if(gesture==SWIPE) {
                //Trigger status every time..
                
                //Trigger the event...
                $element.trigger('swipeStatus', [phase, direction || null, distance || 0, duration || 0, fingerCount]);
                
                //Fire the callback
                if (options.swipeStatus) {
                    ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount);
                    //If the status cancels, then dont run the subsequent event handlers..
                    if(ret===false) return false;
                }
                
                
                
                
                if (phase == PHASE_END && validateSwipe()) {
                    //Fire the catch all event
                    $element.trigger('swipe', [direction, distance, duration, fingerCount]);
                    
                    //Fire catch all callback
                    if (options.swipe) {
                        ret = options.swipe.call($element, event, direction, distance, duration, fingerCount);
                        //If the status cancels, then dont run the subsequent event handlers..
                        if(ret===false) return false;
                    }
                    
                    //trigger direction specific event handlers    
                    switch (direction) {
                        case LEFT:
                            //Trigger the event
                            $element.trigger('swipeLeft', [direction, distance, duration, fingerCount]);
                    
                            //Fire the callback
                            if (options.swipeLeft) {
                                ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount);
                            }
                            break;
    
                        case RIGHT:
                            //Trigger the event
                            $element.trigger('swipeRight', [direction, distance, duration, fingerCount]);
                    
                            //Fire the callback
                            if (options.swipeRight) {
                                ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount);
                            }
                            break;
    
                        case UP:
                            //Trigger the event
                            $element.trigger('swipeUp', [direction, distance, duration, fingerCount]);
                    
                            //Fire the callback
                            if (options.swipeUp) {
                                ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount);
                            }
                            break;
    
                        case DOWN:
                            //Trigger the event
                            $element.trigger('swipeDown', [direction, distance, duration, fingerCount]);
                    
                            //Fire the callback
                            if (options.swipeDown) {
                                ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount);
                            }
                            break;
                    }
                }
            }
            
            
            //PINCHES....
            if(gesture==PINCH) {
                //Trigger the event
                 $element.trigger('pinchStatus', [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom]);
                    
                //Fire the callback
                if (options.pinchStatus) {
                    ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom);
                    //If the status cancels, then dont run the subsequent event handlers..
                    if(ret===false) return false;
                }
                
                if(phase==PHASE_END && validatePinch()) {
                    
                    switch (pinchDirection) {
                        case IN:
                            //Trigger the event
                            $element.trigger('pinchIn', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom]);
                    
                            //Fire the callback
                            if (options.pinchIn) {
                                ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom);
                            }
                            break;
                        
                        case OUT:
                            //Trigger the event
                            $element.trigger('pinchOut', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom]);
                    
                            //Fire the callback
                            if (options.pinchOut) {
                                ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom);
                            }
                            break;    
                    }
                }
            }
            


                
                
            if(gesture==TAP) {
                if(phase === PHASE_CANCEL || phase === PHASE_END) {
                    
                    
                    //Cancel any existing double tap
                    clearTimeout(singleTapTimeout);
                           
                    //If we are also looking for doubelTaps, wait incase this is one...
                    if(hasDoubleTap() && !inDoubleTap()) {
                        //Cache the time of this tap
                        doubleTapStartTime = getTimeStamp();
                       
                        //Now wait for the double tap timeout, and trigger this single tap
                        //if its not cancelled by a double tap
                        singleTapTimeout = setTimeout($.proxy(function() {
                            doubleTapStartTime=null;
                            //Trigger the event
                            $element.trigger('tap', [event.target]);

                        
                            //Fire the callback
                            if(options.tap) {
                                ret = options.tap.call($element, event, event.target);
                            }
                        }, this), options.doubleTapThreshold );
                        
                    } else {
                        doubleTapStartTime=null;
                        
                        //Trigger the event
                        $element.trigger('tap', [event.target]);

                        
                        //Fire the callback
                        if(options.tap) {
                            ret = options.tap.call($element, event, event.target);
                        }
                    }
                }
            }
            
            else if (gesture==DOUBLE_TAP) {
                if(phase === PHASE_CANCEL || phase === PHASE_END) {
                    //Cancel any pending singletap 
                    clearTimeout(singleTapTimeout);
                    doubleTapStartTime=null;
                        
                    //Trigger the event
                    $element.trigger('doubletap', [event.target]);
                
                    //Fire the callback
                    if(options.doubleTap) {
                        ret = options.doubleTap.call($element, event, event.target);
                    }
                }
            }
            
            else if (gesture==LONG_TAP) {
                if(phase === PHASE_CANCEL || phase === PHASE_END) {
                    //Cancel any pending singletap (shouldnt be one)
                    clearTimeout(singleTapTimeout);
                    doubleTapStartTime=null;
                        
                    //Trigger the event
                    $element.trigger('longtap', [event.target]);
                
                    //Fire the callback
                    if(options.longTap) {
                        ret = options.longTap.call($element, event, event.target);
                    }
                }
            }                
                
            return ret;
        }



        
        //
        // GESTURE VALIDATION
        //
        
        /**
        * Checks the user has swipe far enough
        * @return Boolean if <code>threshold</code> has been set, return true if the threshold was met, else false.
        * If no threshold was set, then we return true.
        * @inner
        */
        function validateSwipeDistance() {
            var valid = true;
            //If we made it past the min swipe distance..
            if (options.threshold !== null) {
                valid = distance >= options.threshold;
            }
            
            return valid;
        }
        
        /**
        * Checks the user has swiped back to cancel.
        * @return Boolean if <code>cancelThreshold</code> has been set, return true if the cancelThreshold was met, else false.
        * If no cancelThreshold was set, then we return true.
        * @inner
        */
        function didSwipeBackToCancel() {
            var cancelled = false;
            if(options.cancelThreshold !== null && direction !==null)  {
                cancelled =  (getMaxDistance( direction ) - distance) >= options.cancelThreshold;
            }
            
            return cancelled;
        }

        /**
        * Checks the user has pinched far enough
        * @return Boolean if <code>pinchThreshold</code> has been set, return true if the threshold was met, else false.
        * If no threshold was set, then we return true.
        * @inner
        */
        function validatePinchDistance() {
            if (options.pinchThreshold !== null) {
                return pinchDistance >= options.pinchThreshold;
            }
            return true;
        }

        /**
        * Checks that the time taken to swipe meets the minimum / maximum requirements
        * @return Boolean
        * @inner
        */
        function validateSwipeTime() {
            var result;
            //If no time set, then return true

            if (options.maxTimeThreshold) {
                if (duration >= options.maxTimeThreshold) {
                    result = false;
                } else {
                    result = true;
                }
            }
            else {
                result = true;
            }

            return result;
        }


        /**
        * Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
        * This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
        * @param {object} jqEvent The normalised jQuery representation of the event object.
        * @param {string} direction The direction of the event. See {@link $.fn.swipe.directions}
        * @see $.fn.swipe.directions
        * @inner
        */
        function validateDefaultEvent(jqEvent, direction) {
            if (options.allowPageScroll === NONE || hasPinches()) {
                jqEvent.preventDefault();
            } else {
                var auto = options.allowPageScroll === AUTO;

                switch (direction) {
                    case LEFT:
                        if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
                            jqEvent.preventDefault();
                        }
                        break;

                    case RIGHT:
                        if ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
                            jqEvent.preventDefault();
                        }
                        break;

                    case UP:
                        if ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
                            jqEvent.preventDefault();
                        }
                        break;

                    case DOWN:
                        if ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
                            jqEvent.preventDefault();
                        }
                        break;
                }
            }

        }


        // PINCHES
        /**
         * Returns true of the current pinch meets the thresholds
         * @return Boolean
         * @inner
        */
        function validatePinch() {
            var hasCorrectFingerCount = validateFingers();
            var hasEndPoint = validateEndPoint();
            var hasCorrectDistance = validatePinchDistance();
            return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
            
        }
        
        /**
         * Returns true if any Pinch events have been registered
         * @return Boolean
         * @inner
        */
        function hasPinches() {
            //Enure we dont return 0 or null for false values
            return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
        }
        
        /**
         * Returns true if we are detecting pinches, and have one
         * @return Boolean
         * @inner
         */
        function didPinch() {
            //Enure we dont return 0 or null for false values
            return !!(validatePinch() && hasPinches());
        }




        // SWIPES
        /**
         * Returns true if the current swipe meets the thresholds
         * @return Boolean
         * @inner
        */
        function validateSwipe() {
            //Check validity of swipe
            var hasValidTime = validateSwipeTime();
            var hasValidDistance = validateSwipeDistance();    
            var hasCorrectFingerCount = validateFingers();
            var hasEndPoint = validateEndPoint();
            var didCancel = didSwipeBackToCancel();    
            
            // if the user swiped more than the minimum length, perform the appropriate action
            // hasValidDistance is null when no distance is set 
            var valid =  !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
            
            return valid;
        }
        
        /**
         * Returns true if any Swipe events have been registered
         * @return Boolean
         * @inner
        */
        function hasSwipes() {
            //Enure we dont return 0 or null for false values
            return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
        }
        
        
        /**
         * Returns true if we are detecting swipes and have one
         * @return Boolean
         * @inner
        */
        function didSwipe() {
            //Enure we dont return 0 or null for false values
            return !!(validateSwipe() && hasSwipes());
        }

        /**
         * Returns true if we have matched the number of fingers we are looking for
         * @return Boolean
         * @inner
        */
        function validateFingers() {
            //The number of fingers we want were matched, or on desktop we ignore
            return ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH);
        }
        
        /**
         * Returns true if we have an end point for the swipe
         * @return Boolean
         * @inner
        */
        function validateEndPoint() {
            //We have an end value for the finger
            return fingerData[0].end.x !== 0;
        }

        // TAP / CLICK
        /**
         * Returns true if a click / tap events have been registered
         * @return Boolean
         * @inner
        */
        function hasTap() {
            //Enure we dont return 0 or null for false values
            return !!(options.tap) ;
        }
        
        /**
         * Returns true if a double tap events have been registered
         * @return Boolean
         * @inner
        */
        function hasDoubleTap() {
            //Enure we dont return 0 or null for false values
            return !!(options.doubleTap) ;
        }
        
        /**
         * Returns true if any long tap events have been registered
         * @return Boolean
         * @inner
        */
        function hasLongTap() {
            //Enure we dont return 0 or null for false values
            return !!(options.longTap) ;
        }
        
        /**
         * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
         * @return Boolean
         * @inner
        */
        function validateDoubleTap() {
            if(doubleTapStartTime==null){
                return false;
            }
            var now = getTimeStamp();
            return (hasDoubleTap() && ((now-doubleTapStartTime) <= options.doubleTapThreshold));
        }
        
        /**
         * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
         * @return Boolean
         * @inner
        */
        function inDoubleTap() {
            return validateDoubleTap();
        }
        
        
        /**
         * Returns true if we have a valid tap
         * @return Boolean
         * @inner
        */
        function validateTap() {
            return ((fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(distance) || distance === 0));
        }
        
        /**
         * Returns true if we have a valid long tap
         * @return Boolean
         * @inner
        */
        function validateLongTap() {
            //slight threshold on moving finger
            return ((duration > options.longTapThreshold) && (distance < DOUBLE_TAP_THRESHOLD)); 
        }
        
        /**
         * Returns true if we are detecting taps and have one
         * @return Boolean
         * @inner
        */
        function didTap() {
            //Enure we dont return 0 or null for false values
            return !!(validateTap() && hasTap());
        }
        
        
        /**
         * Returns true if we are detecting double taps and have one
         * @return Boolean
         * @inner
        */
        function didDoubleTap() {
            //Enure we dont return 0 or null for false values
            return !!(validateDoubleTap() && hasDoubleTap());
        }
        
        /**
         * Returns true if we are detecting long taps and have one
         * @return Boolean
         * @inner
        */
        function didLongTap() {
            //Enure we dont return 0 or null for false values
            return !!(validateLongTap() && hasLongTap());
        }
        
        
        
        
        // MULTI FINGER TOUCH
        /**
         * Starts tracking the time between 2 finger releases, and keeps track of how many fingers we initially had up
         * @inner
        */
        function startMultiFingerRelease() {
            previousTouchEndTime = getTimeStamp();
            previousTouchFingerCount = event.touches.length+1;
        }
        
        /**
         * Cancels the tracking of time between 2 finger releases, and resets counters
         * @inner
        */
        function cancelMultiFingerRelease() {
            previousTouchEndTime = 0;
            previousTouchFingerCount = 0;
        }
        
        /**
         * Checks if we are in the threshold between 2 fingers being released 
         * @return Boolean
         * @inner
        */
        function inMultiFingerRelease() {
            
            var withinThreshold = false;
            
            if(previousTouchEndTime) {    
                var diff = getTimeStamp() - previousTouchEndTime    
                if( diff<=options.fingerReleaseThreshold ) {
                    withinThreshold = true;
                }
            }
            
            return withinThreshold;    
        }
        

        /**
        * gets a data flag to indicate that a touch is in progress
        * @return Boolean
        * @inner
        */
        function getTouchInProgress() {
            //strict equality to ensure only true and false are returned
            return !!($element.data(PLUGIN_NS+'_intouch') === true);
        }
        
        /**
        * Sets a data flag to indicate that a touch is in progress
        * @param {boolean} val The value to set the property to
        * @inner
        */
        function setTouchInProgress(val) {
            
            //Add or remove event listeners depending on touch status
            if(val===true) {
                $element.bind(MOVE_EV, touchMove);
                $element.bind(END_EV, touchEnd);
                
                //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
                if(LEAVE_EV) { 
                    $element.bind(LEAVE_EV, touchLeave);
                }
            } else {
                $element.unbind(MOVE_EV, touchMove, false);
                $element.unbind(END_EV, touchEnd, false);
            
                //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
                if(LEAVE_EV) { 
                    $element.unbind(LEAVE_EV, touchLeave, false);
                }
            }
            
        
            //strict equality to ensure only true and false can update the value
            $element.data(PLUGIN_NS+'_intouch', val === true);
        }
        
        
        /**
         * Creates the finger data for the touch/finger in the event object.
         * @param {int} index The index in the array to store the finger data (usually the order the fingers were pressed)
         * @param {object} evt The event object containing finger data
         * @return finger data object
         * @inner
        */
        function createFingerData( index, evt ) {
            var id = evt.identifier!==undefined ? evt.identifier : 0; 
            
            fingerData[index].identifier = id;
            fingerData[index].start.x = fingerData[index].end.x = evt.pageX||evt.clientX;
            fingerData[index].start.y = fingerData[index].end.y = evt.pageY||evt.clientY;
            
            return fingerData[index];
        }
        
        /**
         * Updates the finger data for a particular event object
         * @param {object} evt The event object containing the touch/finger data to upadte
         * @return a finger data object.
         * @inner
        */
        function updateFingerData(evt) {
            
            var id = evt.identifier!==undefined ? evt.identifier : 0; 
            var f = getFingerData( id );
            
            f.end.x = evt.pageX||evt.clientX;
            f.end.y = evt.pageY||evt.clientY;
            
            return f;
        }
        
        /**
         * Returns a finger data object by its event ID.
         * Each touch event has an identifier property, which is used 
         * to track repeat touches
         * @param {int} id The unique id of the finger in the sequence of touch events.
         * @return a finger data object.
         * @inner
        */
        function getFingerData( id ) {
            for(var i=0; i<fingerData.length; i++) {
                if(fingerData[i].identifier == id) {
                    return fingerData[i];    
                }
            }
        }
        
        /**
         * Creats all the finger onjects and returns an array of finger data
         * @return Array of finger objects
         * @inner
        */
        function createAllFingerData() {
            var fingerData=[];
            for (var i=0; i<=5; i++) {
                fingerData.push({
                    start:{ x: 0, y: 0 },
                    end:{ x: 0, y: 0 },
                    identifier:0
                });
            }
            
            return fingerData;
        }
        
        /**
         * Sets the maximum distance swiped in the given direction. 
         * If the new value is lower than the current value, the max value is not changed.
         * @param {string}  direction The direction of the swipe
         * @param {int}  distance The distance of the swipe
         * @inner
        */
        function setMaxDistance(direction, distance) {
            distance = Math.max(distance, getMaxDistance(direction) );
            maximumsMap[direction].distance = distance;
        }
        
        /**
         * gets the maximum distance swiped in the given direction. 
         * @param {string}  direction The direction of the swipe
         * @return int  The distance of the swipe
         * @inner
        */        
        function getMaxDistance(direction) {
            return maximumsMap[direction].distance;
        }
        
        /**
         * Creats a map of directions to maximum swiped values.
         * @return Object A dictionary of maximum values, indexed by direction.
         * @inner
        */
        function createMaximumsData() {
            var maxData={};
            maxData[LEFT]=createMaximumVO(LEFT);
            maxData[RIGHT]=createMaximumVO(RIGHT);
            maxData[UP]=createMaximumVO(UP);
            maxData[DOWN]=createMaximumVO(DOWN);
            
            return maxData;
        }
        
        /**
         * Creates a map maximum swiped values for a given swipe direction
         * @param {string} The direction that these values will be associated with
         * @return Object Maximum values
         * @inner
        */
        function createMaximumVO(dir) {
            return { 
                direction:dir, 
                distance:0
            }
        }
        
        
        //
        // MATHS / UTILS
        //

        /**
        * Calculate the duration of the swipe
        * @return int
        * @inner
        */
        function calculateDuration() {
            return endTime - startTime;
        }
        
        /**
        * Calculate the distance between 2 touches (pinch)
        * @param {point} startPoint A point object containing x and y co-ordinates
        * @param {point} endPoint A point object containing x and y co-ordinates
        * @return int;
        * @inner
        */
        function calculateTouchesDistance(startPoint, endPoint) {
            var diffX = Math.abs(startPoint.x - endPoint.x);
            var diffY = Math.abs(startPoint.y - endPoint.y);
                
            return Math.round(Math.sqrt(diffX*diffX+diffY*diffY));
        }
        
        /**
        * Calculate the zoom factor between the start and end distances
        * @param {int} startDistance Distance (between 2 fingers) the user started pinching at
        * @param {int} endDistance Distance (between 2 fingers) the user ended pinching at
        * @return float The zoom value from 0 to 1.
        * @inner
        */
        function calculatePinchZoom(startDistance, endDistance) {
            var percent = (endDistance/startDistance) * 1;
            return percent.toFixed(2);
        }
        
        
        /**
        * Returns the pinch direction, either IN or OUT for the given points
        * @return string Either {@link $.fn.swipe.directions.IN} or {@link $.fn.swipe.directions.OUT}
        * @see $.fn.swipe.directions
        * @inner
        */
        function calculatePinchDirection() {
            if(pinchZoom<1) {
                return OUT;
            }
            else {
                return IN;
            }
        }
        
        
        /**
        * Calculate the length / distance of the swipe
        * @param {point} startPoint A point object containing x and y co-ordinates
        * @param {point} endPoint A point object containing x and y co-ordinates
        * @return int
        * @inner
        */
        function calculateDistance(startPoint, endPoint) {
            return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
        }

        /**
        * Calculate the angle of the swipe
        * @param {point} startPoint A point object containing x and y co-ordinates
        * @param {point} endPoint A point object containing x and y co-ordinates
        * @return int
        * @inner
        */
        function calculateAngle(startPoint, endPoint) {
            var x = startPoint.x - endPoint.x;
            var y = endPoint.y - startPoint.y;
            var r = Math.atan2(y, x); //radians
            var angle = Math.round(r * 180 / Math.PI); //degrees

            //ensure value is positive
            if (angle < 0) {
                angle = 360 - Math.abs(angle);
            }

            return angle;
        }

        /**
        * Calculate the direction of the swipe
        * This will also call calculateAngle to get the latest angle of swipe
        * @param {point} startPoint A point object containing x and y co-ordinates
        * @param {point} endPoint A point object containing x and y co-ordinates
        * @return string Either {@link $.fn.swipe.directions.LEFT} / {@link $.fn.swipe.directions.RIGHT} / {@link $.fn.swipe.directions.DOWN} / {@link $.fn.swipe.directions.UP}
        * @see $.fn.swipe.directions
        * @inner
        */
        function calculateDirection(startPoint, endPoint ) {
            var angle = calculateAngle(startPoint, endPoint);

            if ((angle <= 45) && (angle >= 0)) {
                return LEFT;
            } else if ((angle <= 360) && (angle >= 315)) {
                return LEFT;
            } else if ((angle >= 135) && (angle <= 225)) {
                return RIGHT;
            } else if ((angle > 45) && (angle < 135)) {
                return DOWN;
            } else {
                return UP;
            }
        }
        

        /**
        * Returns a MS time stamp of the current time
        * @return int
        * @inner
        */
        function getTimeStamp() {
            var now = new Date();
            return now.getTime();
        }
        
        
        
        /**
         * Returns a bounds object with left, right, top and bottom properties for the element specified.
         * @param {DomNode} The DOM node to get the bounds for.
         */
        function getbounds( el ) {
            el = $(el);
            var offset = el.offset();
            
            var bounds = {    
                    left:offset.left,
                    right:offset.left+el.outerWidth(),
                    top:offset.top,
                    bottom:offset.top+el.outerHeight()
                    }
            
            return bounds;    
        }
        
        
        /**
         * Checks if the point object is in the bounds object.
         * @param {object} point A point object.
         * @param {int} point.x The x value of the point.
         * @param {int} point.y The x value of the point.
         * @param {object} bounds The bounds object to test
         * @param {int} bounds.left The leftmost value
         * @param {int} bounds.right The righttmost value
         * @param {int} bounds.top The topmost value
        * @param {int} bounds.bottom The bottommost value
         */
        function isInBounds(point, bounds) {
            return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
        };
    
    
    }
    
    


/**
 * A catch all handler that is triggered for all swipe directions. 
 * @name $.fn.swipe#swipe
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user swiped
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 */
 



/**
 * A handler that is triggered for "left" swipes.
 * @name $.fn.swipe#swipeLeft
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user swiped
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 */
 
/**
 * A handler that is triggered for "right" swipes.
 * @name $.fn.swipe#swipeRight
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user swiped
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 */

/**
 * A handler that is triggered for "up" swipes.
 * @name $.fn.swipe#swipeUp
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user swiped
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 */
 
/**
 * A handler that is triggered for "down" swipes.
 * @name $.fn.swipe#swipeDown
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user swiped
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 */
 
/**
 * A handler triggered for every phase of the swipe. This handler is constantly fired for the duration of the pinch.
 * This is triggered regardless of swipe thresholds.
 * @name $.fn.swipe#swipeStatus
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {string} phase The phase of the swipe event. See {@link $.fn.swipe.phases}
 * @param {string} direction The direction the user swiped in. This is null if the user has yet to move. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user swiped. This is 0 if the user has yet to move.
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 */
 
/**
 * A handler triggered for pinch in events.
 * @name $.fn.swipe#pinchIn
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user pinched
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
 */

/**
 * A handler triggered for pinch out events.
 * @name $.fn.swipe#pinchOut
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user pinched
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
 */ 

/**
 * A handler triggered for all pinch events. This handler is constantly fired for the duration of the pinch. This is triggered regardless of thresholds.
 * @name $.fn.swipe#pinchStatus
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
 * @param {int} distance The distance the user pinched
 * @param {int} duration The duration of the swipe in milliseconds
 * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
 * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
 */

/**
 * A click handler triggered when a user simply clicks, rather than swipes on an element.
 * This is deprecated since version 1.6.2, any assignment to click will be assigned to the tap handler.
 * You cannot use <code>on</code> to bind to this event as the default jQ <code>click</code> event will be triggered.
 * Use the <code>tap</code> event instead.
 * @name $.fn.swipe#click
 * @event
 * @deprecated since version 1.6.2, please use {@link $.fn.swipe#tap} instead 
 * @default null
 * @param {EventObject} event The original event object
 * @param {DomObject} target The element clicked on.
 */
 
 /**
 * A click / tap handler triggered when a user simply clicks or taps, rather than swipes on an element.
 * @name $.fn.swipe#tap
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {DomObject} target The element clicked on.
 */
 
/**
 * A double tap handler triggered when a user double clicks or taps on an element.
 * You can set the time delay for a double tap with the {@link $.fn.swipe.defaults#doubleTapThreshold} property. 
 * Note: If you set both <code>doubleTap</code> and <code>tap</code> handlers, the <code>tap</code> event will be delayed by the <code>doubleTapThreshold</code>
 * as the script needs to check if its a double tap.
 * @name $.fn.swipe#doubleTap
 * @see  $.fn.swipe.defaults#doubleTapThreshold
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {DomObject} target The element clicked on.
 */
 
 /**
 * A long tap handler triggered when a user long clicks or taps on an element.
 * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property. 
 * @name $.fn.swipe#longTap
 * @see  $.fn.swipe.defaults#longTapThreshold
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {DomObject} target The element clicked on.
 */

})(jQuery);/*
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
})(jQuery);