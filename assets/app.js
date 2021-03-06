

// xS8h9aOPfqsHYLTuMLkfWqRpVyIatYTS

$("document").ready(function () {


    var holidays = ["National Dog Day", "Pi Day", "President's Day", "National Cat Day", "May the 4th", "Mother's Day", "Father's Day", "National Pizza Day", "St. Patrick's Day", "Memorial Day"]

    var createButtons = function () {
        $("#button-display").empty();
        $("#holiday-input").val("");
        for (var i = 0; i < holidays.length; i++) {
            var holidaysBtn = $("<button>");
            holidaysBtn.addClass("button");
            holidaysBtn.attr("data-holiday", holidays[i]);
            holidaysBtn.html(holidays[i]);
            $("#button-display").append(holidaysBtn);
        }
    }

    $("#add-holiday").on("click", function (event) {
        event.preventDefault();
        var holidayInput = $("#holiday-input").val().trim();
        if (holidayInput !== ""){
        holidays.push(holidayInput);
        createButtons();
        }
    });

    createButtons();


        $(document).on("click", "button", function() {
            $("img").remove();
            $("p").remove();
            console.log($(this).attr("data-holiday"))
            var holiday = $(this).attr("data-holiday");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                holiday + "&api_key=xS8h9aOPfqsHYLTuMLkfWqRpVyIatYTS&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='flex-wrap d-inline-flex' >");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating.toUpperCase());
                    var holidayImageStill = results[i].images.fixed_height_still.url;
                    var holidayImageAnimate = results[i].images.fixed_height.url;
                    var imageDisplay = $("<img>");
                    imageDisplay.addClass("image").attr({ "src": holidayImageStill, "data-url": holidayImageAnimate });
                    gifDiv.append(p);
                    p.append(imageDisplay)
                    $("#gif-display").prepend(gifDiv);
                }

                $(".image").on("click", function() {
                    console.log($(this).attr("data-url"))
                    var still = $(this).attr("src");
                    var animate = $(this).attr("data-url");
                    $(this).attr({ "src": animate, "data-url": still })

                })
                

            })
        })

})

