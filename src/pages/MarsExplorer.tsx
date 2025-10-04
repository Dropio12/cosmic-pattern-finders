import { MarsLeafletMap } from "@/components/MarsLeafletMap";

const marsPatterns = [
  { value: "crater", label: "Impact Crater" },
  { value: "complex-crater", label: "Complex Crater" },
  { value: "crater-chain", label: "Crater Chain" },
  { value: "geological", label: "Geological Layer" },
  { value: "aeolian", label: "Aeolian Feature (Wind)" },
  { value: "dunes", label: "Sand Dunes" },
  { value: "dust-devil", label: "Dust Devil Track" },
  { value: "fluvial", label: "Fluvial Channel" },
  { value: "valley-network", label: "Valley Network" },
  { value: "outflow", label: "Outflow Channel" },
  { value: "volcanic", label: "Volcanic Structure" },
  { value: "lava-flow", label: "Lava Flow" },
  { value: "caldera", label: "Volcanic Caldera" },
  { value: "tectonic", label: "Tectonic Pattern" },
  { value: "graben", label: "Graben/Fault" },
  { value: "wrinkle-ridge", label: "Wrinkle Ridge" },
  { value: "polar-ice", label: "Polar Ice Cap" },
  { value: "layered-deposit", label: "Layered Deposit" },
  { value: "landslide", label: "Landslide/Mass Wasting" },
  { value: "erosion", label: "Erosion Pattern" },
  { value: "gully", label: "Gully Formation" },
  { value: "recurring-slope", label: "Recurring Slope Lineae (RSL)" },
];

const MarsExplorer = () => {
  return <MarsLeafletMap patternOptions={marsPatterns} />;
};

export default MarsExplorer;
