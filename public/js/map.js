window.addEventListener("load", () => {

    const sdk = window.maptilersdk;

    if (!sdk) {
        console.error("MapTiler SDK not loaded");
        return;
    }

    sdk.config.apiKey = window.mapToken;

    const map = new sdk.Map({
        container: "map",
        style: sdk.MapStyle.STREETS,
        center: window.listing.geometry.coordinates,
        zoom: 10,
    });

    new sdk.Marker({
        color: "#ff385c",
    })
        .setLngLat(window.listing.geometry.coordinates)
        .setPopup(
            new sdk.Popup({ offset: 25 }).setHTML(`
                <h5>${window.listing.title}</h5>
                <p>Exact location provided after booking.</p>
            `)
        )
        .addTo(map);
});