//Adds a new medication
$("#add-med").on("click", function (event) {
    event.preventDefault();

    // Form validation
    function validateForm() {
        var isValid = true;

        $(".form-control").each(function () {
            if ($(this).val() === "")
                isValid = false;
        });

        return isValid;
    }

    // If all required fields are filled
    if (validateForm() === true) {
        // Create an object for the user's data

        var newMed = {
            medName: $("#med_name2").val().trim(),
            drugClass: $("#drug_class2").val().trim(),
            medDesc: $("#med_desc2").val().trim(),
            dosage: $("#dosage2").val().trim(),
            frequency: $("#frequency2").val().trim(),
            quantity: $("#quantity2").val().trim(),
            doctor: $("#doctor2").val().trim(),
            drNumber: $("#doctor_number2").val().trim(),
            img: $("#file-upload").val().trim()

        };

    }

    else
    {

        alert("Please fill out all fields before submitting!");
    }

    console.log(newMed);

    clearContent();

    return false;

});