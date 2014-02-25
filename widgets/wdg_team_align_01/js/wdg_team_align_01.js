;$(document).ready(function() {
 
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
 });