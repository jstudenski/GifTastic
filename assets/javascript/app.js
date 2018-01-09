window.onload = function() {


var items = ["Cat", "Dog"];

// generate initial buttons
$.each(items, function( index, value ) {
  addBtn(value);
});

$("#plus-button").on("click", function(event) {
  event.preventDefault();
  var newItem = $("#btn-input").val().trim().toLowerCase();
  if (newItem !== '') {
    items.push(newItem);
    $("#btn-input").val('');
    addBtn(newItem);
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

  $("#btns").append(btn);
}

function removeButton() {
  var test = $(this).attr("parent-name");
  var index = items.indexOf(test);

  for(var i = items.length - 1; i >= 0; i--) {
    if(items[i] === test) {
      items.splice(i, 1);
    }
  }


  $("[data-name='"+test+"']").remove();
}


function ajaxRequest() {

  $('.item-btn').removeClass("active");
  $(this).addClass("active");
  var item = $(this).attr("data-name");

  $('#header').text(item);

  var limit = numberofGifs;
  var apikey = 'dc6zaTOxFJmzC'

  var queryURL = "https://api.giphy.com/v1/gifs/search"
    + "?q=" + item 
    + "&limit=" + limit
    + "&api_key=" + apikey;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var results = response.data;
    $("#gif-area").empty();

    for (var i = 0; i < results.length; i++) {

      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var p = $("<p>").text(results[i].rating);

        var itemGif = $("<img>");
        itemGif.attr({
          'data-state': 'still',
          src: results[i].images.fixed_width_still.url,
          'data-still': results[i].images.fixed_width_still.url,
          'data-animate': results[i].images.fixed_width.url
        }).click(animate);
      
        var gifDiv = $("<div>")
        gifDiv.addClass('grid-item');
        gifDiv.append(itemGif);
        gifDiv.append(p);
        $("#gif-area").prepend(gifDiv);

        // init Masonry after all images have loaded
        var $grid = $('.grid').imagesLoaded( function() {
          $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
          }); 
          $grid.masonry('reloadItems')
        });

      }
    }
  }); // ajax request
};


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

function rangeSlider() {
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