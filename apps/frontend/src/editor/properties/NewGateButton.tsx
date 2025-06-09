import React, { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { Nodes } from "@/editor/nodes/nodes.ts";

export const NewGateButton: FC = React.memo(() => {
    const createNode = useEditorState.use.createNode();

    const [open, setOpen] = useState(false);

    const onSelect = useCallback(
        (nodeType: string) => {
            createNode(nodeType);
            setOpen(false);
        },
        [createNode],
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">Add Node</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Type a node name or search..." />
                    <CommandList>
                        <CommandEmpty>No nodes found.</CommandEmpty>
                        <CommandGroup>
                            {Object.entries(Nodes)
                                .filter(([node]) => node !== "custom")
                                .map(([node, registration]) => (
                                    <CommandItem
                                        key={registration.name}
                                        value={node}
                                        onSelect={onSelect}
                                    >
                                        {registration.name}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});
