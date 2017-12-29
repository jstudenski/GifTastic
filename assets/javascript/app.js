window.onload = function() {


var animals = ["Cat", "Dog", "Fish", "Flamingo"];



$("#add-animal").on("click", function(event) {
  event.preventDefault(); // stop page refresh
  var newAnimal = $("#btn-input").val().trim();
  if (newAnimal !== '') { // if input is not empty
    animals.push(newAnimal);
    genBtns(); // re-generate buttons
    $("#btn-input").val(''); // clear input
  }
});


function removeButton() {
  console.log("REMOVE ME!");
  console.log(this);
}


function genBtns() { // clear div
  console.log(animals);

  $("#btns").empty();
  for (var i = 0; i < animals.length; i++) {
    var btn = $("<button>");
    btn.addClass("animal");
    btn.attr("data-name", animals[i]);
    btn.text(animals[i]);
    btn.click(ajaxRequest);
    // btn.append('<div class="remove">X</div>'); // .click(removeButton);
    $("#btns").append(btn);

  }

  $(".remove").click(removeButton);
}



function ajaxRequest() {

  $('.animal').removeClass("active");
  $(this).addClass("active");


  var animal = $(this).attr("data-name");
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
    $("#gif-zoo").empty();

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


        $("#gif-zoo").prepend(gifDiv);
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





genBtns();





var numberofGifs = 10;

var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider-range'),
      value = $('.range-slider-value');
    
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