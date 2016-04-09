var noiseValue = 100; //Noise config
var gradientTransparencyValue = 10; //Gradient config

function applyImageFilter(index, filterObj) 
{
	try{	
		var activeObject = mainFabricCanvas.getActiveObject();
		
		if(activeObject == null || activeObject.type != 'image')
			return;
		if(activeObject.name)
			if(activeObject.name == 'mainInfiniteRect')
				return;
		//console.log(filterObj.type);
			var checked = (document.getElementById(filterObj.type).style.backgroundColor == "transparent");
		
			var filter = checked && filterObj;

			activeObject.filters[index] = filter;
		
			if (filter)
				document.getElementById(filterObj.type).style.backgroundColor = "#0000FF";
			else
				document.getElementById(filterObj.type).style.backgroundColor = "transparent";
			
			activeObject.applyFilters(function() {customRenderAll();});
		
		
	}
	catch(e){
		alert("Browser throws exception - " + e.message + " !\nPlease check HTML5 support !");
	}		
}

function applyImageFilterValue(index, prop, value)
{
	try{
		var activeObject = mainFabricCanvas.getActiveObject();
		if(activeObject == null || activeObject.type != 'image')
			return;
		
		if(activeObject.name)
			if(activeObject.name == 'mainInfiniteRect')
				return;
		  
		if (activeObject.filters[index]) {
			activeObject.filters[index][prop] = value;
			document.getElementById('BrightnessSlider').value = activeObject.filters[5]['brightness'];
		    activeObject.applyFilters(function() {customRenderAll();});
		}
		else
		{
			document.getElementById('BrightnessSlider').value = 0;
			//applyImageFilter(index, new fabric.Image.filters.Brightness({brightness: value}));
			try{	
				var activeObject = mainFabricCanvas.getActiveObject();
				if(activeObject == null || activeObject.type != 'image')
					return;
		  
				activeObject.filters[index] = new fabric.Image.filters.Brightness({brightness: value});
				activeObject.applyFilters(function() {customRenderAll();});
				}
			catch(e){
				alert(e.message);
			}
			
		}
	}
	catch(e){
		alert("Browser throws exception - " + e.message + " !\nPlease check HTML5 support !");
	}		
}

function applyGrayscale()
{
	applyImageFilter(0, /* this.checked && */ new fabric.Image.filters.Grayscale());
}

function applyInvert()
{
	applyImageFilter(1, /* this.checked && */ new fabric.Image.filters.Invert());	
}

function applySepia1()
{
	applyImageFilter(2, /* this.checked && */ new fabric.Image.filters.Sepia());
}

function applySepia2()
{
	applyImageFilter(3, /* this.checked && */ new fabric.Image.filters.Sepia2());
}

function applySepia3()
{
	applyImageFilter(4, /* this.checked && */ new fabric.Image.filters.Sepia3());
}

function applyNoise()
{
	applyImageFilter(6, /* this.checked && */ new fabric.Image.filters.Noise({noise: noiseValue}));

}

function applyGradient()
{
	applyImageFilter(7, /* this.checked && */ new fabric.Image.filters.GradientTransparency({threshold: gradientTransparencyValue}));

}

function applyBrightness()
{
	applyImageFilterValue(5, 'brightness', parseInt(this.value));		
}

function updateImageFilterControls()
{
	var activeObject = mainFabricCanvas.getActiveObject();
	
	if(activeObject.type == 'image')
	{	
		document.getElementById('Grayscale').checked = !!activeObject.filters[0];
		document.getElementById('Invert').checked = !!activeObject.filters[1];
		document.getElementById('Sepia').checked = !!activeObject.filters[2];
		document.getElementById('Sepia2').checked = !!activeObject.filters[3];
		document.getElementById('Sepia3').checked = !!activeObject.filters[4];
		if(activeObject.filters[5])
			document.getElementById('BrightnessSlider').value = activeObject.filters[5]['brightness'];
		else
			document.getElementById('BrightnessSlider').value = 0;		
		document.getElementById('Noise').checked = !!activeObject.filters[6];
		document.getElementById('GradientTransparency').checked = !!activeObject.filters[7];			
	}	
}
