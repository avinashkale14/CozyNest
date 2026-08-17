// =====================================================
// BOOTSTRAP FORM VALIDATION
// =====================================================

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



// =====================================================
// WISHLIST TOGGLE
// =====================================================

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



// =====================================================
// REMOVE FROM WISHLIST PAGE
// =====================================================

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



// =====================================================
// BOOKING DATE LOGIC
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm =
        document.getElementById("booking-form");

    if (!bookingForm) return;


    const checkIn =
        document.getElementById("checkIn");

    const checkOut =
        document.getElementById("checkOut");

    if (!checkIn || !checkOut) return;



    // =================================================
    // GET TODAY
    // =================================================

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;



    // =================================================
    // CHECK-IN MINIMUM = TODAY
    // CHECK-OUT MINIMUM = TODAY
    // =================================================

    checkIn.min = todayString;

    checkOut.min = todayString;



    // =================================================
    // MOBILE DATE PLACEHOLDER
    // =================================================

    const isMobile =
        window.matchMedia("(max-width: 767px)").matches;


    function setMobilePlaceholder(input) {

        if (!isMobile) return;


        // Already has selected date
        if (input.value) return;


        // Change to text so placeholder can be displayed
        input.type = "text";

        input.placeholder = "mm/dd/yyyy";

    }


    function activateDateInput(input) {

        if (!isMobile) return;

        input.type = "date";

        input.placeholder = "";

    }


    // Initial mobile state

    setMobilePlaceholder(checkIn);

    setMobilePlaceholder(checkOut);



    // =================================================
    // CHECK-IN FOCUS
    // =================================================

    checkIn.addEventListener("focus", function () {

        activateDateInput(this);

    });



    // =================================================
    // CHECK-OUT FOCUS
    // =================================================

    checkOut.addEventListener("focus", function () {

        activateDateInput(this);

    });



    // =================================================
    // CHECK-IN CHANGE
    // =================================================

    checkIn.addEventListener("change", function () {

        if (!this.value) {

            setMobilePlaceholder(this);

            return;

        }


        // Convert selected check-in date
        const checkInDate =
            new Date(this.value + "T00:00:00");


        // Checkout MUST be at least next day
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


        // Set minimum checkout
        checkOut.min =
            minimumCheckoutDate;



        // =================================================
        // CLEAR OLD CHECKOUT DATE
        // =================================================

        if (
            checkOut.value &&
            checkOut.value < minimumCheckoutDate
        ) {

            checkOut.value = "";

            // On mobile show placeholder again
            setMobilePlaceholder(checkOut);

        }

    });



    // =================================================
    // CHECK-OUT CHANGE
    // =================================================

    checkOut.addEventListener("change", function () {

        if (!this.value) {

            setMobilePlaceholder(this);

            return;

        }


        // Checkout cannot be same or before check-in

        if (
            checkIn.value &&
            this.value <= checkIn.value
        ) {

            alert(
                "Check-out date must be after check-in date."
            );


            // Clear invalid checkout
            this.value = "";


            // Show placeholder again
            setMobilePlaceholder(this);

        }

    });



    // =================================================
    // CHECK-IN BLUR
    // =================================================

    checkIn.addEventListener("blur", function () {

        if (!this.value) {

            setMobilePlaceholder(this);

        }

    });



    // =================================================
    // CHECK-OUT BLUR
    // =================================================

    checkOut.addEventListener("blur", function () {

        if (!this.value) {

            setMobilePlaceholder(this);

        }

    });



    // =================================================
    // FORM SUBMIT
    // =================================================

    bookingForm.addEventListener("submit", function (event) {

        // Check empty fields

        if (!checkIn.value || !checkOut.value) {

            event.preventDefault();

            this.reportValidity();

            return;

        }


        // Checkout must be AFTER check-in

        if (checkOut.value <= checkIn.value) {

            event.preventDefault();

            alert(
                "Check-out date must be after check-in date."
            );

            checkOut.value = "";

            setMobilePlaceholder(checkOut);

            return;

        }

    });

});