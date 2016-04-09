var tagsCount = 0;
var objStoreX = new Array();
var objStoreY = new Array();
var tagRect;
var preziLinear=null;
var playMode = 0;
var playModeTag = 0;
var frameUnderTagging=0;

var objStoreX1 = new Array();
var objStoreY1 = new Array();
var tagsCount1 = 0;

function setPlayMode(valuePlayMode)
{
	playMode = valuePlayMode;
}
function getPlayMode()
{
	return playMode;
}

function setPlayModeTag(valuePlayMode)
{
	playModeTag = valuePlayMode;
}
function getPlayModeTag()
{
	return playModeTag;
}

function ClearAllTags()
{
	/*mainFabricCanvas.forEachObject(function(obj) {
		if (obj && obj.name != "mainInfiniteRect" && obj.name != "tags")	
		{	
			if(obj.attachObject)
			{
				mainFabricCanvas.remove(obj.attachObject);
				mainFabricCanvas.remove(obj);
			}
				
		}
		
	});	*/

	mainFabricCanvas.forEachObject(function(obj) {
		if (!isNotTagArea(obj) && obj.name != "tags")	
		{
			mainFabricCanvas.remove(obj);
		}	
	});	
	objStoreX=[];
	objStoreY=[];
	tagsCount=0;	
	customRenderAll();
}
function createTagArea()
{
	tagRect = new fabric.Rect({
					width: 10000000,
					height: 60,
					top: 25,
					left: 25,
					fill: 'rgba(139,157,181,255)'});
	tagRect.hasControls = false;
	tagRect.lockMovementX = true;
	tagRect.lockMovementY = true;
	tagRect.lockScalingX = true;
	tagRect.lockScalingY = true;
	tagRect.lockUniScaling = true;
	tagRect.lockRotation = true;
	tagRect.name = "tags";
	mainFabricCanvas.add(tagRect);
}

function isNotTagArea(obj)
{
	var tagsubstring;
	var tempName = obj.name;	
	
	if (obj.name == "tags")	
		return false;
	
	if(tempName)
		tagsubstring = tempName.substring(0,4);
	
	if (tagsubstring != "TAG_")	
		return true;
	else
		return false;		
}

function showTagged()
{
	var IsPlayMode = getPlayModeTag();

	if(IsPlayMode)
	{
		if(window.preziLinear){
			clearInterval(window.preziLinear);	
		}			
		var tempName = capturedObj.target.name;
		var i=0,xAxisVar=0,yAxisVar=0;
		if(!tempName) //If clicked on inserted object no action
			return;
			
		var tagsubstring = tempName.substring(0,4);	
		if(tagsubstring == "TAG_")
		{
			var tagindex = tempName.substring(4,5);
			//var currentX = mainInfiniteRect.getLeft();
			//var currentY = mainInfiniteRect.getTop();
			
			//New change for zoom
			var currentX = superGrid.getLeft();
			var currentY = superGrid.getTop();
			
			var currentY_Prv;
			var centreOfObjX_Orig = currentX;
			var centreOfObjY_Orig = currentY ;		
			var yChanged = 0;
			var xChanged = 0;
			var stepX =10; 
			var slope;
			if(objStoreX[tagindex]* canvasScaleFactor > currentX) {
				stepX = 5;
			} else if(objStoreX[tagindex]* canvasScaleFactor < currentX) {
				stepX = -5;
			}		
			//console.log("objStoreX[tagindex]  " + objStoreX[tagindex] + "  objStoreY[tagindex]  " + objStoreY[tagindex]);
			//console.log("currentX  " + currentX + "  currentY  " + currentY);
			slope = (((objStoreY[tagindex]* canvasScaleFactor - currentY)/(objStoreX[tagindex]* canvasScaleFactor - currentX)));
			window.preziLinear = setInterval(function (s) {
				currentX = currentX  + stepX;
				currentY_Prv = currentY;
				currentY = (slope * (currentX-centreOfObjX_Orig)) + centreOfObjY_Orig;	
				diffInY = currentY-currentY_Prv;		
				if( (stepX > 0 && currentX>=objStoreX[tagindex]* canvasScaleFactor) || (stepX < 0 && currentX<=objStoreX[tagindex]* canvasScaleFactor) )
				{
					clearInterval(window.preziLinear);	
					return;
				}			
				mainFabricCanvas.forEachObject(function(obj) 
				{	
					if( isNotTagArea(obj)) //Only for inserted object
					{
						if( obj.name == "mainInfiniteRect")
						{
							var X = (obj.getLeft() + stepX);
							var Y = (currentY);
							obj.setLeft(X);
							obj.setTop(Y).setCoords();
							//console.log("currentX  " + currentX + "  currentY  " + currentY + " obj.getLeft() "+obj.getLeft()+" obj.getTop() "+obj.getTop()+" obj.name "+obj.name);
						} else {
							var X = (obj.getLeft() + stepX);
							var Y = (obj.getTop()+diffInY);
							obj.setLeft(X);
							obj.setTop(Y).setCoords();
							//console.log("currentX  " + currentX + "  currentY  " + currentY + " obj.getLeft() "+obj.getLeft()+" obj.getTop() "+obj.getTop()+" obj.name "+obj.name);
						}
					}			
				});
				customRenderAll();
			}, 1);
		} 
	} else {
		var tempName = capturedObj.target.name;
		if(!tempName) //If clicked on inserted object no action
			return;
			
		var tagsubstring = tempName.substring(0,4);
		var currentX = superGrid.getLeft();
		var currentY = superGrid.getTop();

		if(tagsubstring == "TAG_")
		{
			/* Disable Birds Eye View */
			if (isBirdEyeViewEnable == true)
			{
				toggleToBirdEyeView();
			}		
			
			var tagindex = tempName.substring(4,5);
			mainFabricCanvas.forEachObject(function(obj) 
			{
				if(obj.name != "mainInfiniteRect" && isNotTagArea(obj) ) //Only for inserted object
				{
					var X = (obj.getLeft() - currentX) + (objStoreX[tagindex] * canvasScaleFactor);
					var Y = (obj.getTop() - currentY) + (objStoreY[tagindex] * canvasScaleFactor);
					obj.setLeft(X);
					obj.setTop(Y).setCoords();
				}
			});

			//mainInfiniteRect.setLeft(objStoreX[tagindex] * canvasScaleFactor);
			//mainInfiniteRect.setTop(objStoreY[tagindex] * canvasScaleFactor);
			//mainInfiniteRect.setLeft(objStoreX[tagindex] * 1);
			//mainInfiniteRect.setTop(objStoreY[tagindex] * 1);
			customRenderAll();
		}		
	}
}

function tagItToggle(target)
{
	if(mouseCurPos.x <= 1200 && mouseCurPos.y <= 60)
	{
		tagRect.setFill('rgba(139,157,181,255)');
	}
	else
		tagRect.setFill('rgba(139,157,181,0)');
}

function tagIt(option)
{
	var IsPlayMode = getPlayMode();
	if (IsPlayMode)
		return;
	var tagsubstring;
	var tagName = "TAG_";
	var manualTag=0;
	var groupingDone=0;
	var infiniteBase,infiniteBaseName;
	if(option=="handleDynamicMenuClick" || option == "handleDefaultMenuClick" || option == "EnteringPlayMode")
	{
		tagsubstring="";
		infiniteBaseName="";
	} else {	
		if(capturedObj)
		{
		
			var infiniteBase = capturedObj.target;
			//alert(infiniteBase);

			var newTag;
			var toBeTaggedX,toBeTaggedY,xHasTagged,yHasTagged;
						
			if(!infiniteBase)
				return;

			if(infiniteBase.name)
			{
				var tempName = infiniteBase.name;
				tagsubstring = tempName.substring(0,4);
				infiniteBaseName = infiniteBase.name;
			}
		}
	}
	if(tagsubstring != "TAG_" && infiniteBaseName != "mainInfiniteRect")
	{
		var shouldTagged = 0 ;
		var aCloseTagExists = 0 ;
		if(option == "EnteringPlayMode")
		{
			shouldTagged=1;
			aCloseTagExists = 0 ;
			
			
		} else if(mouseCurPos.x <= 1200 && mouseCurPos.y <= 60) {
			shouldTagged = 1 ;
			manualTag=1;
			if(capturedObj)
			{		
				var infiniteBase1 = capturedObj.target;			
				if(infiniteBase1.isFrame) 
				{
					if(infiniteBase1.child.length)
					{
						infiniteBase = makeArrayOfFrameObjs(infiniteBase1);
						frameUnderTagging = infiniteBase;			
						mainFabricCanvas.setActiveObject(infiniteBase);
						groupingDone=1;
					}
				}
			}				
		} else {
			toBeTaggedX = (superGrid.getLeft())/ canvasScaleFactor;
			toBeTaggedY = (superGrid.getTop())/ canvasScaleFactor;
			var count=0;
			var found=0;
			
			xHasTagged = objStoreX.indexOf(toBeTaggedX);
			yHasTagged = objStoreY.indexOf(toBeTaggedY);
			for(var i=0;i<objStoreX.length;i++) 
			{	
				if( Math.abs(objStoreX[i]-toBeTaggedX) <  100 )
				{
					if(Math.abs(objStoreY[i]-toBeTaggedY) <  100)
					{
						aCloseTagExists=1;
					}
				}
			}			
			if(xHasTagged == -1 || yHasTagged == -1)	{
				shouldTagged = 1;
			} else if (xHasTagged!=yHasTagged) {
				shouldTagged = 1;
			}			
		}
		
		if(shouldTagged && !aCloseTagExists)
		{	
			if(option=="Default" && manualTag==1) 
			{		
				infiniteBase.setTop(capturedObj.top);
				infiniteBase.setLeft(capturedObj.left).setCoords();
			}
			if(option!="EnteringPlayMode")
			{
				var newTagRect = new fabric.Rect({
					width: 25,
					height: 25,
					top: 26,
					left: (26*(tagsCount+1))+tagsCount,
					fill: 'rgba(255,255,255,1)'});
					
				newTagRect.hasControls = false;
				newTagRect.lockMovementX = true;
				newTagRect.lockMovementY = true;
				newTagRect.lockScalingX = true;
				newTagRect.lockScalingY = true;
				newTagRect.lockUniScaling = true;
				newTagRect.lockRotation = true;
				mainFabricCanvas.add(newTagRect);			
					
				newTag = new fabric.Text(tagsCount.toString(), {
					width: 25,
					height: 25,
					top: 28,
					left: (26*(tagsCount+1))+tagsCount,
					textAlign: "center",
					fontSize: 20,
					fill: 'rgba(0,0,0,1)'});
				
				newTag.hasControls = false;
				tagName = tagName + tagsCount;
				newTagRect.attachObject = newTag; 
				newTagRect.name = tagName;
				newTag.attachObject = newTagRect;
				newTag.name = tagName;
				tagName = "TAG_";
				newTag.lockMovementX = true;
				newTag.lockMovementY = true;
				newTag.lockScalingX = true;
				newTag.lockScalingY = true;
				newTag.lockUniScaling = true;
				newTag.lockRotation = true;
				mainFabricCanvas.add(newTag);
				
				if (!fabric.isTouchSupported) 
					customRenderAll();
				else
					mainFabricCanvas.renderAll();
			}	
			var objIndex=tagsCount;				
			tagsCount = tagsCount + 1;
		
			objStoreX[objIndex] = (superGrid.getLeft())/ canvasScaleFactor;
			objStoreY[objIndex] = (superGrid.getTop())/ canvasScaleFactor;	
			
			objStoreX1[tagsCount1] = (superGrid.getLeft())/ canvasScaleFactor;
			objStoreY1[tagsCount1] = (superGrid.getTop())/ canvasScaleFactor;	
			tagsCount1++;			
		}
		markForBirdeyeView(tagsCount1-1,infiniteBase);		
	}	
	if(capturedObj && groupingDone)
	{
		var infiniteBase = capturedObj.target;
		if(infiniteBase.isFrame) 
		{
			if(frameUnderTagging)
				UnGroup(frameUnderTagging);			
		}	
	}
}

function markForBirdeyeView(objIndex,infiniteBase)
{
		mainFabricCanvas.forEachObject(function (obj)
		{
			var tagsubstring = "";
			
			if(obj.name)
			{
				var tempName = obj.name;
				tagsubstring = tempName.substring(0,4);
			}
			
			if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
			{
				//console.log("obj.name "+obj+" obj.TagNumber "+obj.TagNumber);
				if(obj.TagNumber=="undefined" || obj.TagNumber==null)
				{
					obj.TagNumber=objIndex;
					//obj.tagX = (mainInfiniteRect.getLeft())/ canvasScaleFactor;
					//obj.tagY = (mainInfiniteRect.getTop())/ canvasScaleFactor;	
					//console.log("obj.tagX "+obj.tagX+" obj.tagY "+obj.tagY+" obj.TagNumber "+obj.TagNumber);	
					//console.log("obj.name "+obj.name+" obj.TagNumber "+obj.TagNumber);
				}
			}
		});	
		if(infiniteBase)
		{
			infiniteBase.TagNumber=objIndex;
			//console.log("infiniteBase.name "+infiniteBase.name+" infiniteBase.TagNumber "+infiniteBase.TagNumber);
			//infiniteBase.tagX = (mainInfiniteRect.getLeft())/ canvasScaleFactor;
			//infiniteBase.tagY = (mainInfiniteRect.getTop())/ canvasScaleFactor;	
			//console.log("infiniteBase.tagX "+infiniteBase.tagX+" infiniteBase.tagY "+infiniteBase.tagY);		
		}
}
