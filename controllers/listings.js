const maptilerClient = require("@maptiler/client");

maptilerClient.config.apiKey = process.env.MAPTILER_KEY;

const Listing = require("../models/listing");

// ================== INDEX ==================
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// ================== NEW FORM ==================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// ================== SHOW ==================
module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        });

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show", {
    listing,
    mapToken: process.env.MAPTILER_KEY
    });
};
// ================== CREATE ==================
module.exports.createListing = async (req, res) => {

    const searchText = `${req.body.listing.location}, ${req.body.listing.country}`;

    const response = await maptilerClient.geocoding.forward(searchText, {
        limit: 1,
    });

    if (
        !response.features.length ||
        response.features[0].relevance < 0.8 ||
        response.features[0].place_type.includes("country")
    ) {
        req.flash("error", "Please enter a valid city or destination.");
        return res.redirect("/listings/new");
    }

    if (!req.file) {
        req.flash("error", "Please upload a listing image.");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.geometry = response.features[0].geometry;

    newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    return res.redirect("/listings");
};
// ================== EDIT FORM ==================
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// ================== UPDATE ==================
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    const searchText = `${req.body.listing.location}, ${req.body.listing.country}`;

    const response = await maptilerClient.geocoding.forward(searchText, {
        limit: 1,
    });

    if (
        !response.features.length ||
        response.features[0].relevance < 0.8 ||
        response.features[0].place_type.includes("country")
    ) {
        req.flash("error", "Please enter a valid city or destination.");
        return res.redirect(`/listings/${id}/edit`);
    }

    req.body.listing.geometry = response.features[0].geometry;

    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
    });

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    return res.redirect(`/listings/${id}`);
};

// ================== DELETE ==================
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    return res.redirect("/listings");  // ✅ RETURN
};