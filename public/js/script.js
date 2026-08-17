// BOOTSTRAP FORM VALIDATION

(() => {
    'use strict';

    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach(form => {

        form.addEventListener("submit", event => {

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add("was-validated");

        }, false);

    });

})();


// WISHLIST TOGGLE

document.querySelectorAll(".wishlist-form").forEach(form => {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const button = this.querySelector(".wishlist-btn");
        const icon = button.querySelector("i");

        try {

            const response = await fetch(this.action, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Unable to update wishlist."
                );
            }

            if (data.isWishlisted) {

                button.classList.add("active");

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                button.title = "Remove from wishlist";

            } else {

                button.classList.remove("active");

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                button.title = "Add to wishlist";

            }

        } catch (error) {

            console.error("Wishlist error:", error);

            alert(error.message);

        }

    });

});


// REMOVE FROM WISHLIST PAGE

document.querySelectorAll(".remove-wishlist-form").forEach(form => {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const id = this.dataset.id;
        const card = this.closest(".wishlist-card");

        try {

            const response = await fetch(`/wishlist/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            console.log("REMOVE RESPONSE:", data);

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Unable to remove from wishlist."
                );
            }

            if (card) {
                card.remove();
            }

            const remainingCards =
                document.querySelectorAll(".wishlist-card");

            if (remainingCards.length === 0) {
                window.location.reload();
            }

        } catch (error) {

            console.error("Remove wishlist error:", error);

            alert(error.message);

        }

    });

});


// =========================================
// BOOKING DATE + MOBILE DATE PLACEHOLDER
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");

    // If booking form is not available, stop
    if (!checkIn || !checkOut) return;


    // =========================================
    // DATE PLACEHOLDER
    // =========================================

    function updatePlaceholder(input) {

        const placeholder =
            input.parentElement.querySelector(".date-placeholder");

        if (!placeholder) return;

        if (input.value) {

            placeholder.style.display = "none";

        } else {

            placeholder.style.display = "block";

        }

    }


    // Initial placeholder state
    updatePlaceholder(checkIn);
    updatePlaceholder(checkOut);


    // =========================================
    // TODAY'S DATE
    // =========================================

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;


    // Check-in cannot be before today
    checkIn.min = todayString;

    // Checkout cannot be before today
    checkOut.min = todayString;


    // =========================================
    // CHECK-IN CHANGE
    // =========================================

    checkIn.addEventListener("change", function () {

        updatePlaceholder(this);

        if (!this.value) return;


        // Convert selected check-in date
        const checkInDate =
            new Date(
                this.value + "T00:00:00"
            );


        // Checkout must be NEXT DAY or later
        checkInDate.setDate(
            checkInDate.getDate() + 1
        );


        const nextYear =
            checkInDate.getFullYear();


        const nextMonth =
            String(
                checkInDate.getMonth() + 1
            ).padStart(2, "0");


        const nextDay =
            String(
                checkInDate.getDate()
            ).padStart(2, "0");


        const minimumCheckoutDate =
            `${nextYear}-${nextMonth}-${nextDay}`;


        // Set minimum checkout date
        checkOut.min =
            minimumCheckoutDate;


        // =====================================
        // CLEAR INVALID CHECKOUT
        // =====================================

        if (
            checkOut.value &&
            checkOut.value < minimumCheckoutDate
        ) {

            // Clear old checkout date
            checkOut.value = "";

            // Show placeholder again
            updatePlaceholder(checkOut);

        }

    });


    // =========================================
    // CHECKOUT CHANGE
    // =========================================

    checkOut.addEventListener("change", function () {

        updatePlaceholder(this);

        if (!checkIn.value || !this.value) return;


        // Checkout must be AFTER check-in
        if (this.value <= checkIn.value) {

            alert(
                "Check-out date must be after check-in date."
            );

            // Clear invalid checkout
            this.value = "";

            // Show placeholder again
            updatePlaceholder(this);

        }

    });


    // =========================================
    // BOOKING FORM SUBMIT
    // =========================================

    const bookingForm =
        document.getElementById("booking-form");


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                // HTML required validation
                if (!bookingForm.checkValidity()) {

                    event.preventDefault();

                    bookingForm.reportValidity();

                    return;

                }


                // Extra safety:
                // checkout must be after check-in
                if (
                    checkIn.value &&
                    checkOut.value &&
                    checkOut.value <= checkIn.value
                ) {

                    event.preventDefault();

                    alert(
                        "Check-out date must be after check-in date."
                    );

                    checkOut.value = "";

                    // Show placeholder again
                    updatePlaceholder(checkOut);

                }

            }
        );

    }

});