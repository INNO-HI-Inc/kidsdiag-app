"use client";

interface RadarPoint {
  label: string;
  value: number; // 0~1
}

interface RadarChartProps {
  data: RadarPoint[];
  size?: number;
  color?: string;
  showLabels?: boolean;
}

/* SVG Radar Chart — pure SVG, 평가검사 결과 시각화용 */
export default function RadarChart({ data, size = 280, color = "#15c480", showLabels = true }: RadarChartProps) {
  if (data.length < 3) return null;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.7;
  const n = data.length;

  // 각도 (top start)
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  // 정점 좌표
  const point = (i: number, value: number) => {
    const a = angle(i);
    return {
      x: cx + Math.cos(a) * r * value,
      y: cy + Math.sin(a) * r * value,
    };
  };

  // 그리드 (원 4개)
  const grids = [0.25, 0.5, 0.75, 1.0];

  // 데이터 폴리곤
  const polygonPoints = data.map((d, i) => {
    const p = point(i, d.value);
    return `${p.x},${p.y}`;
  }).join(" ");

  // 라벨 위치 (외곽 살짝 바깥)
  const labelPoint = (i: number) => {
    const a = angle(i);
    return {
      x: cx + Math.cos(a) * (r + 18),
      y: cy + Math.sin(a) * (r + 18),
    };
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block mx-auto">
      {/* 그리드 폴리곤 */}
      {grids.map((g) => {
        const pts = data.map((_, i) => {
          const p = point(i, g);
          return `${p.x},${p.y}`;
        }).join(" ");
        return (
          <polygon
            key={g}
            points={pts}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        );
      })}

      {/* 축 라인 */}
      {data.map((_, i) => {
        const p = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e0e0e0" strokeWidth="1" />;
      })}

      {/* 데이터 폴리곤 (채움) */}
      <polygon
        points={polygonPoints}
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* 데이터 정점 */}
      {data.map((d, i) => {
        const p = point(i, d.value);
        return (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="2" />
        );
      })}

      {/* 라벨 */}
      {showLabels && data.map((d, i) => {
        const lp = labelPoint(i);
        const a = angle(i);
        const anchor = Math.abs(Math.cos(a)) < 0.1 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
        const dy = Math.sin(a) > 0.5 ? "0.7em" : Math.sin(a) < -0.5 ? "-0.2em" : "0.35em";
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            fontSize="11"
            fontWeight="600"
            fill="#1a1d1f"
            textAnchor={anchor}
            dy={dy}
          >
            {d.label}
          </text>
        );
      })}

      {/* 중심 점수 */}
      <circle cx={cx} cy={cy} r="3" fill="#1a1d1f" />
    </svg>
  );
}
