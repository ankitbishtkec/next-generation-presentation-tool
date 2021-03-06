/*
ContextMenu.js
Version: 2.1
This script is created by Samir Nigam. Do not remove, modify, or hide the author information. keep it intact.
Mail: nigam.samir@hotmail.com 
*/
 /**
 * Public License: Please see licenses\cpol.txt for details.
 */
function CustomContextMenu(Arguments)
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
	
    var ContextMenuDiv = document.createElement('div');
    var ContextMenuTable = document.createElement('table');
    var Index = 0;
    var EventHandlers = new Array();
	
	//Style Context Menu div.
    ContextMenuDiv.id = 'ContextMenu'; 
    ContextMenuDiv.style.position = 'absolute';
    ContextMenuDiv.style.backgroundColor = 'white';
    ContextMenuDiv.style.border = '1px outset black';
    ContextMenuDiv.style.verticalAlign = 'top';
    ContextMenuDiv.style.textAlign = 'left';
	ContextMenuDiv.style.display = 'none'; 
	ContextMenuDiv.style.width = (Width + 11) + 'px';
	
	//Styles Context Menu table.
	ContextMenuTable.id = 'ContextMenuTable'; 
	ContextMenuTable.style.width = (Width + 10) + 'px';
	ContextMenuTable.border = 0;
	ContextMenuTable.cellPadding = 0;
	ContextMenuTable.cellSpacing = 0;
	
	//Append Context Menu table into Context Menu div.
	ContextMenuDiv.appendChild(ContextMenuTable);
	
	this.RemoveAllItem = function()
	{	
		var rowCount = ContextMenuTable.rows.length;
		for(var i = 0; i < rowCount; i++) {
			ContextMenuTable.deleteRow(i);
		}
	}
	
	//Public method for adding Context Menu Items.
	this.AddItem = function(imgSrc, itemText, isDisabled, commandName, menuType, target)
	{	    
		var Tr = ContextMenuTable.insertRow(Index++);
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
			WireUpEventHandler(Tr, 'mouseover', function(){ MouseOver(Tr, TdLeft, TdCenter, TdRight, itemText); });
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
	    var Tr = ContextMenuTable.insertRow(Index++);
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
		var touchPos = null;
		var xLeft = null;
		var yTop = null;
		
		if (hammer)
		{
			touchPos = hammer.getXYfromEvent(e);
			xLeft = touchPos[0].x;
			yTop = touchPos[0].y;
		}
		else
		{
			xLeft = e.clientX;
			yTop = e.clientY;
		}
			
		if(xLeft + ContextMenuDiv.offsetWidth > Base.offsetWidth)
			xLeft = Base.offsetWidth - ContextMenuDiv.offsetWidth;
		
		if(yTop + ContextMenuDiv.offsetHeight > Base.clientHeight)
			yTop = Base.clientHeight - ContextMenuDiv.offsetHeight;	
		
		ContextMenuDiv.style.display = 'none'; 
	    ContextMenuDiv.style.left = xLeft + 'px';
        ContextMenuDiv.style.top = yTop + 'px';
		ContextMenuDiv.style.display = 'block';
        
        return false;
	}	
	
	//Public method to hide context Menu.
	this.Hide = function()
	{
		ContextMenuDiv.style.display = 'none';
	}
	
	//Public method Dispose.
	this.Dispose = function()
	{
	    while(EventHandlers.length > 0)
	        DetachEventHandler(EventHandlers.pop());
			
	    document.body.removeChild(ContextMenuDiv);
	}
	
	//Public method GetTotalItems.
	this.GetTotalItems = function()
	{
	    return ContextMenuTable.getElementsByTagName('tr').length;
	}
	
	//Mouseover event handler
	var MouseOver = function(Tr, TdLeft, TdCenter, TdRight, itemText)
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
		 
		if (itemText == 'Front Back')
			customSubContextMenu.Display();
		else
			customSubContextMenu.Hide();
			
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
	document.body.appendChild(ContextMenuDiv);
	
	//Register events.	
	WireUpEventHandler(Base, 'click', this.Hide);
	WireUpEventHandler(ContextMenuDiv, 'contextmenu', function(){return false;});
}