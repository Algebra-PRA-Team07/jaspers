import { useCallback, useEffect, useRef, useState } from "react";

import { useEditorState } from "@/editor/editorState.ts";
import { STICKERS } from "@/lib/stickers.ts";

const maxKeyLength = Math.max(...Object.keys(STICKERS).map((it) => it.length));

export const useStickerHandler = () => {
    const listenerReference = useRef<(event: KeyboardEvent) => void | null>(null);
    const [keyState, setKeyState] = useState<string>("");
    const addNode = useEditorState.use._addNodeRaw();

    const onKeyPress = useCallback(
        (key: string) => {
            if (key.length !== 1) return;

            const newKeyState =
                keyState.length >= maxKeyLength
                    ? keyState.slice(-maxKeyLength) + key
                    : keyState + key;

            setKeyState(newKeyState);

            const match = Object.entries(STICKERS)
                .map(([k, v]) => ({ id: k, image: v }))
                .find((it) => newKeyState.endsWith(it.id));

            if (!match) return;

            console.log("spawning", match);

            addNode({
                id: match.id,
                type: "sticker",
                position: {
                    x: 200,
                    y: 200,
                },
                data: {
                    image: match.image,
                },
            });
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
