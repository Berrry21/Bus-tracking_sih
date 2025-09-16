const API_BASE = import.meta.env.VITE_API_BASE;

export async function getBuses() {
  try {
    const res = await fetch(`${API_BASE}/api/buses`);
    return await res.json();
  } catch (e) {
    console.error("Error fetching buses", e);
    return [];
  }
}

export async function getStops() {
  // Example stops if backend has none
  return [
    { id: 1, name: "Central Station", lat: 17.421, lng: 78.510 },
    { id: 2, name: "Tech Park", lat: 17.426, lng: 78.515 },
    { id: 3, name: "University Gate", lat: 17.433, lng: 78.525 }
  ];
}

export async function getETA(stopId) {
  try {
    const res = await fetch(`${API_BASE}/api/eta/${stopId}`);
    return await res.json();
  } catch (e) {
    console.error("Error fetching ETA", e);
    return null;
  }
}
