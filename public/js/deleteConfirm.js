const deleteForms = document.querySelectorAll(".delete-form");

deleteForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        Swal.fire({
            title: "Delete Listing?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff385c",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        });
    });
});



/* Cancel Booking Confirmation */

const cancelForms = document.querySelectorAll(".cancel-booking-form");

cancelForms.forEach((form) => {
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to cancel this booking?",
            text: "This booking will be cancelled permanently.",
            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#ff385c",
            cancelButtonColor: "#6c757d",

            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "Keep Booking"

        }).then((result) => {

            if (result.isConfirmed) {

                form.submit();

            }

        });

    });
});