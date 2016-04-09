var r_renderer = null;
var r_scene = null;
var r_mouse={x:0,y:0};
var r_viewPortInnerWidth = 0;
var r_viewPortInnerHeight = 0;
var r_projector = null;
var r_camera = null;
var r_objArray = new Array();
var roomBoxConfig = {

	width:1100,
	height:560,
	depth:2500,
	splitX:6,
	splitY:6,
	splitZ:20
};



function initRoomImageGalleryView() 
{

	var _imagesWall =[
						{url:'resources/roomGallery/wall.jpg'},
						{url:'resources/roomGallery/wall.jpg'},
						{url:'resources/roomGallery/wall.jpg'}, //ceiling
						{url:'resources/roomGallery/floor.jpg'},//floor
						{url:'resources/roomGallery/wall.jpg'},
						{url:'resources/roomGallery/wall.jpg'}
					];
					
	var _imagesFrame =[
						{url:'resources/roomGallery/frame.jpg'},
						{url:'resources/gallery/1.png'},
						{url:'resources/gallery/1.png'}, 
						{url:'resources/gallery/1.png'},
						{url:'resources/gallery/1.png'},
						{url:'resources/gallery/1.png'}
					];
			
	r_viewPortInnerWidth = parseInt(document.getElementById('roomImgGallery').style.width);
	r_viewPortInnerHeight = parseInt(document.getElementById('roomImgGallery').style.height);

	_windowHalfX = r_viewPortInnerWidth / 2;
	_windowHalfY = r_viewPortInnerHeight / 2;


	var container = document.getElementById('roomImgGallery');
	var w,h;

	w = r_viewPortInnerWidth;
	h = r_viewPortInnerHeight;

	container.style.width=w+"px";
	container.style.height=h+"px";
	container.style.marginTop=0.5*(r_viewPortInnerHeight-h)+'px';


	
	// r_renderer
	r_renderer = new THREE.WebGLRenderer();
	r_renderer.setSize(w, h);
	container.appendChild(r_renderer.domElement);
 
	r_viewPortInnerWidth = parseInt(r_renderer.domElement.width);
	r_viewPortInnerHeight = parseInt(r_renderer.domElement.height);
	r_projector = new THREE.Projector();
	// r_camera
	r_camera = new THREE.PerspectiveCamera(45, r_viewPortInnerWidth / r_viewPortInnerHeight, 1, 10000);
	r_camera.position.z = 1150;
	r_camera.position.x = 0;

	r_scene = new THREE.Scene();


	if (!roomImgGalleryDiv.IsListening())
	{
		r_renderer.domElement.addEventListener( 'dblclick', onDblClick, false );
		r_renderer.domElement.addEventListener( 'drop', dragImageIntoRoomImageGallery, false );
		
		//r_renderer.domElement.addEventListener( 'keydown', keyDownOnRoomGallery, false );
		//r_renderer.domElement.addEventListener( 'keyup', keyUpOnRoomGallery, false );
		
		//SISO : Neglect right click for context menu
		 r_renderer.domElement.addEventListener('contextmenu', function(event) {
			event.preventDefault();
			event.stopPropagation();
		}, false)
	}

	



	var materials = [];
	for (var i=0; i<_imagesWall.length ; i++) {
	  var img = new Image();
	  img.src = _imagesWall[i].url;
	  var tex = new THREE.Texture(img);
	  img.tex = tex;
	  img.onload = function() {
		this.tex.needsUpdate = true;
		//var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex, overdraw:true});
		//materials.push(mat);
	  };
	  var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex, overdraw:true});
	  materials.push(mat);
	}
	
	var geometry = new THREE.CubeGeometry(roomBoxConfig.width, roomBoxConfig.height, roomBoxConfig.depth, roomBoxConfig.splitX, roomBoxConfig.splitY, roomBoxConfig.splitZ, materials);
	var faceMaterial = new THREE.MeshFaceMaterial(materials);
		
	var boundingBox = new THREE.Mesh(geometry ,faceMaterial);
	
	boundingBox.scale.x = -1;
	boundingBox.type = "room";
	r_scene.add(boundingBox);
	r_objArray.push(boundingBox);
	
	// add subtle ambient lighting
	var ambientLight = new THREE.AmbientLight(0x555555);
	//r_scene.add(ambientLight);

	// add directional light source
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	//r_scene.add(directionalLight);

	// create wrapper object that contains three.js objects
	var three = {
		r_renderer: r_renderer,
		r_camera: r_camera,
		r_scene: r_scene,
		cube: cube
	};

	/*
	 * wait for texture image to load before
	 * starting the animation
	 */ 
	var textureImg = new Image();
	textureImg.onload = function(){
		animateRoomGalleryView();
	};
	textureImg.src = "resources/roomGallery/wall.jpg";
	
	addDummyWalls('front');
	addDummyWalls('right');
	addDummyWalls('left');
}


/* SISO */
function addDummyWalls(wall)
{
	switch(wall)
	{
		case 'front':
			var texture = new THREE.ImageUtils.loadTexture("resources/roomGallery/ash.jpg");
			var wallplane = new THREE.Mesh( new THREE.PlaneGeometry( roomBoxConfig.width, roomBoxConfig.height, 3, 3 ), new THREE.MeshBasicMaterial( { map: texture, overdraw: true, side: THREE.DoubleSide  } ) );
			wallplane.position = new THREE.Vector3( 0 ,0, -(roomBoxConfig.depth/2));
			wallplane.doubleSided = true;
			wallplane.scale.x=-1;
			wallplane.type = wall;
			wallplane.visible = false;
			r_scene.add(wallplane);
			r_objArray.push(wallplane);
		break;
		case 'right':
			var texture = new THREE.ImageUtils.loadTexture("resources/roomGallery/ash.jpg");
			var wallplane = new THREE.Mesh( new THREE.PlaneGeometry( roomBoxConfig.depth, roomBoxConfig.height, 3, 3 ), new THREE.MeshBasicMaterial( {map: texture,overdraw: true, side: THREE.DoubleSide  } ) );
			wallplane.rotation.y = Math.PI/2;
			wallplane.position = new THREE.Vector3( ((roomBoxConfig.width/2) -1) ,0, 0);
			wallplane.doubleSided = true;
			wallplane.scale.x=-1;
			wallplane.type = wall;
			wallplane.visible = false;
			r_scene.add(wallplane);
			r_objArray.push(wallplane);
		break;
		case 'left':
			var texture = new THREE.ImageUtils.loadTexture("resources/roomGallery/ash.jpg");
			var wallplane = new THREE.Mesh( new THREE.PlaneGeometry( roomBoxConfig.depth, roomBoxConfig.height, 3, 3 ), new THREE.MeshBasicMaterial( { map: texture, overdraw: true, side: THREE.DoubleSide  } ) );
			wallplane.rotation.y = 3* Math.PI/2;
			wallplane.position = new THREE.Vector3( -((roomBoxConfig.width/2) -1) ,0, 0);
			wallplane.doubleSided = true;
			wallplane.scale.x=-1;
			wallplane.type = wall;
			wallplane.visible = false;
			r_scene.add(wallplane);
			r_objArray.push(wallplane);
		break;
		
		
	}


}

/* SISO */
function addImageToRoomGallery(imagesFrame, picture, loc, wall)
{
	var texture = new THREE.ImageUtils.loadTexture(imagesFrame);
	var frameplane = new THREE.Mesh( new THREE.PlaneGeometry( 150, 200, 3, 3 ), new THREE.MeshBasicMaterial( { map: texture, color:0xFFFFFF, overdraw: true, side: THREE.DoubleSide  } ) );
	frameplane.type = 'frame';
	switch(wall)
	{
		case 'front':
			frameplane.position = new THREE.Vector3( loc.x, loc.y , loc.z + 1);
			//frameplane.doubleSided = true;
			frameplane.scale.x=-1;
			r_scene.add(frameplane);
			r_objArray.push(frameplane);
			break;
		case 'right':
			frameplane.position = new THREE.Vector3( loc.x - 1, loc.y , loc.z);
			frameplane.rotation.y = -Math.PI/2;
			//frameplane.doubleSided = true;
			frameplane.scale.x=-1;
			r_scene.add(frameplane);
			r_objArray.push(frameplane);
			break;
		case 'left':
			frameplane.position = new THREE.Vector3( loc.x + 1, loc.y , loc.z);
			//frameplane.doubleSided = true;
			frameplane.rotation.y =  Math.PI/2;
			frameplane.scale.x=-1;
			r_scene.add(frameplane);
			r_objArray.push(frameplane);
			break;
	}
	renderRoomGalleryView();
}

/*SISO*/
function removeImageFromRoomGallery(obj)
{
	if(obj)
	{
		r_scene.remove(obj);
		r_objArray.pop(obj);
		renderRoomGalleryView();
		console.log("removed");
	}		
}
	
/* Event Handling */
function onDblClick( event )
{
	var X = viewPortPoint(event, r_renderer.domElement).left; 
	var Y = viewPortPoint(event, r_renderer.domElement).top;

	event.preventDefault();
	dblclick=true;
	
	r_mouse.x = ( X / r_viewPortInnerWidth) * 2 - 1;
	r_mouse.y = - ( Y / r_viewPortInnerHeight ) * 2 + 1;


	var vector = new THREE.Vector3( r_mouse.x, r_mouse.y, 1 );
	r_projector.unprojectVector( vector, r_camera );

	var ray = new THREE.Ray( r_camera.position, vector.subSelf( r_camera.position ).normalize() );

	var intersects = ray.intersectObjects(r_objArray);
	if ( intersects.length > 0 )
	{
		for (var j = 0; j < intersects.length; j++)
		{
			//console.log(intersects[ j ].object.type);
			
			if ((intersects[ j ].object.type == "frame" ))
			{
				removeImageFromRoomGallery(intersects[ j ].object);
				break;
			}
			else if(intersects[ j ].object.type == "front" ||
					intersects[ j ].object.type == "left" ||
					intersects[ j ].object.type == "right")
			{
				var wall = intersects[ j ].object.type;
				var Locvector = new THREE.Vector3( intersects[ j ].point.x,  intersects[ j ].point.y, intersects[ j ].point.z);
				addImageToRoomGallery("resources/roomGallery/frame.jpg", "1.jpg", Locvector, wall);
			}
		}
	}


}
	
	
function dragImageIntoRoomImageGallery(evt)
{
	evt.preventDefault();
	evt.stopPropagation();
	if(r_renderer.domElement)
	{
		try
		{
			var url = event.dataTransfer.getData("URL");

			if (url && url != "")
			{
				var X = viewPortPoint(evt,r_renderer.domElement).left; 
				var Y = viewPortPoint(evt,r_renderer.domElement).top;

				var img = new Image();
				img.src = url;
				img.onload = function() {

					updateImageInRoomGallery(url, X, Y, null);
				};
			}
			else
			{
				var myFiles = evt.dataTransfer.files;
				for (var i = 0, f; f = myFiles[i]; i++)
				{
					var imageReader = new FileReader();
					imageReader.onload = (function(aFile)
					{

						return function(e)	{

							var X = viewPortPoint(evt,r_renderer.domElement).left; 
							var Y = viewPortPoint(evt,r_renderer.domElement).top;

							updateImageInRoomGallery(aFile.name, X, Y, e.target.result);
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



function updateImageInRoomGallery(url, clientX, clientY, src)
{
	if (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
	{
	
		r_mouse.x = ( clientX / r_viewPortInnerWidth ) * 2 - 1;
		r_mouse.y = - ( clientY / r_viewPortInnerHeight ) * 2 + 1;
		var vector = new THREE.Vector3( r_mouse.x, r_mouse.y, 1 );
		r_projector.unprojectVector( vector, r_camera );

		var ray = new THREE.Ray( r_camera.position, vector.subSelf( r_camera.position ).normalize() );

		var intersects = ray.intersectObjects(r_objArray);

		if ( intersects.length > 0 ) {
			
			for (var j = 0; j < intersects.length; j++)
			{
				if(intersects[ j ].object && intersects[ j ].object.type == "frame" )
				{
					try
					{
						var framePlane = intersects[ j ].object;
						
						//backup of origional frame dimension
						/*
						var h = framePlane.geometry.height;
						var w = framePlane.geometry.width;
						var x = framePlane.position.x;
						var y = framePlane.position.y;
						var z = framePlane.position.z;
						var angle = framePlane.rotation.y;
						var locVector = new THREE.Vector3(x, y, z);
						
						// remove frame
						removeImageFromRoomGallery(framePlane);
						*/
						var texture = null
						if (src)
						{
							texture = new THREE.ImageUtils.loadTexture(src);
						}
						else
						{
							texture = new THREE.ImageUtils.loadTexture(url);
						}
						
						texture.needsUpdate = true;
						framePlane.material.map = texture;
						
						//var imgPlane = new THREE.Mesh( new THREE.PlaneGeometry( w, h, 3, 3 ), new THREE.MeshBasicMaterial( { map: texture,overdraw: true, side: THREE.DoubleSide  } ) );

						
						
						//imgPlane.position = new THREE.Vector3( locVector.x, locVector.y , locVector.z);
						//imgPlane.rotation.y = angle;
						//imgPlane.type = "frame";
						//imgPlane.doubleSided = true;
						//imgPlane.scale.x = -1;
						
						//r_scene.add(imgPlane);
						//renderRoomGalleryView();
					}
					catch(ex)
					{
						alert(ex.message);
					}
				}
			}
			

		}
	}
}


/*function animateRoomGalleryView() {
	requestAnimationFrame( animateRoomGalleryView );
	renderRoomGalleryView();
}*/

function renderRoomGalleryView() {

	if(document.getElementById('roomImgGallery').style.display == 'block')
	{
		if(navigation.enable)
			r_updateNavigation(5);

		r_renderer.render(r_scene, r_camera);
	}
}
