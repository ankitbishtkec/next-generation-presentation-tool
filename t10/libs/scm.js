/*
SubContextMenu.js
Version: 2.1
This script is created by Samir Nigam. Do not remove, modify, or hide the author information. keep it intact.
Mail: nigam.samir@hotmail.com 
*/
/**
* Public License: Please see licenses\cpol.txt for details.
*/
function CustomSubContextMenu(Arguments)
{
    //Public Properties;
    this.Version = '2.1';
	
    //Global variables.
	var Base = Arguments.Base ? Arguments.Base : document.documentElement;
	var Width = Arguments.Width ? Arguments.Width : 200;
	var FontColor = Arguments.FontColor ? Arguments.FontColor : 'black';
	var HoverFontColor = Arguments.HoverFontColor ? Arguments.HoverFontColor : 'white';
	var HoverBackgroundColor = Arguments.HoverBackgroundColor ? Arguments.HoverBackgroundColor : '#2257D5';
	var HoverBorderColor = Arguments.HoverBorderColor ? Arguments.HoverBorderColor : 'orange';
	var ClickEventListener = Arguments.ClickEventListener ? Arguments.ClickEventListener : function(){ return false; };
	
    var SubContextMenuDiv = document.createElement('div');
    var SubContextMenuTable = document.createElement('table');
    var Index = 0;
    var EventHandlers = new Array();
	
	//Style Context Menu div.
    SubContextMenuDiv.id = 'SubContextMenu'; 
    SubContextMenuDiv.style.position = 'absolute';
    SubContextMenuDiv.style.backgroundColor = 'white';
    SubContextMenuDiv.style.border = '1px outset black';
    SubContextMenuDiv.style.verticalAlign = 'top';
    SubContextMenuDiv.style.textAlign = 'left';
	SubContextMenuDiv.style.display = 'none'; 
	SubContextMenuDiv.style.width = (Width + 11) + 'px';
	
	//Styles Context Menu table.
	SubContextMenuTable.id = 'SubContextMenuTable'; 
	SubContextMenuTable.style.width = (Width + 10) + 'px';
	SubContextMenuTable.border = 0;
	SubContextMenuTable.cellPadding = 0;
	SubContextMenuTable.cellSpacing = 0;
	
	//Append Context Menu table into Context Menu div.
	SubContextMenuDiv.appendChild(SubContextMenuTable);
	
	this.RemoveAllItem = function()
	{	
		var rowCount = SubContextMenuTable.rows.length;
		for(var i = 0; i < rowCount; i++) {
			SubContextMenuTable.deleteRow(i);
		}
	}
	
	//Public method for adding Context Menu Items.
	this.AddItem = function(imgSrc, itemText, isDisabled, commandName, menuType, target)
	{	    
		var Tr = SubContextMenuTable.insertRow(Index++);
	    Tr.style.fontFamily = 'Verdana';
	    Tr.style.fontSize = '10pt';
	    Tr.style.fontWeight = 'normal';
	    Tr.style.backgroundColor = 'white';
	    Tr.style.color = isDisabled ? 'gray' : FontColor;
	    Tr.style.cursor = 'default';
		
	    var TdLeft = Tr.insertCell(0);
	    TdLeft.style.width = 25 + 'px';
	    TdLeft.style.height = 25 + 'px';
	    TdLeft.style.textAlign = 'center';
	    TdLeft.style.verticalAlign = 'middle';
	    TdLeft.style.borderTop = '1px solid white';
	    TdLeft.style.borderBottom = '1px solid white';
	    TdLeft.style.borderLeft = '1px solid white';
	    TdLeft.style.backgroundColor = '#FFFFFF';
		
	    var TdCenter = Tr.insertCell(1);
	    TdCenter.style.width = 10 + 'px';
	    TdCenter.style.height = 25 + 'px';
	    TdCenter.innerHTML = '&nbsp;';
	    TdCenter.style.borderTop = '1px solid white';
	    TdCenter.style.borderBottom = '1px solid white';
		
	    var TdRight = Tr.insertCell(2);
	    TdRight.style.width = (Width - 25) + 'px';
	    TdRight.style.height = 25 + 'px';
	    TdRight.style.textAlign = 'left';
	    TdRight.style.verticalAlign = 'middle'; 
	    TdRight.style.fontStyle = isDisabled ? 'italic' : 'normal'; 
	    TdRight.innerHTML = itemText ? itemText : '&nbsp;';
	    TdRight.style.borderTop = '1px solid white';
	    TdRight.style.borderBottom = '1px solid white';
	    TdRight.style.borderRight = '1px solid white';
		
		if(imgSrc)
		{
	        var Img = new Image();	 
	        Img.id = 'Img';    
	        Img.src = imgSrc;
	        Img.style.width = 16 + 'px';	 
	        Img.style.height = 16 + 'px';	  
	        Img.disabled = isDisabled; 
			
	        TdLeft.appendChild(Img);	
	    }
	    else
	        TdLeft.innerHTML = '&nbsp;';
		
	    //Register events.	    
	    if(!isDisabled)
		{	        
			WireUpEventHandler(Tr, 'click', function(){ ClickEventListener(Tr, {CommandName: commandName, Text: itemText, IsDisabled: isDisabled, ImageUrl: Img ? Img.src : '', MenuType : menuType, Target : target}) });
			WireUpEventHandler(Tr, 'mouseover', function(){ MouseOver(Tr, TdLeft, TdCenter, TdRight); });
	        WireUpEventHandler(Tr, 'mouseout', function(){ MouseOut(Tr, TdLeft, TdCenter, TdRight); });
	    }
		else
	    {
			WireUpEventHandler(Tr, 'click', function(){ return false; });
	        WireUpEventHandler(TdRight, 'selectstart', function(){ return false; });
	    }
	}	
	
	//Public method for adding Separator Menu Items.
	this.AddSeparatorItem = function()
	{
	    var Tr = SubContextMenuTable.insertRow(Index++);
	    Tr.style.cursor = 'default';
	    
	    var TdLeft = Tr.insertCell(0);
	    TdLeft.style.width = 25 + 'px';
	    TdLeft.style.height = '1px';
	    TdLeft.style.backgroundColor = '#E8E3DB';
		
	    var TdCenter = Tr.insertCell(1);
	    TdCenter.style.width = 10 + 'px';
	    TdCenter.style.height = '1px';
	    TdCenter.style.backgroundColor = 'white';
	    
	    var TdRight = Tr.insertCell(2);
	    TdRight.style.width = (Width - 25) + 'px';
	    TdRight.style.height = '1px';
	    TdRight.style.backgroundColor = 'gray';
	}
	
	//Public method for displaying Context Menu.
	this.Display = function(e)
	{
	    e = e ? e : window.event;	    
		
		//SISO
		var touchPos = hammer.getXYfromEvent(e);
		var contextMenuWidth = parseInt(document.getElementById("ContextMenu").style.width);
		var contextMenuX = parseInt(document.getElementById("ContextMenu").offsetLeft);
		var xLeft = contextMenuX + contextMenuWidth;
		if(xLeft + SubContextMenuDiv.offsetWidth > Base.offsetWidth)
			xLeft = Base.offsetWidth - SubContextMenuDiv.offsetWidth;
		
		var yTop = touchPos[0].y;
		if(yTop + SubContextMenuDiv.offsetHeight > Base.clientHeight)
			yTop = Base.clientHeight - SubContextMenuDiv.offsetHeight;	
		
		SubContextMenuDiv.style.display = 'none'; 
	    SubContextMenuDiv.style.left = xLeft + 'px';
        SubContextMenuDiv.style.top = yTop + 'px';
		SubContextMenuDiv.style.display = 'block';
        
        return false;
	}	
	
	//Public method to hide context Menu.
	this.Hide = function()
	{
		SubContextMenuDiv.style.display = 'none';
	}
	
	//Public method Dispose.
	this.Dispose = function()
	{
	    while(EventHandlers.length > 0)
	        DetachEventHandler(EventHandlers.pop());
			
	    document.body.removeChild(SubContextMenuDiv);
	}
	
	//Public method GetTotalItems.
	this.GetTotalItems = function()
	{
	    return SubContextMenuTable.getElementsByTagName('tr').length;
	}
	
	//Mouseover event handler
	var MouseOver = function(Tr, TdLeft, TdCenter, TdRight)
	{	
	     Tr.style.fontWeight = 'bold';
	     Tr.style.color = HoverFontColor;
	     Tr.style.backgroundColor = HoverBackgroundColor;
			
	     TdLeft.style.borderTopColor = HoverBorderColor;
	     TdLeft.style.borderBottomColor = HoverBorderColor;
	     TdLeft.style.borderLeftColor = HoverBorderColor;
	     TdLeft.style.backgroundColor = HoverBackgroundColor;
			
	     TdCenter.style.borderTopColor = HoverBorderColor;
	     TdCenter.style.borderBottomColor = HoverBorderColor;
	        
	     TdRight.style.borderTopColor = HoverBorderColor;
	     TdRight.style.borderBottomColor = HoverBorderColor;
	     TdRight.style.borderRightColor = HoverBorderColor;
	}
	
	//Mouseout event handler
	var MouseOut = function(Tr, TdLeft, TdCenter, TdRight)
	{	
	     Tr.style.fontWeight = 'normal';
	     Tr.style.color = FontColor;
	     Tr.style.backgroundColor = 'white';
	        
	     TdLeft.style.borderTopColor = '#FFFFFF';
	     TdLeft.style.borderBottomColor = '#FFFFFF';
	     TdLeft.style.borderLeftColor = '#FFFFFF';
	     TdLeft.style.backgroundColor = '#FFFFFF';
			
		 TdCenter.style.borderTopColor = 'white';
	     TdCenter.style.borderBottomColor = 'white';
			
	     TdRight.style.borderTopColor = 'white';
	     TdRight.style.borderBottomColor = 'white';
	     TdRight.style.borderRightColor = 'white';
	}
	
	//Private method to wire up event handlers.
	var WireUpEventHandler = function(Target, Event, Listener)
	{
	    //Register event.
	    if(Target.addEventListener)	   
			Target.addEventListener(Event, Listener, false);	    
	    else if(Target.attachEvent)	   
			Target.attachEvent('on' + Event, Listener);
	    else 
	    {
			Event = 'on' + Event;
			Target.Event = Listener;	 
		}
		
	    //Collect event information through object literal.
	    var EVENT = { Target: Target, Event: Event, Listener: Listener }
	    EventHandlers.push(EVENT);
	}
	
	//Private method to detach event handlers.
	var DetachEventHandler = function(EVENT)
	{
	    if(EVENT.Target.removeEventListener)	   
			EVENT.Target.removeEventListener(EVENT.Event, EVENT.Listener, false);	    
	    else if(EVENT.Target.detachEvent)	   
	        EVENT.Target.detachEvent('on' + EVENT.Event, EVENT.Listener);
	    else 
	    {
			EVENT.Event = 'on' + EVENT.Event;
			EVENT.Target.EVENT.Event = null;	 
	    }
	}
	
	//Add Context Menu div on the document.
	document.body.appendChild(SubContextMenuDiv);
	
	//Register events.	
	WireUpEventHandler(Base, 'click', this.Hide);
	WireUpEventHandler(SubContextMenuDiv, 'subcontextmenu', function(){return false;});
}