import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Mars Explorer!",
    content: "In this tool, you'll help identify and label geological features on Mars. Your contributions will aid scientists in understanding Martian geology and history."
  },
  {
    title: "Drawing Bounding Boxes",
    content: "To label a feature, click the 'Start Drawing' button, then click on the map to set the first corner of your bounding box. Click again to set the opposite corner. The box will automatically be created between these two points."
  },
  {
    title: "Identifying Features",
    content: "Look for distinctive geological formations on the Mars surface:\n\n• Impact Craters: Circular depressions with raised rims\n• Tectonic Patterns: Linear features showing crustal movement\n• Volcanic Structures: Dome-shaped formations or calderas\n• Layered Deposits: Visible stratification in the terrain"
  },
  {
    title: "Best Practices",
    content: "For the most accurate labeling:\n\n• Zoom in close to see details clearly\n• Draw boxes that tightly fit the feature\n• Use the coordinates panel to record exact locations\n• Add notes about distinctive characteristics\n• If unsure, make your best guess - multiple labels help scientists validate findings"
  },
  {
    title: "Navigation & Tools",
    content: "Use the map controls:\n\n• Mouse wheel or touchpad to zoom\n• Click and drag to pan around Mars\n• Use Ctrl+Scroll for finer zoom control\n• The coordinates panel shows your current location\n• Save your progress regularly"
  },
  {
    title: "Contributing to Science",
    content: "Every label you create helps:\n\n• Build a comprehensive database of Martian geology\n• Train AI models to identify features automatically\n• Support NASA mission planning\n• Advance our understanding of planetary formation\n\nThank you for contributing to space exploration!"
  }
];

interface MarsTutorialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MarsTutorial = ({ open, onOpenChange }: MarsTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetStarted = () => {
    onOpenChange(false);
    setCurrentStep(0);
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white -m-6 mb-4 p-4 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold text-center">TUTORIAL</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2">
          {/* Content */}
          <div className="min-h-[300px] space-y-4">
            <h3 className="text-xl font-semibold">{currentStepData.title}</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {currentStepData.content}
            </p>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-2 py-4">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-cyan-500 scale-125' 
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep === tutorialSteps.length - 1 ? (
              <Button
                onClick={handleGetStarted}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8"
              >
                Get Started
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={handleNext}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const TutorialButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      size="sm"
      className="fixed bottom-24 right-6 z-[1000] glass-card shadow-lg gap-2"
    >
      <HelpCircle className="w-4 h-4" />
      Tutorial
    </Button>
  );
};
