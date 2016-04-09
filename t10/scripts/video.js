var redrawPeriod = 50; //Refresh config
var drawThreadHandle = null;
var videoObjects = new Array();

function unloadVideo(obj)
{
	var videoObjectIndex = videoObjects.indexOf(obj);
	
	if(videoObjectIndex != -1)
	{
		//Remove associated video dom
		var videoDom = obj.attachObject;
		videoDom.parentNode.removeChild(videoDom);

		delete videoObjects[videoObjectIndex];
		videoObjects.sort().pop();
	}
}

function createImageForVideo(videoDom)
{ 
	var imageForVideo = new fabric.Image(videoDom); //Sample image place holder for video frame to be display
	imageForVideo.set({ 
		left: insertLeft, 
		top: insertTop,
		width : 150,
		height : 150,
		scaleY: 1,
		scaleX: 1
	});
	
	//Added for fullScreen Support	
	imageForVideo.fullScreen = false;
	imageForVideo.oldX = insertLeft;
	imageForVideo.oldY = insertTop;
	imageForVideo.oldAngle = imageForVideo.getAngle();
	imageForVideo.oldScaleX = imageForVideo.scaleX;
	imageForVideo.oldScaleY = imageForVideo.scaleX;
	
	imageForVideo.name = "video";
	imageForVideo.attachObject = videoDom; 
	imageForVideo.setOpacity(document.getElementById('TransperencySlider').value);
	mainFabricCanvas.add(imageForVideo);						

	return imageForVideo;							
}

function drawThread()
{	
	if(videoObjects.length == 0) //Kill this thread
	{
		window.clearInterval(drawThreadHandle);
		drawThreadHandle = null;
		return;
	}
	
	var isAnyVideoPlaying = false;
	for (var i=0; i < videoObjects.length; i++)
  	{
		var videoObject = videoObjects[i];

		if (videoObject && videoObject.attachObject)
		{
			if(videoObject.attachObject.paused == false && videoObject.attachObject.ended == false)
			{
				isAnyVideoPlaying = true;
				
				var isFilterAvailable = false;
				for(var f = 0; f < videoObject.filters.length; f++)
				{
					if(videoObject.filters[f]) {
						isFilterAvailable = true;
						break;
					}
				}
				
				if(isFilterAvailable)
					videoObject.applyFilters();
				else
				{
					if (videoObject._element.nodeName != "VIDEO") 
					{
						videoObject.setElement(videoObject.attachObject);
					}
				}					
			}	
		}	
  	}
  	
  	if(isAnyVideoPlaying) //Draw only when playing
  		customRenderAll("video");
}

function createVideoDom(url, type, data)
{
	var videosDom = document.getElementById('Videos');	
	var newVideoDom = document.createElement('video');
	newVideoDom.setAttribute('width',"150");
	newVideoDom.setAttribute('height',"150");
	videosDom.appendChild(newVideoDom);

	var videoSource = document.createElement('source');
	if (data)
		videoSource.setAttribute('src', data);
	else
		videoSource.setAttribute('src', url);
		
	videoSource.setAttribute('type', type);
	newVideoDom.appendChild(videoSource);
	
	if(/Webkit/i.test(navigator.userAgent))
	{
	 	if(document.getElementById('LoopVideo').checked)
			newVideoDom.setAttribute('loop',"loop");
	}	
	else
		alert("Not a WebKit browser ! Looping of video not supported !")			
	
	return newVideoDom;
}

function drawVideoInCanvas(url, type, data)
{
	try{
		var videoDom = createVideoDom(url, type, data);
		
		if (videoDom) {
			videoObjects.push(createImageForVideo(videoDom));
			//Play video
			videoDom.play();	
			if(!drawThreadHandle) //Create if not running
				drawThreadHandle = setInterval(drawThread, redrawPeriod);
		}
		else
		{
			alert("Problem in loading video element !");
		}
	}
	catch(e){
		alert("Browser throws exception - " + e.message + " !\nPlease check HTML5 support !");		
	}	
} 

function drawVideo(top, left, data, url)
{
	try{
		if(!top) //Not available. So take default.	
			updateInsertTopLeft();
		else
		{
			insertTop = top;
			insertLeft = left;
		}	    	
    	
    	if(!url) { //Draw sample video
    		drawVideoInCanvas(getSample("video"), "video/" + getExtension(getSample("video")).toLowerCase());
			return;
    	}

		if(!isVideo(url))
		{
			alert("Select a valid video file !");
			return;
		}

		drawVideoInCanvas(url, "video/" + getExtension(url).toLowerCase(), data);
	}
	catch(e){
		alert("Browser throws exception - " + e.message + " !\nPlease check HTML5 support !");
	}	
}

function videoFullScreen(tagetElement)
{
	var index = videoObjects.indexOf(tagetElement);	
	var videoDomObj = tagetElement.attachObject;
	
	if(index != -1) 
	{
		var explicitPause = false;
		if(tagetElement.fullScreen == false)
		{
			if (videoDomObj.paused == false && videoDomObj.ended == false)
			{
				videoDomObj.pause();
				explicitPause = true;
			}
	
			videoObjects[index].oldX = videoObjects[index].getLeft();
			videoObjects[index].oldY = videoObjects[index].getTop();
			videoObjects[index].oldAngle = videoObjects[index].getAngle();
			videoObjects[index].oldScaleX = videoObjects[index].scaleX;
			videoObjects[index].oldScaleY = videoObjects[index].scaleX;
	
			var scaleFactorX = mainFabricCanvas.getWidth() / videoObjects[index].width ;
			videoObjects[index].scaleX = scaleFactorX;
			
			var scaleFactorY = mainFabricCanvas.getHeight() / videoObjects[index].height ;
			videoObjects[index].scaleY = scaleFactorY;
			
			videoObjects[index].setAngle(0);
			videoObjects[index].setLeft((videoObjects[index].width * videoObjects[index].scaleX) / 2);
			videoObjects[index].setTop((videoObjects[index].height * videoObjects[index].scaleY) / 2).setCoords();
			videoObjects[index].fullScreen = true;
			
			if (explicitPause == true && (videoDomObj.paused == true || videoDomObj.ended == true))
				videoDomObj.play();
		}
		else
		{
			if (videoDomObj.paused == false && videoDomObj.ended == false)
			{
				videoDomObj.pause();
				explicitPause = true;
			}
			
			videoObjects[index].scaleX = videoObjects[index].oldScaleX;
			videoObjects[index].scaleY = videoObjects[index].oldScaleY;
			videoObjects[index].setAngle(videoObjects[index].oldAngle);
			videoObjects[index].setLeft(videoObjects[index].oldX);
			videoObjects[index].setTop(videoObjects[index].oldY).setCoords();
			videoObjects[index].fullScreen = false;
			
			if (explicitPause == true && (videoDomObj.paused == true || videoDomObj.ended == true))
				videoDomObj.play();
		}
	}
}
