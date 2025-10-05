import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Mountain, Layers, Flame, MapPin, Waves } from 'lucide-react'

interface FeatureSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (featureType: string) => void
  featureTypes: Array<{ value: string; label: string }>
}

const featureIcons: Record<string, any> = {
  'crater': MapPin,
  'tectonic': Layers,
  'volcano': Flame,
  'layered-deposit': Mountain,
  'fluvial-channel': Waves,
}

export default function FeatureSelectionDialog({
  open,
  onOpenChange,
  onConfirm,
  featureTypes,
}: FeatureSelectionDialogProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>('')

  const handleConfirm = () => {
    if (selectedFeature) {
      onConfirm(selectedFeature)
      setSelectedFeature('') // Reset for next time
    }
  }

  const handleCancel = () => {
    setSelectedFeature('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Feature Type</DialogTitle>
          <DialogDescription>
            Choose the type of geological feature you've identified
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Select value={selectedFeature} onValueChange={setSelectedFeature}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a feature type..." />
            </SelectTrigger>
            <SelectContent>
              {featureTypes.map((type) => {
                const Icon = featureIcons[type.value]
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedFeature}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
