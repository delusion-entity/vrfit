import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const routine = {
  "Lundi": "Musculation bras + abdos (5x pompes, 3x planche 30s, 3x crunchs)",
  "Mardi": "VR Danse + Snack Protéiné post session",
  "Mercredi": "Gainage (3x planche 1min) + VR Equilibre (1 jambe, step)",
  "Jeudi": "Repos + étirements",
  "Vendredi": "VR Danse intense + Gainage rapide",
  "Samedi": "Poirier contre mur + Pompes épaules (3x10)",
  "Dimanche": "VR libre + Snack protéiné"
};

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
  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem("activityLog");
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
    setTodayExercise(routine[day]);
    requestNotification();
  }, []);

  const toggleBooster = () => {
    const updated = { ...boosterLog, [today]: !boosterLog[today] };
    setBoosterLog(updated);
    localStorage.setItem("boosterLog", JSON.stringify(updated));
  };

  const saveTodayActivity = () => {
    const dateKey = new Date().toISOString().split("T")[0];
    const updated = { ...activityLog, [dateKey]: todayExercise };
    setActivityLog(updated);
    localStorage.setItem("activityLog", JSON.stringify(updated));
  };

  const togglePoirier = (step) => {
    const updated = poirierProgress.includes(step)
      ? poirierProgress.filter((s) => s !== step)
      : [...poirierProgress, step];
    setPoirierProgress(updated);
    localStorage.setItem("poirierProgress", JSON.stringify(updated));
  };

  const requestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("VR Fit - N'oublie pas ton entraînement du jour !");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("VR Fit - Rappel de ton programme fitness !");
        }
      });
    }
  };

  const activityDates = Object.keys(activityLog);
  const activityData = activityDates.map(date => 1);

  const chartData = {
    labels: activityDates,
    datasets: [
      {
        label: 'Jours enregistrés',
        data: activityData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
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
        <button onClick={saveTodayActivity}>Sauvegarder</button>
      </div>

      <div style={{ marginBottom: 16, padding: 12, background: "#fff", borderRadius: 8 }}>
        <h2 style={{ fontSize: 20 }}>Évolution des activités</h2>
        <Line data={chartData} />
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
