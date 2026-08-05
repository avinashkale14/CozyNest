const data = [
    {
  title: "Riverside Camping at Rishikesh Camping",
  description: "A peaceful riverside camping experience with tents, bonfire, and adventure activities like rafting and trekking.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777638982/cozynest_DEV/yljotobsrpuwcfuswp1w.jpg",
    filename: "cozynest_DEV/yljotobsrpuwcfuswp1w"
  },
  price: 1800,
  location: "Rishikesh, Uttarakhand",
  country: "India",
  category: "camping",
  geometry: {
    type: "Point",
    coordinates: [78.2676, 30.0869]
  }
},

{
  title: "Royal Stay at Neemrana Fort Palace",
  description: "A historic fort converted into a hotel, offering royal rooms, heritage architecture, and scenic views.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639064/cozynest_DEV/j5ibus2hbgho1uww65l2.jpg",
    filename: "cozynest_DEV/j5ibus2hbgho1uww65l2"
  },
  price: 3999,
  location: "Neemrana, Rajasthan",
  country: "India",
  category: "castles",
  geometry: {
    type: "Point",
    coordinates: [76.3975, 27.9885]
  }
},

{
  title: "The Oberoi Udaivilas",
  description: "A grand luxury resort with Mughal-inspired architecture, lake views, private pools, and world-class service.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1785740599/cozynest_DEV/iwwaolsyxbok5inndpre_g5bcz2.jpg",
    filename: "cozynest_DEV/iwwaolsyxbok5inndpre_g5bcz2"
  },
  price: 2500,
  location: "Udaipur, Rajasthan",
  country: "India",
  category: "amazing-pools",
  geometry: {
    type: "Point",
    coordinates: [73.6833, 24.5854]
  }
},

{
  title: "Backwater Stay at Kerala Houseboat",
  description: "A unique stay on a traditional houseboat offering scenic backwater views, comfortable rooms, and peaceful surroundings.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639344/cozynest_DEV/qpk9mgjac5xnqqucp1wy.jpg",
    filename: "cozynest_DEV/qpk9mgjac5xnqqucp1wy"
  },
  price: 4500,
  location: "Alleppey, Kerala",
  country: "India",
  category: "boats",
  geometry: {
    type: "Point",
    coordinates: [76.3388, 9.4981]
  }
},

{
  title: "The Peninsula Beijing",
  description: "A historic luxury hotel with all-suite rooms, blending traditional Chinese style with modern comfort and top-class service.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777640092/cozynest_DEV/mdpvklubyp8nuhl3jjav.jpg",
    filename: "cozynest_DEV/mdpvklubyp8nuhl3jjav"
  },
  price: 25000,
  location: "Beijing",
  country: "China",
  category: "iconic-cities",
  geometry: {
    type: "Point",
    coordinates: [116.4074, 39.9042]
  }
},

{
  title: "Four Seasons Hotel George V",
  description: "One of the most luxurious hotels in Paris, known for elegant interiors, Michelin-star dining, and top-tier service.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639785/cozynest_DEV/bgazgd9drnjpul9s6bam.jpg",
    filename: "cozynest_DEV/bgazgd9drnjpul9s6bam"
  },
  price: 25500,
  location: "Paris",
  country: "France",
  category: "iconic-cities",
  geometry: {
    type: "Point",
    coordinates: [2.3522, 48.8566]
  }
},

{
  title: "Coorgie-Home",
  description: "Definitly a wonderful place",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777638539/cozynest_DEV/eitx7zhuq5gpmypr9zmb.jpg",
    filename: "cozynest_DEV/eitx7zhuq5gpmypr9zmb"
  },
  price: 1800,
  location: "Coorg, Karnataka",
  country: "India",
  category: "farms",
  geometry: {
    type: "Point",
    coordinates: [75.8069, 12.3375]
  }
},

{
  title: "Luxury Mountain Retreat",
  description: "A breathtaking luxury resort located in the Himalayan mountains, this heritage property offers a perfect blend of nature and comfort. Surrounded by cedar forests and situated at a high altitude, the resort provides stunning panoramic views of valleys and snow-capped peaks.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777638920/cozynest_DEV/ijk3rgh0uxk9y0e2yori.jpg",
    filename: "cozynest_DEV/ijk3rgh0uxk9y0e2yori"
  },
  price: 4200,
  location: "Shimla, Himachal Pradesh",
  country: "India",
  category: "mountains",
  geometry: {
    type: "Point",
    coordinates: [77.1734, 31.1048]
  }
},

{
  title: "Luxury Stay at The Taj Mahal Palace",
  description: "A famous luxury hotel offering elegant rooms, modern amenities, and excellent service, located near the Gateway of India.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639177/cozynest_DEV/hlxbgnr9s7sywsqbkzqy.jpg",
    filename: "cozynest_DEV/hlxbgnr9s7sywsqbkzqy"
  },
  price: 4998,
  location: "Mumbai, Maharashtra",
  country: "India",
  category: "rooms",
  geometry: {
    type: "Point",
    coordinates: [72.8347, 18.9217]
  }
},

{
  title: "Kumarakom Lake Resort",
  description: "A serene backwater resort known for traditional Kerala-style villas, spa treatments, and scenic lake views.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777638676/cozynest_DEV/yau4xmrtez5x62hf7lch.jpg",
    filename: "cozynest_DEV/yau4xmrtez5x62hf7lch"
  },
  price: 4000,
  location: "Kumarakom, Kerala",
  country: "India",
  category: "trending",
  geometry: {
    type: "Point",
    coordinates: [76.4305, 9.6175]
  }
},

{
  title: "Infinity Pool Paradise",
  description: "Enjoy a luxurious stay at this world-famous Red Sea resort, known for its breathtaking infinity pools overlooking crystal-clear waters. The resort offers elegant rooms, private beach access, fine dining, and relaxing spa services. Guests can experience snorkeling, diving, and stunning sunset views right from the poolside. Perfect for travelers looking for comfort, luxury, and unforgettable views, this resort is one of the top destinations in Egypt.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639884/cozynest_DEV/ferfi8ptkefwsb9lnpek.jpg",
    filename: "cozynest_DEV/ferfi8ptkefwsb9lnpek"
  },
  price: 10000,
  location: "Sharm El Sheikh",
  country: "Egypt",
  category: "iconic-cities",
  geometry: {
    type: "Point",
    coordinates: [34.3299, 27.9158]
  }
},

{
  title: "Modern Stay at Lotte Hotel Seoul",
  description: "A luxury city hotel offering stylish rooms, modern amenities, and easy access to major attractions in Seoul.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639502/cozynest_DEV/yavhhkqkuiyjod2dygly.jpg",
    filename: "cozynest_DEV/yavhhkqkuiyjod2dygly"
  },
  price: 8000,
  location: "Seoul",
  country: "South Korea",
  category: "iconic-cities",
  geometry: {
    type: "Point",
    coordinates: [126.9780, 37.5665]
  }
},

{
  title: "Amangiri",
  description: "A luxury desert resort surrounded by dramatic canyons, known for its minimalist design, privacy, and breathtaking landscapes.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1785740591/cozynest_DEV/amangiri_q4ezrp.jpg",
    filename: "cozynest_DEV/amangiri_q4ezrp"
  },
  price: 20500,
  location: "Utah",
  country: "United States",
  category: "trending",
  geometry: {
    type: "Point",
    coordinates: [-111.3751, 37.0486]
  }
},

{
  title: "Dome Stay at White Desert Bhunga Villas",
  description: "Traditional dome-shaped huts offering a cultural stay experience with modern comfort in a desert setting.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639255/cozynest_DEV/bzwf7xghsycrxjnibcxl.jpg",
    filename: "cozynest_DEV/bzwf7xghsycrxjnibcxl"
  },
  price: 3899,
  location: "Dhordo, Kutch, Gujarat",
  country: "India",
  category: "domes",
  geometry: {
    type: "Point",
    coordinates: [70.5290, 23.8377]
  }
},

{
  title: "Hotel de Glace",
  description: "A unique ice hotel rebuilt every winter, featuring rooms made entirely of snow and ice, with artistic sculptures and a magical Arctic atmosphere.",
  image: {
    url: "https://res.cloudinary.com/dgmcj6n4h/image/upload/v1777639601/cozynest_DEV/nuldtmsgw5fo6jy7dmre.jpg",
    filename: "cozynest_DEV/nuldtmsgw5fo6jy7dmre"
  },
  price: 10500,
  location: "Quebec City, Quebec",
  country: "Canada",
  category: "domes",
  geometry: {
    type: "Point",
    coordinates: [-71.2075, 46.8139]
  }
},

];

module.exports = { data };