var count = 0;
var maxPage = 2;
var a = 1;


function stop()
{
}

//sends nextButton to decide if it will show the next form
function next()
{
	console.log("next" + count);
	var check = required();
	if (check != 0)
		count++;
	decide(count, "n");

}

//sends prevButton to decide if it will show the previous form
function prev()
{
	console.log("prev" + count);

	count--;
	decide(count, "p");
}

//decides which form to show
function decide(a, t)
{
	console.log("decide" + a);
	if (a == 0)
	{
		console.log("showing customerInfo");
		document.getElementById('contactInfo').style.display = "block";
		document.getElementById('problemInfo').style.display = "none";
		document.getElementById('descriptionInfo').style.display = "none";
		document.getElementById('nextButton').style.display = "block";
		document.getElementById('subButton').style.display = "none";
		count = 0;
	}
	else if (a == 1)
	{
		console.log("showing problemInfo");
		document.getElementById('contactInfo').style.display = "none";
		document.getElementById('problemInfo').style.display = "block";
		document.getElementById('descriptionInfo').style.display = "none";
		document.getElementById('nextButton').style.display = "block";
		document.getElementById('subButton').style.display = "none";
	}
	else if (a == 2)
	{
		console.log("showing nextInfo");
		document.getElementById('problemInfo').style.display = "none";
		document.getElementById('descriptionInfo').style.display = "block";
		document.getElementById('nextButton').style.display = "none";
		document.getElementById('subButton').style.display = "block";
	}
	else //if the count reaches the end, undo the count change
	{
		if ( t == "n")
			count--;
		else
			count++;
	}
}

function required()
{
	var element = document.getElementById("contactInfo").elements;
	console.log("Required");
	for (var i = 0; i < element.length; i++)
	{
		console.log(element[i]);
		var att = element[i].getAttribute("required");
			console.log(att);
			if (att != null && element[i].value === "" && element.type == "tel")
			{
				console.log(element[i] + ": is an empty textfield");
				
				var name = element[i].id;
				console.log(name);
				document.getElementById(name).focus();
				alert("please enter a value into: " + name);
				return 0;
			}
	}
	
	return 1;
	
}


function enter() //post forms to server
{
	console.log("Enter Submit Button");
		
	var element = document.getElementById("contactInfo").elements;
	var list = "";
	for (var i = 0; i < element.length; i++)
	{
		console.log(element[i]);
		if (element[i] != null)
		{
			if (element[i].value === "")
			{
				console.log(element[i] + ": is an empty textfield");
				
				var name = element[i].id;
				
				console.log(name);
				list += name + ",";
			}
		}
		else
			console.log(element[i]);
	}
	
	var c = confirm("the fields: " + list + " are still blank /n Continue?");
	
	console.log(c);
	
	if (c == true)
		alert("Sent!");
	else
	{
		console.log("cancel");
		count = -1;
		next();
	}
	
}

function reloadPage() //self explainatory 
{
	location.reload();
}
//----------------------------------------Button Initialization-------------------
document.getElementById("fname").focus();

var b0 = document.getElementById('nextButton')
b0.onclick = next;

var b1 = document.getElementById('prevButton')
b1.onclick = prev;

var b2 = document.getElementById('subButton')
b2.onclick = enter;