import React, { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { CustomNodeData } from "@/editor/nodes/CustomNode.tsx";
import { Nodes, NodeType } from "@/editor/nodes/nodes.ts";

export const NewGateButton: FC = React.memo(() => {
    const addNode = useEditorState.use.addNode();
    const addCustomNode = useEditorState.use.addCustomNode();
    const customNodes = useEditorState.use.customNodes();

    const [open, setOpen] = useState(false);

    const selectBuiltIn = useCallback(
        (nodeType: NodeType) => {
            addNode(nodeType);
            setOpen(false);
        },
        [addNode],
    );

    const selectCustom = useCallback(
        (customNode: CustomNodeData) => {
            addCustomNode(customNode);
            setOpen(false);
        },
        [addCustomNode],
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
                        <CommandGroup heading={"Built-in"}>
                            {Object.entries(Nodes)
                                .filter(([node]) => node !== "custom")
                                .map(([node, registration]) => (
                                    <CommandItem
                                        key={registration.name}
                                        value={node}
                                        onSelect={(type) => selectBuiltIn(type as NodeType)}
                                    >
                                        {registration.name}
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading={"Document"}>
                            {customNodes.map((customNode) => (
                                <CommandItem
                                    key={customNode.id}
                                    onSelect={() => selectCustom(customNode)}
                                >
                                    {customNode.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});
