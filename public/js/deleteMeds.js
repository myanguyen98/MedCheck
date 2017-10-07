//Deletes medications
$("#deleteMed").on("click", function (event) {
    event.preventDefault();
    $("#myMeds").remove();

    var info = {
        id: $(this).attr("data-id")
    };
    $.post("/api/delete", info)
    // On success, run the following code
        .done(function (deldata) {
            // Log the data we found
            console.log(deldata);
            console.log("Deleted Successfully!");
        });

});
