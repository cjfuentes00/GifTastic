$(document).ready(function() {


    // Array of characters
    var characters = [
      "Snow White", "Bart Simpson", "Peter Rabbit", "Daffy Duck", "Cinderella", "Mickey Mouse", "Peter Pan", "The Flinstones",
      "Tweety Bird", "The Jetsons",
    ];
  
    // This function adds the buttons to the page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();

    // For loop to run through the array
      for (var i = 0; i < arrayToUse.length; i++) {
        var newButton = $("<button>");
        newButton.addClass(classToAdd);
        newButton.attr("data-type", arrayToUse[i]);
        newButton.text(arrayToUse[i]);
        $(areaToAddTo).append(newButton);
      }
  
    }
    // Event listener for the buttons
    $(document).on("click", ".character-button", function() {
    
    // Clear the active gifs before displaying new ones 
      $("#characters").empty();
      $(".character-button").removeClass("active");

    // Activate the new gifs
      $(this).addClass("active");
  
    // Grab and store data value from the button
      var type = $(this).attr("data-type");

    // Giphy queryURL
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
     
    // AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

    // When data comes back from the request 
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var characterDiv = $("<div class=\"character-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            // Adjusts dimensions of gifs populated
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            // Variable that creates and stores the image
            var characterImage = $("<img>");

            // Sets attributes of the image
            characterImage.attr("src", still);
            characterImage.attr("data-still", still);
            characterImage.attr("data-animate", animated);
            characterImage.attr("data-state", "still");
            characterImage.addClass("character-image");
  
            // Appends elements
            characterDiv.append(p);
            characterDiv.append(characterImage);
  
            $("#characters").append(characterDiv);
          }
        });
    });
  
    // Event listener for gif animation 
    $(document).on("click", ".character-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-character").on("click", function(event) {
      event.preventDefault();
      var newCharacter = $("input").eq(0).val();
  
      if (newCharacter.length > 2) {
        characters.push(newCharacter);
      }
  
      populateButtons(characters, "character-button", "#character-buttons");
  
    });
  
    populateButtons(characters, "character-button", "#character-buttons");
  });
  