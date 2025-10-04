import { Header } from "@/components/Header";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import marsMap from "@/assets/mars-map.jpg";
import deepspaceMap from "@/assets/deepspace-map.jpg";

const marsPatterns = [
  { value: "crater", label: "Impact Crater" },
  { value: "geological", label: "Geological Layer" },
  { value: "aeolian", label: "Aeolian Feature" },
  { value: "fluvial", label: "Fluvial Channel" },
  { value: "volcanic", label: "Volcanic Structure" },
  { value: "tectonic", label: "Tectonic Pattern" },
];

const deepspacePatterns = [
  { value: "galaxy", label: "Galaxy" },
  { value: "nebula", label: "Nebula" },
  { value: "star-cluster", label: "Star Cluster" },
  { value: "supernova", label: "Supernova Remnant" },
  { value: "black-hole", label: "Black Hole Candidate" },
  { value: "pulsar", label: "Pulsar" },
];

const Explore = () => {
  return (
    <>
      <Header />
      <div className="fixed inset-0 top-20 bg-background flex flex-col">
        <Tabs defaultValue="mars" className="flex-1 flex flex-col">
          <div className="glass-card border-b border-border/50 px-6 py-3">
            <TabsList className="glass-card">
              <TabsTrigger value="mars">Mars Explorer</TabsTrigger>
              <TabsTrigger value="deepspace">Deep Space Explorer</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="mars" className="flex-1 m-0">
            <InteractiveMap 
              mapImage={marsMap}
              title="Mars Pattern Explorer"
              patternOptions={marsPatterns}
            />
          </TabsContent>
          
          <TabsContent value="deepspace" className="flex-1 m-0">
            <InteractiveMap 
              mapImage={deepspaceMap}
              title="Deep Space Pattern Explorer"
              patternOptions={deepspacePatterns}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Explore;
