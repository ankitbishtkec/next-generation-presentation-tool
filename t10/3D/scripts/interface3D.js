function initNew3DView()
			{
			
			initNormalDetection();
					
			viewportObj = new Viewport( signals );
			viewport = viewportObj.viewportContainer;
			viewport.setTop( '2px' );
			viewport.setRight( '2px' );
			viewport.setLeft( '2px' );
			//viewport.setWidth( '-webkit-calc(100% - 300px)', '-moz-calc(100% - 300px)', 'calc(100% - 300px)' );
			//viewport.setHeight( '-webkit-calc(100% - 32px)', '-moz-calc(100% - 32px)', 'calc(100% - 32px)' );
			viewport.setWidth((window.innerWidth) + 'px');
			viewport.setHeight((window.innerHeight) + 'px');
			document.body.appendChild( viewport.dom );

			// set focus on Viewport to get hotkeys working
			// right from the initial page load



			//alert(renderer);
			// create default scene

			signals.resetScene.dispatch();

			//

			var onWindowResize = function ( event ) {

				signals.windowResize.dispatch();

			};

			var createDummyMaterial = function () {

				return new THREE.MeshPhongMaterial();

			};

			//
			onWindowResize();
			window.addEventListener( 'resize', onWindowResize, false );
					var temp = document.getElementById('DymanicMenuContainer');
					temp.zIndex = '1px';
			//alert(viewport.dom.innerHTML);
			//viewport.dom.lastElementChild.setAttribute("width", window.innerWidth);			
			if(isSet)
			{
				//toggleToBirdEyeView();
				//customRenderAll();
				
				for(var i = 0; i < objectsOnPathArray.length; i++)
				{
					if(objectsOnPathArray[i]) {
					if(objectsOnPathArray[i].type == 'group')
					{
						var objInGroup = [];
						objInGroup = objectsOnPathArray[i].getObjects();
						for(var i=0; i<objInGroup.length; i++)
						{
							objInGroup[i].samePath = true;
						}
					}
					objectsOnPathArray[i].pathAdded = true;
					//pathArray3D.push(convert2DObject(objectsOnPathArray[i]));
					var pushable = convert2DObject(objectsOnPathArray[i]);
					if( pushable && !pushable.isPictureCube)
						//pathArray3D.push(pushable);
						pathArray3D[ i ] = pushable;
					}
				}
				
				for(var i = 0; i < pathArray3D.length; i++)
				{				
					if(!pathArray3D[i])
						pathArray3D.splice(i, 1);
				}
				
				if(pathArray3D. length)
					pathObjectCount = pathArray3D.length;
				for(var k = 0;k < mainFabricCanvas._objects.length; k++) 
				{
					var obj = mainFabricCanvas._objects[k];
					var frameFlag;
					if(obj && obj.name != "mainInfiniteRect" && obj.name != "superGrid" && isNotTagArea(obj) && !obj.pathAdded)
					{
						if(obj.isFrame)
						{
							var frameChild = getArrayOfFrameObjects(obj);
							for(var i = 0; i<frameChild.length; i++)
								frameChild[i].frameChild = true;
						}
 						if(obj.isType('group'))	
						{
							var objInGroup = [];
							objInGroup = obj.getObjects();
							for(var i=0; i<objInGroup.length; i++)
							{
								if(objInGroup[i].isFrame)
									frameFlag = true;
							}
							for(var i=0; i<objInGroup.length; i++)
								{
								if(!frameFlag) {
								if(objInGroup[i].isType('group'))
								{
									var groupInGroup = [];
									groupInGroup = 	objInGroup[i].getObjects();
									for(var j = 0; j<groupInGroup.length; j++)
									{
									groupInGroup[j].groupChild = true;
									if(objInGroup[i].isRotate)
										groupInGroup[j].isRotate = true;
									if(objInGroup[i].isLinear)
										groupInGroup[j].isLinear = true;
									if(objInGroup[i].isZoom)
										groupInGroup[j].isZoom  = true;			
									convert2DObject(groupInGroup[j]);
									}
								}
								else
								{
									if(obj.isRotate)
										objInGroup[i].isRotate = true;
									if(obj.isLinear)
										objInGroup[i].isLinear = true;
									if(obj.isZoom)
										objInGroup[i].isZoom  = true;
									objInGroup[i].groupChild = true;
									convert2DObject(objInGroup[i]);
									}
								}
								else {
									if(obj.isRotate)
										objInGroup[i].isRotate = true;
									if(obj.isLinear)
										objInGroup[i].isLinear = true;
									if(obj.isZoom)
										objInGroup[i].isZoom  = true;								
									objInGroup[i].groupChild = true;
									convert2DObject(objInGroup[i]);
									}
								}
						}
						convert2DObject(obj);		
					}
				}
			}
			
			var menuItems = document.getElementById('vertical_menu');
			var arrowButton = document.getElementById('verticalMenuShowHide');
			
			menuItems.style.display = 'none';
			arrowButton.style.display = 'none';
						viewport.dom.focus();
			if(div3D)
			{
				div3D.style.display = 'none';		
				viewport.dom.appendChild(div3D);
			}

 			var camera_element = document.getElementById('camera_menu');
			if(camera_element) {
			if(objectsOnPathArray.length)
				camera_element.style.display = 'block';	
				else
					camera_element.style.display = 'none';	
			var stop = document.getElementById('exitCamera');
			stop.style.display = 'block';
			
			if(document.getElementById("theme"))
			{
				document.getElementById("theme").checked = true;	
				panoramaView();
			}
				
			viewport.dom.appendChild(stop);
			viewport.dom.appendChild(camera_element); 
			}
			//var camera_menu = document.getElementById('camera_menu');
			//camera_menu.style.display = 'block';
}

function convert2DObject(obj)
{
		var retObj;
		if( obj.hasConverted )
			return obj.threeDConvertedObject;
		if( obj.isSlide )
			return insertSlide(obj);
		switch(obj.type)
		{
			case 'rect':
				if(!obj.isFrame)
				{		
				retObj = insertCube(obj);
				}
				else if(obj.isFrame)
				{
				retObj = insertRectanglePlate(obj);
				}	
				break;
			case 'triangle':
				if(!obj.isFrame)
				{
				retObj = insertTriangle3D(obj);
				}
				else if(obj.isFrame)
				{
				retObj = insertRectanglePlate(obj);
				}	
				break;
			case 'circle':
				if(!obj.isFrame)
				{
				retObj = insertCircle3D(obj);
				}
				else if(obj.isFrame)
				{
				retObj = insertCirclePlate(obj);
				}	
				break;
			case 'image':
				if(obj.is3D)
					{
						var x = obj.getLeft();
						var y = obj.getTop();
						var lengthOf3DObjects = mainFabricCanvas._objects.length;
						var zFac = (zPosition/lengthOf3DObjects);
						var z = zFactor;
						var height = obj.currentHeight;
						
						if(x && y) {
							x = x;
							y = y;
							if(obj.frameChild)
							{
								y = height/2;
								z = y;
							}
							else
							{
							z = zFactor;
							zFactor += zFac; 
							}
						}
						//detectPath(obj);
						switch( obj.threeDProperties.threeDtype )
						{
							case '3DCube':
								retObj = insertCube3D( x, y, z, obj, "interface3D" );
								break;
									
							case '3DBoy':
								if(obj.frameChild)
								{
								y = height/2;
								z = y;
								}
								retObj = insertBoy( x, y, z, obj, "interface3D" );
								break;
								
							case '3DGirl':
								retObj = insertGirl( x, y, z, obj, "interface3D" );
								break;
						
							case '3DDuck':
								retObj = insertDuck( x, y, z, obj, "interface3D" );
								break;
								
							case '3DHouse':
								retObj = insertHouse( x, y, z, obj, "interface3D" );
								break;
						
							case '3DTruck':
								retObj = insertTruck( x, y, z, obj, "interface3D" );
								break;
						}
					}
				else if (obj.name == "video")
					retObj = insertVideoInto3D(obj);
				else if(obj.id && obj.id.toString().match(/audio/) != null)
					insertAudioInto3D(obj);
				else if (typeof(obj.picturedCube)=='number' && obj.picturedCube > -1) { 
					{
						if(insertPicturedCube)
						{
							insertPicturedCube = false;
							insertTexturedCube();
						}
					}
				}
				else
					retObj = insertImageInto3D(obj);
				break;
			case 'path':
				if( obj.shapeProperty == 'dragon')
				{
				retObj = insertDragonModel(obj);
				}
				else if(obj.shapeProperty == 'bracFrame' || obj.shapeProperty == 'frame3D')
				{
				retObj = insertRectanglePlate(obj);
				}
				else
				{
				retObj = insertFreeDrawObject(obj);
				}
				break;
			case 'ellipse':
				if(!obj.isFrame)
				{
				retObj = insertCircle3D(obj);
				}
				else if(obj.isFrame)
				{	
				retObj = insertCirclePlate(obj);
				}
				break
			case 'line':
				retObj = insertLine3D(obj);
				break;
			case 'text':
				retObj = insertText3D(obj);
				break;
		}
	return retObj;
}

function getTheme3D()
{
	switch(currTheme)
	{
	case "galaxyTheme":
		themeImage3D = 'resources/0.jpg';
		break;
	case 'chessTheme':
		themeImage3D = 'resources/5.jpg';
		break;
	case 'oceanTheme':
		themeImage3D = 'resources/1.jpg';
		break;
	case 'slateTheme':
		themeImage3D = 'resources/2.jpg';
		break;
	case 'marioTheme':	
		themeImage3D = 'resources/3.jpg';
		break;
	default:
		themeImage3D = 'resources/panorama1.jpg';
		break;
	}
}

function toggleTheme(event)
{
	event.preventDefault();
	event.stopPropagation();
	
	var themeChecked = document.getElementById("theme")  ? document.getElementById("theme").checked : false;
	if(themeChecked)
	{
		scene.add(panorama);
	}
	else
	{
	scene.remove(panorama);	
	}
}