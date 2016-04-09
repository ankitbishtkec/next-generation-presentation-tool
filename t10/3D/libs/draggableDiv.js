function lockButtonClicked(event, id)
{
  if(id == 'imgGallery')
  {
	  var button = document.getElementById('lockImgGallery');
	  if(imgGalleryDiv.IsListening())
	  {
		imgGalleryDiv.StopListening(true);
		var newImage = "url(resources/unlock.png)";
		button.style.backgroundImage = newImage;
		
			/* pass event to canvas in lock mode */
		iRenderer.domElement.addEventListener( 'dblclick', onDblClick, false );
		iRenderer.domElement.addEventListener( 'mousedown', onImageGalleryMouseDown, false );
		iRenderer.domElement.addEventListener( 'touchstart', onImageGalleryTouchStart, false );
		iRenderer.domElement.addEventListener( 'touchmove', onImageGalleryTouchMove, false );
		iRenderer.domElement.addEventListener( 'drop', dragImageIntoImageGallery, false );
		iRenderer.domElement.addEventListener('contextmenu', function(event) {
		event.preventDefault();
		event.stopPropagation();
		}, false);
		

		
	  }
	  else
	  {
		imgGalleryDiv.StartListening();
		var newImage = "url(resources/lock.png)";
		button.style.backgroundImage = newImage;
		

		/* Do not pass event to canvas in unlock mode */
		iRenderer.domElement.removeEventListener( 'dblclick', onDblClick, false );
		iRenderer.domElement.removeEventListener( 'mousedown', onImageGalleryMouseDown, false );
		iRenderer.domElement.removeEventListener( 'touchstart', onImageGalleryTouchStart, false );
		iRenderer.domElement.removeEventListener( 'touchmove', onImageGalleryTouchMove, false );
		iRenderer.domElement.removeEventListener( 'drop', dragImageIntoImageGallery, false );
		iRenderer.domElement.removeEventListener('contextmenu', function(event) {
		event.preventDefault();
		event.stopPropagation();
		}, false);
		
	  }
  }
  else if (id == 'roomImgGallery')
  {
		var button = document.getElementById('lockRoomImgGallery');
		if(roomImgGalleryDiv.IsListening())
		{
			roomImgGalleryDiv.StopListening(true);
			var newImage = "url(resources/unlock.png)";
			button.style.backgroundImage = newImage;

			/* pass event to canvas in lock mode */
			r_renderer.domElement.addEventListener( 'dblclick', onDblClick, false );
			r_renderer.domElement.addEventListener( 'drop', dragImageIntoRoomImageGallery, false );
			//r_renderer.domElement.addEventListener( 'keydown', keyDownOnRoomGallery, false );
			//r_renderer.domElement.addEventListener( 'keyup', keyUpOnRoomGallery, false );
		


		}
		else
		{
			roomImgGalleryDiv.StartListening();
			var newImage = "url(resources/lock.png)";
			button.style.backgroundImage = newImage;


			/* Do not pass event to canvas in unlock mode 
			r_renderer.domElement.removeEventListener( 'dblclick', onDblClick, false );
			r_renderer.domElement.removeEventListener( 'mousedown', onImageGalleryMouseDown, false );
			r_renderer.domElement.removeEventListener( 'touchstart', onImageGalleryTouchStart, false );
			r_renderer.domElement.removeEventListener( 'touchmove', onImageGalleryTouchMove, false );
			r_renderer.domElement.removeEventListener( 'drop', dragImageIntoImageGallery, false );
			r_renderer.domElement.removeEventListener('contextmenu', function(event) {
			event.preventDefault();
			event.stopPropagation();
			}, false);
			*/
			r_renderer.domElement.removeEventListener( 'dblclick', onDblClick, false );
			r_renderer.domElement.removeEventListener( 'drop', dragImageIntoRoomImageGallery, false );
			//r_renderer.domElement.removeEventListener( 'keydown', keyDownOnRoomGallery, false );
			//r_renderer.domElement.removeEventListener( 'keyup', keyUpOnRoomGallery, false );
		}
  }
}

function closeButtonClicked(event, id)
{
	if (id)
		document.getElementById(id).style.display = 'none';
}


/* SISO : Core functions for draggable div */
function hookEvent(element, eventName, callback)
{
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.addEventListener)
  {
    element.addEventListener(eventName, callback, false);
  }
  else if(element.attachEvent)
    element.attachEvent("on" + eventName, callback);
}

function unhookEvent(element, eventName, callback)
{
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.removeEventListener)
    element.removeEventListener(eventName, callback, false);
  else if(element.detachEvent)
    element.detachEvent("on" + eventName, callback);
}

function cancelEvent(e)
{
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function Position(x, y)
{
  this.X = x;
  this.Y = y;
  
  this.Add = function(val)
  {
    var newPos = new Position(this.X, this.Y);
    if(val != null)
    {
      if(!isNaN(val.X))
        newPos.X += val.X;
      if(!isNaN(val.Y))
        newPos.Y += val.Y
    }
    return newPos;
  }
  
  this.Subtract = function(val)
  {
    var newPos = new Position(this.X, this.Y);
    if(val != null)
    {
      if(!isNaN(val.X))
        newPos.X -= val.X;
      if(!isNaN(val.Y))
        newPos.Y -= val.Y
    }
    return newPos;
  }
  
  this.Min = function(val)
  {
    var newPos = new Position(this.X, this.Y)
    if(val == null)
      return newPos;
    
    if(!isNaN(val.X) && this.X > val.X)
      newPos.X = val.X;
    if(!isNaN(val.Y) && this.Y > val.Y)
      newPos.Y = val.Y;
    
    return newPos;  
  }
  
  this.Max = function(val)
  {
    var newPos = new Position(this.X, this.Y)
    if(val == null)
      return newPos;
    
    if(!isNaN(val.X) && this.X < val.X)
      newPos.X = val.X;
    if(!isNaN(val.Y) && this.Y < val.Y)
      newPos.Y = val.Y;
    
    return newPos;  
  }  
  
  this.Bound = function(lower, upper)
  {
    var newPos = this.Max(lower);
    return newPos.Min(upper);
  }
  
  this.Check = function()
  {
    var newPos = new Position(this.X, this.Y);
    if(isNaN(newPos.X))
      newPos.X = 0;
    if(isNaN(newPos.Y))
      newPos.Y = 0;
    return newPos;
  }
  
  this.Apply = function(element)
  {
    if(typeof(element) == "string")
      element = document.getElementById(element);
    if(element == null)
      return;
    if(!isNaN(this.X))
      element.style.left = this.X + 'px';
    if(!isNaN(this.Y))
      element.style.top = this.Y + 'px';  
  }
}

function absoluteCursorPostion(eventObj)
{
  eventObj = eventObj ? eventObj : window.event;
  
  if(isNaN(window.scrollX))
    return new Position(eventObj.clientX + document.documentElement.scrollLeft + document.body.scrollLeft, 
      eventObj.clientY + document.documentElement.scrollTop + document.body.scrollTop);
  else
    return new Position(eventObj.clientX + window.scrollX, eventObj.clientY + window.scrollY);
}

function dragObject(element, attachElement, lowerBound, upperBound, startCallback, moveCallback, endCallback, attachLater)
{
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
      return;
  
  if(lowerBound != null && upperBound != null)
  {
    var temp = lowerBound.Min(upperBound);
    upperBound = lowerBound.Max(upperBound);
    lowerBound = temp;
  }

  var cursorStartPos = null;
  var elementStartPos = null;
  var dragging = false;
  var listening = false;
  var disposed = false;
  
  function dragStart(eventObj)
  {
	if(eventObj.stopPropagation)
		eventObj.stopPropagation();

    if(dragging || !listening || disposed) return;
    dragging = true;
    
    if(startCallback != null)
      startCallback(eventObj, element);
    
    cursorStartPos = absoluteCursorPostion(eventObj);
    
    elementStartPos = new Position(parseInt(element.style.left), parseInt(element.style.top));
   
    elementStartPos = elementStartPos.Check();
    
    hookEvent(document, "mousemove", dragGo);
    hookEvent(document, "mouseup", dragStopHook);
    
    return cancelEvent(eventObj);
  }
  
  function dragGo(eventObj)
  {
	if(eventObj.stopPropagation)
		eventObj.stopPropagation();

    if(!dragging || disposed) return;
    
    var newPos = absoluteCursorPostion(eventObj);
    newPos = newPos.Add(elementStartPos).Subtract(cursorStartPos);
    newPos = newPos.Bound(lowerBound, upperBound)
    newPos.Apply(element);
    if(moveCallback != null)
      moveCallback(newPos, element);
        
    return cancelEvent(eventObj); 
  }
  
  function dragStopHook(eventObj)
  {
	if(eventObj.stopPropagation)
		eventObj.stopPropagation();

    dragStop();
    return cancelEvent(eventObj);
  }
  
  function dragStop()
  {
    if(!dragging || disposed) return;
    unhookEvent(document, "mousemove", dragGo);
    unhookEvent(document, "mouseup", dragStopHook);
    cursorStartPos = null;
    elementStartPos = null;
    if(endCallback != null)
      endCallback(element);
    dragging = false;
  }
  
  this.Dispose = function()
  {
    if(disposed) return;
    this.StopListening(true);
    element = null;
    attachElement = null
    lowerBound = null;
    upperBound = null;
    startCallback = null;
    moveCallback = null
    endCallback = null;
    disposed = true;
  }
  
  this.StartListening = function()
  {
    if(listening || disposed) return;
    listening = true;
    hookEvent(attachElement, "mousedown", dragStart);
  }
  
  this.StopListening = function(stopCurrentDragging)
  {
    if(!listening || disposed) return;
    unhookEvent(attachElement, "mousedown", dragStart);
    listening = false;
    
    if(stopCurrentDragging && dragging)
      dragStop();
  }
  
  this.IsDragging = function(){ return dragging; }
  this.IsListening = function() { return listening; }
  this.IsDisposed = function() { return disposed; }
  
  if(typeof(attachElement) == "string")
    attachElement = document.getElementById(attachElement);
  if(attachElement == null)
    attachElement = element;
    
  if(!attachLater)
    this.StartListening();
}
