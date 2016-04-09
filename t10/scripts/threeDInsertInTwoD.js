function makeObjectThreeD( object, hasColor, threeDtype )
{			
	object.is3D = true;
	object.lockScalingX = true;
	object.lockScalingY = true;
	object.lockUniScaling = true;
	object.lockRotation = true;
	var threeDProperties = new Object();
	{
		threeDProperties.threeDtype = threeDtype;
		threeDProperties.scaleX = 1;
		threeDProperties.scaleY = 1;
		threeDProperties.scaleZ = 1;
		threeDProperties.rotationX = 0;
		threeDProperties.rotationY = 0;
		threeDProperties.rotationZ = 0;
		threeDProperties.hasColor = hasColor;
		threeDProperties.color = 0x00ff00;//green by default strictly if u change it kindly change the images of 3d objects in 3d also.
		threeDProperties.opacity = 1;
	}
	object.threeDProperties = threeDProperties;
}

//this function inserts all type of three D object's image to 2d canvas
//kindly do not change values in it these are kept thoughtfully 
function drawThreeD(input)
{
	try{
		var img = document.getElementById(input);
		var oImg = new fabric.Image(img);
		oImg.id = counter;
		counter++;
	switch( input )
    {
        case '3DCube':
			oImg.set({ 
				left: 300, 
				top: 300,
				width : 100,
				height : 100,
				scaleY: 1,
				scaleX: 1
			});
            break;
                
        case '3DBoy':
			oImg.set({ 
				left: 300, 
				top: 300,
				width : 75,
				height : 186,
				scaleY: 1,
				scaleX: 1
			});
            break;
            
        case '3DGirl':
			oImg.set({ 
				left: 300, 
				top: 300,
				width : 58,
				height : 176,
				scaleY: 1,
				scaleX: 1
			});
            break;

        case '3DDuck':
			oImg.set({ 
				left: 300, 
				top: 300,
				width : 175,
				height : 166,
				scaleY: 1,
				scaleX: 1
			});
            break;
            
        case '3DHouse':
			oImg.set({ 
				left: 300, 
				top: 300,
				width : 581,
				height : 308,
				scaleY: 1,
				scaleX: 1
			});
            break;

        case '3DTruck':
			oImg.set({ 
				left: 300, 
				top: 300,
				width : 397,
				height : 136,
				scaleY: 1,
				scaleX: 1
			});
            break;
	}	
		mainFabricCanvas.add(oImg);
		
		if( input == '3DCube' )
		makeObjectThreeD( oImg, true, input );
		else
		makeObjectThreeD( oImg, false, input );
		
		if( input == '3DTruck' )
		{
			oImg.threeDProperties.rotationX = -(Math.PI/2);
			oImg.threeDProperties.rotationZ = Math.PI/2;
		}
		frameSort();
		customRenderAll();
		return;
	}
	catch(e){
		alert(e.message);
	}	
}