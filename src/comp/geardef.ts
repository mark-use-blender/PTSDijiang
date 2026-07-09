import * as proto from "./protodef";
import type {TriggerPacketLib,BuffLevel} from "./protodef";


export abstract class Gear implements  proto.GearCL {
    abstract GearStats: proto.GearInt    
    abstract initArray(tl: proto.Timeline): void;
}

class GrizzledEdge  extends Gear {
    GearStats: proto.GearInt
    constructor(stat:proto.GearInt){
        super();
        this.GearStats = stat
    }
    initArray(tl: proto.Timeline): void{
        let bufflevel: BuffLevel[] = []
        tl["BuffArr"][(this.GearStats.Host.name+"PhysicalDMGDealt"+"GrizzledEdge")] = bufflevel;
    }
    tick(tl: proto.Timeline,offset:number): void{
        let curr = tl["TriggerPacketArr"][this.GearStats.Host.name][offset]
        let buff = 0;

        if ("ApplyCrush" in curr && curr["ApplyCrush"] > 0) {
            buff = curr["ApplyCrush"]*0.06;

        }
        else if("ApplyBreached" in curr && curr["ApplyBreached"] > 0){
            buff = curr["ApplyBreached"]*0.06;
        }

        if (buff > 0) {
            if (tl["BuffArr"]["PhysicalSusceptibility"][offset] > 0) {
                buff *= 1.5;
            }else if(tl["StateMachineArr"]["Staggered"][offset] > 0){
                buff *= 1.5;
            }else if(tl["StateMachineArr"]["OriginiumCrystals"][offset] > 0){
                buff *= 1.5;
            }
            let bufflevel: BuffLevel[] = tl["BuffArr"][(this.GearStats.Host.name+"PhysicalDMGDealt"+"GrizzledEdge")]

            for (let i = 0;i<(20*proto.StepMultiplier);i++){
                bufflevel[i+offset] = buff;
            }
            tl["BuffArr"][(this.GearStats.Host.name+"PhysicalDMGDealt"+"GrizzledEdge")]=bufflevel;

        }

    }
}

class Xiranflow  extends Gear {
    GearStats: proto.GearInt
    constructor(stat:proto.GearInt){
        super();
        this.GearStats = stat
    }
    initArray(tl: proto.Timeline): void{
        let bufflevel: BuffLevel[] = []
        tl["BuffArr"][(this.GearStats.Host.name+"ElectricDMGDealt"+"Xiranflow")] = bufflevel;
        tl["BuffArr"][(this.GearStats.Host.name+"NatureDMGDealt"+"Xiranflow")] = bufflevel;
    }
    tick(tl: proto.Timeline,offset:number): void{
        let curr = tl["TriggerPacketArr"][this.GearStats.Host.name][offset]
        let buff = 0;

        if ("ConsumeElectrification" in curr && curr["ConsumeElectrification"] > 0) {
            buff = 0.15;

        }
        else if ("ConsumeCorrosion" in curr && curr["ConsumeCorrosion"] > 0) {
            buff = 0.15;
        }

        if (buff > 0) {
           
            let bufflevelc: BuffLevel[] = tl["BuffArr"][(this.GearStats.Host.name+"ElectricDMGDealt"+"Xiranflow")]
            let buffleveln: BuffLevel[] = tl["BuffArr"][(this.GearStats.Host.name+"NatureDMGDealt"+"Xiranflow")]

            for (let i = 0;i<(25*proto.StepMultiplier);i++){
                bufflevelc[i+offset] = Math.min(bufflevelc[i+offset]+buff,0.45);
                buffleveln[i+offset] = Math.min(buffleveln[i+offset]+buff,0.45);
            }
            tl["BuffArr"][(this.GearStats.Host.name+"NatureDMGDealt"+"Xiranflow")]=buffleveln;
            tl["BuffArr"][(this.GearStats.Host.name+"ElectricDMGDealt"+"Xiranflow")]=bufflevelc;

        }

    }
}






type GearConstructor = new (stat: proto.GearInt) => Gear;

const geararr: Record<string, GearConstructor> = {
    "GrizzledEdge":GrizzledEdge,
    "Xiranflow":Xiranflow
};

export function OperatorDef(op: string): GearConstructor | undefined {
    return geararr[op];
}