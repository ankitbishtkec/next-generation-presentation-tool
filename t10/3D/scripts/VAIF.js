var insertPicturedCube = true;
var normalDetection = new Array();

function initNormalDetection()
{
	var data1 = {};
	data1.x = 0;
	data1.y = 0;
	data1.z = -1;
	normalDetection.push(data1);

	var data2 = {};
	data2.x = 0;
	data2.y = 0;
	data2.z = 1;
	normalDetection.push(data2);

	var data3 = {};
	data3.x = 0;
	data3.y = -1;
	data3.z = 0;
	normalDetection.push(data3);

	var data4 = {};
	data4.x = 0;
	data4.y = 1;
	data4.z = 0;
	normalDetection.push(data4);

	var data5 = {};
	data5.x = -1;
	data5.y = 0;
	data5.z = 0;
	normalDetection.push(data5);

	var data6 = {};
	data6.x = 1;
	data6.y = 0;
	data6.z = 0;
	normalDetection.push(data6);
}

/* Vedio */

function insertVideoInto3D(obj)
{
	detectPath(obj);
	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth;
	var height = obj.currentHeight;
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (1000/lengthOf3DObjects);
	
	if(!obj)
		return;
	
	var htmlElement = obj.attachObject;
	
	var video = document.createElement('video');
	video.width	= htmlElement.currentWidth;
	video.height = htmlElement.currentHeight;
	
	if( htmlElement.firstChild) {
		video.src	= htmlElement.firstChild.getAttribute("src");
		htmlElement.pause();
	}

	var videoTexture = new THREE.Texture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	videoTexture.format = THREE.RGBFormat;
	videoTexture.generateMipmaps = false;

	var geometry = new THREE.CubeGeometry(obj.getWidth(),obj.getHeight(),100);
	//var geometry = new THREE.PlaneGeometry(obj.getWidth(), obj.getHeight(), 3, 3 );
	var material = new THREE.MeshBasicMaterial({
		map	: videoTexture,overdraw: true, side: THREE.DoubleSide 
	});

	var videoPlane = new THREE.Mesh(geometry, material);
	
	if(obj.index >= 0)
	{
		pathArray3D[obj.index] = videoPlane;
	}
	
	videoPlane.scale.x = obj.scaleX;
	videoPlane.scale.y = obj.scaleY;
		
	if(x && y)
	{
		videoPlane.position.x = x;
		videoPlane.position.y = y;
		if(obj.frameChild)
		{
			videoPlane.position.y = height/2;
			videoPlane.position.z = y;
		}
		else
		{
			videoPlane.position.z = zFactor;
			zFactor += zFac; 
		}
	}
	else 
	{
		videoPlane.position.x = Math.random() * 1000 - 500;
		videoPlane.position.y = Math.random() * 600 - 300;
	}
		
	if(obj.isRotate)
		videoPlane.rotationDir = 'RotationX';
		
	if(obj.isLinear)
		videoPlane.linear = true;
		
	if(obj.theta)
	videoPlane.rotation.x += obj.theta;

	if(obj.isZoom)
		videoPlane.zoom = true;
	else
		videoPlane.zoom = false;
	if(obj.xPath && obj.xPath.length)
	{		
		videoPlane.xPath = obj.xPath;
		videoPlane.yPath = obj.yPath;
	}	
		
	videoPlane.htmlElement = video;
	videoPlane.textureObj = videoTexture;
	
	videoPlane.mediaType = "video";
	objects.push(videoPlane);
	signals.objectAdded.dispatch(videoPlane);
	return videoPlane;
}

function insertVedio3DNew(x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D)
{
	if(!obj2D)
		return;
		
	detectPath(obj2D);
	
	var htmlElement = obj2D.attachObject;
	
	var video = document.createElement('video');
	video.width = htmlElement.currentWidth;
	video.height = htmlElement.currentHeight;

	if( htmlElement.firstChild) {
		video.src	= htmlElement.firstChild.getAttribute("src");
		htmlElement.pause();
	}

	var videoTexture = new THREE.Texture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	videoTexture.format = THREE.RGBFormat;
	videoTexture.generateMipmaps = false;

	var geometry = new THREE.CubeGeometry(width , height, depth);
	var material = new THREE.MeshBasicMaterial({
		map	: videoTexture, overdraw: true, opacity: opacity, side: THREE.DoubleSide 
	});

	var videoPlane = new THREE.Mesh(geometry, material);
	
	if(obj2D.index >= 0)
	{
		pathArray3D[obj2D.index] = videoPlane;
	}
	
	videoPlane.position.x = x;
	videoPlane.position.y = y;
	videoPlane.position.z = z;
	
	videoPlane.rotation.x = rx ;
	videoPlane.rotation.y = ry ;
	videoPlane.rotation.z = rz ;
	
	videoPlane.geometry.computeBoundingBox();
	videoPlane.scale.x = width * sx/ ( videoPlane.geometry.boundingBox.max.x - videoPlane.geometry.boundingBox.min.x ) ;
	videoPlane.scale.y = height * sy/ ( videoPlane.geometry.boundingBox.max.y - videoPlane.geometry.boundingBox.min.y ) ;
	videoPlane.scale.z = sz;

	if(obj2D.isRotate)
		videoPlane.rotationDir = 'RotationX';
		
	if(obj2D.isLinear)
		videoPlane.linear = true;
		
	if(obj2D.isZoom)
		videoPlane.zoom = true;
	else
		videoPlane.zoom = false;
		
	if(obj2D.xPath && obj2D.xPath.length)
	{		
		videoPlane.xPath = obj2D.xPath;
		videoPlane.yPath = obj2D.yPath;
	}	
		
	videoPlane.htmlElement = video;
	videoPlane.textureObj = videoTexture;
	
	videoPlane.mediaType = "video";
	objects.push(videoPlane);
	signals.objectAdded.dispatch(videoPlane);
	return videoPlane;
}

/* Image */

function insertImageInto3D(obj)
{
	detectPath(obj);
	var x = obj.getLeft();
	var y = obj.getTop();
	var width = obj.currentWidth;
	var height = obj.currentHeight;
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (1000/lengthOf3DObjects);
	
	if(!obj)
		return;
	
	var htmlElement = obj._element;
	
	var img = new Image();
	img.src = htmlElement.getAttribute("src");
	
	img.onload = function() {
		var imgTexture = new THREE.ImageUtils.loadTexture(img.src);
		var geometry = new THREE.PlaneGeometry(obj.getWidth(), obj.getHeight(), 3, 3 );
		var material = new THREE.MeshBasicMaterial({
			map	: imgTexture,overdraw: true, side: THREE.DoubleSide, transparent: true 
		});
			
		
		
		var imgPlane = new THREE.Mesh(geometry, material);
		imgPlane.doubleSided = true;
	
		if(obj.index >= 0)
		{
			pathArray3D[obj.index] = imgPlane;
		}
		
		if(x && y)
		{
			imgPlane.position.x = x;
			imgPlane.position.y = y;
			if(obj.frameChild)
			{
			imgPlane.position.y = height/2;
			imgPlane.position.z = y;
			}
			else
			{
				imgPlane.position.z = zFactor;
				zFactor += zFac; 
			}
		}
		else 
		{
			imgPlane.position.x = Math.random() * 1000 - 500;
			imgPlane.position.y = Math.random() * 600 - 300;
		}
	
		if(obj.isRotate)
			imgPlane.rotationDir = 'RotationX';
		if(obj.isLinear)
			imgPlane.linear = true;
		if(obj.theta)
			imgPlane.rotation.x += obj.theta;
		if(obj.isZoom)
			imgPlane.zoom = true;
		else
			imgPlane.zoom = false;
		if(obj.xPath && obj.xPath.length)
		{		
			imgPlane.xPath = obj.xPath;
			imgPlane.yPath = obj.yPath;
		}	
		
		imgTexture.needsUpdate = true;
		
			imgPlane.mediaType = "image";
			imgPlane.htmlElement = img;
		objects.push(imgPlane);
		signals.objectAdded.dispatch(imgPlane);
		return imgPlane;
	};				
}

function insertImage3DNew(x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D)
{	
	if(!obj2D)
		return;
	
	detectPath(obj2D);
		
	var htmlElement = obj2D._element;
	
	var img = new Image();
	img.src = htmlElement.getAttribute("src");
	
	img.onload = function() {
		var imgTexture = new THREE.ImageUtils.loadTexture(img.src);
		var geometry = new THREE.PlaneGeometry(width, height, 3, 3 );
		var material = new THREE.MeshBasicMaterial({
			map	: imgTexture,overdraw: true, opacity: opacity, side: THREE.DoubleSide, transparent: true 
		});
			
		var imgPlane = new THREE.Mesh(geometry, material);
		imgPlane.doubleSided = true;
		
		if(obj2D.index >= 0)
		{
			pathArray3D[obj2D.index] = imgPlane;
		}
		
		imgPlane.position.x = x;
		imgPlane.position.y = y;
		imgPlane.position.z = z;
		
		imgPlane.rotation.x = rx ;
		imgPlane.rotation.y = ry ;
		imgPlane.rotation.z = rz ;
		
		imgPlane.geometry.computeBoundingBox();
		imgPlane.scale.x = width * sx/ ( imgPlane.geometry.boundingBox.max.x - imgPlane.geometry.boundingBox.min.x ) ;
		imgPlane.scale.y = height * sy/ ( imgPlane.geometry.boundingBox.max.y - imgPlane.geometry.boundingBox.min.y ) ;
		imgPlane.scale.z = sz;
	
	
		if(obj2D.isRotate)
			imgPlane.rotationDir = 'RotationX';
			
		if(obj2D.isLinear)
			imgPlane.linear = true;

		if(obj2D.isZoom)
			imgPlane.zoom = true;
		else
			imgPlane.zoom = false;
			
		if(obj2D.xPath && obj2D.xPath.length)
		{		
			imgPlane.xPath = obj2D.xPath;
			imgPlane.yPath = obj2D.yPath;
		}	
		
		imgTexture.needsUpdate = true;
		
		imgPlane.mediaType = "image";
		imgPlane.htmlElement = img;
		objects.push(imgPlane);
		signals.objectAdded.dispatch(imgPlane);
		return imgPlane;
	};
}

/* Audio */

function insertAudioInto3D(obj)
{
	if(!obj)
		return;

	detectPath(obj);
			
	var htmlElement = obj._element;
	
	var audioEle = document.getElementById(obj.media);
	
	if(audioEle)
		audioEle.pause();
	
	var img = new Image();
	img.src = htmlElement.getAttribute("src");
	
	img.onload = function() {
		var imgTexture = new THREE.ImageUtils.loadTexture(img.src);
		var geometry = new THREE.PlaneGeometry(obj.getWidth(), obj.getHeight(), 3, 3 );
		var material = new THREE.MeshBasicMaterial({
			map	: imgTexture,overdraw: true, side: THREE.DoubleSide, transparent: true 
		});

		var imgPlane = new THREE.Mesh(geometry, material);
		imgPlane.doubleSided = true;
		imgPlane.scale.x=-1;
		
		imgPlane.position.x = obj.getLeft();
		imgPlane.position.y = obj.getTop();
		imgPlane.position.z = 0;

		imgPlane.scale.x = obj.scaleX;
		imgPlane.scale.y = obj.scaleY;
		
		if(obj.isRotate)
			imgPlane.rotationDir = 'RotationX';

		if(obj.isLinear)
			imgPlane.linear = true;

		if(obj.index >= 0)
		{
			pathArray3D[obj.index] = imgPlane;
		}
		
			imgTexture.needsUpdate = true;
			var fileName = obj.audioUrl;//.replace(/^.*[\\\/]/, '')
			var w =(3)*((obj.getWidth()*obj.scaleX)/fileName.length);

			var text3d = new THREE.TextGeometry( fileName,{
					size: w,
					height: 2,
					font: "helvetiker",
					style: "normal",
					bevelThickness: 2,
					bevelSize: 1,
					bevelEnabled: true
				});
			var textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } );
			var text = new THREE.Mesh( text3d, textMaterial );
			text.doubleSided = false;
			
			//relative to container
			text.position.x =  -obj.getWidth()/2;
			text.position.y = 0;
			text.position.z = 0;
			imgPlane.add(text);

		imgPlane.mediaType = "audio";
		imgPlane.htmlElement = audioEle;
		objects.push(imgPlane);
		signals.objectAdded.dispatch(imgPlane);
		return imgPlane;
	};
}

function insertAudio3DNew(x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D)
{
	if(!obj2D)
		return;

	detectPath(obj2D);
			
	var htmlElement = obj2D._element;
	
	var audioEle = document.getElementById(obj2D.media);
	
	if(audioEle)
		audioEle.pause();
	
	var img = new Image();
	img.src = htmlElement.getAttribute("src");
	
	img.onload = function() {
		var imgTexture = new THREE.ImageUtils.loadTexture(img.src);
		var geometry = new THREE.PlaneGeometry(width, height, 3, 3 );
		var material = new THREE.MeshBasicMaterial({
			map	: imgTexture,overdraw: true, opacity : opacity, side: THREE.DoubleSide, transparent: true 
		});

		var imgPlane = new THREE.Mesh(geometry, material);
		imgPlane.doubleSided = true;
	
		imgPlane.position.x = x;
		imgPlane.position.y = y;
		imgPlane.position.z = z;
		
		imgPlane.rotation.x = rx ;
		imgPlane.rotation.y = ry ;
		imgPlane.rotation.z = rz ;
		
		imgPlane.geometry.computeBoundingBox();
		imgPlane.scale.x = width * sx/ ( imgPlane.geometry.boundingBox.max.x - imgPlane.geometry.boundingBox.min.x ) ;
		imgPlane.scale.y = height * sy/ ( imgPlane.geometry.boundingBox.max.y - imgPlane.geometry.boundingBox.min.y ) ;
		imgPlane.scale.z = sz;

		if(obj2D.isRotate)
			imgPlane.rotationDir = 'RotationX';

		if(obj2D.isLinear)
			imgPlane.linear = true;
				
		imgTexture.needsUpdate = true;
		var fileName = obj2D.audioUrl;//.replace(/^.*[\\\/]/, '')
		var w =(3)*((obj2D.getWidth()*obj2D.scaleX)/fileName.length);

		var text3d = new THREE.TextGeometry( fileName,{
				size: w,
				height: 2,
				font: "helvetiker",
				style: "normal",
				bevelThickness: 2,
				bevelSize: 1,
				bevelEnabled: true
			});
		var textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } );
		var text = new THREE.Mesh( text3d, textMaterial );
		text.doubleSided = false;
		
		//relative to container
		text.position.x =  -obj2D.getWidth()/2;
		text.position.y = 0;
		text.position.z = 0;
		imgPlane.add(text);

		imgPlane.mediaType = "audio";
		imgPlane.htmlElement = audioEle;
		objects.push(imgPlane);
		signals.objectAdded.dispatch(imgPlane);
		return imgPlane;
	};

}


/* Free Draw */

function insertFreeDrawObject(obj)
{
	if(!obj)
		return;
		
		
	var material = new THREE.LineBasicMaterial({
		color: 0x0000ff,
	});

	var geometry = new THREE.Geometry();
	
	for(var c = 0; c < obj.path.length; c++)
	{
		var x = obj.path[c][1];
		var y = obj.path[c][2];
		//geometry.vertices.push(new THREE.Vector3( -x, y , 0));
		geometry.vertices.push(new THREE.Vector3( x, -y , 0));
	}

	var line = new THREE.Line(geometry, material);
	
	line.position.x = obj.getLeft();
	line.position.y = obj.getTop();
	line.position.z = 0;

	line.scale.x = obj.scaleX;
	line.scale.y = obj.scaleY;
	
	if(obj.isRotate)
		line.rotationDir = 'RotationX';

	if(obj.isLinear)
		line.linear = true;
			
	objects.push(line);
	signals.objectAdded.dispatch(line);	 
	return line;
}

function insertFreeDraw3DNew(x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D)
{
	if(!obj2D)
		return;
		
	var material = new THREE.LineBasicMaterial({
		color: color,opacity : opacity,
	});

	var geometry = new THREE.Geometry();
	
	for(var c = 0; c < obj2D.path.length; c++)
	{
		var x = obj2D.path[c][1];
		var y = obj2D.path[c][2];
		geometry.vertices.push(new THREE.Vector3( x, -y , 0));
	}

	var line = new THREE.Line(geometry, material);
	

	line.position.x = x;
	line.position.y = y;
	line.position.z = z;

	line.rotation.x = rx ? rx : obj2D.theta;
	line.rotation.y = ry ? ry : obj2D.theta;
	line.rotation.z = rz ? rz : obj2D.theta;

	line.geometry.computeBoundingBox();
	line.scale.x = width * sx/ ( line.geometry.boundingBox.max.x - line.geometry.boundingBox.min.x ) ;
	line.scale.y = height * sy/ ( line.geometry.boundingBox.max.y - line.geometry.boundingBox.min.y ) ;
	line.scale.z = sz;

	if(obj2D.isRotate)
		line.rotationDir = 'RotationX';

	if(obj2D.isLinear)
		line.linear = true;
			
	objects.push(line);
	signals.objectAdded.dispatch(line);	 
	return line;
}

/* Textured Cube */

function insertTexturedCube()
{
	var imgSrc = new Array();
	var imgCount = 0;
	var xPos = 0;
	var yPos = 0;
	for ( var c = 0; c < texturedCubeObjArray.length; c++)
	{
		for (var i = 0; i < texturedCubeObjArray[c].length; i++)
		{
			var obj = texturedCubeObjArray[c][i];
			if(!obj)
				return;

			if(obj.isReferenceObj) {
				xPos = obj.getLeft();
				yPos = obj.getTop();
			}
			
			var htmlElement = obj._element;
			
			var img = new Image();
			img.src = htmlElement.getAttribute("src");
			imgSrc[imgCount] = img.src;
			imgCount ++;
			if (imgCount == 6) {
				/* InsertImageToPictureCube(imgSrc, xPos, yPos); */
				InsertImageToPictureCube(texturedCubeObjArray[c], xPos, yPos);
				imgSrc = [];
				imgCount = 0;
			}
		
		}
	}
}