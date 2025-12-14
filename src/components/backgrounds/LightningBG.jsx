import Lightning from "./Lightning";

export default function LightningBG() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Warna ORIGINAL: default hue=230 */}
        <Lightning speed={0.9} intensity={1} size={1} xOffset={0} />
      </div>
    </div>
  );
}