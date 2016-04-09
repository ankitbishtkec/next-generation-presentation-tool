var lastMouseDownPos;
var rotateFactor;

function rotateCanvasAntiClockwise( input )
{
	var axisCoordX;
	var axisCoordY;
	if( input )
		rotateFactor = input;
	else
		rotateFactor = parseInt(document.getElementById('RotateFactorSlider').value);
	
	var activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject && isNotTagArea(activeObject) && (activeObject.name != "mainInfiniteRect"))
	{
		//rotateObjectAntiClockwise(activeObject);
		//return;
	}
			
	if(lastMouseDownPos == undefined)
	{
		axisCoordX = mainFabricCanvas.getWidth()/2;
		axisCoordY = mainFabricCanvas.getHeight()/2;
	}
	else
	{
		axisCoordX = lastMouseDownPos.x;
		axisCoordY = lastMouseDownPos.y;
	}
	
	mainFabricCanvas.forEachObject(function(obj) {
		if (isNotTagArea(obj))
		{
			var curAngle = obj.getAngle();
			var distFromObjectInX = axisCoordX - obj.getLeft();
			var distFromObjectInY = axisCoordY - obj.getTop();
			var distFromObject = ((distFromObjectInX) * (distFromObjectInX)) + ((distFromObjectInY) * (distFromObjectInY));
			distFromObject = Math.sqrt(distFromObject);
			var prevSineOnX = distFromObjectInY/ distFromObject;
			var prevCosineOnX = distFromObjectInX/ distFromObject;
			var sineChangeDegree = Math.sin(rotateFactor * (Math.PI / 180));
			var cosineChangeDegree =  Math.cos(rotateFactor * (Math.PI / 180));			
			var currSineOnX = (prevSineOnX * cosineChangeDegree) - (prevCosineOnX * sineChangeDegree);
			var currCosineOnX = (prevCosineOnX * cosineChangeDegree) + (prevSineOnX * sineChangeDegree);
			if( (axisCoordX  - (distFromObject * currCosineOnX)) && (axisCoordY - (distFromObject * currSineOnX)) )
			{
				obj.setLeft(axisCoordX  - (distFromObject * currCosineOnX));
				obj.setTop(axisCoordY - (distFromObject * currSineOnX)).setCoords();
			}
			//if(obj.name != "mainInfiniteRect")
				obj.setAngle(curAngle - rotateFactor);
		}
	});
	customRenderAll();
}

function rotateCanvasClockwise( input )
{
	var axisCoordX;
	var axisCoordY;
	if( input )
		rotateFactor = input;
	else
		rotateFactor = parseInt(document.getElementById('RotateFactorSlider').value);	
	
	var activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject && isNotTagArea(activeObject) && (activeObject.name != "mainInfiniteRect"))
	{
		//rotateObjectClockwise(activeObject);
		//return;
	}
		
	if(lastMouseDownPos == undefined)
	{
		axisCoordX = mainFabricCanvas.getWidth()/2;
		axisCoordY = mainFabricCanvas.getHeight()/2;
	}
	else
	{
		axisCoordX = lastMouseDownPos.x;
		axisCoordY = lastMouseDownPos.y;
	}
	
	mainFabricCanvas.forEachObject(function(obj) {
		if (isNotTagArea(obj))
		{
			var curAngle = obj.getAngle();
			var distFromObjectInX = axisCoordX - obj.getLeft();
			var distFromObjectInY = axisCoordY - obj.getTop();
			var distFromObject = ((distFromObjectInX) * (distFromObjectInX)) + ((distFromObjectInY) * (distFromObjectInY));
			distFromObject = Math.sqrt(distFromObject);
			var prevSineOnX = distFromObjectInY/ distFromObject;
			var prevCosineOnX = distFromObjectInX/ distFromObject;
			var sineChangeDegree = Math.sin(rotateFactor * (Math.PI / 180));
			var cosineChangeDegree =  Math.cos(rotateFactor * (Math.PI / 180));			
			var currSineOnX = (prevSineOnX * cosineChangeDegree) + (prevCosineOnX * sineChangeDegree);
			var currCosineOnX = (prevCosineOnX * cosineChangeDegree) - (prevSineOnX * sineChangeDegree);
			if( (axisCoordX  - (distFromObject * currCosineOnX)) && (axisCoordY - (distFromObject * currSineOnX)) )
			{
				obj.setLeft(axisCoordX  - (distFromObject * currCosineOnX));
				obj.setTop(axisCoordY - (distFromObject * currSineOnX)).setCoords();
			}
			//if(obj.name != "mainInfiniteRect")
				obj.setAngle(curAngle + rotateFactor);
			
		}
	});	
	customRenderAll();
}

function rotateObjectAntiClockwise(activeObject)
{
	var temp = rotateFactor;
	if(activeObject.isFrame)
		{
			rotateFactor = Math.abs(rotateFactor);
			rotateFactor = (-1) * rotateFactor;
			frameRotate( activeObject, rotateFactor * (Math.PI / 180) );
		}
		
	rotateFactor = temp;
	var curAngle = activeObject.getAngle();
	activeObject.setAngle(curAngle - rotateFactor);
	customRenderAll();
}

function rotateObjectClockwise(activeObject)
{
	var temp = rotateFactor;
	
	if(activeObject.isFrame)
		{
			rotateFactor = Math.abs(rotateFactor);
			frameRotate( activeObject, rotateFactor * (Math.PI / 180) );
		}
		
	rotateFactor = temp;
	var curAngle = activeObject.getAngle();
	activeObject.setAngle(curAngle + rotateFactor);
	customRenderAll();
}
