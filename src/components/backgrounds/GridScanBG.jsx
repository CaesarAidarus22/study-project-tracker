import { GridScan } from "./GridScan";

export default function GridScanBG() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Base dark purple */}
      <div className="absolute inset-0 bg-[#070316]" />

      {/* ReactBits-style glow blobs */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(900px circle at 20% 10%, rgba(255,159,252,0.20), transparent 60%),
            radial-gradient(800px circle at 80% 25%, rgba(140,110,255,0.18), transparent 60%),
            radial-gradient(900px circle at 50% 85%, rgba(90,200,255,0.10), transparent 65%)
          `,
        }}
      />

      {/* GridScan effect */}
      <div className="absolute inset-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.35}
          enablePost
          bloomIntensity={0.75}
          bloomThreshold={0}
          bloomSmoothing={0}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          scanGlow={0.55}
          scanSoftness={2}
          scanPhaseTaper={0.9}
          scanDuration={2.2}
          scanDelay={2.0}
          lineJitter={0.1}
          scanDirection="pingpong"
          enableWebcam={false}
          showPreview={false}
        />
      </div>
    </div>
  );
}