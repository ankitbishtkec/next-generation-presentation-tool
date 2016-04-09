var fake3DExampleLoadStatus=false;
var exampleObjects;

function LoadFake3D()
{

	try
	{	//start object backup
		clearPath();
		len=mainFabricCanvas._objects.length;
		objectBackup=new Array(mainFabricCanvas._objects.length-1);
		var tagsubString="right";
		var i;
		for(i=len-1; i >= 2; i--)
		{	
			//alert(mainFabricCanvas._objects[i]);
			tagsubString="right";
			if(mainFabricCanvas._objects[i].name)
			{
				tagsubString = mainFabricCanvas._objects[i].name.substring(0,4);
			}
			if(!(tagsubString=="TAG_"))
			{
				
				objectBackup[i]=mainFabricCanvas._objects[i];
				removeObject(objectBackup[i]);
				//alert(objectBackup[i]);
			 }
			
		}
		
	}
	 catch(e)
	{
		alert(e.message);
	}
	try
	{
		if(currTheme)
		{
			currentTheme=currTheme;	
		}
		
		if(mainInfiniteRect.Iinterval)
		{
			clearInterval(mainInfiniteRect.Iinterval);
		}
		//end objet backup
		applyTheme('defaultTheme');	
		loadImageAndFocuses(); 
	}
   
         catch(e)
	{
		alert(e.message);
	}
			
 }  
 
                
	function loadImageAndFocuses()
	{
		exampleObjects = new Array();
		currCanvasWidth = mainFabricCanvas.getWidth();
		currCanvasheight = mainFabricCanvas.getHeight();
		var img = document.getElementById('SampleImage1');
		baseThreeDImage = new fabric.Image(img);
		baseThreeDImage.set({ 
			left: currCanvasWidth / 2, 
			top: currCanvasheight / 2,
			width : (650 * 1.40),
			height : 650,
			scaleY: 1,
			scaleX: 1
		});
		mainFabricCanvas.add( baseThreeDImage );
		exampleObjects[exampleObjects.length] = baseThreeDImage;
		
		
		//100 124 420 385
		//36 36 642 236
		//37 43 635 333
		//175 210 786 430
		//17 17 538 305
		//25 25 436 518
		//30 30 987 372
		//w h l t
		//27 31 1061 335
		//27 31 1222 334
		//78 103 1152 360
		//281 63 491 577
		//285 51 1045 524
				
		var rect = new fabric.Rect({
		        width: 100,
                height: 124,
                left: 420,
                top: 385});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 36,
                height: 36,
                left: 642,
                top: 236});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 37,
                height: 43,
                left: 635,
                top: 333});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 175,
                height: 210,
                left: 786,
                top: 430});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 17,
                height: 17,
                left: 538,
                top: 305});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 25,
                height: 25,
                left: 436,
                top: 518});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 30,
                height: 30,
                left: 987,
                top: 372});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 27,
                height: 31,
                left: 1061,
                top: 335});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 27   ,
                height: 31,
                left: 1222,
                top: 334});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 78   ,
                height: 103,
                left: 1152,
                top: 360});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 281   ,
                height: 63,
                left: 491,
                top: 577});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		rect = new fabric.Rect({
		        width: 285,
                height: 51,
                left: 1045,
                top: 524});
    	rect.setOpacity(0);
    	mainFabricCanvas.add(rect);
		rect.hasControls = rect.hasBorders = false;
		exampleObjects[exampleObjects.length] = rect;
		
		var count;
		for(count=0 ; count < exampleObjects.length ; count++ )
		{
			var obj = exampleObjects[count];
			obj.lockMovementX = true;
			obj.lockMovementY = true;
			obj.lockScalingX = true;
			obj.lockScalingY = true;
		    obj.lockUniScaling = true;
		    obj.lockRotation = true;
		}
		changePlayMode("pers3d");
		fake3DExampleLoadStatus= true;
	}


function IsThreeDExampleLoaded()
{
try{
	if(fake3DExampleLoadStatus== true)
	{
		var count;
		for(count=0 ; count < exampleObjects.length ; count++ )
		{
			var obj = exampleObjects[count];
			removeObject( obj );	
		}
		//start of restore
		if(currentTheme)
		{	
			clearInterval(mainInfiniteRect.Iinterval);
			applyTheme(currentTheme);
			
		}
		
	
	for(i=2; i <len; i++)
		{
			if(objectBackup[i])
			{
				mainFabricCanvas.add(objectBackup[i]);
				activeObject = objectBackup[i];	
				
				if(objectBackup[i].isRotate==1)
				{	
					RotatateInternal(objectBackup[i]);						
				}
				if(objectBackup[i].isLinear==1)
				{
					animateLinearStatus = 1;
					aObject =objectBackup[i];
					aObject.linearSpeed = 1; //Default Speed
					animateLeft(aObject,0,1);
					
				}
				if(objectBackup[i].isZoom==1)
				{	
					animateZoomStatus = 1;
					var obj = objectBackup[i];	
					obj.zoomSpeed = 50;
					obj.zoomFactorOrig = 1.6;
					obj.zoomFactorTemp = 1.1;
					animateZoomIn(obj);						
				}
			}//end of restore
		}
	}
}
catch(e)
{
	alert(e.message);
	
}	
	fake3DExampleLoadStatus= false;

}

function RotatateInternal(obj)
{
	var activeObject=obj;
	animateSpeed = 1; //Default speed
					animateRotateStatus = 1;
					intervalVar = setInterval(function animateR() {
										animateAngle(activeObject);
										customRenderAll();
										// setTimeout(animateR, 1);
									}, 1);
									activeObject.interval = intervalVar;

}
				
           
   
