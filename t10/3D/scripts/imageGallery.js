var container;

var iCamera, iScene, iRenderer, iProjector;
var updateCamera=false,carouselupdate=true;

var carousel;

var _images=[
				{url:'resources/gallery/1.png',width:150,height:100},
				{url:'resources/gallery/1.png',width:150,height:100},
				{url:'resources/gallery/1.png',width:150,height:100},
				{url:'resources/gallery/1.png',width:150,height:100},
				{url:'resources/gallery/1.png',width:150,height:100},
				{url:'resources/gallery/1.png',width:150,height:100}
			];

var _targetRotationY = 0;
var _targetRotationOnMouseDownY = 0;
var _targetRotationX = 0;
var _targetRotationOnMouseDownX = 0;

var _mouse={x:0,y:0},_prevmouse={x:0,y:0};
var _mouseX = 0;
var _mouseXOnMouseDown = 0;
var _mouseY = 0;
var _mouseYOnMouseDown = 0;

var _viewPortInnerWidth = 0;
var _viewPortInnerHeight = 0;

var _windowHalfX = 0;
var _windowHalfY = 0;

function rotateCarousel(item)
{
	carouselupdate=false;
	var angle=(item.carouselAngle-Math.PI/2)%(2*Math.PI);
	var b=carousel.rotation.y%(2*Math.PI);
	var ang;
	if (b>0) b=-2*Math.PI+b;
	carousel.rotation.y=b;
	if (angle<b) angle+=2*Math.PI;
	if ((angle-b)>2*Math.PI-(angle-b))
	{
		ang=b+(-(2*Math.PI-(angle-b)));
	}
	else
	{
		ang=b+(angle-b);
	}
	new TWEEN.Tween(carousel.rotation).to({y:ang},800).easing(TWEEN.Easing.Exponential.EaseInOut).onComplete(function(){carouselupdate=true;_targetRotationY=carousel.rotation.y;}).start();
}

function initImageGalleryView() 
{

	_viewPortInnerWidth = parseInt(document.getElementById('imgGallery').style.width);
	_viewPortInnerHeight = parseInt(document.getElementById('imgGallery').style.height);

	_windowHalfX = _viewPortInnerWidth / 2;
	_windowHalfY = _viewPortInnerHeight / 2;


	container=document.getElementById('imgGallery');
	var w,h;
	

	_windowHalfX = _viewPortInnerWidth / 2;
	_windowHalfY = _viewPortInnerHeight / 2;
	
	w = _viewPortInnerWidth;
	h = _viewPortInnerHeight;

	container.style.width=w+"px";
	container.style.height=h+"px";
	container.style.marginTop=0.5*(_viewPortInnerHeight-h)+'px';
	
	iScene = new THREE.Scene();

	iCamera = new THREE.PerspectiveCamera( 70, w / h, 1, 1000);
	iCamera.position.z = 500;
	iScene.add( iCamera );

	// Carousel
	carousel=new Carousel(200,_images,150,100);
	iScene.add( carousel );
	
	iProjector = new THREE.Projector();
	
	iRenderer = new THREE.CanvasRenderer();
	//iRenderer = new THREE.WebGLRenderer(); 
	iRenderer.setSize( w, h );

	container.appendChild(iRenderer.domElement );

	if (!imgGalleryDiv.IsListening())
	{
		iRenderer.domElement.addEventListener( 'dblclick', onDblClick, false );
		iRenderer.domElement.addEventListener( 'mousedown', onImageGalleryMouseDown, false );
		iRenderer.domElement.addEventListener( 'touchstart', onImageGalleryTouchStart, false );
		iRenderer.domElement.addEventListener( 'touchmove', onImageGalleryTouchMove, false );
		
		//SISO : To suport drag and drop of image into image gallery
		 iRenderer.domElement.addEventListener( 'drop', dragImageIntoImageGallery, false );

		//SISO : Neglect right click for context menu
		 iRenderer.domElement.addEventListener('contextmenu', function(event) {
			event.preventDefault();
			event.stopPropagation();
		}, false);
	}
	
}

function getElementPosition(htmlElement) 
{
	var xPos = htmlElement.offsetLeft;    
	var yPos = htmlElement.offsetTop;
	tempEl = htmlElement.offsetParent;
	while (tempEl != null)
	{
		xPos += tempEl.offsetLeft;
		yPos += tempEl.offsetTop;
		tempEl = tempEl.offsetParent; 
	}
	return { top: yPos, left: xPos };
}

function viewPortPoint(event, htmlElement)
{
	var xPos = 0;
	var yPos = 0;
	xPos = event.clientX - getElementPosition(htmlElement).left;
	yPos = event.clientY - getElementPosition(htmlElement).top;
	return { top: yPos, left: xPos };
}

function onDblClick( event )
{
	var X = viewPortPoint(event,iRenderer.domElement).left; 
	var Y = viewPortPoint(event,iRenderer.domElement).top;

	event.preventDefault();
	dblclick=true;
	
	_mouse.x = ( X / _viewPortInnerWidth ) * 2 - 1;
	_mouse.y = - ( Y / _viewPortInnerHeight ) * 2 + 1;

	var vector = new THREE.Vector3( _mouse.x, _mouse.y, 1 );
	iProjector.unprojectVector( vector, iCamera );

	var ray = new THREE.Ray( iCamera.position, vector.subSelf( iCamera.position ).normalize() );

	var intersects = ray.intersectObjects( carousel.children );

	if ( intersects.length > 0 ) {
		console.log(intersects[0].object);
		rotateCarousel(intersects[0].object);
	}

}

function onImageGalleryMouseDown( event ) {

	event.preventDefault();

	container.addEventListener( 'mousemove', onImageGalleryMouseMove, false );
	container.addEventListener( 'mouseup', onImageGalleryMouseUp, false );
	container.addEventListener( 'mouseout', onImageGalleryMouseOut, false );

	_mouse.x = ( event.clientX / _viewPortInnerWidth ) * 2 - 1;
	_mouse.y = - ( event.clientY / _viewPortInnerHeight ) * 2 + 1;
	_prevmouse={x:_mouse.x,y:_mouse.y};
	_mouseXOnMouseDown = event.clientX - _windowHalfX;
	_mouseYOnMouseDown = event.clientY - _windowHalfY;
	_targetRotationOnMouseDownY = _targetRotationY;
	_targetRotationOnMouseDownX = _targetRotationX;
}

function onImageGalleryMouseMove( event ) {

	_mouseX = event.clientX - _windowHalfX;
	_mouseY = event.clientY - _windowHalfY;
	_mouse.x = ( event.clientX / _viewPortInnerWidth ) * 2 - 1;
	_mouse.y = - ( event.clientY / _viewPortInnerHeight ) * 2 + 1;

	_targetRotationY = _targetRotationOnMouseDownY + ( _mouseX - _mouseXOnMouseDown ) * 0.02;
	_targetRotationX = _targetRotationOnMouseDownX + ( _mouseY - _mouseYOnMouseDown ) * 0.02;
	updateCamera=true;
}

function onImageGalleryMouseUp( event ) {

	container.removeEventListener( 'mousemove', onImageGalleryMouseMove, false );
	container.removeEventListener( 'mouseup', onImageGalleryMouseUp, false );
	container.removeEventListener( 'mouseout', onImageGalleryMouseOut, false );
}

function onImageGalleryMouseOut( event ) {

	container.removeEventListener( 'mousemove', onImageGalleryMouseMove, false );
	container.removeEventListener( 'mouseup', onImageGalleryMouseUp, false );
	container.removeEventListener( 'mouseout', onImageGalleryMouseOut, false );
}

function onImageGalleryTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

	_mouse.x = ( event.touches[ 0 ].pageX / _viewPortInnerWidth ) * 2 - 1;
	_mouse.y = - ( event.touches[ 0 ].pageY / _viewPortInnerHeight ) * 2 + 1;
	_prevmouse={x:_mouse.x,y:_mouse.y};
	_mouseXOnMouseDown = event.clientX - _windowHalfX;
	_mouseYOnMouseDown = event.clientY - _windowHalfY;
	_targetRotationOnMouseDownY = _targetRotationY;
	_targetRotationOnMouseDownX = _targetRotationX;

	}
}

function onImageGalleryTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

	_mouse.x = ( event.touches[ 0 ].pageX / _viewPortInnerWidth ) * 2 - 1;
	_mouse.y = - ( event.touches[ 0 ].pageY / _viewPortInnerHeight ) * 2 + 1;
	_prevmouse={x:_mouse.x,y:_mouse.y};
	_mouseXOnMouseDown = event.clientX - _windowHalfX;
	_mouseYOnMouseDown = event.clientY - _windowHalfY;
	_targetRotationOnMouseDownY = _targetRotationY;
	_targetRotationOnMouseDownX = _targetRotationX;
	updateCamera=true;
	}
}

//

/*function animateGalleryView() {
	requestAnimationFrame( animateGalleryView );
	renderGalleryView();
}*/

function renderGalleryView() {
	if (carouselupdate)
		carousel.rotation.y += ( _targetRotationY - carousel.rotation.y ) * 0.05;
	if (updateCamera && Math.abs(_mouse.y-_prevmouse.y)>Math.abs(_mouse.x-_prevmouse.x))
	{
		iCamera.position.z +=  (_mouse.y-_prevmouse.y)*20;
		
		/*SISO: TODO : Please replace with some constant*/
		if(iCamera.position.z < -125)
			iCamera.position.z = -125; //distance of highest -ve z-value of object
		else
			if(iCamera.position.z > 1000)
				iCamera.position.z = 1000; // far plane distance
			
		//console.log("Z" + iCamera.position.z);
	}
	iRenderer.render( iScene, iCamera );
	updateCamera=false;
	//carouselupdate=true;
	TWEEN.update();
}

function dragImageIntoImageGallery(evt)
{
	evt.preventDefault();
	evt.stopPropagation();
	if(iRenderer.domElement)
	{
		try
		{
			var url = event.dataTransfer.getData("URL");
			if (url && url != "")
			{
				var X = viewPortPoint(evt,iRenderer.domElement).left; 
				var Y = viewPortPoint(evt,iRenderer.domElement).top;
				updateImageInGallery(url, X, Y, null);
			}
			else
			{
				var myFiles = evt.dataTransfer.files;
				for (var i = 0, f; f = myFiles[i]; i++)
				{
					var imageReader = new FileReader();
					imageReader.onload = (function(aFile)
					{
						//alert(evt.clientX);
						return function(e)	{
						//alert(e.target.result);
						var X = viewPortPoint(evt,iRenderer.domElement).left; 
						var Y = viewPortPoint(evt,iRenderer.domElement).top;
						updateImageInGallery(aFile.name, X, Y, e.target.result);
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



function updateImageInGallery(url, clientX, clientY, src)
{
	console.log("url" + url + "X = " + clientX + "Y = " + clientY + "scr =" + src);
	if (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
	{
		_mouse.x = ( clientX / _viewPortInnerWidth ) * 2 - 1;
		_mouse.y = - ( clientY / _viewPortInnerHeight ) * 2 + 1;
		var vector = new THREE.Vector3( _mouse.x, _mouse.y, 1 );
		iProjector.unprojectVector( vector, iCamera );

		var ray = new THREE.Ray( iCamera.position, vector.subSelf( iCamera.position ).normalize() );

		var intersects = ray.intersectObjects( carousel.children );

		if ( intersects.length > 0 ) {
			
			var rotationY = intersects[0].object.rotation.y;
			var pos = intersects[0].object.position;
			var cAngle = intersects[0].object.carouselAngle;
			
			carousel.remove(intersects[0].object);
			
			var texture = null
			if (src)
			{
				texture = new THREE.ImageUtils.loadTexture(src);
			}
			else
			{
				texture = new THREE.ImageUtils.loadTexture(url);
			}
			
			var plane = new THREE.Mesh( new THREE.PlaneGeometry( carousel.w, carousel.h, 3, 3 ), new THREE.MeshBasicMaterial( { map: texture, overdraw: true, side: THREE.DoubleSide  } ) );
			//var aa=1*carousel.anglePer;
			plane.rotation.y = rotationY;
			plane.position = new THREE.Vector3(pos.x,pos.y,pos.z);
			plane.doubleSided = true;
			plane.carouselAngle = cAngle;//plane.rotation.y;
			plane.scale.x = -1;
			carousel.add(plane);
		}
	}
}