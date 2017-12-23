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
    $("#buttons-view").append(btn);
  }
}

genBtns();


} // window.onload