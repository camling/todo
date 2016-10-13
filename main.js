function todoProgram()
{
  
  this.todos = [];
  this.audioTag = document.getElementById("audio");
  this.list = document.getElementById("list");
  this.inputData = document.getElementById("inputData");
  this.inputButton = document.getElementById("inputButton");
  this.form = document.getElementById("form");
  var _this = this;


  
  this.init = function()
  {


  	// Check LocalStorage
  	this.checkLocalStorage();

     // Add EventListeners
    inputButton.addEventListener("click",function(e)
    {
      _this.clickedFunc(_this.inputData.value);
    });

    inputButton.addEventListener("touch",function(e)
    {
      _this.clickedFunc(_this.inputData.value);
    });

    form.addEventListener("submit",function(e)
    {
      _this.clickedFunc(_this.inputData.value);
      // stops form from submitting
      e.preventDefault();
    });



  
  };

  this.checkLocalStorage = function()
  {
  	if (typeof(Storage) !== "undefined") 
  	{
  		console.log("You have localStorage");
  		

  		if(localStorage.getItem("toDoArray") && localStorage.getItem("toDoArray").length != 0)
  		{
			this.todos = localStorage.getItem("toDoArray").split(",");
			this.createList();
  		}
  		
  	}
  };


  this.updateLocalStorage = function()
  {


  	if (typeof(Storage) !== "undefined") 
  	{
  		localStorage.setItem("toDoArray", this.todos.toString());
	  }

  };
 
  this.checkInputData = function()
  {
    if(this.inputData.value.length === 0)
      {
        this.playError();
        return false;
      }
    else
      {
        return true;
      }
  };


  this.playNewItem = function()
  {
    this.audioTag.src = "sounds/blip1.mp3";
    this.audioTag.play();
   
  };

  this.playRemoveItem = function()
  {
    this.audioTag.src = "sounds/short_whoosh1.mp3";
    this.audioTag.play();
   
  };

  this.playError = function()
  {
    this.audioTag.src = "sounds/bass_deny.mp3";
    this.audioTag.play();
   
  };
  
  this.clearInputData = function()
  {
    inputData.value = "";
  };
  
  
  this.clearList = function()
  {
    this.list.innerHTML = "";
  };
  
  this.createList = function()
  {
    
    function triggerRemove()
    {
       _this.playRemoveItem();
       this.className = this.className + " move";
       
       
    }

    function transitionRemove(e)
    {
      if(e.propertyName == 'left')
      {
        _this.remove(this.hold);
      }
      
     

    }
    
    var listLength = this.todos.length;
    for(var i = 0; i < listLength; i++)
      {
        var li = document.createElement("li");
        var text = document.createTextNode(this.todos[i]);
        li.hold = i;
        li.className = "listItem";
        li.addEventListener("click",triggerRemove);
        li.addEventListener("transitionend", transitionRemove);
        li.appendChild(text);
        list.appendChild(li);
      }
  };
  
  
      
    this.clickedFunc = function(x)
    {
      if(this.checkInputData())
        {
          this.add(x);
          this.clearInputData();
          this.clearList();
          this.createList();
          this.updateLocalStorage();
          this.playNewItem();


        }
     
    };
  
    this.add = function(x)
    {
      this.todos.push(x);      
    };
  
    this.remove = function(pos)
    {
      this.todos.splice(pos, 1);
      this.clearList();
      this.createList();
      this.updateLocalStorage();
      
    };
  
    this.getAll = function()
    {
      return this.todos;
    };

    this.showAll = function()
    {
    console.log(this.getAll());
    };

    this.init();
  
}
  
var todoObj = new todoProgram();
