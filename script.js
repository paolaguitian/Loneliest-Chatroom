main = function(){
  addBySend();
  addByEnter();
  imLonely();
  deleteMessage();

}


addBySend = function(){  //add by pressing the button
  $('#new-message-button').click(function() {     //when button is clicked do ...
   addToConversation();
  });
}

 addByEnter = function(){   //add by  presing enter
  $('#new-message-body').keypress(function(event){  //watch every keypress,naming it event
    if(event.which == 13){  //when key press = 13(enter code) do this...
      event.preventDefault();  //dont do what you usually do
    addToConversation();
    }
  });
}

deleteMessage = function(){
$('#conversation').on('click','.delete',function(event){ //ON clicking this element delete do this
event.preventDefault(); // clears default .. instead of delete you can use
$(this).parent().remove();

});
}

getTime  = function(){
  var time = new Date();
  return time.getHours()+ ":" + time.getMinutes();
}

var turn = 0; //increments everytime a message is sent
username =function(){
  var people = ["Me","Myself","I"];
  return people[turn ++ % 3];  //remainder will always be either 0 1 0r 2
}

message = function(textarea,chuck){  //append new message to chat
  //var name = chuck != undefined ? chuck : username(); same as if below
  var name;
  if (chuck != undefined){
    name = chuck;
  }
  else {
    name = username();
  }
   $("#conversation").append("<li class = 'message'><a class = 'delete' href = '#'>Delete</a><h3 class = 'author'>"+name+"</h3> <p class= 'message-body'>" + textarea + "</p><span class='timestamp'>"+getTime()+"</span></li>");
}

addToConversation = function(){
  var textarea = $("#new-message-body").val();
  $("#new-message-body").val("");
  message(textarea);
};

imLonely = function(){
  $('#lonely').click(function(){
    chuckAjax();
  });

}

chuckAjax = function(){
  $.ajax({
    url: "https://api.icndb.com/jokes/random", //makes a request
    success: function(data){
      var joke = data.value.joke;
      message(joke,"Internet"); //send second param chuck == internet
    }
  });
}

$(document).on("load ready", main);
