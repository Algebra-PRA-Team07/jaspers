import { useCallback, useEffect, useRef, useState } from "react";

import { useEditorState } from "@/editor/editorState.ts";

const DEFAULT_NODE = {
    position: {
        x: 200,
        y: 200,
    },
    data: {},
};

export const useEasterEgg = () => {
    const listenerReference = useRef<(event: KeyboardEvent) => void | null>(null);
    const [keyState, setKeyState] = useState<string>("");
    const addNode = useEditorState.use._addNodeRaw();

    const onKeyPress = useCallback(
        (key: string) => {
            if (key.length !== 1) return;

            const newKeyState = keyState.length >= 3 ? keyState.slice(-3) + key : keyState + key;

            setKeyState(newKeyState);

            if (newKeyState.endsWith("a02")) {
                addNode({
                    id: "02",
                    type: "borna",
                    ...DEFAULT_NODE,
                });

                return;
            }

            if (newKeyState.endsWith("skib")) {
                addNode({
                    id: "skibidi",
                    type: "skibidi",
                    ...DEFAULT_NODE,
                });
            }
        },
        [addNode, keyState, setKeyState],
    );

    useEffect(() => {
        if (listenerReference.current !== null) {
            globalThis.removeEventListener("keyup", listenerReference.current);
        }

        const listener = (event: KeyboardEvent) => {
            onKeyPress(event.key);
        };

        listenerReference.current = listener;

        globalThis.addEventListener("keyup", listener);

        return () => {
            globalThis.removeEventListener("keyup", listener);
        };
    }, [onKeyPress]);
};
