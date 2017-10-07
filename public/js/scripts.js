//=======================Global Functions=================================
//    Modal Function

//initialize all modals
$('.modal').modal();
//or by click on trigger
$('.modal-trigger').modal();


//  nav  color
$(".nav-wrapper").css("background-color", "#19B5BA");
//     Card Color links
$(".card .card-action a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating)").css("color", "#19B5BA");

//=======================Home Page Functions================================
//    scroll function
var $root = $('html, body');

$('a[href^="#about"]').click(function () {
    $root.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
});
//=====================User Page Functions================================

//Clears form box when adding new medications
function clearContent() {

        $("#med_name2").val("");
        $("#drug_class2").val("");
        $("#med_desc2").val("");
        $("#dosage2").val("");
        $("#frequency2").val("");
        $("#quantity2").val("");
        $("#doctor2").val("");
        $("#doctor_number2").val("");

}

$("#clear-content").on("click", function (event) {

    event.preventDefault();

    clearContent();

});

//Modal Popo at beginning
$('.modal').modal();

$(window).on('load', function () {
    $('#alertModal').modal('open');
});


//Hides edit button
$("#save-change").hide();
$("#edit-image").hide();


$("#edit").on("click", function (event) {
    event.preventDefault();
    $("#save-change").show();
    $(".userMed").prop('disabled', false);
    $("#edit-image").show();

});

$("#save-change").on("click", function (event) {
    event.preventDefault();
    $("#save-change").hide();
    $(".userMed").prop('disabled', true);
    $("#edit-image").hide();
});

//Deletes medications
$("#deleteMed").on("click", function (event) {
    event.preventDefault();
    $("#myMeds").remove();

    var meds = {
        id: $(this).attr("data-id")
    };
    $.post("/api/delete", meds)
    // On success, run the following code
        .done(function (deldata) {
            // Log the data we found
            console.log(deldata);
            console.log("Deleted Successfully!");
        });

});


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
            medName: $("#med_name2").val(),
            drugClass: $("#drug_class2").val(),
            medDesc: $("#med_desc2").val(),
            dosage: $("#dosage2").val(),
            frequency: $("#frequency2").val(),
            quantity: $("#quantity2").val(),
            img: $("#imgAdd").attr("src"),
            doctor: $("#doctor2").val(),
            drNumber: $("#doctor_number2").val()


        };


        // AJAX post the data to the friends API.
        $.post("/api/meds", newMed, function (data) {

            console.log("Success");

            console.log(data);

        });

    }

    else
    {

        $('#fill-out').modal('open');
    }

    console.log(newMed);

    clearContent();

    return false;

});

//Uploads information to CLoudinary
var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alrod909/upload";
var CLOUDINARY_UPLOAD_PRESET = 'dov1tdtx';

var imgPreview = document.getElementById('img-preview');
var fileUpload = document.getElementById('file-upload');

$("#file-upload").on('click', function (event) {

    event.preventDefault();

    var file = event.target.files[0];
    var formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        data: formData
    }).then(function (res) {

        console.log(res);

        imgPreview.src = res.data.secure_url;


    }).catch(function (error) {

        console.error(error);

    });


// GET route for getting all of the todos
    $.get("/api/meds", function(req, res) {

        db.meds.findAll({}).then(function(results) {


            console.log(results[0]);

            for(var i = 0; i < results.length; i++)
            {

                res.json(addTables(results[i], i));


            }

        });

    });

    

});


function runWaitListQuery() {

      // Here we get the location of the root page.
      // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
      var currentURL = window.location.origin;

      // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
      $.ajax({ url: currentURL + "/api/meds", method: "GET" })
      .done(function(data) {

        // Here we are logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + currentURL + "/api/waitlist");
        console.log("------------------------------------");

        // Here we then log the NYTData to console, where it will show up as an object.
        console.log(data);
        console.log("------------------------------------");


        function addTables(data) {

        $("#myMeds").prepend("<div class='row'>" +
            " <ul class=\"collapsible\" data-collapsible=\"accordion\">" +
            "<li>" +
            "<div class=\"collapsible-header\">" +
            "<ul class=\"collection\">" +
            "<li class=\"collection-item avatar\">" +
            "<i class=\"material-icons circle\">local_pharmacy</i>" +
            "<span class=\"title\"><h5>Medication</h5></span>" +
            "<p>click to expand info <br>" +
            "</p>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "<div class=\"collapsible-body\">" +
            "<form method=\"post\" class=\"col s12\">" +
            "<br>" +
            "<div class=\"row\">" +
            "<div class=\"input-field col s6\">" +
            "<input disabled value=\"\"\n" +
            "    id=\"disabled med_name\" type=\"text\" class=\"userMed validate\">" +
            "<label for=\"med_name\"> Medication: " + data.name + " </label>" +
            "</div>" +
            "<div class=\"input-field col s6\">" +
            "<input disabled value=\"\" id=\"disabled drug_class\"\n" +
            "    type=\"text\" class=\"userMed validate\">" +
            "<label for=\"drug_class\">Drug Class: " + data.drugClass + " </label>" +
            "</div>" +
            "</div>" +
            "<div class=\"row\">" +
            "<div class=\"input-field col s12\">" +
            "<textarea disabled value=\"\" id=\"disabled med_desc\" class=\"userMed materialize-textarea\"></textarea>" +
            "<label for=\"med_desc\">Description of medication</label>" +
            "</div>" +
            "</div>" +
            "<br>" +
            "<div class=\"row\">" +
            "<div class=\"input-field col s4\">" +
            "<input disabled value=\"\" id=\"disabled dosage\" type=\"text\"\n" +
            "class=\"userMed validate\">" +
            "<label for=\"dosage\">Dosage</label>" +
            "</div>" +
            "<div class=\"input-field col s4\">" +
            "<input disabled value=\"\" id=\"disabled frequency\"\n" +
            "    type=\"text\" class=\"userMed validate\">" +
            "<label for=\"frequency\">Frequency Taken</label>" +
            "</div>" +
            "<div class=\"input-field col s4\">" +
            "<input disabled value=\"\" id=\"disabled quantity\" type=\"text\"\n" +
            "class=\"userMed validate\">" +
            "<label for=\"quantity\">Quantity Left</label>" +
            "</div>" +
            "</div>" +
            "<br>" +
            "<div class=\"row\">" +
            "<div class=\"input-field col s6\">" +
            "<input disabled value=\"\" id=\"disabled doctor\"\n" +
            "    type=\"text\" class=\"userMed validate\">" +
            "<label for=\"doctor\">Prescribing Doctor</label>" +
            " </div>" +
            "<div class=\"input-field col s6\">\n" +
            "        <input disabled value=\"\" id=\"disabled doctor_number\"\n" +
            "    type=\"text\" class=\"userMed validate\">" +
            "<label for=\"doctor_number\">Prescribing Doctor's Phone #</label>" +
            "</div>" +
            "</div>" +
            "<div class=\"row\">" +
            "<div class=\"input field col s6\">" +
            "<div class=\"card\">" +
            "<img src=\"http://res.cloudinary.com/alrod909/image/upload/v1507102377/sample.jpg\"\n" +
            "\n" +
            "class=\"img-preview\"/>" +
            "<label class=\"file-upload-container\" for=\"file-upload-myMedications\">" +
            "<input id=\"file-upload-myMedications\" type=\"file\" style=\"display:none;\">" +
            "<a id=\"edit-image\" class=\"waves-effect waves-light btn\">Select\n" +
            "    an Image</a>" +
            "</label>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class=\"row\">" +
            "<div class=\"col s2\">" +
            " <a class=\"waves-effect waves-light btn\" id=\"edit\"><i class=\"material-icons left\">create</i>Edit</a>" +
            "</div>");
    }

        // Loop through and display each of the customers
        for (var i = 0; i < data.length; i++) {

            addTables(data);

          }
      });
    }


runWaitListQuery();






