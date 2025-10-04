import { Header } from "@/components/Header";
import { InteractiveMap } from "@/components/InteractiveMap";
import marsMap from "@/assets/mars-map.jpg";

const marsPatterns = [
  { value: "crater", label: "Impact Crater" },
  { value: "geological", label: "Geological Layer" },
  { value: "aeolian", label: "Aeolian Feature" },
  { value: "fluvial", label: "Fluvial Channel" },
  { value: "volcanic", label: "Volcanic Structure" },
  { value: "tectonic", label: "Tectonic Pattern" },
];

const MarsExplorer = () => {
  return (
    <>
      <Header />
      <div className="fixed inset-0 top-20 bg-background">
        <InteractiveMap 
          mapImage={marsMap}
          title="Mars Pattern Explorer"
          patternOptions={marsPatterns}
        />
      </div>
    </>
  );
};

export default MarsExplorer;
