$( document ).ready(function() {


    $("#clear-content").on("click", function (event) {

        event.preventDefault();

        $("#med_name2").val("");
        $("#drug_class2").val("");
        $("#med_desc2").val("");
        $("#dosage2").val("");
        $("#frequency2").val("");
        $("#quantity2").val("");
        $("#doctor2").val("");
        $("#doctor_number2").val("");

    });

});