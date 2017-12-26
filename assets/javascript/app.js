window.onload = function() {

console.log('Hello World');
var animals = ["Cat", "Dog", "Fish", "Flamingo"];


function genBtns() { // clear div
  $("#buttons-view").empty();
  for (var i = 0; i < animals.length; i++) {
    var btn = $("<button>");
    btn.addClass("animal");
    btn.attr("data-name", animals[i]);
    btn.text(animals[i]);
    btn.click(ajaxRequest);
    $("#buttons-view").append(btn);
  }
}



function ajaxRequest() {

console.log("HELLO");

var animal = $(this).attr("data-name");
var limit = 1;
var apikey = 'dc6zaTOxFJmzC'

var queryURL = "https://api.giphy.com/v1/gifs/search"
  + "?q=" + animal 
  + "&limit=" + limit
  + "&api_key=" + apikey;


// Performing our AJAX GET request
$.ajax({
    url: queryURL,
    method: "GET"
  })
  // After the data comes back from the API
  .done(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div with the class "item"
        var gifDiv = $("<div class='item'>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);



        var animalGif = $("<img>");
        animalGif.attr({
          'data-state': 'still',
          src: results[i].images.fixed_height_still.url,
          'data-still': results[i].images.fixed_height_still.url,
          'data-animate': results[i].images.fixed_height.url
        }).click(animate);

        gifDiv.append(p);
        gifDiv.append(animalGif);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  });
};


// $(".gif").on("click", function() {

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

// });






genBtns();


} // window.onload