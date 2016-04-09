<?php
	// Check if the user submitted this form
function downloadFile()
{
	$filename = $_SESSION['last_saved_fname'];

	$ctype="txt";

	header("Pragma: public"); // required
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("Cache-Control: private",false); // required for certain browsers
	header("Content-Type: $ctype");

	header("Content-Disposition: attachment; filename=\"".basename($filename)."\";" );
	header("Content-Transfer-Encoding: binary");
	header("Content-Length: ".filesize($filename));
	readfile("$filename");
	exit();
}
if (isset($_POST["submitwrite"])) {
	// Open the file in write mode
	$_SESSION['last_saved_fname']=$_POST["fileName"];

	$handle = fopen($_POST["fileName"],"w+"); 
	if ($handle) {
		fwrite($handle,$_POST["json"]);
		fclose($handle);
	}
	downloadFile();
	header("Location:index.html");
}

if (isset($_POST["restoreWrite"])) {
exit;
}
?>

