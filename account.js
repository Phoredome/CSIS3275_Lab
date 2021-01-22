
function verify()
{
	window.location = "profile.html";
}


var b0 = document.getElementById('enterButton');
b0.onclick = verify;

/*function startup()
{
	var person = prompt("Please enter your name", "Harry Potter");

	if (person == null || person == "") 
	{
	  alert("User cancelled the prompt.");
	  location.reload();
	} 
	else
	{
	  txt = "Hello " + person + "! How are you today?";
	}
}

document.getElementById("bodySection").onload = startup;*/