var idno = 0;
function addAudio(data, fName)
{
	if (data)
	{
		if(!isAudio(fName))
		{
			alert("Select a valid audio file - mp3,ogg,wav !");
			return;
		}

		id = "audioBox" + idno;
		audioImage(idno, fName);
		addAudioBox(id, data, fName);
	}
	else
	{
		var urlW;
		var boxUrl = document.getElementById('ImageVideoFileSelector').value;
		
		if(boxUrl.length == 0)
			url = "http://www.synthmania.com/Korg%20MSC-3S%20Drums%201/Audio/Factory%20demo%20songs/Mister%20FX.mp3";
		else
			url = boxUrl;
			
		if(urlW && urlW.length > 0)
			url = urlW;
		
		if(!isAudio(url))
			{
				alert("Select a valid audio file - mp3,ogg,wav !");
				return;
			}
		
		id="audioBox" + idno;
		audioImage(idno, url);
		addAudioBox(id, null, url);
	}
}

function addAudioBox(id, data, fName)
{
	//alert("in addaudiobox");
	var ino = getdigit(id);
	var boxId = "audioBox"+ino;
	
	var divT = document.createElement("div");
	divT.setAttribute("id",boxId);
	divT.setAttribute("style","display:none;  position:absolute; border: 0px solid black; width:100%; background:transparent; left:800px; top:300px; width : 310px;height : 55px; ");
	
	var linebreak2 = document.createElement("br");
	
	var imgUrl;
	if(fName =="http://www.synthmania.com/Korg%20MSC-3S%20Drums%201/Audio/Factory%20demo%20songs/Mister%20FX.mp3")
		imgUrl=document.createTextNode("Demo Song-MisterFX.mp3");
	else
		imgUrl=document.createTextNode(fName);
		
	var fontUrl = document.createElement("font");

	fontUrl.style.color = "purple";
	fontUrl.appendChild(imgUrl);

	var audio=document.createElement("audio");
	var audioId = "audioMedia" + ino;
	idno++;
	audio.setAttribute("id", audioId);
	audio.setAttribute("preload", "auto");
	audio.setAttribute("autobuffer", "true");
	
	if (data)
		audio.setAttribute("src", data);
	else
		audio.setAttribute("src", fName);
		
	audio.setAttribute("draggable", false);
	
	audio.controls=true;
	audio.play();
	//alert("playing");
	divT.appendChild(fontUrl);
	divT.appendChild(linebreak2);
	divT.appendChild(audio);
	document.getElementById("MainHTMLCanvasAreaTable").appendChild(divT);	
	
}


function dispControl(event)
{
var isPlayMode = getPlayMode();
var id;
var elem;
if(event.target && event.target._element && event.target._element.id && typeof(event.target._element.id) == "string" && event.target._element.id.substring(0,10) == "audioImage")
	elem = event.target._element;
else if(event.target && event.target.id && typeof(event.target.id) == "string" && event.target.id.substring(0,10) == "audioImage")
	elem = event.target;

id = elem.id;
//alert("id in disp"+id);
var x = event.target.getLeft();
var y = event.target.getTop();
var height = event.target.getHeight();
var width = event.target.getWidth();
var ino = getdigit(id);
var audioId = "audioMedia" + ino;
var boxId = "audioBox" + ino;
var box = document.getElementById(boxId);
//alert("boxId "+boxId);
if(!isPlayMode)
{
box.style.top = y + height/2 + 10 + "px";
box.style.left = x - width + "px";
}
else
{
box.style.top = y + "px";
box.style.left = x  - 120 + "px";
}
box.style.display="block";
document.getElementById(audioId).controls=true;
}

function removeControl(event)
{
//alert("id "+event.target.id);

var id;
var elem;
if(event.target && event.target._element && event.target._element.id && typeof(event.target._element.id) == "string" && event.target._element.id.substring(0,10) == "audioImage")
	elem = event.target._element;
else if(event.target && event.target.id && typeof(event.target.id) == "string" && event.target.id.substring(0,10) == "audioImage")
	elem = event.target;

id = elem.id;
//alert("id in remove"+id);
var ino = getdigit(id);
var audioId = "audioMedia" + ino;
var boxId = "audioBox" + ino;
document.getElementById(boxId).style.display="none";
document.getElementById(audioId).controls=false;
}

function getdigit(id)
{
var no = id.match(/\d/g);
return no;
}

function audioImage(idno,audiourl)
{
	try{
    	var url = document.getElementById('audioIcon').src;
			insertTop = 250;
			insertLeft = 450;
			
		if(!isImage(url))
		{
			alert("Select a valid image file !");
			return;
		}
			
		fabric.util.loadImage(url, function(img) 
	   	 						   {
	  								  	var oImg = new fabric.Image(img);
	  									oImg.set({ 
	    									left: insertLeft, 
	    									top: insertTop,
	    									scaleY: 0.5,
	    									scaleX: 0.5
	  									});
	  									oImg.setOpacity(document.getElementById('TransperencySlider').value);
	  									
										oImg.id = "audioImage"+idno;
										oImg.media = "audioMedia" + idno;
										oImg.hasAudio = 1;
										oImg.audioUrl = audiourl;
	  									mainFabricCanvas.add(oImg);
										frameSort();
										customRenderAll();
								   });
	}
	catch(e){
		alert(e.message);
	}	
}