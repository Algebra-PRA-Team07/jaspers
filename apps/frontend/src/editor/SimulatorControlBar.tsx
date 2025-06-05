import { Pause, Play, RotateCcw, SkipForward, Square } from "lucide-react";
import { FC, useCallback } from "react";

import { Button } from "@/components/ui/button.tsx";
import { useEditorState } from "@/editor/editorState.ts";

export const SimulatorControlBar: FC = () => {
    const simulatorState = useEditorState.use.simulatorState();
    const restartSimulation = useEditorState.use.restartSimulation();
    const pauseSimulation = useEditorState.use.pauseSimulation();
    const continueSimulation = useEditorState.use.continueSimulation();
    const stopSimulation = useEditorState.use.stopSimulation();

    const onPlayPause = useCallback(() => {
        switch (simulatorState) {
            case "stopped": {
                restartSimulation();
                break;
            }
            case "running": {
                pauseSimulation();
                break;
            }
            case "paused": {
                continueSimulation();
                break;
            }
        }
    }, [continueSimulation, pauseSimulation, restartSimulation, simulatorState]);

    return (
        <div className="bg-card border rounded-md shadow p-1 gap-3 pointer-events-auto">
            <Button variant="ghost" onClick={onPlayPause}>
                {simulatorState === "running" ? <Pause /> : <Play />}
            </Button>

            <Button
                variant="ghost"
                disabled={simulatorState === "stopped"}
                onClick={stopSimulation}
            >
                <Square />
            </Button>

            <Button variant={"ghost"}>
                <SkipForward />
            </Button>

            <Button
                variant="ghost"
                disabled={simulatorState === "stopped"}
                onClick={restartSimulation}
            >
                <RotateCcw />
            </Button>
        </div>
    );
};
