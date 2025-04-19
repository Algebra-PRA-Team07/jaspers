import { FC } from "react";

import { Canvas } from "../editor/Canvas.tsx";
import { Properties } from "../editor/Properties.tsx";

export const Editor: FC = () => {
    return (
        <>
            <Canvas />
            <Properties />
        </>
    );
};
