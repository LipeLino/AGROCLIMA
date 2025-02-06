"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipBack, Download } from "lucide-react";
import { TimelineState } from "@/lib/types/weather";
import { DateRangePicker } from "./DateRangePicker";

interface TimelineControlProps {
  onTimeChange: (date: Date) => void;
  onExportData: () => void;
  timelineState: TimelineState;
  setTimelineState: (state: TimelineState) => void;
}

export function TimelineControl({
  onTimeChange,
  onExportData,
  timelineState,
  setTimelineState,
}: TimelineControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSliderChange = (value: number[]) => {
    const totalTime = timelineState.endDate.getTime() - timelineState.startDate.getTime();
    const newTime = timelineState.startDate.getTime() + (totalTime * value[0]) / 100;
    const newDate = new Date(newTime);
    setTimelineState({ ...timelineState, currentDate: newDate });
    onTimeChange(newDate);
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setTimelineState({
      startDate: start,
      endDate: end,
      currentDate: start,
    });
    onTimeChange(start);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimeline = () => {
    setTimelineState({ ...timelineState, currentDate: timelineState.startDate });
    setIsPlaying(false);
  };

  return (
    <Card className="p-4 space-y-4">
      <DateRangePicker
        startDate={timelineState.startDate}
        endDate={timelineState.endDate}
        onRangeChange={handleDateRangeChange}
      />
      
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetTimeline}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={onExportData}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar Dados
        </Button>
      </div>
      
      <div className="pt-2">
        <Slider
          defaultValue={[0]}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>{timelineState.startDate.toLocaleDateString()}</span>
        <span>{timelineState.currentDate.toLocaleDateString()}</span>
        <span>{timelineState.endDate.toLocaleDateString()}</span>
      </div>
    </Card>
  );
}