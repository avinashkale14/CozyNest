const User = require("../models/user");
const Listing = require("../models/listing");

// ===============================
// SHOW WISHLIST
// ===============================

module.exports.showWishlist = async (req, res) => {

    const user = await User.findById(req.user._id)
        .populate("wishlist");

    res.render("wishlist/index", {
        listings: user.wishlist
    });
};


// ===============================
// TOGGLE WISHLIST
// ===============================

module.exports.addToWishlist = async (req, res) => {

    try {

        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found!"
            });
        }

        const user = await User.findById(req.user._id);

        const index = user.wishlist.findIndex(
            item => item.equals(id)
        );


        // =========================
        // REMOVE
        // =========================

        if (index !== -1) {

            user.wishlist.splice(index, 1);

            await user.save();

            return res.json({
                success: true,
                isWishlisted: false
            });
        }


        // =========================
        // ADD
        // =========================

        user.wishlist.push(listing._id);

        await user.save();

        return res.json({
            success: true,
            isWishlisted: true
        });


    } catch (error) {

        console.log("WISHLIST TOGGLE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update wishlist."
        });
    }
};


// ===============================
// REMOVE FROM WISHLIST PAGE
// ===============================

module.exports.removeFromWishlist = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("REMOVE WISHLIST ID:", id);
        console.log("USER ID:", req.user._id);

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: {
                    wishlist: id
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Removed from wishlist."
        });

    } catch (error) {

        console.log("REMOVE WISHLIST ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};