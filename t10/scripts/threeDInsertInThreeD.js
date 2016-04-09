
function insertCube3D( x, y, z, object2D, callerFunctionName ) {
	var length = 100;
	var geometry = new THREE.CubeGeometry( length, length, length);

	var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x00ff00, specular: 0xffffff, shininess: 1000 } );

	var cube = new THREE.Mesh(geometry, material);

	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;
	
	cube.name = "cube";
	//if(object2D.index >= 0)
		//pathArray3D.splice(object2D.index, 0,cube);
	//gblObject3D = cube;

	//gblObject3D = cube;
	
	//cube.material.opacity = 1.0;
	//cube.material.color = 0x1a4c81;
	//cube.alphaTest = 0.0;
	if( callerFunctionName == "interface3D")
	{
		signals.objectAdded.dispatch(cube);
		{
			var threeDObj = cube;
			threeDObj.rotation.x = object2D.threeDProperties.rotationX;
			threeDObj.rotation.y = object2D.threeDProperties.rotationY;
			threeDObj.rotation.z = object2D.threeDProperties.rotationZ;
			threeDObj.scale.x = object2D.threeDProperties.scaleX;
			threeDObj.scale.y = object2D.threeDProperties.scaleY;
			threeDObj.scale.z = object2D.threeDProperties.scaleZ;
		}
		return cube;
	}
	
	iScene.add( cube );
	insertInvisibleMasterCube( x, y, z, cube );
}

function insertDuck( x, y, z, object2D, callerFunctionName ) {

    try{
	var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    loader.load('./3D/collada/duck/duck.dae', function (collada) {
        var duck = collada.scene;
        skin = collada.skins[0];
        duck.scale.x = duck.scale.y = duck.scale.z = 1;

        duck.updateMatrix();

        duck.position.x = x;//-30
        duck.position.y = y;//-180
        duck.position.z = z;//0	
		
		duck.name = "duck";
		if( callerFunctionName == "interface3D")
		{
			signals.objectAdded.dispatch(duck);
			{
				var threeDObj = duck;
				threeDObj.rotation.x = object2D.threeDProperties.rotationX;
				threeDObj.rotation.y = object2D.threeDProperties.rotationY;
				threeDObj.rotation.z = object2D.threeDProperties.rotationZ;
				threeDObj.scale.x = object2D.threeDProperties.scaleX;
				threeDObj.scale.y = object2D.threeDProperties.scaleY;
				threeDObj.scale.z = object2D.threeDProperties.scaleZ;
			}
			return duck;
		}
	
		iScene.add( duck );
		insertInvisibleMasterCube( x, y, z, duck );
    });
	}
	catch(e){
	alert("collada duck error is " + e.message);
	}
}


function insertTruck( x, y, z, object2D, callerFunctionName ){
			
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = false;
	
	loader.load( './3D/collada/firetruck/models/firetruck.dae', function ( collada ){
	truck = collada.scene;
	skin = collada.skins[ 0 ];
	truck.scale.x = truck.scale.y = truck.scale.z = 1;
	truck.rotation.z = Math.PI/2;
	truck.rotation.x = -(Math.PI/2);
	
	truck.updateMatrix();

	truck.position.x = x;//-40
	truck.position.y = y;//-130
	truck.position.z = z;//0

	truck.name = "truck";
	if( callerFunctionName == "interface3D")
	{
		signals.objectAdded.dispatch(truck);
			{
				var threeDObj = truck;
				threeDObj.rotation.x = object2D.threeDProperties.rotationX;
				threeDObj.rotation.y = object2D.threeDProperties.rotationY;
				threeDObj.rotation.z = object2D.threeDProperties.rotationZ;
				threeDObj.scale.x = object2D.threeDProperties.scaleX;
				threeDObj.scale.y = object2D.threeDProperties.scaleY;
				threeDObj.scale.z = object2D.threeDProperties.scaleZ;
			}
			return truck;
	}
	
	iScene.add( truck );
	insertInvisibleMasterCube( x, y, z, truck );
	} );
			
}

function insertGirl( x, y, z, object2D, callerFunctionName ){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './3D/collada/girl/models/girl.dae', function ( collada ){
			girl = collada.scene;
			skin = collada.skins[ 0 ];
			girl.scale.x = girl.scale.y = girl.scale.z = 1;
			
			girl.updateMatrix();
		
			girl.position.x = x;//-50
			girl.position.y = y;//-160
			girl.position.z = z;//0

			girl.name = "girl";
		if( callerFunctionName == "interface3D")
		{
			signals.objectAdded.dispatch(girl);
			{
				var threeDObj = girl;
				threeDObj.rotation.x = object2D.threeDProperties.rotationX;
				threeDObj.rotation.y = object2D.threeDProperties.rotationY;
				threeDObj.rotation.z = object2D.threeDProperties.rotationZ;
				threeDObj.scale.x = object2D.threeDProperties.scaleX;
				threeDObj.scale.y = object2D.threeDProperties.scaleY;
				threeDObj.scale.z = object2D.threeDProperties.scaleZ;
			}
			return girl;
		}
	
			iScene.add( girl );
			insertInvisibleMasterCube( x, y, z, girl );
			} );
			
}

function insertBoy( x, y, z, object2D, callerFunctionName ){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './3D/collada/boy/models/boy.dae', function ( collada ){
			boy = collada.scene;
			skin = collada.skins[ 0 ];
			boy.scale.x = boy.scale.y = boy.scale.z = 1;
			
			boy.updateMatrix();

			boy.position.x = x;//20
			boy.position.y = y;//-300
			boy.position.z = z;//-75
			
			boy.name = "boy";
		if( callerFunctionName == "interface3D")
		{
			signals.objectAdded.dispatch(boy);
			{
				var threeDObj = boy;
				threeDObj.rotation.x = object2D.threeDProperties.rotationX;
				threeDObj.rotation.y = object2D.threeDProperties.rotationY;
				threeDObj.rotation.z = object2D.threeDProperties.rotationZ;
				threeDObj.scale.x = object2D.threeDProperties.scaleX;
				threeDObj.scale.y = object2D.threeDProperties.scaleY;
				threeDObj.scale.z = object2D.threeDProperties.scaleZ;
			}
			return boy;
		}
	
			iScene.add( boy );
			insertInvisibleMasterCube( x, y, z, boy );
			} );
}

function insertHouse( x, y, z, object2D, callerFunctionName ){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './3D/collada/home/models/home.dae', function ( collada ){
			home = collada.scene;
			skin = collada.skins[ 0 ];
			home.scale.x = home.scale.y = home.scale.z = 1;
			home.updateMatrix();
			
			home.position.x = x;//0
			home.position.y = y;//-150
			home.position.z = z;//0
			
			home.name = "home";
			if( callerFunctionName == "interface3D")
			{
				signals.objectAdded.dispatch(home);
			{
				var threeDObj = home;
				threeDObj.rotation.x = object2D.threeDProperties.rotationX;
				threeDObj.rotation.y = object2D.threeDProperties.rotationY;
				threeDObj.rotation.z = object2D.threeDProperties.rotationZ;
				threeDObj.scale.x = object2D.threeDProperties.scaleX;
				threeDObj.scale.y = object2D.threeDProperties.scaleY;
				threeDObj.scale.z = object2D.threeDProperties.scaleZ;
			}
			return home;
			}
	
			iScene.add( home );
			insertInvisibleMasterCube( x, y, z, home );
			} );
			
}

////kindly do not change values in it these are kept thoughtfully 
function insertInvisibleMasterCube( x, y, z, object3D ) {
	//return;
	//render();
	/*if ( object3D.geometry.boundingBox === null )
		object3D.geometry.computeBoundingBox();
		
	var geometry = new THREE.CubeGeometry( ( object3D.geometry.boundingBox.max.x - object3D.geometry.boundingBox.min.x + 2 ),
		( object3D.geometry.boundingBox.max.y - object3D.geometry.boundingBox.min.y + 2 ),
		( object3D.geometry.boundingBox.max.z - object3D.geometry.boundingBox.min.z + 2 ));*/
	var width, height, depth;
	var addon = 2;
	var delX, delY, delZ;
	switch( gblObject2D.threeDProperties.threeDtype )
    {
        case '3DCube'://not needed
			width = 100;
			height = 100; 
			depth = 100; 
			delX = 0; 
			delY = 0; 
			delZ = 0; 
            break;
                
        case '3DBoy'://done final
			width = 90;//in x
			height = 355; //in y 
			depth = 80;//in z 
			delX = 0; 
			delY = 0; 
			delZ = 0; 
            break;
            
        case '3DGirl'://done final
			width = 100;//in x
			height = 350;//in y 
			depth = 50;//in z
			delX = 0; 
			delY = 0; 
			delZ = 0; 
            break;

        case '3DDuck'://done final
			width = 210;//in x
			height = 330;//in y 
			depth = 125;//in z  
			delX = 0; 
			delY = 0; 
			delZ = 0; 
            break;
            
        case '3DHouse':
			width = 100;//not doing it
			height = 100; 
			depth = 100; 
			delX = 0; 
			delY = 0; 
			delZ = 0; 
            break;

        case '3DTruck':
			width = 130;//done final
			height = 425; 
			depth = 270; 
			delX = 0; 
			delY = 0; 
			delZ = 0; 
            break;
	}
		
	var geometry = new THREE.CubeGeometry( width + addon,
		height + addon,
		depth + addon);

	var material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            transparent: true,
            side: THREE.DoubleSide//, 
            //opacity: 0.5 
        });
    //sets transparency to the cube	
    material.alphaTest = 1;
    //material.alphaTest = 0.5;//do not remove this statement
	
	var cube = new THREE.Mesh(geometry, material);

	cube.position.x = x + delX;
	cube.position.y = y + delY;
	cube.position.z = z + delZ;

	cube.slave = object3D;
	cube.name = "bounding Box hitted";

	gblObject3D = cube;

	iScene.add( cube );
	enterThreeDEdit();
}