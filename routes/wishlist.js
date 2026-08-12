const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlist");
const { isLoggedIn } = require("../middleware");

// Show wishlist
router.get(
    "/wishlist",
    isLoggedIn,
    wishlistController.showWishlist
);

// Add / Remove toggle
router.post(
    "/listings/:id/wishlist",
    isLoggedIn,
    wishlistController.addToWishlist
);

// Remove from wishlist page
router.delete(
    "/wishlist/:id",
    isLoggedIn,
    wishlistController.removeFromWishlist
);

module.exports = router;