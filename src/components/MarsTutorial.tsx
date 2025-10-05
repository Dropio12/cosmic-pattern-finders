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
        <p>In this tool, you'll help identify and label geological features on Mars. Your contributions will aid scientists in understanding Martian geology and history.</p>
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
        <p>This is your interactive Mars surface map. Use your mouse wheel or touchpad to zoom in and out. Click and drag to pan around and explore different regions.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '#coordinates-panel',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Coordinates Panel</h3>
        <p>This panel shows your current location on Mars. Move your mouse around the map to see the coordinates update in real-time.</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Drawing Bounding Boxes</h3>
        <p>To label a feature, you'll draw bounding boxes around geological formations. Click on the map to set corners and create boxes around features like craters, channels, or volcanic structures.</p>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Identifying Features</h3>
        <p>Look for distinctive geological formations:</p>
        <div className="space-y-3 mt-4">
          <div className="flex gap-3 items-start">
            <img src={craterExample} alt="Impact Crater" className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <strong>Impact Craters:</strong>
              <p className="text-sm">Circular depressions with raised rims</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <img src={tectonicExample} alt="Tectonic Pattern" className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <strong>Tectonic Patterns:</strong>
              <p className="text-sm">Linear features showing crustal movement</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <img src={volcanoExample} alt="Volcanic Structure" className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <strong>Volcanic Structures:</strong>
              <p className="text-sm">Dome-shaped formations</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <img src={depositExample} alt="Layered Deposit" className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <strong>Layered Deposits:</strong>
              <p className="text-sm">Visible stratification</p>
            </div>
          </div>
        </div>
      </div>
    ),
    placement: 'center',
  },
  {
    target: 'body',
    content: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">You're Ready!</h3>
        <p>Every label you create helps build a comprehensive database of Martian geology and supports NASA mission planning. Thank you for contributing to space exploration! 🚀</p>
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
