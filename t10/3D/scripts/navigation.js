//navigation start
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var PI_2 = Math.PI / 2;
var isIn3DPresentationMode = false;
var pitchObject;
var yawObject;
var cameraBackup= new Object();

var isInAnaglyphMode = false;//anaglyph

function pointerlockchange( event ) {

if( isIn3DPresentationMode == true)
{//out
	//restore start
	/*camera.rotation.x = cameraBackup.rotationX;
	camera.rotation.y = cameraBackup.rotationY;
	camera.rotation.z = cameraBackup.rotationZ;
	camera.position.x = cameraBackup.positionX;
	camera.position.y = cameraBackup.positionY;
	camera.position.z = cameraBackup.positionZ;*/
	//restore end
	isIn3DPresentationMode = false;
	isInAnaglyphMode = false;
	
	document.removeEventListener( 'pointerlockchange', pointerlockchange, false );
	document.removeEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.removeEventListener( 'webkitpointerlockchange', pointerlockchange, false );
	document.removeEventListener( 'pointerlockerror', pointerlockerror, false );
	document.removeEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.removeEventListener( 'webkitpointerlockerror', pointerlockerror, false );
	document.removeEventListener( 'keydown', onKeyDownNavigation, false );
	document.removeEventListener( 'keyup', onKeyUp, false );
	
	document.removeEventListener( 'mousemove', onMouseMoveNavigation );
	
}
else
{//in
	//backup start
	/*cameraBackup.rotationX = camera.rotation.x;
	cameraBackup.rotationY = camera.rotation.y;
	cameraBackup.rotationZ = camera.rotation.z;
	cameraBackup.positionX = camera.position.x;
	cameraBackup.positionY = camera.position.y;
	cameraBackup.positionZ = camera.position.z;
	//backup end*/
	camera.rotation.x = 0;
	camera.rotation.y = 0;
	camera.rotation.z = 0;
	/*camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 200;*/
	isIn3DPresentationMode = true;	
	document.addEventListener( 'mousemove', onMouseMoveNavigation, false );
}

}

function pointerlockerror( event ) {

alert("Your browser is not supported. Using the application will show inconsistent behavior");

}
function onMouseMoveNavigation(event){
	//if( isIn3DPresentationMode == true )
	try{		
		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		camera.rotation.y -= movementX * 0.001;
		//camera.rotation.x -= movementY * 0.001;
		//yawObject.rotation.y -= movementX * 0.001;
		//pitchObject.rotation.x -= movementY * 0.001;
		//cameraChanged = true;
		//signals.cameraChanged.dispatch( camera );
		//camera.rotation.x = Math.max( - PI_2, Math.min( PI_2, camera.rotation.x ) );
	
	}
	catch(e)
	{
	alert(e.message);
	}

}

function onKeyDownNavigation( event ) {

//alert("down");
		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;
				
				
			case 81: // q
				moveUp = true;
				break;

			case 69: // e
				moveDown = true;
				break;
		}

}


function onKeyUp( event ) {

//alert("up");
		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // a
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;
				
			case 81: // q
				moveUp = false;
				break;

			case 69: // e
				moveDown = false;
				break;

		}
}


function updateNavigation( delta ) {

	delta = 10;
	if ( moveForward ) delta = (-1) * delta;
	if ( moveBackward ) delta = (1) * delta;

	if ( moveLeft ) delta = (-1) * delta;
	if ( moveRight ) delta = (1) * delta;


	
	if( moveForward || moveBackward )
		{
		//alert("hi");
		camera.translateZ( delta );
		}
		
	if( moveLeft || moveRight )
		{
		//alert("hi");
		camera.translateX( delta );
		}
		
	if( moveUp )
		{
		//alert("hi");
		camera.translateY( 5 );
		}

		if( moveDown )
		{
		//alert("hi");
		camera.translateY( -5 );
		}
}


function togglePresentationMode( input)
{
	if( input == "anaglyph")
	{
		isInAnaglyphMode = true;
	}
	if( isIn3DPresentationMode == false )
	{
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
		
		document.addEventListener( 'keydown', onKeyDownNavigation, false );
		document.addEventListener( 'keyup', onKeyUp, false );
	
		
		var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

		if ( havePointerLock ) 
		{
			var element = document.body;
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
			element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
			element.requestPointerLock();
		}
		else
		{
			alert("Your browser doesn\'t seem to support Pointer Lock API");
		}

	}
	input.preventDefault();

}

//navigation stop