var isBirdEyeViewEnable = false;
var firstObj = true;

var allObjectsInView = true;
var alertBoxTimer; //global

var maxWidthOfAllObjects  = 0;
var maxHeightOfAllObjects = 0;
var leftMost = 0;
var rightMost = 0;
var topMost = 0;
var bottomMost = 0;
var zoom = 1;
var csfBeforeBE=1;
var frameArray = new Array();
var frameArrayUngroup = new Array();
var toggle = false;
function containsHorizontallyInView(other)
{
	var oLeft = other.getLeft() - other.width/2;
	var oRight = other.getLeft() + other.width/2;
	
    return (0 <= oLeft && mainFabricCanvas.getWidth() >= oRight)
}

function containsVerticallyInView(other)
{
	var oTop = other.getTop() - other.height/2;
	var oBottom = other.getTop() + other.height/2;
	
    return (0 <= oTop && mainFabricCanvas.getHeight() >= oBottom);
}

function containsInViewPort(other)
{
	return (containsHorizontallyInView(other) && containsVerticallyInView(other));
}

function calculateBoundary()
{
	var leftMostObj = null;
	var rightMostObj = null;
	var topMostObj = null;
	var bottomMostObj = null;
	var index = 0;
	if(mainFabricCanvas._objects.length > 2)
	{		
		mainFabricCanvas.forEachObject(function (obj)
		{
			var tagsubstring;
			if(obj.name)
			{
				var tempName = obj.name;
				tagsubstring = tempName.substring(0,4);
			}
			
			if(tagsubstring != "TAG_" && obj.name != "mainInfiniteRect" && isNotTagArea(obj))
			{
				if (firstObj)
				{
					firstObj = false;
					leftMost = obj.getLeft() -  (obj.width/2 * obj.scaleX);
					rightMost = obj.getLeft() + (obj.width/2 * obj.scaleX);
					topMost = obj.getTop() - (obj.height/2 * obj.scaleY);
					bottomMost = obj.getTop() +  (obj.height/2 * obj.scaleY);

					leftMostObj = obj;
					rightMostObj = obj;
					topMostObj = obj;
					bottomMostObj = obj;
				}
			
				allObjectsInView = allObjectsInView && containsInViewPort(obj);
				
				if ((obj.getLeft() - (obj.width/2 * obj.scaleX)) < leftMost)
				{				
					leftMost = obj.getLeft() - (obj.width/2 * obj.scaleX);
					leftMostObj = obj;
				}
					
				if ((obj.getLeft() + (obj.width/2 * obj.scaleX)) > rightMost)
				{
					rightMost = (obj.getLeft() + (obj.width/2 * obj.scaleX));
					rightMostObj = obj;
				}
					
				if ((obj.getTop() - (obj.height/2 * obj.scaleY)) < topMost)
				{				
					topMost = (obj.getTop() - (obj.height/2 * obj.scaleY));
					topMostObj = obj;
				}
					
				if ((obj.getTop() + (obj.height/2 * obj.scaleY)) > bottomMost)
				{
					bottomMost = (obj.getTop() + (obj.height/2 * obj.scaleY));	
					bottomMostObj = obj;
				}
			}		
		});
	}
}

function toggleToBirdEyeView()
{
try{

	
	if (isBirdEyeViewEnable == false)
	{
		mainFabricCanvas.forEachObject(function (obj) {	
			if(obj.isFrame)
			{
				toggle = true;
				//if(obj.child && obj.child.length)
				frameArrayUngroup.push(makeArrayOfFrameObjs(obj));

			}
			});
		isBirdEyeViewEnable = true;

		var rectBoundary = calculateBoundary();
		
		
		if (allObjectsInView)
		{
			isBirdEyeViewEnable = false;
			return;
		}
			
		if (leftMost < 0)
			maxWidthOfAllObjects = Math.abs(rightMost - leftMost);
		else
			maxWidthOfAllObjects = Math.abs(rightMost);
			
		if (topMost < 0)
			maxHeightOfAllObjects = Math.abs(bottomMost - topMost);
		else
			maxHeightOfAllObjects = Math.abs(bottomMost);
		
		var zoomX = mainFabricCanvas.getWidth() / maxWidthOfAllObjects;
		var zoomY = mainFabricCanvas.getHeight() / maxHeightOfAllObjects;
		
		if (zoomX > 1) zoomX = 1/zoomX;
		if (zoomY > 1) zoomY = 1/zoomY;
		
		zoom = zoomX > zoomY ? zoomX : zoomY;
		
		
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
					obj.newBEV_X = 0;
					obj.newBEV_Y = 0;
					obj.origionalX = obj.getLeft();
					obj.origionalY = obj.getTop();
					obj.origionalZoomX = obj.scaleX;
					obj.origionalZoomY = obj.scaleY;

					
					var left = 0;
					var top = 0;
					if (leftMost < 0)
					{
						if ((obj.getLeft() - obj.width/2) < 0)
							left = (obj.getLeft() - obj.width/2) + Math.abs(leftMost);
						else
							left = (obj.getLeft() + obj.width/2) + Math.abs(leftMost);
					}
					else
					{
						left = (obj.getLeft());
						//left = (obj.getLeft() + (obj.width/2 * obj.scaleX));
					}

					if (topMost < 0)
					{
						if ((obj.getTop() - obj.height/2) < 0)
							top = (obj.getTop() - obj.height/2) + Math.abs(topMost);
						else
							top = (obj.getTop() + obj.height/2) + Math.abs(topMost);
					}
					else
					{
						top = (obj.getTop());
						//top = (obj.getTop() + (obj.height/2 * obj.scaleY));
					}
					
					//console.log("Middle1 : left = " + left + " top = " + top);
										
					if (left > maxWidthOfAllObjects)
						left = maxWidthOfAllObjects;
					
					if (maxWidthOfAllObjects >= mainFabricCanvas.getWidth())
						left = (left / maxWidthOfAllObjects) * mainFabricCanvas.getWidth();
						
					if (top > maxHeightOfAllObjects)
						top = maxHeightOfAllObjects;
					
					if (maxHeightOfAllObjects >= mainFabricCanvas.getHeight())
						top = (top / maxHeightOfAllObjects) * mainFabricCanvas.getHeight();

					//console.log("Middle2 : left = " + left + " top = " + top);
										
					obj.scale(obj.scaleX * zoom);
					obj.setLeft(left);
					obj.setTop(top).setCoords();		
				}
			}
		});
		csfBeforeBE=canvasScaleFactor;
		handleMouseWheelEvent(-100, "BirdsView");
		
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
					obj.lockMovementX = true;
					obj.lockMovementY = true;
					obj.lockScalingX = true;
					obj.lockScalingY = true;
					obj.lockUniScaling = true;
					obj.lockRotation = true;
				}
				
			}
		});
		
		hideRightMenuOPtions("BirdView");
	}
	else
	{
		isBirdEyeViewEnable = false;
		//handleMouseWheelEvent(100, "BirdsView");
		//mainFabricCanvas.renderAll();	
		exitBirdsEyeView();
		
		var activeObject = mainFabricCanvas.getActiveObject();
		//alert(activeObject);
		if(activeObject && activeObject.name != "mainInfiniteRect" && isNotTagArea(activeObject))
		{
			goToSpecificViewPort(activeObject);
			
		}
		showRightMenuOPtions("BirdView");
		
		leftMost = 0;
		rightMost = 0;
		topMost = 0;
		bottomMost = 0;
	}

	
	//console.log(mainInfiniteRect.getLeft() + "  " + mainInfiniteRect.getTop());
	mainFabricCanvas.renderAll();
}
catch(ex)
{
	if(!isSet)
	alert(ex.message);
}
}

function exitBirdsEyeView()
{
		canvasScaleFactor= csfBeforeBE;

		mainFabricCanvas.forEachObject(function (obj) {
			{	
				var tagsubstring;
				
				if(obj.name)
				{
					var tempName = obj.name;
					tagsubstring = tempName.substring(0,4);
					
					if (obj.name == "mainInfiniteRect")
					{
						mainInfiniteRect = obj;
					}
				}
				
				if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
				{
					obj.lockMovementX = false;
					obj.lockMovementY = false;
					obj.lockScalingX = false;
					obj.lockScalingY = false;
					obj.lockUniScaling = false;
					obj.lockRotation = false;

					if (obj.scaleX == obj.scaleY)
					{
						obj.scale(obj.origionalZoomX);
					}
					
					obj.setLeft(obj.origionalX);
					obj.setTop(obj.origionalY).setCoords();
					//console.log("A : obj.X = " + obj.getLeft() + " obj.Y = " + obj.getTop());
				}
			}
		});
		if(frameArrayUngroup && frameArrayUngroup.length)
		{
			for(var i = 0 ; i < frameArrayUngroup.length ; i++)
			{
				UnGroup(frameArrayUngroup[i]);
			}
		} 
}

function goToSpecificViewPort(activeObject)
{
			var tagindex = activeObject.TagNumber;
			//var tagX1 = activeObject.tagX;
			//var tagY1 = activeObject.tagY;	
			//console.log("activeObject.tagX "+activeObject.tagX+" activeObject.tagY "+activeObject.tagY);			
			//alert(tagindex);
			if(tagindex!="undefined")
			{
				//var currentX = mainInfiniteRect.getLeft();
				//var currentY = mainInfiniteRect.getTop();	

				var currentX = superGrid.getLeft();
				var currentY = superGrid.getTop();
		
				mainFabricCanvas.forEachObject(function(obj) 
				{
					if(obj.name != "mainInfiniteRect" && isNotTagArea(obj)) //Only for inserted object
					{
						var X = (obj.getLeft() - currentX) + (objStoreX1[tagindex] * canvasScaleFactor);
						var Y = (obj.getTop() - currentY) + (objStoreY1[tagindex] * canvasScaleFactor);
						//var X = (obj.getLeft() - currentX) + (tagX1 * canvasScaleFactor);
						//var Y = (obj.getTop() - currentY) + (tagY1 * canvasScaleFactor);						
						obj.setLeft(X);
						obj.setTop(Y).setCoords();
					}
				});

				//mainInfiniteRect.setLeft(objStoreX1[tagindex] * canvasScaleFactor);
				//mainInfiniteRect.setTop(objStoreY1[tagindex] * canvasScaleFactor);
				//mainInfiniteRect.setLeft(tagX1 * canvasScaleFactor);
				//mainInfiniteRect.setTop(tagY1 * canvasScaleFactor);				
				customRenderAll();
			}
}			
