$( document ).ready(function() {


    $("#add-med").on("click", function (event) {
        event.preventDefault();

        var newMed = {
            medName: $("#med_name2").val().trim(),
            drugClass: $("#drug_class2").val().trim(),
            description: $("#med_desc2").val().trim(),
            dosage: $("#dosage2").val().trim(),
            frequency: $("#frequency2").val().trim(),
            quantity: $("#quantity2").val().trim(),
            img: $("#imgAdd").attr("src"),
            doctor_Name: $("#doctor2").val().trim(),
            phoneNumber: $("#doctor_number2").val().trim(),
        };
        console.log(newMed);

        // Send an AJAX POST-request with jQuery
        $.post("/api/new", newMed)
        // On success, run the following code
            .done(function(data) {
                // Log the data we found
                console.log(data);
            });

    });



});