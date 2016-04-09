
function handleSymbolClick(event)
{
	var id = event.target.id;
	hideSymbolPrompt(event);
	drawSymbol(mouseCurPos.y, mouseCurPos.x,id);
	
}

function displaySymbolPrompt(evt)
{	
	var dialog = document.getElementById("Symbolprompt");
	if(dialog.style.display == 'block')
		return;

		if(dialog)
		{
			canvasDom = document.getElementById("MainHTMLCanvas");
			if (canvasDom)
			{
				var canvasPos = getElementPosition(canvasDom);
				var symbolDialog = document.getElementById("Symbolprompt");
				var symbolDialogWidth = 0;
				var symbolDialogHeight = 0;
				if(symbolDialog.style)
				{
					symbolDialogWidth = parseInt(symbolDialog.style.width);
					symbolDialogHeight = parseInt(symbolDialog.style.height);					
				}
				else
				{
					symbolDialogWidth = symbolDialogwidth;
					symbolDialogHeight = symbolDialogheight;
				}
				
				centerX = canvasDom.offsetWidth/2 - symbolDialogWidth/2;
				centerY = canvasDom.offsetHeight/2 - symbolDialogHeight/2;

			}
			
			dialog.style.left = centerX + 'px';
			dialog.style.top = centerY + 'px';
							
			dialog.style.display = 'block';
		}
}
function hideSymbolPrompt(evt)
{
	var dialog = document.getElementById("Symbolprompt");
	if(dialog && dialog.style.display == 'block') {
		dialog.style.display = 'none';
	}
}

function applyBorder(x)
{
x.style.border="4px solid blue";
}

function removeBorder(x)
{
x.style.border="";
}

function drawSymbol(top, left, id)
{
	try{
    	var url = document.getElementById(id).src;

		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
    	

		if(!isImage(url))
		{
			alert("Select a valid image file !");
			return;
		}
			
		fabric.util.loadImage(url, function(img) 
	   	 						   {
	  								  	var oImg = new fabric.Image(img);
	  									oImg.set({ 
	    									left: insertLeft, 
	    									top: insertTop,
	    									scaleY: 1.0,
	    									scaleX: 1.0
	  									});
	  									oImg.setOpacity(document.getElementById('TransperencySlider').value);
										oImg.hasAudio = 0;
	  									
	  									mainFabricCanvas.add(oImg);
										//console.log(oImg);
										frameSort();
										customRenderAll();
								   });
	}
	catch(e){
		alert(e.message);
	}	
}