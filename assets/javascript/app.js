window.onload = function() {

var animals = ["Cat", "Dog"];


// generate initial buttons
$.each(animals, function( index, value ) {
  addBtn(value);
});


$("#plus-button").on("click", function(event) {
  event.preventDefault(); // stop page refresh
  var newAnimal = $("#btn-input").val().trim().toLowerCase();
  if (newAnimal !== '') { // if input is not empty
    animals.push(newAnimal);
    $("#btn-input").val(''); // clear input
    addBtn(newAnimal);
  }
});

function addBtn(name){
  var btn = $("<button>");
  btn.addClass("item-btn");
  btn.attr("data-name", name);
  btn.text(name);
  btn.click(ajaxRequest);

  var rmv = $("<div>");
  rmv.attr("id","x");
  rmv.attr("parent-name", name);
  rmv.text("x");
  rmv.click(removeButton);
  btn.append(rmv);
  //$("button").attr("id","testid");
  $("#btns").append(btn);
}

function removeButton() {
  var test = $(this).attr("parent-name");
  var index = animals.indexOf(test);

  for(var i = animals.length - 1; i >= 0; i--) {
    if(animals[i] === test) {
      animals.splice(i, 1);
    }
  }

  console.log(test);
  console.log(index);
  console.log(animals);
  $("[data-name='"+test+"']").remove();
}



// function genBtns() { // clear div
//   console.log(animals);

//   $("#btns").empty();
//   for (var i = 0; i < animals.length; i++) {
//     var btn = $("<button>");
//     btn.addClass("item-btn");
//     btn.attr("data-name", animals[i]);
//     btn.text(animals[i]);
//     btn.click(ajaxRequest);
//     // btn.append('<div class="remove">X</div>'); // .click(removeButton);
//     $("#btns").append(btn);

//   }

//   $(".remove").click(removeButton);
// }



function ajaxRequest() {

  



  $('.item-btn').removeClass("active");
  $(this).addClass("active");


  var animal = $(this).attr("data-name");

  $('#header').text(animal);


  var limit = numberofGifs;
  var apikey = 'dc6zaTOxFJmzC'

  var queryURL = "https://api.giphy.com/v1/gifs/search"
    + "?q=" + animal 
    + "&limit=" + limit
    + "&api_key=" + apikey;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var results = response.data;
    $("#gif-area").empty();

    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var rating = results[i].rating;
        var p = $("<p>").text(rating);

        // console.log(results[i])

        var animalGif = $("<img>");
        animalGif.attr({
          'data-state': 'still',
          src: results[i].images.fixed_width_still.url,
          'data-still': results[i].images.fixed_width_still.url,
          'data-animate': results[i].images.fixed_width.url
        }).click(animate);

        var gifDiv = $("<div class='item'>");
        gifDiv.append(animalGif);
        gifDiv.append(p);


        $("#gif-area").prepend(gifDiv);
      }
    }
  });
};


$('.testButton').click(function() {
  //console.log("hello");
  console.log($(this).attr("data-attribute"));
});

function animate() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}




var numberofGifs = 10;

var rangeSlider = function(){
  var slider = $('.slider'),
      range = $('.slider-range'),
      value = $('.slider-value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);

    });

    range.on('input', function(){
      $(this).next(value).html(this.value);
      numberofGifs = this.value;
    });
  });
};

rangeSlider();









} // window.onload