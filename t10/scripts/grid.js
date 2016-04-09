var superGrid;
var gridEnable = true;


function manageSuperGrid()
{
var diffXX;
if( superGrid.getLeft() < 0 )
	diffXX = (150 * canvasScaleFactor);
else if( superGrid.getLeft() > mainFabricCanvas.getWidth() )
	diffXX = (150 * canvasScaleFactor) * (-1);
	
var diffYY;
if( superGrid.getTop() < 0 )
	diffYY = (150 * canvasScaleFactor);
else if( superGrid.getTop() > mainFabricCanvas.getHeight() )
	diffYY = (150 * canvasScaleFactor) * (-1);
	
while(1)
{
	if( (superGrid.getLeft() < 0) ||  (superGrid.getLeft() > mainFabricCanvas.getWidth()) )
	{
		superGrid.setLeft( superGrid.getLeft() + diffXX); 
	}
	else
		break;
}

while(1)
{
	if( (superGrid.getTop() < 0) ||  (superGrid.getTop() > mainFabricCanvas.getHeight()) )
	{
		superGrid.setTop( superGrid.getTop() + diffYY); 
	}
	else
		break;
}
return;
}