export type GateType = "and" | "or" | "not" | "xor";

// temporary type
export type Gate = {
    id: number;
    type: GateType;
    no_operands: number;
};
