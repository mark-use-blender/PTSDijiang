import * as operdef from "./operatordef";
import * as wepondef from "./wepondef";
export enum Optype {
    Bs = 1,
    Cs = 2,
    Ul = 3
};
export enum Proc {
    Ini = 0,
    Popu = 1,
    Post = 2
};
export type timeline = Record<string,(unknown)[]>;
export type operator = (process:Proc,tl:timeline,op?:Optype,step?:number) => timeline;
export type wepon = (process:Proc,tl:timeline) => timeline;

type actPackage = [operator,Optype];
var timelineArr: timeline = {} ;
var actArr:actPackage[];
var operatorArr: operator [] =[];
var weponArr: wepon[] = [];





export function MainScheduler(operators:string[],actions:string) {
    for (var ooperator in operators){
        let tmp:operator = operdef.opdef(ooperator);
        operatorArr.push(tmp)
        timelineArr = tmp(Proc.Ini,timelineArr)
    }
    actArr = actionparser(actions)
    let stp:number = actArr.length;
    for (let tmp:number = 0;tmp<stp;tmp++){
        let act = actArr[tmp]
        if (act){
            timelineArr = act[0](Proc.Popu,timelineArr,act[1],tmp)
        }
    }
    stp = operatorArr.length
    for (let tmp:number = 0;tmp<stp;tmp++){        
        timelineArr = operatorArr[tmp](Proc.Post,timelineArr)
    }
    stp = weponArr.length
    for (let tmp:number = 0;tmp<stp;tmp++){        
        timelineArr = weponArr[tmp](Proc.Post,timelineArr)
    }
    return timelineArr
}




function actionparser(actions:string){
    let actArr:string[];
    actArr = actions.split(",");
    let result:actPackage[] = [];
    for (let act in actArr){
        let inter:any[] = act.split(":")
        if (inter.length ==3){
            let op:operator;
            op = operatorArr[inter[0]]
            result[inter[1] as number] = [op,inter[2] as number as Optype]
        }
    }
    return result
}