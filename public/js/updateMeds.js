$(document).ready(function () {


    $(".delete").click(function () {
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

});