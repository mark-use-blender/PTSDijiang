import * as proto from "./protodef";
import * as wepondef from "./wepondef";
import * as geardef from "./geardef";

export abstract class Operators implements  proto.OperatorCL {
    abstract OperaterStats: proto.OperatorInt    
    abstract Attribute:{"Strength":number,"Agility":number,"Intellect":number,"Will":number};
    abstract Stats:{"HP":number,"Attack":number,"Defence":number};
    abstract name: string 
    abstract wepon: proto.WeponCL;
    abstract gearskill: proto.GeareffectCL;
    abstract initArray(tl: proto.Timeline): void;
}


export class Leavatain extends Operators {
    OperaterStats: proto.OperatorInt
    levellookup=[
        [13,6,22,9,30,500],//1
        [14,10,24,9,33,556],//2
        [16,11,25,10,36,612],//3
        [17,12,27,11,40,668],//4
        [18,13,29,12,43,724],//5
        [19,14,31,13,46,781],//6
        [20,15,32,14,49,837],//7
        [22,16,34,15,53,893],//8
        [32,17,36,16,56,949],//9
        [24,18,38,17,59,1005],//10
        [25,19,39,18,62,1061],//11
        [26,20,41,19,66,1117],//12
        [28,21,43,19,69,1173],//13
        [29,22,45,20,72,1230],//14
        [30,23,46,21,75,1286],//15
        [31,24,48,22,78,1342],//16
        [32,25,50,23,82,1398],//17
        [34,26,52,24,85,1454],//18
        [35,27,53,25,88,1510],//19
        [36,28,55,26,91,1566],//20
        [37,29,57,27,95,1622],//21
        [39,30,59,28,98,1679],//22
        [40,31,60,29,101,1735],//23
        [41,32,62,29,104,1791],//24
        [42,33,64,30,108,1847],//25
        [43,34,66,31,111,1903],//26
        [45,35,67,32,114,1959],//27
        [46,37,69,33,117,2015],//28
        [47,38,71,34,120,2071],//29
        [48,39,73,35,124,2128],//30
        [49,40,74,36,127,2184],//31
        [51,41,76,37,130,2240],//32
        [52,42,78,38,133,2296],//33
        [53,43,80,39,137,2352],//34
        [54,44,81,39,140,2408],//35
        [55,45,83,40,143,2464],//36
        [57,46,85,41,146,2520],//37
        [58,47,87,42,150,2577],//38
        [59,48,88,43,153,2633],//39
        [60,49,90,44,156,2689],//40
        [62,50,92,45,159,2745],//41
        [63,51,94,46,162,2801],//42
        [64,52,95,47,166,2857],//43
        [65,53,97,48,169,2913],//44
        [66,54,99,48,172,2969],//45
        [68,55,101,49,175,3026],//46
        [69,56,102,50,179,3082],//47
        [70,57,104,51,182,3138],//48
        [71,58,106,52,186,3194],//49
        [72,59,108,53,188,3250],//50
        [74,60,109,54,192,3306],//51
        [75,61,111,55,195,3362],//52
        [76,62,113,56,198,3418],//53
        [77,63,114,57,201,3474],//54
        [78,64,116,58,204,3531],//55
        [80,65,118,58,208,3587],//56
        [81,66,120,59,212,3643],//57
        [82,67,121,60,214,3699],//58
        [83,68,123,61,217,3755],//59
        [85,69,125,62,221,3811],//60
        [86,70,127,63,224,3867],//61
        [87,71,128,64,227,3923],//62
        [88,72,130,65,230,3980],//63
        [89,73,132,66,234,4036],//64
        [91,74,124,67,237,4092],//65
        [92,75,135,68,240,4148],//66
        [93,76,137,68,243,4204],//67
        [94,77,139,69,247,4260],//68
        [95,78,141,70,250,4316],//69
        [97,79,142,71,253,4372],//70
        [98,80,144,72,256,4429],//71
        [99,81,146,73,259,4485],//72
        [100,82,148,74,263,4541],//73
        [102,83,149,75,266,4597],//74
        [103,84,151,76,269,4653],//75
        [104,85,153,77,272,4709],//76
        [105,86,155,78,276,4765],//77
        [106,87,156,78,279,4821],//78
        [108,88,158,79,283,4878],//79
        [109,89,160,80,285,4934],//80
        [110,90,162,81,289,4990],//81
        [111,91,163,82,292,5046],//82
        [112,92,165,83,295,5102],//83
        [114,93,167,84,298,5158],//84
        [115,94,169,85,301,5214],//85
        [116,95,170,86,305,5270],//86
        [117,96,172,87,308,5327],//87
        [118,97,174,88,311,5383],//88
        [120,98,176,88,314,5439],//89
        [121,99,177,89,318,5495],//90
    ]
    talent01lookup=[
        10,15,20
    ]
    talent02lookup=[
        0,4,8
    ]
    /*                  1	2	3	4	5	6	7	8	9	M1	M2	M3
       普攻第一段倍率	16%	18%	19%	21%	22%	24%	26%	27%	29%	31%	33%	36%
       普攻第二段倍率	24%	26%	29%	31%	34%	36%	38%	41%	43%	46%	50%	54%
       普攻第三段倍率	25%	28%	30%	33%	35%	38%	40%	43%	45%	48%	52%	56%
       普攻第四段倍率	39%	43%	47%	51%	55%	59%	62%	66%	70%	75%	81%	88%
       普攻第五段倍率	53%	58%	64%	69%	74%	80%	85%	90%	95%	102%110%119%
       處決攻擊倍率	    400%440%480%520%560%600%640%680%720%770%830%900%
       下墜攻擊倍率	    80%	88%	96%	104%112%120%128%136%144%154%166%180%
    */
    normalattacklookup=[
        [0.16,0.24,0.25,0.39,0.53,4.0,0.8],//1
        [0.18,0.26,0.28,0.43,0.58,4.4,0.88],//2
        [0.19,0.29,0.30,0.47,0.64,4.8,0.69],//3
        [0.21,0.31,0.33,0.51,0.69,5.2,1.04],//4
        [0.22,0.34,0.35,0.55,0.74,5.6,1.12],//5
        [0.24,0.36,0.38,0.59,0.80,6.0,1.20],//6
        [0.26,0.38,0.40,0.62,0.85,6.4,1.28],//7
        [0.27,0.41,0.43,0.66,0.90,6.8,1.36],//8
        [0.29,0.43,0.45,0.70,0.95,7.2,1.44],//9
        [0.31,0.46,0.48,0.75,1.02,7.7,1.54],//M1
        [0.33,0.50,0.52,0.81,1.10,8.3,1.66],//M2
        [0.36,0.54,0.56,0.88,1.19,9.0,1.80]//M3
    ]
    /*                      	1	2	3	4	5	6	7	8	9	M1	M2	M3
       初始爆炸傷害倍率	        62%	68%	75%	81%	87%	93%	99%	106%112%120%129%140%
       初始爆炸失衡值	        10	10	10	10	10	10	10	10	10	10	10	10
       持續傷害每段倍率	        6%	7%	8%	8%	9%	9%	10%	11%	11%	12%	13%	14%
       追加傷害倍率	            342%376%410%445%479%513%547%581%616%658%710%770%
       追加失衡值	            10	10	10	10	10	10	10	10	10	10	10	10
       燃燒時長（秒）	        5	5	5	5	5	5	5	5	5	5	5	5
       追加攻擊獲得終結技能量	100	100	100	100	100	100	100	100	100	100	100	100
       終結技期間第一段倍率	    147%161%176%191%205%220%235%249%264%282%304%330%
       終結技期間第一段失衡值	10	10	10	10	10	10	10	10	10	10	10	10
       終結技期間第二段倍率	    164%181%197%214%230%247%263%279%296%316%341%370%
       終結技期間第二段失衡值	10	10	10	10	10	10	10	10	10	10	10	10
       終結技期間追加攻擊倍率	400%440%480%520%560%600%640%680%720%770%830%900%
       終結技期間追加攻擊失衡值	10	10	10	10	10	10	10	10	10	10	10	10
       終結技期間燃燒時長（秒）	5	5	5	5	5	5	5	5	5	5	5	5
    */
    battleskilllookup=[
        [0.62,10,0.06,3.42,10,5,100,1.47,10,1.64,10,4.0,10,5],//1
        [0.68,10,0.07,3.76,10,5,100,1.61,10,1.81,10,4.4,10,5],//2
        [0.75,10,0.08,4.10,10,5,100,1.76,10,1.97,10,4.8,10,5],//3
        [0.81,10,0.08,4.45,10,5,100,1.91,10,2.14,10,5.2,10,5],//4
        [0.87,10,0.09,4.79,10,5,100,2.05,10,2.30,10,5.6,10,5],//5
        [0.93,10,0.09,5.13,10,5,100,2.20,10,2.47,10,6.0,10,5],//6
        [0.99,10,0.10,5.47,10,5,100,2.35,10,2.63,10,6.4,10,5],//7
        [1.06,10,0.11,5.81,10,5,100,2.49,10,2.79,10,6.8,10,5],//8
        [1.12,10,0.11,6.16,10,5,100,2.64,10,2.96,10,7.2,10,5],//9
        [1.20,10,0.12,6.58,10,5,100,2.82,10,3.16,10,7.7,10,5],//M1
        [1.29,10,0.13,7.10,10,5,100,3.04,10,3.41,10,8.3,10,5],//M2
        [1.40,10,0.14,7.70,10,5,100,3.30,10,3.70,10,9.0,10,5]//M3
    ]
    /*     	                            1	2	3	4	5	6	7	8	9	M1	M2	M3
       冷卻時間	                        10s	10s	10s	10s	10s	10s	10s	10s	10s	10s	10s	9s
       傷害倍率	                        240%264%288%312%336%360%384%408%432%462%498%540%
       失衡值	                        10	10	10	10	10	10	10	10	10	10	10	10
       命中1個敵人獲得終結技能量        25	25	25	25	25	25	25	25	25	25	25	25
       命中2個敵人獲得終結技能量	    30	30	30	30	30	30	30	30	30	30	30	30
       命中3個或以上敵人獲得終結技能量	35	35	35	35	35	35	35	35	35	35	35	35
    */
    comboskilllookup=[
        [10,2.40,10,25,30,35],//1
        [10,2.64,10,25,30,35],//2
        [10,2.88,10,25,30,35],//3
        [10,3.12,10,25,30,35],//4
        [10,3.36,10,25,30,35],//5
        [10,3.60,10,25,30,35],//6
        [10,3.84,10,25,30,35],//7
        [10,4.08,10,25,30,35],//8
        [10,4.32,10,25,30,35],//9
        [10,4.62,10,25,30,35],//M1
        [10,4.98,10,25,30,35],//M2
        [10,5.40,10,25,30,35]//M3
    ]
    /*                      1	2	3	4	5	6	7	8	9	M1	M2	M3
     所需終結技能量	    300	300	300	300	300	300	300	300	300	300	300	300
     持續時間（秒）	    15	15	15	15	15	15	15	15	15	15	15	15
     強化普攻第一段倍率	65%	71%	78%	84%	91%	97%	104%110%117%125%134%146%
     強化普攻第二段倍率	81%	89%	97%	105%113%122%130%138%146%156%168%182%
     強化普攻第三段倍率	115%127%139%150%162%173%185%196%208%222%240%260%
     強化普攻第四段倍率	203%223%243%263%284%304%324%344%365%390%420%456%
    */
    ultimatumlookup=[
        [300,15,0.65,0.81,1.15,2.03],//1
        [300,15,0.71,0.89,1.27,2.23],//2
        [300,15,0.78,0.97,1.39,2.43],//3
        [300,15,0.84,1.05,1.50,2.63],//4
        [300,15,0.91,1.13,1.62,2.84],//5
        [300,15,0.97,1.22,1.73,3.04],//6
        [300,15,1.04,1.30,1.85,3.24],//7
        [300,15,1.10,1.38,1.96,3.44],//8
        [300,15,1.17,1.46,2.08,3.65],//9
        [300,15,1.25,1.56,2.22,3.90],//M1
        [300,15,1.34,1.68,2.40,4.20],//M2
        [300,15,1.46,1.82,2.60,4.56]//M3
    ]
    Attribute:{"Strength":number,"Agility":number,"Intellect":number,"Will":number};
    Stats:{"HP":number,"Attack":number,"Defence":number};
    wepon: proto.WeponCL;
    gearskill: proto.GeareffectCL;
    talent1: number = 0
    talent2: number = 0
    normalattackstat=[0.16,0.24,0.25,0.39,0.53,4.0,0.8]
    battleskillstat=[0.62,10,0.06,3.42,10,5,100,1.47,10,1.64,10,4.0,10,5]
    comboskillstat=[10,2.40,10,25,30,35]
    ultimatumstat=[300,15,0.65,0.81,1.15,2.03]

    name= "Leavatain" 
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
        this.Attribute = {"Strength":this.levellookup[this.OperaterStats.Level-1][0],
                         "Agility":this.levellookup[this.OperaterStats.Level-1][1],
                         "Intellect":this.levellookup[this.OperaterStats.Level-1][2],
                         "Will":this.levellookup[this.OperaterStats.Level-1][3]
                        }
        this.Stats = {"HP":this.levellookup[this.OperaterStats.Level-1][5],
                      "Attack":this.levellookup[this.OperaterStats.Level-1][4],
                      "Defence":140
                     };
        this.talent1 = this.talent01lookup[this.OperaterStats.Talent1];
        this.talent2 = this.talent02lookup[this.OperaterStats.Talent2];
        this.normalattackstat = this.normalattacklookup[this.OperaterStats.BasicAttackRank];
        this.battleskillstat = this.battleskilllookup[this.OperaterStats.BattleSkillRank];
        this.comboskillstat = this.comboskilllookup[this.OperaterStats.ComboSkillRank];
        this.ultimatumstat = this.ultimatumlookup[this.OperaterStats.UltimateRank];
        this.potentialpreprocess();
        const WeponClass = wepondef.WeponDef(this.OperaterStats.Wepon);
        this.wepon = new WeponClass(this.OperaterStats.WeponStats);
        const GearClass = geardef.GearDef(this.OperaterStats.Geareffect);
        this.gearskill = new GearClass(this.name);
        //apply gear stats
        this.wepon.applyweponstats(this.Attribute,this.Stats)



    }
    potentialpreprocess(): void{
        if (this.OperaterStats.PotentialPhase>0){
            this.battleskillstat[3] =  this.battleskillstat[3] *1.2;
            this.battleskillstat[11] =  this.battleskillstat[11] *1.2;
        }
        if (this.OperaterStats.PotentialPhase>1){
            this.Attribute["Intellect"] =  this.Attribute["Intellect"]+20;
            this.normalattackstat = this.normalattackstat.map(x => x +0.15);
        }
        if (this.OperaterStats.PotentialPhase>2){
            this.battleskillstat[2] =  this.battleskillstat[2] *1.5;
            this.battleskillstat[5] =  this.battleskillstat[5] *1.5;
            this.battleskillstat[13] =  this.battleskillstat[13] *1.5;
        }
        if (this.OperaterStats.PotentialPhase>3){
            this.ultimatumstat[0] =  this.ultimatumstat[0] *0.75;
        }
        if (this.OperaterStats.PotentialPhase>4){
            this.ultimatumstat[2] =  this.ultimatumstat[2] *1.2;
            this.ultimatumstat[3] =  this.ultimatumstat[3] *1.2;
            this.ultimatumstat[4] =  this.ultimatumstat[4] *1.2;
            this.ultimatumstat[5] =  this.ultimatumstat[5] *1.2;
        }
    }
    initArray(tl: proto.Timeline): void{

    }
}


/* 
export class Camille  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Camille"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}


export class MiFu  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "MiFu"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Endmin  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Endmin"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class LiFeng  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "LiFeng"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Rossi  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Rossi"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Ember  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Ember"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Gilberta  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Gilberta"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Ardelia  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Ardelia"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class TangTang  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "TangTang"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Pog  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Pog"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class LastRite  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "LastRite"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class ZhuangFangYi  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "ZhuangFangYi"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class ChenQianYu  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "ChenQianYu"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class SnowShine  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "SnowShine"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class XaiHi  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "XaiHi"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Perlica  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Perlica"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class WulfGard  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "WulfGard"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class ArcLight  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "ArcLight"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Alesh  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Alesh"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Avywenna  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Avywenna"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class DaPan  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "DaPan"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Eatella  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Eatella"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Catcher  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Catcher"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Antal  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Antal"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Fluorite  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Fluorite"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}

export class Akekuri  extends Operators {
    OperaterStats: proto.OperatorInt
    name= "Akekuri"
    constructor(stat:proto.OperatorInt){
        super();
        this.OperaterStats = stat
    }
    initArray(tl: proto.Timeline): void{
        
        
    }
}
*/
export type OperatorConstructor = new (stat: proto.OperatorInt) => Operators;

const oparr: Record<string, OperatorConstructor> = {
    "Leavatain": Leavatain,
    /*
    "MiFu": MiFu,
    "Endmin": Endmin,
    "LiFeng": LiFeng,
    "Rossi": Rossi,
    "Ember": Ember,
    "Gilberta": Gilberta,
    "Ardelia": Ardelia,
    "TangTang": TangTang,
    "Pog": Pog,
    "LastRite": LastRite,
    "ZhuangFangYi": ZhuangFangYi,
    "ChenQianYu": ChenQianYu,
    "SnowShine": SnowShine,
    "XaiHi": XaiHi,
    "Perlica": Perlica,
    "WulfGard": WulfGard,
    "ArcLight": ArcLight,
    "Alesh": Alesh,
    "Avywenna": Avywenna,
    "DaPan": DaPan,
    "Eatella": Eatella,
    "Catcher": Catcher,
    "Antal": Antal,
    "Fluorite": Fluorite,
    "Akekuri": Akekuri,
    "Camille": Camille
    */
};

export function OperatorDef(op: string): OperatorConstructor{
    return oparr[op];
}


