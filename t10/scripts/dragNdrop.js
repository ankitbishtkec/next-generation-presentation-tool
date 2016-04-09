var dragDragon;
var loadTimer=null;

function dragRectangle(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	ev.preventDefault();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	insertRectangle(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
	
}

function dragTriangle(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	insertTriangle(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
	
}

function dragLine(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	insertLine(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
	
}

function dragCircle(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	insertCircle(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
	
}

function dragEllipse(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	insertEllipse(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
	
}

function dragSVG(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	dragDragon=true;
	insertLeft=mouseCurPos.x;
	insertTop=mouseCurPos.y;
	drawSVG();
	insertTop = 200;
    insertLeft = 100;
	dragDragon=false;
	tagIt("handleDynamicMenuClick");
	
}

function dragImage(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	drawImage(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}

function dragVideo(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	drawVideo(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}


function dragFrameRect(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	StartNewFrameRect(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}

function dragFrameCir(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	StartNewFrameCirc(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}

function dragFrameTri(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	StartNewFrameTri(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}

function dragFrameBracket(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	StartNewFrameBracket(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}

function dragFrame3D(ev)
{
	IsExampleLoaded();
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	StartNewFrame3D(mouseCurPos.y, mouseCurPos.x);
	tagIt("handleDynamicMenuClick");
}

function dragSymbol(ev,id)
{
	IsExampleLoaded();
	var len =0;
	IsThreeDExampleLoaded();
	mouseCurPos.x = ev.clientX - mainFabricCanvas._offset.left;
	mouseCurPos.y = ev.clientY - mainFabricCanvas._offset.top;
	if(mainFabricCanvas._objects)
	{
		len = mainFabricCanvas._objects.length;
	}
	drawSymbol(mouseCurPos.y, mouseCurPos.x,id);//document.getElementById('BlueFlagUP').src);
	window.loadTimer = window.setInterval(function (object) {
		if(mainFabricCanvas._objects[len])
		{	
			tagIt("handleDynamicMenuClick");
			clearInterval(window.loadTimer);
			window.loadTimer=0;			
		}
	} , 5);	
	
}

	
	