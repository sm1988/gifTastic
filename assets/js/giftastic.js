var cars = ["Nissan Leaf", "Tesla Model 3", "BMW i3", "Toyota Prius", "Honda Clarity", "Audi e-tron",
    "Porsche Panamera", "Porsche Taycan", "Jaguar I-PACE", "KIA Niro", "Chevrolet Bolt", "Ford Fusion", "Hyundai Ioniq", "Subaru Crosstrek"];


for (var i = 0; i < cars.length; i++) {
    var gifButton = $("<button>");
    gifButton.addClass("btn btn-danger")
    gifButton.text(cars[i])

    $("#buttons").append(gifButton);
}

function gifsDisplay(){
$("button").on("click", function () {
    var car = $(this).text()

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=A0cY4bdVOWuDxB8ujHiR4if8xfVDdiAu&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        $("#gifs-appear-here").empty();
        for (var i = 0; i < results.length; i++) {
            var carDiv = $("<div>");
            var stillImage = results[i].images.fixed_height_still.url;
            var animateImage = results[i].images.fixed_height.url;
            var carImage = $("<img>");
            carImage.attr("src", stillImage);
            carImage.attr("data-state", "still")
            carImage.attr("data-animate", animateImage)
            carImage.attr("data-still", stillImage)
            carImage.css("margin", "10px")

            carDiv.append(carImage);

            $("#gifs-appear-here").append(carDiv);

            carImage.on("click", function () {
                var state = $(this).attr("data-state")
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        }
    })
});
}

gifsDisplay()

function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < cars.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-danger car-btn")
        newButton.attr("data-name", cars[i]);
        newButton.text(cars[i]);
        $("#buttons").append(newButton);
    }
}

$("#add-car").on("click", function (event) {
    event.preventDefault();
    var newcar = $("#car-input").val().trim();
    cars.push(newcar);

    renderButtons();
    gifsDisplay()
});