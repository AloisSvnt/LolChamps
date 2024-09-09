import { useState, useRef, useEffect } from "react";

const segments = [
  { name: "Jungle" },
  { name: "ADC" },
  { name: "Support" },
  { name: "Mid" },
  { name: "Top" },
];

const repeatedSegments = Array(50).fill(segments).flat();

function WheelFace() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    const preventScroll = (event: WheelEvent) => {
      event.preventDefault();
    };

    if (element) {
      element.addEventListener("wheel", preventScroll as EventListener);
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", preventScroll as EventListener);
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleRoll = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSegment(null);
    setCurrentSegmentIndex(0);

    const element = scrollRef.current;
    if (!element) return;

    const totalHeight = element.scrollHeight;
    const segmentHeight = totalHeight / repeatedSegments.length;
    const duration = Math.random() * 2000 + 3000;
    const initialScrollTop = element.scrollTop;

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;

        if (elapsed >= duration) {
          setIsSpinning(false);

          const finalPosition = element.scrollTop;
          const finalSegmentIndex =
            Math.floor(finalPosition / segmentHeight) % segments.length;
          setSelectedSegment(segments[finalSegmentIndex].name);
          setCurrentSegmentIndex(finalSegmentIndex);
          timeoutRef.current = null;
          return;
        }

        const easing = Math.pow(elapsed / duration, 2);
        const currentScrollTop = initialScrollTop + totalHeight * easing;
        element.scrollTop = currentScrollTop;
        setCurrentSegmentIndex(
          Math.floor(element.scrollTop / segmentHeight) % segments.length
        );

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, 0);
  };

  return (
    <>
      <div
        ref={scrollRef}
        className="w-80 h-80 aspect-square flex flex-col overflow-y-scroll no-scrollbar snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {repeatedSegments.map((segment, index) => (
          <div
            key={index}
            datatype={segment.name}
            className={`min-h-full 0 aspect-square segment flex justify-center align-center ${
              index % 2 ? "bg-slate-200" : "bg-slate-300"
            }`}
          >
            <img
              className="w-1/3 aspect-square"
              src={`/img/roles/${segment.name}.svg`}
              alt={segment.name}
            />
          </div>
        ))}
      </div>
      <button className="btn btn-neutral" onClick={handleRoll}>
        Roll
      </button>
      {selectedSegment && (
        <div className="mt-4">
          <h3>Segment sélectionné : {selectedSegment}</h3>
        </div>
      )}
    </>
  );
}

export default WheelFace;
