import type * as proto from "./protodef";

export abstract class Wepons implements  proto.WeponCL {
    abstract WeponStats:proto.WeponInt; 
    abstract Host:string;
    abstract name: string 
    abstract initArray(tl: proto.Timeline): void;
    abstract applyweponstats(Attribute:{"Strength":number,"Agility":number,"Intellect":number,"Will":number}, Stats:{"HP":number,"Attack":number,"Defence":number}):void;
}









type WeponConstructor = new (stat: proto.WeponInt) => Wepons;

const weparr: Record<string, WeponConstructor> = {

};

export function WeponDef(op: string): WeponConstructor {
    return weparr[op];
}


