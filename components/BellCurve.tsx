"use client";

interface BellCurveProps {
  percentile: number; // 0~100, 상위 N% (작을수록 잘함)
  width?: number;
  height?: number;
  color?: string;
}

/* SVG 종 분포 (정규분포 곡선) + 학생 위치 마커 */
export default function BellCurve({ percentile, width = 320, height = 140, color = "#15c480" }: BellCurveProps) {
  // 학생 위치는 백분위 기반 (상위 27%면 우측에서 27% 지점)
  // 즉, percentile이 작을수록 우측 (잘함)
  const studentX = ((100 - percentile) / 100) * width;

  // 정규분포 path 생성 (간이 표현)
  function bellPath() {
    const points = [];
    const cx = width / 2;
    const sigma = width / 6; // standard deviation in pixels
    const peakHeight = height - 10;
    for (let x = 0; x <= width; x += 4) {
      const y = peakHeight - Math.exp(-Math.pow((x - cx) / sigma, 2) / 2) * (peakHeight - 8);
      points.push(`${x},${y}`);
    }
    return `M0,${height} L${points.join(" L")} L${width},${height} Z`;
  }

  // 학생 위치의 곡선 y 좌표
  const cx = width / 2;
  const sigma = width / 6;
  const peakHeight = height - 10;
  const studentY = peakHeight - Math.exp(-Math.pow((studentX - cx) / sigma, 2) / 2) * (peakHeight - 8);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height + 28}`} className="block">
      {/* 곡선 채움 */}
      <path d={bellPath()} fill={color} fillOpacity="0.12" />
      <path d={bellPath()} fill="none" stroke={color} strokeWidth="2" />

      {/* 평균선 */}
      <line x1={cx} y1={20} x2={cx} y2={height} stroke="#9e9e9e" strokeWidth="1" strokeDasharray="3 3" />
      <text x={cx} y={14} fontSize="10" fontWeight="600" fill="#9e9e9e" textAnchor="middle">평균</text>

      {/* 학생 위치 마커 */}
      <line x1={studentX} y1={studentY - 2} x2={studentX} y2={height} stroke={color} strokeWidth="2" />
      <circle cx={studentX} cy={studentY} r="6" fill={color} stroke="white" strokeWidth="3" />
      <rect x={studentX - 30} y={height + 4} width="60" height="20" rx="10" fill={color} />
      <text x={studentX} y={height + 18} fontSize="11" fontWeight="700" fill="white" textAnchor="middle">
        우리 아이
      </text>

      {/* 좌우 라벨 */}
      <text x="4" y={height - 2} fontSize="9" fill="#9e9e9e" fontWeight="500">하위</text>
      <text x={width - 4} y={height - 2} fontSize="9" fill="#9e9e9e" fontWeight="500" textAnchor="end">상위</text>
    </svg>
  );
}
