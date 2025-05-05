/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeProps } from "@xyflow/react";
import { ComponentType } from "react";

import { AdderNodeComponent, AdderSimulatorNode } from "@/editor/nodes/AdderNode.tsx";
import { ConstantNodeComponent, ConstantSimulatorNode } from "@/editor/nodes/ConstantNode.tsx";
import { GateNodeComponent, GateSimulatorNode } from "@/editor/nodes/GateNode.tsx";
import { AdderProperties } from "@/editor/properties/AdderProperties.tsx";
import { ConstantProperties } from "@/editor/properties/ConstantProperties.tsx";
import { GateProperties } from "@/editor/properties/GateProperties.tsx";
import { SimulatorNode } from "@/editor/types.ts";

type AnyNodeComponent = ComponentType<
    NodeProps & {
        data: any;
        type: any;
    }
>;
type AnyPropertiesComponent = ComponentType<{ node: any }>;

export interface NodeRegistration {
    component: AnyNodeComponent;
    properties: AnyPropertiesComponent;
    simulation: typeof SimulatorNode;
}

export const Nodes: Record<string, NodeRegistration> = {
    gate: {
        component: GateNodeComponent,
        properties: GateProperties,
        simulation: GateSimulatorNode,
    },
    constant: {
        component: ConstantNodeComponent,
        properties: ConstantProperties,
        simulation: ConstantSimulatorNode,
    },
    adder: {
        component: AdderNodeComponent,
        properties: AdderProperties,
        simulation: AdderSimulatorNode,
    },
};

export const getRegisteredNodesProperty = <K extends keyof NodeRegistration>(property: K) => {
    return Object.fromEntries(
        Object.entries(Nodes).map(([key, value]) => [key, value[property]]),
    ) as Record<string, NodeRegistration[K]>;
};
