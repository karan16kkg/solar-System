import React, { useState } from "react";
import { saveConfiguration, loadConfiguration } from "../services/api";

const Controls = ({ setPlanets, userId }) => {
  const [newPlanet, setNewPlanet] = useState({ 
    name: "", 
    size: 1, 
    speed: 1, 
    orbitDistance: 10, 
    texture: "earth.jpg" 
  });

  const handleChange = (e) => {
    setNewPlanet({ ...newPlanet, [e.target.name]: e.target.value });
  };

  const handleAddPlanet = async () => {
    if (!newPlanet.name) {
      alert("Please enter a planet name.");
      return;
    }

    try {
      await saveConfiguration(userId, newPlanet); // Save to API
      const updatedData = await loadConfiguration(userId); // Fetch updated planets
      if (updatedData?.planets) {
        setPlanets(updatedData.planets); // Update state with latest data
      }
      setNewPlanet({ name: "", size: 1, speed: 1, orbitDistance: 10, texture: "earth.jpg" });
    } catch (error) {
      console.error("Error adding planet:", error);
      alert("Failed to add planet. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-bold mb-2">Add Planet</h2>
      <input className="w-full mb-2 p-2 bg-gray-700 text-white rounded" 
        type="text" name="name" placeholder="Planet Name" 
        value={newPlanet.name} onChange={handleChange} 
      />
      <input className="w-full mb-2 p-2 bg-gray-700 text-white rounded" 
        type="number" name="size" placeholder="Size" 
        value={newPlanet.size} onChange={handleChange} 
      />
      <input className="w-full mb-2 p-2 bg-gray-700 text-white rounded" 
        type="number" name="speed" placeholder="Speed" 
        value={newPlanet.speed} onChange={handleChange} 
      />
      <input className="w-full mb-2 p-2 bg-gray-700 text-white rounded" 
        type="number" name="orbitDistance" placeholder="Orbit Distance" 
        value={newPlanet.orbitDistance} onChange={handleChange} 
      />
      <input className="w-full mb-2 p-2 bg-gray-700 text-white rounded" 
        type="text" name="texture" placeholder="Texture (e.g., earth.jpg)" 
        value={newPlanet.texture} onChange={handleChange} 
      />
      <button className="w-full bg-blue-500 p-2 rounded mt-2 hover:bg-blue-700" 
        onClick={handleAddPlanet}>
        Add Planet
      </button>
    </div>
  );
};

export default Controls;
