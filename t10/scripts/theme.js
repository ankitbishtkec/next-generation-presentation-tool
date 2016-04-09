var themesMap = new Object();
var themePattern;
var currTheme="default";

function parseXML(xmlData)
{
	var xmlDoc = null;
	
	if (window.DOMParser)
  	{
  		var parser=new DOMParser();
  		xmlDoc=parser.parseFromString(xmlData,"text/xml");
  	}
	else //Internet Explorer
  	{
  		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  		xmlDoc.async=false;
  		xmlDoc.loadXML(xmlData); 
	}
	
	return xmlDoc;
}

function loadThemes()
{
	var xmlDoc = parseXML(themesConfig);
	var xmlThemesRoot = xmlDoc.getElementsByTagName("themes");
	
    if(xmlThemesRoot.length != 1)
    {
    	alert("Invalid themes configuration ! Can't load !");
    	return;
    }
    
    //Build themes map
    var xmlThemeNodes = xmlThemesRoot[0].childNodes;
    //Update SelectTheme list
    var selectTheme = document.getElementById('SelectTheme');
    
    for(var i=0; i < xmlThemeNodes.length; i++)
    {
    	var xmlThemeNode = xmlThemeNodes[i];
    	if(xmlThemeNode.nodeName == "theme")
    	{
    		var themeObj= new Object();
    		for(var j=0 ; j < xmlThemeNode.childNodes.length; j++)
    		{
				if(xmlThemeNode.childNodes[j].nodeName == "id")
    				themeObj.id = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;
    			else if(xmlThemeNode.childNodes[j].nodeName == "transperency")
    				themeObj.transperency = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;    				
    			else if(xmlThemeNode.childNodes[j].nodeName == "fill-color")
    				themeObj.fillColor = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;    				
    			else if(xmlThemeNode.childNodes[j].nodeName == "stroke-color")
    				themeObj.strokeColor = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;    				
    			else if(xmlThemeNode.childNodes[j].nodeName == "stroke-width")
    				themeObj.strokeWidth = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;    				
    			else if(xmlThemeNode.childNodes[j].nodeName == "font-size")
    				themeObj.fontSize = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;    		   				
    			else if(xmlThemeNode.childNodes[j].nodeName == "backimage")
    				themeObj.backImage = xmlThemeNode.childNodes[j].childNodes[0].nodeValue;    			
    		}
    		
			if(themeObj.id)
			{
				themesMap[themeObj.id] = themeObj; 		
				var opt = document.createElement('option');
				opt.text = themeObj.id;
				selectTheme.appendChild(opt);		
			}
    	}
    }
}

function applyTheme(themeName)
{
	
	var selectedTheme = themesMap[themeName];
	
	if(!selectedTheme)
	{
		alert("Theme not found. Can't apply !");
		return;
	}
	
	currTheme= themeName;
	try{
		if(selectedTheme.backImage)
		{
				mainInfiniteRect.setElement(document.getElementById(selectedTheme.backImage));
				mainInfiniteRect._originalImage = document.getElementById(selectedTheme.backImage);
				mainInfiniteRect.set({ 
				width : 10000000,
				height : 10000000,
			});
			themePattern = "change"
		}
		mainFabricCanvas.forEachObject(function(obj) {
			if(isNotTagArea(obj) && obj.name != "mainInfiniteRect")
			{
				obj.setOpacity(selectedTheme.transperency);
				if(obj.type == 'text')
					obj.setFontsize(selectedTheme.fontSize);
				obj.set('fill', selectedTheme.fillColor);
				obj.set('stroke', selectedTheme.strokeColor);
				obj.set('strokeWidth', selectedTheme.strokeWidth);
			}
		});
		customRenderAll();
		
		//Update in main html 
		if(selectedTheme.transperency)
			document.getElementById('TransperencySlider').value = selectedTheme.transperency;
		if(selectedTheme.fontSize)
			document.getElementById('fontSizeOfText').value = selectedTheme.fontSize;
		if(selectedTheme.fillColor)
			document.getElementById('FillColorSelector').value = selectedTheme.fillColor;
		if(selectedTheme.strokeColor)
			document.getElementById('StrokeColorSelector').value = selectedTheme.strokeColor;
		if(selectedTheme.strokeWidth)
			document.getElementById('StrokeWidth').value = selectedTheme.strokeWidth;
			
		mainFabricCanvas.forEachObject(function(obj) {
							if( obj.isSlideObj )
							{
								//console.log(obj.isPathImg);
								removeAllImages(obj);
							}
						});		
		
	}
	catch(e){
		alert(e.message);
	}		
}
