import { ButtonHTMLAttributes, FC } from "react";

import { useEditorState } from "./editorState.ts";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className,
    ...properties
}) => {
    return (
        <button className={`bg-zinc-800 p-2 rounded ${className}`} {...properties}>
            {children}
        </button>
    );
};

export const Properties: FC = () => {
    const { addNode } = useEditorState();

    return (
        <div className="fixed bottom-0 left-0 p-4">
            <div className="bg-zinc-900 p-3 rounded-lg shadow">
                <Button onClick={addNode}>Add Node</Button>
            </div>
        </div>
    );
};
