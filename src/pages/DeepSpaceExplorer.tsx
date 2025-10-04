import { Header } from "@/components/Header";
import { InteractiveMap } from "@/components/InteractiveMap";
import deepspaceMap from "@/assets/deepspace-map.jpg";

const deepspacePatterns = [
  { value: "galaxy", label: "Galaxy" },
  { value: "spiral-galaxy", label: "Spiral Galaxy" },
  { value: "elliptical-galaxy", label: "Elliptical Galaxy" },
  { value: "irregular-galaxy", label: "Irregular Galaxy" },
  { value: "galaxy-cluster", label: "Galaxy Cluster" },
  { value: "galaxy-collision", label: "Galaxy Collision/Merger" },
  { value: "nebula", label: "Nebula" },
  { value: "emission-nebula", label: "Emission Nebula" },
  { value: "reflection-nebula", label: "Reflection Nebula" },
  { value: "planetary-nebula", label: "Planetary Nebula" },
  { value: "dark-nebula", label: "Dark Nebula" },
  { value: "star-cluster", label: "Star Cluster" },
  { value: "open-cluster", label: "Open Star Cluster" },
  { value: "globular-cluster", label: "Globular Cluster" },
  { value: "supernova", label: "Supernova Remnant" },
  { value: "nova", label: "Nova" },
  { value: "black-hole", label: "Black Hole Candidate" },
  { value: "pulsar", label: "Pulsar" },
  { value: "quasar", label: "Quasar" },
  { value: "active-galactic-nucleus", label: "Active Galactic Nucleus (AGN)" },
  { value: "gravitational-lens", label: "Gravitational Lensing" },
  { value: "exoplanet", label: "Exoplanet Transit" },
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
          explorerType="deepspace"
        />
      </div>
    </>
  );
};

export default DeepSpaceExplorer;
