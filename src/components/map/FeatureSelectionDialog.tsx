import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MapPin, Mountain, Layers, Droplets, Activity } from "lucide-react"

interface FeatureSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (featureType: string) => void
  featureTypes: Array<{ value: string; label: string }>
}

const getFeatureIcon = (value: string) => {
  switch (value) {
    case "crater":
      return <MapPin className="w-4 h-4" />
    case "volcano":
      return <Mountain className="w-4 h-4" />
    case "layered-deposit":
      return <Layers className="w-4 h-4" />
    case "fluvial-channel":
      return <Droplets className="w-4 h-4" />
    case "tectonic":
      return <Activity className="w-4 h-4" />
    default:
      return <MapPin className="w-4 h-4" />
  }
}

export default function FeatureSelectionDialog({
  open,
  onOpenChange,
  onConfirm,
  featureTypes,
}: FeatureSelectionDialogProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>("")

  const handleConfirm = () => {
    if (selectedFeature) {
      const feature = featureTypes.find(f => f.value === selectedFeature)
      onConfirm(feature?.label || selectedFeature)
      setSelectedFeature("")
    }
  }

  const handleCancel = () => {
    setSelectedFeature("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Feature Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="feature-type" className="text-sm font-medium">
              What type of geological feature did you identify?
            </label>
            <Select value={selectedFeature} onValueChange={setSelectedFeature}>
              <SelectTrigger id="feature-type">
                <SelectValue placeholder="Choose a feature type..." />
              </SelectTrigger>
              <SelectContent>
                {featureTypes.map((feature) => (
                  <SelectItem key={feature.value} value={feature.value}>
                    <div className="flex items-center gap-2">
                      {getFeatureIcon(feature.value)}
                      <span>{feature.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedFeature}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
