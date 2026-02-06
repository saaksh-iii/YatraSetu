document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("planner-form");
  const cityInput = document.getElementById("city");
  const interestSelect = document.getElementById("interest");
  const budgetInput = document.getElementById("budget");
  const travelTimeSelect = document.getElementById("travel-time");

  const aiInsightEl = document.getElementById("ai-insight");
  const weatherInfoEl = document.getElementById("weather-info");
  const tripSummaryEl = document.getElementById("trip-summary");
  const recommendationsEl = document.getElementById("recommendations");

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
      description:
        "Historic hilltop fort with forest views, ancient ruins, and a popular Ganesh temple.",
    },
  ];

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

  function summarizeTravelTime(travelTime) {
    switch (travelTime) {
      case "1 Day":
        return "Best suited for a focused day trip with 1–2 key experiences.";
      case "2–3 Days":
        return "Ideal for a short city getaway with time for exploration and relaxation.";
      case "4–7 Days":
        return "Great for a slow, immersive itinerary across multiple locations.";
      default:
        return "";
    }
  }

  function buildAIInsight({ city, interest, budget, travelTime, matches }) {
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

    const durationSentence = summarizeTravelTime(travelTime);

    const costBand =
      lowestCost === highestCost
        ? `Typical experiences start around ₹${lowestCost.toLocaleString(
            "en-IN"
          )}.`
        : `Experiences typically range between ₹${lowestCost.toLocaleString(
            "en-IN"
          )} and ₹${highestCost.toLocaleString("en-IN")}.`;

    return `${base} ${crowdSentence} ${durationSentence} ${costBand}`;
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

  function renderRecommendations(matches) {
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

      const metaEl = document.createElement("p");
      metaEl.className = "place-meta";
      metaEl.textContent = `${place.city} • ${place.bestTimeToVisit}`;

      const descEl = document.createElement("p");
      descEl.className = "place-description";
      descEl.textContent = place.description;

      primary.appendChild(nameRow);
      primary.appendChild(metaEl);
      primary.appendChild(descEl);

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

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const rawCity = cityInput.value.trim();
    const city = rawCity.toLowerCase();
    const interest = interestSelect.value;
    const budget = Number(budgetInput.value || 0);
    const travelTime = travelTimeSelect.value;

    if (!interest || !travelTime || !budget || budget <= 0) {
      aiInsightEl.textContent =
        "Please fill in all fields with a valid budget to generate recommendations.";
      tripSummaryEl.textContent = "";
      renderEmptyState(
        "Waiting for valid input. Set your city, interest, and budget to explore Rajasthan intelligently."
      );
      return;
    }

    const matches = places.filter((place) => {
      const cityMatch =
        city === ""
          ? true
          : place.city.toLowerCase().includes(city); // allows partial matches like 'jai'
      const interestMatch = place.interest === interest;
      const budgetMatch = budget >= place.budget;
      return cityMatch && interestMatch && budgetMatch;
    });

    weatherInfoEl.textContent = chooseRandomWeather();

    if (matches.length === 0) {
      aiInsightEl.textContent =
        "No places found. Try increasing your budget or changing interest.";
      tripSummaryEl.textContent =
        "The current combination of city, budget, and interest is too restrictive for our Rajasthan dataset.";
      renderEmptyState(
        "No places match the current filters. Try increasing your budget or exploring a different interest type."
      );
      return;
    }

    const inferredCity = rawCity || matches[0].city;
    aiInsightEl.textContent = buildAIInsight({
      city: inferredCity,
      interest,
      budget,
      travelTime,
      matches,
    });

    tripSummaryEl.textContent = summarizeTravelTime(travelTime);

    renderRecommendations(matches);
  });
});

