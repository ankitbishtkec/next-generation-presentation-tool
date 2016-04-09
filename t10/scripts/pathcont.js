var slideCount=0;
var Imgid=-1;
var pathDefined=0;
var imgHolder=new Array('one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty');
var pathImg=new Array(20);
var objectsOnPathArray=new Array();
var allImagesCreated=0;
var highestImgOnCanvas=0;
var currCanvasWidthP;
var currCanvasheightP;
var stopPathVar=1;
var objectUnderPathDef=null;
var prevObjectUnderPathDef=null;
var objectUnderuserPathDef=0;
var _PathXPoints=[];
var _PathYPoints=[];
var leftObjectUnderPathDef=0;
var topObjectUnderPathDef=0;
function convertToImage(activeObj,flag,id)
{

			activeObj.cloneAsImage(function(img){
			displaySlide(img,flag,id);
			});

	
}
function displaySlide(img,flag,id)
{
	//console.log("displaySlide i = " + id);
	var src = img.getSrc();
	
		var oImg=document.createElement("img");
		oImg.setAttribute('src', src);
		if(flag==1)
		{
			oImg.setAttribute("style","width:45px;height:65px; align:center;");
			oImg.setAttribute("id",id);
		}
		else if(flag==0)
		{
			
			oImg.setAttribute("style","width:55px;height:55px; align:center;");
			oImg.setAttribute("id",id);
		
		}
		else
		{
			var temp= flag;
			var height=40;
			var width=temp*width;
			oImg.setAttribute("style","width:"+width+"px;height:"+height+"px; align:center;");
			oImg.setAttribute("id",id);
		}
		var rowId = "r" + id;
		document.getElementById(rowId).appendChild(oImg);
		pathDefined=1;

}


function callSlide()
{
if(!grouparr.length) {
for(i =0; i< objectsOnPathArray.length; i ++)
{
if(!objectsOnPathArray[i])
{
	//objectsOnPathArray.splice(i, 1);
//alert("callslide called" +objectsOnPathArray[i]);

}
}
//restoreExecuted = 0;
}
	/*if(!objectsOnPathArray.length)
	{
	createpathobj();
	}
	if(restoreExecuted==1)
	{
		console.log("building grparray");
		createpathobj();
		restoreExecuted=0;
	}*/
	var group;
	var groupPresent=0;
	
	for(var i=0;i<highestImgOnCanvas;i++)
	{
		if(objectsOnPathArray[i])
		{
			if (document.getElementById('myTable'))
			{
				var pathRow=document.getElementById('myTable').insertRow(slideCount);
				var pathCol= pathRow.insertCell(0);
				pathCol.setAttribute("style","width:75px;height:75px;text-align: center;");
				var rowId = "r" + i;
				pathCol.setAttribute("id",rowId);
				slideCount++;
			}
		}
	}
	for(var i=0;i<highestImgOnCanvas;i++)
	{
		//console.log("callslide i = " + i);
		//console.log(objectsOnPathArray[i].type);
		if(objectsOnPathArray[i])
		{
			if(objectsOnPathArray[i].isFrame)
			{
				{				
					//alert("child present");
					group=makeArrayOfFrameObjs(objectsOnPathArray[i]);
					groupPresent=1;
					
				}
							
				if(groupPresent)
				{
					var temp=objectsOnPathArray[i].getWidth()/objectsOnPathArray[i].getHeight();
					
					convertToImage(group,temp,i);
					
					UnGroup(group);
				} 
				else 
				{
					if(objectsOnPathArray[i].isEllipse)
					{
						convertToImage(objectsOnPathArray[i],1,i);
					}
					else
					{
						convertToImage(objectsOnPathArray[i],0,i);
					}
				}
			}
			else if(objectsOnPathArray[i].type=="image")
			{
			
					displaySlide(objectsOnPathArray[i],0,i)
			
			
			}
			else
			{
					if(objectsOnPathArray[i].isEllipse)
					{
						convertToImage(objectsOnPathArray[i],1,i);
					}
					else
					{
						convertToImage(objectsOnPathArray[i],0,i);
					}
			}
			
		}
	} 
	
	var target = document.getElementById('slideBar');
	target.style.display = 'block';
	
	var canvas = document.getElementById('MainHTMLCanvas');
	var table = document.getElementById('myTable');
	var canvasPos = getElementPosition(canvas);


	if((objectsOnPathArray.length * 84) <=(parseInt(canvas.style.height)))
                {
                target.style.height = parseInt(objectsOnPathArray.length * 84) + 'px';
                }
                else
                {
                                target.style.height = parseInt(canvas.style.height) + 'px';
                }

	target.style.top = parseInt(canvasPos.top) + 'px';
	
	var canvasWidth = parseInt(canvas.style.width ? canvas.style.width : canvas.width) ;
	var tableWidth = 85; //hardcoded
	//console.log("W -> " + canvasWidth + " TW -> " + tableWidth);
	target.style.left = parseInt(canvasPos.left + (canvasWidth - tableWidth)) + 'px';
}



function insertButtonForPath()
{
	if(stopPathVar)
	{
		stopPathVar=0;
	}
	else
	{
		return;
	}
	if(!allImagesCreated)
	{
		createImages();
	}
	
	
	var target=document.getElementById('more');
	target.style.display ='block';
	
	for(var i=0;i<highestImgOnCanvas;i++)
	{		
		if(pathImg[i].isPathSet)
		{
			for(var k=1;k<mainFabricCanvas._objects.length;k++)
			{
				
				if(objectsOnPathArray[i]==mainFabricCanvas._objects[k])
				{
						objectsOnPathArray[i]=mainFabricCanvas._objects[k];
						
						if(objectsOnPathArray[i].isFrame)
						{
							//alert(objectsOnPathArray[i].getTop()+(objectsOnPathArray[i].getHeight()/2)-10);
							pathImg[i].setTop(objectsOnPathArray[i].getTop()+(objectsOnPathArray[i].getHeight()/2)-5);
							pathImg[i].setLeft(objectsOnPathArray[i].getLeft());
							mainFabricCanvas.add(pathImg[i]);
							break;
						}
						else
						{
							pathImg[i].setTop(objectsOnPathArray[i].getTop());
							pathImg[i].setLeft(objectsOnPathArray[i].getLeft());
							mainFabricCanvas.add(pathImg[i]);
						}
					
				}
				else
				{
					pathImg[i].isPathSet=0;
				
				}
			}
			
		}
	}
	getMoreImages();//to create next unused 5 images
	customRenderAll();
	
}

function createImages()
{
		for(var i=0; i<20; i++)
		{
			var img = document.getElementById(imgHolder[i]);
					pathImg[i] = new fabric.Image(img);
					pathImg[i].set({ 
						left:50 , 
						top:50,
						width : 40,
						height : 40,
						scaleY: 1,
						scaleX: 1});
			pathImg[i].isPathImg=true;
			pathImg[i].hasControls=false;
			pathImg[i].isPathSet=0;
			pathImg[i].id = counter++;
				
		}
		allImagesCreated=1;
}

function getMoreImages()
{
	sortPath();
	var count=0;
	currCanvasWidthP = mainFabricCanvas.getWidth();
    currCanvasheightP = mainFabricCanvas.getHeight();
	
	for(var t=0;t<20;t++)
	{
		if(!pathImg[t].isPathSet)
		{	
			if(pathImg[t].isImgOnCanvas)
			{
				pathImg[t].isImgOnCanvas=0;
				mainFabricCanvas.remove(pathImg[t]);
			}
		}
	}
	
	for(var t=0;t<20;t++)
	{
		if(count<5 && !pathImg[t].isImgOnCanvas)
			{
					pathImg[t].isImgOnCanvas=1;
					pathImg[t].setLeft(currCanvasWidthP*0.02*t+500);
					pathImg[t].setTop(currCanvasheightP*0.75);
					mainFabricCanvas.add(pathImg[t]);
					count ++;
				
			}
	}
	for(var t=0;t<20;t++)
	{
		if(pathImg[t].isImgOnCanvas)
		{
			highestImgOnCanvas= t+1;
		}
	
	}	
	customRenderAll();
	
}

function sortPath()
{
	for(var t=0;t<20;t++)
	{
		delete objectsOnPathArray[t];
	}
	for( var j=0 ; j<highestImgOnCanvas; j++)
		{
			for(var k=1;k<mainFabricCanvas._objects.length;k++)
			{
				if(!mainFabricCanvas._objects[k].isPathImg && mainFabricCanvas._objects[k].name != "mainInfiniteRect" && isNotTagArea(mainFabricCanvas._objects[k]))
				{
					if(isObjectInFrame(mainFabricCanvas._objects[k],pathImg[j]))
					{		
						objectsOnPathArray[j]=mainFabricCanvas._objects[k];	
						objectsOnPathArray[j].isObjectInPath = true;
						if(objectsOnPathArray[j].isFrame)
						{
							pathImg[j].isPathOnFrame=1;
						}
						else
						{
							pathImg[j].isPathSet=1;
							break;
						}
						
					}
					
					else
					{
						pathImg[j].isPathSet=0;
					}
				}
				
			}
			if(pathImg[j].isPathOnFrame && !pathImg[j].isPathSet)
			{
				pathImg[j].isPathSet=1;
				pathImg[j].isPathOnFrame=0;
			}
			if(pathImg[j].isPathOnFrame && pathImg[j].isPathSet)
			{
				pathImg[j].isPathOnFrame=0;
			}
			
		}
	
}


function stopPath()
{
	var target1 = document.getElementById('myTable');
	target1.style.display ='block';
	if(!objectsOnPathArray.length)
		sortPath();
	stopPathVar=1;
	for(var i = document.getElementById("myTable").rows.length; i > 0;i--)
	{
		document.getElementById("myTable").deleteRow(i -1);
	}
	slideCount=0;
	sortPath();
	
	//for(var i=0;i<highestImgOnCanvas;i++)
		//console.log(objectsOnPathArray[i].type);
	
	for(var i=0;i<highestImgOnCanvas;i++)
	{	
		mainFabricCanvas.remove(pathImg[i]);
	}

	//customRenderAll();
	mainFabricCanvas.renderAll();
	var target=document.getElementById('more');
	target.style.display ='none';
	callSlide();
	
}

function clearPath()
{
	slideCount=0;
	stopPathVar=1;
	pathDefined=0;
	allImagesCreated=0;
	highestImgOnCanvas=0;
	var target=document.getElementById('more');
	target.style.display ='none';
	var target1=document.getElementById('myTable');
	target1.style.display ='none';
	pathArray3D = [];
	for(var i = 0; i < objectsOnPathArray.length; i++)
		objectsOnPathArray[i].pathAdded = false;
	for(var i=0;i<20;i++)
	{
		mainFabricCanvas.remove(pathImg[i]);
	}
	customRenderAll();
	
	for(var t=0;t<20;t++)
	{
		delete pathImg[t];
	} 
	/* for(var t=0;t<20;t++)
	{
		delete objectsOnPathArray[t];
	} */
	objectsOnPathArray = [];
	for(var i = document.getElementById("myTable").rows.length; i > 0;i--)
	{
	document.getElementById("myTable").deleteRow(i -1);
	}
	
}

function getPathIndex(ev)
{
	
	var IsPlayMode = getPlayModeTag();
	var prevId=Imgid;
	if(ev.target.id == "" || ev.target.id == undefined)
		return;
	var len = objectsOnPathArray.length;
	 Imgid = ev.target.id;
	 //console.log("objectsOnPathArray[Imgid] " + objectsOnPathArray[Imgid] )
	if(objectsOnPathArray[Imgid])
	{ 		
		var imgInRow =document.getElementById(Imgid);
		imgInRow.style.border = "ridge";
		if(prevId!=-1)
		{
			var prevImgInRow =document.getElementById(prevId);
			prevImgInRow.style.border = "none";
			if(objectsOnPathArray[Imgid] && objectsOnPathArray[Imgid].type != "text")     
				objectsOnPathArray[prevId].setStrokeWidth(document.getElementById('StrokeWidth').value);
			
		}
		if(objectsOnPathArray[Imgid] && objectsOnPathArray[Imgid].type != "text")     
			objectsOnPathArray[Imgid].setStrokeWidth((parseInt(objectsOnPathArray[Imgid].strokeWidth))+2);
		mainFabricCanvas.setActiveObject(objectsOnPathArray[Imgid]);
		if(IsPlayMode )
		{
			cameraAnimationObject(objectsOnPathArray[Imgid]);
		} else {		
			var obj =objectsOnPathArray[Imgid];
			goToSpecificViewPort(objectsOnPathArray[Imgid]);		
		}
	}
}


function startUserDefinedAPath()
{
	var fullPath = document.getElementById('StartUserDefinedAPath').src;
	var filename = fullPath.replace(/^.*[\\\/]/, '');
	if(filename == 'start_path.png')
	{
			document.getElementById('StartUserDefinedAPath').src = 'resources/stop_path.png';
			objectUnderuserPathDef=1;
	}
	else
	{
		document.getElementById('StartUserDefinedAPath').src = 'resources/start_path.png'
		objectUnderuserPathDef=0;

	}
}

function captureDefiningPath(e) 
{
	if(objectUnderPathDef && !objectUnderPathDef.isSlideObj && objectUnderPathDef.name != "mainInfiniteRect" && isNotTagArea(objectUnderPathDef))
	{
		var pointer = mainFabricCanvas.getPointer(e);
		objectUnderPathDef.xPath[objectUnderPathDef.xLen]=pointer.x;
		objectUnderPathDef.yPath[objectUnderPathDef.yLen]=pointer.y;
		objectUnderPathDef.xLen++;
		objectUnderPathDef.yLen++;		 

		mainFabricCanvas.contextTop.lineTo(pointer.x, pointer.y);
		mainFabricCanvas.contextTop.stroke();
	 }
}