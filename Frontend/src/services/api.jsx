const API_URL = "http://localhost:3000"; // Ensure backend is on port 5000

const FIXED_USER_ID = "user123"; // Hardcoded user ID

export const saveConfiguration = async (planets) => {
  try {
    const response = await fetch(`${API_URL}/solar/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: FIXED_USER_ID, planets }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error saving configuration:", error);
    return { error: "Failed to save configuration" };
  }
};

export const loadConfiguration = async () => {
  try {
    const response = await fetch(`${API_URL}/solar/load/${FIXED_USER_ID}`); // Fixed UserID

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading configuration:", error);
    return { error: "Failed to load configuration" };
  }
};
