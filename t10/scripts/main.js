var restoreExecuted;
var objectUnderuserPathDefMouse=0;
var newObjArray = new Array(100);
var mainFabricCanvas = null;
var mainInfiniteRect = null;
var mouseCurPos = new Object();
var xDist;
var yDist;
var capturedObj; // For tag-it feature
var fillColor = 'rgb(0,0,0)';
var strokeColor = 'rgb(0,0,0)';
var insertTop = 200;
var insertLeft = 100;
var insertIncrement = 100;
var lastRenderTime = new Date();
var clipboardobj = null;
var cutset = false;
var fps = 0;                            //how many frames per second are calculated.
var lastFrameTime = new Date();         //time of the last frame
var timeDelta = .001;                      //milliseconds since the last frame
var timeDeltaS = .1;                     //seconds since the last frame
var currentSecond = 0;					
var framesThisSecond = 0;
var timeDeltaSinceLastFrame = 0;
var timeFpsDisplayLastChanged = 0;
var fpsDisplayUpdateFrequency = 500;
var frames = 0;
var displayedFps = 0;
var fpsResetTime = new Date();
var meterPercent = -1;
var meterPercentGoal = -1;
var ccc ;
var grouparray = new Array();
var objectsToGroup = new Array();


var texturedCubeObjArray = new Array;
var objectsToTexturedCube = new Array();
var texturedCubeCount = 0;


var grouparr = new Array();
var objectsOnPathArrayarr = new Array();
var objectsToPathArray = new Array();
var grouparray ;
var finishGroupClicked=0;
var listOfGroups = new Array();
var prvLength=0;
var prvLengthPath=0;
var newGroup=0;
var newtexturedCube = 0;
var newPath=0;
var pathCount = 0;
var newFpsResetTime = new Date();
//var kill;
var infiniteBaseLeft;
var infiniteBaseTop;
var frameLeft;
var frameTop;
var temp;
var temp1;
var frameUnderCut;
var frameUnderCopy;
var counter = 0;
var isSet = false;
function calcFPS() {
		var now = new Date();
		//console.log("Demo is running at 1 " + fps + " FPS");
		/*	Calculate time delta since last time this method was called ---------*/
		timeDeltaSinceLastFrame = timeDelta;
		if (lastFrameTime != 0) 
			timeDeltaSinceLastFrame = now - lastFrameTime;

		//timeDeltaS = timeDeltaSinceLastFrame / 1000;
		lastFrameTime = now;

		/*	Calculate frame rate, since last time this method was called ---------*/
		if (now.getSeconds() == currentSecond) {
			framesThisSecond++;
		}
		else {
			currentSecond = now.getSeconds();
			fps = framesThisSecond;
			framesThisSecond = 1;

		var timingDelayReached = ((now.getTime() - timeFpsDisplayLastChanged) > fpsDisplayUpdateFrequency);
		var fpsNotChangedYet = (timeFpsDisplayLastChanged == 0);

		if (timingDelayReached || fpsNotChangedYet) {
			timeFpsDisplayLastChanged = now.getTime();
			//displayedFps = (this.fps > 60 ? 60 : this.fps);
			displayedFps = fps;
			newFpsResetTime = new Date();
			//document.getElementById('fps').value = fps;
			//console.log("Demo is running at " + fps + " FPS");
		}
		}	
		var diff = now - fpsResetTime;
		if ((now - fpsResetTime < 1000)) {
			frames++;
			// calculate frames live
			fps = Math.round((frames / ((now - fpsResetTime) / 1000)));
			displayedFps = fps;
			newFpsResetTime = new Date();	
			//document.getElementById('fps').value = fps;			
		} else {
			fpsResetTime = new Date();
			frames = 0;		
		}
}
var translatedone = 0;
function drawFPS(displayedFps1){
		//var ccc = mainFabricCanvas.contextTop;
		if( document.getElementById('fpsmeter'))
		{
			var canvas = document.getElementById('fpsmeter');
			ccc = canvas.getContext("2d");
			//ccc=mainFabricCanvas.contextTop;
			/*if(translatedone<=500)
				{
					ccc.translate(0,1);
					translatedone++;
				}
				else
				{
					if(translatedone>500 && translatedone<=1000)
					{
						ccc.translate(0,-1);
						translatedone++;
					}
					else
						translatedone = 0;
				}*/
				ccc.translate(0,0);
			//-----draw the FPS-o-meter--------------------------------------------------------------------------------------------
			ccc.clearRect(0, 0, 110, 110);

			//draw translucent background
			ccc.save();
			ccc.beginPath();
			ccc.fillStyle = "rgba(75,175,225,.75)";

			try {
			ccc.fillStyle = this.CssRule("#infoPanel").style.backgroundColor;
			} 
			catch (e) {
			// unable to load color from stylesheet
			}
			//this.globalAlpha = .9;
			ccc.arc(55, 55, 50, Math.PI, Math.PI * 2, false);
			ccc.fill();
			ccc.restore();

			//draw meter
			//displayedFps = 25;
			if (displayedFps1 >= 0) {
				meterPercentGoal = (displayedFps1 > 60 ? 60 : displayedFps1) / 60; //a maximum of 60fps are drawn so cap the gauge at 60fps.
				if (meterPercent == -1) {
				meterPercent = .01;
				}

			var delta = Math.abs(meterPercent - meterPercentGoal);

			if (meterPercent < meterPercentGoal) {

				if (1) {
					meterPercent *= 1 + delta / 3;
					if (meterPercent > meterPercentGoal) {
					meterPercent = meterPercentGoal;
				}
				}
				else {
					meterPercent = meterPercentGoal;
				}
			}
			else {
				if (meterPercent > meterPercentGoal) {
					if (0) {
						meterPercent *= 1 - delta;
					
						if (meterPercent < meterPercentGoal) {
							meterPercent = meterPercentGoal;
						}
					}
					else {
						meterPercent = meterPercentGoal;
					}
				}
			}
			}


			var lingrad = ccc.createLinearGradient(0, 55, 100, -45);
			lingrad.addColorStop(0, "rgb(255,0,0)");
			lingrad.addColorStop(Math.ceil((.75 - meterPercent) * 100) / 100 < 0 ? 0 : Math.ceil((.75 - meterPercent) * 100) / 100, "rgba(255,255,0,.9)");
			lingrad.addColorStop(1, "rgb(0,128,0)");
			ccc.fillStyle = lingrad;
			ccc.beginPath();
			ccc.arc(55, 55, 50, Math.PI, Math.PI + Math.PI*meterPercent , false);
			//ccc.strokeStyle = "blue";
			ccc.fill();
			ccc.arc(55, 55, 18, Math.PI + Math.PI*meterPercent , Math.PI, true);
			ccc.lineTo(5, 55);
			ccc.strokeStyle = "black";
			ccc.fill();
			ccc.restore();

			//line
			ccc.save();
			ccc.beginPath();
			ccc.moveTo(5, 55);
			ccc.lineWidth = 1;
			ccc.lineTo(37, 55);
			ccc.arc(55, 55, 18, Math.PI, Math.PI * 2, false);
			ccc.lineTo(105, 55);
			ccc.globalAlpha = .5;
			ccc.strokeStyle = "black";
			ccc.fillStyle = "black";

			try {
			ccc.fillStyle = this.CssRule("#fpsometer").style.backgroundColor;
			} 
			catch (e) {
			// unable to load color from stylesheet
			}

			ccc.stroke();
			this.globalAlpha = 1;
			ccc.fill();

			ccc.beginPath();
			ccc.moveTo(37, 55);
			ccc.lineWidth = 1;

			ccc.arc(55, 55, 18, Math.PI, Math.PI * 2, false);
			ccc.lineTo(37, 55);
			ccc.strokeStyle = "white";

			ccc.fillStyle = "black";
			//ccc.fill();
			//ccc.stroke();
			ccc.restore();
			//line
			// Needle
			if (meterPercent != -1) {
				ccc.save();
				ccc.lineCap = "round";
				ccc.lineJoin = "round";
				ccc.globalAlpha = .8;
				ccc.beginPath();
				ccc.lineWidth = 4;
				ccc.arc(55, 55, 3, 0, Math.PI * 2, false);
				ccc.moveTo(55, 55);

				ccc.lineTo(55 + 50 * -Math.cos(Math.PI * meterPercent), 55 + 50 * -Math.sin(Math.PI * meterPercent));
				ccc.strokeStyle = "white";
				ccc.stroke();
				ccc.restore();
			}
			//draw fps
			ccc.save();
			ccc.fillStyle = "black";
			ccc.globalAlpha = .5;
			ccc.font = "bold 15px arial";

			//var fpsString = this.displayedFps+" FPS";
			var fpsString = "";
			var displayedFps2 = Math.round((meterPercent * 60));
			if (meterPercent >= 0) {
				fpsString = displayedFps2 + " FPS";
			}
			this.meterFps = displayedFps2;
			var textSize = ccc.measureText(fpsString)
			var x = ccc.canvas.width / 2 - textSize.width / 2;
			var y = ccc.canvas.height / 2;

			ccc.fillText(fpsString, 50, 50);
			//console.log("fpsString " + fpsString );
			ccc.restore();		
	}
}	

function updateInsertTopLeft()
{
	if(dragDragon)
	{
		return;
	}
	try{
		var viewPortEmpty = true;
		insertLeft = 0;
		insertTop = 0;
		mainFabricCanvas.forEachObject(function(obj) {
			if(isNotTagArea(obj) && obj.name != "mainInfiniteRect" && obj.getLeft() >0 &&  obj.getLeft() <= mainFabricCanvas.getWidth())
			{
				viewPortEmpty = false;
				
				if (obj.getLeft() > insertLeft)
					insertLeft = obj.getLeft();
				if (obj.getTop() > insertTop)
					insertTop = obj.getTop();
			}
		});
		
		if(viewPortEmpty)
		{
			insertLeft = 100;
			insertTop = 200;
		}	
		else
		{
			insertLeft = insertLeft + insertIncrement;
			insertTop = insertTop + insertIncrement/25;
		}
	}
	catch(e){
		alert(e.message);
	}		
}

function transperencySliderOnChange()
{
	var activeObject = mainFabricCanvas.getActiveObject();
    var activeGroup = mainFabricCanvas.getActiveGroup();

	if (activeObject || activeGroup) 
	{
    	(activeObject || activeGroup).setOpacity(document.getElementById('TransperencySlider').value);
		customRenderAll();
	}	
}

function fontSizeSliderOnChange()
{
	var activeObject = mainFabricCanvas.getActiveObject();

	if(activeObject && (activeObject.type == 'text')) 
	{
    	activeObject.setFontsize(document.getElementById('FontSizeSlider').value);
		customRenderAll();
	}	
}

function fillColorSelectorOnChange()
{
	var activeObject = mainFabricCanvas.getActiveObject();
    var activeGroup = mainFabricCanvas.getActiveGroup();
    
	if(activeObject && (activeObject.name == "mainInfiniteRect"))
		return;

	if (activeObject || activeGroup)
	{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;

    	(activeObject || activeGroup).set('fill', fillColor);
		customRenderAll();
	}	
}

function strokeColorSelectorOnChange()
{
	if(mainFabricCanvas.isDrawingMode == true)
		mainFabricCanvas.freeDrawingColor = document.getElementById('StrokeColorSelector').value;
	
	var activeObject = mainFabricCanvas.getActiveObject();
    var activeGroup = mainFabricCanvas.getActiveGroup();
    
	if(activeObject && (activeObject.name == "mainInfiniteRect"))
		return;

	if (activeObject || activeGroup)
	{
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;

    	(activeObject || activeGroup).set('stroke', strokeColor);
		customRenderAll();
	}	
}

function strokeWidthOnChange()
{
	if(mainFabricCanvas.isDrawingMode == true)
		mainFabricCanvas.freeDrawingLineWidth = document.getElementById('StrokeWidth').value || 1;
		
	var activeObject = mainFabricCanvas.getActiveObject();
    var activeGroup = mainFabricCanvas.getActiveGroup();
    
	if(activeObject && (activeObject.name == "mainInfiniteRect"))
		return;

	if (activeObject || activeGroup)
	{
    	(activeObject || activeGroup).set('strokeWidth', document.getElementById('StrokeWidth').value);
		customRenderAll();
	}	
}

function getArrayOfPathSubset( obj)
{	
	grouparray=[];
	for(var i=0; i < objectsToPathArray.length; i=i+3)
	{
		if( obj == objectsToPathArray[i])
		{
		grouparray.push(objectsToPathArray[i]);
		grouparray.push(objectsToPathArray[i+1]);
		grouparray.push(objectsToPathArray[i+2]);
		break;
		}
	}
		return grouparray;
}

function getArrayOfPathSubsetAnimation( obj)
{	
	var grouparrayAnimation = new Array();
	for(var i=0; i < objectsToPathArray.length; i=i+3)
	{
		if( obj == objectsToPathArray[i])
		{
		grouparrayAnimation.push(objectsToPathArray[i]);
		grouparrayAnimation.push(objectsToPathArray[i+1]);
		grouparrayAnimation.push(objectsToPathArray[i+2]);
		break;
		}
	}
		return grouparrayAnimation;
}

function showSave(event)
{
		var dialog = document.getElementById('saveRestore');
						
		centerX = event.clientX ;
		centerY = event.clientY - 150;

		dialog.style.left = centerX + 'px';
		dialog.style.top = centerY + 'px';
			
		if(dialog.style.display == 'none')
			dialog.style.display = 'block';

		target = document.getElementById('savefile');
		target.style.display = 'block';
		target = document.getElementById('saveform');
		target.style.display = 'block';
		target = document.getElementById('restoreWrite');
		target.style.display = 'none';
}


function hideForm()
{
document.getElementById('saveRestore').style.display = 'none';
}

function showRestore()
{
			var dialog = document.getElementById('saveRestore');

			centerX = event.clientX ;
			centerY = event.clientY - 150;
			
			dialog.style.left = centerX + 'px';
			dialog.style.top = centerY + 'px';
			
			if(dialog.style.display == 'none')
				dialog.style.display = 'block';
			
		target = document.getElementById('restoreWrite');
		target.style.display = 'block';
		target = document.getElementById('savefile');
		target.style.display = 'none';
		target = document.getElementById('saveform');
		target.style.display = 'none';
}		
		
function onLoad()
{	
	try{
		documentBodyElement = document.body; 
		documentBodyElement.ARLFullScreen = false;
		
		//Menubar position initilization
		initializeBottomMenuBar();
		
		document.getElementById('MainHTMLCanvas').width = document.getElementById('MainHTMLCanvasArea').scrollWidth;
		document.getElementById('MainHTMLCanvas').height = document.getElementById('MainHTMLCanvasArea').scrollHeight;
		
		document.getElementById('TransperencySlider').addEventListener('change', transperencySliderOnChange, false);
		//document.getElementById('FontSizeSlider').addEventListener('change', fontSizeSliderOnChange, false);
		document.getElementById('FillColorSelector').addEventListener('change', fillColorSelectorOnChange, false);
		document.getElementById('StrokeColorSelector').addEventListener('change', strokeColorSelectorOnChange, false);		
		document.getElementById('StrokeWidth').addEventListener('change', strokeWidthOnChange, false);
		
		document.getElementById('Grayscale').addEventListener('click', applyGrayscale, false);
		document.getElementById('Invert').addEventListener('click', applyInvert, false);
		document.getElementById('Noise').addEventListener('click', applyNoise, false);
		document.getElementById('GradientTransparency').addEventListener('click', applyGradient, false);
		document.getElementById('Sepia').addEventListener('click', applySepia1, false);
		document.getElementById('Sepia2').addEventListener('click', applySepia2, false);
		document.getElementById('Sepia3').addEventListener('click', applySepia3, false);
		document.getElementById('BrightnessSlider').addEventListener('change', applyBrightness, false);
		
		document.getElementById('SVGInput').value = getSample("svg");
		document.getElementById('FrameSVG1').value = getSample('frame1');
		document.getElementById('FrameSVG2').value = getSample('frame2');
		document.getElementById('FrameSVG3').value = getSample('frame3');
		
		target = document.getElementById('CameraSpeed');
		target.style.display = 'none';
		target = document.getElementById('slideShow');
		target.style.display = 'none';	
		target = document.getElementById('slideShowStop');
		target.style.display = 'none';			
		target = document.getElementById('slideShowNext');
		target.disabled = false;
		target.style.display = 'none';	
		target = document.getElementById('slideShowLast');
		target.disabled = true;		
		target.style.display = 'none';			
		mainFabricCanvas = new fabric.Canvas('MainHTMLCanvas');
		
		var img = getSample("image");
		mainInfiniteRect = new fabric.Image(img);
			mainInfiniteRect.set({ 
				left: 0, 
				top: 0,
				width : 10000000,
				height : 10000000,
				scaleY: 1,
				scaleX: 1
			});
			mainInfiniteRect.name = "mainInfiniteRect"; 
			mainInfiniteRect.setOpacity(1);
			mainInfiniteRect._originalImage = img;
			mainInfiniteRect.themicBackground = true;
			
    	mainFabricCanvas.add(mainInfiniteRect);

		//*****************************************grid start********************************************
		if(gridEnable)
		{
			try{	
			var rect12 = new fabric.Rect({
							width: 100,
							height: 100,
							top: 0,
							left: 0});
			rect12.selectable = false;
			rect12.name="superGrid";
			mainFabricCanvas.add(rect12);
			superGrid = rect12;
			}
			catch(ex)
			{
				alert(ex.message);
			}
		}
		
		//*****************************************grid stop*********************************************	
		
		target = document.getElementById('jsonrec');
		target.style.display = 'none';
		target = document.getElementById('savefile');
		target.style.display = 'none';
		target = document.getElementById('recid');
		target.style.display = 'none';
		target = document.getElementById('saveform');		
		target.style.display = 'none';		
		target = document.getElementById('restoreWrite');
		target.style.display = 'none';		
		document.getElementById('MainHTMLCanvas').style.border = "1px solid black";
		
		document.getElementById('CanvasWidth').max = document.getElementById('MainHTMLCanvas').width;
		document.getElementById('CanvasWidth').value = document.getElementById('CanvasWidth').max;
		document.getElementById('CanvasWidth').addEventListener('change', canvasWidthChanged, false);
		
		document.getElementById('CanvasHeight').max = document.getElementById('MainHTMLCanvas').height;
		document.getElementById('CanvasHeight').value = document.getElementById('CanvasHeight').max;
		document.getElementById('CanvasHeight').addEventListener('change', canvasHeightChanged, false);
		
		updateResizeSliderReading();
		fpsInit();
		//For Tag-It feature
		createTagArea();		
		    	
		//Start - Mouse tracking in mainFabricCanvas
		mainFabricCanvas.observe('mouse:move', function(options) {
			var infiniteBase = options.target;
			if(objectUnderuserPathDef && objectUnderuserPathDefMouse && !getPlayMode() )
			{
				//console.log(" mouse:move options.e "+options);
				captureDefiningPath(options.e);
				//return;
			}			
			mouseCurPos = mainFabricCanvas.getPointer(options.e); 	
			//alert("x= " + mouseCurPos.x + "\n" + "y= " + mouseCurPos.y);
	
			
			if(infiniteBase && infiniteBase.name == "mainInfiniteRect")
			{
				mainFabricCanvas.upperCanvasEl.style.cursor = mainFabricCanvas.defaultCursor;
			}
			tagItToggle(options.target);		
		});
		
		mainFabricCanvas.observe('mouse:down', function(options) {
			if(objectUnderuserPathDef  && !getPlayMode() )
			{
				objectUnderuserPathDefMouse = 1;
				objectUnderPathDef = mainFabricCanvas.getActiveObject();	
				if(!objectUnderPathDef.isSlideObj)	
				{
					if(objectUnderPathDef && !objectUnderPathDef.xLen)
					{
						objectUnderPathDef.xLen=1;
						objectUnderPathDef.yLen=1;
						objectUnderPathDef.xPath=[];
						objectUnderPathDef.yPath=[];	
						objectUnderPathDef.xPath[0]=objectUnderPathDef.getLeft();
						objectUnderPathDef.yPath[0]=objectUnderPathDef.getTop();			
					}			
					if(objectUnderPathDef && objectUnderPathDef.xLen && objectUnderPathDef.xLen==1)
					{
						var pointer = mainFabricCanvas.getPointer(options.e);
						mainFabricCanvas.contextTop.beginPath();
						mainFabricCanvas.contextTop.moveTo(objectUnderPathDef.xPath[objectUnderPathDef.xLen-1], objectUnderPathDef.yPath[objectUnderPathDef.xLen-1]);
					}
					else if(prevObjectUnderPathDef!=objectUnderPathDef)
					{
						var pointer = mainFabricCanvas.getPointer(options.e);
						mainFabricCanvas.contextTop.beginPath();
						mainFabricCanvas.contextTop.moveTo(objectUnderPathDef.xPath[objectUnderPathDef.xLen-1], objectUnderPathDef.yPath[objectUnderPathDef.xLen-1]);				
					}
					prevObjectUnderPathDef = objectUnderPathDef;
				}
			} 
			 // StartPath();
			lastMouseDownPos = mainFabricCanvas.getPointer(options.e);
			
			var infiniteBase;
			if(mainFabricCanvas._currentTransform)
				infiniteBase = mainFabricCanvas._currentTransform.target;
			if(!infiniteBase)
				return;
				
			/************************************frame start******************************/
			if((infiniteBase.pathset) || (infiniteBase.isFrame)||(infiniteBase.isLeftCtrl)||(infiniteBase.isRightCtrl)||(infiniteBase.isSlideObj)||(infiniteBase.isShuffle) )
			{		
				frameLeft = infiniteBase.getLeft();
				frameTop = infiniteBase.getTop();
				if((infiniteBase.isFrame))
				{
					
					infiniteBase.child = getArrayOfFrameObjects(infiniteBase);
					if(infiniteBase.isSlideObj)
					{var len=infiniteBase.child.length;
						infiniteBase.child[len]=infiniteBase.ctrl1;
						infiniteBase.child[len+1]=infiniteBase.ctrl2;
						infiniteBase.child[len+2]=infiniteBase.ctrl3;
					}
				}
				else if((infiniteBase.pathset)) {
					grouparray = new Array();
					infiniteBase.child = getArrayOfPathSubset(infiniteBase); 
 				}
				
				else if(infiniteBase.isLeftCtrl||infiniteBase.isRightCtrl )
				{
					if(!getPlayMode())
					{
						prevOrNext(infiniteBase);
						//return;
					}
				}
				else if(infiniteBase.isShuffle)
				{
					shuffle(infiniteBase);
					//return;
				}
				
				xDist = new Array();
				yDist = new Array();
				if(infiniteBase &&  infiniteBase.child && infiniteBase.child.length>0)
				{
					for(var count = 0 ; count < (infiniteBase.child.length); count++)
					{
						obj = infiniteBase.child[count];
						if (obj &&obj.name != "mainInfiniteRect" && isNotTagArea(obj))
						{
							temp1 =true;
							xDist[count] = obj.getLeft() - infiniteBase.getLeft();
							yDist[count] = obj.getTop() - infiniteBase.getTop();
						}
					}
				}
				if((infiniteBase.isFrame)) {
				initialFrameScaleX = frameScaleX = infiniteBase.scaleX;
				initialFrameScaleY = frameScaleY = infiniteBase.scaleY;
				
				initialFrameTheta = frameTheta = infiniteBase.theta;
				}
			}
			/************************************frame/path stop********************************/
			
			//For Tag-It feature
			capturedObj = mainFabricCanvas._currentTransform; // Capture on mouse click
			showTagged();
			
			infiniteBaseLeft = infiniteBase.getLeft();
			infiniteBaseTop = infiniteBase.getTop();
			
			if(infiniteBase.name == "mainInfiniteRect")
			{
				xDist = new Array();
				yDist = new Array();
				var count = 0;
				mainFabricCanvas.forEachObject(function(obj) {
					//alert(obj.name + "-" + obj.getLeft() + "-" + obj.getTop());
					
					if (obj.name != "mainInfiniteRect" && isNotTagArea(obj))
					{
						temp =true;
						obj.distanceX = obj.getLeft() - infiniteBase.getLeft();
						obj.distanceY = obj.getTop() - infiniteBase.getTop();
						
						//console.log(xDist[count] + " <=X Y=> : " + yDist[count]);
						//alert("distX : " + xDist[count] + " distY : " + yDist[count]);
						count= count + 1;
					}
					
				});
			}
			else
			{
				updateImageFilterControls();
			}
		});
		
		mainFabricCanvas.findTarget = (function(originalFn) {
		return function() {
		var target = originalFn.apply(this, arguments);
		if (target) {
			if (this._hoveredTarget !== target) {
				mainFabricCanvas.fire('object:over', { target: target });
			if (this._hoveredTarget) {
				mainFabricCanvas.fire('object:out', { target: this._hoveredTarget });
			}
			this._hoveredTarget = target;
			}
		}
		else if (this._hoveredTarget) {
			mainFabricCanvas.fire('object:out', { target: this._hoveredTarget });
			this._hoveredTarget = null;
		}
		return target;
		};
		})(mainFabricCanvas.findTarget);

		mainFabricCanvas.on('object:over', function(e) {
			var prevStrokeWidth = parseInt(e.target.strokeWidth);
			var newStrokeWidth = prevStrokeWidth + 1;
			e.target.setStrokeWidth(newStrokeWidth);
			/* var context = mainFabricCanvas.getContext();
			context.shadowColor = "#00F";
			context.shadowBlur = 20;
			context.shadowOffsetX = 50;
			context.shadowOffsetY = 50; */
			if(e.target.type == "text")
			{
			e.target.borderColor = "F00";
			e.target.borderOpacityWhenMoving = 0.1;
			//var textX = e.target.getLeft();
			//var textY = e.target.getTop();
			//insertRectangle(textX,textY);
			//document.getElementById("inputText").border = 5;
			//document.getElementById("inputText").borderColor ="000FFF";
			//var prevFontSize = parseInt(e.target.fontSize);
			//var newFontSize = prevFontSize + 2;
			//e.target.setFontsize(newFontSize);
			} 
			//if(e.target.type == "image")
			//{
				//e.target.borderColor = "F00";
				//e.target.borderOpacityWhenMoving = 0.1;
				//e.target.hasBorders = true;
				//e.target.borderColor = "#000FFF";
				//e.target.borderScaleFactor = 10;
				//e.target.borderOpacityWhenMoving = 0.1;
				
				
								
				//e.target.scale(e.target.scaleY * parseFloat(document.getElementById('ZoomFactorSlider').value));
				//e.target.scale(e.target.scaleX * parseFloat(document.getElementById('ZoomFactorSlider').value));
			// /* var prevX = parseInt(e.target.scaleX);
			// var prevY = parseInt(e.target.scaleY);
			// var newX = prevX*1.2;
			// var newY = prevY*1.2; */
			// var prevX = e.target.getWidth();
			// var prevY = e.target.getHeight();
			// var newX = prevX + 20;
			// var newY = prevY + 20;
			// e.target.setWidth(newX);
			// e.target.setHeight(newY);			
			//e.target.scale(newX,newY);
			//}
			//else if(e.target.type == "video")
			//{
				//e.target.scale(e.target.scaleY * parseFloat(document.getElementById('ZoomFactorSlider').value));
				//e.target.scale(e.target.scaleX * parseFloat(document.getElementById('ZoomFactorSlider').value));
			//}
			
			//alert("onm");
			if(e && e.target && e.target.type && e.target.type == "image")
			{
				if(e.target.hasAudio && e.target.hasAudio ==1)
				{
					dispControl(e);
				}
				else if(e.target._element && e.target._element.hasAudio && e.target._element.hasAudio == 1)
				{
					dispControl(e);
				}
			}

			
			mainFabricCanvas.renderAll();
		});

		mainFabricCanvas.on('object:out', function(e) {
			e.target.setStrokeWidth(document.getElementById('StrokeWidth').value);
			/* var context = mainFabricCanvas.getContext();
			//context.shadowColor = "#000";
			//context.shadowBlur = 20;
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0; */
			if(e.target.type == "text" || e.target.type == "image" || e.target.type == "video")
			{
			//var prevFontSize = parseInt(e.target.fontSize);
			//var newFontSize = prevFontSize - 2;
			//e.target.setFontsize(newFontSize);
			}
			//if(e.target.type == "image")
			//{
				//e.target.hasBorders = false;
				//e.target.scale(e.target.scaleX / parseFloat(document.getElementById('ZoomFactorSlider').value));
				//e.target.scale(e.target.scaleY / parseFloat(document.getElementById('ZoomFactorSlider').value));
			// /* var newX = parseInt(e.target.scaleX);
			// var newY = parseInt(e.target.scaleY);
			// e.target.scale(newX,newY); */
			// var prevX = e.target.getWidth();
			// var prevY = e.target.getHeight();
			// var newX = prevX - 20;
			// var newY = prevY;
			// e.target.setWidth(newX);
			// e.target.setHeight(newY);
			//}
			//else if(e.target.type == "video")
			//{
				//e.target.scale(e.target.scaleX / parseFloat(document.getElementById('ZoomFactorSlider').value));
				//e.target.scale(e.target.scaleY / parseFloat(document.getElementById('ZoomFactorSlider').value));
			//}
			
			if(e && e.target && e.target.type && e.target.type == "image")
			{
				if(e.target.hasAudio && e.target.hasAudio ==1)
				{
					removeControl(e);
				}
				else if(e.target._element && e.target._element.hasAudio && e.target._element.hasAudio == 1)
				{
					removeControl(e);
				}
			}
			mainFabricCanvas.renderAll();
		});
		
	
		mainFabricCanvas.observe('object:moving', function(options) {
			if(!options.target)
				return;
			
			if(options && options.target && options.target.type && options.target.type == "image")
			{
				if(options.target.hasAudio && options.target.hasAudio ==1)
				{
					removeControl(options);
				}
				else if(options.target._element && options.target._element.hasAudio && options.target._element.hasAudio == 1)
				{
					removeControl(options);
				}
			}

			/************************************frame/path start******************************/
			var infiniteBase = options.target;
			var isPlayMode = getPlayMode();
			if( (infiniteBase.pathset) || (infiniteBase.isFrame) && !isPlayMode )
			{
				for(var count = 0 ; count < (infiniteBase.child.length); count++)
				{
				var delX = mainFabricCanvas._currentTransform.offsetX - mainFabricCanvas._offset.left;
				var delY = mainFabricCanvas._currentTransform.offsetY - mainFabricCanvas._offset.top;
					obj = infiniteBase.child[count];
					if (obj && obj.name != "mainInfiniteRect" && isNotTagArea(obj))
					{
						obj.setLeft(mouseCurPos.x + xDist[count] - delX);
						obj.setTop(mouseCurPos.y + yDist[count] - delY).setCoords();
					}
				}
				
			}
			/************************************frame/path stop******************************/
			
			if (options.target.name == "mainInfiniteRect")
			{
				var delX = mainFabricCanvas._currentTransform.offsetX - mainFabricCanvas._offset.left;
				var delY = mainFabricCanvas._currentTransform.offsetY - mainFabricCanvas._offset.top;
				var count = 0;
	
				mainFabricCanvas.forEachObject(function(obj) {
					if (obj.name != "mainInfiniteRect" && isNotTagArea(obj))
					{
						obj.setLeft(mouseCurPos.x + obj.distanceX - delX);
						obj.setTop(mouseCurPos.y + obj.distanceY - delY).setCoords();

						count = count + 1;
					}
				});
			}
			customRenderAll();
		});
		
		mainFabricCanvas.observe('mouse:scroll', function (options) {
			mouseWheel(options.e, options.target);
		});
		
		/************************************frame start******************************/
		mainFabricCanvas.observe('object:scaling', function (options) {
			if(!options.target)
				return;
			
			var infiniteBase = options.target;
			if(infiniteBase.isFrame)
			{
				/*console.log("start");
				//console.log(infiniteBase.scaleX);
				//console.log(infiniteBase.scaleY);
				//console.log(infiniteBase.scaleX/frameScaleX);
				//console.log(infiniteBase.scaleY/frameScaleY);
				//console.log("stop");*/
				frameZoom(infiniteBase, infiniteBase.scaleX/frameScaleX, infiniteBase.scaleY/frameScaleY);
				frameScaleX = infiniteBase.scaleX;
				frameScaleY = infiniteBase.scaleY;				
			}
		});
		
		mainFabricCanvas.observe('object:rotating', function (options) {
			if(!options.target)
				return;
			
			var infiniteBase = options.target;
			if(infiniteBase.isFrame)
			{
				/*console.log("start");
				console.log(infiniteBase.theta);
				console.log( infiniteBase.theta - frameTheta);
				console.log("stop");*/
				frameRotate( infiniteBase, infiniteBase.theta - frameTheta );
				frameTheta = infiniteBase.theta;				
			}
		});
		
		/************************************frame stop******************************/

		mainFabricCanvas.observe('mouse:up', function(options) {
		
		if(objectUnderuserPathDef && !getPlayMode() )
		{
			//console.log("A down1 options.e "+options.e);
			objectUnderuserPathDefMouse = 0;
			//captureDefiningPath(options.e);
			//return;
		}		
		
		//Draging audio Image
			if(options && options.target && options.target.type && options.target.type == "image")
			{
				if(options.target.hasAudio && options.target.hasAudio ==1)
				{
					dispControl(options);
				}
				else if(options.target._element && options.target._element.hasAudio && options.target._element.hasAudio == 1)
				{
					dispControl(options);
				}
			}

			frameSort();
			customRenderAll();
			if(capturedObj && capturedObj.target && capturedObj.target.name != "tags" && isBirdEyeViewEnable == false && capturedObj.target.isPathImg!=1)
				tagIt("Default");
			/************************************frame/path start******************************/
			//ankit
			if(options && options.target && options.target.is3D)
				if(!getPlayMode() )
					editThreeD( options.target );
			//ankit
	
			var infiniteBase = options.target;
			var isPlayMode = getPlayMode();
			if((/*(infiniteBase.pathset) ||*/ (infiniteBase && infiniteBase.isFrame))  && temp1 == true && !isPlayMode)
			{
				temp1 = false;
				var diffTheta = infiniteBase.theta - initialFrameTheta;
				var axisCoordX = infiniteBase.getLeft();
				var axisCoordY = infiniteBase.getTop();
				var rotateFactor = diffTheta * (180 / Math.PI);
				for(var count = 0 ; count < (infiniteBase.child.length); count++)
				{
					obj = infiniteBase.child[count];
					if (obj &&obj.name != "mainInfiniteRect" && isNotTagArea(obj))
					{
						obj.setLeft(( xDist[count] * infiniteBase.scaleX / initialFrameScaleX )  + infiniteBase.getLeft());
						obj.setTop(( yDist[count] * infiniteBase.scaleY / initialFrameScaleY )  + infiniteBase.getTop() ).setCoords();
					}
				}
				frameRotate( infiniteBase, infiniteBase.theta - initialFrameTheta, "onload" );
				
			}
			if(infiniteBase && infiniteBase.name != "mainInfiniteRect" && isNotTagArea(infiniteBase)&&!infiniteBase.isLeftCtrl && !infiniteBase.isRightCtrl && !infiniteBase.isShuffle && !infiniteBase.isSlideObj && !infiniteBase.isPathImg)
			{
				//console.log("fggfhgh" +infiniteBase.type);
					//if(!IsPlayMode==0)
						toFitSlideSize(infiniteBase);
			
			}
			/************************************frame/path stop******************************/
				if (capturedObj && capturedObj.target && capturedObj.target.name  == "mainInfiniteRect" && temp == true)
				{
					temp = false;
					var count = 0;
					mainFabricCanvas.forEachObject(function(obj) {
					if (obj.name != "mainInfiniteRect" && isNotTagArea(obj))
					{
						obj.setLeft(obj.distanceX + capturedObj.target.getLeft());
						obj.setTop(obj.distanceY + capturedObj.target.getTop()).setCoords();

						count = count + 1;
					}
				});
				}
				
				/* For Birds Eye View */
				var tempName = (capturedObj && capturedObj.target && capturedObj.target.name) ? capturedObj.target.name : "undefined";
				var tagsubstring = "undefined";
				if(tempName)
					tagsubstring = tempName.substring(0,4);

				if (isBirdEyeViewEnable == true && tagsubstring != "TAG_")
					toggleToBirdEyeView();
					
					
				var activeObject = mainFabricCanvas.getActiveObject();
				if (activeObject && activeObject.picturedCube > -1)
				{
					setTimeout( groupPicturedCube(), 500);
				} 	
				
				customRenderAll();
		});
		//End - Mouse tracking in mainFabricCanvas
		
		loadThemes();
		initilizeContextMenu(mainFabricCanvas);
		
		mainFabricCanvas.isDrawingMode = false; //Init free draw mode

		//Init touch support
		hammer = new Hammer(mainFabricCanvas.upperCanvasEl, { tap_max_interval: 700});
		initHammerEvents();		
		//Init dialogBox
		initDialogBox();
		applyTheme("defaultTheme");
		initializeAlertBar();
		//set3DButtonPosition();
	}
	catch(e){
		alert(e.message);
	}		
}

function insertTriangle(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;
		
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
			
		var rect = new fabric.Triangle({
			            width: 100,
                        height: 100,
                        top: insertTop,
                        left: insertLeft,
                        strokeWidth: document.getElementById('StrokeWidth').value,
                        fill: fillColor,
                        stroke: strokeColor});
    	rect.setOpacity(document.getElementById('TransperencySlider').value);
		rect.id = counter;
		
		counter++;
    	mainFabricCanvas.add(rect);
		frameSort();
		customRenderAll();
		//addFrame(rect);//frame
	}
	catch(e){
		alert(e.message);
	}			
}

function insertRectangle(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;
			
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}	
			
		var rect = new fabric.Rect({
			            width: 100,
                        height: 100,
                        top: insertTop,
                        left: insertLeft,
                        strokeWidth: document.getElementById('StrokeWidth').value,
                        fill: fillColor,
                        stroke: strokeColor});
    	rect.setOpacity(document.getElementById('TransperencySlider').value);
		rect.id = counter;
		counter++;
    	mainFabricCanvas.add(rect);
		frameSort();
		customRenderAll();
		//addFrame(rect);//frame
	}
	catch(e){
		alert(e.message);
	}		
}

function StartNewFrameRect(top, left)
{
try{
		if(document.getElementById('FrameSVG2').value)
		{
			var svgInput = document.getElementById('FrameSVG2').value;	
			fabric.loadSVGFromString(svgInput, function(objects, options)
										  {
	      								  	var svg = fabric.util.groupSVGElements(objects, options);
											if(top)
											{
												svg.set('top',top);
												svg.set('left',left);
											}											
											svg.setOpacity(0.9);
											svg.set('fill', '#555557');
											svg.set('strokeWidth', '3');
											svg.set('stroke', '#000000');
	      								  	svg.setCoords();
											svg.id = counter;
											counter++;
	      									mainFabricCanvas.add(svg);
											addFrame(svg);//frame
											frameSort();
											customRenderAll();
	    								  });	
		}	
		else
			alert('Please give valid SVG data !');
	}
	catch(e){
		alert(e.message);
	}				
}

function StartNewFrameTri(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)		{	  	
			//fillColor = document.getElementById('FillColorSelector').value;
			//alert(fillColor);
			fillColor = "#FFFFFF";
			}
		if(document.getElementById('StrokeColorSelector').value){
			strokeColor = "#000000";
			//strokeColor = document.getElementById('StrokeColorSelector').value;
			}
			
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}	
			
		var frame = new fabric.Triangle({
			            width: 400,
                        height: 400,
                        top: insertTop,
                        left: insertLeft,
                        strokeWidth: document.getElementById('StrokeWidth').value,
                        fill: fillColor,
                        stroke: strokeColor});
    	frame.setOpacity(document.getElementById('TransperencySlider').value);
		frame.set('fill', '#555557');
		frame.id = counter;
		counter++;
    	mainFabricCanvas.add(frame);
		frameSort();
		customRenderAll();
		addFrame(frame);//frame
	}
	catch(e){
		alert(e.message);
	}			
}

function StartNewFrameCirc(top, left)
{
	
	try{
		if(document.getElementById('FrameSVG1').value)
		{
			var svgInput = document.getElementById('FrameSVG1').value;	
			fabric.loadSVGFromString(svgInput, function(objects, options)
										  {
	      								  	var svg = fabric.util.groupSVGElements(objects, options);
	      								  	updateInsertTopLeft();	
	      								  	svg.set('left', left);
	      								  	svg.set('top', top);
											svg.set('strokeWidth', '3');
											svg.set('fill', '#555557');
	      								  	svg.setCoords();
											svg.id = counter;
											counter++;
	      									mainFabricCanvas.add(svg);
											frameSort();
											customRenderAll();
											svg.setOpacity('0.9');
											addFrame(svg);//frame
	    								  });	
		}	
		else
			alert('Please give valid SVG data !');
	}
	catch(e){
		alert(e.message);
	}		
}

function StartNewFrameBracket(top, left)
{
try{
			var bracFrame = new fabric.Path('m0 0 L0 300 L80 300 L80 280 L20 280 L20 20 L80 20 L80 0 L0 0 m500 0 L500 300 L420 300 L420 280 L480 280 L480 20 L420 20 L420 0 L500 0' , 
			{ fill: '#565656', opacity:'0.5', width: 500, height: 300, stroke: 'black', strokeWidth: 0.1});
			//stroke: 'black', strokeWidth: 2 
			bracFrame.id = counter;
			counter++;
			bracFrame.shapeProperty = 'bracFrame';
			mainFabricCanvas.add(bracFrame);
			bracFrame.setLeft(left);
			bracFrame.setTop(top);
			frameSort();
			customRenderAll();
			addFrame(bracFrame);
	}
	catch(e){
		alert(e.message);
	}		
}

function StartNewFrame3D(top, left){
	try{
	var Frame3D = new fabric.Path('m0 230 L136 495 L208 459 L199 440 L145 467 L27 238 L80 210 L72 193 L0 230 m580 39 L509 305 L500 287 L552 260 L435 28 L382 56 L372 38 L445 0 Z' , 
			{ fill: '#565656', opacity:'0.5', width: 580, height: 495, stroke: 'black', strokeWidth: 0.1, angle: 27});
			
	//Original 3D Frame
	/* var Frame3D = new fabric.Path('m0 250 L125 500 L175 475 L168 460 L135 475 L24 258 L55 240 L47 225 L0 250 m500 50 L450 325 L442 310 L472 294 L355 70 L320 87 L312 72 L365 46 L500 300' , 
			{ fill: '#565656', opacity:'0.5', width: 580, height: 500, stroke: 'black', strokeWidth: 0.1, angle: 27}); */		
			Frame3D.id = counter;
			counter++;
			Frame3D.setLeft(left);
			Frame3D.frameName = "Frame3D";
			Frame3D.setTop(top);
			Frame3D.scaleOrgX = Frame3D.scaleX;
			Frame3D.scaleOrgY = Frame3D.scaleY;
			addFrame(Frame3D);
			Frame3D.shapeProperty = 'frame3D';
			mainFabricCanvas.add(Frame3D);
			frameSort();
			customRenderAll();

			//console.log(Frame3D.scaleX +" and " Frame3D.scaleY);
	}
	catch(e){
		alert(e.message);
	}		
}

function insertLine(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;
		
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
    	
        var line = new fabric.Line(
                [insertLeft,insertTop, insertLeft+100,insertTop+100],
                {stroke: strokeColor, strokeWidth: document.getElementById('StrokeWidth').value, fill: fillColor});
        line.setOpacity(document.getElementById('TransperencySlider').value);
		line.id = counter;
		counter++;
        mainFabricCanvas.add(line);
		frameSort();
		customRenderAll();
	}
	catch(e){
		alert(e.message);
	}	
}

function insertCircle(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;
			
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
    	
        var circle = new fabric.Circle({
						  radius: 50, 
						  left: insertLeft,
						  top: insertTop,
						  strokeWidth: document.getElementById('StrokeWidth').value,
						  fill: fillColor,
						  stroke: strokeColor});
        circle.setOpacity(document.getElementById('TransperencySlider').value);
		circle.id = counter;
		counter++;
        mainFabricCanvas.add(circle);
		frameSort();
		customRenderAll();
	}
	catch(e){
		alert(e.message);
	}		
}

function insertEllipse(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;
		
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
    	
        var ellipse = new fabric.Ellipse({
						  rx: 50,
						  ry: 100, 
						  left: insertLeft,
						  top: insertTop,
						  angle: 30,
						  strokeWidth: document.getElementById('StrokeWidth').value,
						  stroke: strokeColor,
						  fill: fillColor});
        ellipse.setOpacity(document.getElementById('TransperencySlider').value);
		ellipse.isEllipse=1;
		ellipse.id = counter;
		counter++;
        mainFabricCanvas.add(ellipse);
		frameSort();
		customRenderAll();
	}
	catch(e){
		alert(e.message);
	}		
}

function drawImage(top, left, data, url)
{
	try{
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
    	
    	if(!data) { //Draw sample image
			var img = getSample("image");
			var oImg = new fabric.Image(img);
			oImg.set({ 
				left: insertLeft, 
				top: insertTop,
				width : 150,
				height : 150,
				scaleY: 1,
				scaleX: 1
			});
			oImg.setOpacity(document.getElementById('TransperencySlider').value);
			oImg.id = counter;
			counter++;
			oImg.hasAudio = 0;
			mainFabricCanvas.add(oImg);
			frameSort();
			customRenderAll();
			return;
    	}

		if(!isImage(url))
		{
			alert("Select a valid image file !");
			return;
		}
		
		var newImage = new Image();
		newImage.src = data;
		newImage.onload = function() {
			var oImg = new fabric.Image(newImage);
			oImg.set({ 
				left: insertLeft, 
				top: insertTop,
				width : 150,
				height : 150,
				scaleY: 1,
				scaleX: 1
			});
			oImg.setOpacity(document.getElementById('TransperencySlider').value);
			oImg.id = counter;
			counter++;
			oImg.hasAudio = 0;
			mainFabricCanvas.add(oImg);
			frameSort();
			customRenderAll();
		}
		document.getElementById('ImageVideoFileSelector').value = "";
	}
	catch(e){
		alert(e.message);
	}	
}

function newText(top, left)
{
	try{
		if(document.getElementById('FillColorSelector').value)
			fillColor = document.getElementById('FillColorSelector').value;
		if(document.getElementById('StrokeColorSelector').value)
			strokeColor = document.getElementById('StrokeColorSelector').value;
		
		var inputText = "Enter text here";
		
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}				
		
        var text = new fabric.Text(inputText, {
						  left: insertLeft,
						  top: insertTop,
						  textAlign: "left",
						  //fontSize: document.getElementById('fontSizeOfText').value,// TODO : need to be check
						  fontSize:20,
						  strokeWidth: document.getElementById('StrokeWidth').value,
						  stroke: strokeColor,
						  fill: fillColor});
        text.setOpacity(document.getElementById('TransperencySlider').value);
		text.id = counter;
		counter++;
        mainFabricCanvas.add(text);
		frameSort();
		customRenderAll();
	}
	catch(e){
		alert(e.message);
	}		
}

/* Text handling inside canvas*/
function initDialogBox()
{
	if(document.getElementById("closeButton"))
		document.getElementById("closeButton").addEventListener('click', function(e) {hidePrompt(e);}, false);
		
	if(document.getElementById("inputText"))
		document.getElementById("inputText").addEventListener('keyup', function(e) { updateText(e);}, false);
		
	if(document.getElementById("fontFamilyOfText"))
		document.getElementById("fontFamilyOfText").addEventListener('change', function(e) { submitPrompt(e, 'fontFamilyOfText'); }, false);
		
	if(document.getElementById("fontSizeOfText"))
		document.getElementById("fontSizeOfText").addEventListener('change', function(e) { submitPrompt(e, 'fontSizeOfText'); }, false);

	if(document.getElementById("fontColorOfText"))
		document.getElementById("fontColorOfText").addEventListener('change', function(e) { submitPrompt(e, 'fontColorOfText'); }, false);

		
}
function getElementPosition(htmlElement) 
{
	var xPos = htmlElement.offsetLeft;    
	var yPos = htmlElement.offsetTop;
	tempEl = htmlElement.offsetParent;
	while (tempEl != null)
	{
		xPos += tempEl.offsetLeft;
		yPos += tempEl.offsetTop;
		tempEl = tempEl.offsetParent; 
	}
	return { top: yPos, left: xPos };
}
function updateText(evt)
{
	var obj = mainFabricCanvas.getActiveObject() ? mainFabricCanvas.getActiveObject() : mainFabricCanvas.getPointer(evt);		

	if(obj && obj.type == "text")
	{
		var inputText = document.getElementById("inputText").value;	
		obj.setText(inputText);	
		mainFabricCanvas.renderAll();
	}

}
function displayPrompt(evt)
{	
	var dialog = document.getElementById("prompt");
	if(dialog.style.display == 'block')
		return;
		
	var obj = mainFabricCanvas.getActiveObject() ? mainFabricCanvas.getActiveObject() :mainFabricCanvas.getPointer(evt);	
	if(obj && obj.type == "text")
	{
		if(dialog)
		{
			var centerX = obj.getLeft();
			var	centerY = obj.getTop();
			canvasDom = document.getElementById("MainHTMLCanvas");
			if (canvasDom)
			{
				var canvasPos = getElementPosition(canvasDom);
				centerX = (centerX + obj.width/2) + canvasPos.left;
				centerY = (centerY - obj.height/2) + canvasPos.top;
			}
			
			//dialog.style.left = centerX + 'px';
			//dialog.style.top = centerY + 'px';
			dialog.style.left = mouseCurPos.x + 'px';
			dialog.style.top = mouseCurPos.y + 'px';
			
			if (document.getElementById("inputText"))
				document.getElementById("inputText").value = obj.text;
				
			if (document.getElementById("fontSizeOfText"))
				document.getElementById("fontSizeOfText").value = obj.fontSize;
			
			if (document.getElementById("fontFamilyOfText"))
				document.getElementById("fontFamilyOfText").value = obj.fontFamily;
				
			if(document.getElementById("fontColorOfText"))
				document.getElementById("fontColorOfText").value = obj.fill;
							
			dialog.style.display = 'block';
		}
	}
}
function hidePrompt(evt)
{
	var dialog = document.getElementById("prompt");
	if(dialog && dialog.style.display == 'block') {
		dialog.style.display = 'none';
		document.getElementById("inputText").value = "";
	}
}
function submitPrompt(evt, choice)
{
	var obj = mainFabricCanvas.getActiveObject() ? mainFabricCanvas.getActiveObject() :mainFabricCanvas.getPointer(evt);		
	
	if(obj && obj.type == "text")
	{
		var input = null;

		if (choice == "fontSizeOfText")
		{
			input = document.getElementById("fontSizeOfText").value;
			obj.setFontsize(input);
		}
		else if (choice == "fontFamilyOfText")
		{
			input = document.getElementById("fontFamilyOfText").value;
			obj.set('fontFamily', input);
		}
		else if (choice == "fontColorOfText")
		{
			input = document.getElementById("fontColorOfText").value;
			obj.set('fill', input);
		}

	
		/*
		var inputText = document.getElementById("inputText").value;
		var	inputTextFontSize = document.getElementById("fontSizeOfText").value;
		var	inputTextFontFamily = document.getElementById("fontFamilyOfText").value;
		var inputTextColor = document.getElementById("fontColorOfText").value;
		if (inputText == null || inputText == "")
			inputText = "Please enter text";
			
		obj.setText(inputText);	
		obj.setFontsize(inputTextFontSize);
		obj.set('fontFamily', inputTextFontFamily);
		obj.set('fill', inputTextColor);
		*/
		
		//hidePrompt(evt);
		
		mainFabricCanvas.renderAll();
	}
}


function drawSVG()
{
	try{
		if(document.getElementById('SVGInput').value)
		{
			var svgInput = document.getElementById('SVGInput').value;	
			fabric.loadSVGFromString(svgInput, function(objects, options)
										  {
	      								  	var svg = fabric.util.groupSVGElements(objects, options);
	      								  	svg.setOpacity(document.getElementById('TransperencySlider').value);
	      								  	
											if(document.getElementById('FillColorSelector').value)
												fillColor = document.getElementById('FillColorSelector').value;
											if(document.getElementById('StrokeColorSelector').value)
												strokeColor = document.getElementById('StrokeColorSelector').value;

	      								  	updateInsertTopLeft();	
	      								  	svg.set('left', insertLeft);
	      								  	svg.set('top', insertTop);
	      								  	svg.set('strokeWidth', document.getElementById('StrokeWidth').value);
	      								  	svg.set('stroke', strokeColor);
	      								  	svg.set('fill', fillColor);
	      								  	svg.setCoords();
											svg.id = counter;
											counter++;
											svg.shapeProperty = 'dragon';
	      									mainFabricCanvas.add(svg);
											frameSort();
											customRenderAll();
	    								  });	
		}	
		else
			alert("Please give valid SVG data !");
	}
	catch(e){
		alert(e.message);
	}			
}

function removeObject(obj)
{
	var activeObject;
	var i;
	if(obj)
		activeObject = obj;
	else
		activeObject = mainFabricCanvas.getActiveObject();
		
	if(activeObject && activeObject.name != "mainInfiniteRect" && activeObject.name != "tags")
	{
		if(activeObject.isFrame)
		{	
			activeObject.child  = getArrayOfFrameObjects(activeObject);
			if(activeObject.isSlideObj )
					{
						var len=activeObject.child.length;
						activeObject.child[len]=activeObject.ctrl1;
						activeObject.child[len+1]=activeObject.ctrl2;
						activeObject.child[len+2]=activeObject.ctrl3;
					}
			for(var count = 0 ; count < (activeObject.child.length); count++)
			{			
				mainFabricCanvas.remove(activeObject.child[count]);
			}
		}
		clearTimers(activeObject);
		if(activeObject.name == "video")
			unloadVideo(activeObject);
			
		var id;
		if(activeObject && activeObject.id && typeof(activeObject.id) == "string" && activeObject.id.substring(0,10) == "audioImage")
		{
			id = activeObject.id;
			var ino = getdigit(id);
			var audioId = "audioMedia" + ino;
			var audio = document.getElementById(audioId);
			audio.pause();
		}
		else if(activeObject && activeObject._element && activeObject._element.id && typeof(activeObject._element.id) == "string" && activeObject._element.id.substring(0,10) == "audioImage")
			{
			id = activeObject._element.id;
			var ino = getdigit(id);
			var audioId = "audioMedia" + ino;
			var audio = document.getElementById(audioId);
			audio.pause();
			}


		
		if(activeObject.attachObject)
			mainFabricCanvas.remove(activeObject.attachObject);
		mainFabricCanvas.remove(activeObject);
		if(activeObject && activeObject.pathset )
		{
		for( i=0; i < objectsToPathArray.length;i=i+3)
			{
				
				if( objectsToPathArray[i] == activeObject)
				{
					//delete objectsToPathArray[i];
					mainFabricCanvas.remove(objectsToPathArray[i+1]);
					mainFabricCanvas.remove(objectsToPathArray[i+2]);
					mainFabricCanvas.renderAll();
					objectsToPathArray.splice(i, 3);
					break;
				}

			}

		
		}
 			
	}
	customRenderAll();
}

function clearTimers(activeObject) 
{
	if(activeObject.timeOutVarLiner) {
		clearTimeout(activeObject.timeOutVarLiner);
	}
	if(activeObject.interval) {
		clearInterval(activeObject.interval);
	}
	if(activeObject.timeOutVar) {
		clearTimeout(activeObject.timeOutVar);
	}
}
function cutObject(obj)
{
	if(obj.isFrame)
	{	
		obj = makeArrayOfFrameObjs(obj);
		frameUnderCut = obj;
	} 
	if(obj){
	    cutset = true;
	    clipboardobj = obj;
	    removeObject( obj);
	}
}

function copyObject(obj)
{
	/*if(obj.isFrame)
	{	
		obj = makeArrayOfFrameObjs(obj);
		frameUnderCopy = obj;
	} */
	if(obj){
		clipboardobj = obj;
		}
}
function pasteObject()
{
	var width = 0;
	var height = 0;
	if(clipboardobj.isType("image"))
		clipboardobj.clone(callImageclone);
	else if ( clipboardobj.isType("group") ){
		if (cutset) 
		{
			clipboardobj.set('top', mouseCurPos.y);
			clipboardobj.set('left', mouseCurPos.x);
			mainFabricCanvas.add(clipboardobj);
			frameSort();
			customRenderAll();
			cutset = false;
		} else {
			clipboardobj.clone( callImageclone);
		}
		if(frameUnderCut)
		{
			UnGroup(frameUnderCut);			
		}
	}
	else{
		var newline = clipboardobj.clone();
		newline.set('top', mouseCurPos.y);
		newline.set('left', mouseCurPos.x);
		mainFabricCanvas.add(newline);
	}
	frameSort();
	customRenderAll();
}

function callImageclone(newline)
{
	newline.set('top', mouseCurPos.y);
	newline.set('left', mouseCurPos.x);
	mainFabricCanvas.add(newline);
	frameSort();
	customRenderAll();
	/*if(frameUnderCopy)
	{
		UnGroup(newline);
		UnGroup(frameUnderCopy);
	}*/
}

function clearAll()
{
	pathCount = 0;
	mainFabricCanvas.forEachObject(function(obj) {
		if (obj && obj.name != "mainInfiniteRect" && obj.name != "tags" && obj.name != "superGrid")	
		{
			clearTimers(obj);
			if(obj.name == "video")
				unloadVideo(obj);
		
			if(obj.attachObject)
				mainFabricCanvas.remove(obj.attachObject);
			mainFabricCanvas.remove(obj);
		}	
	});
	clearPath();
	customRenderAll();	
}

function exit()
{
	window.close();
}

function customRenderAll(callerName)
{
	var currTime = new Date();
	var timeSinceLastRender = currTime - lastRenderTime;
	mainFabricCanvas.calcOffset();
/*	if (!fabric.isTouchSupported) // NOT touch device
	{
		if(callerName != "video")
		{
			lastRenderTime = new Date();	
			calcFPS();
			mainFabricCanvas.renderAll();
		}
		else
		{
			if( timeSinceLastRender >= redrawPeriod )//TODO : A better logic can be placed here for less choppy video play
			{
				lastRenderTime = new Date();
				calcFPS(); 				
				mainFabricCanvas.renderAll();
			}
		}	
	}
	else
	{
		if(callerName == "video" && timeSinceLastRender > redrawPeriod)
		{
			lastRenderTime = new Date();	
			calcFPS();
			mainFabricCanvas.renderAll();
		}
		else
		{
			if( timeSinceLastRender >= redrawPeriod )//TODO : A better logic can be placed here for less choppy video play
			{
				lastRenderTime = new Date();	
				calcFPS(); 
				mainFabricCanvas.renderAll();
			}
		}			
	}	*/
calcFPS(); 
				mainFabricCanvas.renderAll();

				//if(restoreExecuted)
				//	sleep(10000);
}
var kill;
function FPSMeter(){
/*	if(!kill)
		kill = setInterval(FPSMeter, redrawPeriod);
	var currTime = new Date();
	var timeSinceLastRender = currTime - newFpsResetTime;
	if( timeSinceLastRender >= 1000 )
			{
				drawFPS(1);
				clearInterval(kill);
				kill = 0;
				//console.log(0);
			}
	else
			{
				drawFPS(displayedFps);
				//console.log(displayedFps);
			}*/
}

function freeDrawMode()
{
	if(mainFabricCanvas.isDrawingMode == false)
	{
		mainFabricCanvas.isDrawingMode = true;
	}
	else
	{
		mainFabricCanvas.isDrawingMode = false;
		tagIt("handleDefaultMenuClick");
		return;
	}
	
	if(document.getElementById('StrokeColorSelector').value)
		strokeColor = document.getElementById('StrokeColorSelector').value;

	mainFabricCanvas.freeDrawingColor = strokeColor;
	mainFabricCanvas.freeDrawingLineWidth = document.getElementById('StrokeWidth').value || 1;
}

function canvasWidthChanged(e) {
	mainFabricCanvas.setWidth(e.target.value);
	updateResizeSliderReading();
}
	
function canvasHeightChanged(e) {
	mainFabricCanvas.setHeight(e.target.value);
	updateResizeSliderReading();
}

function updateResizeSliderReading()
{
	document.getElementById("CurrentCanvasWidth").innerHTML = "<font color = 'blue'>" + pad(mainFabricCanvas.getWidth(),4) + "</font>";
	document.getElementById("CurrentCanvasHeight").innerHTML = "<font color = 'blue'>" + pad(mainFabricCanvas.getHeight(),4) + "</font>";
}

/* handle background effect of effect menu */
function updateEffectMenu(target)
{
	document.getElementById('Grayscale').style.backgroundColor = "transparent";
	document.getElementById('Invert').style.backgroundColor = "transparent";
	document.getElementById('Sepia').style.backgroundColor = "transparent";
	document.getElementById('Sepia2').style.backgroundColor = "transparent";
	document.getElementById('Sepia3').style.backgroundColor = "transparent";
	document.getElementById('Noise').style.backgroundColor = "transparent";
	document.getElementById('GradientTransparency').style.backgroundColor = "transparent";

	var activeObject = mainFabricCanvas.getActiveObject();
	if(activeObject == null || activeObject.type != 'image' || activeObject.filters.length == 0)
		return;

	for(var f = 0; f < activeObject.filters.length; f++)
	{
		if(activeObject.filters[f] && activeObject.filters[f].type) {
					document.getElementById(activeObject.filters[f].type).style.backgroundColor = 'blue';
		}
	}
	
}

var prevScreenDimensions = new Object();
prevScreenDimensions.isfullScreen = false;

function enterFullscreen(element) {
  //console.log("enterFullscreen()");
  if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	if (!document.webkitCurrentFullScreenElement) {
		javascript:document.querySelector('body').webkitRequestFullScreen();
	}
  } else {
    element.mozRequestFullScreen();
  } 
  element.ARLFullScreen = true;
  document.getElementById("fullScreen").src= ".//resources//exitFullScreen.png";
}

function exitFullscreen(element) {
	document.cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen;
	document.cancelFullScreen();
	element.ARLFullScreen = false;
	document.getElementById("fullScreen").src= ".//resources//FullScreen.png";	  
}

function requestFullScreen(element) 
{
	if(element.ARLFullScreen)
	{
		exitFullscreen(element);
	}
	else
	{
		enterFullscreen(element);		
		addMenuSlider();
	}
}
function addMenuSlider()
{		
	{
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
 
 

		if ($('.feedback-panel').hasClass('open')) 
		{
				 $('.feedback-panel').animate({left:'-' + feedbackTab.containerWidth}, feedbackTab.speed)
				 .removeClass('open');
		}
	}
}

function showMenu(element) 
{
	prevScreenDimensions.isfullScreen = false;
	var target = document.getElementById("nav");
	var dynaminMenuContainer = document.getElementById("DymanicMenuContainer");
	dynaminMenuContainer.appendChild (target);
	
	document.getElementById("slidingPanel").style.display = 'none';
	target.style.position = prevScreenDimensions.menuPosition;
	target.style.left = prevScreenDimensions.menuLeft;
	target.style.top = prevScreenDimensions.menuTop;
	mainFabricCanvas.setWidth(prevScreenDimensions.width);
	mainFabricCanvas.setHeight(prevScreenDimensions.height);
	document.getElementById("MainHTMLCanvasAreaTable").style.position = prevScreenDimensions.position;
	document.getElementById("DymanicMenuContainer").style.display = prevScreenDimensions.containerDisplay;
	document.body.style.margin = prevScreenDimensions.margin;
	document.getElementById("fullScreen").src= ".//resources//fullScreen.png";
	updateResizeSliderReading();
}
function hideMenu(element)
{
	if(element.ARLFullScreen)
		{
			showMenu(element);
		} else {
			prevScreenDimensions.isfullScreen = true;
			prevScreenDimensions.width = mainFabricCanvas.width;
			prevScreenDimensions.height = mainFabricCanvas.height;
			prevScreenDimensions.position = document.getElementById("MainHTMLCanvasAreaTable").style.position;
			prevScreenDimensions.containerDisplay = document.getElementById("DymanicMenuContainer").style.display;
			prevScreenDimensions.margin = document.body.style.margin;
			prevScreenDimensions.menuPosition = document.getElementById("nav").style.position;
			prevScreenDimensions.menuTop = document.getElementById("nav").style.top;
			prevScreenDimensions.menuLeft = document.getElementById("nav").style.left;

			var target = document.getElementById("nav");
			var sliderContainer =document.getElementById("slidingPanel");
			sliderContainer.appendChild (target);

			sliderContainer.style.display = 'block';
			target.style.position = 'absolute';
			target.style.left = '0px';
			target.style.top = '0px';

			document.getElementById("DymanicMenuContainer").style.display = 'none';	
			document.body.style.margin = '0px';		
		} 
}
/*
function fullScreen()
{
	if(!prevScreenDimensions.isfullScreen)
	{
		prevScreenDimensions.isfullScreen = true;
		prevScreenDimensions.width = mainFabricCanvas.width;
		prevScreenDimensions.height = mainFabricCanvas.height;
		prevScreenDimensions.position = document.getElementById("MainHTMLCanvasAreaTable").style.position;
		prevScreenDimensions.containerDisplay = document.getElementById("DymanicMenuContainer").style.display;
		prevScreenDimensions.margin = document.body.style.margin;
		prevScreenDimensions.menuPosition = document.getElementById("nav").style.position;
		prevScreenDimensions.menuTop = document.getElementById("nav").style.top;
		prevScreenDimensions.menuLeft = document.getElementById("nav").style.left;
		
		var target = document.getElementById("nav");
		var sliderContainer =document.getElementById("slidingPanel");
		sliderContainer.appendChild (target);
		
		
		sliderContainer.style.display = 'block';
		target.style.position = 'absolute';
		target.style.left = '0px';
		target.style.top = '0px';
		mainFabricCanvas.setWidth(document.getElementById('MainHTMLCanvasArea').clientWidth);
		mainFabricCanvas.setHeight(document.getElementById('MainHTMLCanvasArea').clientHeight);
		document.getElementById("MainHTMLCanvasAreaTable").style.position = 'absolute';
		document.getElementById("DymanicMenuContainer").style.display = 'none';
		document.body.style.margin = '0px';
		document.getElementById("fullScreen").src= ".//resources//exitFullScreen.png";
	}
	else
	{
		prevScreenDimensions.isfullScreen = false;
		var target = document.getElementById("nav");
		var dynaminMenuContainer = document.getElementById("DymanicMenuContainer");
		dynaminMenuContainer.appendChild (target);
		
		document.getElementById("slidingPanel").style.display = 'none';
		target.style.position = prevScreenDimensions.menuPosition;
		target.style.left = prevScreenDimensions.menuLeft;
		target.style.top = prevScreenDimensions.menuTop;
		mainFabricCanvas.setWidth(prevScreenDimensions.width);
		mainFabricCanvas.setHeight(prevScreenDimensions.height);
		document.getElementById("MainHTMLCanvasAreaTable").style.position = prevScreenDimensions.position;
		document.getElementById("DymanicMenuContainer").style.display = prevScreenDimensions.containerDisplay;
		document.body.style.margin = prevScreenDimensions.margin;
		document.getElementById("fullScreen").src= ".//resources//fullScreen.png";
		updateResizeSliderReading();
	}
	
}
*/		
function handleDynamicMenuClick()
{
    if(event.target.id == "" || event.target.id == undefined)
        return;
		    
    var id = event.target.id;
    if(id != 'fullScreen')
    {
		IsExampleLoaded();
	}
	
	if (id != 'home' && isBirdEyeViewEnable)
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

    switch(id)
    {
			/* Objects */
        case 'line':
        	mainFabricCanvas.isDrawingMode = false;
            insertLine();
			tagIt("handleDynamicMenuClick");
            break;
                
        case 'rectangle':
        	mainFabricCanvas.isDrawingMode = false;                    
            insertRectangle();
			tagIt("handleDynamicMenuClick");
            break;
            
        case 'triangle':
        	mainFabricCanvas.isDrawingMode = false;                    
            insertTriangle();
			tagIt("handleDynamicMenuClick");
            break;

        case 'circle':
        	mainFabricCanvas.isDrawingMode = false;                    
            insertCircle();
			tagIt("handleDynamicMenuClick");
            break;

        case 'ellipse':
        	mainFabricCanvas.isDrawingMode = false;                    
            insertEllipse();
			tagIt("handleDynamicMenuClick");
            break;

        case 'freeDraw':
            freeDrawMode();
            break; 

		/*Text*/
        case 'text':
        	mainFabricCanvas.isDrawingMode = false;                    
            newText();
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'editText':
        	mainFabricCanvas.isDrawingMode = false;                    
            updateText(mainFabricCanvas.findTarget(event));
            break;
		 
		/* three D objects*/
		case 'cube':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawThreeD('3DCube');
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'adam':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawThreeD('3DBoy');
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'eve':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawThreeD('3DGirl');
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'duck':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawThreeD('3DDuck');
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'house':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawThreeD('3DHouse');
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'truck':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawThreeD('3DTruck');
			tagIt("handleDynamicMenuClick");
            break;
			
		/* Media */
        case 'imageMedia':  
        	mainFabricCanvas.isDrawingMode = false;                    
            drawImage();
			tagIt("handleDynamicMenuClick");
            break;

        case 'videoMedia': 
        	mainFabricCanvas.isDrawingMode = false;                    
            drawVideo();
			tagIt("handleDynamicMenuClick");
            break;
			
		case 'audioMediaIcon': 
        	mainFabricCanvas.isDrawingMode = false;                    
            addAudio();
			tagIt("handleDynamicMenuClick");
            break;
		
        
		/* Theme */
		case 'defaultTheme':
		case 'chessTheme':
		case 'galaxyTheme':
		case 'oceanTheme':
		case 'slateTheme':
		case 'marioTheme':
			applyTheme(id);
		
		/* Animation */
        case 'linearAnimation': 
        case 'rotateAnimation': 
        case 'abstractAnimationSingle': 
		case 'abstractAnimationMulti':
		case 'scaleAnimation':
		case 'stopAnimation':
            applyAnimation(id);
            break;
			
		/* SVG */
		case 'newSVG':
		case 'dragonSVG':
        	mainFabricCanvas.isDrawingMode = false;					
		    drawSVG();
			tagIt("handleDynamicMenuClick");
		    break;
				
		/* Zoom */
		case 'zoomIn':
			zoomInCanvas();
			break;
            
		case 'zoomOut':
			zoomOutCanvas();
			break;
			
		case 'clockwise':
			/*var activeObject = mainFabricCanvas.getActiveObject();
			if(activeObject)
				if(activeObject.name)
					if(activeObject.name == 'mainInfiniteRect')
						return;*/
			rotateCanvasClockwise();
			break;
			
		case 'antiClockwise':
			/*var activeObject = mainFabricCanvas.getActiveObject();
			if(activeObject)
				if(activeObject.name)
					if(activeObject.name == 'mainInfiniteRect')
						return;*/
			rotateCanvasAntiClockwise();
			break;
			
		case 'deleteObject':
		    removeObject();
		    break;
		
		case 'fullScreen':
			//hideMenu(documentBodyElement);
			//requestFullScreen(documentBodyElement);
			break;
			
		case 'clearCanvas':
		    clearAll();
		    break;
			
		case 'galaxy':			
		    LoadGalaxy();
		    break;
			
		case 'fakethreed':	
			LoadFake3D();
		    break;
			
		case 'FrameSVG1':
			mainFabricCanvas.isDrawingMode = false;
		    StartNewFrameRect(350,500);			
			break;	
		case 'triFrame':
			mainFabricCanvas.isDrawingMode = false;
			StartNewFrameTri(350,500);
			tagIt("handleDynamicMenuClick");
		break;
					
		case 'FrameSVG2':
			mainFabricCanvas.isDrawingMode = false;
			StartNewFrameCirc(350,500);
			tagIt("handleDynamicMenuClick");
			break;
		
		case 'FrameSVG3':
			mainFabricCanvas.isDrawingMode = false;
			StartNewFrameBracket(350,500);
			tagIt("handleDynamicMenuClick");
		    break;
			
		case 'Frame3D':
			mainFabricCanvas.isDrawingMode = false;
			StartNewFrame3D(350,500);
			tagIt("handleDynamicMenuClick");
		    break;	
			
		case 'StartAPath':
			mainFabricCanvas.isDrawingMode = false;
			applyAnimation("stopAnimation");
		    insertButtonForPath();
		    break;	
		    
		case 'CompletePath':
			mainFabricCanvas.isDrawingMode = false;
			applyAnimation("stopAnimation");
		    stopPath();
		    break;
		
		case 'ClearPath':
			mainFabricCanvas.isDrawingMode = false;
			applyAnimation("stopAnimation");
		    clearPath();
		    break;
			
		case 'StartUserDefinedAPath':
			mainFabricCanvas.isDrawingMode = false;
			startUserDefinedAPath();
		    break;

		/*case 'removeGroup':
			mainFabricCanvas.isDrawingMode = false;
			var activeObject = mainFabricCanvas.getActiveObject();
		    UnGroup(activeObject);
		    break;*/
		case 'home':
			toggleToBirdEyeView();
			break;
		case 'playMode':
			changePlayMode();
			break;
			
		case 'playModeTag':
			changePlayModeTag();
			break;			

		case 'save':
			saveContent();
			break;	

		case 'restore':
		//	restoreContent();
			break;
		case 'presentation3D':
			isSet = true;
			initNew3DView();
			break;
    }
}


var json1;
function saveContent()
{
	tagIt("EnteringPlayMode");
		mainFabricCanvas.forEachObject(function(obj) {
	//console.log("obj tag" +obj.TagNumber);
	});
		//mainFabricCanvas.forEachObject(function(obj) {

	for(var i =0 ; i < pathImg.length; i++)
	{
		var new1;
		var name = "pathImgisPathSet"+i;
		//new1 = JSON.stringify( pathImg[i].toJSON() );
		if(pathImg.isPathSet)
		localStorage.setItem(name,pathImg[i].isPathSet);
		name = "pathImgisImageOnCanvas"+i;
		if(pathImg.isImgOnCanvas)
		localStorage.setItem(name,pathImg[i].isImgOnCanvas);
		name = "pathImgid"+i;
		if(pathImg.id)
		localStorage.setItem(name,pathImg[i].id);
	}
	
	//});
	json1 = JSON.stringify( mainFabricCanvas.toJSON() );
	if(document.getElementById("json"))
	{
		document.getElementById("json").value = json1;
	}
	if (json1) {
	localStorage.setItem('idno', idno);
	localStorage.setItem('myObj' , json1);}
	localStorage.setItem('length', objStoreX.length);
	localStorage.setItem('slideCount', slideCount);
	localStorage.setItem('Imgid', Imgid);
	localStorage.setItem('pathDefined', pathDefined);
	localStorage.setItem('allImagesCreated', allImagesCreated);
	localStorage.setItem('highestImgOnCanvas', highestImgOnCanvas);
	localStorage.setItem('currCanvasWidthP', currCanvasWidthP);
	localStorage.setItem('currCanvasheightP', currCanvasheightP);
	localStorage.setItem('stopPathVar', stopPathVar);
	localStorage.setItem('objectsOnPathArraylength' ,objectsOnPathArray.length);
	localStorage.setItem('imgHolderlength' ,imgHolder.length);
	localStorage.setItem('currTheme' ,currTheme);
	localStorage.setItem('pathImglength', pathImg.length);
	//if(objectsOnPathArray)
	//{
	//sortPath();
	//}

	for(var i =0 ; i < imgHolder.length; i ++)
	{
		var name = "imgHolder"+i;
		//console.log(name);
		localStorage.setItem(name, imgHolder[i]);
	}
		
	for(var i =0 ; i < objectsOnPathArray.length; i++)
	{
		var name = "objectsOnPathArray"+i;
		//console.log(name);
		if(objectsOnPathArray[i])
		localStorage.setItem(name, objectsOnPathArray[i].id);
	}		
	for(var i =0; i<objStoreX.length;i++)
	{
		var name = "objStoreX"+i;
		//console.log(name);
		localStorage.setItem(name, objStoreX[i]);
	}
	for(var i =0; i<objStoreY.length;i++)
	{
		var name = "objStoreY"+i;
		//console.log(name);
		localStorage.setItem(name, objStoreY[i]);
	}             
	 //localStorage.setItem('objStoreX', objStoreX);
	//localStorage.setItem('objStoreY', objStoreY);
	localStorage.setItem('tagsCount', tagsCount);
	for(var i =0; i<objectsToGroup.length;i++)
	{
		var name = "objectsToGroup"+i;
		//console.log(name);
		//json1 = JSON.stringify( objectsToGroup[i]);
		localStorage.setItem(name, objectsToGroup[i].id);
		}
	
	localStorage.setItem('objectsToGrouplength', objectsToGroup.length);
	localStorage.setItem('newGroup', newGroup);
	localStorage.setItem('counter', counter);
	var c =0;
	mainFabricCanvas.forEachObject(function(obj) {
		if(obj.xPath)
		{	
			var name = obj +c+"x";
			var name1 = obj +c+"y";
			localStorage.setItem(name, obj.xPath);
			localStorage.setItem(name1, obj.yPath);
			console.log(" save path" +obj.xPath);
			console.log(" save path" +obj.yPath);
			c++;
		}
		
	});
/*	console.log("In save........................");
	console.log(objStoreX.length);
	console.log(objStoreX);
	console.log(objStoreY);
	console.log(tagsCount);
	//console.log(mainInfiniteRect.setLeft);*/
}

function loadXMLDoc()
{
/*
alert(1);
	var dialog = document.getElementById('saveRestore');
	document.getElementById('recid').value = "";
	target = document.getElementById('restoreWrite');	
	dialog.style.display = 'none';
	
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
		document.getElementById("jsonrec").value=xmlhttp.responseText;
		alert(2);
			restoreContent();

		}

	  }
	 // var str = document.getElementById("recid").value;
	  var str = document.getElementById('restoreWrite').value;
	  
	  var newstr =  str.split('\\'); 
	xmlhttp.open("GET",newstr[2],true);
	xmlhttp.send();

	target.value = ""; */
}

var strJson;
var set = 0;
function restoreContent(options)
{
	restoreExecuted=1;
//console.log("in restore");
//strJson = .json_encode("<?=$_SESSION['saved_content']?>"
if(document.getElementById("jsonrec"))
	strJson =document.getElementById("jsonrec").value;
	//console.log(strJson);

currTheme = localStorage.getItem('currTheme');
	//applyTheme(currTheme);
	var strJson1 = localStorage.getItem('myObj');
	if (strJson /*&& !set*/) {
		//target = document.getElementById('restoreWrite');
		//target.style.display = 'none';
	set = 1;
	//console.log('myObj  : '+strJson1);
	mainFabricCanvas.loadFromJSON(strJson);
	var pathImglength = parseInt(localStorage.getItem('pathImglength'));
	


	if(!grouparr.length) {
	idno = localStorage.getItem('idno');
	var objectsToGrouplength = localStorage.getItem('objectsToGrouplength');
	newGroup = parseInt(localStorage.getItem('newGroup'));
	counter = parseInt(localStorage.getItem('counter'));
	//slideCount = localStorage.getItem('slideCount');
	Imgid = parseInt(localStorage.getItem('Imgid'));
	pathDefined = parseInt(localStorage.getItem('pathDefined'));
	allImagesCreated = parseInt(localStorage.getItem('allImagesCreated'));
	highestImgOnCanvas = parseInt(localStorage.getItem('highestImgOnCanvas'));
	currCanvasWidthP = parseInt(localStorage.getItem('currCanvasWidthP'));
	currCanvasheightP = parseInt(localStorage.getItem('currCanvasheightP'));
	stopPathVar = parseInt(localStorage.getItem('stopPathVar'));
	var objectsOnPathArraylength = localStorage.getItem('objectsOnPathArraylength');
	var imgHolderlength = parseInt(localStorage.getItem('imgHolderlength'));
	for(var i =0; i<objectsToGrouplength;i++)
	{
		var name = "objectsToGroup"+i;
		//console.log(name);
		//json1 = JSON.stringify( objectsToGroup[i]);
		grouparr[i] = parseInt(localStorage.getItem(name));
		//console.log("grouparr[i] "+grouparr[i]);
	}
	for(var i =0 ; i < imgHolderlength; i++)
	{
		var name = "imgHolder"+i;
		//console.log(name);
		imgHolder[i] = localStorage.getItem(name);
	}
	createImages();
	for(var i =0 ; i < pathImg.length; i++)
	{
		var new1;
		var name = "pathImgisPathSet"+i;
		//new1 = JSON.stringify( pathImg[i].toJSON() );
		pathImg[i].isPathSet = parseInt(localStorage.getItem(name));
		name = "pathImgisImageOnCanvas"+i;
		pathImg[i].isImgOnCanvas = parseInt(localStorage.getItem(name));
		name = "pathImgid"+i;
		pathImg[i].id = parseInt(localStorage.getItem(name));
	}
	
	for(var i =0; i<objectsOnPathArraylength;i++)
	{
		var name = "objectsOnPathArray"+i;
		//console.log(name);
		//json1 = JSON.stringify( objectsToGroup[i]);
		objectsOnPathArrayarr[i] = parseInt(localStorage.getItem(name));
	}	
	//createpathobj();
	}




	objStoreX=[];
	objStoreY=[];
	tagsCount=0;
	var len = localStorage.getItem('length');
	for(var i =0; i<len;i++)
	{
					var name = "objStoreX"+i;
					//console.log(name);
					objStoreX[i]=parseInt(localStorage.getItem(name));
	}
	for(var i =0; i<len;i++)
	{
					var name = "objStoreY"+i;
					//console.log(name);
					objStoreY[i]=parseInt(localStorage.getItem(name));
	}                            
	

	tagsCount = localStorage.getItem('tagsCount');

	
	var tagindex = tagsCount-1;
	canvasScaleFactor=1;
	tagsCount--;
	mainInfiniteRect.setLeft(objStoreX[tagindex] * canvasScaleFactor);
	mainInfiniteRect.setTop(objStoreY[tagindex] * canvasScaleFactor);
	
	restoreAudio();
	
	for(i=0;i<objectsToGroup.length;i++) 
		{
//console.log("objectsToGroup restore  "+objectsToGroup[i]);
}
objectsToGroup=[];

	//createobj(grouparr);
	//mainFabricCanvas.renderAll();
	//callSlide();
		customRenderAll();
	//animateRestore();
	}
	
}

function animateRestore() 
{
		//console.log("linear animation");
	mainFabricCanvas.forEachObject(function(obj) {
		//console.log("animate restore" +obj.animating );
		if (obj.animating == 0)
			animateLinear(obj);
		else if (obj.animating == 1)
			animateZoom(obj);
		else if (obj.animating == 2)
			animateRotate(obj);
	});
}


function createSlide()
{
	var c=0;
	mainFabricCanvas.forEachObject(function(obj) {
	if(obj.name != "mainInfiniteRect" && isNotTagArea(obj)){
		var name = obj +c+"x";
		var name1 = obj +c+"y";
		var xSTR = localStorage.getItem(name);
		var ySTR = localStorage.getItem(name1);
		obj.xPath= (xSTR.split(","));
		obj.yPath= (ySTR.split(","));
		c++;
	}
	
	if(obj.isSlideObj)
	{
		mainFabricCanvas.forEachObject(function(obj1) {
				if(obj.child1 == obj1.id)
				{
					obj.ctrl1 = obj1;
				}
				if(obj.child2 == obj1.id)
				{
					obj.ctrl2 = obj1;
				}
				if(obj.child3 == obj1.id)
				{
					obj.ctrl3 = obj1;
				}				
		});
	}
	});
}

function createpathobj()
{
if(!objectsOnPathArray.length) {
var tmp =new Array();
//console.log(" in createpathobj");
		mainFabricCanvas.forEachObject(function(obj) {

	for(var i =0 ; i<objectsOnPathArrayarr.length; i++) {
			//console.log(" in createpathobj"+obj.id);
	if(objectsOnPathArrayarr[i] == obj.id )
	{
	//console.log(" now filled");
	//console.log(obj.type);
		tmp.push(obj);
		filled = true;
	}

	}
	});

	for( i = tmp.length ; i >= 0 ; i--) {
objectsOnPathArray.push(tmp[i]);
 }
	callSlide();

	}
}

var k=0;
function restorePath()
{
	if(!k)
		k = setInterval(restorePath, 500);
	if(objectsOnPathArray.length) {
		var newtemp = new Array();
		mainFabricCanvas.forEachObject(function(obj) {
			for(var i =0 ; i<objectsOnPathArray.length; i++) {
			if(obj.id == objectsOnPathArray[i].id)
				newtemp.push(obj);
			}
		});
		if(newtemp.length)
		{
		clearInterval(k);
		k = 0;
		objectsOnPathArray = [];
		for(var i=newtemp.length-1; i >= 0; i--)
			objectsOnPathArray.push(newtemp[i])
				for(var i = document.getElementById("myTable").rows.length; i > 0;i--)
		{
		document.getElementById("myTable").deleteRow(i -1);
		}
		slideCount = 0;
		callSlide();
		}
		}
	else
	{
		clearInterval(k);
		k = 0;
	}
}

function createobj()
{
	//console.log("first:"+objectsToGroup.length);
	objectsToGroup = [];
	//console.log("second"+objectsToGroup.length);
	mainFabricCanvas.forEachObject(function(obj) {
	//console.log("obj id :"+obj.id);
	for(var i =0 ; i<grouparr.length; i++) {
	
	if(grouparr[i] == obj.id )
	{
	//console.log("match found: "+ i);
		objectsToGroup.push(obj);
	}
	}
	});
	//console.log("last:"+objectsToGroup.length);
}

function StartNewPath()
{	
	newPath=1;
	StartPath();
}

function StartPath()
{	
	var activeObject;
	var i =0;
	var temp1 = false;
	activeObject = mainFabricCanvas.getActiveObject();
	for( var i=0 ;i < objectsToPathArray.length; i++)
	{
		if(activeObject == objectsToPathArray[i]) {
		activeObject.pathset = true;
		break;}
	}
	if(activeObject && !activeObject.pathset && newPath == 1){
		temp1 = true;
		activeObject.pathset = true;}
	var objectPresent = -1;
	if(newPath==1 && temp1 == true)
	{
		ShowPathNumber();
		frameSort();
		mainFabricCanvas.renderAll();
	}
}

function CompletePath()
{
	if(newPath){
		newPath = 0;
		//pathCount = 0;
	}
}

var count = 0;
function ShowPathNumber()
{
var tagName;
var activeObject = mainFabricCanvas.getActiveObject();
var newTag;
	if(newPath)
	{
	if(activeObject && (activeObject.name != "mainInfiniteRect" && isNotTagArea(activeObject))) {
	var toprect = mainFabricCanvas.getActiveObject().getTop()-10;
	var leftrect = mainFabricCanvas.getActiveObject().getLeft()-10;

	var newTagRect = new fabric.Rect({
			width: 25,
			height: 25,
			top: toprect ,
			left: leftrect,
			fill: 'rgba(255,255,255,1)'});	
	newTagRect.hasControls = false;
	newTagRect.lockMovementX = true;
	newTagRect.lockMovementY = true;
	newTagRect.lockScalingX = true;
	newTagRect.lockScalingY = true;
	newTagRect.lockUniScaling = true;
	newTagRect.lockRotation = true;
	mainFabricCanvas.add(newTagRect);

		newTag = new fabric.Text(pathCount.toString(), {
			width: 25,
			height: 25,
			top: toprect-2,
			left: leftrect,
			textAlign: "center",
			fontSize: 20,
			fill: 'rgba(0,0,0,1)'});
		newTag.hasControls = false;
		tagName = tagName + pathCount;

		newTagRect.attachObject =  newTag;
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
		objectsToPathArray.push(activeObject);
		objectsToPathArray.push(newTagRect);
		objectsToPathArray.push(newTag);
		

		if (!fabric.isTouchSupported) 
			customRenderAll();
		else
			mainFabricCanvas.renderAll();
			
		var objIndex=pathCount;
		pathCount = pathCount + 1;
		count = count+1;
		}
	}
}

function ClearPath()
{
	for( var i=0 ; i< objectsToPathArray.length; i=i+3)
	{
	objectsToPathArray[i].pathset = false;
	mainFabricCanvas.remove( objectsToPathArray[i+1]);
	mainFabricCanvas.remove( objectsToPathArray[i+2]);
	mainFabricCanvas.renderAll();
	}
   objectsToPathArray.splice(0, objectsToPathArray.length);
   pathCount = 0;
}

function StartNewGroup()
{	
	if(objectsToGroup) 
	{
		objectsToGroup=[];
		prvLength=0;
	}
	newGroup=1;
	StartGroup();
}

function StartGroup()
{	
	if(restoreExecuted==1)
	{
		//console.log("building grparray");
		createobj();
		restoreExecuted=0;
	}
		
	var activeObject, activeObject1;
	var i =0;
	activeObject = mainFabricCanvas.getActiveObject();
	var objectPresent = -1;
	if(newGroup==1)
	{
		if(objectsToGroup) {
			prvLength = objectsToGroup.length;
		}	
		if(activeObject && (activeObject.name != "mainInfiniteRect" && isNotTagArea(activeObject))) 
		{
			if(activeObject && activeObject.pathset)
			{
				for ( var i=0; i< objectsToPathArray.length; i=i+3)
				{
					if( activeObject == objectsToPathArray[i])
					{
						groupAnimate = getArrayOfPathSubsetAnimation(activeObject);
						newGroup = 1;
						objectsToGroup.push(objectsToPathArray[i]);
						objectsToGroup.push(objectsToPathArray[i+1]);
						objectsToGroup.push(objectsToPathArray[i+2]);
						var objectsToPathArrayTemp = new Array();;
						for(var k =0;k<objectsToPathArray.length;k++){
							objectsToPathArrayTemp[k]=objectsToPathArray[k];
						}				
						var fromGroup = true;
						//activeObject1 = CompleteGroup(groupAnimate, fromGroup);
						objectsToPathArray = objectsToPathArrayTemp;
						for(var k =0;k<objectsToPathArrayTemp.length;k++){
						objectsToPathArray[k]=objectsToPathArrayTemp[k];
						}				
						pathUnderAnimation = activeObject1;
						break;
					}
				}
			//	objectPresent = objectsToGroup.indexOf(groupAnimate);
			//	if(objectPresent == -1)
			//	{
			//		objectsToGroup.push(groupAnimate);
			//	}

			}
			
			else {
			objectPresent = objectsToGroup.indexOf(activeObject);
			if(objectPresent == -1)
			{
				objectsToGroup.push(activeObject);
			}
			}
		}
	}
}

function StartTexturedCube()
{	
	var activeObject;
	activeObject = mainFabricCanvas.getActiveObject();
	if (activeObject && activeObject.type == "image" && (activeObject.name != "mainInfiniteRect" && activeObject.name != "tags" && activeObject.name != "superGrid"))	
	{
		if(newtexturedCube==1)
		{
			
			if(objectsToTexturedCube) {
				prvLength = objectsToTexturedCube.length;
			}	

			objectPresent = objectsToTexturedCube.indexOf(activeObject);
			if(objectPresent == -1)
			{
				objectsToTexturedCube.push(activeObject);
			}

		}
	}
}



function CompleteGroup(objectsToGroupArray)
{
	finishGroupClicked = 1;
	var flag = 0;
	var i =0;
	var group;
 for(i= 0; i < objectsToGroupArray.length; i++)
 {
	if(objectsToGroupArray[i].isFrame)
	{
		flag =1;
		break;
	}
 }
	if(flag)
		objectsToGroupArray = groupSort(objectsToGroupArray);
	i =0;
	if(newGroup) {
		for(i=0;i<objectsToGroupArray.length;i++) 
		{
			if(i==0) {
				if(newGroup) {
					group = new fabric.Group([objectsToGroupArray[i]]);
				} else {
//					group = listOfGroups[(listOfGroups.length-1)];
//					i = i + prvLength -1;
				}			
			} else {		
				group.addWithUpdate(objectsToGroupArray[i]);
			}
		}
		if(i>0 && newGroup ){
			//listOfGroups.push(group);
			newGroup = 0;
		}
		for(i=0;i<objectsToGroupArray.length;i++) 
		{
			if(objectsToGroupArray[i].pathset && objectsToGroupArray[i].hasControls != false)
			{
				objectsToPathArray.push(objectsToGroupArray[i]);
				objectsToPathArray.push(objectsToGroupArray[i+1]);
				objectsToPathArray.push(objectsToGroupArray[i+2]);
			}
			removeObject(objectsToGroupArray[i]);
		}	
		mainFabricCanvas.add(group);
		frameSort();
		mainFabricCanvas.renderAll();
	}
	return group;
}

function fpsInit()
{
    //create canvas and divs
    //var canvas = document.createElement("canvas");
    //canvas.id = "fpsCanvas";
	/*var canvas = document.getElementById("fpsCanvas");
    canvas.setAttribute('width', 110);
    canvas.setAttribute('tabIndex', '-1');
    canvas.setAttribute('height', 60);
	//document.body.insertBefore(canvas, document.body.firstChild);

	canvas.style.position = 'absolute';
	canvas.style.left = '1450px';
	canvas.style.top = '8px';

    ctx = canvas.getContext("2d");
	*/
}

function UnGroup(activeObject)
{
	var ss = [];
	var ar;
	var ob;
	var i,len;
	var isGroup = activeObject.isType('group');
	if( activeObject &&activeObject.pathset)
	{
		for( i=0; i < objectsToPathArray.length;i=i+3)
		{
				
			if( objectsToPathArray[i] == activeObject)
			{
				//delete objectsToPathArray[i];
				mainFabricCanvas.remove(objectsToPathArray[i+1]);
				mainFabricCanvas.remove(objectsToPathArray[i+2]);
				mainFabricCanvas.renderAll();
				objectsToPathArray.splice(i, 3);
				break;
			}

		}
	}
	if(isGroup) {
		ss = activeObject.getObjects();
		len = ss.length;
		var ar = new Array(len);
		for(i=0;i<len;i++) 
		{
			ar[i]=ss[i];			
		}	
		for(i=0;i<len;i++) 
		{	
				//alert(ar[i]);
				ob = ar[i];
				activeObject.removeWithUpdate(ob);
				mainFabricCanvas.add(ob);
				frameSort();
				customRenderAll();
				//alert(i);
		} 	
	}
}

function lockMovementofObjs()
{
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
					
					obj.origionalX = obj.getLeft();
					obj.origionalY = obj.getTop();
					obj.origionalZoomX = obj.scaleX;
					obj.origionalZoomY = obj.scaleY;
					obj.originalAngle =  obj.getAngle();	
				}
            }
        });
}

function unlockMovementOfObjs()
{
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
				 	obj.lockMovementX = false;
					obj.lockMovementY = false;
					obj.lockScalingX = false;
					obj.lockScalingY = false;
					obj.lockUniScaling = false;
					obj.lockRotation = false;
					
					//if (obj.scaleX == obj.scaleY)
					//{
					//	obj.scale(obj.origionalZoomX);
					//} 
					//else 
					{
						obj.set('scaleX', obj.origionalZoomX );
						obj.set('scaleY', obj.origionalZoomY );
					}
					obj.setLeft(obj.origionalX);
					obj.setTop(obj.origionalY).setCoords();
					obj.setAngle(obj.originalAngle);
				}
            }
        });
}
var canvasScaleFactorBeofrePM=1;
function changePlayMode(options)
{
	var fullPath = document.getElementById('playMode').src;
	var filename = fullPath.replace(/^.*[\\\/]/, '');
	if(filename == 'camera.png')
	{
			document.getElementById('playMode').src = 'resources/cameraStop.png';			
			lockMovementofObjs();
			hideRightMenuOPtions("PlayMode");
			tagIt("EnteringPlayMode");
			setPlayMode(1);
			gridEnable=false;
			canvasScaleFactorBeofrePM=canvasScaleFactor;
			if(fake3DExampleLoadStatus== false)
			{
				IsThreeDExampleLoaded();
			}			
	}
	else
	{
			document.getElementById('playMode').src = 'resources/camera.png'
			setPlayMode(0);
			if( window.preziTimer )
			{
				clearInterval(window.preziTimer);
				window.preziTimer=0;
			}
			if(window.pathAnimationTimer)
			{
				clearInterval(window.pathAnimationTimer);
				window.pathAnimationTimer=0;
			}	
			if(window.userPath)
			{
				clearInterval(window.userPath);
				window.userPath=0;
			}			
			unlockMovementOfObjs();
			showRightMenuOPtions("PlayMode");
			gridEnable=true;
			canvasScaleFactor=canvasScaleFactorBeofrePM;			
			
			var tagindex = tagsCount-1;			
			tagsCount--;
			mainInfiniteRect.setLeft(objStoreX[tagindex] * canvasScaleFactor);
			mainInfiniteRect.setTop(objStoreY[tagindex] * canvasScaleFactor);
			
			if(fake3DExampleLoadStatus== true)
			{
				IsThreeDExampleLoaded();
			}
	}
	if(options=="pers3d")
	{
		target = document.getElementById('CameraSpeed');
		target.style.display = 'none';		
	}
	
	if(!getPlayMode())
	{
		mainFabricCanvas.forEachObject(function(obj) {								
			if(obj && obj.isSlideObj && obj.slideChildArray)
			{
				obj.lockUniScaling = true;
			}
			if(obj.isLeftCtrl ||obj.isRightCtrl ||obj.isShuffle)
			{
				disableCOntrols(obj);
			}
		});	
	}
	customRenderAll();	
}

function changePlayModeTag()
{
	var fullPath = document.getElementById('playModeTag').src;
	var filename = fullPath.replace(/^.*[\\\/]/, '');
	if(filename == 'playMode.png')
	{
			document.getElementById('playModeTag').src = 'resources/pauseMode.png'	
			setPlayModeTag(1);
			
			lockMovementofObjs();
			hideRightMenuOPtions("PlayModeTag");
			tagIt("EnteringPlayMode");
			gridEnable=false;
			canvasScaleFactorBeofrePM=canvasScaleFactor;
	}
	else
	{
			document.getElementById('playModeTag').src = 'resources/playMode.png'
			setPlayModeTag(0);
			
			if( window.preziTimer )
			{
				clearInterval(window.preziTimer);
				window.preziTimer=0;
			}
			if(window.pathAnimationTimer)
			{
				clearInterval(window.pathAnimationTimer);
				window.pathAnimationTimer=0;
			}
			if(window.userPath)
			{
				clearInterval(window.userPath);
				window.userPath=0;
			}								
			//showTagged("ExitingPlayMode");
			var tagindex = tagsCount-1;
			canvasScaleFactor=canvasScaleFactorBeofrePM;
			tagsCount--;
			mainInfiniteRect.setLeft(objStoreX[tagindex] * canvasScaleFactor);
			mainInfiniteRect.setTop(objStoreY[tagindex] * canvasScaleFactor);			
			unlockMovementOfObjs();
			showRightMenuOPtions("PlayModeTag");
			gridEnable=true;
			
	}
	customRenderAll();
}



function rightClickblocked()
{
	return getPlayMode() || getPlayModeTag(); 
}

function hideRightMenuOPtions(option)
{
	target = document.getElementById('vertical_menu');
	imgSrc = document.getElementById('verticalMenuShowHide');

	target.style.display = 'none';
	if(imgSrc)
	{
		imgSrc.src = 'resources/show.png'
		imgSrc.style.display = 'none';
	}

	target = document.getElementById('topMenu');
	imgSrc = document.getElementById('topMenushowHide');
	
	target.style.display = 'none';
	if(imgSrc)
	{
		imgSrc.src = 'resources/show.png';
		imgSrc.style.display = 'none';
	}
	target = document.getElementById('StartUserDefinedAPath');
	target.style.display = 'none';

	target = document.getElementById('switchTo3d');
	target.style.display = 'none';	
	
	if (option == "BirdView")
	{
		target = document.getElementById('playMode');
		target.style.display = 'none';
		target = document.getElementById('navigationKeys');
		target.style.display = 'none';
		target = document.getElementById('playModeTag');
		target.style.display = 'none';	
		target = document.getElementById('more');
		target.style.display = 'none';
		target = document.getElementById('save');
		target.style.display = 'none';
		target = document.getElementById('restore');
		target.style.display = 'none';	
		target = document.getElementById('myTable');
		target.style.display = 'none';	
		target = document.getElementById('imageSlideShow');
		target.style.display = 'none';	
	}else if(option == "PlayMode")
	{
		target = document.getElementById('home');
		target.style.display = 'none';
		target = document.getElementById('navigationKeys');
		target.style.display = 'none';
		target = document.getElementById('playModeTag');
		target.style.display = 'none';	
		target = document.getElementById('more');
		target.style.display = 'none';
		target = document.getElementById('save');
		target.style.display = 'none';
		target = document.getElementById('restore');
		target.style.display = 'none';		
		target = document.getElementById('CameraSpeed');
		target.style.display = 'block';	
		target = document.getElementById('imageSlideShow');
		target.style.display = 'none';	
		if(pathDefined==1)
		{
			target = document.getElementById('slideShow');
			target.style.display = 'block';	
			target = document.getElementById('slideShowNext');
			target.style.display = 'block';	
			target.disabled = false;
			target = document.getElementById('slideShowLast');
			target.style.display = 'block';	
			target.disabled = true;
			target = document.getElementById('slideShowStop');
			target.style.display = 'block';			
			pathObjectCounter=-1;
			slideShowed=0;
			lastSlideShowed=-1;	
			pauseClicked=0;
			objectUnderAnimation=null;			 
		}
		target = document.getElementById('myTable');
		target.style.display = 'none';
	} else if(option == "PlayModeTag")
	{
		target = document.getElementById('home');
		target.style.display = 'none';
		target = document.getElementById('navigationKeys');
		target.style.display = 'none';
		target = document.getElementById('playModeTag');
		target.style.display = 'block';	
		target = document.getElementById('more');
		target.style.display = 'none';
		target = document.getElementById('save');
		target.style.display = 'none';
		target = document.getElementById('restore');
		target.style.display = 'none';		
		target = document.getElementById('CameraSpeed');
		target.style.display = 'none';	
		target = document.getElementById('slideShow');
		target.style.display = 'none';	
		target = document.getElementById('slideShowNext');
		target.style.display = 'none';
		target = document.getElementById('slideShowLast');
		target.style.display = 'none';	
		target = document.getElementById('slideShowStop');
		target.style.display = 'none';			
		target = document.getElementById('playMode');
		target.style.display = 'none';	
		target = document.getElementById('imageSlideShow');
		target.style.display = 'none';	
	}
}
var timerID;
function restoreAudio() 
{
		//alert("restore audio");
		//setting timer as obj still not recieved
		 timerID = setTimeout ("restoreAudioMedia()", 1000);
}

function restoreAudioMedia() 
{
	mainFabricCanvas.forEachObject(function(obj) {

	if(obj._element && obj._element.hasAudio && obj._element.hasAudio == 1)
	{
		//alert("in restoreAudio _element");
		addAudioBox(obj._element.id,obj._element.audioUrl);
	}
		
	});
		CancelTimer();
}
        
function CancelTimer() 
{
	clearTimeout (timerID);
	timerID = null;
}

function showRightMenuOPtions(option)
{
	target = document.getElementById('vertical_menu');
	imgSrc = document.getElementById('verticalMenuShowHide');

	target.style.display = 'block';
	if(imgSrc)
	{
		imgSrc.style.display = 'block';
		imgSrc.src = 'resources/hide.png';
	}

	target = document.getElementById('topMenu');
	imgSrc = document.getElementById('topMenushowHide');
	
	target.style.display = 'block';
	if(imgSrc)
	{
		imgSrc.style.display = 'block';
		imgSrc.src = 'resources/hide.png';
	}
	
	target = document.getElementById('switchTo3d');
	target.style.display = 'block';	
	
	if (option == "BirdView")
	{
		target = document.getElementById('playMode');
		target.style.display = 'block';
		target = document.getElementById('navigationKeys');
		target.style.display = 'block';
		target = document.getElementById('playModeTag');
		target.style.display = 'block';		
		//target = document.getElementById('more');
		//target.style.display = 'block';
		target = document.getElementById('save');
		target.style.display = 'block';
		target = document.getElementById('restore');
		target.style.display = 'block';	
		target = document.getElementById('myTable');
		target.style.display = 'block';	
		target = document.getElementById('imageSlideShow');
		target.style.display = 'block';	
		target = document.getElementById('StartUserDefinedAPath');
		target.style.display = 'block';			
	} else if(option == "PlayMode")
	{
		target = document.getElementById('home');
		target.style.display = 'block';
		target = document.getElementById('navigationKeys');
		target.style.display = 'block';
		target = document.getElementById('playModeTag');
		target.style.display = 'block';	
		//target = document.getElementById('more');
		//target.style.display = 'block';
		target = document.getElementById('save');
		target.style.display = 'block';
		target = document.getElementById('restore');
		target.style.display = 'block';		
		target = document.getElementById('CameraSpeed');
		target.style.display = 'none';	
		target = document.getElementById('slideShow');
		target.style.display = 'none';	
		target = document.getElementById('slideShowNext');
		target.style.display = 'none';
		target = document.getElementById('slideShowLast');
		target.style.display = 'none';
		target = document.getElementById('slideShowStop');
		target.style.display = 'none';			
		target = document.getElementById('myTable');
		target.style.display = 'block';	
		target = document.getElementById('imageSlideShow');
		target.style.display = 'block';	
		target = document.getElementById('StartUserDefinedAPath');
		target.style.display = 'block';			
	} else if(option == "PlayModeTag") {
		target = document.getElementById('home');
		target.style.display = 'block';
		target = document.getElementById('navigationKeys');
		target.style.display = 'block';
		target = document.getElementById('playModeTag');
		target.style.display = 'block';	
		//target = document.getElementById('more');
		//target.style.display = 'block';
		target = document.getElementById('save');
		target.style.display = 'block';
		target = document.getElementById('restore');
		target.style.display = 'block';		
		target = document.getElementById('CameraSpeed');
		target.style.display = 'none';	
		target = document.getElementById('slideShow');
		target.style.display = 'none';	
		target = document.getElementById('slideShowNext');
		target.style.display = 'none';
		target = document.getElementById('slideShowLast');
		target.style.display = 'none';	
		target = document.getElementById('slideShowStop');
		target.style.display = 'none';			
		target = document.getElementById('playMode');
		target.style.display = 'block';		
		target = document.getElementById('StartUserDefinedAPath');
		target.style.display = 'block';	
		target = document.getElementById('imageSlideShow');
		target.style.display = 'block';		
	}
}

function groupPicturedCube()
{
	var activeObject = mainFabricCanvas.getActiveObject();
	if (activeObject && activeObject.picturedCube > -1)
	{
		var index = activeObject ? activeObject.picturedCube : 0;
		var referencedObj = activeObject;
		var temp = new Array();
		for ( var c = 0; c < texturedCubeObjArray[index].length; c++)
		{
			if (!texturedCubeObjArray[index][c].isReferenceObj)
			{
				temp[c] = texturedCubeObjArray[index][c];
			}
			else
			{
				referencedObj = texturedCubeObjArray[index][c];
			}
		}
		
		var rLeft = referencedObj.getLeft();
		var rTop = referencedObj.getTop();
		var w = referencedObj.getWidth();
		var h = referencedObj.getHeight();
		var PADDING = 4;
		
		var l = temp.length;
		l--;
		temp[l].setLeft(rLeft - w - PADDING);
		temp[l].setTop(rTop);
		l--;
		temp[l].setLeft(rLeft + w + PADDING);
		temp[l].setTop(rTop);
		l--;
		temp[l].setLeft(rLeft);
		temp[l].setTop(rTop - w - PADDING);
		l--;
		temp[l].setLeft(rLeft);
		temp[l].setTop(rTop + w + PADDING);
		l--;
		temp[l].setLeft(rLeft);
		temp[l].setTop(rTop + 2*(w + PADDING)).setCoords();
		
		newtexturedCube = 0;
		customRenderAll();
	}
				
}

