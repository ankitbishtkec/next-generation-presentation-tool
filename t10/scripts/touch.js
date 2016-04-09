var hammer = null;
var longPressWaitingTime = 1000; //Long Press feature config
var longPressTimer = -1;
var previousScaleFactor = 1;
var scaleFactor = 1;
var tagetElement = null;

function handleHammerEvents(event)
{
	try
	{
		switch(event.type)
		{
			case 'hold' :
				longPressTimer = window.setTimeout(function() {
						var e = event.originalEvent;
						showContextMenu(e,"hold");
					} ,longPressWaitingTime);
					

				customRenderAll();
				break;
			case 'tap'	:
				break;
			case 'doubletap'	:
				//freeDrawMode();
				
				break;
			case 'transformstart'	:
				tagetElement = mainFabricCanvas.getActiveObject() ? mainFabricCanvas.getActiveObject() : mainFabricCanvas.findTarget(event.originalEvent);
				clearTimeout(longPressTimer);
			case 'transform'	:
				if(tagetElement && (tagetElement.name != "mainInfiniteRect" || !isNotTagArea(tagetElement)))
				{
					scaleFactor = (previousScaleFactor * event.scale);
					scaleFactor = (Math.round(scaleFactor * 100) / 100);
					
					tagetElement.scale(scaleFactor);
					tagetElement.setAngle(Math.round(event.rotation * 100) / 100);
					
					customRenderAll();
				}
				break;
				
			case 'transformend'	:
				if(tagetElement && (tagetElement.name != "mainInfiniteRect" || !isNotTagArea(tagetElement)))
				{
					previousScaleFactor = scaleFactor;
					tagetElement = null;
				}
				break;
			case 'dragstart'	:
				clearTimeout(longPressTimer);				
				break;
			case 'drag'	:
				break;
			case 'dragend'	:
				break;
			case 'swipe'	:
				break;
			case 'release'	:
				clearTimeout(longPressTimer);
				break;
		}
	}
	catch(ex)
	{
		alert(ex.message);
	}
}

function initHammerEvents() 
{

	if(hammer != 'undefined' && mainFabricCanvas != 'undefined')
	{
		var events = ['hold','tap','doubletap','transformstart','transform','transformend','dragstart','drag','dragend','swipe','release'];
		for(var  i =0; i < events.length; i++) {
			hammer['on'+ events[i]] = handleHammerEvents;
		}
	}
	else
	{
		alert("Either hammaer or fabric object is not initilized");
	}
}
