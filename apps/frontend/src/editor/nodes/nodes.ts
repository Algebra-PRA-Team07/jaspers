/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeProps } from "@xyflow/react";
import { ComponentType } from "react";

import { AdderNodeComponent, AdderSimulatorNode } from "@/editor/nodes/AdderNode.tsx";
import {
    ConstantNodeComponent,
    ConstantNodeData,
    ConstantSimulatorNode,
} from "@/editor/nodes/ConstantNode.tsx";
import { GateNodeComponent, GateNodeData, GateSimulatorNode } from "@/editor/nodes/GateNode.tsx";
import { AdderProperties } from "@/editor/properties/AdderProperties.tsx";
import { ConstantProperties } from "@/editor/properties/ConstantProperties.tsx";
import { GateProperties } from "@/editor/properties/GateProperties.tsx";
import { LogicNodeData, SimulatorNode } from "@/editor/types.ts";

type AnyNodeComponent = ComponentType<
    NodeProps & {
        data: any;
        type: any;
    }
>;

type AnyPropertiesComponent = ComponentType<{ node: any }>;

// ovo je taaaakav neeeredddd sveeee
export interface NodeRegistration {
    name: string;
    component: AnyNodeComponent;
    properties: AnyPropertiesComponent;
    simulation: typeof SimulatorNode;
    createData: () => LogicNodeData;
}

export const Nodes: Record<string, NodeRegistration> = {
    gate: {
        name: "Gate",
        component: GateNodeComponent,
        properties: GateProperties,
        simulation: GateSimulatorNode,
        createData: () =>
            ({
                gateType: "AND",
                negated: false,
            }) satisfies GateNodeData,
    },
    constant: {
        name: "Constant",
        component: ConstantNodeComponent,
        properties: ConstantProperties,
        simulation: ConstantSimulatorNode,
        createData: () =>
            ({
                desiredState: "off",
            }) satisfies ConstantNodeData,
    },
    adder: {
        name: "Half Adder",
        component: AdderNodeComponent,
        properties: AdderProperties,
        simulation: AdderSimulatorNode,
        createData: () => ({}),
    },
};

export const getRegisteredNodesProperty = <K extends keyof NodeRegistration>(property: K) => {
    return Object.fromEntries(
        Object.entries(Nodes).map(([key, value]) => [key, value[property]]),
    ) as Record<string, NodeRegistration[K]>;
};
