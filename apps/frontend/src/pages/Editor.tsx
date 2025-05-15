import { FC } from "react";

import { Canvas } from "@/editor/Canvas.tsx";
import { Menu } from "@/editor/Menu.tsx";
import { Properties } from "@/editor/Properties.tsx";

export const Editor: FC = () => {
    return (
        <>
            <Canvas />
            <Properties />
            <Menu />
        </>
    );
};
