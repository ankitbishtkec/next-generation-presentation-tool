var canvasScaleFactor = 1;

function handleMouseWheelEvent(mouseWheelDelta, target, event)
{
	if(exampleLoadStatus==true)
	{
		return;
	}
	
	if (target != "BirdsView" && isBirdEyeViewEnable)
	{
		var alertBox = document.getElementById('alert');
		clearTimeout(alertBoxTimer);
		if (alertBox)
		{
			alertBox.style.display = 'block';
			alertBoxTimer = window.setTimeout(function() {
				alertBox.style.display = 'none';
				clearTimeout(alertBoxTimer);
				} ,500);
			return;
		}		
	}
	
	var zoomFactor = parseFloat(document.getElementById('ZoomFactorSlider').value);
	var mouseCurPosX;
	var mouseCurPosY;
	if (target == "BirdsView")
	{
		mouseCurPosX = mainFabricCanvas.getWidth()/2; //Center of canvas
		mouseCurPosY = mainFabricCanvas.getHeight()/2; //Center of canvas
		zoomFactor = 1.3;
	}
	else if(target != "buttonPressed")
	{
		mouseCurPosX = mouseCurPos.x;
		mouseCurPosY = mouseCurPos.y;
	}
	else
	{
		mouseCurPosX = mainFabricCanvas.getWidth()/2; //Center of canvas
		mouseCurPosY = mainFabricCanvas.getHeight()/2; //Center of canvas
	}
	if( target && target.sender)
	{
		var packet = target;
		zoomFactor = packet.zoom;
		mouseCurPosX = packet.mouseX ;
		mouseCurPosY = packet.mouseY;
		
	}	
	
	if (mouseWheelDelta > 0)
	{	
		canvasScaleFactor = canvasScaleFactor * zoomFactor;
    	mainFabricCanvas.forEachObject(function (obj) {
            {
				var tagsubstring;
				if(obj.name)
				{
					var tempName = obj.name;
					tagsubstring = tempName.substring(0,4);
				}
				
				if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
				{
				    if (obj.scaleX == obj.scaleY)
					{											
						obj.scale(obj.scaleX * zoomFactor);
				    }
					else
					{
						obj.set('scaleX', obj.scaleX * zoomFactor);
						obj.set('scaleY', obj.scaleY * zoomFactor);
					}
				}	
				if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
				{	
					obj.setLeft((obj.getLeft() * zoomFactor) - ((zoomFactor - 1) * mouseCurPosX));
					obj.setTop((obj.getTop() * zoomFactor) - ((zoomFactor - 1) * mouseCurPosY)).setCoords();
				}					
            }
        });
	}
	else if (mouseWheelDelta < 0)
	{	
		canvasScaleFactor = canvasScaleFactor / zoomFactor;
        mainFabricCanvas.forEachObject(function (obj) {
            {
				var tagsubstring;
				if(obj.name)
				{
					var tempName = obj.name;
					tagsubstring = tempName.substring(0,4);
				}
				
				if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")				
				{	
				    if (obj.scaleX == obj.scaleY)
					{
						obj.scale(obj.scaleX / zoomFactor);
					}
					else 
					{										
						obj.set('scaleX', obj.scaleX / zoomFactor);
						obj.set('scaleY', obj.scaleY / zoomFactor);
					}
				}	
				if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
				{
					obj.setLeft((obj.getLeft() / zoomFactor)+ ((1 - 1/zoomFactor) * mouseCurPosX));
					obj.setTop((obj.getTop() / zoomFactor)+ ((1 - 1/zoomFactor) * mouseCurPosY)).setCoords();
				}
            }
        });
	}
	
	customRenderAll();
}

function mouseWheel(event, target){
	var delta = 0;
	if (!event)
		event = window.event;
		
	if (event.wheelDelta)
		delta = event.wheelDelta/120; 
	else if (event.detail)
		delta = -event.detail/3;

	if (delta)
		handleMouseWheelEvent(delta, target, event);
		
	if (event.preventDefault)
		event.preventDefault();
		
	event.returnValue = false;		
}

function zoomInCanvas()
{
	handleMouseWheelEvent(100, "buttonPressed");
}

function zoomOutCanvas()
{
	handleMouseWheelEvent(-100, "buttonPressed");	
}
