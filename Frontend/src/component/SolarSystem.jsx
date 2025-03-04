import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SolarSystem = ({ planets }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 🎨 Create Scene & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // 🎥 Add Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 🌌 Load Starry Background
    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load("https://t4.ftcdn.net/jpg/02/43/75/73/360_F_243757367_gBpS6R5c8DB7pL5gw9gi9KXlzFfbdZOA.jpg");
    scene.background = starTexture;

    // ☀️ Create Sun
    if (!scene.getObjectByName("sun")) {
        const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.name = "sun";  // Set a name for identification
        scene.add(sun);
      }
    // 💡 Lighting
    const pointLight = new THREE.PointLight(0xffffff, 3, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 🌍 Updated Planet Textures
    const planetTextures = {
      Mercury: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkthhrn1p-Km7BNY8fRhvWx0cWjo6hq-IV7Q&s",
      Venus: "https://www.earth.com/assets/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2024%2F12%2F03103909%2FLife-Venus--1400x850.jpg&w=1200&q=75",
      Earth: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpc7PNcHRs3K47PL3CJ13zcuFy1niH0_O04g&s",
      Mars: "/textures/mars.jpg",
      Jupiter: "/textures/jupiter.jpg",
    };

    // 🪐 Create Planets with New Textures
    const planetMeshes = planets.map((planet) => {
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(planetTextures[planet.name] || "/textures/jupiter.jpg"),
        roughness: 0.8,
        metalness: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = planet.orbitDistance;
      scene.add(mesh);
      return { mesh, speed: planet.speed, orbitRadius: planet.orbitDistance };
    });

    // 📍 Set Camera Position
    camera.position.z = 50;

    // 🎬 Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0001;

      planetMeshes.forEach((p) => {
        const angle = time * p.speed;
        p.mesh.position.x = Math.cos(angle) * p.orbitRadius;
        p.mesh.position.z = Math.sin(angle) * p.orbitRadius;
        p.mesh.rotation.y += 0.01; // Rotate around itself
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 🧹 Cleanup Function
    return () => {
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [planets]);

  return <div ref={mountRef} className="border border-gray-700 rounded-lg shadow-lg"></div>;
};

export default SolarSystem;
