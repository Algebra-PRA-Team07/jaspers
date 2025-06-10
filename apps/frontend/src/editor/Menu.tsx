import { FC } from "react";

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar.tsx";
import { useEditorState } from "@/editor/editorState.ts";

const Edit: FC = () => {
    const selectedNodes = useEditorState.use.selectedNodes();
    const createCustomNode = useEditorState.use.createCustomNode();

    return (
        <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                    onClick={() => createCustomNode()}
                    disabled={selectedNodes.length === 0}
                >
                    Create Custom Node
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

const View: FC = () => {
    const showProperties = useEditorState.use.showProperties();
    const toggleProperties = useEditorState.use.toggleProperties();

    return (
        <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
                <MenubarCheckboxItem checked={showProperties} onClick={() => toggleProperties()}>
                    Show Properties
                </MenubarCheckboxItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export const Menu: FC = () => {
    return (
        <div className="fixed top-0 left-0 w-screen p-4">
            <Menubar className="w-full flex">
                <div className="flex flex-1 justify-start space-x-4">
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>New Document</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Save</MenubarItem>
                            <MenubarItem>Save as...</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <Edit />

                    <MenubarMenu>
                        <MenubarTrigger>Simulation</MenubarTrigger>
                        <MenubarContent>
                            <MenubarCheckboxItem checked>Run Simulation</MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <View />
                </div>

                <div className="flex flex-1 justify-center space-x-4">
                    <span className="cursor-default select-none py-1 text-sm font-medium outline-none">
                        Document Name
                    </span>
                </div>

                <div className="flex flex-1 justify-end space-x-4">
                    <MenubarMenu>
                        <MenubarTrigger>Share</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Create link...</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </div>
            </Menubar>
        </div>
    );
};
