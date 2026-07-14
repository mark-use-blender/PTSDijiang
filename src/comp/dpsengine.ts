import * as proto from "./protodef";
import * as wepondef from "./wepondef";
import * as geardef from "./geardef";
import * as modifierdef from "./modifierdef";
import * as operatordef from "./operatordef";
import { act } from "react";





export function dpsengine(  teamconfig:string,
                            taticconfig:string,
                            initaltimeline?:proto.Timeline){
        var maintl:proto.Timeline = {
                Team:[],
                Error: [],
                Tatic: [],
                StatusArr: {},
                BuffArr: {},
                StateMachineArr: {},
                CalculationTickArr: {},
                ActionTickArr: {},
                DamageTickArr: {},
                TriggerPacketArr: {}
            };
        if (initaltimeline) {
            maintl = initaltimeline;
        }
        var operatorArr: operatordef.Operators[] = [];
        operatorArr = decodeteamconfig(teamconfig);
        maintl.Team = [...operatorArr.map(op => op.name)]
        decodetaticconfig(taticconfig,maintl);
        initArray(maintl);
        for (let i = 0; i < operatorArr.length; i++) {
            operatorArr[i].initArray(maintl);
        }
        for (let i = 0; i < maintl.Tatic.length; i++) {
            let offset = i;
            let action = maintl.Tatic[offset];
            if (action===undefined) {

            }
            else{
                operatorArr[action[0]].tatic(action[1],offset,maintl);
            }
        }
        for (let i=0;i< Math.max(...Object.values(maintl.CalculationTickArr).map(arr => arr.length), 0) ;i++){
            if (maintl.Error[i].includes("Error")){
                console.log(maintl.Error[i])
                break;
            }
            for (let j=0;j<maintl.Team.length;j++){
                if (maintl.CalculationTickArr[maintl.Team[j]][i] !== undefined ){
                    maintl.CalculationTickArr[maintl.Team[j]][i](maintl,i);
                }
            }
        }

}


export function decodeteamconfig(teamconfig:string):operatordef.Operators[] {//decode team config
    let team:operatordef.Operators[] = [];
    let config = JSON.parse(teamconfig);
    for (let i = 0; i < config.length; i++) {
        let op = config[i];
        let OperatorClass = operatordef.OperatorDef(op.name);
        if (OperatorClass) {
            let stats:proto.OperatorInt = {
                IsControll: op.IsControll == "TRUE",
                Wepon: op.Wepon as string,
                WeponStats: {
                    Level: op.WeponStats.Level as number,
                    PotentialPhase: op.WeponStats.PotentialPhase as number as proto.Potential,
                    Stat1: op.WeponStats.Stat1 as number as proto.Stat, 
                    Stat2: op.WeponStats.Stat2 as number as proto.Stat, 
                    StatSkill: op.WeponStats.StatSkill as number as proto.Stat
                },
                Geareffect: op.Geareffect as string,
                armour: { 
                    gearname: op.Gear.armour.gearname as string, 
                    gearStats: [
                        op.Gear.armour.gearStat1 as number as proto.artifact,
                        op.Gear.armour.gearStat2 as number as proto.artifact,
                        op.Gear.armour.gearStat3 as number as proto.artifact
                    ] 
                },
                glove: { gearname: op.Gear.glove.gearname as string, 
                    gearStats: [
                        op.Gear.glove.gearStat1 as number as proto.artifact,
                        op.Gear.glove.gearStat2 as number as proto.artifact,
                        op.Gear.glove.gearStat3 as number as proto.artifact
                    ] 
                },
                kit1: { gearname: op.Gear.kit1.gearname as string, 
                    gearStats: [
                        op.Gear.kit1.gearStat1 as number as proto.artifact,
                        op.Gear.kit1.gearStat2 as number as proto.artifact,
                        op.Gear.kit1.gearStat3 as number as proto.artifact
                    ] 
                },
                kit2: { gearname: op.Gear.kit2.gearname as string, 
                    gearStats: [
                    op.Gear.kit2.gearStat1 as number as proto.artifact,
                    op.Gear.kit2.gearStat2 as number as proto.artifact,
                    op.Gear.kit2.gearStat3 as number as proto.artifact
                    ] 
                },
                PotentialPhase: op.PotentialPhase as number as proto.Potential,
                Level: op.Level as number ,
                Elite: op.Elite as number as 0|1|2|3|4,
                Talent1: op.Talent1 as number as 0|1|2|3,
                Talent2: op.Talent2 as number as 0|1|2|3,
                AttributeIncrease: op.AttributeIncrease as number as 0|1|2|3|4,
                BasicAttackRank: op.BasicAttackRank as number as 0|1|2|3|4|5,
                BattleSkillRank: op.BattleSkillRank as number as 0|1|2|3|4|5,
                ComboSkillRank: op.ComboSkillRank as number as 0|1|2|3|4|5,
                UltimateRank: op.UltimateRank as number as 0|1|2|3|4|5
            };
            let operator = new OperatorClass(stats);
            team[i] = operator;
        }
    }
    return team;
}


export function decodetaticconfig(taticconfig:string,tl:proto.Timeline):void {//decode tatic config

}


export function initArray(tl: proto.Timeline): void {//basic setup for timeline
    tl.Tatic = [];
}