var textUnderEditing;

function submit( )
{
	var curr = textUnderEditing;
	var color = document.getElementById("fontColorOfText").value.substr(1);
	color = "0x" + color;
	color = parseInt(color);
	var font = document.getElementById("fontFamilyOfText").value;
	var text = document.getElementById("inputText").value;
	editor.style.display = "none";
	insertText( curr.position.x, curr.position.y, curr.position.z, 
				curr.scale.x, curr.scale.y, curr.scale.z, 
				curr.rotation.x, curr.rotation.y, curr.rotation.z,
				font, color, text );
	signals.removeSelectedObject.dispatch(curr);
	
}

function cancel( )
{
	editor.style.display = "none";	
}

function textHandler( ray, intersects, event )
{
if ( intersects.length > 0 ) 
{
	if( intersects[0].object.type && intersects[0].object.type == "text" )
		{
			var editor = document.getElementById("editor");
			if(editor)
			{	
				textUnderEditing = intersects[0].object;
				editor.style.display = "block";
				editor.style.top = event.clientY + 'px';
				editor.style.left = event.clientX + 'px';
				document.getElementById("inputText").value = intersects[0].object.string;
			}
		}
	else if( intersects[0].point.y <= 0 )
	{
		var x;
		var y = 0;
		var z;
		//var color = 0x69C238;
		var color = 6931000;
		{
			var start = ray.origin;
			var direction = ray.direction;
			x = start.x + direction.x * ( -start.y ) / direction.y;
		
			z = start.z + direction.z * ( -start.y ) / direction.y;
		}
			insertText( x, y, z, 1, 1, 1, 0, Math.PI * 2, 0, "optimer",  color, "hello world" );
	}
}
else
{
		var x;
		var y = 0;
		var z;
		//var color = 0x69C238;
		var color = 6931000;
		{
			var start = ray.origin;
			var direction = ray.direction;
			x = start.x + direction.x * ( -start.y ) / direction.y;
		
			z = start.z + direction.z * ( -start.y ) / direction.y;
		}
			insertText( x, y, z, 1, 1, 1, 0, Math.PI * 2, 0, "optimer",  color, "hello world" );
}	
}

function insertText( x, y, z, sx, sy, sz, rx, ry, rz, font, color, text )
{
	var textGeo = new THREE.TextGeometry( text, {
	
					size: 40,
					height: 10,
					curveSegments: 4,

					
					font: font,
					weight: "bold",
					style: "normal",

					bevelThickness: 2,
					bevelSize: 1.5,
					bevelEnabled: true,

					material: 0,
					extrudeMaterial: 1

				});
	
	var frontMaterial = new THREE.MeshBasicMaterial( { color: color, shading: THREE.FlatShading } );
	color = 0x123456;
	var sideMaterial = new THREE.MeshBasicMaterial( { color: color, shading: THREE.SmoothShading } );
	var material = new THREE.MeshFaceMaterial( [ 
		frontMaterial, // front
		sideMaterial // side
	] );

	textGeo.computeBoundingBox();
	textGeo.computeVertexNormals();	
	


	textMesh1 = new THREE.Mesh( textGeo, material );

	
	textMesh1.position.x = x;
	textMesh1.position.y = y;
	textMesh1.position.z = z;

	textMesh1.rotation.x = rx;
	textMesh1.rotation.y = ry;
	textMesh1.rotation.z = rz;

	textMesh1.scale.x = sx;
	textMesh1.scale.y = sy;
	textMesh1.scale.z = sz;
	
	textMesh1.type = "text";//custom made
	textMesh1.string = text;//custom made

	scene.add( textMesh1 );
	objects.push(textMesh1);
	signals.objectAdded.dispatch(textMesh1);
	return textMesh1;
}