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