function insertDuck(){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './collada/duck/duck.dae', function ( collada ){
			duck = collada.scene;
			skin = collada.skins[ 0 ];
			duck.scale.x = duck.scale.y = duck.scale.z = 2;
			
			duck.updateMatrix();
				
			var geometry = new THREE.CubeGeometry(320, 320, 320);
			var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
				
			material.alphaTest = 1;
			
			duckPlane = new THREE.Mesh( geometry, material );
						
			duckPlane.position.x = 100;
			duckPlane.position.y = 100;
			duckPlane.position.z = 0;
			
			duck.position.x = -30;
			duck.position.y = -180;
			duck.position.z = 0;
			
			duckPlane.type = "duck";
			duckPlane.add( duck );
			sceneHelpers.add(duckPlane);
			objects.push(duckPlane);
			
		/*	var three = {
				renderer: renderer,
				camera: camera,
				scene: scene,
				target: duckPlane
			};

			animate(1, three);*/
			signals.objectAdded.dispatch(duckPlane);
			} );
			
}

function insertTruck(){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = false;
			
			loader.load( './collada/firetruck/models/firetruck.dae', function ( collada ){
			truck = collada.scene;
			skin = collada.skins[ 0 ];
			truck.scale.x = truck.scale.y = truck.scale.z = 2;
			truck.rotation.z = Math.PI/2;
			truck.rotation.x = -(Math.PI/2);
			
			truck.updateMatrix();
				
			var geometry = new THREE.CubeGeometry(750, 280, 320);
			var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
				
			material.alphaTest = 1;
			
			truckPlane = new THREE.Mesh( geometry, material );
						
			truckPlane.position.x = 100;
			truckPlane.position.y = 100;
			truckPlane.position.z = 0;
			
			truck.position.x = -40;
			truck.position.y = -130;
			truck.position.z = 0;
			
			truckPlane.type = "truck";
			truckPlane.add( truck );
			sceneHelpers.add(truckPlane);
			objects.push(truckPlane);
			signals.objectAdded.dispatch(truckPlane);
			} );
			
}

function insertGirl(){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './collada/girl/models/girl.dae', function ( collada ){
			//loader.load( './collada/lady/models/lady.dae', function ( collada ){
			girl = collada.scene;
			skin = collada.skins[ 0 ];
			girl.scale.x = girl.scale.y = girl.scale.z = 2;
			
			girl.updateMatrix();
				
			//var geometry = new THREE.PlaneGeometry(300, 800);
			//var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
			var geometry = new THREE.CubeGeometry(150, 400, 100);
			var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
				
			material.alphaTest = 1;
			
			girlPlane = new THREE.Mesh( geometry, material );
						
			girlPlane.position.x = 0;
			girlPlane.position.y = 0;
			girlPlane.position.z = 0;
			
			girl.position.x = -50;
			girl.position.y = -160;
			girl.position.z = 0;
			
			/* var geometry = new THREE.CubeGeometry(200, 700, 220);
			var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
				
			material.alphaTest = 1;
			
			girlPlane = new THREE.Mesh( geometry, material );
						
			girlPlane.position.x = 100;
			girlPlane.position.y = 100;
			girlPlane.position.z = 0;
			
			girl.position.x = -100;
			girl.position.y = -350;
			girl.position.z = 0; */
			
			girlPlane.type = "girl";
			girlPlane.add( girl );
			sceneHelpers.add(girlPlane);
			objects.push(girlPlane);
			
			signals.objectAdded.dispatch(girlPlane);
			} );
			
}

function insertBoy(){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './collada/boy/models/boy.dae', function ( collada ){
			boy = collada.scene;
			skin = collada.skins[ 0 ];
			boy.scale.x = boy.scale.y = boy.scale.z = 3.5;
			
			boy.updateMatrix();
				
			var geometry = new THREE.CubeGeometry(300, 700, 200);
			var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
				
			material.alphaTest = 1;
			
			boyPlane = new THREE.Mesh( geometry, material );
						
			boyPlane.position.x = 0;
			boyPlane.position.y = 0;
			boyPlane.position.z = 0;
			
			boy.position.x = 20;
			boy.position.y = -300;
			boy.position.z = -75;
			
			boyPlane.type = "boy";
			boyPlane.add( boy );
			sceneHelpers.add(boyPlane);
			objects.push(boyPlane);
			signals.objectAdded.dispatch(boyPlane);
			} );
}

function insertHome(){
			
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './collada/home/models/home.dae', function ( collada ){
			home = collada.scene;
			skin = collada.skins[ 0 ];
			home.scale.x = home.scale.y = home.scale.z = 1;
			
			home.updateMatrix();
				
			var geometry = new THREE.CubeGeometry(550, 350, 650);
			var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent:true, side: THREE.DoubleSide } );
				
			material.alphaTest = 1;
			
			homePlane = new THREE.Mesh( geometry, material );
						
			homePlane.position.x = 100;
			homePlane.position.y = 100;
			homePlane.position.z = 0;
			
			home.position.x = 0;
			home.position.y = -150;
			home.position.z = 0;
			
			homePlane.type = "home";
			homePlane.add( home );
			sceneHelpers.add(homePlane);
			objects.push(homePlane);
			signals.objectAdded.dispatch(homePlane);

			} );
			
}

function insertDragonModel(obj)
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
			var zFac = (1000/lengthOf3DObjects);
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			
			loader.load( './3D/collada/dragon/models/dragon.dae', function ( collada ){
			dragon = collada.scene;
			skin = collada.skins[ 0 ];
			
			if(obj.isObjectInPath)
				pathArray3D.push(dragon);
				
			dragon.scale.x = dragon.scale.y = dragon.scale.z = width/200;
			
			dragon.updateMatrix();
				
			if(x && y) {
				dragon.position.x = x;
				dragon.position.y = y;
				if(obj.frameChild)
				{
					dragon.position.y = height/2;
					dragon.position.z = y;
				}
			else
			{
				dragon.position.z = zFactor;
				zFactor += zFac; 
			}
		}
	else {
	dragon.position.x = Math.random() * 1000 - 500;
	dragon.position.y = Math.random() * 600 - 300;
	}
			
			if(rotate)
				dragon.rotationDir = 'RotationY';
			if(linear)
				dragon.linear = true;
			if(obj.theta)
				dragon.rotation.x += obj.theta;	
			if(obj.isZoom)
				dragon.zoom = true;
			else
				dragon.zoom = false;
			objects.push(dragon);
			signals.objectAdded.dispatch(dragon);
			return dragon;
			});
		}
			




