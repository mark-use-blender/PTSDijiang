import type { timeline, operator } from "./dpsengine";
import { Optype, Proc } from "./dpsengine";




export function opdef(operter:string){
    const oparr : Record<string,operator> = {"Laevatain":Laevatain};
    return oparr[operter]
}




function Laevatain(process:Proc,tl:timeline,op?:Optype,offset?:number)
{
    switch (process){
        case Proc.Ini:
            tl["LaevatainOp"] = [];
            tl["LaevatainDMG"] = [];
            tl["Laevatain"] = [];
            tl["LaevatainMeltingFlame"] = [];
            tl["LaevatainULTwilight"] = [];
            if ("HeatInfliction" in tl){tl["HeatInfliction"] = [];}
            if ("Combustion" in tl){tl["Combustion"] = [];}
            break;
        case Proc.Popu:
            if (op && offset){
                switch (op){
                    case Optype.Bs:
                        break;
                    case Optype.Cs:
                        break;
                    case Optype.Ul:
                        break;                        
                }
            }
            break;
        case Proc.Post:
            break;
    }
    return tl
}