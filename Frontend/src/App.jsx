import React, { useState, useEffect } from "react";
import SolarSystem from "./component/SolarSystem";
import Controls from "./component/Controls";
import { loadConfiguration } from "./services/api";

const App = () => {
  const [planets, setPlanets] = useState([]);
  const userId = "user123"; // Change dynamically if needed

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await loadConfiguration(userId);
      if (data?.planets) {
        setPlanets(data.planets);
      } else {
        // Fallback to default planet data if API fails or returns empty
        setPlanets([
          { name: "Mercury", size: 0.5, speed: 4, orbitDistance: 5, texture: "mercury.jpg" },
          { name: "Venus", size: 1, speed: 3, orbitDistance: 10, texture: "venus.jpg" },
          { name: "Earth", size: 1.1, speed: 2, orbitDistance: 15, texture: "earth.jpg" },
          { name: "Mars", size: 0.8, speed: 1.5, orbitDistance: 20, texture: "mars.jpg" },
          { name: "Jupiter", size: 2.5, speed: 0.8, orbitDistance: 30, texture: "jupiter.jpg" },
          { name: "Saturn", size: 2.2, speed: 0.6, orbitDistance: 40, texture: "saturn.jpg" },
          { name: "Uranus", size: 1.8, speed: 0.4, orbitDistance: 50, texture: "uranus.jpg" },
          { name: "Neptune", size: 1.7, speed: 0.3, orbitDistance: 60, texture: "neptune.jpg" },
        ]);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white p-4 gap-6">
      <Controls setPlanets={setPlanets} userId={userId} />
      <SolarSystem planets={planets} />
    </div>
  );
};

export default App;
