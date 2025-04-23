import { useState, useEffect } from "react";

const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const checklist = ["Muscu", "VR", "Snack Protéine", "Gainage", "Équilibre VR", "Repos", "Poirier (mur)"];
const poirierSteps = [
  "Headstand tenu facilement",
  "30 sec gainage solide",
  "Pompes épaules régulières",
  "Poirier contre mur (30 sec)",
  "Tentative sans mur"
];

export default function VRFitApp() {
  const [today, setToday] = useState("");
  const [todayExercise, setTodayExercise] = useState("");
  const [boosterLog, setBoosterLog] = useState(() => {
    const saved = localStorage.getItem("boosterLog");
    return saved ? JSON.parse(saved) : {};
  });

  const [poirierProgress, setPoirierProgress] = useState(() => {
    const saved = localStorage.getItem("poirierProgress");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const date = new Date();
    const day = days[date.getDay()];
    setToday(day);
    const exercise = checklist[date.getDay() % checklist.length];
    setTodayExercise(exercise);
  }, []);

  const toggleBooster = () => {
    const updated = { ...boosterLog, [today]: !boosterLog[today] };
    setBoosterLog(updated);
    localStorage.setItem("boosterLog", JSON.stringify(updated));
  };

  const togglePoirier = (step) => {
    const updated = poirierProgress.includes(step)
      ? poirierProgress.filter((s) => s !== step)
      : [...poirierProgress, step];
    setPoirierProgress(updated);
    localStorage.setItem("poirierProgress", JSON.stringify(updated));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>VR Fit Challenge</h1>

      <div style={{ marginBottom: 16, padding: 12, background: "#fff", borderRadius: 8 }}>
        <h2 style={{ fontSize: 20 }}>Booster pris aujourd'hui ({today}) ?</h2>
        <button onClick={toggleBooster}>
          {boosterLog[today] ? "Oui" : "Non"}
        </button>
      </div>

      <div style={{ marginBottom: 16, padding: 12, background: "#fff", borderRadius: 8 }}>
        <h2 style={{ fontSize: 20 }}>Exercice du jour ({today})</h2>
        <p style={{ fontSize: 18, fontWeight: "bold" }}>{todayExercise}</p>
      </div>

      <div style={{ padding: 12, background: "#fff", borderRadius: 8 }}>
        <h2 style={{ fontSize: 20 }}>Objectif Poirier</h2>
        {poirierSteps.map((step) => (
          <button
            key={step}
            onClick={() => togglePoirier(step)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: 6,
              padding: 6,
              borderRadius: 4,
              border: poirierProgress.includes(step) ? "2px solid green" : "1px solid #ccc",
              background: poirierProgress.includes(step) ? "#defade" : "#f5f5f5"
            }}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
}
