import { FC, useEffect } from "react";

import { Canvas } from "@/editor/Canvas.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { Menu } from "@/editor/Menu.tsx";
import { Properties } from "@/editor/Properties.tsx";
import { SimulatorControlBar } from "@/editor/SimulatorControlBar.tsx";
import { useAuthUser } from "@/hooks/useAuthUser.ts";
import { useLogout } from "@/hooks/useLogout.ts";

export const Editor: FC = () => {
    const showProperties = useEditorState.use.showProperties();

    const user = useAuthUser();

    const logout = useLogout();

    useEffect(() => {
        if (user !== null) return;

        logout();
    }, [user, logout]);

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
