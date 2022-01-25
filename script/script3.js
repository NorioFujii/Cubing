async function RotCopy(rot){
    let rote = rot;
    if (rot=="") rote = await clipIn();
    navigator.clipboard.writeText(rot);   
    if (rote!="") setRot(regRot((rote + " **").split(" "))); // "*0 "+ 
    clearTimeout(Tid);
    setTimeout("checkRot();",100);
}
const PP = "r2,B2,U2,l,U2,r',U2,r,U2,F2,r,F2,l',B2,r2".split(",");
const NP = "Rw,U2,X,Rw,U2,Rw,U2,Rw',U2,X',Rw,U2,Rw',U2,Rw,U2,Rw',U2,Rw'".split(",");
function parityAlt() {  // not use
    $("#parity").attr('disabled',true);
    let rot=[];
    if ((Rotates.length>0)||(Counter>0)) {
        Tid[0] = setTimeout("parityAlt()",1000);
        return true;
    }
}
ExchgCnt = 0;
function edgeExchg() {
    const ruflV="l2,U2,F2,l2,F2,U2,l2,*".split(","), ruflH="l2,B2,U2,l2,U2,B2,l2,*".split(",");
    const crosH="Rw',F,U',R,F',U,Rw,*".split(","), crosV="Rw',D,F',R,D',F,Rw,*".split(",");
    if ((Rotates.length>0)||(Counter>0)) {
        Tid[0] = setTimeout("edgeExchg()",1000);
        return true;
    }
    Fix44 = true;
    if ((a[34]==a[35])&&((a[14]==a[81])||(a[15]==a[84]))) Rotates = Rotates.concat([NoRot],regRot(ruflV));
    else if ((colorEg(2)==colorEg(14))&&(colorEg(3)==colorEg(15))) Rotates = Rotates.concat([NoRot],regRot(crosH));
    else {
        if ((a[14]==a[15])&&((a[33]==a[66])||(a[36]==a[67]))) Rotates = Rotates.concat([NoRot],regRot(ruflH));
        else if ((colorEg(14)==colorEg(82))&&(colorEg(15)==colorEg(83))) Rotates = Rotates.concat([NoRot],regRot(crosV));
        else if (ExchgCnt++<5) {
            turn("BFUDLR".charAt(ExchgCnt));
            Tid[0] = setTimeout("edgeExchg()",1000);
            return true;
        }
    }
    ExchgCnt = 0; Fix44 = false;
    Tid[0] = setTimeout("next44()",1000);
}
function colorEg(post) {
    let idx = eg.indexOf(post)&0xfe;
    return a[eg[idx]]*a[eg[idx+1]]+a[eg[idx]]+a[eg[idx+1]];
}
function edgePair() {
    const pairRot=NoRot+" r' U L' U' r * *Pairing *#1415343521257276 U"; //  *#14153435";
    if ((Rotates.length>0)||(Counter>0)) {
        Tid[0] = setTimeout("edgePair()",1000);
        return true;
    }
    if (Comment=="Pairing") check33();
    if($("#solve3").prop('disabled')==false) {
        next44(); return;
    }
    let post, target, rote;
    if (colorEg(14)==colorEg(15)) { 
        if (colorEg(8)==colorEg(12)) {
            if (colorEg(37)!=colorEg(41)) {
               if (colorEg(88)!=colorEg(92))    Rotates = Rotates.concat(["D","F"]);
               else if (colorEg(5)!=colorEg(9)) Rotates.push("u");
               else if (colorEg(2)!=colorEg(3)) Rotates.push("U2");
               else Rotates.push("F");
            } else  Rotates = Rotates.concat(["B","F","U","D"]);
        } else      Rotates.push("U");
        edgePair(); return;
    } 
    if (colorEg(37)==colorEg(41)) {
        if (colorEg(15)==colorEg(3)) { flushB(200,8,"#edgeEx");edgeExchg(); return; }
        if (colorEg(14)!=colorEg(15)) { fi(),kiir(4); }
        else {
          if      (colorEg(40)!=colorEg(44)) Rotates.push("*次へ続行"),turn("f");
          else if (colorEg(46)!=colorEg(47)) Rotates.push("*次へ続行"),turn("F");
          else if (colorEg(69)!=colorEg(73)) Rotates.push("*次へ続行"),turn("r");
          if (ExchgCnt++<5) edgePair();
          return;
        }
    }
    Comment = ""; ExchgCnt = 0;
    target = colorEg(37);
    if (colorEg(15)!=target) {
        post = edgeSrch(37, target, 15);
        edgePair(); return;
    }
    target = colorEg(14);
    if (colorEg(3)!=target) {
        post = edgeSrch(14, target, 3);
        edgePair(); return;
    }
//    if (opener && opener.document.getElementsByName('pythonQ')) 
//        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = pairRot;
    rote = pairRot + ((colorEg(8)==colorEg(12))?"2 ":" ") + "*#14153435";
    Rotates = Rotates.concat(regRot(rote.trim().split(" ")));
    edgePair();return;  // 
}
function edgeSrch(p1,c1,p3) {
    const move15=new Array("B2 R' U","","B' U2","","B U2","","R' U","","R U","","L' F' L","","Pass","","Pass","","U2","","B' R' U","","U","","R' B U2","","F R F' U","","None","","L' B' L U2","","U'","","B R' U","","B2 U2","","R2 U","","R' B U2","","L' F2 L","","D' L' F L","","L' F L","","L2 U' L2","");
    const move03=new Array("B'","","B2 R D B2","","R D B2","","B","","R2 B","","R2 R D B2","","Pass","","U' L' U","","B' R D B2","","None","","R B","","R2 D B2","","Pass","","Pass","","F' U F","","U2 R U2 B","","B2","","D' R' B","","R' B","","D B2","","D2 R' B","","D2 B2","","D' B2","","D2 R' B","");
    let p2=-1,i,s1,s2,t1,t2,cmnt,lo="",kuro=9, newcolor="transparent";

    for (i=0;i<48;i+=2) {
        if ((eg[i]==p1) || (c1!=colorEg(eg[i]))) continue;
        p2 = i;
        break;
    }
    if (p2<0) alert('Pair edge not found');
    cmnt = "*#"+("0"+p3).slice(-2)+("0"+eg[p2]).slice(-2)+ " ";
    cmnt += p3==15?move15[p2]:move03[p2];
//    if (opener && opener.document.getElementsByName('pythonQ')) {
//        parent.ClipDT = cmnt.slice(7);
//        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = cmnt;
//    }
    Rotates = Rotates.concat(regRot(cmnt.split(" ")));
    return eg[p2];
}
// const White=8,Orange=2,Green=3,Red=4,Blue=5,Yellow=6;
function cent6(color=White) {
    if ((Rotates.length>0)||(Counter>0)) {
        Tid[color] = setTimeout("cent6("+color+")",1000);
        return true;
    }
    if (centr(color)) { turn(""); cent6(color); return; }

    if (color==White) {
        turn("X2"),Tid[Yellow]=setTimeout("cent6("+Yellow+")",500);}
    else if (color==Yellow) {
        turn("z"),Tid[Red]=setTimeout("cent6("+Red+")",500);}
    else if (color==Red) {
        turn("X"),Tid[Blue]=setTimeout("cent6("+Blue+")",500);}
    else if (color==Blue) {
        turn("X"),Tid[Orange]=setTimeout("cent6("+Orange+")",500);}
    else if (color==Orange) {
        Comment="Completed!";
        turn("z");
        if (Auto) next44();
    }  // 
    return true;
}
NoRot = "";
// 　　            0,1,2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23
const cr=new Array(7,6,10,11,23,22,26,27,39,38,42,43,55,54,58,59,71,70,74,75,87,86,90,91);  // center rotation
function centr(Ccolor) {
    let i,j,k,kk,save;
    let cmnt="*Centered("+"橙緑赤青黄白白".charAt(Ccolor-2)+")";
    preRot = cmnt + NoRot;
    
    if ((Rotates.length>0)||(Counter>0)) {
    } else {
        if ((Ccolor==White)||(Ccolor==Red)) {  // 白か赤で、TOP面ゼロなら
            let c1=Ccolor,kmax=0,ki=-1;
            for (k=0;k<6;k++) {
                for (i=0,kk=0,j=1;i<4;i++,j*=2) kk += (a[cr[k*4+i]]==c1)?j:0;
                if ((k==0)&&(kk>0)) break;
                if (Pri[kk]>kmax) { kmax = Pri[kk]; ki = k; }
            }
            if (ki>0) {
                Rotates.push(["*Lucky!","Z","X","z","x","X2"][ki]);
                return true;
            }
        }        
        for (k=0,kk=0,j=1;k<4;k++,j*=2) kk += (a[cr[k]]==Ccolor)?j:0;
        if      ((kk==3)||(kk==10)||(kk==11))  preRot += " U";
        else if ((kk==2)||(kk==12)||(kk==14))  preRot += " U'";
        else if ((kk==1)||(kk==6)||(kk==7))    preRot += " U2";
        else if (kk==15)                     { return false; }
        if (kk%3==0) save = " U2 ";  // ２個連れを期待する
        else         save = " U ";
//        console.log(kk+" Cube_rot="+preRot.slice(8));
        return cntrSrch(4, Ccolor, save);
    }
    return true;
}
const Pri=[0,3,2,9,1,5,7,13,4,10,6,14,8,12,11,15];
function cntrSrch(st,c1,save) {
    let i,j,k,kk,svt=save,rot,roth,rev,maxi=0,kmax=0,vrot=new Array(6);

    for (k=1;k<6;k++) {
        for (i=0,kk=0,j=1;i<4;i++,j*=2) kk += (a[cr[k*4+i]]==c1)?j:0;
        rot = " "+" LFRBD".charAt(k);
        if (((kk==4)||(kk==5)||(kk%3==0))&&(save==" U2 ")&&
            ((c1==White)||(c1==Red))) // 一気に左上がり縦戻しなし
             { rot += (kk==3)?"'":((kk==9)?"2":"");
               roth = ["","U b","l","U' f","U2 r","l2"][k];
               if ((kk>3)&&(kk<7)) rot = "";
               rev = "";
        } else { 
               roth = ["","U f","r","U' b","U2 l","r2"][k];              // 右上がり
               if      ((kk==1)||(kk==3)||(kk==5)||(kk==7))  rot += "";  // 時計
               else if ((kk==2)||(kk==6))                    rot += "2";
               else if ((kk==4)||(kk==12))                   rot += "'"; // 反時計
               else rot = "";
               rev = (k==5)?"r2":(roth.slice(-1)+"'");  //  縦戻しのターン
        }
        if (kk%3!=0) svt = " U ";  // UP面にてU2で期待されても、１個だけなのでUとする
        if (Pri[kk]>kmax) { kmax = Pri[kk]; maxi = k; }

        rot += " *# "+ roth + svt + rev;
        vrot[k] = rot;
    }
    if (maxi<=0) return -1;
    preRot += vrot[maxi].replace(" *#",(NoRot=="")?" *#"+("0"+cr[maxi*4+3]).slice(-2):"");
    Rotates = Rotates.concat(regRot(preRot.trim().split(" ")));
//    console.log(maxi+','+preRot);
    if (kk==15) return false;  // 面の完了
    return true;
}
function rotCube(){
    let segs=" translate3d(0,0,0) rotateX("+cubex+"deg) rotateY("+cubey+"deg) rotateZ("+cubez+"deg)";
    $(".cube").css({ "transform":segs, "-webkit-transform":segs });
}
function rotCubeXY(){
    rotCube();
    kiirRotLayer(wholecube,99);
    kiir();
}
function shortRot() {
    if (NoRot=="") { 
        NoRot = " *0c"; Auto = true;
    } else {
        NoRot = ""; if (Pause) Auto = false;
    }
}
function faceFloat(){
    if (FaceF=="") {
        FaceF = "f",$("#lskip").show();
        if (Pause) NoRot = "";
    } else {
        FaceF = "", $("#lskip").hide();
    }
    kiirRotLayer(wholecube,99);
    kiir();
}
function faceNum(){
    if (Disp=="none") Disp = "block", Face = "F",$(".mezo span").css("display",Disp);
    else if (Face=="F") Face = "N";
    else Face = "F";
    kiirRotLayer(wholecube,99);
    kiir();
}
function pause(){
    if (Pause) Pause = false, $("#comment").html("");
    else Pause = true, $("#comment").html("Pausing");
}
var Rev = 0 ; // Reverse
function accel(usft=true){
    let rote, clen, clipSeq;
    if (!Pause) {
        if (speed==80) speed=40, NxPaus=500;
        else speed=80, NxPaus=1000;
    } else {
        if (Urot=="") {
            if (parent.ClipDT=="") return;
            clipSeq = parent.ClipDT.split(" ");
            clen = clipSeq.length - Rotates.length;
            if (usft) {
                if (clen>0) Urot = clipSeq[clipSeq.length-Rotates.length-2];
                else  return;
                Rotates.unshift(Urot);
            } else {
                if (clipSeq.length-Rev>0) Urot = clipSeq[clipSeq.length-Rotates.length-++Rev];
                else { return; }
            }
            rote = Maprote.get(Urot.charAt(0));
            Urote = ((typeof rote==='string')?rote.charAt(RotSft):Urot.charAt(0)) +Urot.slice(1);
        } else Rev = 1;
        turnStart(String.fromCharCode(Urote.charCodeAt(0) ^ 0x20)+Urote.slice(1));
        turnN -= 1; Urot="";
        return;
    }
}
function crtDiv(e,n=4) {
    let trans="";
    if (n!=4) {
        e==1&&(trans="translate3d(  0px,-60px,  0px) rotateX(-90deg) ");
        e==6&&(trans="translate3d(  0px,-30px,  0px) rotateX(-90deg) ");
        e==2&&(trans="translate3d(-15px,-45px,  0px) rotateY( 90deg) ");
        e==4&&(trans="translate3d( 15px,-45px,  0px) rotateY( 90deg) ");
        e==3&&(trans="translate3d(  0px,-45px, 15px) rotateX(0deg)   ");
        e==5&&(trans="translate3d(  0px,-45px,-15px) rotateX(0deg)   ");
        return '<div class="core" style="transform:'+trans+'"></div>';
    }
    e==1&&(trans="translate3d(  3px,-72px,  0px) rotateX(-90deg)");
    e==6&&(trans="translate3d(  3px,-20px,  0px) rotateX(-90deg)");
    e==2&&(trans="translate3d(-23px,-46px,  0px) rotateY( 90deg)");
    e==4&&(trans="translate3d( 29px,-46px,  0px) rotateY( 90deg)");
    e==3&&(trans="translate3d(  3px,-46px, 26px) rotateX(0deg)");
    e==5&&(trans="translate3d(  3px,-46px,-26px) rotateX(0deg)");
    e==10&&(trans="translate3d(  3px,-46px,  0px) rotateY( 90deg)");
    e==11&&(trans="translate3d(-23px,-46px,  0px) rotateY( 90deg)");
    e==12&&(trans="translate3d( 29px,-46px,  0px) rotateY( 90deg)");
    e==13&&(trans="translate3d(  3px,-46px,  0px) rotateX(-90deg)");
    e==14&&(trans="translate3d(  3px,-46px,  0px) rotateX(-90deg)");
    e==15&&(trans="translate3d(  3px,-46px,  0px) rotateX(0deg)");
    e==16&&(trans="translate3d(  3px,-46px,-13px) rotateX(0deg)");
    return '<div class="core" style="transform:'+trans+'"></div>';
}
function css33(opt=1) {
    if (Fix44) return;
    document.getElementById("dynaCSS").href="css/RBstyle43.css";
    if (opt==1) N = 3;
}
function css44(opt=1) {
    if (Fix33) return;
    document.getElementById("dynaCSS").href="css/RBstyle44.css";
    if (opt==1) { N = 4; kiir(4); }
}
function kiir(n=N){
    let r = "";
    if (n==0) {  // 3x3 on cubes:96
        css33();
        r =                               creFaces( 1,  0,-60,-30,"X(-90deg)");
        r+=unfold(17,"",4).charAt(0)!="f"?creFaces(10,-15,-45,-30,"Y(-90deg)"):creFaces(110,-75,-45, -30,"Y(-90deg)");
        r+=                               creFaces(19,  0,-45, 45,"X(0deg)");
        r+=unfold(49,"",4).charAt(0)!="f"?creFaces(28, 75,-45, 30,"Y(-90deg)"):creFaces(128,185,-45,  30,"Y(-90deg)");
        r+=unfold(65,"",4).charAt(0)!="f"?creFaces(37, 60,-45,-45,"X(0deg)"):  creFaces(137,100,-45,-185,"X(0deg)");
        r+=unfold(81,"",4).charAt(0)!="f"?creFaces(46,  0, 30, 30,"X(-90deg)"):creFaces(146,  0, 70,  30,"X(-90deg)");
    } else if (n==3) {
        r =                               creFaces( 1,  0,-60,-30,"X(-90deg)");
        r+=unfold(10,"",3).charAt(0)!="f"?creFaces(10,-15,-45,-30,"Y(-90deg)"):creFaces(110,-75,-45, -30,"Y(-90deg)");
        r+=                               creFaces(19,  0,-45, 45,"X(0deg)");
        r+=unfold(28,"",3).charAt(0)!="f"?creFaces(28, 75,-45, 30,"Y(-90deg)"):creFaces(128,185,-45,  30,"Y(-90deg)");
        r+=unfold(37,"",3).charAt(0)!="f"?creFaces(37, 60,-45,-45,"X(0deg)"):  creFaces(137,100,-45,-185,"X(0deg)");
        r+=unfold(46,"",3).charAt(0)!="f"?creFaces(46,  0, 30, 30,"X(-90deg)"):creFaces(146,  0, 70,  30,"X(-90deg)");
     } else if (n==4) {
        r =                               creFaces( 1,  3,-59,-39,"X(-90deg)",4);
        r+=unfold(17,"",4).charAt(0)!="f"?creFaces(17,-10,-46,-39,"Y(-90deg)",4):creFaces(117,-91,-13, -52,"Y(-90deg)",4);
        r+=                               creFaces(33,  3,-46, 52,"X(0deg)",4);
        r+=unfold(49,"",4).charAt(0)!="f"?creFaces(49, 94,-46, 39,"Y(-90deg)",4):creFaces(149,185,-13,  26,"Y(-90deg)",4);
        r+=unfold(65,"",4).charAt(0)!="f"?creFaces(65, 81,-46,-52,"X(0deg)",4):  creFaces(165,118,-13,-215,"X(0deg)",4);
        r+=unfold(81,"",4).charAt(0)!="f"?creFaces(81,  3, 45, 39,"X(-90deg)",4):creFaces(181,-26,118,  13,"X(-90deg)",4);
    }
    $("#cubeFields").html(r);
    $("#rotLayer").html("")
    $(".mezo span").css("display",Disp);
}
const CV3344 = [1,1,10,17,19,33,28,49,37,65,46,81];
function creFaces(no,x,y,z,rotate,n=3) {
    let r="",d=n==4?26:30,i,j,x1,z1,y4,z4,udfbrl="",j1=0,clsM,clsN,no3;
    rotate=="X(-90deg)"&&z<0&&(x1=d,z1=0,y4=0,z4=d, udfbrl="U");
    rotate=="X(-90deg)"&&z>0&&(x1=d,z1=0,y4=0,z4=-d,udfbrl="D");
    rotate=="Y(-90deg)"&&z<0&&(x1=0,z1=d,y4=d,z4=0, udfbrl="L");
    rotate=="Y(-90deg)"&&z>0&&(x1=0,z1=-d,y4=d,z4=0,udfbrl="R");
    rotate=="X(0deg)"&&  z>0&&(x1=d,z1=0,y4=d,z4=0, udfbrl="F");
    rotate=="X(0deg)"&&  z<0&&(x1=-d,z1=0,y4=d,z4=0,udfbrl="B");
    for (i=0;i<n;i++) {
        j1 = [0,4,12,0][i];
        for (j=0;j<n;j++) {  // M=1,2,4 5,6,8 13,14,16　…　j1+=j,ij=i*4+j1 
            let segs = " matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,"+(x+j*x1)+","+(y+i*y4)+","+(z+i*z4+j*z1)+",1) rotate"+rotate ;
            no3 = (no>100)?no-100:no;
            clsN = no3+ i*n+j;
            if (n==3) { j1 += j; clsM = CV3344[CV3344.indexOf(no3)+1] + j1; }
            else                 clsM = clsN;
            r += '<div class="mezo'+ unfold(clsM," szin",4)+a[clsM]+ ' field mezo" ' +
                 'style="transform:'+segs+'"><span>'+(Face=="F"?"&nbsp;"+udfbrl:clsN) +'</span></div>';
        }
    }
    return r;
}            
function kiirRotLayer(r,e,n=N){
    if (Counter<0) return;
    let odiv, i, s, t, lo="", rr=r;

    if (typeof(r[0]) == 'object') rr = (n==3)?r[0]:r[0].concat(r.slice(1));
    for(i=0;i<rr.length;i++) {
        s = unfold(rr[i]," szin",n);
        t="#cubeFields .mezo"+ s.slice(0,-6);
        lo += '<div class="mezo'+ s +a[rr[i]]+' layer mezo" style="transform:'+
              $(t).css('transform')+'">'+$(t).html()+'</div>';
        $(t).hide();
    }
    if (e==99) { $("#rotLayer").html(lo); return;}
    const core_e1 =[0,1,2,3,4,5,6,2,1,3,10,10,10,13,14,15,16];
    const core_e2 =[0,0,0,0,0,0,0,4,6,5, 0, 2, 4, 1, 6, 3, 5];
    odiv = crtDiv(core_e1[e],n)+(core_e2[e]>0?crtDiv(core_e2[e],n):"");
    $("#cubeFields").append(odiv);
    $("#rotLayer").html(lo+odiv);
    $(".mezo span").css("display",Disp);
}
function unfold(i,szin,n=N) {
    if (FaceF=="") return i+szin+"e";
    if (cubey<355) return ((i>n*n)&&(i<n*n*2+1)||(i>n*n*4))?FaceF+i+szin+"f":i+szin+"e";
    if (cubey>365) return (i>n*n*3)?FaceF+i+szin+"f":i+szin+"e";
    return ((i>n*n)&&(i<n*n*2+1)||(i>n*n*3))?FaceF+i+szin+"f":i+szin+"e";
}

var cubex=-20, cubey=335, cubez=0, segs="yo";
var Pause=false, speed=80, NxPaus=1000;
var a=new Array(), s=new Array();
var Maprote = new Map([["F","FLBR"], ["f","flbr"],["L","LBRF"], ["l","lbrf"],
                       ["B","BRFL"], ["b","brfl"],["R","RFLB"], ["r","rflb"],
                       ["M","MsmS"], ["m","mSMs"],["S","SmsM"], ["s","sMSm"]]);
var N = 4; Disp="none", Face="F", FaceF="", Counter=0;
var Comment="", Tid=new Array(9), turnN=1, ClipDT="", W=null;
var Rotates = new Array();
var RotSft = 0, Urot = "", Urote = "";
var Fix33=false, Fix44=false, Auto=true;

function initnotscrambled(){
    let i,j;
    if (window.outerWidth<500) window.resizeTo(380,580);
    else                       window.resizeTo(590,500);
    speed=80; if (NxPaus<1100) NxPaus=1000;
    if (turnN==16) NxPaus=1500;
    Disp="none"; Auto=true; Pause=false; Cool=0;
    Face="F"; Comment=""; RotSft=0; Rotates=[]; turnN=1;
    for (i=0;i<9;i++) clearTimeout(Tid[i]);
    $("#solve3").attr('disabled',true);
    $("#parity").attr('disabled',true);
    $("#solve4").attr('disabled',false);
    $("#comment").html("");  $("#turn").html("&nbsp;"); $("#rotate").html("&nbsp;");
    if ((window.name=="cube3dg")||(window.name=="cube3dh")) setTimeout("checkRot()",100);
    initCube(N);
}
function initCube(n=4) {
    let i,j;
    N = n;
    for(a[0]=0,j=0;6>j;j++)for(i=1;17>i;i++)a[i+16*j]=(j==0)?8:j+1;
    kiirRotLayer(wholecube,99);
    kiir(n); NoRot = "";
    $(".mezo span").css("display",Disp);
}
Cool = 0; CoolTM = 0;
function allTest() {

        Auto = true;
        scramble4();
        NoRot = " *0c";
        Cool++;
        next44();
}
function waitFin(cnt=20) {
     let i, log = '【Trial count:'+Cool+' Moves:'+turnN+'】';

    if (Comment=="Fin") {
          console.log(log);
//          if (opener && opener.document.getElementsByName('pythonQ')) 
//               opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = log;
          for (i=0;i<9;i++) clearTimeout(Tid[i]);
          setTimeout('allTest();',cnt*100);
    }
}
function turn(a) {
    if (a!="") Rotates.push(a);
    clearTimeout(Tid[0]);
    setTimeout("checkRot();check33();",100);
}
function checkRot() {
    let rot,rote=0,s1,s2,t1,t2,lo="",newcolor="transparent"; 
    if (parent && ((window.name=="cube3dg")||(window.name=="cube3dh"))) {
        let rotbuf = (window.name=="cube3dg")?parent.RotatesG:parent.RotatesH;
        if (rotbuf.length>0) {
            rot = regRot(rotbuf.trim().split(" "));
            if (window.name=="cube3dg") parent.RotatesG = "";
            else                        parent.RotatesH = "";
            setRot(rot);
        }
    } /*
    else if ((window.name=="cube3d") || (parent.swin==null) || (parent.swin.closed)) {
        if (opener && opener.Rotates.length>0) {
            rot = regRot(opener.Rotates.trim().split(" "));
            opener.Rotates = "";
            setRot(rot);
        }
    } */
    if ((Pause==false) && (Rotates.length>0)) {
        if (Counter>0) rote = false;
        else rote = Rotates.shift();
        while (rote && (rote.charAt(0)=="*")) {
            Fix44 = false;
            if (rote=="*Fin") {
                Comment = "Fin"; check33();
                if ((NxPaus<700)&&(Rotates.length>0)) {
                    Comment = "Parity Process";
                    $("#parity").attr('disabled',true);
                }
                css44();
                if ((Cool>0)&&(Comment=="Fin")) { waitFin(); }
            }
            else if (rote.charAt(1)=="*") {      // step reset 
                Comment = rote.slice(2);
                check33(); turnN = 1;}
            else if (rote.charAt(1)=="#") { // flushing important post #mmnn of 4x4
                let cn, n=2, lo="", kuro="#888";
                while (n<rote.length-1) {
                    cn = parseInt(rote.slice(n,n+2));
                    s1 = unfold(cn," szin");
                    t1="#cubeFields .mezo"+ s1.slice(0,-6);
                    lo += '<div class="mezo'+s1+0+' field mezo" style="transform:'+$(t1).css('transform')+
                          ';"><span>'+ cn +'</span></div>';
                    $(t1).css("background-color",newcolor);
                    n += 2;
                }
                $("#rotLayer").html(lo); flush(200,4); Tid[0] = setTimeout("checkRot()",1000); return; }
            else if (rote.charAt(1)=="+") { // virtual Y rotation convert 
                RotSft = parseInt(rote.slice(2));} 
            else if (rote.charAt(1)=="-") { // Turn count decrement 
                turnN -= parseInt(rote.slice(2));} 
           else if (rote.charAt(1)=="0") { // Cube setup without rotation
                let i,j;
                if (rote.length==2) initCube();
                Counter = -1;  // NO rotation mode
                while (Rotates.length>0) {
                    let rot = Rotates.shift();
                    if (rot.charAt(0)=="*") break; 
                    turnN++;   
                    turnStart(dispRote(rot));
                }
                Counter = 0;  // Normal rotation mode
                kiirRotLayer(wholecube,99),kiir();
            } 
            else Comment = (Rotates.length==0)?"":rote.slice(1);  
            rote = Rotates.shift();
        }
        $("#comment").html(Comment);
        if (rote) {
            Urot = rote;
            Urote = dispRote(rote);
            turnStart(Urote);
        }
    }
    Tid[0] = setTimeout("checkRot()",NxPaus);
}
function dispRote(rot) {
    let rote = rot;
    $("#turn").html(String(turnN));
    if ((rot.charAt(0)=="M")||(rot.charAt(0)=="m")) 
        $("#rotate").html(rot.charAt(0)=="m"?rot.charAt(1) +"'"+rot.slice(2):rot.slice(1));
    else {
        $("#rotate").html((rot.charCodeAt(0) & 0x20)>0?String.fromCharCode(rot.charCodeAt(0) ^ 0x20)+"'"+rot.slice(1):rot);
        let rotm = Maprote.get(rot.charAt(0));
        rote = ((typeof rotm==='string')?rotm.charAt(RotSft):rot.charAt(0)) +rot.slice(1);
    }
    return rote;
}
function regRot(seq) {
    let seqR = seq.map(function (value, index, array) {
               return ((value.charCodeAt(0)<0x60)? 
                        (((value.charAt(1)=="'")||(value.charAt(2)=="'"))?
                               (String.fromCharCode(value.charCodeAt(0) ^ 0x20)+(value.charAt(2)=="'"?value.charAt(1)+value.charAt(3):value.charAt(2))):value):
                        (value.charAt(1)=="'")?"m"+value.charAt(0):"M"+value);
                });
    return seqR;
}
async function clipIn() {
    return (await navigator.clipboard.readText()
    .then((text) => {
        console.log(text);
        return (text);
    })
    .catch(err => {
//        console.error("text is nothing", err);
        return ("");
    }));
}
async function quickIn(lang="en") {
    let rot, RotatesText = "";
    let clipdt = await clipIn();
    let wh = window.outerHeight;
    window.resizeTo(540, wh);
    if (lang=="en") RotatesText = window.prompt("Input rotation symbols split by comma or space (xx2:twice)", clipdt);
    else        RotatesText = window.prompt("区切（スペースorコンマ）の回転記号文字列を貼り付けてください。", clipdt);
    parent.ClipDT = RotatesText;
    window.resizeTo(340, wh);
    if (RotatesText==null) { rot = []; Auto = false; }
    else if (RotatesText.indexOf(",")>-1) rot = regRot(RotatesText.trim().split(","));
         else                             rot = regRot(RotatesText.trim().split(" "));
    setRot(rot);
    clearTimeout(Tid[0]);
    setTimeout("checkRot()",100);
}
function setRot(rot) {
    let rotR = rot;
    if (rot[0]=="!") {
        rot.shift();
        rot.reverse();
        rotR = rot.map(function (value, index, array) {
               if (value.charAt(0)=="*") {
                   turnN += 2;
                   return value;
               }
               return (String.fromCharCode(value.charCodeAt(0) ^ 0x20)+value.slice(1));
        });
        turnN -= rot.length * 2;
    }
    Rotates = Rotates.concat(rotR);
}
const White=8,Orange=2,Green=3,Red=4,Blue=5,Yellow=6,ccoW=new Array(22,38,54,70,22),ccoY=new Array(22,70,54,38,22);
const c=new Array(6,7,10,11,22,23,26,27,38,39,42,43,54,55,58,59,75,74,71,70,86,87,90,91);  // center
const eg=new Array(72,21,76,25,69,56,73,60,40,53,44,57,37,24,41,28,
                   2,67,3,66,8,51,12,50,14,34,15,35,5,18,9,19,
                   94,79,95,78,88,62,92,63,82,46,83,47,85,31,89,30);                       // edge

var YdF,YtF,Yd,Ye;
function check33() {
    if ((N==3)||(Counter>0)) return;
    let i,diff;
    $("#solve3").attr('disabled',true);
    $("#parity").attr('disabled',true);
    for (i=0;i<24;i+=4) if ((a[c[i]]!=a[c[i+1]])|| (a[c[i+1]]!=a[c[i+3]])) return;
    if (a[6]==White)       { for (i=0;i<4 ;i++)  diff=a[ccoW[i+1]]-a[ccoW[i]];if((diff!=1)&&(diff!=-3))return; }
    else if (a[6]==Yellow) { for (i=0;i<4 ;i++)  diff=a[ccoY[i+1]]-a[ccoY[i]];if((diff!=1)&&(diff!=-3))return; }
    Ye=0; Yd = 0; YdF = 0; YtF = 0;
    for (i=16;i<32;i+=4)  { if (pairchk(i,"  ",6))  return; }
    for (i=32;i<48;i+=4)  { if (pairchk(i,"XX",86)) return; }
    for (i=0;i<8;i+=4)    { if (pairchk(i,"zZ",75)) return; }
    for (i=8;i<16;i+=4)   { if (pairchk(i,"zZ",38)) return; }
        function pairchk(i,bor,center) {
            if ((a[eg[i]]!=a[eg[i+2]])||(a[eg[i+1]]!=a[eg[i+3]])) return true;
            return false;  // continue  以下、不使用
        }
    $("#solve3").attr('disabled',false);
    if ((Comment!="Fin")&&(N!=0)&&(!Fix44)) N = 0,kiir(0); // 3x3 on cubes:96
//    if (opener && opener.ClipDT && (opener.ClipDT!="")) opener.ClipDT = "";
}
function solve44() {
    $("#solve4").attr('disabled',true);
    next44();
}
function next44() {
    if (Pause) { accel(false);return; }
    if ((Rotates.length>0)||(Counter>0)) {
        setTimeout("next44()",1000);return true; }

    check33();
    if($("#solve3").prop('disabled')==false) {
            flushB(200);if (Auto) pythonSolve();
            return; }
    if (((colorEg(2)==colorEg(14))&&(colorEg(3)==colorEg(15))) ||   
        ((colorEg(14)==colorEg(82))&&(colorEg(15)==colorEg(83)))) {
        flushB(200,8,"#edgeEx");edgeExchg();
        return false; }

    let i,j=0,s1,s2,t1,t2,lo="",kuro="#888",div,newcolor="transparent";
    for (i=0;i<24;i+=4) if ((a[c[i]]!=a[c[i+1]])|| (a[c[i+1]]!=a[c[i+3]])) {
        s1 = unfold(c[i]," szin");
        s2 = unfold(c[i+1]," szin");
        t1="#cubeFields .mezo"+ s1.slice(0,-6);
        t2="#cubeFields .mezo"+ s2.slice(0,-6);
        lo += '<div class="mezo'+ s1+ 0 +' layer mezo" style="transform:'+$(t1).css('transform')+'"></div>';
        lo += '<div class="mezo'+ s2+ 0 +' layer mezo" style="transform:'+$(t2).css('transform')+'"></div>';
        $(t1).css("background-color",newcolor); $(t2).css("background-color",newcolor);
    }
    if (lo=="") { Comment = ""; edgePair(); return; }

    if (!navigator.userAgent.match(/iPhone|Android.+/)) speed=40,NxPaus=500;
    if (cent6()) return;

    $("#solve4").attr('disabled',false);
    $("#rotLayer").html(lo);
    flush(200);
}
function flush(tm,cnt=8) {
    Counter++;
    setTimeout(function(){
        $("#rotLayer").toggle();
        cnt>Counter?flush(tm,cnt):($("#rotLayer").html(""), kiir(),Counter=0)},tm); // 
}
function flushB(tm,cnt=8,id="#solve3") {
    Counter++;
    setTimeout(function(){
        $(id).css('background-color',Counter%2?'#ce4b42':'#ccc');
        cnt>Counter?flushB(tm,cnt,id):($(id).css('background-color',""),Counter=0)},tm); // 
}
function pythonSolve() {
    Pause = true;
//    window.open('python/computing.html',"Python",'height=140,width=480,left='+(window.screenX+300)+',dependent=yes,scrollbars=no');
    setTimeout('goPython()',100); 
}
var preRot = "", Pi = -1;
function goPython() {
    let rotation = "", pari = 0;
    let r=new Array(1,17,68,4,65,52,16,49,36,13,33,20,93,80,29,96,64,77,84,48,61,81,32,45);
    let cx8=new Array(80,160,96,48,60,120,72,36);            // WOB,WRB,WGR,WGO,YBO,YBR,YGR,YGO  W=8
    let cx12=new Array(17,29,19,11,53,44,35,26,41,34,27,20); // BO,BR,GR,GO,WB,WR,WG,WO,YB,YR,YG,YO  W=8
    let i, ix, dx, corner="[", corner_d="[", edge="[", edge_d="[", c0=new Array();
    preRot=""; if (a[6]!=White) for (i=0;(i<4)&&(a[6]!=White);i++) { preRot+=" X'"; bor(); }
               if (i==4) { preRot="";for (i=0;(i<4)&&(a[6]!=White);i++) {preRot+=" Z'"; fd3(),bor(),fd(); }}
        for (i=0;(i<4)&&(a[38]!=Green);i++) {preRot+=" Y'"; fd3(); }
        for (i=0;i<24;i+=3) {
            c0[0]=a[r[i]],c0[1]=a[r[i+1]],c0[2]=a[r[i+2]];
            ix = cx8.indexOf(c0[0] * c0[1] * c0[2]); if (ix<0) alert("ix<0 in cx8");
            dx = c0.findIndex(function(v,n,a) { return (v==White || v==Yellow);});
            corner   += ix + ((i>20)?"]":",");
            corner_d += dx + ((i>20)?"]":",");
        }
        for (i=0;i<48;i+=4) {
            c0[0]=a[eg[i]]; c0[1]=a[eg[i+1]];
            ix = cx12.indexOf(c0[0] * c0[1] + c0[0]+ c0[1]);
            if (ix<0) alert("ix<0 in cx12 on cube"+eg[i]+eg[i+1]); 
            if (((c0[0]==White) || (c0[0]==Yellow)) ||
                 ((c0[0]==Blue)  && (ix<2))         ||
                 ((c0[0]==Green) && (ix<4)))     dx = 0;
            else dx = 1,pari++;
            if (ix==6) Pi = i;  // position of White_Green post
            edge   += ix + ((i>41)?"]":",");
            edge_d += dx + ((i>41)?"]":",");
        }
        if (pari&1) { // Odd Parity
            $("#parity").attr('disabled',false);
            if (Pi<0) alert('WG post not found');
            else {
                console.log('Parity='+Pi+" "+eg[Pi]);
                Pi = Pi>>1;
                edge_d = edge_d.slice(0,Pi+1)+(edge_d.charAt(Pi+1)=="0"?"1":"0")+edge_d.slice(Pi+2);
                // Reverse White-Green post for Resolver on odd parity
            }
        } else Pi = -1;
//        let q = 'value1='+corner+'&value2='+corner_d+'&value3='+edge+'&value4='+edge_d;
//        console.log(corner+corner_d+edge+edge_d);
//        W = window.open('https://mori1-hakua.tokyo/python/Cube2phase_Fast3.py?'+q ,"Python");
    cloudGo(corner,corner_d,edge,edge_d);
    $("#rotate").html("");
    $("#comment").html("Cloud computing!");
    flushB(200,8,"#comment");
}
function cloudGo(corner,corner_d,edge,edge_d) {
    $(function(){
      $.ajax({
        url:"https://mori1-hakua.tokyo/python/Cube2phase_Fast3.py",
        type:"POST",
//        async: false,
        data: {'value1':corner, 'value2':corner_d, 'value3':edge, 'value4':edge_d },
        dataType:"text",
        timeout: 10000
      })
      .done((data) => {
        Pause = false;
        window.focus();
        let rot = data.slice(data.indexOf('<div ')+16,data.indexOf('</div>'));
        $("#solve3").attr('disabled',true);
        if ((rot.indexOf('None *Fin')>0) && (NxPaus<800)) {
            css44();
            flushB(200,8,"#edgeEx");edgeExchg();
            return;
        }
        setRot(regRot(rot.replace('**','*').trim().split(" ")));
        if (Pi>=0)  Rotates = Rotates.concat(regRot(PP),["*Fin"]);
             // Restoring rotation for White_Green post
        $("#solve4").attr('disabled',false);
        clearTimeout(Tid[0]);
        setTimeout("checkRot()",100);
//        if (opener && opener.document.getElementsByName('pythonQ')) 
//            opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = preRot+" "+rot.replace('**','*');
        speed=40,NxPaus=500;
        if (preRot.length>0) {
            let preRotA = regRot(preRot.trim().split(" "));
            setRot(["*0c"]),setRot(["!"].concat(preRotA)),setRot(["*"].concat(preRotA)); // for View
            console.log(Rotates);
        }
        if ((NoRot=="")&&(!navigator.userAgent.match(/iPhone|Android.+/))) Pause = false;
      })
      .fail((data) => {
        console.log(data.responseText+"　Retry?");
        goPython();
      })
    });
}
function facerotate(a, tm) {
    if (Counter<0) return;
    var w = tm * 10 * Counter;
    setTimeout(function(){
11==a&&$("#rotLayer").css("transform","rotateY(-"+w+"deg)"),12==a&&$("#rotLayer").css("transform","rotateY("+w+"deg)"),
21==a&&$("#rotLayer").css("transform","rotateX(-"+w+"deg)"),22==a&&$("#rotLayer").css("transform","rotateX("+w+"deg)"),
31==a&&$("#rotLayer").css("transform","rotateZ("+w+"deg)"),32==a&&$("#rotLayer").css("transform","rotateZ(-"+w+"deg)"),
41==a&&$("#rotLayer").css("transform","rotateX("+w+"deg)"),42==a&&$("#rotLayer").css("transform","rotateX(-"+w+"deg)"),
51==a&&((FaceF=="f")&&$("#rotLayer").css("transform-origin","90% 50%"),$("#rotLayer").css("transform","rotateZ(-"+w+"deg)")),
52==a&&((FaceF=="f")&&$("#rotLayer").css("transform-origin","90% 50%"),$("#rotLayer").css("transform","rotateZ("+w+"deg)")),
61==a&&$("#rotLayer").css("transform","rotateY("+w+"deg)"),62==a&&$("#rotLayer").css("transform","rotateY(-"+w+"deg)"),
71==a&&$("#rotLayer").css("transform","rotateX(-"+w+"deg)"),72==a&&$("#rotLayer").css("transform","rotateX("+w+"deg)"),
81==a&&$("#rotLayer").css("transform","rotateX(-"+w+"deg)"),82==a&&$("#rotLayer").css("transform","rotateX("+w+"deg)"),
91==a&&$("#rotLayer").css("transform","rotateX("+w+"deg)"),92==a&&$("#rotLayer").css("transform","rotateX(-"+w+"deg)"),
101==a&&$("#rotLayer").css("transform","rotateX("+w+"deg)"),102==a&&$("#rotLayer").css("transform","rotateX(-"+w+"deg)"),
111==a&&$("#rotLayer").css("transform","rotateY(-"+w+"deg)"),112==a&&$("#rotLayer").css("transform","rotateY("+w+"deg)"),
121==a&&$("#rotLayer").css("transform","rotateZ("+w+"deg)"),122==a&&$("#rotLayer").css("transform","rotateZ(-"+w+"deg)"),
    Counter++,10>Counter?facerotate(a, tm):($("#rotLayer").html(""),$("#rotLayer").css("transform","rotateY(0deg)"),  //  
    $("#rotLayer").css("transform-origin","50% 50%"),kiir(),Counter=0,turnN+=1)},speed)}
                                  
function turnStart(a){
    if ((a.charAt(1)=="2")||(a.charAt(2)=="2")) {
        turnStart2(a.slice(0,2));
        return;
    }
    0>=Counter&&(
"U"==a&&(kiirRotLayer(layeru,1),facerotate(11,1),uu()),"u"==a&&(kiirRotLayer(layeru,1),facerotate(12,1),ui()),
"R"==a&&(kiirRotLayer(layerr,4),facerotate(41,1),rr()),"r"==a&&(kiirRotLayer(layerr,4),facerotate(42,1),ri()),
"D"==a&&(kiirRotLayer(layerd,6),facerotate(61,1),dd()),"d"==a&&(kiirRotLayer(layerd,6),facerotate(62,1),di()),
"F"==a&&(kiirRotLayer(layerf,3),facerotate(31,1),ff()),"f"==a&&(kiirRotLayer(layerf,3),facerotate(32,1),fi()),
"B"==a&&(kiirRotLayer(layerb,5),facerotate(51,1),bb()),"b"==a&&(kiirRotLayer(layerb,5),facerotate(52,1),bi()),
"L"==a&&(kiirRotLayer(layerl,2),facerotate(21,1),ll()),"l"==a&&(kiirRotLayer(layerl,2),facerotate(22,1),li()),
"X"==a&&(kiirRotLayer(wholecube,99),facerotate(101,1),bor2(),bor()),"x"==a&&(kiirRotLayer(wholecube,99),facerotate(102,1),bor()),
"Y"==a&&(kiirRotLayer(wholecube,99),facerotate(111,1),fd()),"y"==a&&(kiirRotLayer(wholecube,99),facerotate(112,1),fd3()),
"Z"==a&&(kiirRotLayer(wholecube,99),facerotate(121,1),fd(),bor(),fd3()),"z"==a&&(kiirRotLayer(wholecube,99),facerotate(122,1),fd3(),bor(),fd()),
"M"==a&&(kiirRotLayer(layerm,7),facerotate(71,1),bor(),rr(),li()),"m"==a&&(kiirRotLayer(layerm,7),facerotate(72,1),bor2(),bor(),ri(),ll()),
"Mu"==a&&(kiirRotLayer(layermu,13),facerotate(11,1),Mu()),"mu"==a&&(kiirRotLayer(layermu,13),facerotate(12,1),mu()),
"Mr"==a&&(kiirRotLayer(layermr,12),facerotate(41,1),Mr()),"mr"==a&&(kiirRotLayer(layermr,12),facerotate(42,1),mr()),
"Md"==a&&(kiirRotLayer(layermd,14),facerotate(61,1),Md()),"md"==a&&(kiirRotLayer(layermd,14),facerotate(62,1),md()),
"Mf"==a&&(kiirRotLayer(layermf,15),facerotate(31,1),Mf()),"mf"==a&&(kiirRotLayer(layermf,15),facerotate(32,1),mf()),
"Mb"==a&&(kiirRotLayer(layermb,16),facerotate(51,1),Mb()),"mb"==a&&(kiirRotLayer(layermb,16),facerotate(52,1),mb()),
"Ml"==a&&(kiirRotLayer(layerml,11),facerotate(21,1),Ml()),"ml"==a&&(kiirRotLayer(layerml,11),facerotate(22,1),ml()),
"Lw"==a&&(kiirRotLayer(layerlw,10),facerotate(81,1),ll(),Ml()),"lw"==a&&(kiirRotLayer(layerlw,10),facerotate(82,1),li(),ml()),
"Rw"==a&&(kiirRotLayer(layerrw,10),facerotate(91,1),rr(),Mr()),"rw"==a&&(kiirRotLayer(layerrw,10),facerotate(92,1),ri(),mr()))
}
function turnStart2(a){
    0>=Counter&&(
"U2"==a&&(kiirRotLayer(layeru,1),facerotate(11,2),u2()     ),"u2"==a&&(kiirRotLayer(layeru,1),facerotate(12,2),u2()  ),
"R2"==a&&(kiirRotLayer(layerr,4),facerotate(41,2),ri2()    ),"r2"==a&&(kiirRotLayer(layerr,4),facerotate(42,2),ri2() ),
"D2"==a&&(kiirRotLayer(layerd,6),facerotate(61,2),dd(),dd()),"d2"==a&&(kiirRotLayer(layerd,6),facerotate(62,2),di2() ),
"F2"==a&&(kiirRotLayer(layerf,3),facerotate(31,2),ff(),ff()),"f2"==a&&(kiirRotLayer(layerf,3),facerotate(32,2),fi(),fi()),
"B2"==a&&(kiirRotLayer(layerb,5),facerotate(51,2),bb(),bb()),"b2"==a&&(kiirRotLayer(layerb,5),facerotate(52,2),bi(),bi()),
"L2"==a&&(kiirRotLayer(layerl,2),facerotate(21,2),l2()     ),"l2"==a&&(kiirRotLayer(layerl,2),facerotate(22,2),l2()  ),
"M2"==a&&(kiirRotLayer(layerm,7),facerotate(71,2),bor(),rr(),li(),bor(),rr(),li()),"m2"==a&&(kiirRotLayer(layerm,7),facerotate(72,2),bor2(),bor(),ri(),ll(),bor2(),bor(),ri(),ll()),
"X2"==a&&(kiirRotLayer(wholecube,99),facerotate(101,2),bor2()),"x2"==a&&(kiirRotLayer(wholecube,99),facerotate(102,2),bor2()),
"Y2"==a&&(kiirRotLayer(wholecube,99),facerotate(111,2),fd2()),"y2"==a&&(kiirRotLayer(wholecube,99),facerotate(112,2),fd2()),
"Z2"==a&&(kiirRotLayer(wholecube,99),facerotate(121,2),fd(),bor2(),bor(),fd3()),"z2"==a&&(kiirRotLayer(wholecube,99),facerotate(122,2),fd3(),bor2(),fd()),
"Mu"==a&&(kiirRotLayer(layermu,13),facerotate(11,2),Mu(),Mu()),"mu"==a&&(kiirRotLayer(layermu,13),facerotate(12,2),mu(),mu()),
"Mr"==a&&(kiirRotLayer(layermr,12),facerotate(41,2),Mr(),Mr()),"mr"==a&&(kiirRotLayer(layermr,12),facerotate(42,2),mr(),mr()),
"Md"==a&&(kiirRotLayer(layermd,14),facerotate(61,2),Md(),Md()),"md"==a&&(kiirRotLayer(layermd,14),facerotate(62,2),md(),md()),
"Mf"==a&&(kiirRotLayer(layermf,15),facerotate(31,2),Mf(),Mf()),"mf"==a&&(kiirRotLayer(layermf,15),facerotate(32,2),mf(),mf()),
"Mb"==a&&(kiirRotLayer(layermb,16),facerotate(51,2),Mb(),Mb()),"mb"==a&&(kiirRotLayer(layermb,16),facerotate(52,2),mb(),mb()),
"Ml"==a&&(kiirRotLayer(layerml,11),facerotate(21,2),Ml(),Ml()),"ml"==a&&(kiirRotLayer(layerml,11),facerotate(22,2),ml(),ml()),
"Lw"==a&&(kiirRotLayer(layerlw,10),facerotate(81,2),ll(),Ml(),ll(),Ml()),"lw"==a&&(kiirRotLayer(layerlw,10),facerotate(82,2),li(),ml(),li(),ml()),
"Rw"==a&&(kiirRotLayer(layerrw,10),facerotate(91,2),rr(),Mr(),rr(),Mr()),"rw"==a&&(kiirRotLayer(layerrw,10),facerotate(92,2),ri(),mr(),ri(),mr()))
}

function bor(){
    s[1]=a[2],s[2]=a[6],s[3]=a[10],s[4]=a[14],a[2]=a[79],a[6]=a[75],a[10]=a[71],a[14]=a[67],a[79]=a[82],a[75]=a[86],a[71]=a[90],a[67]=a[94],a[82]=a[34],a[86]=a[38],a[90]=a[42],a[94]=a[46],a[34]=s[1],a[38]=s[2],a[42]=s[3],a[46]=s[4],
    s[1]=a[3],s[2]=a[7],s[3]=a[11],s[4]=a[15],a[3]=a[78],a[7]=a[74],a[11]=a[70],a[15]=a[66],a[78]=a[83],a[74]=a[87],a[70]=a[91],a[66]=a[95],a[83]=a[35],a[87]=a[39],a[91]=a[43],a[95]=a[47],a[35]=s[1],a[39]=s[2],a[43]=s[3],a[47]=s[4],
    ll(),ri()}
function bor2(){
    s[1]=a[2],s[2]=a[6],s[3]=a[10],s[4]=a[14],a[2]=a[82],a[6]=a[86],a[10]=a[90],a[14]=a[94],a[82]=s[1],a[86]=s[2],a[90]=s[3],a[94]=s[4],s[1]=a[46],s[2]=a[42],s[3]=a[38],s[4]=a[34],a[46]=a[67],a[42]=a[71],a[38]=a[75],a[34]=a[79],a[67]=s[1],a[71]=s[2],a[75]=s[3],a[79]=s[4],
    s[1]=a[3],s[2]=a[7],s[3]=a[11],s[4]=a[15],a[3]=a[83],a[7]=a[87],a[11]=a[91],a[15]=a[95],a[83]=s[1],a[87]=s[2],a[91]=s[3],a[95]=s[4],s[1]=a[47],s[2]=a[43],s[3]=a[39],s[4]=a[35],a[47]=a[66],a[43]=a[70],a[39]=a[74],a[35]=a[78],a[66]=s[1],a[70]=s[2],a[74]=s[3],a[78]=s[4],
    l2(),ri2()}
function rot(){
    s[1]=a[45],s[2]=a[46],s[3]=a[47],s[4]=a[48],a[45]=a[29],a[46]=a[30],a[47]=a[31],a[48]=a[32],a[29]=a[77],a[30]=a[78],a[31]=a[79],a[32]=a[80], a[77]=a[61],a[78]=a[62],a[79]=a[63],a[80]=a[64],a[61]=s[1],a[62]=s[2],a[63]=s[3],a[64]=s[4],
    s[1]=a[82],s[2]=a[83],s[3]=a[84],a[84]=a[81],a[83]=a[85],a[82]=a[89],a[81]=a[93],a[85]=a[94],a[89]=a[95],a[93]=a[96],a[94]=a[92],a[95]=a[88],a[88]=s[1],a[92]=s[2],a[96]=s[3], s[4]=a[87],a[87]=a[86],a[86]=a[90],a[90]=a[91],a[91]=s[4]}
function roti(){
    s[1]=a[45],s[2]=a[46],s[3]=a[47],s[4]=a[48],a[45]=a[61],a[46]=a[62],a[47]=a[63],a[48]=a[64],a[61]=a[77],a[62]=a[78],a[63]=a[79],a[64]=a[80], a[77]=a[29],a[78]=a[30],a[79]=a[31],a[80]=a[32],a[29]=s[1],a[30]=s[2],a[31]=s[3],a[32]=s[4],
    s[1]=a[81],s[2]=a[82],s[3]=a[83],a[81]=a[84],a[82]=a[88],a[83]=a[92],a[84]=a[96],a[88]=a[95],a[92]=a[94],a[96]=a[93],a[95]=a[89],a[94]=a[85],a[93]=s[1],a[89]=s[2],a[85]=s[3], s[4]=a[86],a[86]=a[87],a[87]=a[91],a[91]=a[90],a[90]=s[4]}
function fd(){
    uu(),
    s[1]=a[37],s[2]=a[38],s[3]=a[39],s[4]=a[40],a[37]=a[53],a[38]=a[54],a[39]=a[55],a[40]=a[56],a[53]=a[69],a[54]=a[70],a[55]=a[71],a[56]=a[72],a[69]=a[21],a[70]=a[22],a[71]=a[23],a[72]=a[24],a[21]=s[1],a[22]=s[2],a[23]=s[3],a[24]=s[4],
    s[1]=a[41],s[2]=a[42],s[3]=a[43],s[4]=a[44],a[41]=a[57],a[42]=a[58],a[43]=a[59],a[44]=a[60],a[57]=a[73],a[58]=a[74],a[59]=a[75],a[60]=a[76],a[73]=a[25],a[74]=a[26],a[75]=a[27],a[76]=a[28],a[25]=s[1],a[26]=s[2],a[27]=s[3],a[28]=s[4],
    roti()}
function fd2(){
    u2(),
    s[1]=a[37],s[2]=a[38],s[3]=a[39],s[4]=a[40],a[37]=a[69],a[38]=a[70],a[39]=a[71],a[40]=a[72],a[69]=s[1] ,a[70]=s[2] ,a[71]=s[3] ,a[72]=s[4],s[1]=a[21],s[2]=a[22],s[3]=a[23],s[4]=a[24],a[21]=a[53],a[22]=a[54],a[23]=a[55],a[24]=a[56],a[53]=s[1] ,a[54]=s[2] ,a[55]=s[3],a[56]=s[4],
    s[1]=a[41],s[2]=a[42],s[3]=a[43],s[4]=a[44],a[41]=a[73],a[42]=a[74],a[43]=a[75],a[44]=a[76],a[73]=s[1] ,a[74]=s[2] ,a[75]=s[3] ,a[76]=s[4],s[1]=a[25],s[2]=a[26],s[3]=a[27],s[4]=a[28],a[25]=a[57],a[26]=a[58],a[27]=a[59],a[28]=a[60],a[57]=s[1] ,a[58]=s[2] ,a[59]=s[3],a[60]=s[4],
    s[1]=a[45],s[2]=a[46],s[3]=a[47],s[4]=a[48],a[45]=a[77],a[46]=a[78],a[47]=a[79],a[48]=a[80],a[77]=s[1] ,a[78]=s[2] ,a[79]=s[3] ,a[80]=s[4],s[1]=a[29],s[2]=a[30],s[3]=a[31],s[4]=a[32],a[29]=a[61],a[30]=a[62],a[31]=a[63],a[32]=a[64],a[61]=s[1] ,a[62]=s[2] ,a[63]=s[3],a[64]=s[4],
    s[1]=a[81],s[2]=a[82],s[3]=a[83],s[4]=a[84],a[81]=a[96],a[82]=a[95],a[83]=a[94],a[84]=a[93], a[96]=s[1],a[95]=s[2],a[94]=s[3],a[93]=s[4],s[1]=a[85],s[2]=a[86],s[3]=a[87], s[4]=a[88],a[85]=a[92],a[86]=a[91],a[87]=a[90],a[88]=a[89], a[92]=s[1],a[91]=s[2],a[90]=s[3],a[89]=s[4]} 
function fd3(){
    fd2(),fd()}
function uu(){
    s[1]=a[33],s[2]=a[34],s[3]=a[35],s[4]=a[36],a[33]=a[49],a[34]=a[50],a[35]=a[51],a[36]=a[52],a[49]=a[65],a[50]=a[66],a[51]=a[67],a[52]=a[68],a[65]=a[17],a[66]=a[18],a[67]=a[19],a[68]=a[20],a[17]=s[1],a[18]=s[2],a[19]=s[3],a[20]=s[4],
    s[1]=a[13], s[2]=a[14], s[3]=a[15], a[13]=a[16],a[14]=a[12],a[15]=a[8],a[16]=a[4],a[12]=a[3],a[8]=a[2],a[4]=a[1],a[3]=a[5],a[2]=a[9],a[1]=s[1],a[5]=s[2],a[9]=s[3], s[4]=a[6],a[6]=a[10],a[10]=a[11],a[11]=a[7],a[7]=s[4]}
function u2(){
    s[1]=a[33],s[2]=a[34],s[3]=a[35],s[4]=a[36],a[33]=a[65],a[34]=a[66],a[35]=a[67],a[36]=a[68],a[65]=s[1] ,a[66]=s[2] ,a[67]=s[3] ,a[68]=s[4],s[1]=a[17],s[2]=a[18],s[3]=a[19],s[4]=a[20],a[17]=a[49],a[18]=a[50],a[19]=a[51],a[20]=a[52],a[49]=s[1] ,a[50]=s[2] ,a[51]=s[3],a[52]=s[4],
    s[1]=a[1], s[2]=a[2], s[3]=a[3] ,s[4]=a[4] ,a[1]=a[16],a[2]=a[15],a[3]=a[14],a[4]=a[13], a[16]=s[1],a[15]=s[2],a[14]=s[3],a[13]=s[4], s[1]=a[5], s[2]=a[6], s[3]=a[7] ,s[4]=a[8] ,a[5]=a[12],a[6]=a[11],a[7]=a[10],a[8]=a[9], a[12]=s[1],a[11]=s[2],a[10]=s[3],a[9]=s[4]} 
function ui(){
    u2(),uu()}
function ff(){
    bor(),rot(),bor2(),bor()}
function fi(){
    bor(),roti(),bor2(),bor()}
function rr(){
    fd(),ff(),fd3()}
function ri(){
    s[1]=a[4],s[2]=a[8],s[3]=a[12],s[4]=a[16],a[4]=a[77],a[8]=a[73],a[12]=a[69],a[16]=a[65],a[77]=a[84],a[73]=a[88],a[69]=a[92],a[65]=a[96],a[84]=a[36],a[88]=a[40],a[92]=a[44],a[96]=a[48],a[36]=s[1],a[40]=s[2],a[44]=s[3],a[48]=s[4],
    s[1]=a[51],s[2]=a[50],s[3]=a[49],a[49]=a[52],a[52]=a[64],a[51]=a[60],a[50]=a[56],a[56]=a[63],a[60]=a[62],a[64]=a[61],a[63]=a[57],a[62]=a[53], a[61]=s[3],a[57]=s[2],a[53]=s[1], s[4]=a[54],a[54]=a[55],a[55]=a[59],a[59]=a[58],a[58]=s[4]}
function ri2(){
    s[1]=a[4],s[2]=a[8],s[3]=a[12],s[4]=a[16],a[4]=a[84],a[8]=a[88],a[12]=a[92],a[16]=a[96],a[84]=s[1],a[88]=s[2],a[92]=s[3],a[96]=s[4],s[1]=a[48],s[2]=a[44],s[3]=a[40],s[4]=a[36],a[48]=a[65],a[44]=a[69],a[40]=a[73],a[36]=a[77],a[65]=s[1],a[69]=s[2],a[73]=s[3],a[77]=s[4],
    s[1]=a[52],s[2]=a[51],s[3]=a[50],s[4]=a[49],a[52]=a[61],a[51]=a[62],a[50]=a[63],a[49]=a[64], a[61]=s[1],a[62]=s[2],a[63]=s[3],a[64]=s[4], s[1]=a[56],s[2]=a[55],s[3]=a[54],s[4]=a[53],a[56]=a[57],a[55]=a[58],a[54]=a[59],a[53]=a[60],a[57]=s[1],a[58]=s[2],a[59]=s[3],a[60]=s[4]}
function ll(){
    s[1]=a[1],s[2]=a[5],s[3]= a[9],s[4]=a[13],a[1]=a[80],a[5]=a[76], a[9]=a[72],a[13]=a[68],a[80]=a[81],a[76]=a[85],a[72]=a[89],a[68]=a[93],a[81]=a[33],a[85]=a[37],a[89]=a[41],a[93]=a[45],a[33]=s[1],a[37]=s[2],a[41]=s[3],a[45]=s[4],
    s[1]=a[18],s[2]=a[19],s[3]=a[20],a[18]=a[25],a[19]=a[21],a[20]=a[17],a[25]=a[31],a[21]=a[30],a[17]=a[29],a[29]=a[32],a[30]=a[28],a[31]=a[24], a[32]=s[3],a[28]=s[2],a[24]=s[1], s[4]=a[23],a[23]=a[22],a[22]=a[26],a[26]=a[27],a[27]=s[4]}
function l2(){
    s[1]=a[1],s[2]=a[5],s[3]=a[9], s[4]=a[13],a[1]=a[81],a[5]=a[85], a[9]=a[89],a[13]=a[93],a[81]=s[1],a[85]=s[2],a[89]=s[3],a[93]=s[4],s[1]=a[45],s[2]=a[41],s[3]=a[37],s[4]=a[33],a[45]=a[68],a[41]=a[72],a[37]=a[76],a[33]=a[80],a[68]=s[1],a[72]=s[2],a[76]=s[3],a[80]=s[4],
    s[1]=a[17],s[2]=a[18],s[3]=a[19],s[4]=a[20],a[17]=a[32],a[18]=a[31],a[19]=a[30],a[20]=a[29], a[32]=s[1],a[31]=s[2],a[30]=s[3],a[29]=s[4], s[1]=a[21],s[2]=a[22],s[3]=a[23],s[4]=a[24],a[24]=a[25],a[23]=a[26],a[22]=a[27],a[21]=a[28],a[28]=s[1],a[27]=s[2],a[26]=s[3],a[25]=s[4]}
function li(){
    l2(),ll()}
function dd(){
    rot()}
function di(){
    roti()}
function di2(){
    roti(),roti()}
function bb(){
    bor2(),bor(),rot(),bor()}
function bi(){
    bor2(),bor(),roti(),bor()}
function Mu(){
    fd(),bor(),fd3(),Mr(),fd3(),bor(),fd()}
function Mr(){
    s[1]=a[3],s[2]=a[7],s[3]=a[11],s[4]=a[15],a[3]=a[35],a[7]=a[39],a[11]=a[43],a[15]=a[47],a[35]=a[83],a[39]=a[87],a[43]=a[91],a[47]=a[95],a[83]=a[78],a[87]=a[74],a[91]=a[70],a[95]=a[66],a[78]=s[1],a[74]=s[2],a[70]=s[3],a[66]=s[4]}
function Md(){
    fd(),bor(),fd3(),Ml(),fd3(),bor(),fd()}
function Mf(){
    fd3(),Mr(),fd()}
function Mb(){
    fd3(),Ml(),fd()}
function Ml(){
    s[1]=a[2],s[2]=a[6],s[3]=a[10],s[4]=a[14],a[2]=a[79],a[6]=a[75],a[10]=a[71],a[14]=a[67],a[79]=a[82],a[75]=a[86],a[71]=a[90],a[67]=a[94],a[82]=a[34],a[86]=a[38],a[90]=a[42],a[94]=a[46],a[34]=s[1],a[38]=s[2],a[42]=s[3],a[46]=s[4]}
function mu(){
    fd(),bor(),fd3(),mr(),fd3(),bor(),fd()}
function mr(){
    s[1]=a[3],s[2]=a[7],s[3]=a[11],s[4]=a[15],a[3]=a[78],a[7]=a[74],a[11]=a[70],a[15]=a[66],a[78]=a[83],a[74]=a[87],a[70]=a[91],a[66]=a[95],a[83]=a[35],a[87]=a[39],a[91]=a[43],a[95]=a[47],a[35]=s[1],a[39]=s[2],a[43]=s[3],a[47]=s[4]}
function md(){
    fd(),bor(),fd3(),ml(),fd3(),bor(),fd()}
function mf(){
    fd3(),mr(),fd()}
function mb(){
    fd3(),ml(),fd()}
function ml(){
    s[1]=a[2],s[2]=a[6],s[3]=a[10],s[4]=a[14],a[2]=a[34],a[6]=a[38],a[10]=a[42],a[14]=a[46],a[34]=a[82],a[38]=a[86],a[42]=a[90],a[46]=a[94],a[82]=a[79],a[86]=a[75],a[90]=a[71],a[94]=a[67],a[79]=s[1],a[75]=s[2],a[71]=s[3],a[67]=s[4]}
function Rw() {
    Mr(),rr()}
function Rwi() {
    mr(),ri()}

function scramble(){
    scramble3();
    $("#solve3").attr('disabled',false);
//    if (opener && opener.ClipDT && (opener.ClipDT!="")) opener.ClipDT = "";
}
function scramble3(){
    let i,j,sym="";
    const rotS = "U,U',U2,F,F',F2,D,D',D2,B,B',B2,R,R',R2,L,L',L2".split(",");
    initCube(0);
    for(i=0;22>i;i++)rand=Math.floor(18*Math.random()),sym+=rotS[rand]+" ",
        0==rand&&uu(),1==rand&&ui(),2==rand&&u2(),3==rand&&ff(),4==rand&&fi(),5==rand&&(ff(),ff()),6==rand&&dd(),7==rand&&di(),8==rand&&(dd(),dd()),9==rand&&bb(),10==rand&&bi(),11==rand&&(bb(),bb()),12==rand&&rr(),13==rand&&ri(),14==rand&&(rr(),rr()),15==rand&&ll(),16==rand&&li(),17==rand&&l2();
    symset(sym);
}
function scramble4(){
    let i,j,sym="";
    const rotS = "U,U',U2,u,u',u2,F,F',F2,f,f',f2,D,D',D2,d,d',d2,B,B',B2,b,b',b2,R,R',R2,r,r',r2,L,L',L2,l,l',l2".split(",");
    css44(0);
    initCube(4);
    for(i=0;50>i;i++)rand=Math.floor(36*Math.random()),sym+=rotS[rand]+" ",
         0==rand&&uu(), 1==rand&&ui(), 2==rand&&u2(), 3==rand&&Mu(), 4==rand&&mu(), 5==rand&&(mu(),mu()), 6==rand&&ff(), 7==rand&&fi(), 8==rand&&(ff(),ff()), 9==rand&&Mf(),10==rand&&mf(),11==rand&&(mf(),mf()),12==rand&&dd(),13==rand&&di(),14==rand&&(dd(),dd()),15==rand&&Md(),16==rand&&md(),17==rand&&(md(),md()),
        18==rand&&bb(),19==rand&&bi(),20==rand&&(bb(),bb()),21==rand&&Mb(),22==rand&&mb(),23==rand&&(mb(),mb()),24==rand&&rr(),25==rand&&ri(),26==rand&&(rr(),rr()),27==rand&&Mr(),28==rand&&mr(),29==rand&&(mr(),mr()),30==rand&&ll(),31==rand&&li(),32==rand&&(ll(),ll()),33==rand&&Ml(),34==rand&&ml(),35==rand&&(ml(),ml());
    $("#solve3").attr('disabled',true);
    $("#solve4").attr('disabled',false);
    symset(sym);
}
function symset(sym) {
    turnN = 1;
    ClipDT = sym;
    kiirRotLayer(wholecube,99),kiir();
//    if (opener) {
//        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = sym;
//        if (typeof opener.ClipDT!=="undefined") opener.ClipDT = sym;
//    } else
    $("#comment").html(sym);
}
const
layeru=[ 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,33,34,35,36,49,50,51,52,65,66,67,68],
layerl=[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32, 1, 5, 9,13,33,37,41,45,68,72,76,80,81,85,89,93],
layerf=[33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,13,14,15,16,20,24,28,32,49,53,57,61,81,82,83,84],
layerr=[49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64, 4, 8,12,16,36,40,44,48,65,69,73,77,84,88,92,96],
layerb=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80, 1, 2, 3, 4,17,21,25,29,52,56,60,64,93,94,95,96],
layerd=[81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,29,30,31,32,45,46,47,48,61,62,63,64,77,78,79,80],
layerm =[2, 3, 6, 7,10,11,14,15,34,35,38,39,42,43,46,47,66,67,70,71,74,75,78,79,82,83,86,87,90,91,94,95],
layerml=[ 2, 6,10,14,34,38,42,46,67,71,75,79,82,86,90,94],
layermr=[ 3, 7,11,15,35,39,43,47,66,70,74,78,83,87,91,95],
layermu=[21,22,23,24,37,38,39,40,53,54,55,56,69,70,71,72],
layermd=[25,26,27,28,41,42,43,44,57,58,59,60,73,74,75,76],
layermf=[ 9,10,11,12,19,23,27,31,50,54,58,62,85,86,87,88],
layermb=[ 5, 6, 7, 8,18,22,26,30,51,55,59,63,89,90,91,92],
layerlw=[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32, 1, 5, 9,13,33,37,41,45,68,72,76,80,81,85,89,93, 2, 6,10,14,34,38,42,46,67,71,75,79,82,86,90,94],
layerrw=[49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64, 4, 8,12,16,36,40,44,48,65,69,73,77,84,88,92,96, 3, 7,11,15,35,39,43,47,66,70,74,78,83,87,91,95],
layer33=Array.from(new Set([].concat(layeru[0],layerl[0],layerf[0],layerr[0],layerb[0],layerd[0])));
const cubes44=[...[...Array(96)].map((v, i)=> i+1)].filter(function(value, index, array) {
  return (!layer33.includes(value));
});
const wholecube=[layer33,...cubes44];

$(document).ready(function(){
    initnotscrambled(),
  $(".rotateU").mousedown(function(){  turn("U")}),
  $(".rotateUi").mousedown(function(){ turn("u")}),
  $(".rotateR").mousedown(function(){  turn("R")}),
  $(".rotateRi").mousedown(function(){ turn("r")}),
  $(".rotateD").mousedown(function(){  turn("D")}),
  $(".rotateDi").mousedown(function(){ turn("d")}),
  $(".rotateF").mousedown(function(){  turn("F")}),
  $(".rotateFi").mousedown(function(){ turn("f")}),
  $(".rotateB").mousedown(function(){  turn("B")}),
  $(".rotateBi").mousedown(function(){ turn("b")}),
  $(".rotateL").mousedown(function(){  turn("L")}),
  $(".rotateLi").mousedown(function(){ turn("l")}),
  $(".rotateu").mousedown(function(){  turn("Mu")}),
  $(".rotateui").mousedown(function(){ turn("mu")}),
  $(".rotater").mousedown(function(){  turn("Mr")}),
  $(".rotateri").mousedown(function(){ turn("mr")}),
  $(".rotated").mousedown(function(){  turn("Md")}),
  $(".rotatedi").mousedown(function(){ turn("md")}),
  $(".rotatef").mousedown(function(){  turn("Mf")}),
  $(".rotatefi").mousedown(function(){ turn("mf")}),
  $(".rotateb").mousedown(function(){  turn("Mb")}),
  $(".rotatebi").mousedown(function(){ turn("mb")}),
  $(".rotatel").mousedown(function(){  turn("Ml")}),
  $(".rotateli").mousedown(function(){ turn("ml")}),
/*
*/
  $(".rotateLw").mousedown(function(){  turn("Lw")}),
  $(".rotateLwi").mousedown(function(){ turn("lw")}),
  $(".rotateM").mousedown(function(){   turn("M")}),
  $(".rotateMi").mousedown(function(){  turn("m")}),
  $(".rotateRw").mousedown(function(){  turn("Rw")}),
  $(".rotateRwi").mousedown(function(){ turn("rw")}),
  $(".rotateX").mousedown(function(){   turn("X")}),
  $(".rotateY").mousedown(function(){   turn("Y")}),
  $(".rotateZ").mousedown(function(){   turn("Z")}),
  $(".rotateXi").mousedown(function(){  turn("x")}),
  $(".rotateYi").mousedown(function(){  turn("y")}),
  $(".rotateZi").mousedown(function(){  turn("z")}),
  $(".rotateKiir").mousedown(function(){  kiir()}),
  $(".rotateXview").mousedown(function(){ if ((FaceF=="")||(cubex<-5)) cubex+=5,rotCubeXY()}),
  $(".rotateYview").mousedown(function(){ if ((FaceF=="")||(cubey<420)) cubey+=5,rotCubeXY()}),
  $(".rotateZview").mousedown(function(){ cubez+=5,rotCube()}),
  $(".rotateXview").mouseup(function(){   if ((FaceF=="")||(cubex<-5)) cubex+=5,rotCubeXY()}),
  $(".rotateYview").mouseup(function(){   if ((FaceF=="")||(cubey<420)) cubey+=5,rotCubeXY()}),
  $(".rotateZview").mouseup(function(){   cubez+=5,rotCube()}),
  $(".rotateXiview").mousedown(function(){if ((FaceF=="")||(cubex>-85)) cubex-=5,rotCubeXY()}),
  $(".rotateYiview").mousedown(function(){if ((FaceF=="")||(cubey>290)) cubey-=5,rotCubeXY()}),
  $(".rotateZiview").mousedown(function(){cubez-=5,rotCube()}),
  $(".rotateXiview").mouseup(function(){  if ((FaceF=="")||(cubex>-85)) cubex-=5,rotCubeXY()}),
  $(".rotateYiview").mouseup(function(){  if ((FaceF=="")||(cubey>290)) cubey-=5,rotCubeXY()}),
  $(".rotateZiview").mouseup(function(){  cubez-=5,rotCube()});
  if (typeof(mousedragRotate) != 'undefined') mousedragRotate(".cube");
});
