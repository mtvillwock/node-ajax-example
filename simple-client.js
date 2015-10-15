console.log("sanity check, JS script is loaded in client browser");
$(document).ready(function() {
    // use jQuery to select the HTML element with class 'notes-container'
    // listen for a submit event; fire addNote callback when one occurs
    $('.todo-container').on('submit', function(e) {
        console.log(this);
        var formData = $(this).serialize();

        $.ajax({
            url: '/todos',
            type: 'post',
            data: formData
        })
            .done(function(response) {
                $('.todo-container').append(response);
            });
            .fail(function(response) {
                console.log("fail :", response);
            });
    });
});