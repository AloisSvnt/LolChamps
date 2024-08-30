type Segment = {
  name: string;
};

export const spinWheel = (
  isSpinning: boolean,
  setIsSpinning: Function,
  setRotation: Function,
  setSelectedSegment: Function,
  segments: Array<Segment>,
  degrees: number,
  setDegrees: Function
) => {
  if (isSpinning) return;

  setIsSpinning(true);
  const randomSpin = Math.floor(Math.random() * 5) + 5;
  setDegrees(degrees += randomSpin * 360 + Math.floor(Math.random() * 360));

  console.log(degrees);

  setRotation(degrees);

  setTimeout(() => {
    setIsSpinning(false);
    const normalizedDegrees = degrees % 360;
    const segmentDegrees = 360 / segments.length;
    const segmentIndex = Math.floor(normalizedDegrees / segmentDegrees);
    setSelectedSegment(segments[segmentIndex].name);
  }, 5000);
};