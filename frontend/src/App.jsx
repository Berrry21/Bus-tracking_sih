import React, { useEffect, useState } from "react";
import MapView from "./mapview";
import { getBuses, getStops, getETA } from "./api";

export default function App() {
  const [buses, setBuses] = useState([]);
  const [stops, setStops] = useState([]);
  const [eta, setEta] = useState(null);
  const [selectedStop, setSelectedStop] = useState("");

  useEffect(() => {
    async function loadData() {
      const [b, s] = await Promise.all([getBuses(), getStops()]);
      setBuses(b);
      setStops(s);
    }
    loadData();

    // Auto-refresh buses every 10 seconds
    const interval = setInterval(async () => {
      const b = await getBuses();
      setBuses(b);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const checkETA = async () => {
    if (!selectedStop) return;
    const data = await getETA(selectedStop);
    if (data) setEta(data.eta);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Bus Tracking System</h1>

      <div className="mb-4">
        <MapView buses={buses} stops={stops} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Check ETA to Stop</h2>
        <select
          className="border p-2 rounded w-full mb-2"
          value={selectedStop}
          onChange={(e) => setSelectedStop(e.target.value)}
        >
          <option value="">-- Select Stop --</option>
          {stops.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button
          className="bg-indigo-600 text-white p-2 rounded w-full"
          onClick={checkETA}
        >
          Get ETA
        </button>
        {eta !== null && <p className="mt-2">ETA: {eta} minutes</p>}
      </div>
    </div>
  );
}
