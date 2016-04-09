//frames -start****************************************************************************
var arrFrames;
var tolerance = 10;
var frameScaleX;
var frameScaleY;
var initialFrameScaleX;
var initialFrameScaleY;
var frameTheta;
var initialFrameTheta;


function makeArrayOfFrameObjs(frameObject)
{
	var frame = frameObject;
	frame.child = getArrayOfFrameObjects(frame);
	if(frame.isSlideObj)
	{	var len=frame.child.length;
		frame.child[len]=frame.ctrl1;
		frame.child[len+1]=frame.ctrl2;
		frame.child[len+2]=frame.ctrl3;
	}
	if(frame.child && frame.child.length>0)
	{
		for(var i = 0; i<frame.child.length; i++) {
			if(frame.isLinear)
				frame.child[i].isLinear = true;
			if(frame.isRotate)
				frame.child[i].isRotate = true;
			if(frame.isZoom)
				frame.child[i].isZoom = true;
		}
		var objectFrameForAnimation = new Array(frame.child.length+1);
		newGroup=1;
		objectFrameForAnimation[0]=frame;
		for(var count = 0 ; count < (frame.child.length); count++)
		{
			objectFrameForAnimation[count+1]=frame.child[count];
			
		}		
		var grpObject = CompleteGroup(objectFrameForAnimation);
		grpObject.saveCoords();
		return grpObject;
	}
	return frame;
}

function frameZoom(frame, zoomX, zoomY)
{
	if(frame.isFrame == 0)
		return;
		
	for(var count = 0 ; count < (frame.child.length); count++)
	{
		var obj = frame.child[count];
		{
			obj.set('scaleX', obj.scaleX * zoomX);
			obj.set('scaleY', obj.scaleY * zoomY);
		}
	
		obj.setLeft((obj.getLeft() * zoomX) - ((zoomX - 1) * frame.getLeft()));
		obj.setTop((obj.getTop() * zoomY) - ((zoomY - 1) * frame.getTop())).setCoords();
		
	}
	
	customRenderAll();

}

function frameRotate( frame, phiRadian, caller )
{
	//anti -ve phiRadian
	//clock +ve phiRadian
	if(frame.isFrame == 0)
		return;
	var axisCoordX = frame.getLeft();
	var axisCoordY = frame.getTop();
	var rotateFactor = phiRadian * (180 / Math.PI);
	
	if(rotateFactor < 0)
	for(var count = 0 ; count < (frame.child.length); count++)
	{
		var obj = frame.child[count];
		{	
			rotateFactor = Math.abs(rotateFactor);
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
			if( caller != "onload" )
				obj.setAngle(curAngle - rotateFactor);
		}
		
	}
	else
	for(var count = 0 ; count < (frame.child.length); count++)
	{
		var obj = frame.child[count];
		{	
			rotateFactor = Math.abs(rotateFactor);
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
			if( caller != "onload" )
				obj.setAngle(curAngle + rotateFactor);
		}
		
	}
	
	customRenderAll();

}

function getTriangleArea(x1, y1, x2, y2, x3, y3)
{
 // s = mod of((x1*y2 + x2*y3 + x3*y1 - y1*x2 - y2*x3 - y3*x1 )/2)
 var area = (x1 * y2 + x2 * y3 + x3 * y1 - y1 * x2 - y2 * x3 - y3 * x1 )/2
 area = Math.abs(area);
 return area;
}

function isObjectInFrame( frame, obj)
{
	var frameCoords = frame.oCoords;
	var frameArea = getTriangleArea(frameCoords.tl.x, frameCoords.tl.y, frameCoords.br.x, frameCoords.br.y, frameCoords.bl.x, frameCoords.bl.y) + 
			getTriangleArea(frameCoords.tl.x, frameCoords.tl.y, frameCoords.br.x, frameCoords.br.y, frameCoords.tr.x, frameCoords.tr.y);
			
	
	var rhs = getTriangleArea(frameCoords.tl.x, frameCoords.tl.y, frameCoords.tr.x, frameCoords.tr.y, obj.getLeft(), obj.getTop()) + 
			getTriangleArea(frameCoords.tr.x, frameCoords.tr.y, frameCoords.br.x, frameCoords.br.y, obj.getLeft(), obj.getTop()) + 
			getTriangleArea(frameCoords.br.x, frameCoords.br.y, frameCoords.bl.x, frameCoords.bl.y, obj.getLeft(), obj.getTop()) + 
			getTriangleArea(frameCoords.bl.x, frameCoords.bl.y, frameCoords.tl.x, frameCoords.tl.y, obj.getLeft(), obj.getTop());
			
	var temp = Math.abs(frameArea - rhs);
		
	if(temp <= tolerance)
		return true;
	else
		return false;
}

function findParentFrame(obj)
{
	if(frames.length == 0)
		return -1;
	
	var responseFrame = -1;
	for(var count = 0 ; count < (mainFabricCanvas._objects.length); count++)
	{
		if( mainFabricCanvas._objects[count].isFrame)
		if(mainFabricCanvas._objects[count] != obj)
		{
			if( isObjectInFrame( mainFabricCanvas._objects[count] , obj) )
			{	
				responseFrame = mainFabricCanvas._objects[count];
			}
		}
	}		
	return responseFrame;
}

function getArrayOfFrameObjects(frame)
{
	var response = new Array();
	var innerresponse=new Array();
	//response[0] = frame;
	//var count1 = 1;
	var count1 = 0;
	var valid = 0;
	
	for(var count = 0 ; count < (mainFabricCanvas._objects.length); count++)
	{
		if( mainFabricCanvas._objects[count].name != "mainInfiniteRect" && isNotTagArea( mainFabricCanvas._objects[count] ) && !mainFabricCanvas._objects[count].isLeftCtrl && !mainFabricCanvas._objects[count].isRightCtrl && !mainFabricCanvas._objects[count].isShuffle)
		if(mainFabricCanvas._objects[count] == frame)
		{
			valid = 1;
		}
		else if( valid == 1 ) 
		if( isObjectInFrame( frame, mainFabricCanvas._objects[count] ) )
			{	
				response[count1] = mainFabricCanvas._objects[count];
				count1++;
				if(response[count1-1].isFrame)
				{
					innerresponse = getArrayOfFrameObjects(response[count1 - 1]);

					for(var j=0;j<innerresponse.length;j++)
					{
						response[count1+j]=innerresponse[j];
						
					}
					count1+=innerresponse.length;
				}	
				
			}
	}
	var len=response.length;
	for(var j=0;j<len; j++)
	{
		if(response[j].isSlideObj==1)
		{
			response[len]=response[j].ctrl1;
			response[len+1]=response[j].ctrl2;
			response[len+2]=response[j].ctrl3;
		}
	}
	return response;
	

}

function addFrame(obj)
{
	obj.isFrame = 1;
	//obj.Parent = findParentFrame(obj);
	//var count = frames.length;
	//frames[count] = obj;
}

function frameSort()
{
 arrFrames = new Array();
 
 var i = 0;
 for(i= 0; i < mainFabricCanvas._objects.length; i++)
 {
	if(mainFabricCanvas._objects[i].isFrame)
	{
		arrFrames[arrFrames.length] = mainFabricCanvas._objects[i];
	}
 }
 
 arrFrames = mergeSort( arrFrames );
 arrFrames = arrFrames.reverse();
 
 i = 0;
 for(i= 0; i < mainFabricCanvas._objects.length; i++)
 {
	if( ( !mainFabricCanvas._objects[i].isFrame ) && ( ( isNotTagArea(mainFabricCanvas._objects[i]) ) && ( !mainFabricCanvas._objects[i].isPathImg ) ) && ( mainFabricCanvas._objects[i].name != "mainInfiniteRect" ) )
	{
		arrFrames[arrFrames.length] = mainFabricCanvas._objects[i];
	}
 }
  
 i = 0;
 for(i= 0; i < mainFabricCanvas._objects.length; i++)
 {
	if( ( !mainFabricCanvas._objects[i].isFrame ) && ( ( !isNotTagArea(mainFabricCanvas._objects[i]) ) || ( mainFabricCanvas._objects[i].isPathImg ) )  && ( mainFabricCanvas._objects[i].name != "mainInfiniteRect" ) )
	{
		arrFrames[arrFrames.length] = mainFabricCanvas._objects[i];
	}
 }
 
 var objReplaceArray = new Array();
 objReplaceArray[0] = mainFabricCanvas._objects[0];
 objReplaceArray = objReplaceArray.concat(arrFrames);
 
 //console.log( "start " + objReplaceArray.length );
 //console.log( mainFabricCanvas._objects.length );
 
 mainFabricCanvas._objects = objReplaceArray;
 
}

function groupSort(group)
{
 arrFrames = new Array();
 
 var i = 0;
 for(i= 0; i < group.length; i++)
 {
	if(group[i].isFrame)
	{
		arrFrames[arrFrames.length] = group[i];
	}
 }
 
 arrFrames = mergeSort( arrFrames );
 arrFrames = arrFrames.reverse();
 
 i = 0;
 for(i= 0; i < group.length; i++)
 {
	if( ( !group[i].isFrame ) && ( ( isNotTagArea(group[i]) ) && ( !group[i].pathsetAnimate ) ) && ( group[i].name != "mainInfiniteRect" ) )
	{
		arrFrames[arrFrames.length] = group[i];
	}
 }
  
 i = 0;
 for(i= 0; i < group.length; i++)
 {
	if( ( !group[i].isFrame ) && ( ( !isNotTagArea(group[i]) ) || ( group[i].pathsetAnimate ) )  && ( group[i].name != "mainInfiniteRect" ) )
	{
		arrFrames[arrFrames.length] = group[i];
	}
 }
 
 var objReplaceArray = new Array();
 objReplaceArray = objReplaceArray.concat(arrFrames);
 
 group = objReplaceArray;
 return group;
 
}

function mergeSort(arr)
{
    if (arr.length < 2)
        return arr;
 
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
 
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        //if (left[0] <= right[0])
		if( isLeftLessThanEqualToRight(left[0], right[0]) ){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}

function isLeftLessThanEqualToRight(left, right)
{
	if((( left.height * left.scaleY) <= ( right.height * right.scaleY)) && (( left.width * left.scaleX ) <= ( right.width * right.scaleX)))
		return true;
	else if((( left.height * left.scaleY) >= ( right.height * right.scaleY)) && (( left.width * left.scaleX ) >= ( right.width * right.scaleX)))
			return false;
		else
			return true;
}



//frames -end**********************************************************************************