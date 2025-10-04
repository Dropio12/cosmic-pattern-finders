import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import MarsExplorer from "./pages/MarsExplorer";
import DeepSpaceExplorer from "./pages/DeepSpaceExplorer";
import Guide from "./pages/Guide";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import FormationsOverview from "./pages/formations/FormationsOverview";
import GeologicalLayers from "./pages/formations/GeologicalLayers";
import ImpactCraters from "./pages/formations/ImpactCraters";
import AeolianFeatures from "./pages/formations/AeolianFeatures";
import FluvialChannels from "./pages/formations/FluvialChannels";
import VolcanicStructures from "./pages/formations/VolcanicStructures";
import TectonicPatterns from "./pages/formations/TectonicPatterns";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/mars" element={<MarsExplorer />} />
          <Route path="/explore/deepspace" element={<DeepSpaceExplorer />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/formations" element={<FormationsOverview />} />
          <Route path="/formations/geological-layers" element={<GeologicalLayers />} />
          <Route path="/formations/impact-craters" element={<ImpactCraters />} />
          <Route path="/formations/aeolian-features" element={<AeolianFeatures />} />
          <Route path="/formations/fluvial-channels" element={<FluvialChannels />} />
          <Route path="/formations/volcanic-structures" element={<VolcanicStructures />} />
          <Route path="/formations/tectonic-patterns" element={<TectonicPatterns />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
