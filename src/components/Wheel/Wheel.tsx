import { useState } from "react";
import { spinWheel } from "./spinWheel";
import "./Wheel.css";

const segments = [
  { name: "Jungle", color: "bg-emerald-600" },
  { name: "ADC", color: "bg-yellow-600" },
  { name: "Support", color: "bg-orange-600" },
  { name: "Mid", color: "bg-sky-600" },
  { name: "Top", color: "bg-red-600" },
];

function Wheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [degrees, setDegrees] = useState(0);

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "none",
        }}
      >
        {segments.map((segment, index) => (
          <div key={index} className={`segment ${segment.color}`}>
            <img src={`/img/roles/${segment.name}.svg`} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          spinWheel(
            isSpinning,
            setIsSpinning,
            setRotation,
            setSelectedSegment,
            segments,
            degrees,
            setDegrees
          );
        }}
        disabled={isSpinning}
      >
        Spin
      </button>
      {selectedSegment && <p>Selected Segment: {selectedSegment}</p>}{" "}
    </div>
  );
}

export default Wheel;
