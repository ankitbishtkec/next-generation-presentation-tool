$(function() {
     
     
     var feedbackTab = {
         
         speed:300,
         containerWidth:$('.feedback-panel').outerWidth(),
         containerHeight:($('.feedback-panel').outerHeight() - 352),//<!-- SISO :change the slide panel width -->
         tabWidth:$('.feedback-tab').outerWidth(),
         
         init:function(){
             $('.feedback-panel').css('height',feedbackTab.containerHeight + 'px');
             $('.feedback-panel').css('background-color','yellowgreen');
             $('a.feedback-tab').click(function(event){

                 if ($('.feedback-panel').hasClass('open')) {
                     $('.feedback-panel').animate({left:'-' + feedbackTab.containerWidth}, feedbackTab.speed)
                     .removeClass('open');
                 } else {
                     $('.feedback-panel').animate({left:'0'},  feedbackTab.speed)
                     .addClass('open');
                 }
                 event.preventDefault();
             });
         }
     };
     
     feedbackTab.init();

 });
 
 $(document).keyup(function(e) {

  if (e.keyCode == 27) 
  { 
  //alert("escape");
	if(documentBodyElement.ARLFullScreen)
	{	//alert("escape");
			showMenu(documentBodyElement);
			exitFullscreen(documentBodyElement);
	}   // esc
  }
  if (e.keyCode == 122) 
 {
	//if(!documentBodyElement.ARLFullScreen)
	//{	
	//		hideMenu(documentBodyElement);
	//		requestFullScreen(documentBodyElement);
	//		addMenuSlider();
	//		documentBodyElement.ARLFullScreen=true;
	//			document.getElementById("fullScreen").src= ".//resources//exitFullScreen.png";
	//	}   // esc
  }  
});

	