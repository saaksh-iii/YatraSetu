document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("planner-form");
  const cityInput = document.getElementById("city");
  const interestSelect = document.getElementById("interest");
  const budgetInput = document.getElementById("budget");
  const tripDurationSelect = document.getElementById("trip-duration");
  const soloModeToggle = document.getElementById("solo-mode");

  const aiInsightEl = document.getElementById("ai-insight");
  const weatherInfoEl = document.getElementById("weather-info");
  const tripSummaryEl = document.getElementById("trip-summary");
  const recommendationsEl = document.getElementById("recommendations");
  const safetyPanel = document.getElementById("safety-panel");
  const cityMapSection = document.getElementById("city-map-section");
  const guidesSection = document.getElementById("guides-section");
  const staysSection = document.getElementById("stays-section");
  const shareLocationBtn = document.getElementById("share-location-btn");
  const locationDisplay = document.getElementById("location-display");
  const coordinatesText = document.getElementById("coordinates-text");
  const mapsLink = document.getElementById("maps-link");
  const cityMap = document.getElementById("city-map");
  const guidesContainer = document.getElementById("guides-container");
  const staysContainer = document.getElementById("stays-container");

  // Static dataset for Rajasthan-focused tourism intelligence
  const places = [
    // Jaipur
    {
      name: "Amber Fort & Palace",
      city: "Jaipur",
      interest: "History",
      budget: 1500,
      crowdLevel: "High",
      bestTimeToVisit: "October to March, early mornings",
      timeOfDay: "Morning",
      budgetCategory: "₹₹",
      transport: "Auto, Bus, Taxi",
      travelTime: "30–40 mins from city center",
      description:
        "Iconic hilltop fort with Rajput architecture, light & sound shows, and panoramic views over Jaipur.",
    },
    {
      name: "City Palace & Jantar Mantar",
      city: "Jaipur",
      interest: "Culture",
      budget: 1800,
      crowdLevel: "Medium",
      bestTimeToVisit: "October to March",
      timeOfDay: "Morning",
      budgetCategory: "₹₹",
      transport: "Auto, Taxi, Walking",
      travelTime: "10–15 mins from city center",
      description:
        "Blend of Mughal and Rajasthani culture, royal museum, and UNESCO-listed astronomical observatory.",
    },
    {
      name: "Nahargarh Fort Sunset Point",
      city: "Jaipur",
      interest: "Nature",
      budget: 1200,
      crowdLevel: "Medium",
      bestTimeToVisit: "October to March, sunset hours",
      timeOfDay: "Sunset",
      budgetCategory: "₹₹",
      transport: "Auto, Taxi",
      travelTime: "25–35 mins from city center",
      description:
        "Hilltop fort offering sunset views over the Pink City, cafes, and a relaxed evening vibe.",
    },

    // Udaipur
    {
      name: "Lake Pichola & City Palace",
      city: "Udaipur",
      interest: "Culture",
      budget: 2500,
      crowdLevel: "High",
      bestTimeToVisit: "September to March, golden hour",
      timeOfDay: "Evening",
      budgetCategory: "₹₹₹",
      transport: "Auto, Taxi, Walking",
      travelTime: "5–10 mins from city center",
      description:
        "Boat rides on Lake Pichola with views of palaces, ghats, and the romantic old city of Udaipur.",
    },
    {
      name: "Fateh Sagar Lake Promenade",
      city: "Udaipur",
      interest: "Nature",
      budget: 1000,
      crowdLevel: "Medium",
      bestTimeToVisit: "October to February, evenings",
      timeOfDay: "Evening",
      budgetCategory: "₹",
      transport: "Auto, Taxi, Bus",
      travelTime: "15–20 mins from city center",
      description:
        "Scenic lakeside boulevard ideal for slow walks, light snacks, and calm sunset views.",
    },
    {
      name: "Eklingji & Nearby Temples",
      city: "Udaipur",
      interest: "Spiritual",
      budget: 800,
      crowdLevel: "Low",
      bestTimeToVisit: "October to March, early mornings",
      timeOfDay: "Morning",
      budgetCategory: "₹",
      transport: "Auto, Taxi",
      travelTime: "20–25 mins from city center",
      description:
        "Cluster of ancient temples north of Udaipur, known for serene spiritual ambience and stone carvings.",
    },

    // Jodhpur
    {
      name: "Mehrangarh Fort & Blue City View",
      city: "Jodhpur",
      interest: "History",
      budget: 2000,
      crowdLevel: "Medium",
      bestTimeToVisit: "November to February, mornings",
      description:
        "Massive hilltop fort with museums and sweeping views of Jodhpur’s blue houses.",
    },
    {
      name: "Old City Heritage Walk",
      city: "Jodhpur",
      interest: "Culture",
      budget: 1200,
      crowdLevel: "High",
      bestTimeToVisit: "November to February",
      timeOfDay: "Morning",
      budgetCategory: "₹₹",
      transport: "Walking, Auto",
      travelTime: "5–10 mins from city center",
      description:
        "Narrow lanes, stepwells, local eateries, and markets showcasing everyday Marwari culture.",
    },

    // Jaisalmer
    {
      name: "Sam Sand Dunes Desert Camp",
      city: "Jaisalmer",
      interest: "Adventure",
      budget: 3500,
      crowdLevel: "High",
      bestTimeToVisit: "November to February, evenings",
      timeOfDay: "Evening",
      budgetCategory: "₹₹₹",
      transport: "Taxi, Jeep Safari",
      travelTime: "40–50 mins from city center",
      description:
        "Camel rides, dune bashing, and cultural nights in the Thar Desert near Jaisalmer.",
    },
    {
      name: "Jaisalmer Fort & Havelis",
      city: "Jaisalmer",
      interest: "History",
      budget: 1700,
      crowdLevel: "Medium",
      bestTimeToVisit: "November to February",
      timeOfDay: "Morning",
      budgetCategory: "₹₹",
      transport: "Walking, Auto",
      travelTime: "5–10 mins from city center",
      description:
        "Living sandstone fort with intricately carved havelis, Jain temples, and rooftop cafes.",
    },

    // Pushkar
    {
      name: "Pushkar Lake Ghats",
      city: "Pushkar",
      interest: "Spiritual",
      budget: 900,
      crowdLevel: "Medium",
      bestTimeToVisit: "October to March, sunrise & sunset",
      timeOfDay: "Morning",
      budgetCategory: "₹",
      transport: "Walking, Auto",
      travelTime: "5 mins from city center",
      description:
        "Holy lake surrounded by ghats and temples, ideal for peaceful walks and rituals.",
    },
    {
      name: "Savitri Mata Temple Trek",
      city: "Pushkar",
      interest: "Adventure",
      budget: 700,
      crowdLevel: "Low",
      bestTimeToVisit: "October to February, sunrise",
      timeOfDay: "Morning",
      budgetCategory: "₹",
      transport: "Walking, Ropeway",
      travelTime: "15–20 mins from city center",
      description:
        "Short hike or ropeway ride to a hilltop temple with panoramic views of Pushkar and desert landscapes.",
    },

    // Mount Abu
    {
      name: "Nakki Lake & Sunset Point",
      city: "Mount Abu",
      interest: "Nature",
      budget: 1800,
      crowdLevel: "Medium",
      bestTimeToVisit: "October to March, evenings",
      timeOfDay: "Evening",
      budgetCategory: "₹₹",
      transport: "Auto, Taxi, Walking",
      travelTime: "10–15 mins from city center",
      description:
        "Hill-station lake with boating, surrounding hills, and famous sunset viewpoints.",
    },
    {
      name: "Dilwara Jain Temples",
      city: "Mount Abu",
      interest: "Spiritual",
      budget: 1300,
      crowdLevel: "Low",
      bestTimeToVisit: "October to March, daytime",
      timeOfDay: "Morning",
      budgetCategory: "₹₹",
      transport: "Auto, Taxi",
      travelTime: "5–10 mins from city center",
      description:
        "Marble temples renowned for delicate carvings and peaceful spiritual ambience.",
    },

    // Ranthambore
    {
      name: "Ranthambore Tiger Safari",
      city: "Ranthambore",
      interest: "Wildlife",
      budget: 4500,
      crowdLevel: "High",
      bestTimeToVisit: "October to April, early morning",
      timeOfDay: "Morning",
      budgetCategory: "₹₹₹",
      transport: "Safari Jeep, Taxi",
      travelTime: "10–15 mins from city center",
      description:
        "Guided safari through Ranthambore National Park with chances to spot tigers and rich wildlife.",
    },
    {
      name: "Ranthambore Fort & Ganesh Temple",
      city: "Ranthambore",
      interest: "History",
      budget: 1200,
      crowdLevel: "Medium",
      bestTimeToVisit: "October to March, mornings",
      timeOfDay: "Morning",
      budgetCategory: "₹₹",
      transport: "Auto, Taxi, Walking",
      travelTime: "15–20 mins from city center",
      description:
        "Historic hilltop fort with forest views, ancient ruins, and a popular Ganesh temple.",
    },
  ];

  // City Seasonal Data
  const citySeasonData = {
    Jaipur: {
      bestSeason: "November–February",
      avoidMonths: "May–June afternoons",
      climateNote: "Summers are extremely hot, plan early morning visits. Winters are pleasant and ideal for sightseeing.",
    },
    Udaipur: {
      bestSeason: "September–March",
      avoidMonths: "May–June",
      climateNote: "Moderate climate year-round. Monsoons bring lush greenery. Winters are perfect for boat rides.",
    },
    Jodhpur: {
      bestSeason: "October–March",
      avoidMonths: "May–July",
      climateNote: "Desert climate with hot summers. Winters are cool and comfortable for exploring the blue city.",
    },
    Jaisalmer: {
      bestSeason: "November–February",
      avoidMonths: "May–September",
      climateNote: "Extreme desert heat in summer. Winters are ideal for desert camps and camel safaris.",
    },
    Pushkar: {
      bestSeason: "October–March",
      avoidMonths: "May–June",
      climateNote: "Desert climate. Best visited during Pushkar Fair (November) or cooler winter months.",
    },
    "Mount Abu": {
      bestSeason: "October–March",
      avoidMonths: "July–August (monsoon)",
      climateNote: "Hill station with cooler climate. Summers are pleasant, winters can be chilly. Avoid monsoon season.",
    },
    Ranthambore: {
      bestSeason: "October–April",
      avoidMonths: "July–September (monsoon)",
      climateNote: "Best wildlife viewing in winter and early summer. Monsoon season closes safari zones.",
    },
  };

  // Local Experiences Dataset
  const localExperiences = {
    Jaipur: [
      {
        name: "Street Food Walk in Old City",
        city: "Jaipur",
        description: "Explore authentic Rajasthani street food including pyaaz kachori, ghewar, and lassi in the bustling lanes of Pink City.",
        cost: "₹300-500 per person",
      },
      {
        name: "Block Printing Workshop",
        city: "Jaipur",
        description: "Learn traditional Rajasthani block printing techniques from local artisans. Create your own textile piece.",
        cost: "₹800-1200 per person",
      },
      {
        name: "Folk Dance Night at Chokhi Dhani",
        city: "Jaipur",
        description: "Experience vibrant Rajasthani folk dances, puppet shows, and traditional music in a cultural village setting.",
        cost: "₹1500-2000 per person",
      },
    ],
    Udaipur: [
      {
        name: "Cooking Class: Rajasthani Thali",
        city: "Udaipur",
        description: "Learn to cook authentic Rajasthani dishes including dal baati churma, gatte ki sabzi, and ker sangri.",
        cost: "₹1200-1500 per person",
      },
      {
        name: "Sunset Boat Ride on Lake Pichola",
        city: "Udaipur",
        description: "Romantic boat ride during golden hour with views of City Palace and Jag Mandir. Includes cultural performance.",
        cost: "₹600-800 per person",
      },
      {
        name: "Miniature Painting Workshop",
        city: "Udaipur",
        description: "Hands-on workshop learning the intricate art of Rajasthani miniature painting with local artists.",
        cost: "₹1000-1500 per person",
      },
    ],
    Jodhpur: [
      {
        name: "Blue City Heritage Walk",
        city: "Jodhpur",
        description: "Guided walk through the blue-painted lanes of old Jodhpur, visiting stepwells, temples, and local markets.",
        cost: "₹500-700 per person",
      },
      {
        name: "Traditional Marwari Cooking Experience",
        city: "Jodhpur",
        description: "Cook and enjoy traditional Marwari vegetarian cuisine in a local home setting.",
        cost: "₹1000-1300 per person",
      },
    ],
    Jaisalmer: [
      {
        name: "Desert Camel Safari",
        city: "Jaisalmer",
        description: "Sunset camel ride through Thar Desert dunes followed by traditional dinner and folk music under the stars.",
        cost: "₹1500-2500 per person",
      },
      {
        name: "Desert Camp Cultural Night",
        city: "Jaisalmer",
        description: "Evening of Rajasthani folk music, dance performances, and traditional dinner at a desert camp.",
        cost: "₹2000-3000 per person",
      },
      {
        name: "Jaisalmer Fort Heritage Walk",
        city: "Jaisalmer",
        description: "Explore the living fort with its havelis, Jain temples, and learn about the history from local guides.",
        cost: "₹400-600 per person",
      },
    ],
    Pushkar: [
      {
        name: "Sunrise Aarti at Pushkar Lake",
        city: "Pushkar",
        description: "Participate in the sacred morning aarti ceremony at Pushkar Lake, a spiritual experience.",
        cost: "Free (donations welcome)",
      },
      {
        name: "Camel Fair Experience",
        city: "Pushkar",
        description: "During November fair: witness camel trading, cultural performances, and traditional competitions.",
        cost: "₹500-800 per person",
      },
    ],
    "Mount Abu": [
      {
        name: "Nakki Lake Boating",
        city: "Mount Abu",
        description: "Peaceful boat ride on Nakki Lake surrounded by hills. Best during sunset hours.",
        cost: "₹200-300 per person",
      },
      {
        name: "Sunset Point Trek",
        city: "Mount Abu",
        description: "Short trek to famous sunset viewpoints with panoramic views of the Aravalli hills.",
        cost: "₹100-200 per person",
      },
    ],
    Ranthambore: [
      {
        name: "Wildlife Photography Tour",
        city: "Ranthambore",
        description: "Guided photography tour focusing on capturing tigers, birds, and other wildlife in their natural habitat.",
        cost: "₹5000-8000 per person",
      },
      {
        name: "Nature Walk Around Fort",
        city: "Ranthambore",
        description: "Guided nature walk exploring the fort area, spotting birds and learning about local flora.",
        cost: "₹300-500 per person",
      },
    ],
  };

  // Local Guides Dataset
  const guides = {
    Jaipur: [
      {
        name: "Rajesh Kumar",
        specialty: "History",
        languages: ["Hindi", "English"],
        pricePerHour: 800,
      },
      {
        name: "Priya Sharma",
        specialty: "Food",
        languages: ["Hindi", "English", "Rajasthani"],
        pricePerHour: 600,
      },
      {
        name: "Amit Singh",
        specialty: "Photography",
        languages: ["Hindi", "English"],
        pricePerHour: 1000,
      },
    ],
    Udaipur: [
      {
        name: "Vikram Meena",
        specialty: "Culture",
        languages: ["Hindi", "English"],
        pricePerHour: 750,
      },
      {
        name: "Sunita Devi",
        specialty: "Spiritual tours",
        languages: ["Hindi", "English"],
        pricePerHour: 650,
      },
    ],
    Jodhpur: [
      {
        name: "Mahesh Rathore",
        specialty: "History",
        languages: ["Hindi", "English", "Marwari"],
        pricePerHour: 700,
      },
      {
        name: "Kavita Solanki",
        specialty: "Food",
        languages: ["Hindi", "English"],
        pricePerHour: 550,
      },
    ],
    Jaisalmer: [
      {
        name: "Bhanwar Singh",
        specialty: "Adventure",
        languages: ["Hindi", "English"],
        pricePerHour: 900,
      },
      {
        name: "Lakshmi Kumari",
        specialty: "Culture",
        languages: ["Hindi", "English", "Rajasthani"],
        pricePerHour: 700,
      },
    ],
    Pushkar: [
      {
        name: "Gopal Das",
        specialty: "Spiritual tours",
        languages: ["Hindi", "English"],
        pricePerHour: 600,
      },
    ],
    "Mount Abu": [
      {
        name: "Ramesh Patel",
        specialty: "Nature",
        languages: ["Hindi", "English", "Gujarati"],
        pricePerHour: 750,
      },
    ],
    Ranthambore: [
      {
        name: "Devendra Yadav",
        specialty: "Wildlife",
        languages: ["Hindi", "English"],
        pricePerHour: 1200,
      },
    ],
  };

  // Nearby Stays Dataset
  const stays = {
    Jaipur: [
      {
        name: "Backpacker's Hostel",
        type: "Hostel",
        priceRange: "₹500-800/night",
        description: "Budget-friendly hostel in the heart of Pink City, perfect for solo travelers.",
      },
      {
        name: "Heritage Hotel Rajputana",
        type: "Hotel",
        priceRange: "₹2000-3500/night",
        description: "Mid-range hotel with traditional Rajasthani architecture and modern amenities.",
      },
      {
        name: "Rambagh Palace",
        type: "Resort",
        priceRange: "₹8000-15000/night",
        description: "Luxury heritage palace hotel offering royal experience and world-class service.",
      },
    ],
    Udaipur: [
      {
        name: "Lakeview Hostel",
        type: "Hostel",
        priceRange: "₹600-900/night",
        description: "Affordable hostel with lake views, ideal for backpackers and solo travelers.",
      },
      {
        name: "Jagat Niwas Palace",
        type: "Hotel",
        priceRange: "₹2500-4000/night",
        description: "Heritage hotel overlooking Lake Pichola with traditional decor and comfort.",
      },
      {
        name: "Taj Lake Palace",
        type: "Resort",
        priceRange: "₹12000-25000/night",
        description: "Iconic floating palace hotel offering unparalleled luxury and romance.",
      },
    ],
    Jodhpur: [
      {
        name: "Blue City Hostel",
        type: "Hostel",
        priceRange: "₹500-750/night",
        description: "Budget stay in the blue city, close to Mehrangarh Fort and markets.",
      },
      {
        name: "Raas Jodhpur",
        type: "Hotel",
        priceRange: "₹3000-5000/night",
        description: "Boutique hotel with modern amenities and stunning fort views.",
      },
    ],
    Jaisalmer: [
      {
        name: "Desert Camp Stay",
        type: "Hostel",
        priceRange: "₹800-1200/night",
        description: "Unique desert camp experience with traditional tents and cultural activities.",
      },
      {
        name: "Jaisalmer Fort Hotel",
        type: "Hotel",
        priceRange: "₹2000-3500/night",
        description: "Hotel within the fort walls offering authentic desert city experience.",
      },
    ],
    Pushkar: [
      {
        name: "Spiritual Retreat Hostel",
        type: "Hostel",
        priceRange: "₹400-700/night",
        description: "Peaceful hostel near the lake, perfect for spiritual seekers.",
      },
      {
        name: "Pushkar Lake Resort",
        type: "Resort",
        priceRange: "₹3000-5000/night",
        description: "Comfortable resort with lake views and traditional hospitality.",
      },
    ],
    "Mount Abu": [
      {
        name: "Hill Station Hostel",
        type: "Hostel",
        priceRange: "₹600-900/night",
        description: "Budget-friendly stay in the cool hills of Mount Abu.",
      },
      {
        name: "Connaught House",
        type: "Hotel",
        priceRange: "₹2500-4000/night",
        description: "Heritage hotel with colonial charm and modern facilities.",
      },
    ],
    Ranthambore: [
      {
        name: "Safari Lodge",
        type: "Hotel",
        priceRange: "₹4000-7000/night",
        description: "Wildlife-focused hotel near the national park with safari packages.",
      },
      {
        name: "Tiger Den Resort",
        type: "Resort",
        priceRange: "₹6000-12000/night",
        description: "Premium resort offering luxury safari experiences and wildlife viewing.",
      },
    ],
  };

  // City coordinates for map embedding
  const cityCoordinates = {
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Udaipur: { lat: 24.5854, lng: 73.7125 },
    Jodhpur: { lat: 26.2389, lng: 73.0243 },
    Jaisalmer: { lat: 26.9157, lng: 70.9083 },
    Pushkar: { lat: 26.4897, lng: 74.5518 },
    "Mount Abu": { lat: 24.5925, lng: 72.7156 },
    Ranthambore: { lat: 26.0172, lng: 76.5025 },
  };

  const weatherSamples = [
    "Current Weather: Sunny, 28°C",
    "Current Weather: Clear skies, 25°C",
    "Current Weather: Warm and dry, 30°C",
    "Current Weather: Pleasant breeze, 24°C",
    "Current Weather: Mild haze, 27°C",
  ];

  function chooseRandomWeather() {
    const idx = Math.floor(Math.random() * weatherSamples.length);
    return weatherSamples[idx];
  }

  function summarizeTravelTime(tripDuration) {
    switch (tripDuration) {
      case "2 Hours":
        return "Quick visit - perfect for a single focused experience.";
      case "Half Day":
        return "Half-day exploration - ideal for 2–3 key attractions.";
      case "Full Day":
        return "Full day itinerary - packed schedule with 3–4 experiences.";
      case "2–3 Days":
        return "Multi-day trip - relaxed pace with time for exploration and rest.";
      default:
        return "";
    }
  }

  function getTripDurationLimit(tripDuration) {
    switch (tripDuration) {
      case "2 Hours":
        return 1;
      case "Half Day":
        return 2;
      case "Full Day":
        return 4;
      case "2–3 Days":
        return Infinity;
      default:
        return Infinity;
    }
  }

  function buildAIInsight({ city, interest, budget, tripDuration, matches, isSolo }) {
    const capitalizedCity = city
      ? city.charAt(0).toUpperCase() + city.slice(1)
      : "Rajasthan";
    const lowestCost = Math.min(...matches.map((m) => m.budget));
    const highestCost = Math.max(...matches.map((m) => m.budget));

    const base = `Based on your budget of ₹${budget.toLocaleString(
      "en-IN"
    )} and interest in ${interest.toLowerCase()}, ${
      matches.length === 1 ? "one strong match" : "multiple strong matches"
    } were found around ${capitalizedCity}.`;

    const lowCrowd = matches.some((m) => m.crowdLevel === "Low");
    const highCrowd = matches.some((m) => m.crowdLevel === "High");

    let crowdSentence = "";
    if (lowCrowd && !highCrowd) {
      crowdSentence = "Low crowd locations identified for a peaceful experience.";
    } else if (lowCrowd && highCrowd) {
      crowdSentence =
        "A mix of calm and high-energy spots is available—pick based on your comfort with crowds.";
    } else if (highCrowd) {
      crowdSentence =
        "Most options are popular and may be crowded during peak hours.";
    } else {
      crowdSentence = "Moderate crowd levels expected at most locations.";
    }

    const durationSentence = summarizeTravelTime(tripDuration);

    const costBand =
      lowestCost === highestCost
        ? `Typical experiences start around ₹${lowestCost.toLocaleString(
            "en-IN"
          )}.`
        : `Experiences typically range between ₹${lowestCost.toLocaleString(
            "en-IN"
          )} and ₹${highestCost.toLocaleString("en-IN")}.`;

    const soloNote = isSolo
      ? " Solo Traveler Mode is active - low-crowd options are prioritized."
      : "";

    return `${base} ${crowdSentence} ${durationSentence} ${costBand}${soloNote}`;
  }

  function getBudgetCategory(budget) {
    if (budget < 1000) return "₹";
    if (budget < 2500) return "₹₹";
    return "₹₹₹";
  }

  function clearRecommendations() {
    recommendationsEl.innerHTML = "";
  }

  function renderEmptyState(message) {
    clearRecommendations();
    const p = document.createElement("p");
    p.className = "empty-state";
    p.textContent = message;
    recommendationsEl.appendChild(p);
  }

  function renderRecommendations(matches, isSolo = false) {
    clearRecommendations();

    matches.forEach((place) => {
      const card = document.createElement("article");
      card.className = "place-card";

      const primary = document.createElement("div");
      primary.className = "place-primary";

      const nameRow = document.createElement("div");
      nameRow.className = "place-name-row";

      const nameEl = document.createElement("h3");
      nameEl.className = "place-name";
      nameEl.textContent = place.name;

      const pillEl = document.createElement("span");
      pillEl.className = "pill";
      pillEl.textContent = place.interest;

      nameRow.appendChild(nameEl);
      nameRow.appendChild(pillEl);

      // Add time badge
      if (place.timeOfDay) {
        const timeBadge = document.createElement("span");
        timeBadge.className = "time-badge";
        timeBadge.textContent = place.timeOfDay;
        nameRow.appendChild(timeBadge);
      }

      // Add budget category badge
      if (place.budgetCategory) {
        const budgetBadge = document.createElement("span");
        budgetBadge.className = "budget-badge";
        budgetBadge.textContent = place.budgetCategory;
        nameRow.appendChild(budgetBadge);
      }

      // Add solo badges
      if (isSolo) {
        if (place.crowdLevel === "Low") {
          const soloBadge = document.createElement("span");
          soloBadge.className = "solo-badge";
          soloBadge.textContent = "Safer for solo visit";
          nameRow.appendChild(soloBadge);
        } else if (place.crowdLevel === "High") {
          const crowdedBadge = document.createElement("span");
          crowdedBadge.className = "crowded-badge";
          crowdedBadge.textContent = "Popular but crowded";
          nameRow.appendChild(crowdedBadge);
        }
      }

      const metaEl = document.createElement("p");
      metaEl.className = "place-meta";
      metaEl.textContent = `${place.city} • ${place.bestTimeToVisit}`;

      const descEl = document.createElement("p");
      descEl.className = "place-description";
      descEl.textContent = place.description;

      primary.appendChild(nameRow);
      primary.appendChild(metaEl);
      primary.appendChild(descEl);

      // Add transport info
      if (place.transport && place.travelTime) {
        const transportInfo = document.createElement("div");
        transportInfo.className = "transport-info";

        const transportRow = document.createElement("p");
        transportRow.className = "transport-row";
        transportRow.innerHTML = `<span class="transport-icon">🚕</span> <strong>How to reach:</strong> ${place.transport}`;

        const travelTimeRow = document.createElement("p");
        travelTimeRow.className = "transport-row";
        travelTimeRow.innerHTML = `<span class="transport-icon">🕒</span> <strong>Travel time:</strong> ${place.travelTime}`;

        transportInfo.appendChild(transportRow);
        transportInfo.appendChild(travelTimeRow);
        primary.appendChild(transportInfo);
      }

      // Add View on Map button
      const mapBtn = document.createElement("a");
      mapBtn.href = `https://www.google.com/maps/search/${encodeURIComponent(place.name + " " + place.city)}`;
      mapBtn.target = "_blank";
      mapBtn.className = "view-map-btn";
      mapBtn.textContent = "View on Map";
      primary.appendChild(mapBtn);

      const secondary = document.createElement("div");
      secondary.className = "place-secondary";

      const statRow = document.createElement("div");
      statRow.className = "stat-row";

      const costLabel = document.createElement("span");
      costLabel.className = "stat-label";
      costLabel.textContent = "Estimated cost";

      const costValue = document.createElement("span");
      costValue.textContent = `₹${place.budget.toLocaleString("en-IN")}`;

      statRow.appendChild(costLabel);
      statRow.appendChild(costValue);

      const crowdRow = document.createElement("div");
      crowdRow.className = "crowd-row";

      const crowdBadge = document.createElement("span");
      crowdBadge.className = `crowd-badge ${place.crowdLevel.toLowerCase()}`;
      crowdBadge.textContent = `${place.crowdLevel} crowd`;

      crowdRow.appendChild(crowdBadge);

      if (place.crowdLevel === "High") {
        const alert = document.createElement("span");
        alert.className = "crowd-alert";
        alert.textContent = "⚠ High crowd expected";
        crowdRow.appendChild(alert);
      }

      secondary.appendChild(statRow);
      secondary.appendChild(crowdRow);

      card.appendChild(primary);
      card.appendChild(secondary);

      recommendationsEl.appendChild(card);
    });
  }

  function renderGuides(cityName) {
    const cityGuides = guides[cityName] || [];
    guidesContainer.innerHTML = "";

    if (cityGuides.length === 0) {
      guidesSection.style.display = "none";
      return;
    }

    guidesSection.style.display = "block";

    cityGuides.forEach((guide) => {
      const card = document.createElement("div");
      card.className = "guide-card";

      const nameEl = document.createElement("h4");
      nameEl.className = "guide-name";
      nameEl.textContent = guide.name;

      const specialtyEl = document.createElement("p");
      specialtyEl.className = "guide-specialty";
      specialtyEl.textContent = guide.specialty;

      const languagesEl = document.createElement("p");
      languagesEl.className = "guide-languages";
      languagesEl.textContent = `Languages: ${guide.languages.join(", ")}`;

      const priceEl = document.createElement("p");
      priceEl.className = "guide-price";
      priceEl.textContent = `₹${guide.pricePerHour}/hour`;

      const contactBtn = document.createElement("button");
      contactBtn.className = "contact-guide-btn";
      contactBtn.textContent = "Contact Guide";
      contactBtn.onclick = () => {
        alert(`Contact feature is a demo placeholder. In a real app, this would connect you with ${guide.name}.`);
      };

      card.appendChild(nameEl);
      card.appendChild(specialtyEl);
      card.appendChild(languagesEl);
      card.appendChild(priceEl);
      card.appendChild(contactBtn);

      guidesContainer.appendChild(card);
    });
  }

  function renderStays(cityName) {
    const cityStays = stays[cityName] || [];
    staysContainer.innerHTML = "";

    if (cityStays.length === 0) {
      staysSection.style.display = "none";
      return;
    }

    staysSection.style.display = "block";

    cityStays.forEach((stay) => {
      const card = document.createElement("div");
      card.className = "stay-card";

      const nameEl = document.createElement("h4");
      nameEl.className = "stay-name";
      nameEl.textContent = stay.name;

      const typeEl = document.createElement("p");
      typeEl.className = "stay-type";
      typeEl.textContent = stay.type;

      const priceEl = document.createElement("p");
      priceEl.className = "stay-price";
      priceEl.textContent = stay.priceRange;

      const descEl = document.createElement("p");
      descEl.className = "stay-description";
      descEl.textContent = stay.description;

      card.appendChild(nameEl);
      card.appendChild(typeEl);
      card.appendChild(priceEl);
      card.appendChild(descEl);

      staysContainer.appendChild(card);
    });
  }

  function renderCityMap(cityName) {
    const coords = cityCoordinates[cityName];
    if (!coords) {
      cityMapSection.style.display = "none";
      return;
    }

    cityMapSection.style.display = "block";
    // Using Google Maps embed with search query (no API key needed for basic embed)
    cityMap.src = `https://www.google.com/maps?q=${encodeURIComponent(cityName + ", Rajasthan, India")}&output=embed&zoom=12`;
  }

  function shareLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    shareLocationBtn.textContent = "Getting location...";
    shareLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        coordinatesText.textContent = `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        mapsLink.href = `https://www.google.com/maps?q=${lat},${lng}`;
        locationDisplay.style.display = "block";

        shareLocationBtn.textContent = "Share My Live Location";
        shareLocationBtn.disabled = false;
      },
      (error) => {
        let message = "Unable to retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Location access denied. Please enable location permissions in your browser settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          message = "Location request timed out.";
        }
        alert(message);
        shareLocationBtn.textContent = "Share My Live Location";
        shareLocationBtn.disabled = false;
      }
    );
  }

  function renderSeasonalInsight(cityName) {
    const seasonalInsightEl = document.getElementById("seasonal-insight");
    const seasonalContentEl = document.getElementById("seasonal-content");

    // Try to find exact match first, then try partial match
    let seasonData = citySeasonData[cityName];
    if (!seasonData) {
      // Try to find by partial match
      const cityKey = Object.keys(citySeasonData).find(
        (key) => key.toLowerCase() === cityName.toLowerCase()
      );
      if (cityKey) {
        seasonData = citySeasonData[cityKey];
      }
    }

    if (!seasonData) {
      seasonalInsightEl.style.display = "none";
      return;
    }

    seasonalInsightEl.style.display = "block";
    seasonalContentEl.innerHTML = `
      <div class="seasonal-item">
        <strong>Best season:</strong> ${seasonData.bestSeason}
      </div>
      <div class="seasonal-item">
        <strong>Avoid:</strong> ${seasonData.avoidMonths}
      </div>
      <div class="seasonal-note">
        ${seasonData.climateNote}
      </div>
    `;
  }

  function renderLocalExperiences(cityName) {
    const localExperiencesSection = document.getElementById("local-experiences-section");
    const localExperiencesContainer = document.getElementById("local-experiences-container");

    // Try to find exact match first, then try partial match
    let experiences = localExperiences[cityName];
    if (!experiences) {
      const cityKey = Object.keys(localExperiences).find(
        (key) => key.toLowerCase() === cityName.toLowerCase()
      );
      if (cityKey) {
        experiences = localExperiences[cityKey];
      }
    }

    // If no city match, show general Rajasthan experiences
    if (!experiences || experiences.length === 0) {
      // Combine all experiences as general Rajasthan experiences
      experiences = [];
      Object.values(localExperiences).forEach((cityExps) => {
        experiences.push(...cityExps.slice(0, 1)); // Take one from each city
      });
    }

    if (experiences.length === 0) {
      localExperiencesSection.style.display = "none";
      return;
    }

    localExperiencesSection.style.display = "block";
    localExperiencesContainer.innerHTML = "";

    experiences.forEach((experience) => {
      const card = document.createElement("div");
      card.className = "experience-card";

      const nameEl = document.createElement("h4");
      nameEl.className = "experience-name";
      nameEl.textContent = experience.name;

      const cityEl = document.createElement("p");
      cityEl.className = "experience-city";
      cityEl.textContent = experience.city;

      const descEl = document.createElement("p");
      descEl.className = "experience-description";
      descEl.textContent = experience.description;

      const costEl = document.createElement("p");
      costEl.className = "experience-cost";
      costEl.textContent = experience.cost;

      const tagEl = document.createElement("span");
      tagEl.className = "experience-tag";
      tagEl.textContent = "Cultural Experience";

      card.appendChild(nameEl);
      card.appendChild(cityEl);
      card.appendChild(descEl);
      card.appendChild(costEl);
      card.appendChild(tagEl);

      localExperiencesContainer.appendChild(card);
    });
  }

  // Set up location sharing button
  shareLocationBtn.addEventListener("click", shareLocation);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const rawCity = cityInput.value.trim();
    const city = rawCity.toLowerCase();
    const interest = interestSelect.value;
    const budget = Number(budgetInput.value || 0);
    const tripDuration = tripDurationSelect.value;
    const isSolo = soloModeToggle.checked;

    if (!interest || !tripDuration || !budget || budget <= 0) {
      aiInsightEl.textContent =
        "Please fill in all fields with a valid budget to generate recommendations.";
      tripSummaryEl.textContent = "";
      renderEmptyState(
        "Waiting for valid input. Set your city, interest, budget, and trip duration to explore Rajasthan intelligently."
      );
      safetyPanel.style.display = "none";
      document.getElementById("seasonal-insight").style.display = "none";
      cityMapSection.style.display = "none";
      guidesSection.style.display = "none";
      staysSection.style.display = "none";
      document.getElementById("local-experiences-section").style.display = "none";
      return;
    }

    let matches = places.filter((place) => {
      const cityMatch =
        city === ""
          ? true
          : place.city.toLowerCase().includes(city); // allows partial matches like 'jai'
      const interestMatch = place.interest === interest;
      const budgetMatch = budget >= place.budget;
      return cityMatch && interestMatch && budgetMatch;
    });

    // Solo mode: prioritize low-crowd places
    if (isSolo) {
      matches.sort((a, b) => {
        const crowdOrder = { Low: 0, Medium: 1, High: 2 };
        return crowdOrder[a.crowdLevel] - crowdOrder[b.crowdLevel];
      });
    }

    // Apply trip duration limit
    const limit = getTripDurationLimit(tripDuration);
    matches = matches.slice(0, limit);

    weatherInfoEl.textContent = chooseRandomWeather();

    if (matches.length === 0) {
      aiInsightEl.textContent =
        "No places found. Try increasing your budget or changing interest.";
      tripSummaryEl.textContent =
        "The current combination of city, budget, and interest is too restrictive for our Rajasthan dataset.";
      renderEmptyState(
        "No places match the current filters. Try increasing your budget or exploring a different interest type."
      );
      safetyPanel.style.display = isSolo ? "block" : "none";
      document.getElementById("seasonal-insight").style.display = "none";
      cityMapSection.style.display = "none";
      guidesSection.style.display = "none";
      staysSection.style.display = "none";
      document.getElementById("local-experiences-section").style.display = "none";
      return;
    }

    const inferredCity = rawCity || matches[0].city;
    const capitalizedCity = inferredCity
      ? inferredCity.charAt(0).toUpperCase() + inferredCity.slice(1)
      : matches[0].city;

    aiInsightEl.textContent = buildAIInsight({
      city: inferredCity,
      interest,
      budget,
      tripDuration,
      matches,
      isSolo,
    });

    const summaryText = summarizeTravelTime(tripDuration);
    const packedLevel =
      tripDuration === "2 Hours"
        ? "Very packed"
        : tripDuration === "Half Day"
        ? "Moderately packed"
        : tripDuration === "Full Day"
        ? "Well-paced"
        : "Relaxed";

    tripSummaryEl.innerHTML = `<div class="trip-summary-box"><p><strong>Trip Summary:</strong> ${summaryText} Schedule intensity: ${packedLevel}.</p></div>`;

    renderRecommendations(matches, isSolo);

    // Show additional sections
    safetyPanel.style.display = isSolo ? "block" : "block"; // Always show safety panel
    renderSeasonalInsight(capitalizedCity);
    renderCityMap(capitalizedCity);
    renderGuides(capitalizedCity);
    renderStays(capitalizedCity);
    renderLocalExperiences(capitalizedCity);
  });
});

