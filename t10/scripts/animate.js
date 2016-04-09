var pauseClickedWhileUDF=0;
var animationThreadHandle = null;
var StoreX0 = new Array();
var StoreY0 = new Array();
var ObjId = new Array();
var x0;
var y0;
var index = 0;
var animateConstFactor=4;
var animateEqConst=5000;
var animateVar=0;
var activeObjectMulti;
var loopId;
var animateLinearStatus=0;
var animateAbstractSingleStatus=0;
var animateAbstractMultiStatus=0;
var animateRotateStatus=0;
var animationSpeed=0;
var animationType=["Linear","Rotation","Abstract"];
var linearSpeed=0;
var zoomSpeed=0;
var animateZoomStatus = 0;
var zoomFactorForOut;
var zoomFactorOrig;
var timeOutVar;
var frameUnderAnimation;
var pathUnderAnimation;
var preziTimer = null;
var globalSteps;
var pathAnimationTimer=null;
var pathObjectCounter=-1;
var slideShowed=0;
var lastSlideShowed=-1;
var pauseClicked=0;
var objectUnderAnimation=null;
var userDefPathIndex=0;

function applyAnimation(aValue)
{
	var activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject &&activeObject.isSlideObj)
		return;
	var selectedAnimation = aValue;
	
	if(selectedAnimation == "linearAnimation")
		animateLinear();
	else if(selectedAnimation == "rotateAnimation")
		animateRotate();	
	else if(selectedAnimation == "abstractAnimationMulti")
		animateCurvyMulti();
	else if(selectedAnimation == "abstractAnimationSingle")
		animateCurvy();
	else if(selectedAnimation == "scaleAnimation")
		animateZoom();		
	else if(selectedAnimation == "stopAnimation")
	{
		if(activeObject && activeObject.type == 'group')
		{
			var groupInGroup = [];						
			groupInGroup = 	activeObject.getObjects();
			for(var j = 0; j<groupInGroup.length; j++) {
				groupInGroup[j].isRotate = false;
				groupInGroup[j].isLinear = false;
				groupInGroup[j].isZoom = false;
			}
		}
		animateLinearStatus = 0;
		animateAbstractSingleStatus = 0;
		animateAbstractMultiStatus = 0;
		animateRotateStatus = 0;
		animateZoomStatus = 0;
		if(frameUnderAnimation)
			UnGroup(frameUnderAnimation);
		if(pathUnderAnimation)
		{
		//alert(pathUnderAnimation);
			UnGroup(pathUnderAnimation);
		
		}
		return;
	}		
}

function setZoomFactor()
{
	var activeObject = 0;
	zoomFactorOrig = parseFloat(document.getElementById('ZoomFactorSlider').value);
	
	//Zoom is changed, update zoom factor either for all or only selected object
	
	activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject && (activeObject.name != "mainInfiniteRect" && isNotTagArea(activeObject)))
	{
		//Apply only to selected object
		activeObject.zoomFactorOrig = roundNumber((zoomFactorOrig+0.5),2);
	}
	else
	{
		mainFabricCanvas.forEachObject(function(obj) 
			{
				if(obj.name != "mainInfiniteRect" && isNotTagArea(obj)) //Only for inserted object
				{
					activeObject.zoomFactorOrig = roundNumber((zoomFactorOrig+0.5),2);			
				}
			});
	}
}
function updateAnimationSpeed()
{
	var activeObject = 0;
	var IsPlayMode = getPlayMode();
	if(IsPlayMode) {
		animationSpeed = parseInt(document.getElementById('CameraSpeed').value);	
	} else {
		animationSpeed = parseInt(document.getElementById('AnimationSpeed').value);	
	}
	zoomSpeed = parseInt((101-animationSpeed)/2);	
	linearSpeed = parseInt((101-animationSpeed)/3);
	
	//Speed is changed, update linear speed either for all or only selected object
	
	activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject && (activeObject.name != "mainInfiniteRect" && isNotTagArea(activeObject)))
	{
		//Apply only to selected object
		activeObject.linearSpeed = linearSpeed;
		activeObject.zoomSpeed = zoomSpeed;
	}
	else
	{
		mainFabricCanvas.forEachObject(function(obj) 
			{
				if(obj.name != "mainInfiniteRect" && isNotTagArea(obj)) //Only for inserted object
				{
					obj.linearSpeed = linearSpeed;
					obj.zoomSpeed = zoomSpeed;					
				}
			});
	}
}

function animateRotate(obj)
{
	
	//console.log("linear animation" +obj.type);
	var intervalVariable, activeObject;
	if(obj)
		activeObject = obj;
	else
		activeObject = mainFabricCanvas.getActiveObject();
	//if(activeObject &&activeObject.isSlideObj)
	//return;
	if(activeObject.hasControls != false) {
	activeObject.animateSpeed = 1; //Default speed
	activeObject.isRotate = 1;
	activeObject.animating = 2;
	animateRotateStatus = 1;
	if(activeObject.isFrame)
	{	
		if(activeObject.child.length)
		{
			activeObject = makeArrayOfFrameObjs(activeObject);
			frameUnderAnimation = activeObject;
			//activeObject.setAngle(1);
			activeObject.animateSpeed = 1;
			mainFabricCanvas.setActiveObject(activeObject);
		}
	}	
	intervalVariable = setInterval(function animateR() {
  						animateAngle(activeObject);
  						customRenderAll();
  						//setTimeout(animateR, 1);
						}, 1);
						
	activeObject.interval = intervalVariable;		
	}
}

function animateAngle(activeObject)
{
	
	var currentActiveObject=0;
	var curAngle = activeObject.getAngle();
	
	if(!animateRotateStatus)
	{
		activeObject.isRotate = 0;
		//Stop Animation
		//Clear Interval
		clearInterval(activeObject.interval);
		return;
	}
	currentActiveObject = mainFabricCanvas.getActiveObject();
	
	if(currentActiveObject &&(!isNotTagArea(currentActiveObject) || (currentActiveObject.name == "mainInfiniteRect")))
	{
		currentActiveObject = 0;
	}
	
	if(currentActiveObject && currentActiveObject==activeObject && animationSpeed)
	{
		activeObject.animateSpeed = animationSpeed;
		animationSpeed = 0;
	}
	else if(!currentActiveObject && animationSpeed) 
	{
		//activeObject.animateSpeed = animationSpeed;
		mainFabricCanvas.forEachObject(function(obj) 
		{
			if(obj.name != "mainInfiniteRect" && isNotTagArea(obj)) //Only for inserted object
			{
				obj.animateSpeed = animationSpeed;
			}
		});
		animationSpeed = 0;
	}
	activeObject.setAngle(curAngle - activeObject.animateSpeed);			
}

function animateLinear(obj)
{
	//if(obj &&obj.isSlideObj)
	//return;
	//console.log("linear animation");
	var activeObject, activeObject1;
	animateLinearStatus=1;
	if(obj) {
		//console.log("linear animation" +obj.type);
	activeObject = obj;}
	else
	activeObject = mainFabricCanvas.getActiveObject();
	//if(activeObject &&activeObject.isSlideObj)
	//return;
	activeObject.isLinear=1;
	if(activeObject.isFrame)
	{	
		activeObject = makeArrayOfFrameObjs(activeObject);
		frameUnderAnimation = activeObject;
		mainFabricCanvas.setActiveObject(activeObject);
	} 			
	/*else if(activeObject.pathset)
	{
		for ( var i=0; i< objectsToPathArray.length; i=i+3)
		{
			if( activeObject == objectsToPathArray[i])
			{
				objectsToPathArray[i].isLinear=1;
				objectsToPathArray[i].linearSpeed = 1; //Default Speed
				animateLeft(objectsToPathArray[i],0,1);	//Start from xDirection as Left and yDirection as Up
				animateLeft(objectsToPathArray[i+1],0,1);	//Start from xDirection as Left and yDirection as Up
				animateLeft(objectsToPathArray[i+2],0,1);	//Start from xDirection as Left and yDirection as Up
				break;
			}
		}
	}*/
	else if(activeObject.pathset)
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

	activeObject.linearSpeed = 1; //Default Speed
	activeObject.animating = 0;
	animateLeft(activeObject,0,1);	//Start from xDirection as Left and yDirection as Up
	}
}

function animateLeft(activeObject,xdirection,ydirection)
{
	var leftLoc;
	var leftPt;
	var topPt;
	currCanvasWidth = mainFabricCanvas.getWidth();
	currCanvasheight = mainFabricCanvas.getHeight();
	
	if(animateLinearStatus==0) {
		activeObject.isLinear=0;
		clearTimeout(activeObject.timeOutVarLiner);
		return;		
	}
		
	leftPt = activeObject.getLeft();
	topPt = activeObject.getTop();
	
	//direction: 1->Right/up, 0->Left/down
	if(leftPt <= (currCanvasWidth*0.1))
	{
		leftPt = currCanvasWidth*0.15;
		xdirection = 1;
		if(ydirection)
			topPt = topPt - 10;	
		else
			topPt = topPt + 10;
		
		if(topPt<=currCanvasheight*0.2)
		{
			topPt = currCanvasheight*0.2;
			ydirection = 0;
		}		
	}
	else if(leftPt>=currCanvasWidth*0.95)
	{
		leftPt = currCanvasWidth*0.9;
		xdirection = 0;
		if(ydirection)
			topPt = topPt - 10;	
		else
			topPt = topPt + 10;
			
		if(topPt>=currCanvasheight*0.85)
		{
			topPt = currCanvasheight*0.85;
			ydirection = 1;
		}	
	}
	
	
	if(xdirection)	
		leftPt = leftPt+10;
	else
		leftPt = leftPt-10;		
		
	activeObject.setLeft(leftPt);
	activeObject.setTop(topPt);
	
	activeObject.timeOutVarLiner = setTimeout(function animateL() {
  						animateLeft(activeObject,xdirection,ydirection);
  						customRenderAll();
  						//setTimeout(animateR, 1);
						}, activeObject.linearSpeed);	
		
// 		
	/*activeObject.animate('left', leftLoc, {
    duration: linearSpeed,
    onChange: customRenderAll.bind(mainFabricCanvas),//{},//activeObject.setTop=700,//function() { animateTop(); },
    onComplete: function() { animateTop(activeObject); }//{}//customRenderAll.bind(mainFabricCanvas)//,{}
	});*/
}

function animateTop(activeObject)
{
	var topLoc;	
	var topPt = activeObject.getTop();
	if(topPt == 100)
		topLoc = 700;
	else
		topLoc = 100;
	
	if(animateLinearStatus==0)
		return;			
	
	activeObject.animate('top', topLoc, {
    duration: linearSpeed,
    onChange: mainFabricCanvas.renderAll.bind(mainFabricCanvas),
    onComplete: function() {animateLeft(activeObject);}
  });
}

function drawAnimationThread()
{	
	for(loopId=0;loopId<index;loopId++)
     {
    	activeObjectMulti = ObjId[loopId];
    	x0 = StoreX0[loopId];
    	y0 = StoreY0[loopId];
    	animateCurvyXMulti(animateConstFactor,animateVar,animateEqConst);
    	animateVar = animateVar+(Math.PI/animateEqConst)/animateConstFactor;
  	 }
  	 
  	 if(animateAbstractMultiStatus==0)
  	 {
  	 	clearInterval(animationThreadHandle);
  	 	animationThreadHandle = null;
  	 }
}

function animateCurvyMulti()
{
	mainFabricCanvas.forEachObject(function(obj) {
		if (obj.name != "mainInfiniteRect" && obj.name != "tags")
		{	
			ObjId[index] = obj;
			StoreX0[index] = obj.getLeft();
			StoreY0[index] = obj.getTop();
			index = index+1;		
		}
	});
	
	animateAbstractMultiStatus=1;
			
    if(!animationThreadHandle) //Create if not running
		animationThreadHandle = setInterval(drawAnimationThread, 1);
}

function animateCurvyXMulti(animateConstFactor,animateVar,animateEqConst)
{
	var leftpt = 1.5*Math.sin(animateConstFactor*animateVar);
	var leftLoc = x0+leftpt;
			
	activeObjectMulti.animate('left', leftLoc, {
    duration: 1,
    onChange: mainFabricCanvas.renderAll.bind(mainFabricCanvas),//{},//activeObject.setTop=700,//function() { animateTop(); },
    onComplete: function() { animateCurvyYMulti(animateConstFactor,animateVar,animateEqConst); }//{}//mainFabricCanvas.renderAll.bind(mainFabricCanvas)//,{}
	});
}

function animateCurvyYMulti(animateConstFactor,animateVar,animateEqConst)
{		
	var topPt = 0.2*Math.sin((animateConstFactor+1)*animateVar);
	var topLoc = y0-topPt;
	
	activeObjectMulti.animate('top', topLoc, {
    duration: 1,
    onChange: mainFabricCanvas.renderAll.bind(mainFabricCanvas),
    onComplete: function() {}
	});
}

function animateCurvy()
{
  	var constFactor=500;
  	var varFactor=0;
    	var groupAnimate = new Array(3);
	var activeObject1;
	var activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject.isFrame)
	{	
		activeObject = makeArrayOfFrameObjs(activeObject);
		frameUnderAnimation = activeObject;
		mainFabricCanvas.setActiveObject(activeObject);
	}	
	else if(activeObject.pathset)
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
	x0 = activeObject.getLeft();
	y0 = activeObject.getTop();
	animateAbstractSingleStatus=1;
	animateCurvyX(activeObject,animateConstFactor,varFactor,constFactor);
	}
}

function animateCurvyX(activeObject, animateConstFactor,varFactor,constFactor)
{
	//var activeObject = mainFabricCanvas.getActiveObject();
	var leftpt = 400*Math.sin(animateConstFactor*varFactor);
	var leftLoc = x0+leftpt;
	
	if(animateAbstractSingleStatus==0)
		return;	
				
	activeObject.animate('left', leftLoc, {
    duration: 1,
    onChange: mainFabricCanvas.renderAll.bind(mainFabricCanvas),//{},//activeObject.setTop=700,//function() { animateTop(); },
    onComplete: function() { animateCurvyY(activeObject, animateConstFactor,varFactor,constFactor); }//{}//mainFabricCanvas.renderAll.bind(mainFabricCanvas)//,{}
	});
}

function animateCurvyY(activeObject, animateConstFactor,varFactor,constFactor)
{		
	//var activeObject = mainFabricCanvas.getActiveObject();
	var topPt = 250*Math.sin((animateConstFactor+1)*varFactor);
	var topLoc = y0-topPt;
	
	varFactor = varFactor + 1 /constFactor;
	if(animateAbstractSingleStatus==0)
		return;	
	activeObject.animate('top', topLoc, {
    duration: 1,
    onChange: mainFabricCanvas.renderAll.bind(mainFabricCanvas),
    onComplete: function() {animateCurvyX(activeObject, animateConstFactor,varFactor,constFactor);}
	});
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}		

function animateZoom(obj1)
{
	var obj;
	animateZoomStatus = 1;
	if(obj1)
		obj = obj1;
	else
		obj = mainFabricCanvas.getActiveObject();
	//if(activeObject &&activeObject.isSlideObj)
	//return;
	if(obj.hasControls != false) {
		obj.isZoom = true;
		if(obj.isFrame)
		{	
			if(obj.child.length)
			{
				obj = makeArrayOfFrameObjs(obj);
				frameUnderAnimation = obj;
				mainFabricCanvas.setActiveObject(obj);
			}
		}	
		obj.zoomSpeed = 50;
		obj.zoomFactorOrig = 1.6;
		obj.zoomFactorTemp = 1.1;
		obj.isZoom=1;		
		obj.animating = 1;
		animateZoomIn(obj);
	}
}

function animateZoomIn(obj) 
{	
	if(animateZoomStatus==0) {
		obj.isZoom=0;
		clearTimeout(obj.timeOutVar);
		return;
	}
		
	var tagsubstring;
	var mouseCurPosX;
	var mouseCurPosY;
	var maxCurPosX;
	var maxCurPosY;
	var maxObjLeft ;
	var maxObjtop;
	mouseCurPosX = obj.getLeft();
	mouseCurPosY = obj.getTop();
	
	if(obj.name)
	{
		var tempName = obj.name;
		tagsubstring = tempName.substring(0,4);
	}
	
	if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
	{
		if (obj.scaleX == obj.scaleY)
		{	
			obj.scale(roundNumber((obj.scaleX + 0.01),2));
			

		}
		else
		{
			obj.set('scaleX', roundNumber((obj.scaleX + 0.01),2));
			obj.set('scaleY', roundNumber((obj.scaleY + 0.01),2));
		}
	}	
	if (tagsubstring != "TAG_" && obj.name != "tags")
	{	
		obj.setLeft((obj.getLeft() * obj.zoomFactorTemp) - ((obj.zoomFactorTemp - 1) * mouseCurPosX));
		obj.setTop((obj.getTop() * obj.zoomFactorTemp) - ((obj.zoomFactorTemp - 1) * mouseCurPosY)).setCoords();
	}
	obj.zoomFactorTemp = obj.zoomFactorTemp + 0.01;
	obj.zoomFactorTemp = roundNumber(obj.zoomFactorTemp,2);	
	if(obj.zoomFactorTemp<=obj.zoomFactorOrig) {
		obj.timeOutVar = setTimeout(function zoomInObjMore(){ animateZoomIn(obj);customRenderAll(); }, obj.zoomSpeed);		
	} else {
		clearTimeout(obj.timeOutVar);
		obj.zoomFactorForOut = obj.zoomFactorTemp - 0.015;
		obj.zoomFactorTemp = roundNumber(obj.zoomFactorForOut,2);
		timeOutVar = setTimeout(function zoomOutObj(){ animateZoomOut(obj);customRenderAll(); },obj.zoomSpeed);
	}	
}
function animateZoomOut(obj)
{	
	if(animateZoomStatus==0) {
		clearTimeout(obj.timeOutVar);
		return;
	}
	var tagsubstring;
	var mouseCurPosX;
	var mouseCurPosY;
	var maxCurPosX;
	var maxCurPosY;
	mouseCurPosX = obj.getLeft();
	mouseCurPosY = obj.getTop();	
	if(obj.name)
	{
		var tempName = obj.name;
		tagsubstring = tempName.substring(0,4);
	}
	
	if (tagsubstring != "TAG_" && obj.name != "tags" && obj.name != "mainInfiniteRect")
	{
		if (obj.scaleX == obj.scaleY)
		{											
			obj.scale(roundNumber((obj.scaleX - 0.01),2));
		}
		else
		{
			obj.set('scaleX', roundNumber((obj.scaleX - 0.01),2));
			obj.set('scaleY', roundNumber((obj.scaleY - 0.01),2));		
		}
	}	
	if (tagsubstring != "TAG_" && obj.name != "tags")
	{	
		obj.setLeft((obj.getLeft() / obj.zoomFactorForOut)+ ((1 - 1/obj.zoomFactorForOut) * mouseCurPosX));
		obj.setTop((obj.getTop() / obj.zoomFactorForOut)+ ((1 - 1/obj.zoomFactorForOut) * mouseCurPosY)).setCoords();
	}	
	obj.zoomFactorForOut = obj.zoomFactorForOut - 0.01;
	obj.zoomFactorForOut = roundNumber(obj.zoomFactorForOut,2);
	if(obj.zoomFactorForOut>=1.1) {
		obj.timeOutVar = setTimeout(function zoomOutObjMore(){animateZoomOut(obj);customRenderAll(); },obj.zoomSpeed);
	} else {
		clearTimeout(obj.timeOutVar);
		obj.zoomFactorTemp = 1.1;			
		obj.timeOutVar = setTimeout(function zoomInObj(){animateZoomIn(obj);customRenderAll(); }, obj.zoomSpeed);
	}	
}
var objection=null;

function cameraAnimationObject(options)
{
	if(!options)
	{
		objection = mainFabricCanvas.getActiveObject();
	} else {
		objection = options;
	}
	if(objection.name =="mainInfiniteRect" || objection.name =="tags")
		return;
	else if(objection.name)
	{
		if(objection.name.substring(0,4) =="TAG_")
		return;
	}	
	if( window.preziTimer )
	{
		clearInterval(window.preziTimer);
		window.preziTimer=0;
	}

	var obj = objection;
	var centerX = mainFabricCanvas.getWidth()/2; 
	var centerY = mainFabricCanvas.getHeight()/2;//500 500

	var currWidth = obj.width * obj.scaleX;
	var currHeight = obj.height * obj.scaleY;

		var currAngle = obj.getAngle();//rotation
		var viewSize=650;
		if(obj && (obj.type == 'text')) 
		{
			viewSize=850;
		}	
		if(obj && obj.isFrame) 
		{
			viewSize=1250;
		}	
		if(objection && objection.frameName == 'Frame3D')
		{
		viewSize=950;
		//var tempCF = canvasScaleFactor;
		currAngle = currAngle - 27;
		//currWidth = 500;
		//currHeight = 500;	
		/* if(tempCF==1)
		{
		userDefinedMotion(objection);
			return;
		} */
		//zoomF = 1/tempCF;
		}
		var zoomF = (viewSize) / currWidth ;
		if( zoomF >= (viewSize) / currHeight)
			zoomF = (viewSize) / currHeight;


		var tempZoomF = roundNumber(zoomF,10);
		if(tempZoomF == 1)
		{
			zoomF = 0.80;
		}
		if(objection && objection.xPath)
		{
			var tempCF = canvasScaleFactor;
			if(tempCF==1)
			{
				userDefinedMotion(objection);
				return;
			}
			
			zoomF = 1/tempCF;
			
		}
		if(!linearSpeed)
			linearSpeed=0;
		steps = 50+((linearSpeed)*20);
		stepZoom = Math.pow( zoomF , 1 / steps );
		//alert(linearSpeed);
		stepRotate = Math.abs( currAngle ) / steps;//rotation

		{
			var packet = new Object();
			packet.zoom = zoomF;
			packet.mouseX = (( zoomF * obj.getLeft() ) - centerX) / ( zoomF - 1);	
			packet.mouseY = (( zoomF * obj.getTop() ) - centerY) / ( zoomF - 1);
			packet.sender = true;
			
			packet.zoom = stepZoom;
			globalSteps = 0;
			window.preziTimer = window.setInterval(function (object) {
			//console.log("linearSpeed "+ steps);
				if(stepRotate)
				if(stepRotate!=0) 
				{
					if(lastMouseDownPos != undefined)
					{
						lastMouseDownPos.x =  objection.getLeft() ;
						lastMouseDownPos.y =  objection.getTop() ;
					}
					if( currAngle > 0)
						rotateCanvasAntiClockwise(stepRotate);
					else
						rotateCanvasClockwise(stepRotate);
				}
				handleMouseWheelEvent(100, packet);
				if(steps)
				{
					globalSteps++;
					if( globalSteps >= steps)
					{
						globalSteps = 0;
						clearInterval(window.preziTimer);
						window.preziTimer=0;
						if(objection && objection.xPath)
						{
							userDefinedMotion(objection);
						}
					}
				}
				else
				{
						globalSteps = 0;
						clearInterval(window.preziTimer);
						window.preziTimer=0;				
				}
			} , 1);
		}
	}

function startPathAnimation()
{
	if(window.pathAnimationTimer)
	{
		clearInterval(window.pathAnimationTimer);
		window.pathAnimationTimer=0;
	}	
	var i=0;
	if( (pauseClicked && objection) )
	{
		if(pauseClickedWhileUDF==1)
		{
			userDefinedMotion(objection);
			userDefPathIndex=0;
			pauseClickedWhileUDF=0;
		}
		else
		{
			cameraAnimationObject(objection);
		}
		i=objectUnderAnimation;
		i++;
		pauseClicked=0;
		objectUnderAnimation=null;
	} else {
		for(i=0;i<objectsOnPathArray.length;i++)
		{
			if(objectsOnPathArray[i]) {
				objectUnderAnimation=i;
				cameraAnimationObject(objectsOnPathArray[i]);				
				i++;
				break;
			}
		}
	}
	var statTimer=2000;
	window.pathAnimationTimer = window.setInterval(function (object) {
		
		if((window.preziTimer==0 || window.preziTimer==null) && ( window.userPath==0 || window.userPath==null) )
		{
			while(1)
			{
				if(objectsOnPathArray[i]) {
					objectUnderAnimation=i;
					cameraAnimationObject(objectsOnPathArray[i]);
					i++;
					break;
				} else {
					i++;
				}
			}
		}
		if(i==objectsOnPathArray.length)
		{
			clearInterval(window.pathAnimationTimer);
			window.pathAnimationTimer=0;
		}
	} , statTimer);
}


function nextPathAnimation()
{
	if( window.preziTimer )
	{
		clearInterval(window.preziTimer);
		window.preziTimer=0;
	}
	pathObjectCounter++;
	while(1)
	{
		if(objectsOnPathArray[pathObjectCounter])
		{
			cameraAnimationObject(objectsOnPathArray[pathObjectCounter]);
			//lastSlideShowed=pathObjectCounter;
			//pathObjectCounter++;
			slideShowed++;			
			break;
		} else {
				pathObjectCounter++;
		}		
	}
	
			if(slideShowed>1)
			{
				target = document.getElementById('slideShowLast');
				document.getElementById('slideShowLast').disabled = false;		
			}		
			if(slideShowed==slideCount)
			{
				target = document.getElementById('slideShowNext');
				document.getElementById('slideShowNext').disabled = true;
				target.src = 'resources/next_disabled.png';	
				//pathObjectCounter=pathObjectCounter-1;
				//document.getElementById('slideShowNext').onclick=null;
				//break;
				
			}	
}

function lastPathAnimation()
{
	if( window.preziTimer )
	{
		clearInterval(window.preziTimer);
		window.preziTimer=0;
	}
	if(pathObjectCounter>0)
	pathObjectCounter--;
	while(1)
	{
		if(objectsOnPathArray[pathObjectCounter])
		{
			cameraAnimationObject(objectsOnPathArray[pathObjectCounter]);
			//pathObjectCounter--;
			slideShowed--;
			target = document.getElementById('slideShowNext');
			document.getElementById('slideShowNext').disabled = false;				
			break;
		} else {	
				pathObjectCounter--;			
		}
	}
				
	//document.getElementById('slideShowNext').onclick=nextPathAnimation();
	if(slideShowed==1)
	{
		target = document.getElementById('slideShowLast');
		document.getElementById('slideShowLast').disabled = true;
		//pathObjectCounter=pathObjectCounter+1;	
	}
}

function pausePathAnimation()
{
	clearInterval(window.pathAnimationTimer);
	window.pathAnimationTimer=0;

	clearInterval(window.preziTimer);
	window.preziTimer=0;	
	
	if(window.userPath)
		pauseClickedWhileUDF=1;
	clearInterval(window.userPath);
	window.userPath=0;	
	//alert(pauseClickedWhileUDF);
	pauseClicked=1;
}

var userPath=null;
function userDefinedMotion(options)
{
	if(!options)
	{
		var activeObject = mainFabricCanvas.getActiveObject();
	} else 
	{
		var activeObject=options;
	}
	if(activeObject.isSlideObj)
		return;	
	if( window.userPath )
	{
		clearInterval(window.userPath);
		window.userPath=0;
	}	
	if(activeObject && activeObject.xPath)
	{
	
		if(activeObject.isFrame)
		{
			if(activeObject.child.length)
			{
				var tempXPath = activeObject.xPath;
				var tempYPath = activeObject.yPath;
				activeObject = makeArrayOfFrameObjs(activeObject);
				activeObject.xPath = tempXPath;
				activeObject.yPath = tempYPath;
				frameUnderAnimation = activeObject;
				//activeObject.setAngle(1);
				//activeObject.animateSpeed = 1;
				mainFabricCanvas.setActiveObject(activeObject);
			}
		}	
		if(!activeObject.linearSpeed)
			activeObject.linearSpeed = 33;
			
		var x = activeObject.xPath.length;
		var y =activeObject.yPath.length;
		//alert(x);
		//alert(y);
		if(pauseClickedWhileUDF==0)
			var i =0;
		else 
			var i= userDefPathIndex;

	/*	var zoomF = (2) / 1 ;
		if( zoomF >= (2) / 1)
			zoomF = (2) / 1;


		var tempZoomF = roundNumber(zoomF,10);
		if(tempZoomF == 1)
		{
			zoomF = 0.80;
		}
		
		steps = 50+((linearSpeed)*20);
		stepZoom = Math.pow( zoomF , 1 / x );
		alert(stepZoom);
		var packet = new Object();
		packet.sender = true;			
		packet.zoom = stepZoom;	
*/

		
		window.userPath = window.setInterval(function (object) {
			if(activeObject.linearSpeed==0)
				activeObject.linearSpeed=1;
			//activeObject.linearSpeed=activeObject.linearSpeed*6;	
		//	packet.mouseX = activeObject.xPath[i];//(( zoomF * obj.getLeft() ) - centerX) / ( zoomF - 1);	
		//	packet.mouseY = activeObject.yPath[i];//(( zoomF * obj.getTop() ) - centerY) / ( zoomF - 1);			
		//	console.log(activeObject.linearSpeed);
		//	handleMouseWheelEvent(100, packet);
			activeObject.setLeft(activeObject.xPath[i]);
			activeObject.setTop(activeObject.yPath[i]).setCoords();
			//if(i==0)
			//	//animateZoom();
			
			
					
			i++;
			userDefPathIndex=i;
			customRenderAll();
			if(i==x)
			{
				clearInterval(window.userPath);
				window.userPath=0;
				applyAnimation("stopAnimation");
				if(frameUnderAnimation)
					UnGroup(frameUnderAnimation);
			}
		} ,40); //(activeObject.linearSpeed*20)
	}
}