import * as proto from "./protodef";
import type {TriggerPacketLib,BuffLevel} from "./protodef";


export abstract class Gear implements  proto.GeareffectCL {
    abstract Host: string
    abstract initArray(tl: proto.Timeline): void;
}

class GrizzledEdge  extends Gear {
    Host: string
    constructor(host: string){
        super();
        this.Host = host
    }
    initArray(tl: proto.Timeline): void{
        let bufflevel: BuffLevel[] = []
        tl["BuffArr"][(this.Host+"PhysicalDMGDealt"+"GrizzledEdge")] = bufflevel;
    }
    tick(tl: proto.Timeline,offset:number): void{
        let curr = tl["TriggerPacketArr"][this.Host][offset]
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
            let bufflevel: BuffLevel[] = tl["BuffArr"][(this.Host+"PhysicalDMGDealt"+"GrizzledEdge")]

            for (let i = 0;i<(20*proto.StepMultiplier);i++){
                bufflevel[i+offset] = buff;
            }
            tl["BuffArr"][(this.Host+"PhysicalDMGDealt"+"GrizzledEdge")]=bufflevel;

        }

    }
}

class Xiranflow  extends Gear {
    Host: string
    constructor(host: string){
        super();
        this.Host = host
    }
    initArray(tl: proto.Timeline): void{
        let bufflevel: BuffLevel[] = []
        tl["BuffArr"][(this.Host+"ElectricDMGDealt"+"Xiranflow")] = bufflevel;
        tl["BuffArr"][(this.Host+"NatureDMGDealt"+"Xiranflow")] = bufflevel;
    }
    tick(tl: proto.Timeline,offset:number): void{
        let curr = tl["TriggerPacketArr"][this.Host][offset]
        let buff = 0;

        if ("ConsumeElectrification" in curr && curr["ConsumeElectrification"] > 0) {
            buff = 0.15;

        }
        else if ("ConsumeCorrosion" in curr && curr["ConsumeCorrosion"] > 0) {
            buff = 0.15;
        }

        if (buff > 0) {

            let bufflevelc: BuffLevel[] = tl["BuffArr"][(this.Host+"ElectricDMGDealt"+"Xiranflow")]
            let buffleveln: BuffLevel[] = tl["BuffArr"][(this.Host+"NatureDMGDealt"+"Xiranflow")]

            for (let i = 0;i<(25*proto.StepMultiplier);i++){
                bufflevelc[i+offset] = Math.min(bufflevelc[i+offset]+buff,0.45);
                buffleveln[i+offset] = Math.min(buffleveln[i+offset]+buff,0.45);
            }
            tl["BuffArr"][(this.Host+"NatureDMGDealt"+"Xiranflow")]=buffleveln;
            tl["BuffArr"][(this.Host+"ElectricDMGDealt"+"Xiranflow")]=bufflevelc;

        }

    }
}



class Qingbo  extends Gear {
    Host: string;
    constructor(host: string){
        super();
        this.Host = host;
    }
    initArray(tl: proto.Timeline): void{
        let bufflevel: BuffLevel[] = []
        tl["BuffArr"][(this.Host+"SkillDMGDealt"+"Qingbo")] = bufflevel;
    }
    tick(tl: proto.Timeline,offset:number): void{
        let curr = tl["TriggerPacketArr"][this.Host][offset]
        let buff = 0;

        if ("Skill:ComboSkills" in curr) {
            buff = 0.2;

        }
        

        if (buff > 0) {

            let bufflevel: BuffLevel[] = tl["BuffArr"][(this.Host+"SkillDMGDealt"+"Qingbo")]

            for (let i = 0;i<(15*proto.StepMultiplier);i++){
                bufflevel[i+offset] = Math.min(bufflevel[i+offset]+buff,0.4);
            }
            tl["BuffArr"][(this.Host+"NatureDMGDealt"+"Qingbo")]=bufflevel;

        }

    }
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