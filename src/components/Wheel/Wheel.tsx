import { useState } from "react";
import { spinWheel } from "./spinWheel";
import "./Wheel.css";

const segments = [
  { name: "Jungle", color: "bg-green-500" },
  { name: "ADC", color: "bg-purple-500" },
  { name: "Support", color: "bg-yellow-500" },
  { name: "Mid", color: "bg-blue-500" },
  { name: "Top", color: "bg-lime-500" },
];

function Wheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

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
        onClick={() =>
          spinWheel(
            isSpinning,
            setIsSpinning,
            setRotation,
            setSelectedSegment,
            segments
          )
        }
        disabled={isSpinning}
      >
        Spin the Wheel
      </button>
      {selectedSegment && <p>Selected Segment: {selectedSegment}</p>}{" "}
    </div>
  );
}

export default Wheel;
