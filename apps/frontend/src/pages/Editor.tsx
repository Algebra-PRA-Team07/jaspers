import { FC } from "react";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import { Canvas } from "@/editor/Canvas.tsx";
import { Properties } from "@/editor/Properties.tsx";

export const Editor: FC = () => {
    return (
        <ResizablePanelGroup direction="horizontal" className="!h-screen">
            <ResizablePanel defaultSize={35}>
                <Properties />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65}>
                <Canvas />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};
