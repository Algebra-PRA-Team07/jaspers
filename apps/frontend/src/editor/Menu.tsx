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

                    <MenubarMenu>
                        <MenubarTrigger>Edit</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Undo</MenubarItem>
                            <MenubarItem>Redo</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Cut</MenubarItem>
                            <MenubarItem>Copy</MenubarItem>
                            <MenubarItem>Paste</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>Simulation</MenubarTrigger>
                        <MenubarContent>
                            <MenubarCheckboxItem checked>Run Simulation</MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>View</MenubarTrigger>
                        <MenubarContent>
                            <MenubarCheckboxItem checked>Show Properties</MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>
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
