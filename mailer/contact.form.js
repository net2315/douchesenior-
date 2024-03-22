(function ($) {
    "use strict";

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {},
        submitSuccess: function ($form, event) {
            event.preventDefault();
            
            var name = $("input#name").val();
            var email = $("input#email").val();
            var date = $("input#date").val();
            var message = $("textarea#message").val();
            var mobile = ($("input#mobile").length) ? $("input#mobile").val() : "noMobile";
            var statut = $('input[name="statut"]:checked').val();
            var logement = $('input[name="logement"]:checked').val();
            var address = $("input#address").val();

            $("#sendMessageButton").prop("disabled", true);
            $("#sendMessageButton span").text("Sending...");
            $("#sendMessageButton div").removeClass("d-none");

            $.ajax({
                url: "mailer/contact.form.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    mobile: mobile,
                    date: date,
                    message: message,
                    statut: statut,
                    logement: logement,
                    address: address
                },
                dataType: "json",
                cache: false,
                success: function (response) {
                    if (response.status === 'success') {
                        $('#alertMessage').html("<div class='alert alert-success alert-dismissible'>");
                        $('#alertMessage > .alert-success').html("<button type='button' class='btn-close' data-bs-dismiss='alert' aria-hidden='true'>").append("</button>");
                        $('#alertMessage > .alert-success').append("<strong>" + response.message + "</strong>");
                        $('#alertMessage > .alert-success').append('</div>');
                        $('#contactForm').trigger("reset");
                    } else {
                        $('#alertMessage').html("<div class='alert alert-danger alert-dismissible'>");
                        $('#alertMessage > .alert-danger').html("<button type='button' class='btn-close' data-bs-dismiss='alert' aria-hidden='true'>").append("</button>");
                        $('#alertMessage > .alert-danger').append("<strong>" + response.message + "</strong>");
                        $('#alertMessage > .alert-danger').append('</div>');
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    $('#alertMessage').html("<div class='alert alert-danger alert-dismissible'>");
                    $('#alertMessage > .alert-danger').html("<button type='button' class='btn-close' data-bs-dismiss='alert' aria-hidden='true'>").append("</button>");
                    $('#alertMessage > .alert-danger').append("<strong>Ajax Error: " + errorThrown + "</strong>");
                    $('#alertMessage > .alert-danger').append('</div>');
                },
                complete: function () {
                    $("#sendMessageButton").prop("disabled", false);
                    $("#sendMessageButton span").text("Send Message");
                    $("#sendMessageButton div").addClass("d-none");
                }
            });
        },
    });

    $('#name, #email, #subject, #message').focus(function () {
        $('#alertMessage').html('');
    });
    
})(jQuery);