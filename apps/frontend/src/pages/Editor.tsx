import { FC } from "react";

import { Canvas } from "@/editor/Canvas.tsx";
import { Menu } from "@/editor/Menu.tsx";
import { Properties } from "@/editor/Properties.tsx";
import { SimulatorControlBar } from "@/editor/SimulatorControlBar.tsx";

export const Editor: FC = () => {
    return (
        <>
            <Canvas />

            <div className="fixed top-0 left-0 h-screen p-4 pt-16 flex items-start gap-3 pointer-events-none">
                <Properties />
                <SimulatorControlBar />
            </div>

            <Properties />
            <Menu />
        </>
    );
};
