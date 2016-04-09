
var shuff=0;
function createSlideObject()
{
	//creation of frame with controls
	var bracFrame = new fabric.Path('m0 0 L0 300 L80 300 L80 280 L20 280 L20 20 L80 20 L80 0 L0 0 m500 0 L500 300 L420 300 L420 280 L480 280 L480 20 L420 20 L420 0 L500 0' , 
			{ fill: '#6600CC', opacity:'0.5', width: 500, height: 300, stroke: 'black', strokeWidth: 0.1});
			//stroke: 'black', strokeWidth: 2 
			bracFrame.setLeft( 800);
			bracFrame.setTop( 300);
			bracFrame.isSlideObj=1;
			bracFrame.slideNum=-1;
			bracFrame.lockUniScaling = true;
			//bracFrame.lockScalingY = true;
			bracFrame.initialChildren=-1			
			mainFabricCanvas.add(bracFrame);
			addFrame(bracFrame);
		//console.log(bracFrame.getTop()+" "+bracFrame.getLeft());	
	var ctrlLeft=new fabric.Triangle({
			            width: 25,
                        height: 25,
                        top: (bracFrame.getTop())+(bracFrame.getHeight()*0.5)-10,
                        left: bracFrame.getLeft()-60,      
                        fill: '#6600CC',
						angle:-90
                       });
	ctrlLeft.isLeftCtrl=1;
	ctrlLeft.id = counter;
	counter++;
	disableCOntrols(ctrlLeft);
	//ctrlLeft.selectable=false;
	mainFabricCanvas.add(ctrlLeft);
	
	var ctrlRight=new fabric.Triangle({
			            width: 25,
                        height: 25,
                        top: (bracFrame.getTop())+(bracFrame.getHeight()*0.5)-10,
                        left: bracFrame.getLeft()+60,      
                        fill: '#6600CC',
						angle:90
                       });
	ctrlRight.isRightCtrl=1;	
	ctrlRight.id = counter;
	counter++;
	disableCOntrols(ctrlRight);
	mainFabricCanvas.add(ctrlRight);
	
	var circleCtrl = new fabric.Circle({
						  radius: 10, 
						  left: bracFrame.getLeft(),
						  top: (bracFrame.getTop())+(bracFrame.getHeight()*0.5)-10,
						  fill: '#6600CC',
						 });
    circleCtrl.isShuffle=1;
	circleCtrl.id = counter;
	counter++;
	disableCOntrols(circleCtrl);
    mainFabricCanvas.add(circleCtrl);
	bracFrame.ctrl1=circleCtrl;
	bracFrame.child1 = circleCtrl.id;
	bracFrame.ctrl2=ctrlRight;
	bracFrame.child2 = ctrlRight.id;
	bracFrame.ctrl3=ctrlLeft;
	bracFrame.child3 = ctrlLeft.id;
	bracFrame.isCtrlChildAdded=1;
	
	frameSort();
	customRenderAll();
	

}
function shuffle(ctrlChild)
{	
	if(getPlayMode())
	return;
	
	var tempArry=new Array();
		var parentSlideObj=findParentFrame(ctrlChild);
	if(shuff==0)
	{
		
		parentSlideObj.initialChildren=-1;
		parentSlideObj.slideNum=-1
		tempArry= getArrayOfFrameObjects(parentSlideObj);
		
		if(tempArry.length>0)
		{
				for(var i=0; i<tempArry.length; i++)
				{
					if(!tempArry[i].isLeftCtrl && !tempArry[i].isRightCtrl && !tempArry[i].isShuffle)
					tempArry[i].setOpacity(0);
				
				}
				for(var i=0; i<parentSlideObj.slideChildArray.length; i++)
				{
					parentSlideObj.slideChildArray[i].selectable=true;
					parentSlideObj.slideChildArray[i].setOpacity(1);
				
				}
		}
		shuff=1;
				
	}
	if(shuff==1)
	{
		/*parentSlideObj.slideChildArray= getArrayOfFrameObjects(parentSlideObj);
		for(var i=0; i<parentSlideObj.slideChildArray.length; i++)
				{
					mainFabricCanvas.add(parentSlideObj.slideChildArray[i]);
				
				}
				shuff=0;*/
		shuff=0;
	}
}


function removeAllImages(parentSlideObj)
{
	if(parentSlideObj.slideChildArray.length>0)
	{
		for(var j=0;j<parentSlideObj.slideChildArray.length; j++)
		{
			if(!(parentSlideObj.slideChildArray[j].isLeftCtrl||parentSlideObj.slideChildArray[j].isLeftCtrl||parentSlideObj.slideChildArray[j].isShuffle))
			{
				//mainFabricCanvas.remove(childArry[j]);
				parentSlideObj.slideChildArray[j].setOpacity(0);
			}
		}	
	
	if(parentSlideObj.slideNum==-1)
		{
			parentSlideObj.slideChildArray[0].setOpacity(1);
		}
	else
	{
		parentSlideObj.slideChildArray[parentSlideObj.slideNum].setOpacity(1);
	}
	customRenderAll();
	}
}

function prevOrNext(ctrlChild)
{
	//if(getPlayMode())
		//return;
	var temparray=new Array();
	var parentSlideObj=findParentFrame(ctrlChild);
	if(parentSlideObj.initialChildren==-1)
	{
		parentSlideObj.slideChildArray= getArrayOfFrameObjects(parentSlideObj);
		var len=parentSlideObj.slideChildArray.length;
		for(var i=0,j=0; i<len; i++)
		{
			if(!(parentSlideObj.slideChildArray[i].isLeftCtrl||parentSlideObj.slideChildArray[i].isRightCtrl||parentSlideObj.slideChildArray[i].isShuffle) )
			{
				temparray[j]=parentSlideObj.slideChildArray[i];
				temparray[j].selectable=false;
				j++;
			}
		}
		parentSlideObj.slideChildArray=temparray;
		parentSlideObj.slideLength=parentSlideObj.slideChildArray.length;
		removeAllImages(parentSlideObj);
		parentSlideObj.initialChildren=1;
		
	}
	
	if(parentSlideObj.slideLength>0)
	{
		if(parentSlideObj.slideNum==-1)
		{
			nextSlide(parentSlideObj);
		}
		else
		{
			if(ctrlChild.isLeftCtrl)
			{
			
				prevSlide(parentSlideObj);
			}
			else if(ctrlChild.isRightCtrl)
			{
				nextSlide(parentSlideObj);
			}
		}
	}
	//console.log("slidenum"+parentSlideObj.slideNum);
}

function prevSlide(parentSlideObj)
{ 
	if(parentSlideObj.slideNum<1)
	{
		
		return;
	}
	else
	{
		//mainFabricCanvas.remove(parentSlideObj.slideChildArray[parentSlideObj.slideNum]);
		parentSlideObj.slideChildArray[parentSlideObj.slideNum].setOpacity(0);
		parentSlideObj.slideNum--;
		parentSlideObj.slideChildArray[parentSlideObj.slideNum].setOpacity(1);
		//mainFabricCanvas.add(addAndRemove(parentSlideObj,parentSlideObj.slideChildArray[parentSlideObj.slideNum]));
	}
	mainFabricCanvas.renderAll();
}

function nextSlide(parentSlideObj)
{
	if(parentSlideObj.slideNum==-1)
	{
		parentSlideObj.slideNum++;
		parentSlideObj.slideChildArray[parentSlideObj.slideNum].setOpacity(1);
		//mainFabricCanvas.add(addAndRemove(parentSlideObj,parentSlideObj.slideChildArray[parentSlideObj.slideNum]));
	}
	else if(parentSlideObj.slideNum==(parentSlideObj.slideLength-1))
	{
		return;
	
	}
	else
	{
		//mainFabricCanvas.remove(parentSlideObj.slideChildArray[parentSlideObj.slideNum]);
		parentSlideObj.slideChildArray[parentSlideObj.slideNum].setOpacity(0);
		parentSlideObj.slideNum++;
		parentSlideObj.slideChildArray[parentSlideObj.slideNum].setOpacity(1);
		//mainFabricCanvas.add(addAndRemove(parentSlideObj,parentSlideObj.slideChildArray[parentSlideObj.slideNum]));
	}
	
	
	mainFabricCanvas.renderAll();
}
	
function addAndRemove(parentSlideObj,childObj)
{
	//mainFabricCanvas.add(childObj);
	//mainFabricCanvas.renderAll();
	//childObj.scaleY=parentSlideObj.scaleY;
	//childObj.scalex=parentSlideObj.scaleX;
	//console.log("width"+parentSlideObj.getWidth()+"height"+parentSlideObj.getHeight())
	childObj.setWidth(parentSlideObj.getWidth()-(50*parentSlideObj.scaleX));
	childObj.setHeight(parentSlideObj.getHeight()-(50*parentSlideObj.scaleY));
	childObj.setTop(parentSlideObj.getTop());
	childObj.setAngle(parentSlideObj.getAngle());
	childObj.setLeft(parentSlideObj.getLeft());
	childObj.scaleY=1;
	childObj.scaleX=1;
	//mainFabricCanvas.add(childObj);
	//mainFabricCanvas.renderAll();
//console.log("width"+parentSlideObj.getWidth()+"height"+parentSlideObj.getHeight())
//console.log("childwidth"+childObj.getWidth()+"childheight"+childObj.getHeight())
	return childObj;
}	

function toFitSlideSize(infiniteBase)
{	
	if(getPlayMode())
	return; 
	
	//console.log("sri"+" "+infiniteBase);
	mainFabricCanvas.forEachObject(function(obj) {
							if(isNotTagArea(obj) && obj.name != "mainInfiniteRect" && obj.isSlideObj && !obj.isLeftCtrl && !obj.isRightCtrl && !obj.isShuffle && !obj.isPathImg && !infiniteBase.isFrame)
							{
								//console.log(obj.isPathImg);
								if(isObjectInFrame( obj, infiniteBase))
								{
									addAndRemove(obj,infiniteBase);
									changeObjectZPosition(infiniteBase, "top");
								}
							}
						});	
}

function disableCOntrols(obj)
{
	obj.hasControls = false;
	obj.lockMovementX = true;
	obj.lockMovementY = true;
	obj.lockScalingX = true;
	obj.lockScalingY = true;
	obj.lockUniScaling = true;
	obj.lockRotation = true;


}
