import { useState } from "react";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const checklist = ["Muscu", "VR", "Snack Proteine", "Gainage", "Equilibre VR", "Repos", "Poirier (mur)"];
const poirierSteps = [
    "Headstand tenu facilement",
    "30 sec gainage solide",
    "Pompes epaules regulieres",
    "Poirier contre mur (30 sec)",
    "Tentative sans mur"
];

export default function VRFitApp() {
    const [weekProgress, setWeekProgress] = useState({});
    const [poirierProgress, setPoirierProgress] = useState([]);
    const [boosterTaken, setBoosterTaken] = useState(false);

    const toggleProgress = (day, item) => {
        const key = `${day}-${item}`;
        setWeekProgress((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const togglePoirier = (step) => {
        setPoirierProgress((prev) =>
            prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
        );
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>VR Fit Challenge</h1>

            <div style={{ marginBottom: 16, padding: 12, background: '#fff', borderRadius: 8 }}>
                <h2 style={{ fontSize: 20 }}>Booster pris ?</h2>
                <button onClick={() => setBoosterTaken(!boosterTaken)}>
                    {boosterTaken ? "Oui" : "Non"}
                </button>
            </div>

            <div style={{ marginBottom: 16, padding: 12, background: '#fff', borderRadius: 8 }}>
                <h2 style={{ fontSize: 20 }}>Suivi Hebdo</h2>
                {days.map((day) => (
                    <div key={day} style={{ marginBottom: 8 }}>
                        <h3>{day}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {checklist.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => toggleProgress(day, item)}
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: 4,
                                        border: weekProgress[`${day}-${item}`] ? '2px solid green' : '1px solid #ccc',
                                        background: weekProgress[`${day}-${item}`] ? '#defade' : '#f5f5f5'
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ padding: 12, background: '#fff', borderRadius: 8 }}>
                <h2 style={{ fontSize: 20 }}>Objectif Poirier</h2>
                {poirierSteps.map((step) => (
                    <button
                        key={step}
                        onClick={() => togglePoirier(step)}
                        style={{
                            display: 'block',
                            width: '100%',
                            marginBottom: 6,
                            padding: 6,
                            borderRadius: 4,
                            border: poirierProgress.includes(step) ? '2px solid green' : '1px solid #ccc',
                            background: poirierProgress.includes(step) ? '#defade' : '#f5f5f5'
                        }}
                    >
                        {step}
                    </button>
                ))}
            </div>
        </div>
    );
}
