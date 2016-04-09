

var doubleClicked = null;
var contentViewingMode = false;
var zMovement = 0,clickedFaceNormal;

var targetCamera = new Object();
targetCamera.x = 0,targetCamera.y = 0,targetCamera.z = 0;
targetCamera.rotationX = 0, targetCamera.rotationY = 0, targetCamera.rotationZ = 0;

var cameraPath = new Object();
cameraPath.x = 0,cameraPath.y = 0,cameraPath.z = 0;
cameraPath.rotationX = 0,cameraPath.rotationY = 0,cameraPath.rotationZ = 0;

var saveCamera = new Object();
saveCamera.x = 0,saveCamera.y = 0,saveCamera.z = 0;
saveCamera.rotationX = 0,saveCamera.rotationY = 0,saveCamera.rotationZ = 0;

var prevTempRotation = new Object();
prevTempRotation.x = 0, prevTempRotation.y =0,prevTempRotation.z = 0;

var towardsPositiveX = false, towardsPositiveY = false, towardsPositiveZ = false;

var noMoreCenterCamera = false;
var resetCamera = false;
var speedRatio = 450;
var pathObjectCount = -1;
var autoPlay = false;
var pathArrayLength = 0;
var timerID = 0; //remove this if slide show is not working!
var speedAnimation = 0;
var distanceFactor = 0.65;
var one = 1.000000;

function isCube(INTERSECTED) {
		if(INTERSECTED.geometry instanceof(THREE.CubeGeometry))
			return true;
		else 
			return false;
	}

function isText(INTERSECTED) {
	if(INTERSECTED instanceof Array)
	{
		if(INTERSECTED[0].geometry instanceof(THREE.TextGeometry))
			return true;
	}
	else 
		return false;
}

function findMaxWidthObjectInParagraph(targetObject) {
	var maximumWidthObject;
	var textArray;
	var j,k;
	var flag = false;
	for(j=0;j<textPara3dObjectArray3D.length; j++)
	{
		if(!flag)
		{
			textArray = textPara3dObjectArray3D[j];
			for(k=0;k<textArray.length; k++)
			{
				if(targetObject == textArray[k])
				{
					maximumWidthObject= (textPara3dObjectArray3D[j])[0];
					flag = true;
					break;
				}
			}
		}
		else
			break;
	}
	for(var i=1;i<textArray.length; i++)
	{
		if(textArray[i].geometry.boundingSphere.radius > maximumWidthObject.geometry.boundingSphere.radius)
			maximumWidthObject = textArray[i];
	}
	return maximumWidthObject;
}

function saveTarget(targetObject,objectGeometry,clickedFaceNormal) {
		if (!isText(targetObject)) {
		var objectWidth = objectGeometry.boundingSphere.radius;
		var scaleTarget = new Object();
		scaleTarget.x = targetObject.scale.x;
		scaleTarget.y = targetObject.scale.y;
		scaleTarget.z = targetObject.scale.z;
		scaleValue = scaleTarget.x+scaleTarget.y+scaleTarget.z;
		
		if(scaleTarget.x == one && scaleTarget.y == one && scaleTarget.z == one)
			distanceFactor = 0.8;
		
		var distanceWithCamera = distanceFactor*objectWidth*scaleValue;
		
		saveCamera.x = camera.position.x;
		saveCamera.y = camera.position.y;
		saveCamera.z = camera.position.z;
		saveCamera.rotationX = camera.rotation.x;
		saveCamera.rotationY = camera.rotation.y;
		saveCamera.rotationZ = camera.rotation.z;
		
		if(isCube(targetObject))
		{
			if(clickedFaceNormal.x == 1)
				{
					targetCamera.x = targetObject.position.x + distanceWithCamera;
					targetCamera.y = targetObject.position.y;
					targetCamera.z = targetObject.position.z;
					targetCamera.rotationX = targetObject.rotation.x;
					targetCamera.rotationY = 1.6;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
			else if(clickedFaceNormal.x == -1)
				{
					targetCamera.x = targetObject.position.x - distanceWithCamera;
					targetCamera.y = targetObject.position.y;
					targetCamera.z = targetObject.position.z;
					targetCamera.rotationX = targetObject.rotation.x;
					targetCamera.rotationY = -1.6;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
			else if(clickedFaceNormal.y == 1)
				{
					targetCamera.x = targetObject.position.x;
					targetCamera.y = targetObject.position.y + distanceWithCamera;
					targetCamera.z = targetObject.position.z;
					targetCamera.rotationX = -1.6;
					targetCamera.rotationY = targetObject.rotation.y;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
			else if(clickedFaceNormal.y == -1)
				{
					targetCamera.x = targetObject.position.x;
					targetCamera.y = targetObject.position.y - distanceWithCamera;
					targetCamera.z = targetObject.position.z;
					targetCamera.rotationX = 1.6;
					targetCamera.rotationY = targetObject.rotation.y;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
			else if(clickedFaceNormal.z == 1)
				{
					targetCamera.x = targetObject.position.x;
					targetCamera.y = targetObject.position.y;
					targetCamera.z = targetObject.position.z + distanceWithCamera;
					targetCamera.rotationX = 0;
					targetCamera.rotationY = targetObject.rotation.y;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
			else if(clickedFaceNormal.z == -1)
				{
					targetCamera.x = targetObject.position.x;
					targetCamera.y = targetObject.position.y;
					targetCamera.z = targetObject.position.z - distanceWithCamera;
					targetCamera.rotationX = -3.2;
					targetCamera.rotationY = targetObject.rotation.y;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
			if(targetObject.frame3D == true)
				{
					targetCamera.x = targetObject.position.x;
					targetCamera.y = targetObject.position.y;
					targetCamera.z = targetObject.position.z + distanceWithCamera;
					targetCamera.rotationX = 0;
					targetCamera.rotationY = targetObject.rotation.y;
					targetCamera.rotationZ = targetObject.rotation.z;
				}
		}
				
		else
		{
			targetCamera.x = targetObject.position.x;
			targetCamera.y = targetObject.position.y ;
			targetCamera.z = targetObject.position.z + distanceWithCamera;	
			targetCamera.rotationX = targetObject.rotation.x;
			targetCamera.rotationY = targetObject.rotation.y;
			targetCamera.rotationZ = targetObject.rotation.z;
		}
			
		}
		else if (isText(targetObject))
		{
			if(!targetObject.paragraphed)
			{
				targetObject = targetObject[0];
				objectGeometry = targetObject.geometry;
				objectWidth = objectGeometry.boundingSphere.radius;
				var dist = camera.position.x - targetObject.position.x;
				
				var vFOV = 0.872664626; //50 degrees into radians .. perspective camera
				hFOV = vFOV*aspect;
				//var e = Math.tan(hFOV)/2.5;
				var e = 1.6;
							
				distanceWithCamera = distanceFactor*objectWidth*e;
				targetCamera.x = targetObject.position.x +(distanceWithCamera/2);
				targetCamera.y = targetObject.position.y ;
				targetCamera.z = targetObject.position.z + distanceWithCamera;
				if(targetObject.rotation.x || targetObject.rotation.y || targetObject.rotation.z)
				{
					targetCamera.rotationX = targetObject.rotation.y;
					targetCamera.rotationY = targetObject.rotation.z;
					targetCamera.rotationZ = targetObject.rotation.x;
				}
			}
			else
			{
				var maxWidthObject = findMaxWidthObjectInParagraph(targetObject);
				var e = 1.6;
				
				objectWidth = maxWidthObject.geometry.boundingSphere.radius;
							
				distanceWithCamera = distanceFactor*objectWidth*e;
				targetCamera.x = maxWidthObject.position.x +(distanceWithCamera/2);
				targetCamera.y = maxWidthObject.position.y ;
				targetCamera.z = maxWidthObject.position.z + distanceWithCamera;
				if(maxWidthObject.rotation.x || maxWidthObject.rotation.y || maxWidthObject.rotation.z)
				{
					targetCamera.rotationX = maxWidthObject.rotation.y;
					targetCamera.rotationY = maxWidthObject.rotation.z;
					targetCamera.rotationZ = maxWidthObject.rotation.x;
				}
			}
		}

			
			cameraPath.x = camera.position.x - targetCamera.x;
			cameraPath.y = camera.position.y - targetCamera.y;
			cameraPath.z = camera.position.z - targetCamera.z;
			
			if(targetCamera.rotationX < camera.rotation.x)
			{
				cameraPath.rotationX = camera.rotation.x - targetCamera.rotationX;
				towardsPositiveX = false;
			}
			else if(targetCamera.rotationX > camera.rotation.x)
			{
				cameraPath.rotationX = targetCamera.rotationX - camera.rotation.x;
				towardsPositiveX = true;
			}
			if(targetCamera.rotationY < camera.rotation.y)
			{
				cameraPath.rotationY = camera.rotation.y - targetCamera.rotationY;
				towardsPositiveY = false;
			}
			else if(targetCamera.rotationY > camera.rotation.y)
			{
				cameraPath.rotationY = targetCamera.rotationY - camera.rotation.y;
				towardsPositiveY = true;
			}
			if(targetCamera.rotationZ< camera.rotation.z)
			{
				cameraPath.rotationZ = camera.rotation.z - targetCamera.rotationZ;
				towardsPositiveZ = false;
			}
			else if(targetCamera.rotationY > camera.rotation.y)
			{
				cameraPath.rotationZ = targetCamera.rotationZ - camera.rotation.z;
				towardsPositiveZ = true;
			}
			
			cameraPath.x = cameraPath.x/speedRatio;  
			cameraPath.y = cameraPath.y/speedRatio; 
			cameraPath.z = cameraPath.z/speedRatio;
			//console.log("Total Camera Path");
			//console.log(cameraPath.x,cameraPath.y,cameraPath.z,cameraPath.rotationX,cameraPath.rotationY);
			cameraPath.rotationX = cameraPath.rotationX/speedRatio;
			cameraPath.rotationY = cameraPath.rotationY/speedRatio;
			cameraPath.rotationZ = cameraPath.rotationZ/speedRatio;
			prevTempRotation.x = camera.rotation.x;
			prevTempRotation.y = camera.rotation.y;
			prevTempRotation.z = camera.rotation.z;
		
		//USEFUL LOGS -- PLEASE DON'T DELETE
		/*console.log("TargetCamera");
		console.log(targetCamera.x,targetCamera.y,targetCamera.z,targetCamera.rotationX,targetCamera.rotationY);
		console.log("Current camera position");
		console.log(camera.position.x,camera.position.y,camera.position.z,camera.rotation.x,camera.rotation.y);
		console.log("Camera Path");
		console.log(cameraPath.x,cameraPath.y,cameraPath.z,cameraPath.rotationX,cameraPath.rotationY);
		console.log("Previous rotation");
		console.log(prevTempRotation.x,prevTempRotation.y);
		
		console.log(targetObject.rotation.x,targetObject.rotation.y,targetObject.rotation.z);*/
		//targetObject.rotation.set(0,0,0);			
		speedAnimation = speedRatio;
		
	}

	function resetTarget(targetObject) {
		targetCamera.x = saveCamera.x;
		targetCamera.y = saveCamera.y;
		targetCamera.z = saveCamera.z;
		targetCamera.rotationX = saveCamera.rotationX;
		targetCamera.rotationY = saveCamera.rotationY;
		targetCamera.rotationZ = saveCamera.rotationZ;
		
		cameraPath.x = targetCamera.x - camera.position.x ;
		cameraPath.y = targetCamera.y - camera.position.y ;
		cameraPath.z = targetCamera.z - camera.position.z ;
		
		if(targetCamera.rotationX < camera.rotation.x)
		{
			cameraPath.rotationX = camera.rotation.x - targetCamera.rotationX;
			towardsPositiveX = false;
		}
		else if(targetCamera.rotationX > camera.rotation.x)
		{
			cameraPath.rotationX = targetCamera.rotationX - camera.rotation.x;
			towardsPositiveX = true;
		}
		if(targetCamera.rotationY < camera.rotation.y)
		{
			cameraPath.rotationY = camera.rotation.y - targetCamera.rotationY;
			towardsPositiveY = false;
		}
		else if(targetCamera.rotationY > camera.rotation.y)
		{
			cameraPath.rotationY = targetCamera.rotationY - camera.rotation.y;
			towardsPositiveY = true;
		}
		if(targetCamera.rotationZ < camera.rotation.z)
		{
			cameraPath.rotationZ = camera.rotation.z - targetCamera.rotationZ;
			towardsPositiveZ = false;
		}
		else if(targetCamera.rotationZ > camera.rotation.z)
		{
			cameraPath.rotationZ = targetCamera.rotationZ - camera.rotation.z;
			towardsPositiveZ = true;
		}
		
		cameraPath.x = cameraPath.x/speedRatio;  
		cameraPath.y = cameraPath.y/speedRatio; 
		cameraPath.z = cameraPath.z/speedRatio;
		console.log("Total Camera Path");
		console.log(cameraPath.x,cameraPath.y,cameraPath.z,cameraPath.rotationX,cameraPath.rotationY);
		cameraPath.rotationX = cameraPath.rotationX/speedRatio;
		cameraPath.rotationY = cameraPath.rotationY/speedRatio;
		cameraPath.rotationZ = cameraPath.rotationZ/speedRatio;
		prevTempRotation.x = camera.rotation.x;
		prevTempRotation.y = camera.rotation.y;
		prevTempRotation.z = camera.rotation.z;
		
		//USEFUL LOGS -- PLEASE DON'T DELETE
		/*console.log("TargetCamera");
		console.log(targetCamera.x,targetCamera.y,targetCamera.z,targetCamera.rotationX,targetCamera.rotationY);
		console.log("Current camera position");
		console.log(camera.position.x,camera.position.y,camera.position.z,camera.rotation.x,camera.rotation.y);
		console.log("Camera Path");
		console.log(cameraPath.x,cameraPath.y,cameraPath.z,cameraPath.rotationX,cameraPath.rotationY);
		console.log("Previous rotation");
		console.log(prevTempRotation.x,prevTempRotation.y);*/
		
	}