var medsTable = $("#myMeds");

// Form validation
function validateForm() {
    var isValid = true;

    $(".form-control").each(function () {
        if ($(this).val() === "")
            isValid = false;
    });

    return isValid;
}

//Hides edit button
function editMedsButton() {

    // Function for handling what happens when the delete button is pressed
    var listItemData = $(this).attr("id");

    listItemData = listItemData.replace("edit", "");

    console.log(listItemData);

    $("#save-change" + listItemData).show();
    $(".userMed" + listItemData).prop('disabled', false);
    $("#edit-image" + listItemData).show();

}


//Deletes medications
function deleteMeds() {

    // Function for handling what happens when the delete button is pressed
    var listItemData = $(this).attr("id");

    listItemData = listItemData.replace("deleteMed", "");

    console.log(listItemData);

    $.ajax({
        method: "DELETE",
        url: "/api/meds/" + listItemData
    })
        .done(getMeds);

}

//Clears form box when adding new medications
function clearContent() {

    $("#med_name").val("");
    $("#drug_class").val("");
    $("#med_desc").val("");
    $("#dosage").val("");
    $("#frequency").val("");
    $("#quantity").val("");
    $("#doctor").val("");
    $("#doctor_number").val("");

}


//Adds a new medication
function addMeds() {

    // If all required fields are filled
    if (validateForm === true) {
        // Create an object for the user's data

        var newMed = {
            medName: $("#med_name").val(),
            drugClass: $("#drug_class").val(),
            medDesc: $("#med_desc").val(),
            dosage: $("#dosage").val(),
            frequency: $("#frequency").val(),
            quantity: $("#quantity").val(),
            img: $("#imgAdd").attr("src"),
            doctor: $("#doctor").val(),
            drNumber: $("#doctor_number").val()


        };


        // AJAX post the data to the friends API.
        $.post("/api/meds", newMed, function (data) {

            console.log("Success");

            console.log(data);

        });

    }

    else {

        $('#fill-out').modal('open');
    }

    console.log(newMed);

    clearContent();

    return false;

}

// Update a given post, bring user to the blog page when done
function updateMeds() {

    // Function for handling what happens when the delete button is pressed
    var listItemData = $(this).attr("id");

    listItemData = listItemData.replace("save-change", "");

    var updatedMeds = {
        medName: $("#med_name" + listItemData).val(),
        drugClass: $("#drug_class" + listItemData).val(),
        medDesc: $("#med_desc" + listItemData).val(),
        dosage: $("#dosage" + listItemData).val(),
        frequency: $("#frequency" + listItemData).val(),
        quantity: $("#quantity" + listItemData).val(),
        img: $("#imgAdd" + listItemData).attr("src"),
        doctor: $("#doctor" + listItemData).val(),
        drNumber: $("#doctor_number" + listItemData).val()
    };


    $.ajax({
        method: "PUT",
        url: "api/meds",
        data: updatedMeds
    }).done(getMeds).catch(function (error) {

        console.log(error);

    })

}


function uploadMedsCloudinary() {

    //Uploads information to CLoudinary
    var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alrod909/upload";
    var CLOUDINARY_UPLOAD_PRESET = 'dov1tdtx';

    var imgPreview = document.getElementById('img-preview');
    var fileUpload = document.getElementById('file-upload');


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

}


// A function for rendering the list of authors to the page
function renderMeds(rows) {

    medsTable.children().not(":last").remove();

    if (rows.length) {

        medsTable.prepend(rows);
    }

}


function addTables(medsData) {


    var newMeds = $("<div id=" + medsData.id + ">");

    newMeds.data("meds", medsData);

    newMeds.append("<div class='row'> <ul class=\"collapsible\" data-collapsible=\"accordion\">" + "<li>" +
        "<div class=\"collapsible-header\">" + "<ul class=\"collection\">" + "<li class=\"collection-item avatar\">" +
        "<i class=\"material-icons circle\">local_pharmacy</i>" +
        "<span class=\"title\"><h5>Medication: " + medsData.name + "</h5></span> <p>click to expand info<br>" + "</p>" + "</li>" + "</ul>" + "</div>" +
        "<div class=\"collapsible-body\">" + "<form method=\"GET\" class=\"col s12\">" + "<br>" +
        "<div class=\"row\">" + "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.name + "\" id=\"med_name" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"med_name" + medsData.id + "\">Medication</label>" + "</div>" + "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.drugClass + "\" id=\"drug_class" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"drug_class" + medsData.id + "\">Drug Class</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" + "<div class=\"input-field col s12\">" +
        "<textarea disabled id=\"med_desc" + medsData.id + "\" class=\"userMed materialize-textarea\"></textarea>" +
        "<label for=\"med_desc" + medsData.id + "\">Description of medication</label>" + "</div>" + "</div>" + "<br>" +
        "<div class=\"row\">" + "<div class=\"input-field col s4\">" +
        "<input disabled value=\"" + medsData.dosage + "\" id=\"dosage" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"dosage" + medsData.id + "\">Dosage</label>" + "</div>" +
        "<div class=\"input-field col s4\">" +
        "<input disabled value=\"" + medsData.frequency + "\" id=\"frequency" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"frequency" + medsData.id + "\">Frequency Taken</label>" + "</div>" +
        "<div class=\"input-field col s4\">" +
        "<input disabled value=\"" + medsData.quantity + "\" id=\"quantity" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"quantity" + medsData.id + "\">Quantity Left</label>" + "</div>" + "</div>" + "<br>" +
        "<div class=\"row\">" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.doctor_Name + "\" id=\"doctor" + medsData.id + "\" type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"doctor" + medsData.id + "\">Prescribing Doctor</label>" + "</div>" +
        "<div class=\"input-field col s6\">" +
        "<input disabled value=\"" + medsData.phoneNumber + "\" id=\"doctor_number" + medsData.id + "\"" + "type=\"text\" class=\"userMed" + medsData.id + "\" validate\">" +
        "<label for=\"doctor_number" + medsData.id + "\">Prescribing Doctor's Phone #</label>" + "</div>" + "</div>" +
        "<div class=\"row\">" + "<div class=\"input field col s6\">" + "<div class=\"card\">" +
        "<img src=\"" + medsData.img + "\" class=\"img-preview\"/>" +
        "<label class=\"file-upload-container\" for=\"file-upload-myMedications" + medsData.id + "\">" +
        "<input class= \"uploadButton\" id=\"file-upload-myMedications" + medsData.id + "\" type=\"file\">" +
        "<a id=\"edit-image" + medsData.id + "\" class=\"waves-effect waves-light btn uploadBtn2\">Select an Image</a>" + "</label>" +
        "</div>" + "</div>" + "</div>" +
        "<div class=\"row\">" +
        "<div class=\"col s2\">" +
        "<a class=\"waves-effect waves-light btn-large editBtn\" id=\"edit" + medsData.id + "\">" +
        "<i class=\"material-icons left\">create</i>Edit</a>" + "</div>" +
        "<div class=\"col s2\">" +
        "<button type=\"submit\" class=\"waves-effect waves-light btn-large save\" id=\"save-change" + medsData.id + "\">" +
        "<i class=\"material-icons left\">save</i>Save</button>" + "</div>" +
        "<div class=\"col s2\">" +
        "<a id=\"deleteMed" + medsData.id + "\" class=\"waves-effect waves-light btn-large deleteMed\">" +
        "<i class=\"material-icons left\">delete_forever</i>Del</a></div></div></form>\n" +
        "                    </div>\n" +
        "                </li>\n" +
        "            </ul>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>");

    return newMeds;

}


function getMeds() {

    // Here we get the location of the root page.
    // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
    var currentURL = window.location.origin;

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({url: "/api/meds", method: "GET"})
        .done(function (data) {

            var meds = [];

            // Here we are logging the URL so we have access to it for troubleshooting
            console.log("URL: " + currentURL + "/api/meds");
            console.log("------------------------------------");
            console.log(data);

            // Loop through and display each of the customers
            for (var i = 0; i < data.length; i++) {

                meds.push(addTables(data[i]));

            }

            renderMeds(meds);

        }).catch(function (error) {

        console.error(error);

    });


    setTimeout(hideButtons, 500);

    function hideButtons() {

        $(".save").hide();
        $(".uploadBtn2").hide();

    }

}


export { validateForm, editMedsButton, clearContent, getMeds,
addTables, addMeds, updateMeds, deleteMeds, renderMeds, uploadMedsCloudinary};

