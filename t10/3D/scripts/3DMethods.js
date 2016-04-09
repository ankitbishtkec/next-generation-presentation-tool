var lastMousePositionX = 0;
var lastMousePositionY = 0;
var g_selectedObject = new Object();	
g_selectedObject.obj = null;
g_selectedObject.rotationMode = false;
g_selectedObject.selectedForPushpull = false;
//MTC
var pictureCube = [];
var savedPictureCubeRotationX = 0;
var savedPictureCubeRotationY = 0;
var savedPictureCubeRotationZ = 0;
var widthPC = 0;
var noOfPictureCubes = 0;
var zPosition = 1000;
var zFactor = 0;
var zFrame = -1000;
var div3D ;
var themeImage3D;
var pathArray3D = new Array();
var panorama;
var textPara3dObjectArray3D = new Array();
			var currentActiveObj;
			var SIGNALS = signals;

			var signals = {

				// actions

				removeSelectedObject: new SIGNALS.Signal(),
				exportGeometry: new SIGNALS.Signal(),
				exportScene: new SIGNALS.Signal(),
				toggleHelpers: new SIGNALS.Signal(),
				resetScene: new SIGNALS.Signal(),

				// notifications

				sceneAdded: new SIGNALS.Signal(),
				sceneChanged: new SIGNALS.Signal(),
				objectAdded: new SIGNALS.Signal(),
				objectSelected: new SIGNALS.Signal(),
				objectChanged: new SIGNALS.Signal(),
				materialChanged: new SIGNALS.Signal(),
				clearColorChanged: new SIGNALS.Signal(),
				cameraChanged: new SIGNALS.Signal(),
				fogTypeChanged: new SIGNALS.Signal(),
				fogColorChanged: new SIGNALS.Signal(),
				fogParametersChanged: new SIGNALS.Signal(),
				windowResize: new SIGNALS.Signal(),
				//objectRightClick: new SIGNALS.signal(),
	

			};

			var viewportObj = null;
			var viewport;

function panoramaView(){
	getTheme3D();
	var geometry = new THREE.SphereGeometry( 8000, 15, 10 );
	var texture = THREE.ImageUtils.loadTexture(themeImage3D);
	var material = new THREE.MeshBasicMaterial( { map: texture} );
	panorama = new THREE.Mesh( geometry, material );
	panorama.position.x = 0;
	panorama.position.y = 0;
	panorama.position.z = 0;
	panorama.scale.x = -1;
	panorama.isTheme = true;
	sceneHelpers.add( panorama ); 
	//selectionBox.visible = true;
	//objects.push(panorama);
	signals.objectAdded.dispatch(panorama);
	//return panorama;
}

function userDefinedPath(startSlideShow,next,previous){

	pathArrayLength = pathArray3D.length;
	var clickedfaceNormal = new Object();
	clickedfaceNormal.z =1;
	clickedfaceNormal.x =0;
	clickedfaceNormal.y =0;
	contentViewingMode = false;
	doubleClicked = true;
	noMoreCenterCamera = true;
	
	if(startSlideShow)
	{
			autoPlay = true;
			if(pathObjectCount == pathArrayLength)
				pathObjectCount = 0;
			if (pathObjectCount < pathArrayLength)
			{
				
				timerID = window.setInterval(function (object) {
			
				while(1)
				{
					if(pathArray3D[pathObjectCount]) {
					
						if (pathArray3D[pathObjectCount].isPicturedCube)
						{
							var data = pathArray3D[pathObjectCount];
							
							var geometry = data.obj.geometry;
							var faceVector = data.faceVector;
							console.log("face" + data.face + " x " + faceVector.x + " y " + faceVector.y  + " z " + faceVector.z);
							saveTarget( data.obj,geometry,faceVector);
						}
						else
						{
							var geometry = pathArray3D[pathObjectCount].geometry;
							saveTarget(pathArray3D[pathObjectCount],geometry,clickedfaceNormal);
						}
						contentViewingMode = false;
						viewportObj.customRenderer();
						pathObjectCount++;
						break;
					} else {
						pathObjectCount++;
					}
				}
			
			if(pathObjectCount==pathArrayLength)
			{
				clearInterval(timerID);
				timerID=0;
				autoPlay = false;
				TogglePlayPause(false);
			}
		} , 4000);
				
			}
	
	}
	else if(next)
	{	
		if(autoPlay)
			TogglePlayPause(false);
		autoPlay = false;
		if(++pathObjectCount < pathArrayLength)
		{

			if (pathArray3D[pathObjectCount].isPicturedCube)
			{
				var data = pathArray3D[pathObjectCount];
				var geometry = data.obj.geometry;
				var faceVector = data.faceVector;
				console.log("face" + data.face + " x " + faceVector.x + " y " + faceVector.y  + " z " + faceVector.z);
				saveTarget( data.obj,geometry,faceVector);
			}
			else
			{			
				var geometry = pathArray3D[pathObjectCount].geometry;
				saveTarget(pathArray3D[pathObjectCount],geometry,clickedfaceNormal);
			}
		}
		else
		{
			pathObjectCount = 0;
			if (pathArray3D[pathObjectCount].isPicturedCube)
			{
				var data = pathArray3D[pathObjectCount];
				var geometry = data.obj.geometry;
				var faceVector = data.faceVector;
				console.log("face" + data.face + " x " + faceVector.x + " y " + faceVector.y  + " z " + faceVector.z);
				saveTarget(data.obj,geometry,faceVector);
			}
			else
			{
				var geometry = pathArray3D[pathObjectCount].geometry;
				saveTarget(pathArray3D[pathObjectCount],geometry,clickedfaceNormal);
			}
		}
		viewportObj.customRenderer();
	}
	else if(previous )
	{
		if(autoPlay)
			TogglePlayPause(false);
		autoPlay = false;
		if( --pathObjectCount >= 0)
		{
			if (pathArray3D[pathObjectCount].isPicturedCube)
			{
				var data = pathArray3D[pathObjectCount];
				var geometry = data.obj.geometry;
				var faceVector = data.faceVector;
				console.log("face" + data.face + " x " + faceVector.x + " y " + faceVector.y  + " z " + faceVector.z);
				saveTarget(data.obj,geometry,faceVector);
			}
			else
			{
				var geometry = pathArray3D[pathObjectCount].geometry;
				saveTarget(pathArray3D[pathObjectCount],geometry,clickedfaceNormal);
			}
		}
		else
		{
			pathObjectCount = pathArrayLength-1;
			if (pathArray3D[pathObjectCount].isPicturedCube)
			{
				var data = pathArray3D[pathObjectCount];
				var geometry = data.obj.geometry;
				var faceVector = data.faceVector;
				console.log("face" + data.face + " x " + faceVector.x + " y " + faceVector.y  + " z " + faceVector.z);
				saveTarget(data.obj,geometry,faceVector);
			}
			else
			{
				var geometry = pathArray3D[pathObjectCount].geometry;
				saveTarget(pathArray3D[pathObjectCount],geometry,clickedfaceNormal);
			}
		}
		viewportObj.customRenderer();
	}
	else
	{
		clearInterval(timerID);
		timerID=0;
		autoPlay = false;
	}
			
}

function init3DView()
{
	try
	{
	//camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);
	//camera.position.z = 100;
	
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 2000, 1000 );
	camera.position.x = 100;
	camera.position.y = 100;
	camera.position.z = 100;
	camera.rotation.x = - Math.PI/2;
	camera.rotation.z = - Math.PI/4;
	camera.rotation.y = -Math.PI/4;
	controls = new THREE.TrackballControls(camera, document.getElementById('3DCanvas'));
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	scene = new THREE.Scene();
	scene.add( new THREE.AmbientLight( 0x505050 ) );
	
	var light = new THREE.SpotLight( 0xffffff, 1.5 );
	light.position.set( 0, 500, 2000 );
	light.castShadow = true;
	light.shadowCameraNear = 200;
	light.shadowCameraFar = camera.far;
	light.shadowCameraFov = 50;
	light.shadowBias = -0.00022;
	light.shadowDarkness = 0.5;
	light.shadowMapWidth = 2048;
	light.shadowMapHeight = 2048;
	
	scene.add( light );
					var size = 500, step = 50;

				var geometry = new THREE.Geometry();

				for ( var i = - size; i <= size; i += step ) {

					geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
					geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

					geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
					geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

				}

				var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );

				var line = new THREE.Line( geometry, material );
				line.type = THREE.LinePieces;
				scene.add( line );
	projector = new THREE.Projector();
	
		var width = 100;
		var height = 100;

		var widthSegments = 1;
		var heightSegments = 1;

		var geometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		mesh.rotation.x = - Math.PI/2;
		//mesh.visible
	/////////////////////////////////
	plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 1,1), new THREE.MeshBasicMaterial( { color: 0x008000, opacity: 0.25, transparent: true , wireframe: true } ) );
	plane.visible = false;
	//plane.rotation.x = -Math.PI/2;
	//scene.add( mesh );
	scene.add( plane );
				
	renderer = new THREE.WebGLRenderer({canvas: document.getElementById('3DCanvas')});

	renderer.sortObjects = false;
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	var maxAnisotropy = renderer.getMaxAnisotropy();
	////////////////////////////////////////////
	
	///////////////////////////////////////////
	//insertCube();
	lastMousePositionX = 0;
	lastMousePositionY = 0;
	
	//for object selection
	sceneHelpers = new THREE.Scene();
	selectionBox = new THREE.Mesh( new THREE.CubeGeometry( 2, 2, 2 ), new THREE.MeshBasicMaterial( { color: 0xFF3300, wireframe: true, fog: false } ) );
	selectionBox.matrixAutoUpdate = false;
	selectionBox.visible = false;

	
	
	renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
	renderer.domElement.addEventListener('mousewheel', onDocumentMouseWheel, false);
	window.addEventListener( 'resize', onWindowResize, false );
	
	renderer.domElement.addEventListener('contextmenu', function(event) {
		showContextMenuForUpperCanvas(event)
	}, false);
	render();
	}
	catch(ex)
	{  
		alert("Error : creation of 3D context failed" + ex.message);
	}
				
}

function insertCubePushpull()
{
	var geometry = new THREE.CubeGeometry( 150, 5, 150);
	for ( var i = 0; i < geometry.faces.length; i ++ ) {

	geometry.faces[ i ].color.setHex( Math.random() * 0xffffff);

	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
	var cubePushpull = new THREE.Mesh( geometry, material );

	cubePushpull.position.x = Math.random() * 1000 - 500;
	cubePushpull.position.y = Math.random() * 600 - 300;
	cubePushpull.position.z = (Math.random() * 1000) % 500;
	objects.push(cubePushpull);
	
	signals.objectAdded.dispatch(cubePushpull);
}
var cube;

function insertCube(obj)
{
	//detectPath(obj);
	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth;
	var height = obj.currentHeight;
	var rotate = obj.isRotate;
	var linear = obj.isLinear;
	var color = obj.fill;
	color = color.replace('#','0x');
	var opacity = obj.opacity;
	var geometry;
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (zPosition/lengthOf3DObjects);
	
		
	if(x && y)
	geometry = new THREE.CubeGeometry(width, height, height);
	else
	geometry = new THREE.CubeGeometry( 150, 150, 150);

	for ( var i = 0; i < geometry.faces.length; i ++ ) {
	geometry.faces[ i ].color.setHex(color);
	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, opacity: opacity } );
	var cube = new THREE.Mesh( geometry, material );


		
	if(x && y) {
		cube.position.x = x;
		cube.position.y = y;
		if(obj.frameChild)
			{
			cube.position.y = height/2;
			cube.position.z = y;
			}
		else
			{
			cube.position.z = zFactor;
			zFactor += zFac; 
			}
		}
	else {
	cube.position.x = Math.random() * 1000 - 500;
	cube.position.y = Math.random() * 600 - 300;
	}
	
	if(rotate)
		cube.rotationDir = 'RotationX';
	if(linear)
		cube.linear = true;
	if(obj.theta)
	cube.rotation.x += obj.theta;
	
	if(obj.isZoom)
		cube.zoom = true;
	else
		cube.zoom = false;

	if(obj.xPath && obj.xPath.length)
	{		
		cube.xPath = obj.xPath;
		cube.yPath = obj.yPath;
	}
	sceneHelpers.add( cube ); 
	selectionBox.visible = true;
	objects.push(cube);
	signals.objectAdded.dispatch(cube);
	return cube;
}

function insertCircle3D(obj)
{

	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth * 2;
	var height = obj.currentHeight * 2;
	var rotate = obj.isRotate;
	var linear = obj.isLinear;
	var geometry;
	var opacity = obj.opacity;
	var color = obj.fill;
	var elliHeight = Math.sqrt(width*width + height*height);
	color = color.replace('#','0x');
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (zPosition/lengthOf3DObjects);
	if(x && y)
	geometry = new THREE.SphereGeometry( width/2, 50,500);

	for ( var i = 0; i < geometry.faces.length; i ++ ) {

	geometry.faces[ i ].color.setHex(color);

	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors,opacity: opacity } );
	var circle = new THREE.Mesh( geometry, material );
	

	
	if(x && y) {
		circle.position.x = x;
		circle.position.y = y;
		if(obj.frameChild)
			{
			circle.position.y = elliHeight/2;
			circle.position.z = y;
			}
		else
			{
			circle.position.z = zFactor;
			zFactor += zFac; 
			}
		}
	else {
	circle.position.x = Math.random() * 1000 - 500;
	circle.position.y = Math.random() * 600 - 300;
	}
	
	if( width!= height)
	{
		circle.scale.z = width/250;
		circle.scale.y = height/250;
	}
	if(rotate)
		circle.rotationDir = 'RotationX';
	if(linear)
		circle.linear = true;
	if(obj.theta)
	circle.rotation.x += obj.theta;	
	
	if(obj.isZoom)
		circle.zoom = true;
	else
		circle.zoom = false;
	if(obj.samePath)
		circle.samePath = true;
		
	if(obj.xPath && obj.xPath.length)
	{		
		circle.xPath = obj.xPath;
		circle.yPath = obj.yPath;
	}	
	sceneHelpers.add( circle ); 
	selectionBox.visible = true;
	objects.push(circle);
	signals.objectAdded.dispatch(circle);
	return circle;
}

function insertTriangle3D(obj)
{

	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth;
	var height = obj.currentHeight;
	var rotate = obj.isRotate;
	var linear = obj.isLinear;
	var opacity = obj.opacity;
	var color = obj.fill;
	color = color.replace('#','0x');
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (zPosition/lengthOf3DObjects);
	var geometry = new THREE.TetrahedronGeometry (width, 0);

	for ( var i = 0; i < geometry.faces.length; i ++ ) {
	geometry.faces[ i ].color.setHex( color );
	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors,opacity: opacity } );
	var triangle = new THREE.Mesh( geometry, material );
	

		
	if( width != height)
	{
		triangle.scale.z = width/100;
		triangle.scale.y = height/100;
	}
	
	if(x && y) {
		triangle.position.x = x;
		triangle.position.y = y;
		if(obj.frameChild)
			{
			triangle.position.y = height/2;
			triangle.position.z = y;
			}
		else
			{
			triangle.position.z = zFactor;
			zFactor += zFac; 
			}
		}
	else {
	triangle.position.x = Math.random() * 1000 - 500;
	triangle.position.y = Math.random() * 600 - 300;
	}
	
	if(rotate)
		triangle.rotationDir = 'RotationX';
	if(linear)
		triangle.linear = true;
	if(obj.theta)
		triangle.rotation.x += obj.theta;	
	if(obj.isZoom)
		triangle.zoom = true;	
	else
		triangle.zoom = false;
	if(obj.samePath)
		triangle.samePath = true;
		
	if(obj.xPath && obj.xPath.length)
	{		
		triangle.xPath = obj.xPath;
		triangle.yPath = obj.yPath;
	}	
	sceneHelpers.add( triangle ); 
	selectionBox.visible = true;
	objects.push(triangle);
	signals.objectAdded.dispatch(triangle);
	return triangle;
}


function insertLine3D(obj)
{

	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth;
	var height = obj.currentHeight;
	var rotate = obj.isRotate;
	var linear = obj.isLinear;
	var length = Math.sqrt(width*width + height*height);
	var opacity = obj.opacity;	
	var color = obj.fill;
	color = color.replace('#','0x');
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (zPosition/lengthOf3DObjects);
	var geometry = new THREE.CylinderGeometry(5, 5, length);
	
	for ( var i = 0; i < geometry.faces.length; i++ ) {
	geometry.faces[ i ].color.setHex(color);
	}
	
	var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors ,opacity: opacity} );
	var line = new THREE.Mesh( geometry, material );


		
	if(x && y) {
		line.position.x = x;
		line.position.y = y;
		if(obj.frameChild)
			{
			line.position.y = height/2;
			line.position.z = y;
			}
		else
			{
			line.position.z = zFactor;
			zFactor += zFac; 
			}
		}
	else {
	line.position.x = Math.random() * 1000 - 500;
	line.position.y = Math.random() * 600 - 300;
	}
	
	if(rotate)
		line.rotationDir = 'RotationX';
	if(linear)
		line.linear = true;
	if(obj.theta)
		line.rotation.x += obj.theta;
	if(obj.isZoom)
		line.zoom = true;
	else
		line.zoom = false;
		
	if(obj.samePath)
		line.samePath = true;		
	if(obj.xPath && obj.xPath.length)
	{		
		line.xPath = obj.xPath;
		line.yPath = obj.yPath;
	}		
	sceneHelpers.add( line ); 
	selectionBox.visible = true;
	objects.push(line);
	signals.objectAdded.dispatch(line);
	return line;
}

function insertText3D(obj)
	{

	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth;
	var height = obj.currentHeight;
	var rotate = obj.isRotate;
	var linear = obj.isLinear;
	var length = Math.sqrt(width*width + height*height);
	var opacity = obj.opacity;	
	var color = obj.fill;
	color = parseInt(color.replace('#','0x'));
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (zPosition/lengthOf3DObjects);
	
	var font = "optimer";
		
	var text2D = obj.text;
	var font3D = "gentilis";
	
	switch(font)
	{
		case "Times New Roman":
		case "Georgia":
		case "Arial":		
			font3D = "optimer";
			break;
		case "Comic Sans MS":
			font3D = "helvetiker";
			break;
		case "Tahoma":
			font3D = "gentilis";
			break;
	}
	
	var textArray = text2D.split("\n");
	var textArray3D = new Array();
	
	for (var i = 0; i <textArray.length; i++)
	{
		var text3D = insertText( x, y, 20, 1, 1, 1, 0, Math.PI * 2, 0, font3D,  color, textArray[i] );
		
		text3D.paragraphed = true;
		
		//if(obj.isObjectInPath)
		//pathArray3D.push(text3D);
		
	if(x && y) {
		text3D.position.x = x;
		text3D.position.y = y;
		if(obj.frameChild)
			{
			text3D.position.x = x - width;
			text3D.position.y = height/2;
			text3D.position.z = y;
			}
		else
			{
			text3D.position.z = zFactor;
				//zFactor += zFac; 
			}
		}
	else {
		text3D.position.x = Math.random() * 1000 - 500;
		text3D.position.y = Math.random() * 600 - 300;
	}
	
	if(rotate)
		text3D.rotationDir = 'RotationX';
	if(linear)
		text3D.linear = true;
	if(obj.theta)
		text3D.rotation.x += obj.theta;
	if(obj.isZoom)
		text3D.zoom = true;
	else
		text3D.zoom = false;
	if(obj.samePath)
		text3D.samePath = true;
	sceneHelpers.add( text3D ); 
	selectionBox.visible = true;
	objects.push(text3D);
	signals.objectAdded.dispatch(text3D);
	textArray3D.push(text3D);
	y = y-50;
	}
	textPara3dObjectArray3D.push(textArray3D);
	return textArray3D;
}


//MTC --start--

function insertPictureCube(evt){
			var myFiles = evt.target.files;
			console.log("Hi");
			console.log(myFiles);
			for (var k = 0, f; f = myFiles[k]; k++)
			{
				console.log(myFiles);
				var imageReader = new FileReader();
				imageReader.onload = (function(theFile)
				{
					console.log(theFile);
					return function(e)	{
							src = e.target.result;
							InsertImageToPictureCube(e.target.result);
						};
				})(f);
				imageReader.readAsDataURL(f);
			}
}
		//}
//function InsertImageToPictureCube(src)	{
function InsertImageToPictureCube(imgArray, xPos, yPos)	{	

	widthPC = 200;
	var materials = [];
		for (var i= 5; i >= 0; i--) {
			var htmlElement = imgArray[i]._element;
			var imgSrc = htmlElement ? htmlElement.getAttribute("src") : null;

			var tex = new THREE.ImageUtils.loadTexture(imgSrc);
			tex.needsUpdate = true;
			var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex, overdraw:true});
			materials.push(mat);
			/*
			if(!pathArray3D[i])
				pathArray3D[i] = null;
			*/
			
		}
		
    var geometry = new THREE.CubeGeometry( widthPC, widthPC, widthPC, 3, 3, 3, materials);
	var faceMaterial = new THREE.MeshFaceMaterial(materials);
	
	pictureCube[noOfPictureCubes] = new THREE.Mesh( geometry, faceMaterial );
	
	if (xPos && yPos)
	{
		pictureCube[noOfPictureCubes].position.x = xPos;
		pictureCube[noOfPictureCubes].position.y = yPos;
		pictureCube[noOfPictureCubes].position.z = 0;	
	}
	else
	{
		pictureCube[noOfPictureCubes].position.x = Math.random() * 1000 - 500;
		pictureCube[noOfPictureCubes].position.y = Math.random() * 600 - 300;
		pictureCube[noOfPictureCubes].position.z = (Math.random() * 1000) % 150;
	}

    //scene.add(pictureCube );
	objects.push(pictureCube[noOfPictureCubes]);
	
	for (var c= 5; c >= 0; c--) {
		detectPath(imgArray[c]);
		if(imgArray[c].index >= 0) {
			var data = {};
			data.obj =  pictureCube[noOfPictureCubes];
			data.face = (c+1);
			data.isPicturedCube = true;
			data.faceVector = normalDetection[c];
			pictureCube[noOfPictureCubes].faceOfCube = c;
			//pathArray3D.splice(imgArray[c].index, 0, data);
			pathArray3D[imgArray[c].index] = data;
		}
	}
/* 	var len = pathArray3D.length;
	for( var i = 0 ;i < len; i++)
	{
		if(!pathArray3D[i])
			pathArray3D.splice(i, 1 );
	} */
	signals.objectAdded.dispatch(pictureCube[noOfPictureCubes]);
	noOfPictureCubes++;
}

//MTC --end--

/* window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})(); */
	
function render() {

//	renderer.render( scene, camera );
		sceneHelpers.updateMatrixWorld();
		scene.updateMatrixWorld();

		renderer.clear();
		renderer.render( scene, camera );
//cube.rotation.x = 10;
		if ( helpersVisible ) {

			renderer.render( sceneHelpers, camera );

		}
}

			var onWindowResize = function ( event ) {

				signals.windowResize.dispatch();

			};


function active3DObject(e)
{
	// create wrapper object that contains three.js objects
	currentActiveObj = null;
	event.preventDefault();

	var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
	projector.unprojectVector( vector, camera );

	//var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

	var intersects = ray.intersectObjects( objects );
	
	
	if(intersects.length == 0) {
		currentActiveObj = false;
	}

	if ( intersects.length > 0 ) {

		controls.enabled = false;

		currentActiveObj = intersects[ 0 ].object;

	//	var intersects = ray.intersectObject( plane );
	//	offset.copy( intersects[ 0 ].point ).subSelf( plane.position );
	}
	
	return currentActiveObj;
}

function showContextMenuForUpperCanvas(e)
{

	currentActiveObj = active3DObject(e);
	if (currentActiveObj)
	{
		/* context menu for 3D object */
		customContextMenu.Dispose();
		customContextMenu = new CustomContextMenu(menuArguments);
		show3DObjectMenu(customContextMenu);
		customContextMenu.Display(e);
		
		//animate(25, three);
	}
}

function handleContextMenuClickFor3D(options)
{
	// create wrapper object that contains three.js objects

	//currentActiveObj = active3DObject(null);
	currentActiveObj.rotationDir = options.rotationDir;
	currentActiveObj.scaleFDimension = options.scaleFDimension;
	var three = {
		renderer: renderer,
		camera: camera,
		scene: sceneHelpers,
		target: currentActiveObj,
		scaleFDimension: options.scaleFDimension,
		rotationDir : options.rotationDir,
		rotationMode : options.rotationMode
	};
	
	if (options.rotationMode == "Rotation Mode")
	{
		currentActiveObj.rotationMode = true;
	}
	else
		currentActiveObj.rotationMode = false;
		
	if (options.pushPullMode == "PushPull Mode") {
		currentActiveObj.selectedForPushpull = true;
	}
	
	viewportObj.customRenderer();
	signals.objectChanged.dispatch(currentActiveObj);
	//animate(10, three);
}

function drawSelectionBox(object)
{

	selectionBox.visible = false;
	//selectionAxis.visible = false;

	var geometry;
	var hasRotation;

	if ( object !== null ) {

		selected = object;

		if ( object.geometry ) {

			geometry = object.geometry;
			hasRotation = true;

		} else if ( object.properties.pickingProxy ) {

			geometry = object.properties.pickingProxy.geometry;
			hasRotation = false;

		}

	}

	if ( geometry ) {

		if ( geometry.boundingBox === null ) {

			geometry.computeBoundingBox();

		}

		var vertices = selectionBox.geometry.vertices;

		vertices[ 0 ].x = geometry.boundingBox.max.x + 2;
		vertices[ 0 ].y = geometry.boundingBox.max.y + 2;
		vertices[ 0 ].z = geometry.boundingBox.max.z + 2;

		vertices[ 1 ].x = geometry.boundingBox.max.x + 2;
		vertices[ 1 ].y = geometry.boundingBox.max.y + 2;
		vertices[ 1 ].z = geometry.boundingBox.min.z + 2;

		vertices[ 2 ].x = geometry.boundingBox.max.x + 2;
		vertices[ 2 ].y = geometry.boundingBox.min.y + 2;
		vertices[ 2 ].z = geometry.boundingBox.max.z + 2;

		vertices[ 3 ].x = geometry.boundingBox.max.x + 2;
		vertices[ 3 ].y = geometry.boundingBox.min.y + 2;
		vertices[ 3 ].z = geometry.boundingBox.min.z + 2;

		vertices[ 4 ].x = geometry.boundingBox.min.x + 2;
		vertices[ 4 ].y = geometry.boundingBox.max.y + 2;
		vertices[ 4 ].z = geometry.boundingBox.min.z + 2;

		vertices[ 5 ].x = geometry.boundingBox.min.x + 2;
		vertices[ 5 ].y = geometry.boundingBox.max.y + 2;
		vertices[ 5 ].z = geometry.boundingBox.max.z + 2;

		vertices[ 6 ].x = geometry.boundingBox.min.x + 2;
		vertices[ 6 ].y = geometry.boundingBox.min.y + 2;
		vertices[ 6 ].z = geometry.boundingBox.min.z + 2;

		vertices[ 7 ].x = geometry.boundingBox.min.x + 2;
		vertices[ 7 ].y = geometry.boundingBox.min.y + 2;
		vertices[ 7 ].z = geometry.boundingBox.max.z + 2;

		selectionBox.geometry.computeBoundingSphere();
		selectionBox.geometry.verticesNeedUpdate = true;

		selectionBox.matrixWorld = object.matrixWorld;
		//selectionAxis.matrixWorld = object.matrixWorld;

		selectionBox.visible = true;

	}

	if ( hasRotation ) {

		//selectionAxis.visible = true;

	}
	render();
}

function onDocumentMouseWheel( event ) {
	/*console.log("zoom");
    fov -= event.wheelDeltaY * 0.05;
    camera.projectionMatrix = THREE.Matrix4.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 );*/
	if(g_selectedObject.selectedForPushpull)
	{
		currentActiveObj = active3DObject(null);
		if(currentActiveObj && currentActiveObj.scale) {
		if(event.wheelDelta > 0)
			currentActiveObj.scale.z+= 0.1;
		else
			currentActiveObj.scale.z-= 0.1;
		if(currentActiveObj.scale.z < 1)
			currentActiveObj.scale.z = 1;
		}
	}
	render();

}

function delete3DElement(element)
{
	if(!element)
		element = currentActiveObj;
		
	if(element)
	{
		for(var i=0; i<objects.length; i++) 
		{
			if(objects[i] == element)
			{
				objects.splice(i, 1);
				//sceneHelpers.remove(currentActiveObj);
				signals.removeSelectedObject.dispatch();
				selectionBox.visible = false;
				selectionAxis.visible = false;
				break;
			}
		}
		//scene.remove(selectionAxis);
		render();
	}
}

function isPictureCube(INTERSECTED) {
	for(var k=0;k<noOfPictureCubes; k++)
	{
		if(INTERSECTED == pictureCube[k])
			return true;
	}
	return false;
}

function exit3DPres()
{

	div3D = document.getElementById('3dCanvas');
	if(div3D)
	{
		 /* div3D.style.display = 'none';
		div3D.lastElementChild.style.display = 'none';
		div3D.lastElementChild.style.display = 'hidden';  */
		div3D.parentNode.removeChild(div3D);
	}

	//toggleToBirdEyeView();
	//customRenderAll();
	var menuItems = document.getElementById('vertical_menu');
	var arrowButton = document.getElementById('verticalMenuShowHide');
	menuItems.style.display = 'block';
	arrowButton.style.display = 'block';
	/* for(var i = 0; i< objects.length; i++)
	{
		signals.removeSelectedObject.dispatch(objects[i]);
	} */
	objects = [];
	viewportObj = null;
	viewport = null;
	zFactor = 0;
	pathArray3D = [];
	clearInterval(timerID);
	timerID=0;
	if( threeDPresentationTimer )
	{
		window.cancelAnimationFrame( threeDPresentationTimer );
		threeDPresentationTimer = null;
	}
	insertPicturedCube = true;
	
	var count = 0;
	for( count = 0; count < mainFabricCanvas._objects.length; count++)
	{
		mainFabricCanvas._objects[ count ].hasConverted = false;
		mainFabricCanvas._objects[ count ].threeDConvertedObject = null;
	}
}


function detectPath(obj)
{
	for(var j = 0; j < objectsOnPathArray.length ; j++) 
	{
		if(objectsOnPathArray[j] && obj != null)
		if((obj.id == objectsOnPathArray[j].id ) && obj.isObjectInPath)
			obj.index = j;
	}
}