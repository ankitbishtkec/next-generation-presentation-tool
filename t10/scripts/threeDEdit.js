/*NOTE: This file though doing 3d task also use fabric and 3d libraries also*/
var container;
var _viewPortInnerWidth;
var _viewPortInnerHeight;
var _windowHalfX;
var _windowHalfY;
var iScene, iCamera, iRenderer, projector, ray, light;;
var PI_2 = Math.PI / 2;
var timer = null;
var count = 0;
var gblObject3D, gblObject2D;
var gblTempImg;
var scaleXEvent; 
var scaleYEvent; 
var scaleZEvent; 
var rotationXEvent;
var rotationYEvent;
var rotationZEvent;
var gui;
var controls;
var threeDEditTimer = null;

function editThreeD( object2D)
{
gblObject2D = object2D;
var division = document.getElementById("editThreeD");
division.style.display="block";
initThreeDCanvas();
object2D.opacity = 0;
object2D.hasControls = false;
object2D.hasBorders = false;
customRenderAll();
objectInsert3D( object2D );
//enterThreeDEdit();//have been moved to "insertInvisibleMasterCube" function due to asynchronus events in collada
}

var initialiseControllers = function() {
  this.rotationX = gblObject2D.threeDProperties.rotationX;
  this.rotationY = gblObject2D.threeDProperties.rotationY;
  this.rotationZ = gblObject2D.threeDProperties.rotationZ;
  this.scaleX = gblObject2D.threeDProperties.scaleX;
  this.scaleY = gblObject2D.threeDProperties.scaleY;
  this.scaleZ = gblObject2D.threeDProperties.scaleZ;
};

function enterThreeDEdit()
{
  gblObject3D.slave.rotation.x = gblObject3D.rotation.x = controls.rotationX = gblObject2D.threeDProperties.rotationX;
  gblObject3D.slave.rotation.y = gblObject3D.rotation.y = controls.rotationY = gblObject2D.threeDProperties.rotationY;
  gblObject3D.slave.rotation.z = gblObject3D.rotation.z = controls.rotationZ = gblObject2D.threeDProperties.rotationZ;
  gblObject3D.slave.scale.x = gblObject3D.scale.x = controls.scaleX = gblObject2D.threeDProperties.scaleX;
  gblObject3D.slave.scale.y = gblObject3D.scale.y = controls.scaleY = gblObject2D.threeDProperties.scaleY;
  gblObject3D.slave.scale.z = gblObject3D.scale.z = controls.scaleZ = gblObject2D.threeDProperties.scaleZ;
}

function exitThreeDEdit()
{
	gblObject2D.threeDProperties.scaleX = gblObject3D.slave.scale.x;
	gblObject2D.threeDProperties.scaleY = gblObject3D.slave.scale.y;
	gblObject2D.threeDProperties.scaleZ = gblObject3D.slave.scale.z;
	gblObject2D.threeDProperties.rotationX = gblObject3D.slave.rotation.x;
	gblObject2D.threeDProperties.rotationY = gblObject3D.slave.rotation.y;
	gblObject2D.threeDProperties.rotationZ = gblObject3D.slave.rotation.z;
}

function initThreeDCanvas()
{
	//initialise the gui for controls start
	{
		if( !( document.getElementsByClassName('dg ac').length ) )
		{
			controls = new initialiseControllers();	
			gui = new dat.GUI();
			scaleXEvent = gui.add(controls, 'scaleX', 0.25, 5).listen();
			scaleYEvent = gui.add(controls, 'scaleY', 0.25, 5).listen();
			scaleZEvent = gui.add(controls, 'scaleZ', 0.25, 5).listen();
			rotationXEvent = gui.add(controls, 'rotationX', -PI_2 * 2, PI_2 * 2).listen();
			rotationYEvent = gui.add(controls, 'rotationY', -PI_2 * 2, PI_2 * 2).listen();
			rotationZEvent = gui.add(controls, 'rotationZ', -PI_2 * 2, PI_2 * 2).listen();
			var matches = document.getElementsByClassName('dg ac');
			fabric.document.getElementById("editThreeD").appendChild(matches[0]);
		}
		else
			document.getElementsByClassName('dg ac')[0].style.display="block";
		
		//handlers assignment
		scaleXEvent.onChange(function(value) {
		scaleXhandler( value );
		});
		scaleYEvent.onChange(function(value) {
		scaleYhandler( value );
		});
		scaleZEvent.onChange(function(value) {
		scaleZhandler( value );
		});
		
		rotationXEvent.onChange(function(value) {
		rotationXhandler( value );
		});
		rotationYEvent.onChange(function(value) {
		rotationYhandler( value );
		});
		rotationZEvent.onChange(function(value) {
		rotationZhandler( value );
		});
	}
	//initialise the gui for controls end
	fabric.document.getElementById('editThreeD').style.width = mainFabricCanvas.getWidth();
	document.getElementById('editThreeD').style.height = mainFabricCanvas.getHeight();
	_viewPortInnerWidth = parseInt(document.getElementById('editThreeD').style.width);
	_viewPortInnerHeight = parseInt(document.getElementById('editThreeD').style.height);

	_windowHalfX = _viewPortInnerWidth / 2;
	_windowHalfY = _viewPortInnerHeight / 2;


	container = document.getElementById('editThreeD');
	var w, h;


	_windowHalfX = _viewPortInnerWidth / 2;
	_windowHalfY = _viewPortInnerHeight / 2;

	w = _viewPortInnerWidth;
	h = _viewPortInnerHeight;

	container.style.width = w + "px";
	container.style.height = h + "px";
	container.style.marginTop = 0.5 * (_viewPortInnerHeight - h) + 'px';

	iScene = new THREE.Scene();

	//iCamera = new THREE.PerspectiveCamera(70, w / h, 1, 1000000);
	iCamera = new THREE.OrthographicCamera( w/ - 2, w / 2, h / 2, h / - 2, 1, 100000 );
	//camera contants do not change (strictly)
	iCamera.position.x = 470;
	iCamera.position.y = 422;
	iCamera.position.z = 500;
	iCamera.rotation.x = -0.7010004209971048;
	iCamera.rotation.y = 0.6229325310303415;
	iCamera.rotation.z = 0.45755395233458634;
	///////////////////////////////////////
	iScene.add(iCamera);


	//iRenderer = new THREE.WebGLRenderer( { antialias: true, alpha: false, clearColor: 0xffffff, clearAlpha: 0, preserveDrawingBuffer: true }  );
	iRenderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true }  );
	iRenderer.setSize(w, h);
	
	light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
	light.position.set( 470, 422, 500 );
	//light.position.set( 0, 0, 500 );
	iScene.add( light );
	
	projector = new THREE.Projector();
	
	iRenderer.domElement.addEventListener( 'dblclick', onDoubleClick, false );
	iRenderer.domElement.addEventListener( 'mousedown', onDoubleClick, false );

	container.appendChild(iRenderer.domElement);
	animate3DEdit();	
}

function animate3DEdit() {

	threeDEditTimer = requestAnimationFrame( animate3DEdit );
	render();

}

function render() {
	iRenderer.render( iScene, iCamera );
}

function onDoubleClick( event )	{
	var x = ( ( event.clientX - container.offsetLeft ) / container.offsetWidth ) * 2 - 1;
	var y = - ( ( event.clientY - container.offsetTop ) / container.offsetHeight ) * 2 + 1;
	
	var
    startVector = new THREE.Vector3(),
    endVector = new THREE.Vector3(),
    dirVector = new THREE.Vector3(),
    goalVector = new THREE.Vector3(),
    t;

	startVector.set( x, y, -1.0 );
	endVector.set( x, y, 1.0 );

	// Convert back to 3D world coordinates
	startVector = projector.unprojectVector( startVector, iCamera );
	endVector = projector.unprojectVector( endVector, iCamera );
	
	// Get direction from startVector to endVector
	dirVector.sub( endVector, startVector );
	dirVector.normalize();

	ray = new THREE.Ray( startVector, dirVector.normalize() );

	var intersects = ray.intersectObjects( iScene.children );

	if ( intersects.length < 1 ) 
	{
		//mainFabricCanvas._onMouseDown(event);
		{
			var division = document.getElementById("editThreeD");
			division.style.display="none";
			{
				iCamera.position.x = 0;
				iCamera.position.y = 0;
				iCamera.position.z = 500;
				iCamera.rotation.x = 0;
				iCamera.rotation.y = 0;
				iCamera.rotation.z = 0;
				gblObject3D.position.x = gblObject3D.position.y = gblObject3D.position.z = 0;
				gblObject3D.slave.position.x = gblObject3D.slave.position.y = gblObject3D.slave.position.z = 0;
				render();
				captureImage( event );
			}
			gblObject2D.opacity = 1;
			gblObject2D.hasControls = true;
			gblObject2D.hasBorders = true;
			customRenderAll();
		}
		return;
	}
	else
		console.log( intersects[0].object.name);
		
	event.preventDefault();
	}

function captureImage( event ){
try{
	var canvasElements = document.getElementById("editThreeD").getElementsByTagName('canvas');
	var imageXY = calculateImageBox();
	//image extraction start
	{
		gblTempImg = new Image();
		var pngImage = canvasElements[0].toDataURL('image/png');
		gblTempImg.width = ( imageXY.maxX - imageXY.minX );
        gblTempImg.height = ( imageXY.maxY - imageXY.minY );
		gblTempImg.onload = function(){
			finalisingImage( imageXY, gblTempImg, canvasElements, event)
		};
		gblTempImg.src = pngImage;
	}
	
	//removing canvas 
	{
		canvasElements[0].parentNode.removeChild(canvasElements[0]);
		var controlElements = document.getElementsByClassName('dg ac');
		controlElements[0].style.display="none";
		exitThreeDEdit();
	}
}
catch(e){
	alert(e.message);
}
}

function finalisingImage( imageXY, pngImage, canvasElements, event )
{
try{
		var canvasTemp = fabric.document.createElement('canvas'), replacement = fabric.document.createElement('img');
		canvasTemp.width = ( imageXY.maxX - imageXY.minX );
        canvasTemp.height = ( imageXY.maxY - imageXY.minY );
		
		canvasTemp.getContext('2d').drawImage(pngImage, imageXY.minX, imageXY.minY, ( imageXY.maxX - imageXY.minX ), ( imageXY.maxY - imageXY.minY ), 
				1, 1, ( imageXY.maxX - imageXY.minX ), ( imageXY.maxY - imageXY.minY ));
		//context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		replacement.onload = function() {
        gblObject2D._element = replacement;
		gblObject2D.set({
			width : ( imageXY.maxX - imageXY.minX ),
			height : ( imageXY.maxY - imageXY.minY )
		});
		customRenderAll();
        replacement.onload = canvasTemp = pngImage = null;
		mainFabricCanvas._onMouseDown(event);
		if( ( mainFabricCanvas.getPointer( event ).x == mouseCurPos.x) && ( mainFabricCanvas.getPointer( event ).y == mouseCurPos.y))
		{
			//alert("hila");
			mainFabricCanvas._onMouseUp(event);
		}
		if( threeDEditTimer )
		{
			 window.cancelAnimationFrame( threeDEditTimer );
			 threeDEditTimer = null;
		}
      };
      replacement.width = ( imageXY.maxX - imageXY.minX );
      replacement.height = ( imageXY.maxY - imageXY.minY );
	  //replacement.src = canvasElements[0].toDataURL('image/png');
	  replacement.src = canvasTemp.toDataURL('image/png');
}
catch(e){
	alert("finalising error is " + e.message);
}	  
}

function calculateImageBox( ){

	if ( gblObject3D.geometry.boundingBox === null )
		gblObject3D.geometry.computeBoundingBox();
	gblObject3D.updateMatrixWorld();
	var verticesArray2D = new Array();
	var addon = 1;
	var tempVector;
	{
		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.max.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.max.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.max.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[0] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.max.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.max.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.min.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[1] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.max.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.min.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.max.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[2] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.max.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.min.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.min.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[3] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.min.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.max.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.min.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[4] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.min.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.max.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.max.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[5] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.min.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.min.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.min.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[6] = tempVector;

		tempVector =  new THREE.Vector3();
		tempVector.x = gblObject3D.geometry.boundingBox.min.x + addon;
		tempVector.y = gblObject3D.geometry.boundingBox.min.y + addon;
		tempVector.z = gblObject3D.geometry.boundingBox.max.z + addon;
		gblObject3D.matrixWorld.multiplyVector3( tempVector );
		verticesArray2D[7] = tempVector;
	}
	var count = 0;
	
	var response = new Object();
	response.minX = response.minY = +10000;
	response.maxX = response.maxY = -10000;
	
	for( count = 0; count < verticesArray2D.length ; count++)
	{
		verticesArray2D[ count ] = projector.projectVector( verticesArray2D[ count ], iCamera );
		verticesArray2D[ count ].x = Math.round( ( verticesArray2D[ count ].x + 1 )* ( iRenderer.domElement.width / 2 ));
        verticesArray2D[ count ].y = Math.round( ( 1 - verticesArray2D[ count ].y ) * ( iRenderer.domElement.height / 2 ));
		
		if( verticesArray2D[ count ].x <  response.minX)
			response.minX = verticesArray2D[ count ].x;
		if( verticesArray2D[ count ].y <  response.minY)
			response.minY = verticesArray2D[ count ].y;
			
		if( verticesArray2D[ count ].x >  response.maxX)
			response.maxX = verticesArray2D[ count ].x;
		if( verticesArray2D[ count ].y >  response.maxY)
			response.maxY = verticesArray2D[ count ].y;
	}
	
	return response;//TODO make coordinates in limits i.e. more than zero and less than screen width
}
	
	function objectInsert3D( object2D ){
	/*var x = ( ( event.clientX - container.offsetLeft ) / container.offsetWidth ) * 2 - 1;
	var y = - ( ( event.clientY - container.offsetTop ) / container.offsetHeight ) * 2 + 1;*/
	var x = ( ( object2D.getLeft() ) / mainFabricCanvas.getWidth() ) * 2 - 1;
	var y = - ( ( object2D.getTop() ) / mainFabricCanvas.getHeight() ) * 2 + 1;

	var
    startVector = new THREE.Vector3(),
    endVector = new THREE.Vector3(),
    dirVector = new THREE.Vector3(),
    goalVector = new THREE.Vector3(),
    t;

	startVector.set( x, y, -1.0 );
	endVector.set( x, y, 1.0 );

	// Convert back to 3D world coordinates
	startVector = projector.unprojectVector( startVector, iCamera );
	endVector = projector.unprojectVector( endVector, iCamera );
	
	// Get direction from startVector to endVector
	dirVector.sub( endVector, startVector );
	dirVector.normalize();
	
	// Find intersection where y = 0
	{
		var start = startVector;
		var direction = dirVector;
		var x = start.x + direction.x * ( -start.y ) / direction.y;
		var y = 0;
		var z = start.z + direction.z * ( -start.y ) / direction.y;
	switch( object2D.threeDProperties.threeDtype )
    {
        case '3DCube':
			insertCube3D( x, y, z, object2D );
            break;
                
        case '3DBoy':
			insertBoy( x, y, z, object2D );
            break;
            
        case '3DGirl':
			insertGirl( x, y, z, object2D );
            break;

        case '3DDuck':
			insertDuck( x, y, z, object2D );
            break;
            
        case '3DHouse':
			insertHouse( x, y, z, object2D );
            break;

        case '3DTruck':
			insertTruck( x, y, z, object2D );
            break;
	}	
	}
	
	event.preventDefault();
	}