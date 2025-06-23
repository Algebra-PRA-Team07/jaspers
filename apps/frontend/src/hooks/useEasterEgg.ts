import { useCallback, useEffect, useRef, useState } from "react";

import { useEditorState } from "@/editor/editorState.ts";

export const useEasterEgg = () => {
    const listenerReference = useRef<(event: KeyboardEvent) => void | null>(null);
    const [keyState, setKeyState] = useState<string[]>([]);
    const addNode = useEditorState.use._addNodeRaw();

    const onKeyPress = useCallback(
        (key: string) => {
            const newKeyState =
                keyState.length >= 3 ? [...keyState.slice(-2), key] : [...keyState, key];

            setKeyState(newKeyState);

            if (newKeyState.join("").slice(-3) === "a02") {
                addNode({
                    id: "02",
                    type: "borna",
                    position: {
                        x: 0,
                        y: 0,
                    },
                    data: {},
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
