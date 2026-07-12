import * as proto from "./protodef";
import type {TriggerPacketLib,BuffLevel} from "./protodef";



export abstract class Gear implements  proto.GearCL {
    abstract gear: proto.GearInt;
    abstract initArray(tl: proto.Timeline): void;
}











type GearConstructor = new (host: string) => Gear;

const geararr: Record<string, GearConstructor> = {
    "GrizzledEdge":GrizzledEdge,
    "Xiranflow":Xiranflow,
    "Qingbo":Qingbo
};

export function GearDef(op: string): GearConstructor {
    return geararr[op];
}