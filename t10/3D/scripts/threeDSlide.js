function convertToSlide( obj )
{
	addFrame(obj);
	obj.isSlide = true;
}

function insertSlide(obj)
{
	var lengthOf3DObjects = mainFabricCanvas._objects.length;
	var zFac = (1000/lengthOf3DObjects);
	var slideDepth = 30;
	var slide = convert2DObjectNew(obj, zFactor, slideDepth, 0 );
	slide.visible = false;
	
	var childs = getArrayOfFrameObjects( obj );
	var count = 0;
	for( count = 0; count < childs.length; count++)
	{
		var obj = childs[count];
		//var obj3D = convert2DObjectNew( obj, ( slide.position.z + slideDepth/ 2 ), (slideDepth/ 2), 0  );
		var obj3D = convert2DObjectNew( obj, ( zFactor + slideDepth/ 2 ), (slideDepth/ 2), 0  );
		obj.hasConverted = true;
		obj.threeDConvertedObject = obj3D;
	}
	zFactor += zFac;
	return slide;
}

function convert2DObjectNew(obj, z, depth, referenceY)
{
	var ySlide = referenceY;
		switch( obj.type )
		{
			case 'text':
			{
				{	
					var coords = obj.oCoords;
					var x = coords.bl.x ;
					var y = coords.bl.y;
					var diff = y - ySlide;
					var width = obj.currentWidth;
					var height = obj.currentHeight;
					var opacity = obj.opacity;	
					var color = obj.fill;
					color = parseInt(color.replace('#','0x'));
					var font = obj.originalState.fontFamily;
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
					return insertText3DNew( x, ( ySlide - diff ), z , 
					width, height, depth, 
					1, 1, 1, 
					0, Math.PI * 2, -obj.theta, 
					null, font3D,  color, text2D, obj);
				}
			}
			break;
			
			case 'rect':
			{	
				var x = obj.getLeft();
				var y = obj.getTop();
				var diff = y - ySlide;
				var width = obj.currentWidth;
				var height = obj.currentHeight;
				var color = obj.fill;
				color = color.replace('#','0x');
				var opacity = obj.opacity;
				return insertCubeNew(x, ( ySlide - diff ), z , 
				width, height, depth,
				1, 1, 1, 
				0, 0, -obj.theta,
				opacity, color, obj );
			}	
			break;
			
			case 'triangle':
			{	
				var x = obj.getLeft();
				var y = obj.getTop();
				var diff = y - ySlide;
				var width = obj.currentWidth;
				var height = obj.currentHeight;
				var color = obj.fill;
				color = color.replace('#','0x');
				var opacity = obj.opacity;
				return insertTriangle3DNew(x, ( ySlide - diff ), z , 
				width, height, depth,
				1, 1, 1, 
				Math.PI * 1.5, 0 , -obj.theta,
				opacity, color, obj );
			}	
			break;
			
			case 'circle':			
			case 'ellipse':
			{	
				var x = obj.getLeft();
				var y = obj.getTop();
				var diff = y - ySlide;
				var width = obj.currentWidth;
				var height = obj.currentHeight;
				var color = obj.fill;
				color = color.replace('#','0x');
				var opacity = obj.opacity;
				return insertEllipse3DNew(x, ( ySlide - diff ), z , 
				width, height, depth,
				1, 1, 1, 
				0, 0 , -obj.theta,
				opacity, color, obj );
			}	
			break;
			
			case 'line':
			{	
				var x = obj.getLeft();
				var y = obj.getTop();
				var diff = y - ySlide;
				var width = obj.currentWidth;
				var height = obj.currentHeight;
				var length = Math.sqrt(width*width + height*height);
				var rotateZ = ( Math.atan( (obj.y2 - obj.y1)/ (obj.x2 - obj.x1)) ) - obj.theta;
				var color = obj.fill;
				color = color.replace('#','0x');
				var opacity = obj.opacity;
				return insertLine3DNew(x, ( ySlide - diff ), z , 
				length,
				1, 1, 1, 
				0, 0 , rotateZ,
				opacity, color, obj );
			}	
			break;
			
			case 'path':
			{	
				alert("SVG is currently not supported in Slide!");
			}	
			break;
			
			
			case 'image':
			{
				var x = obj.getLeft();
				var y = obj.getTop();
				var diff = y - ySlide;
				var width = obj.currentWidth;
				var height = obj.currentHeight;
				var color = obj.fill;
				color = color.replace('#','0x');
				var opacity = obj.opacity;
				
				if (obj.name == "video")
					return insertVedio3DNew(x, ( ySlide - diff ), z, 
					width, height, depth, 
					1, 1, 1, 
					0, 0, -obj.theta, 
					opacity, color, obj );
				else if(obj.id && obj.id.toString().match(/audio/) != null)
					return insertAudio3DNew(x, ( ySlide - diff ), z, 
					width, height, depth, 
					1, 1, 1, 
					0, 0, -obj.theta, 
					opacity, color, obj );
				else if (typeof(obj.picturedCube)=='number' && obj.picturedCube > -1) { 	
					alert("Pictured Cube is currently not supported in Slide!");					
				}
				else
					return insertImage3DNew(x, ( ySlide - diff ), z, 
					width, height, depth, 
					1, 1, 1, 
					0, 0, -obj.theta, 
					opacity, color, obj );
			}
			break;
		}
}


function insertLine3DNew( x, y, z, length, sx, sy, sz, rx, ry, rz, opacity, color, obj2D )
{
	var geometry = new THREE.CylinderGeometry(5, 5, length);
	
	for ( var i = 0; i < geometry.faces.length; i++ ) {
	geometry.faces[ i ].color.setHex(color);
	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors ,opacity: opacity} );
	var line = new THREE.Mesh( geometry, material );
	
	line.position.x = x;
	line.position.y = y;
	line.position.z = z;

	line.rotation.x = rx;
	line.rotation.y = ry;
	line.rotation.z = rz;

	line.scale.x = sx ;
	line.scale.y = sy;
	line.scale.z = sz;
	
	sceneHelpers.add( line ); 
	selectionBox.visible = true;
	objects.push(line);
	signals.objectAdded.dispatch(line);
	return line;
}
	

function insertEllipse3DNew( x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D )
{	
	var geometry = new THREE.SphereGeometry( width/2, 50,500);

	for ( var i = 0; i < geometry.faces.length; i ++ ) {
	geometry.faces[ i ].color.setHex( color );
	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors,opacity: opacity } );
	var ellipse = new THREE.Mesh( geometry, material );

	ellipse.position.x = x;
	ellipse.position.y = y;
	ellipse.position.z = z;

	ellipse.rotation.x = rx;
	ellipse.rotation.y = ry;
	ellipse.rotation.z = rz;
	
	ellipse.geometry.computeBoundingBox();
	ellipse.scale.x = width * sx/ ( ellipse.geometry.boundingBox.max.x - ellipse.geometry.boundingBox.min.x ) ;
	ellipse.scale.y = height * sy/ ( ellipse.geometry.boundingBox.max.y - ellipse.geometry.boundingBox.min.y ) ;
	ellipse.scale.z = sz;
	
	sceneHelpers.add( ellipse ); 
	selectionBox.visible = true;
	objects.push(ellipse);
	signals.objectAdded.dispatch(ellipse);
	return ellipse;
}


function insertCubeNew(x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D )
{

	
	var geometry = new THREE.CubeGeometry(width, height, depth);

	for ( var i = 0; i < geometry.faces.length; i ++ ) {
	geometry.faces[ i ].color.setHex(color);
	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, opacity: opacity } );
	var cube = new THREE.Mesh( geometry, material );

	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;

	cube.rotation.x = rx;
	cube.rotation.y = ry;
	cube.rotation.z = rz;

	cube.scale.x = sx;
	cube.scale.y = sy;
	cube.scale.z = sz;
	
	sceneHelpers.add( cube ); 
	selectionBox.visible = true;
	objects.push(cube);
	signals.objectAdded.dispatch(cube);
	return cube;
}

function insertTriangle3DNew( x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, color, obj2D )
{	
	var geometry = new THREE.TetrahedronGeometry (width, 0);

	for ( var i = 0; i < geometry.faces.length; i ++ ) {
	geometry.faces[ i ].color.setHex( color );
	}
	
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors,opacity: opacity } );
	var triangle = new THREE.Mesh( geometry, material );

	triangle.position.x = x;
	triangle.position.y = y;
	triangle.position.z = z;

	triangle.rotation.x = rx;
	triangle.rotation.y = ry;
	triangle.rotation.z = rz;
	
	triangle.geometry.computeBoundingBox();
	triangle.scale.x = width * sx/ ( triangle.geometry.boundingBox.max.x - triangle.geometry.boundingBox.min.x ) ;
	triangle.scale.y = height * sy/ ( triangle.geometry.boundingBox.max.y - triangle.geometry.boundingBox.min.y ) ;
	triangle.scale.z = sz;
	
	sceneHelpers.add( triangle ); 
	selectionBox.visible = true;
	objects.push(triangle);
	signals.objectAdded.dispatch(triangle);
	return triangle;
}

function insertText3DNew( x, y, z, width, height, depth, sx, sy, sz, rx, ry, rz, opacity, font3D,  color, text2D, obj2D )
{	
	var text3D = insertText( x, y, z, sx, sy, sz, rx, ry, rz, font3D,  color, text2D );

	text3D.geometry.computeBoundingBox();
	text3D.scale.x = width / ( text3D.geometry.boundingBox.max.x - text3D.geometry.boundingBox.min.x ) ;
	text3D.scale.y = height / ( text3D.geometry.boundingBox.max.y - text3D.geometry.boundingBox.min.y ) ;

	return text3D;
}
