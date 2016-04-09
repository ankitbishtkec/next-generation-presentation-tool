var sceneHelpers, selectionBox, selectionAxis;
var objects = [];
var projector, ray, camera, controls, mouseX =0, mouseY = 0;
var renderer,scene;
var helpersVisible = true;
var mousedownOnCanvas = false;
var yMovementMove, xMovementMove;
var lastMousePosX, lastMousePosY;
var picked = null, intersects;
var mouseXMouse = 0;
var cameraChanged;

var TARGET_OBJECT = null;

var mouseYMouse = 0;
var tgtRotMouse = 0;
var tgtRotX = 0;
var tgtRotY = 0;
var tgtRotMouseX = 0;
var tgtRotMouseY = 0;
var isEscKey;
var aspect;
var threeDPresentationTimer = null;

var Viewport = function ( signals ) {
	
	//navigation start
	//document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	//document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	//document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
	
	//document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	//document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	//document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
	
	
	//document.addEventListener( 'keydown', onKeyDownNavigation, false );
	//document.addEventListener( 'keyup', onKeyUp, false );
	//navigation stop
	
	document.addEventListener( 'drop', dragImageIntoPictureCube, false );

	var container = new UI.Panel( 'absolute' );
	//var container =new Object();
	//container.dom = document.getElementById('3DCanvas');
	container.setBackgroundColor( '#F6E3CE' );
	aspect = container.dom.offsetWidth / container.dom.offsetHeight;
	// settings

	var enableHelpersFog = true;
	var axisAtCenter = null; // SISO
	// helpers



	sceneHelpers = new THREE.Scene();

	var size = 10000, step = 25;
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
	var color1 = new THREE.Color( 0xE10B0B ), color2 = new THREE.Color( 0xF6E3CE );

	for ( var i = - size; i <= size; i += step ) {

		geometry.vertices.push( new THREE.Vector3( -size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(  size, 0, i ) );

		geometry.vertices.push( new THREE.Vector3( i, 0, -size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,  size ) );

		var color = i === 0 ? color1 : color2;

		geometry.colors.push( color, color, color, color );

	}

	var grid = new THREE.Line( geometry, material, THREE.LinePieces );
	sceneHelpers.add( grid );

	selectionBox = new THREE.Mesh( new THREE.CubeGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true, fog: false } ) );
	selectionBox.matrixAutoUpdate = false;
	selectionBox.visible = false;
	//sceneHelpers.add( selectionBox );

	selectionAxis = new THREE.AxisHelper( 100 );
	selectionAxis.material.depthTest = false;
	selectionAxis.material.transparent = true;
	selectionAxis.matrixAutoUpdate = false;
	selectionAxis.visible = false;
	sceneHelpers.add( selectionAxis );

	// default dummy scene and camera

	scene = new THREE.Scene();
	camera = new THREE.Camera();

	// fog

	var oldFogType = "None";
	var oldFogColor = 0xaaaaaa;
	var oldFogNear = 1;
	var oldFogFar = 5000;
	var oldFogDensity = 0.00025;

	// object picking

	var intersectionPlane = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, 8, 8 ) );
	intersectionPlane.visible = false;
	sceneHelpers.add( intersectionPlane );

	ray = new THREE.Ray();
	projector = new THREE.Projector();
	var offset = new THREE.Vector3();

	cameraChanged = false;


	//


	var selected = camera;

	// events

	var onMouseDown = function ( event ) {
	console.log(" mouse down tackball");
		mousedownOnCanvas = true;
		container.dom.focus();
		xMovementMove = event.clientX;
		yMovementMove = event.clientY;
		event.preventDefault();
		lastMousePosY = event.clientY;
		lastMousePosX = event.clientX;

		
		if (currentActiveObj && currentActiveObj.rotationMode)
		{
			//g_selectedObject.rotationMode = false;
			mouseXMouse = event.clientX - window.innerWidth / 2;
			mouseYMouse = event.clientY - window.innerHeight / 2;
			tgtRotMouseX = tgtRotX;
			tgtRotMouseY = tgtRotY;
			//currentActiveObj = null;
			return;
		}
		if ( event.button === 0 ) {

			var vector = new THREE.Vector3(
				( ( event.clientX - container.dom.offsetLeft ) / container.dom.offsetWidth ) * 2 - 1,
				- ( ( event.clientY - container.dom.offsetTop ) / container.dom.offsetHeight ) * 2 + 1,
				0.5
			);
			
			aspect = container.dom.offsetWidth / container.dom.offsetHeight;
		
			projector.unprojectVector( vector, camera );

			ray.set( camera.position, vector.subSelf( camera.position ).normalize() );

			intersects = ray.intersectObjects(objects, true);
			
			if (intersects.length > 0) {
				if( intersects[0].object.isTheme)
					return;
				
				TARGET_OBJECT = intersects[0].object;
				clickedFaceNormal = intersects[ 0 ].face.normal; 
				var geometry = intersects[0].object.geometry;
				saveTarget(TARGET_OBJECT,geometry,clickedFaceNormal,false);
				console.log(intersects[0].object);
				resetCamera = false;
				doubleClicked=true;
				contentViewingMode = false;
				noMoreCenterCamera = true;			
		}

			if ( intersects.length > 0 ) {
				controls.enabled = false;
				g_selectedObject.obj = intersects[ 0 ].object;
				picked = intersects[ 0 ].object;
				clickedFaceNormal = intersects[ 0 ].face.normal;

				var root;

				if ( picked.properties.isGizmo ) {

					root = picked.properties.gizmoRoot;
					selected = picked.properties.gizmoSubject;

				} else {

					root = picked;
					selected = picked;

				}

				intersectionPlane.position.copy( root.position );
				intersectionPlane.lookAt( camera.position );

				signals.objectSelected.dispatch( selected );

				intersects = ray.intersectObject( intersectionPlane );
				offset.copy( intersects[ 0 ].point ).subSelf( intersectionPlane.position );

				//document.addEventListener('mousemove', onMouseMove, false);
				//document.addEventListener('mouseup', onMouseUp, false);
				document.addEventListener('mousewheel', onMouseWheel, false);

			} else {

				if (contentViewingMode && doubleClicked) 
				{
					resetTarget(TARGET_OBJECT);
					doubleClicked = false;
				}
				if(resetCamera)
				{
					contentViewingMode = false;
					doubleClicked=true;
					var defaultCamera = createDefaultCamera();
					defaultCamera.rotation.z = 0.05541343034120165;
					defaultCamera.rotation.x = -0.13190747704631337;
					defaultCamera.rotation.y = 0.43133277605645903;
					defaultCamera.boundingSphere = new Object();
					defaultCamera.boundingSphere.radius = 0;
					saveTarget(defaultCamera,defaultCamera,null,false);
				}
				controls.enabled = true;

			}

		}

		cameraChanged = false;

	};

	var onMouseMove = function ( event ) {

		mouseX = event.clientX - window.innerWidth / 2;
		mouseY = event.clientY - window.innerHeight / 2;
		if(currentActiveObj)
			selectionAxis.visible = true;
		if(currentActiveObj && currentActiveObj.selectedForPushpull && mousedownOnCanvas) {
		if(event.clientX != lastMousePosX){
			if(lastMousePosX > event.clientX)
			currentActiveObj.scale.x-= (lastMousePosX - event.clientX)/10 ;
			else
			currentActiveObj.scale.x+= (event.clientX -lastMousePosX)/10 ;
			}
		
		if(event.clientY != lastMousePosY) {
			if(lastMousePosY > event.clientY)
			currentActiveObj.scale.y+= (lastMousePosY - event.clientY)/10 ;
			else
			currentActiveObj.scale.y-= (event.clientY -lastMousePosY)/10 ;
			}

			if(currentActiveObj.scale.x < 1)
				currentActiveObj.scale.x = 1;
			if(currentActiveObj.scale.y < 1)
				currentActiveObj.scale.y = 1;				
				//currentActiveObj.scale.z+= 0.5;
		}
		lastMousePosY = event.clientY;
		lastMousePosX = event.clientX;
		var vector = new THREE.Vector3(
			( ( event.clientX - container.dom.offsetLeft ) / container.dom.offsetWidth ) * 2 - 1,
			- ( ( event.clientY - container.dom.offsetTop ) / container.dom.offsetHeight ) * 2 + 1,
			0.5
		);

		projector.unprojectVector( vector, camera );

		ray.set( camera.position, vector.subSelf( camera.position ).normalize() );

		intersects = ray.intersectObject( intersectionPlane );

		if ( intersects.length > 0 ) {
			intersects[ 0 ].point.subSelf( offset );

			if ( picked.properties.isGizmo ) {

				picked.properties.gizmoRoot.position.copy( intersects[ 0 ].point );
				picked.properties.gizmoSubject.position.copy( intersects[ 0 ].point );
				signals.objectChanged.dispatch( picked.properties.gizmoSubject );

			} else {

				picked.position.copy( intersects[ 0 ].point );
				signals.objectChanged.dispatch( picked );

			}



		}
		render();

	};

	var onMouseUp = function ( event ) {
		mousedownOnCanvas = false;
		document.removeEventListener( 'mousemove', onMouseMove );
		document.removeEventListener( 'mouseup', onMouseUp );
		lastMousePosX = 0;
		lastMousePosY = 0;
	};

	var onMouseWheel = function( event ) {

		if(currentActiveObj && currentActiveObj.selectedForPushpull)
		{
			//currentActiveObj = active3DObject(null);
			if(currentActiveObj && currentActiveObj.scale) {
			if(event.wheelDelta > 0)
				currentActiveObj.scale.z+= 0.1;
			else
				currentActiveObj.scale.z-= 0.1;
			if(currentActiveObj.scale.z < 1)
				currentActiveObj.scale.z = 1;
			}
		}
		
		if(currentActiveObj && currentActiveObj.selectedForDepth)
		{
			
			if(currentActiveObj) {
			if(event.wheelDelta > 0)
			currentActiveObj.position.z+= 5;
			else if(event.wheelDelta < 0)
			currentActiveObj.position.z-= 5;
			}
		}
		render();

	};
	
	var onClick = function ( event ) {
	console.log(" onclick");	
	
	var editor = document.getElementById("editor");//text
	if(editor)//text
		editor.style.display = "none";//text
		
		/*if(contentViewingMode && doubleClicked )
			doubleClicked = false;*/
			
		if(currentActiveObj && currentActiveObj.rotationMode)
			currentActiveObj.rotationMode = false;
					var temp = document.getElementById('DymanicMenuContainer');
					temp.style.zIndex = 1;
				//initilizeContextMenu(container.dom);	
		if ( event.button == 0 && cameraChanged === false ) {

			var vector = new THREE.Vector3(
				( ( event.clientX - container.dom.offsetLeft ) / container.dom.offsetWidth ) * 2 - 1,
				- ( ( event.clientY - container.dom.offsetTop ) / container.dom.offsetHeight ) * 2 + 1,
				0.5
			);

			projector.unprojectVector( vector, camera );

			ray.set( camera.position, vector.subSelf( camera.position ).normalize() );
			intersects = ray.intersectObjects( objects, true );

			if ( intersects.length > 0 && ! controls.enabled ) {
				selected = intersects[ 0 ].object;
				clickedFaceNormal = intersects[ 0 ].face.normal;

			} else {

				selected = camera;

			}

			if ( selected.properties.isGizmo ) {

				signals.objectSelected.dispatch( selected.properties.gizmoSubject );

			} else {

				signals.objectSelected.dispatch( selected );

			}

		}
		if(intersects && intersects.length && intersects[0].object)
		{
			selectionBox.visible = true;
			selectionAxis.visible = true;
		}
		controls.enabled = true;

	};

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 27: // esc
				//signals.toggleHelpers.dispatch();
				break;

			case 46: // delete

				signals.removeSelectedObject.dispatch();

				break;

		}

	};
	
	var onKeyDownForStopRotation = function(event) {
		if ( event.keyCode == 27)
		{
			if(!isEscKey){
				isEscKey = true;
				render();
			}
		}
	}

	container.dom.addEventListener( 'mousedown', onMouseDown, false );
	container.dom.addEventListener( 'click', onClick, false );
	/*SISO*/
	container.dom.addEventListener('contextmenu', function(event) {
		showContextMenuForUpperCanvas(event)
	}, false);


	// controls need to be added *after* main logic,
	// otherwise controls.enabled doesn't work.

	controls = new THREE.TrackballControls( camera, container.dom );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.addEventListener( 'change', function () {

		cameraChanged = true;

		signals.cameraChanged.dispatch( camera );
		render();

	} );

	var handleAddition = function ( object ) {

		// add to picking list

		objects.push( object );

		// create helpers for invisible object types (lights, cameras, targets)

		if ( object instanceof THREE.DirectionalLight ) {

			var sphereSize = 5;
			var arrowLength = 30;

			var lightGizmo = new THREE.DirectionalLightHelper( object, sphereSize, arrowLength );
			sceneHelpers.add( lightGizmo );
			sceneHelpers.add( lightGizmo.targetSphere );
			sceneHelpers.add( lightGizmo.targetLine );

			object.properties.helper = lightGizmo;
			object.properties.pickingProxy = lightGizmo.lightSphere;
			object.target.properties.pickingProxy = lightGizmo.targetSphere;

			objects.push( lightGizmo.lightSphere );
			objects.push( lightGizmo.targetSphere );
			objects.push( lightGizmo.targetLine );

		} else if ( object instanceof THREE.PointLight ) {

			var sphereSize = 5;

			var lightGizmo = new THREE.PointLightHelper( object, sphereSize );
			sceneHelpers.add( lightGizmo );

			object.properties.helper = lightGizmo;
			object.properties.pickingProxy = lightGizmo.lightSphere;

			objects.push( lightGizmo.lightSphere );

		} else if ( object instanceof THREE.SpotLight ) {

			var sphereSize = 5;
			var arrowLength = 30;

			var lightGizmo = new THREE.SpotLightHelper( object, sphereSize, arrowLength );
			sceneHelpers.add( lightGizmo );
			sceneHelpers.add( lightGizmo.targetSphere );
			sceneHelpers.add( lightGizmo.targetLine );

			object.properties.helper = lightGizmo;
			object.properties.pickingProxy = lightGizmo.lightSphere;
			object.target.properties.pickingProxy = lightGizmo.targetSphere;

			objects.push( lightGizmo.lightSphere );
			objects.push( lightGizmo.targetSphere );
			objects.push( lightGizmo.targetLine );

		} else if ( object instanceof THREE.HemisphereLight ) {

			var sphereSize = 5;
			var arrowLength = 30;

			var lightGizmo = new THREE.HemisphereLightHelper( object, sphereSize, arrowLength );
			sceneHelpers.add( lightGizmo );

			object.properties.helper = lightGizmo;
			object.properties.pickingProxy = lightGizmo.lightSphere;

			objects.push( lightGizmo.lightSphere );

		}

	};


	// signals
	/*siso
	signals.objectRightClick.add( function (object) {
		render(); 	
	} );*/
	
	signals.objectAdded.add( function ( object ) {

		selectionBox.visible = false; //SISO : selection box should not visible when object is created.
		
		object.traverse( handleAddition );

		scene.add( object );

		if ( object instanceof THREE.Light && ! ( object instanceof THREE.AmbientLight ) )  {

			updateMaterials( scene );

		}

		render();
		//animate();
		signals.sceneChanged.dispatch( scene );

	} );

	signals.objectChanged.add( function ( object ) {

		if ( object instanceof THREE.Camera ) {

			object.updateProjectionMatrix();

		} else if ( object instanceof THREE.DirectionalLight ||
					object instanceof THREE.HemisphereLight ||
					object instanceof THREE.PointLight ||
					object instanceof THREE.SpotLight ) {

			object.properties.helper.update();

		} else if ( object.properties.targetInverse ) {

			object.properties.targetInverse.properties.helper.update();

		}

		render();

	} );

	signals.removeSelectedObject.add( function (obj) {

		if ( selected === camera ) return;

		var name = selected.name ?  '"' + selected.name + '"': "selected object";
		if(!obj) 
		if ( ! confirm( 'Delete ' + name + '?' ) ) {

			return;

		}

		// remove proxies from picking list

		var toRemove = {};

		var proxyObject = selected.properties.pickingProxy ? selected.properties.pickingProxy : selected;

		proxyObject.traverse( function ( child ) {

			toRemove[ child.id ] = true;

		} );

		// remove eventual pure Object3D target proxies from picking list

		if ( selected.target && !selected.target.geometry ) {

			toRemove[ selected.target.properties.pickingProxy.id ] = true;

		}

		//

		var newObjects = [];

		for ( var i = 0; i < objects.length; i ++ ) {

			var object = objects[ i ];

			if ( ! ( object.id in toRemove ) ) {

				newObjects.push( object );

			}

		}

		objects = newObjects;

		// clean selection highlight

		selectionBox.visible = false;
		selectionAxis.visible = false;

		// remove selected object from the scene
		if(selected && selected.parent) {
		selected.parent.remove( selected );
		selected.deallocate();
	}
		// remove eventual pure Object3D targets from the scene

		if ( selected.target && !selected.target.geometry ) {

			selected.target.parent.remove( selected.target );
			selected.target.deallocate();

		}

		// remove eventual helpers for the object from helpers scene

		var helpersToRemove = [];

		if ( selected.properties.helper ) {

			helpersToRemove.push( selected.properties.helper );

			if ( selected.properties.helper.targetLine ) helpersToRemove.push( selected.properties.helper.targetLine );
			if ( selected.target && !selected.target.geometry ) helpersToRemove.push( selected.properties.helper.targetSphere );


		}

		for ( var i = 0; i < helpersToRemove.length; i ++ ) {

			var helper = helpersToRemove[ i ];

			helper.parent.remove( helper );
			helper.deallocate();

		}

		if ( selected instanceof THREE.Light && ! ( selected instanceof THREE.AmbientLight ) )  {

			updateMaterials( scene );

		}

		render();

		signals.sceneChanged.dispatch( scene );
		signals.objectSelected.dispatch( null );

	} );

	signals.objectSelected.add( function ( object ) {

		selectionBox.visible = false;
		
		/*SISO : Selection Axis should be visible when user clicked on grid*/
		var showAtCenter = object instanceof THREE.Camera ;
		if (showAtCenter)
		{
			object = axisAtCenter;
			selectionBox.visible = false;
			selectionAxis.visible = true;
		}
		else
		{
			selectionAxis.visible = false;
		}
		
		if(object && object.xPath)
					{
						for (var i=0; i < object.xPath.length; i++)
						{
							object.translateX(object.xPath[i]);
							object.translateY(object.yPath[i]);
						}
			}
				
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

			vertices[ 0 ].x = geometry.boundingBox.max.x;
			vertices[ 0 ].y = geometry.boundingBox.max.y;
			vertices[ 0 ].z = geometry.boundingBox.max.z;

			vertices[ 1 ].x = geometry.boundingBox.max.x;
			vertices[ 1 ].y = geometry.boundingBox.max.y;
			vertices[ 1 ].z = geometry.boundingBox.min.z;

			vertices[ 2 ].x = geometry.boundingBox.max.x;
			vertices[ 2 ].y = geometry.boundingBox.min.y;
			vertices[ 2 ].z = geometry.boundingBox.max.z;

			vertices[ 3 ].x = geometry.boundingBox.max.x;
			vertices[ 3 ].y = geometry.boundingBox.min.y;
			vertices[ 3 ].z = geometry.boundingBox.min.z;

			vertices[ 4 ].x = geometry.boundingBox.min.x;
			vertices[ 4 ].y = geometry.boundingBox.max.y;
			vertices[ 4 ].z = geometry.boundingBox.min.z;

			vertices[ 5 ].x = geometry.boundingBox.min.x;
			vertices[ 5 ].y = geometry.boundingBox.max.y;
			vertices[ 5 ].z = geometry.boundingBox.max.z;

			vertices[ 6 ].x = geometry.boundingBox.min.x;
			vertices[ 6 ].y = geometry.boundingBox.min.y;
			vertices[ 6 ].z = geometry.boundingBox.min.z;

			vertices[ 7 ].x = geometry.boundingBox.min.x;
			vertices[ 7 ].y = geometry.boundingBox.min.y;
			vertices[ 7 ].z = geometry.boundingBox.max.z;

			selectionBox.geometry.computeBoundingSphere();
			selectionBox.geometry.verticesNeedUpdate = true;

			selectionBox.matrixWorld = object.matrixWorld;
			selectionAxis.matrixWorld = object.matrixWorld;
			
			if((intersects && intersects.length > 0) && !showAtCenter)
			{
				selectionBox.visible = true;
				sceneHelpers.add(selectionBox);
			}

		}

		if ( hasRotation ) {

			selectionAxis.visible = true;

		}
		showAtCenter = false;
		render();

	} );

	signals.materialChanged.add( function ( material ) {

		render();

	} );

	signals.clearColorChanged.add( function ( color ) {

		renderer.setClearColorHex( color, 1 );

		render();

	} );

	signals.fogTypeChanged.add( function ( fogType ) {

		if ( fogType !== oldFogType ) {

			if ( fogType === "None" ) {

				scene.fog = null;

			} else if ( fogType === "Fog" ) {

				scene.fog = new THREE.Fog( oldFogColor, oldFogNear, oldFogFar );

			} else if ( fogType === "FogExp2" ) {

				scene.fog = new THREE.FogExp2( oldFogColor, oldFogDensity );

			}

			updateMaterials( scene );

			if ( enableHelpersFog )	{

				sceneHelpers.fog = scene.fog;
				updateMaterials( sceneHelpers );

			}

			oldFogType = fogType;

		}

		render();

	} );

	signals.fogColorChanged.add( function ( fogColor ) {

		oldFogColor = fogColor;

		updateFog( scene );

		render();

	} );

	signals.fogParametersChanged.add( function ( near, far, density ) {

		oldFogNear = near;
		oldFogFar = far;
		oldFogDensity = density;

		updateFog( scene );

		render();

	} );

	signals.windowResize.add( function () {

		camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
		camera.updateProjectionMatrix();

		//container.dom.style.width = '3000px';
		//container.dom.style.zIndex = '0px';
		renderer.setSize( container.dom.offsetWidth, container.dom.offsetHeight );

		render();

	} );

	signals.exportGeometry.add( function () {

		if ( !selected.geometry ) {

			console.warn( "Selected object doesn't have any geometry" );
			return;

		}

		var output = new THREE.GeometryExporter().parse( selected.geometry );

		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		window.open( objectURL, '_blank' );
		window.focus();

	} );

	signals.exportScene.add( function () {

		var clearColor = renderer.getClearColor();
		var clearAlpha = renderer.getClearAlpha();

		var output = new THREE.SceneExporter().parse( scene, clearColor, clearAlpha );

		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		window.open( objectURL, '_blank' );
		window.focus();

	} );

	signals.toggleHelpers.add( function () {

		helpersVisible = !helpersVisible;
		render();

	} );

	signals.resetScene.add( function () {

		var defaultScene = createDefaultScene();
		var defaultCamera = createDefaultCamera();
		var defaultBgColor = new THREE.Color( 0xABABAB );

		defaultCamera.lookAt( defaultScene.position );
		defaultScene.add( defaultCamera );

		signals.sceneAdded.dispatch( defaultScene, defaultCamera, defaultBgColor );
		signals.objectSelected.dispatch( defaultScene.properties.defaultSelection );

	} );

	signals.sceneAdded.add( function ( newScene, newCamera, newClearColor ) {

		scene = newScene;

		// remove old gizmos

		var toRemove = {};

		sceneHelpers.traverse( function ( child ) {

			if ( child.properties.isGizmo ) {

				toRemove[ child.id ] = child;

			}

		} );

		for ( var id in toRemove ) {

			sceneHelpers.remove( toRemove[ id ] );

		}

		// reset picking list

		objects = [];

		// add new gizmos and fill picking list

		scene.traverse( handleAddition );

		//

		if ( newCamera ) {

			camera = newCamera;
			camera.properties.active = true;

			camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
			camera.updateProjectionMatrix();

			controls.object = camera;
			controls.update();

		}

		if ( newClearColor ) {

			signals.clearColorChanged.dispatch( newClearColor.getHex() );

		}

		if ( newScene.fog ) {

			oldFogColor = newScene.fog.color.getHex();

			if ( newScene.fog instanceof THREE.Fog ) {

				oldFogType = "Fog";
				oldFogNear = newScene.fog.near;
				oldFogFar = newScene.fog.far;

			} else if ( newScene.fog instanceof THREE.FogExp2 ) {

				oldFogType = "FogExp2";
				oldFogDensity = newScene.fog.density;

			}

		} else {

			oldFogType = "None";

		}

		if ( enableHelpersFog )	{

			sceneHelpers.fog = scene.fog;
			updateMaterials( sceneHelpers );

		}

		signals.sceneChanged.dispatch( scene );
		signals.objectSelected.dispatch( null );

	} );

	//

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false, clearColor: 0xaaaaaa, clearAlpha: 1 } );
	renderer.autoClear = false;
	renderer.autoUpdateScene = false;
	container.dom.appendChild( renderer.domElement );
	
	{
	var width = window.innerWidth || 2;
	var height = window.innerHeight || 2;

	effect = new THREE.AnaglyphEffect( renderer );
	effect.setSize( width, height );
	}//anaglyph

	animate();

	// set up for hotkeys
	// must be done here, otherwise it doesn't work

	container.dom.tabIndex = 1;
	container.dom.style.outline = 'transparent';
	container.dom.addEventListener( 'keydown', onKeyDown, false );
	window.addEventListener( 'keydown', onKeyDownForStopRotation, false );
	//renderer.domElement.addEventListener( 'dblclick', onDoubleClick, false );
	renderer.domElement.addEventListener( 'drop', dragImageIntoPictureCube, false );
	renderer.domElement.addEventListener( 'dblclick', handleMediaInteraction, false );

	// must come after listeners are registered

	signals.sceneChanged.dispatch( scene );
	function handleMediaInteraction(event)
	{
		event.preventDefault();
		var vector = new THREE.Vector3(
			( ( event.clientX - container.dom.offsetLeft ) / container.dom.offsetWidth ) * 2 - 1,
			- ( ( event.clientY - container.dom.offsetTop ) / container.dom.offsetHeight ) * 2 + 1,
			0.5
		);

		projector.unprojectVector( vector, camera );
		ray.set( camera.position, vector.subSelf( camera.position ).normalize() );
		var intersects = ray.intersectObjects( objects, true );

		if ( intersects.length > 0 ) {
			var activeObj = intersects[ 0 ].object;
			if (activeObj.mediaType)
			{
				switch(activeObj.mediaType)
				{
					case "video":
					case "audio":
					
					if (activeObj.htmlElement.paused)
						activeObj.htmlElement.play();
					else
						activeObj.htmlElement.pause();
					break;

					case "image":
						break;
				}
			}
		}

	}

	//MTC---start
	function onDoubleClick( event )	{
	
			var editor = document.getElementById("editor");//text
			if(editor)//text
				editor.style.display = "none";//text
				
				var vector = new THREE.Vector3(
				( ( event.clientX - container.dom.offsetLeft ) / container.dom.offsetWidth ) * 2 - 1,
				- ( ( event.clientY - container.dom.offsetTop ) / container.dom.offsetHeight ) * 2 + 1,
				0.5
			);

			projector.unprojectVector( vector, camera );

			ray.set( camera.position, vector.subSelf( camera.position ).normalize() );

		intersects = ray.intersectObjects(objects, true);
	}

	function isPictureCube(INTERSECTED) {
		for(var k=0;k<noOfPictureCubes; k++)
		{
			if(INTERSECTED == pictureCube[k])
				return true;
		}
		return false;
	}
	
	function dragImageIntoPictureCube(evt) {
	evt.preventDefault();
	evt.stopPropagation();
	if(renderer.domElement)
	{
		try
		{
			var url = event.dataTransfer.getData("URL");
			if (url && url != "")
			{
							updateImageInTexturedCube(url, evt.clientX, evt.clientY, null);
			}
			else
			{
				var myFiles = evt.dataTransfer.files;
				console.log(myFiles);
				for (var i = 0, f; f = myFiles[i]; i++)
				{
					var imageReader = new FileReader();
					imageReader.onload = (function(theFile)
					{
						return function(e)	{
							updateImageInTexturedCube(theFile.name, evt.clientX, evt.clientY, e.target.result);
						};
					})(f);
					imageReader.readAsDataURL(f);
				}
			}
		}
		catch(ex)
		{
			alert(ex.message);
		}
	}
}

		function updateImageInTexturedCube(url, clientX, clientY, src){
			console.log("Drag and drop to picturecube");
			if (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
			{
			
			var vector = new THREE.Vector3(
				( ( clientX   - container.dom.offsetLeft) / container.dom.offsetWidth ) * 2 - 1,
				- ( ( clientY - container.dom.offsetTop) / container.dom.offsetHeight ) * 2 + 1,
				1
			);
			
			projector.unprojectVector( vector, camera );

			ray.set( camera.position, vector.subSelf( camera.position ).normalize() );

			intersects = ray.intersectObjects( objects, true );
				
				//console.log(pictureCube.position);

				if ( intersects.length > 0 ) 
				{
					console.log(intersects[0].point);
					if(isPictureCube(intersects[ 0 ].object))
					{
						console.log("pictureCube");
						var tex = null;
						if (src)
						{
							tex = new THREE.ImageUtils.loadTexture(src);
						}
						else
						{
							tex = new THREE.ImageUtils.loadTexture(url);
						}
								
						tex.needsUpdate = true;
						intersects[ 0 ].object.material.materials[intersects[ 0 ].face.materialIndex].map = tex;
						//render();
					}
					else
					{
						var cubeTexture = null;
						/*if (src)
						{
							cubeTexture = new THREE.ImageUtils.loadTexture(src);
						}
						else
						{
							cubeTexture = new THREE.ImageUtils.loadTexture(url);
						}
						cubeTexture.needsUpdate = true;
								var materials = [];
								for( var j=0; j<6; j++)
								{
									var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: cubeTexture, overdraw:true});
									materials.push(mat);
								}
								var faceMaterial = new THREE.MeshFaceMaterial(materials);
								console.log(intersects[ 0 ].object.material);
								//materials[ 0 ] = new THREE.MeshBasicMaterial();
								intersects[ 0 ].object.material = faceMaterial;
								render();*/
						alert("create a pictureCube first");
					}
				}
			}
}
	
	//MTC---end	
	
	function updateMaterials( root ) {

		root.traverse( function ( node ) {

			if ( node.material ) {

				node.material.needsUpdate = true;

			}

			if ( node.geometry && node.geometry.materials ) {

				for ( var i = 0; i < node.geometry.materials.length; i ++ ) {

					node.geometry.materials[ i ].needsUpdate = true;

				}

			}

		} );

	}

	function updateFog( root ) {

		if ( root.fog ) {

			root.fog.color.setHex( oldFogColor );

			if ( root.fog.near !== undefined ) root.fog.near = oldFogNear;
			if ( root.fog.far !== undefined ) root.fog.far = oldFogFar;
			if ( root.fog.density !== undefined ) root.fog.density = oldFogDensity;

		}

	}

	function createDefaultScene() {

		// create scene

		var scene = new THREE.Scene();

		// create lights

		var light1 = new THREE.DirectionalLight( 0xffffff, 0.8 );
		light1.position.set( 1, 0.5, 0 ).multiplyScalar( 400 );

		var light2 = new THREE.SpotLight( 0xffffff, 1.5, 500, Math.PI * 0.025 );
		light2.position.set( - 1, 0.5, 1 ).multiplyScalar( 300 );

		var light3 = new THREE.PointLight( 0xffaa00, 0.75 );
		light3.position.set( -250, 200, -200 );

		//var light4 = new THREE.AmbientLight( 0x111111 );
		var light4 = new THREE.HemisphereLight( 0x00aaff, 0xff0000, 0.75 );
		light4.position.y = 250;

		light1.target.properties.targetInverse = light1;
		light2.target.properties.targetInverse = light2;

		// create objects

		var geometry = new THREE.SphereGeometry( 75, 25, 15 );

		var material = new THREE.MeshPhongMaterial();
		material.color.setHSV( Math.random(), Math.random(), 1 );

		var mesh = new THREE.Mesh( geometry, material );

		// set default names

		light1.name = "Light 1";

		light1.target.name = "Light 1 Target";

		light2.name = "Light 2";
		light2.target.name = "Light 2 Target";

		light3.name = "Light 3";

		light4.name = "Light 4";

		mesh.name = "Sphere";

		// set default selection

		var geometry = new THREE.SphereGeometry( 75, 25, 15 );

		var material = new THREE.MeshPhongMaterial();
		material.color.setHSV( Math.random(), Math.random(), 1 );

		var mesh = new THREE.Mesh( geometry, material );
		scene.properties.defaultSelection = mesh;

		// add to scene

		scene.add( light1 );
		scene.add( light2 );
		scene.add( light3 );
		scene.add( light4 );
		axisAtCenter = mesh; // SISO
		//scene.add( mesh );

		return scene;

	}

	function createDefaultCamera() {

		var camera = new THREE.PerspectiveCamera( 50, 1, 1, 50000 );
		camera.position.set( 1154.7406027235259 , 330 , 2487.2269153438556  );

		camera.name = "Camera";
		camera.properties.active = true;
		
		pitchObject = new THREE.Object3D();
	    pitchObject.add( camera );
        
		yawObject = new THREE.Object3D();
		yawObject.position.y = 10;
		yawObject.add( pitchObject );

		return camera;

	}
	
	this.customRenderer = function () {
		render(); 
	}
	var diff = 5;
	var diff1 =0.002;
	var count3=0;
	function render() {
		
		for (var count = 0; count < objects.length; count++)
		{
		
			var angleChange = 10 * 2 * Math.PI / 1000;

			if (objects[count] && objects[count].rotationDir)
			{
				var dir = objects[count].rotationDir;
				if (isEscKey)
				{
					objects[count].rotationDir = "Stop Rotation";
				}
				else if (dir == "Stop Rotation")
				{

				}
				else if(dir == "RotationX")
				{
					objects[count].rotation.x += angleChange;
				}
				else if (dir == "RotationY")
				{
					objects[count].rotation.y += angleChange;
				}
				else if (dir == "RotationZ")
				{
					objects[count].rotation.z += angleChange;
				}
			
			}
			if(objects[count] && objects[count].linear)
			{
				//for(var i=1; i <= 1000 ; i++)
				{
					objects[count].translateZ( -1*diff);// = -5;
					count3++;
				}	
				if(count3 > 1000)
				{
				diff = -1*diff;
				count3 =0;
				}
				//for(var i=1; i <= 1000 ; i++)
			//	{
			//		objects[count].translateX(-i);// = -5;

			//	}						
			}
			if(objects[count] && objects[count].zoom)
			{
				//for(var i=1; i <= 1000 ; i++)
				{
					objects[count].scale.x += diff1;// = -5;
					objects[count].scale.y += diff1;// = -5;
					objects[count].scale.z += diff1;// = -5;
					count3 = count3+10;
				}	
				if(count3 > 1000)
				{
				diff1 = -1*diff1;
				count3 =0;
				}
				//for(var i=1; i <= 1000 ; i++)
			//	{
			//		objects[count].translateX(-i);// = -5;

			//	}						
			}
			if (objects[count] && objects[count].scaleFDimension)
			{
				var scale = objects[count].scaleFDimension;
				if(scale == "ScaleX")
				{
					objects[count].scale.x += 0.2;

				}
				else if(scale == "ScaleY")
				{
					objects[count].scale.y += 0.2;

				}
				else if(scale == "ScaleZ")
				{
					objects[count].scale.z += 0.2;
				}
				objects[count].scaleFDimension = null;
			}
			
			if(objects[count] && objects[count].rotationMode)
			{
				lastMousePositionX = 0;
				lastMousePositionY = 0;
			//	mouseX = event.clientX - window.innerWidth / 2;
			//	mouseY = event.clientY - window.innerHeight/2;
				
				tgtRotX = tgtRotMouseX + (mouseX - mouseXMouse) ;
				tgtRotY = tgtRotMouseY + (mouseY - mouseYMouse) ;
				//var currentActiveObj = g_selectedObject.obj;
	
				objects[count].rotation.x = (tgtRotX - objects[count].rotation.x)*0.05;
				objects[count].rotation.y = (tgtRotY - objects[count].rotation.y)*0.05;
			}
			
			if(objects[count] && objects[count].htmlElement && objects[count].htmlElement.nodeName == "VIDEO")
			{
					objects[count].textureObj.needsUpdate = true;
			}
			
		}
		
		if (isEscKey)
			isEscKey = false;
		
		
		//MTC---start---
		
		if(!contentViewingMode && doubleClicked )
		{
			if(speedAnimation > 0 )
			/*if((Math.floor(camera.position.x) != Math.floor(targetCamera.x)) || (Math.floor(camera.position.y) != Math.floor(targetCamera.y)) || (Math.floor(camera.position.z) != Math.floor(targetCamera.z)))*/
			{
				camera.position.x -= cameraPath.x;
				camera.position.y -= cameraPath.y;
				camera.position.z -= cameraPath.z;
				
				if(towardsPositiveX)
					prevTempRotation.x += cameraPath.rotationX;
				else if(!towardsPositiveX)	
					prevTempRotation.x -= cameraPath.rotationX;
				
				if(towardsPositiveY)
					prevTempRotation.y += cameraPath.rotationY;
				else if(!towardsPositiveY)
					prevTempRotation.y -= cameraPath.rotationY;
				
				if(towardsPositiveZ)
					prevTempRotation.z += cameraPath.rotationZ;
				else if(!towardsPositiveZ)
					prevTempRotation.z -= cameraPath.rotationZ;
				
				camera.rotation.x = prevTempRotation.x;
				camera.rotation.y = prevTempRotation.y;
				camera.rotation.z = prevTempRotation.z;
				
				speedAnimation--;
				//console.log((Math.floor(camera.position.x) != Math.floor(targetCamera.x)));
				//console.log(camera.position.x,camera.position.y,camera.position.z,camera.rotation.x,camera.rotation.y,camera.rotation.z);
				
			}
			else 
			{
				contentViewingMode = true;
				if(resetCamera)
				{
					resetCamera = false;
				}
				targetCamera.rotationX = 0;
				targetCamera.rotationY = 0;
				targetCamera.rotationZ = 0;
				//console.log(camera.position.x,camera.position.y,camera.position.z,camera.rotation.x,camera.rotation.y,camera.rotation.z);
			}
		}
		if(contentViewingMode && !doubleClicked)
		{
			if(speedAnimation < speedRatio)
			/*if(Math.floor(camera.position.x) != Math.floor(targetCamera.x) || Math.floor(camera.position.y) != Math.floor(targetCamera.y) || Math.floor(camera.position.z) != Math.floor(targetCamera.z))*/
			{
				camera.position.x += cameraPath.x;
				camera.position.y += cameraPath.y;
				camera.position.z += cameraPath.z;
				
				if(towardsPositiveX)
					prevTempRotation.x += cameraPath.rotationX;
				else if(!towardsPositiveX)	
					prevTempRotation.x -= cameraPath.rotationX;
				
				if(towardsPositiveY)
					prevTempRotation.y += cameraPath.rotationY;
				else if(!towardsPositiveY)
					prevTempRotation.y -= cameraPath.rotationY;
				if(towardsPositiveZ)
					prevTempRotation.z += cameraPath.rotationZ;
				else if(!towardsPositiveZ)
					prevTempRotation.z -= cameraPath.rotationZ;
				
				camera.rotation.x = prevTempRotation.x;
				camera.rotation.y = prevTempRotation.y;
				camera.rotation.z = prevTempRotation.z;
				
				speedAnimation++;
				
				console.log(camera.position.x,camera.position.y,camera.position.z,camera.rotation.x,camera.rotation.y,camera.rotation.z);
			}
			else
			{
				contentViewingMode = false;
				targetCamera.rotationX = 0;
				targetCamera.rotationY = 0;
				targetCamera.rotationZ = 0;
				resetCamera = true;
			}

		}
		//MTC---end---

		sceneHelpers.updateMatrixWorld();
		scene.updateMatrixWorld();

		renderer.clear();
		if( document.getElementById("anaglyph") && document.getElementById("anaglyph").checked == false)
		{
			renderer.render( scene, camera );
		}
		else
		{
			effect.render( scene, camera );
		}
//cube.rotation.x = 10;

		if ( helpersVisible ) {

			//renderer.render(sceneHelpers, camera);

		}
		
	}
	
	

	function animate() {

		threeDPresentationTimer = requestAnimationFrame( animate );
		controls.update();
		if( isIn3DPresentationMode == true )
			updateNavigation( 5 );
		//if(currentActiveObj && ( currentActiveObj.rotationMode || currentActiveObj.rotationDir || currentActiveObj.scaleFDimension))
			render();
				
	}


	//return container;
	this.viewportContainer = container;
	return this;
	
}
