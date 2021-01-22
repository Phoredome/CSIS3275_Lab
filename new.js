var slider = document.getElementById("myRange");
var output = document.getElementById("display");
output.innerHTML = "Grid Size: " + slider.value;

var GRID = slider.value;
var GridNum = parseInt(GRID);
var SIZE = GridNum + 1;
var myArr = new Array(SIZE);
var winArr = new Array(SIZE);
var rowArr = new Array(SIZE);
var colArr = new Array(SIZE);
var stateArr = new Array(SIZE);
var defColour = "grey";
var colour1 = "blue";
var colour2 = "red";
var a = 0;
var	b = 0;
var rowCount = 0;
var colCount = 0;

//Calls functions to construct game board
function Welcome()
{	
	console.log("Welcome!");
	alert("Hello! \n Welcome To My Game");
	alert("For A Diffrent Puzzle, Please Hit 'New Puzzle'");
	initGame();
}

function initGame()
{
	console.log("initGame");
	console.log("grid is: " + GRID);
	console.log("GridNum: " + GridNum);
	console.log("SIZE is: " + SIZE);
	if (document.getElementById('resetButton').style.display === "none")
	{
		decide();																	//CHECKS TO RESET PAGE------------------
	}
	createPuzzle();																	//CALLS TO CREATE PUZZLE----------------
	
	hints();																		//CALLS TO CREATE HINT------------------	


	tableCreate();																	//CALLS TO CREATE TABLE-----------------
	
}

//Querys for random value and appends said value to solution array
function createPuzzle()
{
	console.log("createPuzzle");
	for(var i = 0; i < SIZE; i++)
    {
		winArr[i] = new Array(SIZE);
		stateArr[i] = new Array(SIZE);
		for(var j = 0; j < SIZE; j++)
		{
			winArr[i][j] = null;
			stateArr[i][j] = null;
			
			if( i != 0 && j != 0)
			{
				var rand = random();
				winArr[i][j] = rand;
				stateArr[i][j] = 0;
			}
		}
	}
}

//Returns 1/0
function random()
{
	console.log("WARNING!");
	rand = Math.round(Math.random());
	return rand;
}

//Builds Main Table
function tableCreate()													//{1}Table Setup------------------------------------
{
	console.log("tableCreate");
	var tableHolder = document.getElementById("tableHolder");
    tableHolder.innerHTML = "";

    var tbl  = document.createElement('table');
	
	var d = 1;
	var c = 1;
	
	for(var i = 0; i < SIZE; i++)
    {
		var tr = tbl.insertRow(); //INSERT ROW------------------------------------------------------------------------------
        
		myArr[i] = new Array(SIZE);

        for(var j = 0; j < SIZE; j++)
        {
			if (i === 0 || j === 0)
				console.log("Proceeding With Initialization");
			else
			{
				console.log("Initiating Hint Locations: " + i + " : " + j);
				myArr[i][j] = null;
			}
			
			var td = tr.insertCell(); //INSERT CELL ------------------------------------------------------------------------
			var id = " ";
			
			if(j === 0)										//ASSIGN ID TO ALL LABEL CELLS----------------------------------
				if( i != 0)
				{
					var name = "Row" + c;
					td.setAttribute('id',name);
					id = colArr[i];
					console.log(name);
					c++;
					
				}
				else
				{
					td.setAttribute('id','board');
				}
			else if(i === 0)
				if( j != 0)
				{
					var name = "Col" + d;
					td.setAttribute('id',name);
					id = rowArr[j];
					console.log(name);
					d++;
				}
				else
				{
					td.setAttribute('id','board');
				}
			else
			{
				td.setAttribute('id',i + "-" + j);
				console.log(i + " " + j);
			}
			
			td.appendChild(document.createTextNode(id)); 	//EMPTY CELL----------------------------------------------------
			
			if (td.innerHTML === " ")						//ADD CELL TO CLASS---------------------------------------------
				td.classList.add('tdClass');
			else
			{
				if (i === 0 )
					td.classList.add('headerCol');
				else
					
					td.classList.add('headerRow');
			}
			
			if (winArr[i][j] != null)							//ASSIGN COLOUR TO ALL CELLS (DEFAULT)----------------------
				td.style.backgroundColor = colour1;
			else
				td.style.backgroundColor = defColour;
			
			
			
			if (i != 0 && j != 0)
				td.addEventListener("click", test, false);
				//td.removeEventListener("click", test, true);
			if( i != 0 && j != 0)
				myArr[i][j] = td;
			
			
			//console.log(td);
        }
    }
    tableHolder.appendChild(tbl);								//INSERT TABLE----------------------------------------------
	console.log(myArr);
	console.log("Building Table");
}

 function test(e)		//ADD EVENT LISTENER FOR EACH CELL(COLOUR CHANGE)-----------
				{
					e = e || window.event;
					var target = e.target || e.srcElement;
					toggleColour(target);
					
				}

//on-call: Changes colour of element
function toggleColour(element)									//{2}Ability To Toggle Table CELLS--------------------------
{
	console.log("toggleColour");
	let str = element.getAttribute("id");
	let spArr = str.split("-");
	var colour = 0;
	
	if (element.style.backgroundColor === colour1)
	{
		element.style.backgroundColor = colour2;
		colour = 1;
	}
	else
	{
		element.style.backgroundColor = colour1;
		colour = 0;
	}
	
	stateArr[spArr[0]][spArr[1]] = colour;
	
	//var elem = spArr[spArr];
	console.log("this is sp: " + spArr);
	console.log("this is colour: " + colour);
	console.log("this is stateArr: " + stateArr[spArr[0]][spArr[1]]);
	
	checkVictory();
}

function checkVictory()
{
	console.log("checkVictory");
	var score = 0;
	var total = GRID * GRID;
	for(var i = 1; i < SIZE; i++)
		for(var j = 1; j < SIZE; j++)
		{
			var cellColour = stateArr[i][j];
			var id = cellColour;
			var elem2 = winArr[i][j];
			console.log( "Entities: " + cellColour + " - " + colour1 + " - " + elem2);
			/*var id = null;
			console.log(cellColour);
			//console.log(cellColour.style.backgroundColor)
			if (cellColour === colour1){
				//console.log("col1")
				id = 0;
			}
			else{
				//console.log("col2")
				id = 1;
			}*/
			console.log("ID: " + id);
			console.log("stateArr: " + cellColour + "correct: " + elem2);
			if(id === elem2)
			{
				console.log("row: " + i + "col: " + j + "is correct");
				score++;
				console.log("Score: " + score + " Total: " + total);
			}
			else{
				console.log("row: " + i + "col: " + j + "is incorrect");
				return -1;
			}
		}
	if (score === total)
		alert("Hello! \n\n Congratulation! \n You Win!");
	
}

//Displays Hints
function hints()
{
	console.log("hints");
	var num1 = " ";
	var num2 = " ";
	var name1 = " ";
	var name2 = " ";
	for(var i = 1; i < SIZE; i++)
	{
		for(var j = 1; j < SIZE; j++)
		{
			
			num1 = calculate(j, winArr[i][j], num1, "row");
			num2 = calculate(j, winArr[j][i], num2, "col");
			
			if( j === 1)
			{
				name1 = "Row" + i;
				name2 = "Col" + i;
			}
		}
		
		console.log(name1 + " : " + num1);
		console.log(name2 + " : " + num2);
		
		rowArr[i] = num2;
		colArr[i] = num1;
		
		num1 = " ";
		num2 = " ";
		
		//document.getElementById(name1).innerHTML(num1);
		//document.getElementById(name2).innerHTML(num2);
		
		//var location = myArr[i][j];
		//var cell = document.getElementById(location);
		//var text = document.createTextNode("some text");
		//location.appendChild(text);
		//location.innerHTML("Text");
	}
}

//calculates values of filled squares
function calculate(i,a,info,usage)
{
	console.log("calculate");
	txt = " ";
	if (a === 1)
	{
		if(usage === "row")
		{
			rowCount++;
		}
		else
		{
			colCount++;
		}
	}
	else
	{
		if(usage === "row")
		{
			if (rowCount != 0)
			{
				info += rowCount + ", ";
				rowCount = 0;
				console.log("info row" + info);
			}
		}
		else
		{
			if (colCount != 0)
			{
				info += colCount + ", \n ";
				colCount = 0;
				console.log("info col" + info);
			}
		}
	}
	
	if(i === SIZE-1)
	{
		if (usage === "row")
		{
			if(rowCount!=0)
			info += rowCount + ", ";
			rowCount = 0;
		}
		else
		{
			if(colCount!=0)
			info += colCount + ", ";
			colCount = 0;
		}
	}
	
	txt = info;
	info = " ";
	return txt;
}

function show(type)												//{5}Show Solution Button Working----------------------------------
{
	console.log("Entering Show");
	var tableHolder = document.getElementById("tableHolder");
	var c = 1;
	var d = 1;
	var arrays = stateArr;
	console.log("showing hints or reverting back" + type);
	
	if( type === 1)
	{
		arrays = winArr;
		console.log("1");
	}
	else 
	{
		arrays = stateArr;
		
		console.log("2");
		console.log(arrays);
	}
	
    console.log("Editing Table" + arrays);
	var cell
	console.log("Reading Values");
    for(var i = 0; i < SIZE; i++)
    {
        for(var j = 0; j < SIZE; j++)
		{
			if(i != 0 && j != 0)
			{
				var elem2 = arrays[i][j];
				console.log("elem2: " + elem2);
				//if( type ===1) {
						
					if (elem2 === 0)
						marker = colour1;
					else
						marker = colour2;
				/*} else {
					if (elem2 === 1)
						marker = colour1;
					else
						marker = colour2;
				}*/
			}
			else
				marker = 'grey';
			
			if(j === 0)										//RETRIEVE ID'S FOR ALL CELLS AND REDIES FOR COLOURS----------------------------------
				if( i != 0)
				{
					var name = "Row" + c;
					console.log(name);
					cell = document.getElementById(name);
					//console.log(cell);
					c++;
				}
				else
				{
					cell = document.getElementById("board")
				}
			else if(i === 0)
				if( j != 0)
				{
					var name = "Col" + d;
					console.log(name);
					cell = document.getElementById(name);
					//console.log(cell);
					d++;
				}
				else
				{
					cell = document.getElementById("board")
				}
			else
			{
				if(i != 0 && j != 0)
				{
					var ID = i + "-" + j;
					console.log(ID);
					cell = document.getElementById(ID);
					//console.log(cell);
				}
			}
			console.log(cell);
			console.log(marker);
			cell.style.backgroundColor = marker;
			
		}
	}
	console.log("Building Solution");
}

function reset()
{
	
	console.log("Starting Reset Process");
	var arrays = stateArr;
	
	for(var i = 0; i < SIZE; i++)
    {
        for(var j = 0; j < SIZE; j++)
		{
			if(i != 0 && j != 0)
			{
				arrays[i][j] = 0;
				console.log("elem2: " + arrays[i][j]);
			}
		}
	}
	
	show(2);
}

function decide()
{
	console.log(" decide1 ");
	if (document.getElementById('resetButton').style.display === "none")
	{
		console.log(" decide if 1 ");
		b--;
		console.log(" decide if 2 ");
		show(2);
		document.getElementById('ansButton').innerText = "Show Answer";
		
		document.getElementById('resetButton').style.display = "inline-block";
		//Show Old Reset Button
		//Change Button Back TO Show Solution
		
	}
	else
	{
		console.log(" decide else 1 ");
		b++;
		console.log(" decide else 2 ");
		show(1);
		document.getElementById('ansButton').innerText = "Return";
		
		document.getElementById('resetButton').style.display = "none";
		//Hide Old Reset Button
		//Show New Reset Button
		
	}
	
}
slider.oninput = function(){
	output.innerHTML = "Grid Size: " + this.value;
	GRID = this.value;
	GridNum = parseInt(GRID);
	SIZE = GridNum + 1;
	console.log("GRID");
}

function reloadPage()
{
	console.log("reloadPage");
	location.reload();
}

var b0 = document.getElementById('startButton')
b0.onclick = initGame;

var b1 = document.getElementById('ansButton')
b1.onclick = decide;

var b2 = document.getElementById('resetButton')
b2.onclick = reset;

document.getElementById("bodySection").onload = Welcome;