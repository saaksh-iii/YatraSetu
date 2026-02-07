document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("planner-form");
  const cityInput = document.getElementById("city");
  const interestSelect = document.getElementById("interest");
  const budgetInput = document.getElementById("budget");
  const tripDurationSelect = document.getElementById("trip-duration");
  const soloModeToggle = document.getElementById("solo-mode");

  const resultsWrapper = document.getElementById("results-wrapper");
  const initialState = document.getElementById("initial-state");
  const aiInsightEl = document.getElementById("ai-insight");
  const weatherInfoEl = document.getElementById("weather-info");
  const budgetBadgeUI = document.getElementById("budget-badge-ui");
  const soloIndicator = document.getElementById("solo-indicator");
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

  // City coordinates for map embedding & weather API
  const cityCoordinates = {
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Udaipur: { lat: 24.5854, lng: 73.7125 },
    Jodhpur: { lat: 26.2389, lng: 73.0243 },
    Jaisalmer: { lat: 26.9157, lng: 70.9083 },
    Pushkar: { lat: 26.4897, lng: 74.5518 },
    "Mount Abu": { lat: 24.5925, lng: 72.7156 },
    Ranthambore: { lat: 26.0172, lng: 76.5025 },
  };

  const weatherSamples = ["Sunny, 28°C", "Clear, 25°C", "Warm, 30°C", "Pleasant, 24°C", "Mild, 27°C"];
  function getFallbackWeather() {
    return { temp: 28, condition: "clear", display: weatherSamples[Math.floor(Math.random() * weatherSamples.length)] };
  }

  // ------ FOOTFALL PREDICTION ENGINE (rule-based core, API-enhanced) ------

  /**
   * Fetch weather from Open-Meteo API (free, no key). Falls back to rule-based on failure.
   */
  async function fetchWeather(cityName) {
    const normalized = (cityName || "").toLowerCase();
    const coords = cityCoordinates[cityName]
      || Object.entries(cityCoordinates).find(([k]) => k.toLowerCase() === normalized)?.[1]
      || Object.entries(cityCoordinates).find(([k]) => k.toLowerCase().startsWith(normalized) || normalized.startsWith(k.toLowerCase()))?.[1];
    if (!coords) return getFallbackWeather();

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,weather_code`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return getFallbackWeather();
      const data = await res.json();
      const temp = data.current?.temperature_2m ?? 28;
      const code = data.current?.weather_code ?? 0;
      const condition = code <= 3 ? "clear" : code >= 51 && code <= 67 ? "rain" : code >= 80 ? "rain" : code >= 95 ? "storm" : "cloudy";
      const display = `${temp}°C, ${condition === "rain" ? "Rain" : condition === "storm" ? "Storm" : condition === "cloudy" ? "Cloudy" : "Clear"}`;
      return { temp, condition, display };
    } catch {
      return getFallbackWeather();
    }
  }

  /**
   * Adjust base footfall score using weather. Extreme heat/rain reduce activity.
   */
  function adjustUsingWeather(weather, baseScore, isOutdoor = true) {
    let score = baseScore;
    const { temp, condition } = weather;

    if (condition === "rain" || condition === "storm") {
      score *= isOutdoor ? 0.5 : 0.85;
    } else if (temp >= 40) {
      score *= 0.55;
    } else if (temp >= 36) {
      score *= 0.75;
    } else if (temp >= 32) {
      score *= 0.9;
    } else if (temp >= 22 && temp <= 28 && condition === "clear") {
      score *= 1.15;
    } else if (temp >= 18 && temp <= 26) {
      score *= 1.08;
    }
    return Math.round(Math.min(100, Math.max(0, score)));
  }

  /**
   * Get time-of-day and weekday/weekend factors.
   */
  function getTimeAndDayFactors() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const isWeekend = day === 0 || day === 6;

    let timeFactor = 1;
    if (hour >= 9 && hour <= 11) timeFactor = 1.1;
    else if (hour >= 17 && hour <= 20) timeFactor = 1.25;
    else if (hour >= 20 && hour <= 22) timeFactor = 1.15;
    else if (hour >= 12 && hour <= 14) timeFactor = 0.9;
    else if (hour < 8 || hour > 22) timeFactor = 0.6;

    const dayFactor = isWeekend ? 1.25 : 1;
    return { timeFactor, dayFactor, isWeekend, hour };
  }

  /**
   * Festival/season factor for Rajasthan. Simulates crowd surge during peak seasons.
   */
  const festivalMonths = {
    10: { factor: 1.1, label: "Diwali / early winter" },
    11: { factor: 1.35, label: "Pushkar Fair & peak tourist season" },
    12: { factor: 1.25, label: "Winter holiday rush" },
    1: { factor: 1.2, label: "New Year & Republic Day" },
    2: { factor: 1.15, label: "Late winter peak" },
    3: { factor: 1.05, label: "Spring travel" },
    4: { factor: 0.85, label: "Pre-summer taper" },
    5: { factor: 0.6, label: "Summer heat reduces tourism" },
    6: { factor: 0.55, label: "Extreme summer" },
    7: { factor: 0.65, label: "Monsoon" },
    8: { factor: 0.7, label: "Late monsoon" },
    9: { factor: 0.9, label: "Post-monsoon recovery" },
  };

  function getSeasonFestivalFactor() {
    const month = new Date().getMonth() + 1;
    const info = festivalMonths[month] || { factor: 1, label: "Normal season" };
    return { factor: info.factor, label: info.label };
  }

  /**
   * Map base crowd level to initial score.
   */
  const baseCrowdToScore = { Low: 25, Medium: 50, High: 75 };

  /**
   * Convert score to crowd level and optional label.
   */
  function scoreToCrowdLevel(score) {
    if (score <= 33) return { level: "Low", score };
    if (score <= 66) return { level: "Medium", score };
    return { level: "High", score };
  }

  /**
   * Predict footfall combining: time, day, weather, season/festival.
   */
  function predictFootfall(place, weather, timeDay, seasonFactor, isOutdoor = true) {
    const baseScore = baseCrowdToScore[place.crowdLevel] ?? 50;
    let score = baseScore * timeDay.timeFactor * timeDay.dayFactor * seasonFactor.factor;
    score = adjustUsingWeather(weather, score, isOutdoor);
    return { ...scoreToCrowdLevel(score), seasonLabel: seasonFactor.label };
  }

  /**
   * Generate smart insights for a place based on prediction.
   */
  function generateSmartInsights(place, prediction, weather, timeDay, seasonFactor) {
    const parts = [];

    if (prediction.level === "High") {
      parts.push("Peak hours – expect congestion.");
    }

    const reasons = [];
    if (timeDay.isWeekend) reasons.push("weekend");
    else reasons.push("weekday");
    const period = timeDay.hour < 12 ? "morning" : timeDay.hour < 17 ? "afternoon" : "evening";
    reasons.push(period);

    if (weather.condition === "rain") reasons.push("rain reducing outdoor visits");
    else if (weather.temp >= 36) reasons.push("high temperature dampening activity");
    else if (weather.temp >= 22 && weather.temp <= 28) reasons.push("pleasant weather");
    reasons.push(seasonFactor.label.toLowerCase());

    const explanation = `${prediction.level} footfall predicted due to ${reasons.join(", ")}.`;
    parts.push(explanation);

    return { warning: prediction.level === "High" ? "Peak hours – expect congestion." : null, explanation, bestTime: place.bestTimeToVisit };
  }

  function chooseRandomWeather() {
    return weatherSamples[Math.floor(Math.random() * weatherSamples.length)];
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

  /**
   * Generate weather-based footfall insight for the summary.
   */
  function getWeatherFootfallInsight(weather, seasonFactor) {
    if (weather.temp >= 38) return "Footfall may decrease due to high temperature.";
    if (weather.temp >= 36) return "Hot conditions may reduce daytime outdoor activity.";
    if (weather.condition === "rain" || weather.condition === "storm") return "Footfall likely lower due to rain affecting outdoor visits.";
    if (weather.temp >= 22 && weather.temp <= 28 && weather.condition === "clear") return "Pleasant weather expected to boost tourist activity.";
    if (seasonFactor.factor >= 1.2) return `Seasonal surge: ${seasonFactor.label} — expect higher crowds.`;
    return null;
  }

  function buildAIInsight({ city, interest, budget, tripDuration, matches, isSolo, weatherInsight }) {
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

    const weatherNote = weatherInsight ? ` ${weatherInsight}` : "";
    return `${base} ${crowdSentence} ${durationSentence} ${costBand}${soloNote}${weatherNote}`;
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

  function renderRecommendations(matches, isSolo = false, predictionContext = null) {
    clearRecommendations();
    const timeDay = predictionContext?.timeDay ?? getTimeAndDayFactors();
    const seasonFactor = predictionContext?.seasonFactor ?? getSeasonFestivalFactor();
    const weather = predictionContext?.weather ?? getFallbackWeather();

    matches.forEach((place) => {
      const isOutdoor = !["Wildlife"].includes(place.interest);
      const prediction = predictFootfall(place, weather, timeDay, seasonFactor, isOutdoor);
      const insights = generateSmartInsights(place, prediction, weather, timeDay, seasonFactor);

      const card = document.createElement("article");
      card.className = "place-card";

      const header = document.createElement("div");
      header.className = "place-card-header";

      const nameEl = document.createElement("h3");
      nameEl.className = "place-name";
      nameEl.textContent = place.name;

      const pillEl = document.createElement("span");
      pillEl.className = "pill";
      pillEl.textContent = place.interest;

      header.appendChild(nameEl);
      header.appendChild(pillEl);

      if (place.budgetCategory) {
        const budgetBadge = document.createElement("span");
        budgetBadge.className = "cost-badge";
        budgetBadge.textContent = place.budgetCategory;
        header.appendChild(budgetBadge);
      }

      if (isSolo) {
        if (prediction.level === "Low") {
          const soloBadge = document.createElement("span");
          soloBadge.className = "solo-badge";
          soloBadge.textContent = "Solo-friendly";
          header.appendChild(soloBadge);
        } else if (prediction.level === "High") {
          const crowdedBadge = document.createElement("span");
          crowdedBadge.className = "crowded-badge";
          crowdedBadge.textContent = "Crowded";
          header.appendChild(crowdedBadge);
        }
      }

      const metaRow = document.createElement("div");
      metaRow.className = "place-meta-row";
      metaRow.innerHTML = `
        <span class="cost-badge">₹${place.budget.toLocaleString("en-IN")}</span>
        <span class="crowd-badge ${prediction.level.toLowerCase()}">${prediction.level} (${prediction.score})</span>
        ${place.travelTime ? `<span>⏱ ${place.travelTime}</span>` : ""}
      `;

      const footfallInsight = document.createElement("p");
      footfallInsight.className = "footfall-explanation";
      footfallInsight.textContent = insights.explanation;

      const bestTimeRow = document.createElement("div");
      bestTimeRow.className = "best-time-row";
      bestTimeRow.innerHTML = `<strong>Best time:</strong> ${insights.bestTime || place.bestTimeToVisit || "—"}`;

      const warningBadge = insights.warning
        ? `<span class="warning-badge">⚠ ${insights.warning}</span>`
        : "";

      const descEl = document.createElement("p");
      descEl.className = "place-description";
      descEl.textContent = place.description;

      const extras = document.createElement("div");
      extras.className = "place-extras";
      const parts = [];
      if (place.transport) parts.push(`How to reach: ${place.transport}`);
      if (place.bestTimeToVisit) parts.push(`Best: ${place.bestTimeToVisit}`);
      extras.textContent = parts.join(" • ");

      const mapBtn = document.createElement("a");
      mapBtn.href = `https://www.google.com/maps/search/${encodeURIComponent(place.name + " " + place.city)}`;
      mapBtn.target = "_blank";
      mapBtn.className = "maps-link-btn";
      mapBtn.style.cssText = "font-size: 0.75rem; margin-top: 0.5rem; display: inline-block;";
      mapBtn.textContent = "View on Map";

      const mapWrapper = document.createElement("div");
      mapWrapper.style.marginTop = "0.5rem";
      mapWrapper.appendChild(mapBtn);
      extras.appendChild(mapWrapper);

      const expandHint = document.createElement("p");
      expandHint.className = "expand-hint";
      expandHint.textContent = "Click to expand details";

      card.appendChild(header);
      if (insights.warning) {
        const warnEl = document.createElement("span");
        warnEl.className = "warning-badge";
        warnEl.textContent = `⚠ ${insights.warning}`;
        card.appendChild(warnEl);
      }
      card.appendChild(metaRow);
      card.appendChild(footfallInsight);
      card.appendChild(bestTimeRow);
      card.appendChild(descEl);
      card.appendChild(extras);
      card.appendChild(expandHint);

      card.addEventListener("click", (e) => {
        if (!e.target.closest("a")) {
          card.classList.toggle("expanded");
        }
      });

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

    const seasonFactor = getSeasonFestivalFactor();
    const surgeNote = seasonFactor.factor >= 1.2
      ? `<div class="seasonal-item seasonal-surge"><strong>Footfall surge:</strong> ${seasonFactor.label} — expect higher crowds.</div>`
      : seasonFactor.factor <= 0.7
      ? `<div class="seasonal-item seasonal-surge"><strong>Lower crowds:</strong> ${seasonFactor.label}.</div>`
      : "";

    seasonalInsightEl.style.display = "block";
    seasonalContentEl.innerHTML = `
      <div class="seasonal-item">
        <strong>Best season:</strong> ${seasonData.bestSeason}
      </div>
      <div class="seasonal-item">
        <strong>Avoid:</strong> ${seasonData.avoidMonths}
      </div>
      ${surgeNote}
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

  shareLocationBtn.addEventListener("click", shareLocation);

  function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".tab-panel");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabId = btn.dataset.tab;

        tabBtns.forEach((b) => b.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        btn.classList.add("active");
        const panel = document.getElementById(`panel-${tabId}`);
        if (panel) panel.classList.add("active");
      });
    });
  }
  initTabs();

  function showResults() {
    resultsWrapper.style.display = "block";
    initialState.style.display = "none";
  }

  function hideResults() {
    resultsWrapper.style.display = "none";
    initialState.style.display = "block";
  }

  function updateEmptyHints(hasSeasonal, hasExperiences, hasGuides, hasStays, hasMap) {
    document.getElementById("seasonal-empty").style.display = hasSeasonal ? "none" : "block";
    document.getElementById("experiences-empty").style.display = hasExperiences ? "none" : "block";
    document.getElementById("guides-empty").style.display = hasGuides ? "none" : "block";
    document.getElementById("stays-empty").style.display = hasStays ? "none" : "block";
    document.getElementById("map-empty").style.display = hasMap ? "none" : "block";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const rawCity = cityInput.value.trim();
    const city = rawCity.toLowerCase();
    const interest = interestSelect.value;
    const budget = Number(budgetInput.value || 0);
    const tripDuration = tripDurationSelect.value;
    const isSolo = soloModeToggle.checked;

    if (!interest || !tripDuration || !budget || budget <= 0) {
      hideResults();
      return;
    }

    const capitalizedCity = rawCity
      ? rawCity.charAt(0).toUpperCase() + rawCity.slice(1)
      : "";

    weatherInfoEl.textContent = "Fetching weather…";
    const weather = await fetchWeather(capitalizedCity || "Jaipur");
    weatherInfoEl.textContent = weather.display;

    const timeDay = getTimeAndDayFactors();
    const seasonFactor = getSeasonFestivalFactor();
    const predictionContext = { weather, timeDay, seasonFactor };

    let matches = places.filter((place) => {
      const cityMatch =
        city === ""
          ? true
          : place.city.toLowerCase().includes(city);
      const interestMatch = place.interest === interest;
      const budgetMatch = budget >= place.budget;
      return cityMatch && interestMatch && budgetMatch;
    });

    if (isSolo) {
      matches.sort((a, b) => {
        const crowdOrder = { Low: 0, Medium: 1, High: 2 };
        return crowdOrder[a.crowdLevel] - crowdOrder[b.crowdLevel];
      });
    }

    const limit = getTripDurationLimit(tripDuration);
    matches = matches.slice(0, limit);

    if (matches.length === 0) {
      showResults();
      weatherInfoEl.textContent = weather.display;
      budgetBadgeUI.textContent = `Budget: ₹${budget.toLocaleString("en-IN")}`;
      budgetBadgeUI.style.display = "inline-flex";
      soloIndicator.style.display = isSolo ? "inline-flex" : "none";
      aiInsightEl.textContent = "No places found. Try increasing your budget or changing interest.";
      tripSummaryEl.innerHTML = "<p>The current combination of city, budget, and interest is too restrictive.</p>";
      renderEmptyState("No places match. Try increasing budget or changing interest.");
      document.getElementById("seasonal-insight").style.display = "none";
      cityMapSection.style.display = "none";
      guidesSection.style.display = "none";
      staysSection.style.display = "none";
      document.getElementById("local-experiences-section").style.display = "none";
      updateEmptyHints(false, false, false, false, false);
      return;
    }

    const inferredCity = rawCity || matches[0].city;
    const resolvedCity = matches[0].city;

    const weatherInsight = getWeatherFootfallInsight(weather, seasonFactor);

    showResults();
    weatherInfoEl.textContent = weather.display;
    budgetBadgeUI.textContent = `Budget: ₹${budget.toLocaleString("en-IN")}`;
    budgetBadgeUI.style.display = "inline-flex";
    soloIndicator.style.display = isSolo ? "inline-flex" : "none";

    aiInsightEl.textContent = buildAIInsight({
      city: inferredCity,
      interest,
      budget,
      tripDuration,
      matches,
      isSolo,
      weatherInsight,
    });

    const summaryText = summarizeTravelTime(tripDuration);
    const packedLevel =
      tripDuration === "2 Hours" ? "Very packed"
      : tripDuration === "Half Day" ? "Moderately packed"
      : tripDuration === "Full Day" ? "Well-paced"
      : "Relaxed";

    tripSummaryEl.innerHTML = `<p><strong>Trip Summary:</strong> ${summaryText} Schedule: ${packedLevel}.</p>`;

    renderRecommendations(matches, isSolo, predictionContext);
    renderSeasonalInsight(resolvedCity);
    renderCityMap(resolvedCity);
    renderGuides(resolvedCity);
    renderStays(resolvedCity);
    renderLocalExperiences(resolvedCity);

    const getCityData = (obj) => {
      const key = obj[resolvedCity] ? resolvedCity : Object.keys(obj).find((k) => k.toLowerCase() === resolvedCity.toLowerCase());
      return key ? obj[key] : null;
    };
    const hasSeasonal = !!getCityData(citySeasonData);
    const hasExperiences = ((getCityData(localExperiences)) || []).length > 0;
    const hasGuides = (getCityData(guides) || []).length > 0;
    const hasStays = (getCityData(stays) || []).length > 0;
    const hasMap = !!getCityData(cityCoordinates);
    updateEmptyHints(hasSeasonal, hasExperiences, hasGuides, hasStays, hasMap);
  });
});

