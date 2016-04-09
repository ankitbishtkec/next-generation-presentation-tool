var frameUnderMovementRight=[];
function callRight()
{
//right
	var activeObject = mainFabricCanvas.getActiveObject();
	if(!activeObject)
	{
		return;
	}	
	if(activeObject.isFrame)
	{	
		if(activeObject.child.length)
		{
			activeObject = makeArrayOfFrameObjs(activeObject);
			frameUnderMovementRight.push(activeObject);
			mainFabricCanvas.setActiveObject(activeObject);
		}
	}
	if(activeObject.pathset)
	{
		for ( var i=0; i< objectsToPathArray.length; i=i+3)
		{
			if( activeObject == objectsToPathArray[i])
			{
				groupAnimate = getArrayOfPathSubsetAnimation(activeObject);
				newGroup = 1;
				var objectsToPathArrayTemp = new Array();;
				for(var k =0;k<objectsToPathArray.length;k++){
					objectsToPathArrayTemp[k]=objectsToPathArray[k];
				}				
				activeObject = CompleteGroup(groupAnimate);
				objectsToPathArray = objectsToPathArrayTemp;
				for(var k =0;k<objectsToPathArrayTemp.length;k++){
					objectsToPathArray[k]=objectsToPathArrayTemp[k];
				}				
				pathUnderAnimation = activeObject;
				break;
			}
		}
	}
	{
	clearInterval(activeObject.Iinterval);
	
	intervalVariable=setInterval(function animateInfiniteLinear() {
  						infiniteRight(activeObject);
  						customRenderAll();
  						//setTimeout(animateR, 1);
						}, 30);
	activeObject.Iinterval = intervalVariable;
	activeObject.infiniteNav=1;
	}

}

function callLeft()
{//left
	var activeObject = mainFabricCanvas.getActiveObject();
	if(!activeObject)
	{
		return;
	}	
	if(activeObject.isFrame)
	{	
		if(activeObject.child.length)
		{
			activeObject = makeArrayOfFrameObjs(activeObject);
			frameUnderMovementRight.push(activeObject);
			mainFabricCanvas.setActiveObject(activeObject);
		}
	}	
	if(activeObject.pathset)
	{
		for ( var i=0; i< objectsToPathArray.length; i=i+3)
		{
			if( activeObject == objectsToPathArray[i])
			{
				groupAnimate = getArrayOfPathSubsetAnimation(activeObject);
				newGroup = 1;
				var objectsToPathArrayTemp = new Array();;
				for(var k =0;k<objectsToPathArray.length;k++){
					objectsToPathArrayTemp[k]=objectsToPathArray[k];
				}				
				activeObject = CompleteGroup(groupAnimate);
				objectsToPathArray = objectsToPathArrayTemp;
				for(var k =0;k<objectsToPathArrayTemp.length;k++){
					objectsToPathArray[k]=objectsToPathArrayTemp[k];
				}				
				pathUnderAnimation = activeObject;
				break;
			}
		}
	}
	{
	clearInterval(activeObject.Iinterval);
	
	intervalVariable=setInterval(function animateInfiniteLinear() {
  						infiniteLeft(activeObject);
  						customRenderAll();
  						//setTimeout(animateR, 1);
						}, 30);
	activeObject.infiniteNav=1;					
	activeObject.Iinterval = intervalVariable;
	}
	
}

function callDown()
{//bottom
	var activeObject = mainFabricCanvas.getActiveObject();
	if(!activeObject)
	{
		return;
	}	
	if(activeObject.isFrame)
	{	
		if(activeObject.child.length)
		{
			activeObject = makeArrayOfFrameObjs(activeObject);
			frameUnderMovementRight.push(activeObject);
			mainFabricCanvas.setActiveObject(activeObject);
		}
	}	
	if(activeObject.pathset)
	{
		for ( var i=0; i< objectsToPathArray.length; i=i+3)
		{
			if( activeObject == objectsToPathArray[i])
			{
				groupAnimate = getArrayOfPathSubsetAnimation(activeObject);
				newGroup = 1;
				var objectsToPathArrayTemp = new Array();;
				for(var k =0;k<objectsToPathArray.length;k++){
					objectsToPathArrayTemp[k]=objectsToPathArray[k];
				}				
				activeObject = CompleteGroup(groupAnimate);
				objectsToPathArray = objectsToPathArrayTemp;
				for(var k =0;k<objectsToPathArrayTemp.length;k++){
					objectsToPathArray[k]=objectsToPathArrayTemp[k];
				}				
				pathUnderAnimation = activeObject;
				break;
			}
		}
	}	
	{
	clearInterval(activeObject.Iinterval);
	
	intervalVariable=setInterval(function animateInfiniteLinear() {
  						infiniteDown(activeObject);
  						customRenderAll();
  						//setTimeout(animateR, 1);
						}, 30);
	activeObject.infiniteNav=1;					
	activeObject.Iinterval = intervalVariable;
	}
}


function callUp()
{//top
	
	var activeObject = mainFabricCanvas.getActiveObject();
	if(!activeObject)
	{
		return;
	}	
	if(activeObject.isFrame)
	{	
		if(activeObject.child.length)
		{
			activeObject = makeArrayOfFrameObjs(activeObject);
			frameUnderMovementRight.push(activeObject);
			mainFabricCanvas.setActiveObject(activeObject);
		}
	}		

	if(!activeObject)
	{
		return;
	}
	
	if(activeObject.pathset)
	{
		for ( var i=0; i< objectsToPathArray.length; i=i+3)
		{
			if( activeObject == objectsToPathArray[i])
			{
				groupAnimate = getArrayOfPathSubsetAnimation(activeObject);
				newGroup = 1;
				var objectsToPathArrayTemp = new Array();;
				for(var k =0;k<objectsToPathArray.length;k++){
					objectsToPathArrayTemp[k]=objectsToPathArray[k];
				}				
				activeObject = CompleteGroup(groupAnimate);
				objectsToPathArray = objectsToPathArrayTemp;
				for(var k =0;k<objectsToPathArrayTemp.length;k++){
					objectsToPathArray[k]=objectsToPathArrayTemp[k];
				}				
				pathUnderAnimation = activeObject;
				break;
			}
		}
	}
	{
		clearInterval(activeObject.Iinterval);
		
		intervalVariable=setInterval(function animateInfiniteLinear() {
							infiniteUp(activeObject);
							customRenderAll();
							//setTimeout(animateR, 1);
							}, 30);
		activeObject.infiniteNav=1;
		activeObject.Iinterval = intervalVariable;
	}
}

function callStop()
{
	var len=mainFabricCanvas._objects.length-1;
	var activeObject = mainFabricCanvas.getActiveObject();
	if(pathUnderAnimation)
	{
		//alert(pathUnderAnimation);
		UnGroup(pathUnderAnimation);
		
	}
	if(activeObject && activeObject.infiniteNav==1)
	{
		activeObject.infiniteNav=0;
		clearInterval(activeObject.Iinterval);
		if(activeObject.isFrame)
		{	
			if(activeObject.child.length)
			{
				UnGroup(activeObject);
			}
		}		
	}
	
	
	else
	{
		for(i=len; i >= 0; i--)
		{
			if(mainFabricCanvas._objects[i].infiniteNav==1)
			{
				mainFabricCanvas._objects[i].infiniteNav==0
				clearInterval(mainFabricCanvas._objects[i].Iinterval);
			}
		
		}
		
		for(i=0;i<frameUnderMovementRight.length;i++)
		{
				UnGroup(frameUnderMovementRight[i]);
		}		
	}
}

function infiniteDown(activeObject)
{
		 var top=activeObject.getTop() + 1 ;
		 activeObject.setTop(top);
		 
}

function infiniteUp(activeObject)
{
		 var top=activeObject.getTop() - 1 ;
		 activeObject.setTop(top);
		 
}

function infiniteLeft(activeObject)
{
		 var left=activeObject.getLeft() - 1 ;
		 activeObject.setLeft(left);
		 
}

function infiniteRight(activeObject)
{
		 var right=activeObject.getLeft() + 1 ;
		 activeObject.setLeft(right);
		 
}