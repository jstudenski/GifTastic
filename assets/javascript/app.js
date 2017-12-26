window.onload = function() {

console.log('Hello World');
var animals = ["Cat", "Dog", "Fish", "Flamingo"];


function genBtns() { // clear div
  $("#buttons").empty();
  for (var i = 0; i < animals.length; i++) {
    var btn = $("<button>");
    btn.addClass("animal");
    btn.attr("data-name", animals[i]);
    btn.text(animals[i]);
    btn.click(ajaxRequest);
    $("#buttons").append(btn);
  }
}



function ajaxRequest() {
  $('.animal').removeClass("active");
  $(this).addClass("active");


  var animal = $(this).attr("data-name");
  var limit = 12;
  var apikey = 'dc6zaTOxFJmzC'

  var queryURL = "https://api.giphy.com/v1/gifs/search"
    + "?q=" + animal 
    + "&limit=" + limit
    + "&api_key=" + apikey;


// Performing our AJAX GET request
$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var results = response.data;
    $("#gifs-appear-here").empty();

    for (var i = 0; i < results.length; i++) {

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var rating = results[i].rating;
        var p = $("<p>").text(rating);

        console.log(results[i])

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