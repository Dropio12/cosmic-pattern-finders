import { Header } from "@/components/Header";
import { InteractiveMap } from "@/components/InteractiveMap";
import deepspaceMap from "@/assets/deepspace-map.jpg";

const deepspacePatterns = [
  { value: "galaxy", label: "Galaxy" },
  { value: "nebula", label: "Nebula" },
  { value: "star-cluster", label: "Star Cluster" },
  { value: "supernova", label: "Supernova Remnant" },
  { value: "black-hole", label: "Black Hole Candidate" },
  { value: "pulsar", label: "Pulsar" },
];

const DeepSpaceExplorer = () => {
  return (
    <>
      <Header />
      <div className="fixed inset-0 top-20 bg-background">
        <InteractiveMap 
          mapImage={deepspaceMap}
          title="Deep Space Pattern Explorer"
          patternOptions={deepspacePatterns}
        />
      </div>
    </>
  );
};

export default DeepSpaceExplorer;
