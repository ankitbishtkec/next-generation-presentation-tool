function insertRectanglePlate(obj)
{
	detectPath(obj);
	var x = obj.getLeft();
	var y = obj.getTop();
	console.log(x);
	console.log(y);
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
	
	geometry = new THREE.CubeGeometry(width, 10, height);
	var texture = THREE.ImageUtils.loadTexture('resources/rectPlate.png')
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, map: texture} );
	rectanglePlate = new THREE.Mesh( geometry, material );

	if(obj.index >= 0)
	{
		//pathArray3D.splice(obj.index, 0,rectanglePlate);
		pathArray3D[obj.index] = rectanglePlate;
	}
		
	if(x && y) {
	rectanglePlate.position.z = y;
	rectanglePlate.position.y = -5;
	rectanglePlate.position.x = x;
	}
	else {
	rectanglePlate.position.x = Math.random() * 1000 - 500;
	rectanglePlate.position.y = -5;
	}
	
	if(rotate)
		rectanglePlate.rotationDir = 'RotationY';
	if(linear)
		rectanglePlate.linear = true;
	if(obj.theta)
		rectanglePlate.rotation.y += obj.theta;
		
	if(obj.isZoom)
		rectanglePlate.zoom = true;
	else
		rectanglePlate.zoom = false;
	
	rectanglePlate.frame3D = true;
	
	sceneHelpers.add( rectanglePlate ); 
	selectionBox.visible = true;
	objects.push(rectanglePlate);
	signals.objectAdded.dispatch(rectanglePlate);
	return rectanglePlate;
}

function insertCirclePlate(obj)
{
	detectPath(obj);
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
	var geometry = new THREE.CylinderGeometry(width/2, width/2, 10, 50, 50);
	else
	geometry = new THREE.CylinderGeometry( 150, 150, 10, 50, 50);
	
	var texture = THREE.ImageUtils.loadTexture('resources/cirPlate.png')
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, map: texture, opacity: opacity} );
	circlePlate = new THREE.Mesh( geometry, material );

	if(obj.index >= 0)
	{
		//pathArray3D.splice(obj.index, 0, circlePlate);
		pathArray3D[obj.index] = circlePlate;
	}
	
	if(x && y) {
	circlePlate.position.z = y;
	circlePlate.position.y = -5;
	circlePlate.position.x = x;
	}
	else {
	circlePlate.position.x = Math.random() * 1000 - 500;
	circlePlate.position.y = -5;
	}
	
	if(rotate)
		circlePlate.rotationDir = 'RotationY';
	if(linear)
		circlePlate.linear = true;
	if(obj.theta)
	circlePlate.rotation.y += obj.theta;
	
	if(obj.isZoom)
		circlePlate.zoom = true;
	else
		circlePlate.zoom = false;	
	
	circlePlate.frame3D = true;
	
	sceneHelpers.add( circlePlate ); 
	selectionBox.visible = true;
	objects.push(circlePlate);
	signals.objectAdded.dispatch(circlePlate);
	return circlePlate;
}