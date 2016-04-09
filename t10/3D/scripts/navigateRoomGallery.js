//navigation start
var navigation = {
	moveForward : false,
	moveBackward : false,
	moveLeft : false,
	moveRight : false,
	moveUp : false,
	moveDown : false,
	enable : false
};


var PI_2 = Math.PI / 2;


var cameraBackup= new Object();

function r_pointerlockchange( event ) {

if( navigation.enable == true)
{//out

	r_camera.rotation.x = cameraBackup.rotationX;
	r_camera.rotation.y = cameraBackup.rotationY;
	r_camera.rotation.z = cameraBackup.rotationZ;
	r_camera.position.x = cameraBackup.positionX;
	r_camera.position.y = cameraBackup.positionY;
	r_camera.position.z = cameraBackup.positionZ;
	navigation.enable = false;
	document.removeEventListener( 'mousemove', r_onMouseMoveNavigation );
	
	document.removeEventListener( 'pointerlockchange', r_pointerlockchange, false );
	document.removeEventListener( 'mozpointerlockchange', r_pointerlockchange, false );
	document.removeEventListener( 'webkitpointerlockchange', r_pointerlockchange, false );
	document.removeEventListener( 'pointerlockerror', r_pointerlockerror, false );
	document.removeEventListener( 'mozpointerlockerror', r_pointerlockerror, false );
	document.removeEventListener( 'webkitpointerlockerror', r_pointerlockerror, false );
	
	document.removeEventListener( 'keydown', keyDownOnRoomGallery, false );
	document.removeEventListener( 'keyup', keyUpOnRoomGallery, false );
	
}
else
{//in
	//backup start
	cameraBackup.rotationX = r_camera.rotation.x;
	cameraBackup.rotationY = r_camera.rotation.y;
	cameraBackup.rotationZ = r_camera.rotation.z;
	cameraBackup.positionX = r_camera.position.x;
	cameraBackup.positionY = r_camera.position.y;
	cameraBackup.positionZ = r_camera.position.z;
	//backup end
	
	r_camera.rotation.x = 0;
	r_camera.rotation.y = 0;
	r_camera.rotation.z = 0;
	r_camera.position.x = 0;
	r_camera.position.y = 0;
	r_camera.position.z = 1100;
	navigation.enable = true;	
	document.addEventListener( 'mousemove', r_onMouseMoveNavigation, false );
}

}

function r_pointerlockerror( event ) {

alert("Your browser is not supported. Using the application will show inconsistent behavior");

}
function r_onMouseMoveNavigation(event){

	console.log("r_onMouseMoveNavigation");	
	try{		
		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		r_camera.rotation.y -= movementX * 0.001;
		r_updateNavigation(5);
	
	}
	catch(e)
	{
	alert(e.message);
	}

}

function keyDownOnRoomGallery( event ) {
		
		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				navigation.moveForward = true;
				break;

			case 37: // left
			case 65: // a
				navigation.moveLeft = true; break;

			case 40: // down
			case 83: // s
				navigation.moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				navigation.moveRight = true;
				break;
				
				
			case 81: // q
				navigation.moveUp = true;
				break;

			case 69: // e
				navigation.moveDown = true;
				break;
		}
		
		if (event.preventDefault)
			event.preventDefault();
			
        event.returnValue = false;
        return false;

}


function keyUpOnRoomGallery( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				navigation.moveForward = false;
				break;

			case 37: // left
			case 65: // a
				navigation.moveLeft = false;
				break;

			case 40: // down
			case 83: // a
				navigation.moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				navigation.moveRight = false;
				break;
				
			case 81: // q
				navigation.moveUp = false;
				break;

			case 69: // e
				navigation.moveDown = false;
				break;

		}
}


function r_updateNavigation( delta ) {

	delta = 5;
	if ( navigation.moveForward ) delta = (-1) * delta;
	if ( navigation.moveBackward ) delta = (1) * delta;

	if ( navigation.moveLeft ) delta = (-1) * delta;
	if ( navigation.moveRight ) delta = (1) * delta;

	if ( navigation.moveUp ) delta = (-1) * delta;
	if ( navigation.moveDown ) delta = (1) * delta;
	
		if( navigation.moveForward || navigation.moveBackward)
		{
			r_camera.translateZ( delta );
			//console.log("Z --> " + r_camera.position.z);
		}
		else if (navigation.moveLeft || navigation.moveRight)
		{
			r_camera.translateX( delta );
			//console.log("X --> " + r_camera.position.x);
		}
		else if(navigation.moveUp || navigation.moveDown)
		{
			r_camera.translateY(delta);
			//console.log("Y --> " + r_camera.position.y);
		}	

		var maxZ = roomBoxConfig.depth/2 - 100;
		if(r_camera.position.z > maxZ)
			r_camera.position.z = maxZ;
		else if (r_camera.position.z < -maxZ)
			r_camera.position.z = -maxZ;

		var maxX = (roomBoxConfig.width/2) - 100;
		if(r_camera.position.x > maxX)
			r_camera.position.x = maxX;
		else if (r_camera.position.x < -maxX)
			r_camera.position.x = -maxX;

		var maxY = (roomBoxConfig.height/2) - 100;
		if(r_camera.position.y > maxY)
			r_camera.position.y = maxY;
		else if (r_camera.position.y < -maxY)
			r_camera.position.y = -maxY;		
}


function togglePresentationModeForRoomGallery()
{
	if( navigation.enable == false )
	{
	
		document.addEventListener( 'pointerlockchange', r_pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', r_pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', r_pointerlockchange, false );
		document.addEventListener( 'pointerlockerror', r_pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', r_pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', r_pointerlockerror, false );
		
		document.addEventListener( 'keydown', keyDownOnRoomGallery, false );
		document.addEventListener( 'keyup', keyUpOnRoomGallery, false );
	
	
		var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

		if ( havePointerLock ) 
		{
			var element = document.body;
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
			element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
			//element.requestFullscreen();
			element.requestPointerLock();
		}
		else
		{
			alert("Your browser doesn\'t seem to support Pointer Lock API");
		}
	}

}
