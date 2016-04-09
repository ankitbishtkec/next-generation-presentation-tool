var insertTop = 200;
var insertLeft = 100;
var exampleLoadStatus=false;
var objectBackup;
var oImgs=new Array(5);
var len;
var currentTheme;
var intervalAngle1;
var intervalAngle2;
function LoadGalaxy()
{

	try
	{	
		ClearPath();
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
		applyTheme('galaxyTheme');
		var activeObject = mainInfiniteRect;
		intervalVariable=setInterval(function animateInfiniteLinear() {
							infiniteUp(activeObject);
							customRenderAll();
							//setTimeout(animateR, 1);
							}, 30);
		activeObject.infiniteNav=1;
		activeObject.Iinterval = intervalVariable;		
	}
   
         catch(e)
	{
		alert(e.message);
	}
	 DrawStarsAndAnimate(); 
			
 }  
 
                
	function DrawStarsAndAnimate()
	{
	 currCanvasWidth = mainFabricCanvas.getWidth();
	 currCanvasheight = mainFabricCanvas.getHeight();
	
		var imgs=new Array(5);
				
				imgs[0]=document.getElementById('starimage1');
				imgs[1]=document.getElementById('starimage2');
				imgs[2]=document.getElementById('starimage3');
				imgs[3]=document.getElementById('starimage4');
				imgs[4]=document.getElementById('starimage5');
				
				
				var topvalue=new Array(currCanvasheight*0.1,currCanvasheight*0.8,currCanvasheight *0.5, currCanvasheight*0.6,currCanvasheight*0.3);
				var leftvalue=new Array(currCanvasWidth*0.1, currCanvasWidth*0.2, currCanvasWidth*0.4, currCanvasWidth*0.6, currCanvasWidth*0.85);
				for (i=0; i<5; i++)
					{ 
						  oImgs[i]=new fabric.Image(imgs[i]);
						  oImgs[i].set({ 
							left:leftvalue[i], 
							top:topvalue[i],
							width : (40+30*i),
							height : (40+30*i),
							scaleY: 1,
							scaleX: 1
							
						});
                                                      
						oImgs[i].setOpacity(document.getElementById('TransperencySlider').value);
						
						mainFabricCanvas.add(oImgs[i]);
						  

					}
				   // RotatateInternal(oImgs[4]);
					//RotatateInternal(oImgs[1]);
					{

					var intervalVariable;
					var activeObject = oImgs[4];
					
					activeObject.animateSpeed = 1; //Default speed
					animateRotateStatus = 1;
					intervalAngle1 = setInterval(function animateR() {
										animateAngle(activeObject);
										customRenderAll();
										// setTimeout(animateR, 1);
										}, 1);
										
					oImgs[4].interval = intervalAngle1;	
				}
				{
					var intervalVariable1;
					var activeObject1 = oImgs[1];
					
					activeObject1.animateSpeed = 6 //Default speed
					animateRotateStatus = 1;
					intervalAngle2 = setInterval(function animateR() {
										animateAngle(activeObject1);
										customRenderAll();
										// setTimeout(animateR, 1);
										}, 1);
										
					oImgs[1].interval = intervalAngle2;	
				}
					
	
				
				for (i=2; i<5; i++)
				{
						animateZoomStatus = 1;
						var obj = oImgs[i];
						obj.zoomSpeed = 50;
						obj.zoomFactorOrig = 1.6;
						obj.zoomFactorTemp = 1.1;
						animateZoomIn(obj);		 
						
						
				}
				{
					animateLinearStatus=1;
					aObject = oImgs[0];
					aObject.linearSpeed = 1; //Default Speed
					animateLeft(aObject,0,1);
				}

				for (i=0; i<5; i++)
				{
				 oImgs[i].set({ selectable:false,hasControls:false}); 
				}
				exampleLoadStatus= true;
				
				
}


function IsExampleLoaded()
{
try{
	if(exampleLoadStatus== true)
	{
		for (i=0; i<5; i++)
		{
			removeObject(oImgs[i])
			
		}
		applyAnimation("stopAnimation");
		if(currentTheme)
		{	
			clearInterval(mainInfiniteRect.Iinterval);
			applyTheme(currentTheme);
			
		}
		
	
	for(i=2; i <len; i++)
		{
			if(objectBackup[i])
			{
				 //alert(objectBackup[i]);
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
			}
		}
	}
}
catch(e)
{
	alert(e.message);
	
}	
	exampleLoadStatus= false;

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
				
           
   
