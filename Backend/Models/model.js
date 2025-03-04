const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    speed: { type: Number, required: true },
    orbitDistance: { type: Number, required: true },
});

const SolarSystemSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    planets: [PlanetSchema],
});

module.exports = mongoose.model('SolarSystem', SolarSystemSchema);
