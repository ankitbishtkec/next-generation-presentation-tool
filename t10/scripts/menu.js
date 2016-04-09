var customContextMenu = null;
var menuArguments = null;
var customSubContextMenu = null;
var alertBoxTimer1=null;
 
function initilizeContextMenu(fabricCanvas)
{
	menuArguments = {
		Base: fabricCanvas.upperCanvasEl,
		Width: 200,
		FontColor: null,
		HoverFontColor: null,
		HoverBackgroundColor: null,
		HoverBorderColor: null,
		ClickEventListener: OnClick
	};

	customContextMenu = new CustomContextMenu(menuArguments); 
	customSubContextMenu = new CustomSubContextMenu(menuArguments); 
	
	fabricCanvas.upperCanvasEl.addEventListener('contextmenu', function(event) {
		showContextMenu(event)
	}, false);	
	
	fabricCanvas.upperCanvasEl.addEventListener('subcontextmenu', function(event) {
		showSubContextMenu(event)
	}, false);	
	
}

function showContextMenu(e,hold)
{
	var fabricCanvas = mainFabricCanvas;
	if( rightClickblocked() )
	{	
	e.preventDefault && e.preventDefault();
		var alertBox = document.getElementById('alertPM');
		clearTimeout(alertBoxTimer1);
		if (alertBox)
		{
			alertBox.style.display = 'block';
			alertBoxTimer1 = window.setTimeout(function() {
				alertBox.style.display = 'none';
				clearTimeout(alertBoxTimer1);
				} ,1000);
			return;
		}
			
		//customContextMenu.Dispose();
		//customContextMenu.Display(e);
		
		return;
	}	
	try{
	
		if(isBirdEyeViewEnable)
		{	
			e.preventDefault && e.preventDefault();
			return;
		}
	
		customContextMenu.Dispose();
		customSubContextMenu.Dispose();
		var target = fabricCanvas.findTarget(e) ? fabricCanvas.findTarget(e) : fabricCanvas.getActiveObject();
		customContextMenu = new CustomContextMenu(menuArguments);
		customSubContextMenu = new CustomSubContextMenu(menuArguments);
		
		if(target)
		{
			if (target.name == "mainInfiniteRect" || target.isFrame)
				showDefaultMenu(customContextMenu, fabricCanvas, target);
			else if(!isNotTagArea(target))
				showTagItMenu(customContextMenu, fabricCanvas, target);
			else if(target.name == "video")
				showVideoMenu(customContextMenu, fabricCanvas, target);
			else //For any inserted object
				showFabricObjectMenu(customContextMenu, fabricCanvas, target);
				showSubMenu(customSubContextMenu, fabricCanvas, target);
		}
				/************************************frame/path start******************************/
				if(/*hold=="hold" && */temp1 ==true)
				{
					
					var infiniteBase = target;
					if(infiniteBase && ((infiniteBase.pathset) || (infiniteBase.isFrame)))
					{
						for(var count = 0 ; count < (infiniteBase.child.length); count++)
						{
							obj = infiniteBase.child[count];
							if (obj.name != "mainInfiniteRect" && isNotTagArea(obj))
							{
								obj.setLeft(xDist[count]  + frameLeft);
								obj.setTop(yDist[count] + frameTop ).setCoords();
							}
						}
						
					}
					
				}
				/************************************frame/path stop******************************/
				
				
				if(/*hold=="hold" && */temp ==true)
				{
					//temp =false;
					var count = 0;
					mainFabricCanvas.forEachObject(function(obj) {
					if (obj.name != "mainInfiniteRect" && isNotTagArea(obj))
					{
						obj.setLeft(obj.distanceX + infiniteBaseLeft);
						obj.setTop(obj.distanceY + infiniteBaseTop).setCoords();

						count = count + 1;
					}
				});
				}
	}
	catch(ex)
	{
		alert(ex.message);
	}
	customContextMenu.Display(e);
	e.preventDefault && e.preventDefault();
	 return false;
}	

var OnClick = function(Sender, EventArgs)
{
	IsThreeDExampleLoaded();
	switch(EventArgs.MenuType)
	{
		case 'video':
			IsExampleLoaded();
			handleVideoMenuClick(EventArgs.CommandName, EventArgs.Target);
			break;
		case 'fabric':
			IsExampleLoaded();
			handleFabricObjectMenuClick(EventArgs.CommandName, EventArgs.Target);
			handleSubMenuClick(EventArgs.CommandName, EventArgs.Target);
			break;
		case 'default':
			IsExampleLoaded();
			handleDefaultMenuClick(EventArgs.CommandName, EventArgs.Target);
			break;
		case 'tags':
			IsExampleLoaded();
			handleTagsMenuClick(EventArgs.CommandName, EventArgs.Target);
			break;
			
		case 'frame':
			IsExampleLoaded();
			handleFrameMenuClick(EventArgs.CommandName, EventArgs.Target);
			break;			
	}
	
	customContextMenu.Hide();
	customSubContextMenu.Hide();
}

window.onunload = function(){
	customContextMenu.Dispose();
	customSubContextMenu.Dispose();
}

function showTagItMenu(customMenu, fCanvas, target)
{
	//customMenu.AddItem('resources/tag.png', 'Tag This View', false, 'Tag This View', 'tags', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/clear.png', 'Clear Tags', false, 'Clear Tags', 'tags', target);
}

function showVideoMenu(customMenu, fCanvas, target)
{
	var videoDomObj = target.attachObject;
	var isVideoPaused = videoDomObj ? videoDomObj.paused : false;
	
	customMenu.AddItem('resources/play.png', 'Play', !isVideoPaused, 'Play', 'video', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/pause.png', 'Pause', isVideoPaused, 'Pause', 'video', target);
	customMenu.AddSeparatorItem();
	
	if(target.fullScreen == false)
		customMenu.AddItem('resources/full-screen.png', 'Fullscreen', false, 'Fullscreen', 'video', target);
	else
		customMenu.AddItem('resources/full-screen-exit.png', 'Exit Fullscreen', false, 'Fullscreen', 'video', target);

	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/del.png', 'Delete', false, 'Delete', 'video', target);	
	if( !target.isSlide )
	{
		customMenu.AddSeparatorItem();
		customMenu.AddItem('resources/del.png', 'Convert to Slide', false, 'Convert to Slide', 'fabric', target);
	}
}

function showFabricObjectMenu(customMenu, fCanvas, target)
{
	customMenu.AddItem('resources/zoomin.png', 'ZoomIn', false, 'ZoomIn', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/zoomout.png', 'ZoomOut', false, 'ZoomOut', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/rotate-clock.png', 'Clockwise', false, 'Clockwise', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/rotate-anti.png', 'AntiClockwise', false, 'AntiClockwise', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/front.png', 'Front Back', false, 'Front Back', 'fabric', target);
	
	
	if(target.type == "group")
	{
		customMenu.AddSeparatorItem();
		customMenu.AddItem('resources/del.png', 'Delete Group', false, 'Delete Group', 'fabric', target);
	} 
	if(newGroup == 0)
	{	
		customMenu.AddSeparatorItem();	
		customMenu.AddItem('resources/start.png', 'Start Group', false, 'Start Group', 'fabric', target);
	} else 
	{
		customMenu.AddSeparatorItem();
		customMenu.AddItem('resources/end.png', 'End Group', false, 'End Group', 'fabric', target);
	}	
	if(target.type == "text")
	{
		customMenu.AddSeparatorItem();
		customMenu.AddItem('resources/edit.png', 'Edit Text', false, 'Edit Text', 'fabric', target);
	}
	
	customMenu.AddSeparatorItem();	
	customMenu.AddItem('resources/del.png', 'Delete', false, 'Delete', 'fabric', target);	
	customMenu.AddSeparatorItem();
	if( !target.isSlide )
	{
		customMenu.AddSeparatorItem();
		customMenu.AddItem('resources/del.png', 'Convert to Slide', false, 'Convert to Slide', 'fabric', target);
	}
	customMenu.AddItem('resources/cut.png', 'Cut', false, 'Cut', 'fabric', target);
	customMenu.AddSeparatorItem();	
	customMenu.AddItem('resources/copy.png', 'Copy', false, 'Copy', 'fabric', target);
	
	if(!objectsToTexturedCube.length && target.type == "image") {
		customMenu.AddSeparatorItem();	
		customMenu.AddItem('resources/start.png', 'Start Textured Cube', false, 'Start Textured Cube', 'fabric', target);
	}
}

function showSubMenu(customMenu, fCanvas, target)
{
	customMenu.AddItem('resources/front.png', 'Bring One Step Front', false, 'Bring One Step Front', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/back.png', 'Send One Step Back', false, 'Send One Step Back', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/front.png', 'Bring To TopMost', false, 'Bring To TopMost', 'fabric', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/back.png', 'Send To BottomMost', false, 'Send To BottomMost', 'fabric', target);
}

function showDefaultMenu(customMenu, fCanvas, target)
{
	customMenu.AddItem('resources/rect.png', 'Rectangle', false, 'Rectangle', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/tri.png', 'Triangle', false, 'Triangle',  'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/ellipse.png', 'Ellipse', false, 'Ellipse', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/circle.png', 'Circle', false, 'Circle', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/line.png', 'Line', false, 'Line', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/line.png', 'Text', false, 'Text', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/frame.png', 'Frame', false, 'Frame', 'default', target);
	customMenu.AddSeparatorItem();
	
	if(mainFabricCanvas.isDrawingMode == false)
		customMenu.AddItem('resources/freedraw.png', 'Enter Free Draw', false, 'Free Draw', 'default', target);
	else
		customMenu.AddItem('resources/freedraw.png', 'Exit Free Draw', false, 'Free Draw', 'default', target);
	customMenu.AddSeparatorItem();
	
	customMenu.AddItem('resources/image.png', 'Image', false, 'Image', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/video.png', 'Video', false, 'Video', 'default', target);
	customMenu.AddSeparatorItem();
	customMenu.AddItem('resources/clear.png', 'Clear All', false, 'Clear All', 'default', target);
	if( clipboardobj != null)
	{
	customMenu.AddSeparatorItem();	
	customMenu.AddItem('resources/copy.png', 'Paste', false, 'Paste', 'fabric', target);
	}
	if(target.isFrame) 
	{
		if(newGroup == 0)
		{	
			customMenu.AddSeparatorItem();	
			customMenu.AddItem('resources/start.png', 'Start Group', false, 'Start Group', 'fabric', target);
		} else 
		{
			customMenu.AddSeparatorItem();
			customMenu.AddItem('resources/end.png', 'End Group', false, 'End Group', 'fabric', target);
		}	
		customMenu.AddSeparatorItem();	
		customMenu.AddItem('resources/del.png', 'Delete', false, 'Delete', 'fabric', target);
		if( !target.isSlide )
		{
			customMenu.AddSeparatorItem();
			customMenu.AddItem('resources/del.png', 'Convert to Slide', false, 'Convert to Slide', 'fabric', target);
		}
		customMenu.AddSeparatorItem();	
		customMenu.AddItem('resources/cut.png', 'Cut', false, 'Cut', 'fabric', target);	
	}
}

function handleVideoMenuClick(command, tagetElement)
{
	var videoDomObj = tagetElement.attachObject;
	if (videoDomObj)
	{
		switch(command)
		{
			case 'Play':
				if (videoDomObj.paused == true || videoDomObj.ended == true)
					videoDomObj.play();
				break;
			case 'Pause':
				if (videoDomObj.paused == false && videoDomObj.ended == false)
					videoDomObj.pause();
				break;
			case 'Fullscreen':				
				videoFullScreen(tagetElement);
				break;
			case 'Delete':
				removeObject(tagetElement);
				break;
			case 'Convert to Slide':
				convertToSlide( tagetElement );
				break;				
		}

		mainFabricCanvas.renderAll();
	}
}

function handleFabricObjectMenuClick(command, tagetElement)
{
	switch(command)
	{
		case 'ZoomIn':
			tagetElement.scale(tagetElement.scaleX * parseFloat(document.getElementById('ZoomFactorSlider').value));
			break;
		case 'ZoomOut':
			tagetElement.scale(tagetElement.scaleX / parseFloat(document.getElementById('ZoomFactorSlider').value));
			break;
		case 'Clockwise':
			tagetElement.setAngle(tagetElement.getAngle() + 15);
			break;
		case 'AntiClockwise':
			tagetElement.setAngle(tagetElement.getAngle() - 15);
		    break;
		case 'Bring To Front':
			changeObjectZPosition(tagetElement, "front");
		    break;
		case 'Send To Back':
			changeObjectZPosition(tagetElement, "back");
		    break;	
			
		case 'Start Group':
			mainFabricCanvas.isDrawingMode = false;
		    StartNewGroup();
			break;
			
		case 'Start Textured Cube':
			newtexturedCube = 1;
		    StartTexturedCube();
			break;			

		case 'End Group':
			mainFabricCanvas.isDrawingMode = false;
		    CompleteGroup(objectsToGroup);
			break;

		case 'Delete Group':
			mainFabricCanvas.isDrawingMode = false;
			var activeObject = mainFabricCanvas.getActiveObject();
		    UnGroup(activeObject);
			break;			

		case 'Edit Text':
			var target = tagetElement;
			var timer = setTimeout(function() {
					displayPrompt(null);
				}, 300);
			break;
			
		case 'Delete':
			removeObject(tagetElement);
			break;
		
		case 'Convert to Slide':
			convertToSlide( tagetElement );
			break;	
		    
		case 'Cut':
			cutObject(mainFabricCanvas.getActiveObject());
			break;
		case 'Copy':
			copyObject(mainFabricCanvas.getActiveObject());
			break;
		case 'Paste':
			pasteObject();
			break;			
	}
	mainFabricCanvas.renderAll();
}

function handleSubMenuClick(command, tagetElement){
		switch(command)
		{
		case 'Bring One Step Front':
			changeObjectZPosition(tagetElement, "front");
		    break;
		case 'Send One Step Back':
			changeObjectZPosition(tagetElement, "back");
		    break;	
		case 'Bring To TopMost':
			changeObjectZPosition(tagetElement, "top");
		break;
		case 'Send To BottomMost':
			changeObjectZPosition(tagetElement, "bottom");
		break;
		}
	mainFabricCanvas.renderAll();		
}


function handleDefaultMenuClick(command, tagetElement)
{
	var currContextMenu = document.getElementById('ContextMenu');
	if (currContextMenu)
	{
		mouseCurPos.x = parseInt(currContextMenu.style.left);
		mouseCurPos.y = parseInt(currContextMenu.style.top);
	}
		
	switch(command)
	{
		case 'Rectangle':
		    mainFabricCanvas.isDrawingMode = false;
			insertRectangle(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Triangle':
		    mainFabricCanvas.isDrawingMode = false;		
			insertTriangle(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Ellipse':
		    mainFabricCanvas.isDrawingMode = false;		
			insertEllipse(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Circle':
		    mainFabricCanvas.isDrawingMode = false;		
			insertCircle(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
		   break;
		case 'Line':
		    mainFabricCanvas.isDrawingMode = false;		
			insertLine(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Frame':
			mainFabricCanvas.isDrawingMode = false;		
			StartNewFrameRect(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;			
		case 'Text':
			mainFabricCanvas.isDrawingMode = false;		
			newText(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Free Draw':
			freeDrawMode();
			break;
		case 'Image':
		    mainFabricCanvas.isDrawingMode = false;		
			drawImage(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Video':
		    mainFabricCanvas.isDrawingMode = false;		
			drawVideo(mouseCurPos.y, mouseCurPos.x);
			tagIt("handleDefaultMenuClick");
			break;
		case 'Clear All':
			clearAll();
			break;
		
		case 'Convert to Slide':
			convertToSlide( tagetElement );
			break;				
	}
}

function handleTagsMenuClick(command, tagetElement)
{
	switch(command)
	{
		case 'Tag This View':
			break;
		case 'Clear Tags':
			ClearAllTags();
			break;
	}	
}

function changeObjectZPosition(obj, direction)
{
	for(var i=0; i < mainFabricCanvas._objects.length; i++)
	{
		if(obj == mainFabricCanvas._objects[i])
		{
			if(direction == "front" && mainFabricCanvas._objects[i+1])
			{
				var tmp = mainFabricCanvas._objects[i];
				mainFabricCanvas._objects[i] = mainFabricCanvas._objects[i+1];
				mainFabricCanvas._objects[i+1] = tmp;

				break;
			}	
			else if(direction == "back" && mainFabricCanvas._objects[i-1])
			{
				var tmp = mainFabricCanvas._objects[i];
				mainFabricCanvas._objects[i] = mainFabricCanvas._objects[i-1];
				mainFabricCanvas._objects[i-1] = tmp;

				break;
			}
			else if(direction == "top" && mainFabricCanvas._objects[i+1])
			{
				var len = mainFabricCanvas._objects.length;
				var tmp = mainFabricCanvas._objects[len-1];
				mainFabricCanvas._objects[len-1] = mainFabricCanvas._objects[i];
				for(var j=i+1; j<len-1; j++)
				{
				mainFabricCanvas._objects[j-1] = mainFabricCanvas._objects[j];
				}
				mainFabricCanvas._objects[len-2] = tmp;
				break;
			}
			
			else if(direction == "bottom" && mainFabricCanvas._objects[i-1])
			{
				var tmp = mainFabricCanvas._objects[i];
				for(var j=i; j>1; j--)
				{
				mainFabricCanvas._objects[j] = mainFabricCanvas._objects[j-1];
				}
				mainFabricCanvas._objects[1] = tmp;
				break;
			}

		}
	}	
}
