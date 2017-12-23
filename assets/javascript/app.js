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
// In this case, the "this" keyword refers to the button that was clicked
var animal = $(this).attr("data-name");

// Constructing a URL to search Giphy for the name of the person who said the quote
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";

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

        // Creating an image tag
        var personImage = $("<img>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        personImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(personImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  });
};


$(".gif").on("click", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});






genBtns();


} // window.onload