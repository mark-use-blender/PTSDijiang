export const StepMultiplier=10; 
export const cobmowindow = 10;
export type StatusLevel =  0|1|2|3|4;
export type BuffLevel = number;
export type TriggerType = 
"BasicAttack"|                              //0
"BasicAttackFinalStrike"|                  //1
"SkillBattleSkills"|                       //2
"SkillComboSkills"|                        //3
"SkillUltimates"|                          //4
"StaggerNode"|                              //5
"Finisher"|                                 //6
"ApplyVulnerable"|                          //7
"ApplyHeat"|                                //8
"ApplyElectric"|                            //9
"ApplyCryo"|                                //10
"ApplyNature"|                              //11
"ApplyHeatBurst"|                           //12
"ApplyElectricBurst"|                       //13
"ApplyCryoBurst"|                           //14
"ApplyNatureBurst"|                         //15
"ApplyLifted"|                              //16
"ApplyKnockedDown"|                         //17
"ApplyCrushed"|                             //18
"ApplyBreached"|                            //19
"ApplyWeakened"|                            //20
"ApplyPhysicalSusceptibility"|              //21
"ApplyHeatSusceptibility"|                  //22
"ApplyElectricSusceptibility"|              //23
"ApplyCryoSusceptibility"|                  //24
"ApplyNatureSusceptibility"|                //25
"ApplyElectrification"|                     //26
"ApplySolidification"|                      //27
"ApplyCorrosion"|                           //28
"ApplyCombustion"|                          //29
"ApplyOriginiumCrystals"|                   //30
"ApplyCritical"|                            //31
"ApplyShield"|                              //32
"Heal"|                                     //33
"ConsumeVulnerable"|                        //34
"ConsumeHeat"|                              //35
"ConsumeElectric"|                          //36
"ConsumeCryo"|                              //37
"ConsumeNature"|                            //38
"ConsumeElectrification"|                   //39
"ConsumeSolidification"|                    //40
"ConsumeCorrosion"|                         //41
"ConsumeCombustion"|                        //42
"GainElectricAmp"|                          //43
"GainLink"|                                 //44
"RecoverSP"|                                //45
string; 

export type StatusType =
"Vulnerable"|
"Heat"|
"Electric"|
"Cryo"|
"Nature"|
"OperatorHeat"|
"OperatorElectric"|
"OperatorCryo"|
"OperatorNature"|
"OperatorLink"|
string;

export type BuffType =
"PhysicalSusceptibility"|       //0
"HeatSusceptibility"|           //1
"ElectricSusceptibility"|       //2
"CryoSusceptibility"|           //3
"NatureSusceptibility"|         //4
string;
export type MoveType =
"NO"|       //normal attack
"BS"|       //basic skill
"CS"|       //combo skill
"UL"|       //ultimate
"OT"|       //other
string;
export type TaticPack = [0|1|2|3,MoveType];
export type CalculationTick = (tl:Timeline,of:number) => void;
export type ActionTick = (tl:Timeline,of:number) => void;
export type DamageTick = (tl:Timeline,of:number) => void;
//export type TriggerPacket = [TriggerType,number];
export type TriggerPacketLib = { [key: TriggerType]: number };
export type StateMachine = number;
export type Potential = 0|1|2|3|4|5;
export type Rank = 0|1|2|3|4|5|6|7|8|9|10|11|12;
export type Stat = 0|1|2|3|4|5|6|7|8|9;
export type artifact = 0|1|2|3;

export interface Timeline{
    Team: string[];
    Error: string[];
    Tatic: TaticPack[];
    StatusArr: {[key:StatusType]:StatusLevel[]};
    BuffArr: {[key:BuffType]:BuffLevel[]};
    StateMachineArr: { [key: string]: StateMachine[] };
    CalculationTickArr: { [key: string]: CalculationTick[] };
    ActionTickArr: { [key: string]: ActionTick[] };
    DamageTickArr: { [key: string]: DamageTick[] };
    TriggerPacketArr: { [key: string]: TriggerPacketLib[] };
}


export interface WeponInt {
    PotentialPhase: Potential;
    Level: number;
    Stat1: Stat;
    Stat2: Stat;
    StatSkill: Stat;


}


export interface WeponCL {
    WeponStats:WeponInt;
    Host:string;

    initArray(tl:Timeline):void;
    applyweponstats(
        Attribute:{"Strength":number,"Agility":number,"Intellect":number,"Will":number}, 
        Stats:{"HP":number,"Attack":number,"Defence":number}
    ):void;
}


export interface GearInt {
    gearname: string;
    gearStats: [artifact,artifact,artifact];


}


export interface GearCL {
    gear: GearInt;

    initArray(tl:Timeline):void;


}




export interface GeareffectCL {
    Host:string

    initArray(tl:Timeline):void;


}

export interface OperatorInt {
    IsControll: boolean;
    Wepon: string;
    WeponStats: WeponInt;
    Geareffect: string;
    armour: GearInt;
    glove: GearInt;
    kit1: GearInt;
    kit2: GearInt;

    PotentialPhase: Potential;
    Level: number;
    Elite: 0|1|2|3|4;
    Talent1: 0|1|2|3;
    Talent2: 0|1|2|3;
    AttributeIncrease: 0|1|2|3|4;
    BasicAttackRank: Rank;
    BattleSkillRank: Rank;
    ComboSkillRank:  Rank;
    UltimateRank:    Rank;

}

export interface OperatorCL {
    OperaterStats:OperatorInt;
    Attribute:{"Strength":number,"Agility":number,"Intellect":number,"Will":number};
    Stats:{"HP":number,"Attack":number,"Defence":number};
    wepon: WeponCL;
    gearskill: GeareffectCL;
    name: string;
    team: string[];
    initArray(tl:Timeline):void;
    tatic(action: MoveType, offset: number, tl: Timeline): void;
    tick(tl: Timeline, offset: number): void;
}

