import React, { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
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
import { useAuthUserUsklicnik } from "@/hooks/useAuthUserUsklicnik.ts";
import { useLogout } from "@/hooks/useLogout.ts";

const CustomNodeDialog: FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = React.memo(
    ({ open, onOpenChange }) => {
        const createCustomNode = useEditorState.use.createCustomNode();

        const [name, setName] = useState("My Custom Node");

        const onSubmit = useCallback(() => {
            createCustomNode(name);
            onOpenChange(false);
        }, [createCustomNode, name, onOpenChange]);

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Custom Node</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={onSubmit}>
                            Create & Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    },
);

const Edit: FC = () => {
    const selectedNodes = useEditorState.use.selectedNodes();
    const [customNodeDialogOpen, setCustomNodeDialogOpen] = useState(false);

    return (
        <>
            <CustomNodeDialog open={customNodeDialogOpen} onOpenChange={setCustomNodeDialogOpen} />
            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                        onClick={() => setCustomNodeDialogOpen(true)}
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
        </>
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
    const logout = useLogout();

    const user = useAuthUserUsklicnik();

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
                        <MenubarTrigger>
                            <span>
                                Welcome <span className={"font-bold"}>{user.name}</span>
                            </span>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={() => logout()}>Logout</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </div>
            </Menubar>
        </div>
    );
};
