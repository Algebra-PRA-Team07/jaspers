/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeProps } from "@xyflow/react";
import { ComponentType } from "react";

import { ConstantProperties } from "../properties/ConstantProperties.tsx";
import { GateProperties } from "../properties/GateProperties.tsx";
import { SimulatorNode } from "../types.ts";
import { ConstantNodeComponent, ConstantSimulatorNode } from "./ConstantNode.tsx";
import { GateNodeComponent, GateSimulatorNode } from "./GateNode.tsx";

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
};

export const getRegisteredNodesProperty = <K extends keyof NodeRegistration>(property: K) => {
    return Object.fromEntries(
        Object.entries(Nodes).map(([key, value]) => [key, value[property]]),
    ) as Record<string, NodeRegistration[K]>;
};
