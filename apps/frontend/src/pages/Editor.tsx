import { FC, useEffect } from "react";
import { useNavigate } from "react-router";

import { Canvas } from "@/editor/Canvas.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { Menu } from "@/editor/Menu.tsx";
import { Properties } from "@/editor/Properties.tsx";
import { SimulatorControlBar } from "@/editor/SimulatorControlBar.tsx";

export const Editor: FC = () => {
    const showProperties = useEditorState.use.showProperties();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) navigate("/auth/login");
    }, [navigate]);

    return (
        <>
            <Canvas />

            <div className="fixed top-0 left-0 h-screen p-4 pt-16 flex items-start gap-3 pointer-events-none">
                {showProperties && <Properties />}
                <SimulatorControlBar />
            </div>

            <Menu />
        </>
    );
};
