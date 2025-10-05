import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import craterExample from '@/assets/crater-example.png';
import tectonicExample from '@/assets/tectonic-example.png';
import volcanoExample from '@/assets/volcano-example.png';
import depositExample from '@/assets/deposit-example.png';

interface MarsTutorialProps {
  run: boolean;
  onFinish: () => void;
}

const steps: Step[] = [
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-primary">Welcome to Mars Explorer!</h3>
        <p>Help scientists identify geological features on Mars! Your contributions will aid in understanding Martian geology and support future missions.</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '#mars-map',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">The Mars Map</h3>
        <p>This interactive map shows the real surface of Mars from NASA imagery. Use your mouse wheel to zoom and drag to pan around different regions.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '#feature-selector',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Feature Selector</h3>
        <p>First, select the type of geological feature you want to label. Choose from Impact Craters, Tectonic Patterns, Volcanic Structures, or Layered Deposits.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '#coordinates-panel',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Coordinates Panel</h3>
        <p>This panel shows your current location on Mars in latitude and longitude. The coordinates update as you move your mouse.</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-bold text-primary">Impact Craters</h3>
        <img src={craterExample} alt="Impact Crater Example" className="w-full h-48 object-cover rounded-lg shadow-lg" />
        <div className="space-y-2">
          <p className="font-semibold">How to identify:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Circular or elliptical depressions</li>
            <li>Raised rim around the edge</li>
            <li>Often has a central peak or flat floor</li>
            <li>Ejecta blanket surrounding the crater</li>
          </ul>
        </div>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-bold text-primary">Tectonic Patterns</h3>
        <img src={tectonicExample} alt="Tectonic Pattern Example" className="w-full h-48 object-cover rounded-lg shadow-lg" />
        <div className="space-y-2">
          <p className="font-semibold">How to identify:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Linear or curved fault lines</li>
            <li>Parallel ridge systems (graben)</li>
            <li>Wrinkle ridges showing compression</li>
            <li>Evidence of crustal movement</li>
          </ul>
        </div>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-bold text-primary">Volcanic Structures</h3>
        <img src={volcanoExample} alt="Volcanic Structure Example" className="w-full h-48 object-cover rounded-lg shadow-lg" />
        <div className="space-y-2">
          <p className="font-semibold">How to identify:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Dome or cone-shaped mountains</li>
            <li>Caldera (collapsed summit crater)</li>
            <li>Radial lava flow patterns</li>
            <li>Smooth flanks from lava flows</li>
          </ul>
        </div>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-bold text-primary">Layered Deposits</h3>
        <img src={depositExample} alt="Layered Deposit Example" className="w-full h-48 object-cover rounded-lg shadow-lg" />
        <div className="space-y-2">
          <p className="font-semibold">How to identify:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Visible horizontal stratification</li>
            <li>Different colored or textured layers</li>
            <li>Often found in canyon walls or cliffs</li>
            <li>Evidence of sedimentary processes</li>
          </ul>
        </div>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">How to Label Features</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Select a feature type from the left panel</li>
          <li>Click "Add Feature" button on the top right</li>
          <li>Click twice on the map to draw a bounding box around the feature</li>
          <li>Your label will be saved automatically!</li>
        </ol>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">You're Ready to Explore Mars! 🚀</h3>
        <p>Every label you create helps build a comprehensive database of Martian geology. Your contributions support NASA mission planning and scientific research.</p>
        <p className="text-sm text-muted-foreground">Start exploring and labeling features to earn points on the leaderboard!</p>
      </div>
    ),
    placement: 'center',
  },
];

export const MarsTutorial = ({ run, onFinish }: MarsTutorialProps) => {
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      onFinish();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#06b6d4',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: '12px',
          padding: '20px',
        },
        tooltipContent: {
          padding: '10px 0',
        },
        buttonNext: {
          backgroundColor: '#06b6d4',
          borderRadius: '8px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#64748b',
          marginRight: '10px',
        },
        buttonSkip: {
          color: '#64748b',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Done',
        next: 'Next',
        skip: 'Skip',
      }}
    />
  );
};

export const TutorialButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      size="icon"
      className="fixed bottom-24 right-6 z-[1000] glass-card shadow-lg"
    >
      <HelpCircle className="w-5 h-5" />
    </Button>
  );
};
