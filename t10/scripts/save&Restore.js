var restoreExecuted;
var grouparr = new Array();
var objectsOnPathArrayarr = new Array();
var json1;

function saveContent()
{
	tagIt("EnteringPlayMode");

	for(var i =0 ; i < pathImg.length; i++)
	{
		var new1;
		var name = "pathImgisPathSet"+i;
		name1 = "pathImgisImageOnCanvas"+i;
		//new1 = JSON.stringify( pathImg[i].toJSON() );
		if(pathImg[i] && pathImg[i].isPathSet)
		{
		localStorage.setItem(name,pathImg[i].isPathSet);
		localStorage.setItem(name1,pathImg[i].isImgOnCanvas);
		}
		
		
		//name = "pathImgisImageOnCanvas"+i;
		//if(pathImg[i] && pathImg[i].isImgOnCanvas)
		//localStorage.setItem(name,pathImg[i].isImgOnCanvas);
		name = "pathImgid"+i;
		if(pathImg[i] && pathImg[i].id)
		localStorage.setItem(name,pathImg[i].id);
	}
	
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
		var name = "objStoreX1"+i;
		//console.log(name);
		localStorage.setItem(name, objStoreX1[i]);		
	}
	for(var i =0; i<objStoreY.length;i++)
	{
		var name = "objStoreY"+i;
		//console.log(name);
		localStorage.setItem(name, objStoreY[i]);
		
		var name = "objStoreY1"+i;
		//console.log(name);
		localStorage.setItem(name, objStoreY1[i]);		
	}             
	 //localStorage.setItem('objStoreX', objStoreX);
	//localStorage.setItem('objStoreY', objStoreY);
	localStorage.setItem('tagsCount', tagsCount);
	localStorage.setItem('tagsCount1', tagsCount1);
	localStorage.setItem('canvasScaleFactor', canvasScaleFactor);
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
}

function loadXMLDoc()
{
	var dialog = document.getElementById('saveRestore');
	document.getElementById('recid').value = "";
	target = document.getElementById('restoreWrite');	
	dialog.style.display = 'none';
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
		document.getElementById("jsonrec").value=xmlhttp.responseText;
			restoreContent();

		}

	  }

	  var str = document.getElementById('restoreWrite').value;
	  var newstr =  str.split('\\'); 
	  newstr=newstr[2];
	  
	newstr="php/"+newstr;
	xmlhttp.open("GET",newstr,true);
	xmlhttp.send();

	target.value = "";
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
	
	objStoreX1=[];
	objStoreY1=[];
	tagsCount1=0;	
	var len = localStorage.getItem('length');
	for(var i =0; i<len;i++)
	{
					var name = "objStoreX"+i;
					//console.log(name);
					objStoreX[i]=parseInt(localStorage.getItem(name));
					
					var name = "objStoreX1"+i;
					//console.log(name);
					objStoreX1[i]=parseInt(localStorage.getItem(name));		
//console.log("objStoreX1[i] "+objStoreX1[i]);					
	}
	for(var i =0; i<len;i++)
	{
					var name = "objStoreY"+i;
					//console.log(name);
					objStoreY[i]=parseInt(localStorage.getItem(name));
					
					var name = "objStoreY1"+i;
					//console.log(name);
					objStoreY1[i]=parseInt(localStorage.getItem(name));	
//console.log("objStoreY1[i] "+objStoreY1[i]);					
	}                            
	

	tagsCount = localStorage.getItem('tagsCount');
	tagsCount1 = localStorage.getItem('tagsCount1');
	canvasScaleFactor = localStorage.getItem('canvasScaleFactor');
	

	
	var tagindex = tagsCount-1;
	//canvasScaleFactor=1;
	tagsCount--;
	tagsCount--;
	mainInfiniteRect.setLeft(objStoreX[tagindex] * canvasScaleFactor);
	mainInfiniteRect.setTop(objStoreY[tagindex] * canvasScaleFactor);
	tagsCount1--;
	tagsCount1--;
	restoreAudio();

	objectsToGroup=[];

	customRenderAll();
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
		if(xSTR)
		{
			obj.xPath= (xSTR.split(","));
			obj.yPath= (ySTR.split(","));
		}
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
	mainFabricCanvas.forEachObject(function(obj) {

	for(var i =0 ; i<objectsOnPathArrayarr.length; i++) {
			//console.log(" in createpathobj"+obj.id);
		if(objectsOnPathArrayarr[i] == obj.id )
		{
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
		