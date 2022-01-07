async function RotCopy(rot){
    let rote = rot;
    if (rot=="") rote = await clipIn();
    navigator.clipboard.writeText(rot);   
    if (rote!="") setRot(regRot((rote + " **").split(" "))); // "*0 "+ 
    clearTimeout(Tid);
    setTimeout("checkRot();",100);
}
function parityAlt() {
    let PP = "r2,B2,U2,l,U2,r',U2,r,U2,F2,r,F2,l',B2,r2";
    let NP = "Rw,U2,X,Rw,U2,Rw,U2,Rw',U2,X',Rw,U2,Rw',U2,Rw,U2,Rw',U2,Rw'";
    $("#parity").attr('disabled',true);
    if (YdF==1) {
        while (YtF>0) fd(),YtF--;
        Rotates = Rotates.concat(regRot(PP.split(",")));
    } else Rotates = Rotates.concat(regRot(NP.split(",")));
}
function edgeExchg() {
    const ruflV="l2,U2,F2,l2,F2,U2,l2,**".split(","), ruflH="l2,B2,U2,l2,U2,B2,l2,**".split(",");
    const crosH="Rw',F,U',R,F',U,Rw,**".split(","), crosV="Rw',D,F',R,D',F,Rw,**".split(",");

    if ((a[34]==a[35])&&((a[14]==a[81])||(a[15]==a[84]))) Rotates = Rotates.concat(regRot(ruflV));
    else if ((a[14]==a[15])&&((a[33]==a[66])||(a[36]==a[67]))) Rotates = Rotates.concat(regRot(ruflH));
    else {
        if ((colorEg(2)==colorEg(14))&&(colorEg(3)==colorEg(15))) Rotates = Rotates.concat(regRot(crosH));   
        else if ((colorEg(14)==colorEg(82))&&(colorEg(15)==colorEg(83))) Rotates = Rotates.concat(regRot(crosV));
    }
}
function colorEg(post) {
    let idx = eg.indexOf(post)&0xfe;
    return a[eg[idx]]*a[eg[idx+1]]+a[eg[idx]]+a[eg[idx+1]];
}
function edgePair() {
    const pairRot="r' U L' U' r *ペア結成 *#1415343521257276 U *#14153435";
    if ((Rotates.length>0)||(counter>0)) {
        setTimeout("edgePair()",1000);
        return true;
    }
    let post, target;
    if (colorEg(14)==colorEg(15)) { 
        if (colorEg(8)==colorEg(12)) { Rotates.push("*次に期待"),turn("U"); return; }
        else uu();
    } 
    if (colorEg(37)==colorEg(41)) {
        if (colorEg(15)==colorEg(3)) flush33(200,8,"#edgeEx");
        else if (colorEg(40)!=colorEg(44)) Rotates.push("*次に期待"),turn("f");
        else if (colorEg(46)!=colorEg(47)) Rotates.push("*次に期待"),turn("F");
        else if (colorEg(69)!=colorEg(73)) Rotates.push("*次に期待"),turn("r");
        return;
    }
    Comment = "";
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
    if (opener && opener.document.getElementsByName('pythonQ')) 
        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = pairRot;
    Rotates = Rotates.concat(regRot(pairRot.split(" ")));
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
    if (opener && opener.document.getElementsByName('pythonQ')) {
        parent.ClipDT = cmnt.slice(7);
        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = cmnt;
    }
    Rotates = Rotates.concat(regRot(cmnt.split(" ")));
    return eg[p2];
}
// const White=8,Orange=2,Green=3,Red=4,Blue=5,Yellow=6;
const cr=new Array(10,11,7,6,26,27,23,22,42,43,39,38,58,59,55,54,74,75,71,70,90,91,87,86);  // center rotate
function cent6(color=White) {
    if ((Rotates.length>0)||(counter>0)) {
        setTimeout("cent6("+color+")",1000);
        return true;
    }
    if (centr(color)) { cent6(color); return; }

    if (color==White) {
        turn("X2"),setTimeout("cent6("+Yellow+")",500);}
    else if (color==Yellow) {
        turn("z"),setTimeout("cent6("+Red+")",500);}
    else if (color==Red) {
        turn("X"),setTimeout("cent6("+Blue+")",500);}
    else if (color==Blue) {
        turn("X"),setTimeout("cent6("+Orange+")",500);}
    else if (color==Orange) {
        Comment="中央寄せ完了！",Rotates.unshift("X");}  // ,setTimeout("cent6("+Green+")",500);}
 
    return true;
}
function centr(Ccolor) {
    let i=true;
    let cmnt="*中央寄せ("+"橙緑赤青黄白白".charAt(Ccolor-2)+")";
    
    if ((Rotates.length>0)||(counter>0)) {
        setTimeout("centr("+Ccolor+")",1000);
        return true;
    } else {
      if (a[10]!=Ccolor) { 
        preRot=cmnt,i = cntrSrch(0,Ccolor);
      } else if ((a[10]==Ccolor)&&(a[6]!=Ccolor)) {
        preRot=cmnt,i = cntrSrch(4,Ccolor);
      } else if ((a[10]==Ccolor)&&(a[6]==Ccolor)) {
        preRot="U2 "+cmnt,i = cntrSrch(4,Ccolor);
      }
      if (!i) return null;
      setTimeout("centr("+Ccolor+")",1000);
      return true;
    }
    preRot=cmnt,i = cntrSrch(4,Ccolor);
    if (!i) return null;
    return true;
}
function cntrSrch(st,c1) {
    let i,j,k;

    for (i=st;i<24;i++) if (a[cr[i]]==c1) {
        j = i % 4 ;
        k = i >> 2;
        console.log(i,j);
               if      (k==0) { if(j==0)preRot+=" U'"; else while (j>1){ j--;preRot+=" U"; } preRot+=" U";}          //  uu();
               else if (k==2) { if(j==0)preRot+=" F'"; else while (j>1){ j--;preRot+=" F"; } preRot+=" r U r'";}     //  Mr(); 
               else if (k==3) { if(j==0)preRot+=" R'"; else while (j>1){ j--;preRot+=" R"; } preRot+=" U' b U b' U";}    //  Mb(); 
               else if (k==1) { if(j==0)preRot+=" L'"; else while (j>1){ j--;preRot+=" L"; } preRot+=" U f U f' U'";}  //  Mf(); 
               else if (k==4) { if(j==0)preRot+=" B'"; else while (j>1){ j--;preRot+=" B"; } preRot+=" U2 l U l' U2";}  //  Ml(); 
               else if (k==5) { if(j==0)preRot+=" D'"; else while (j>1){ j--;preRot+=" D"; } preRot+=" r2 U r2";}    //  Mr(),Mr(); 
        if (preRot!="") Rotates = Rotates.concat(regRot(preRot.trim().split(" "))),turn("*");
        return true;
    }
    return null;
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
function faceFloat(){
    if (FaceF=="") FaceF = "f", $("#lskip").show();
    else FaceF = "", $("#lskip").hide();
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
var Rev = 0 ;
function accel(usft=true){
    let rot, clen, clipSeq;
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
            rot = Maprote.get(Urot.charAt(0));
            Urote = ((typeof rot==='string')?rot.charAt(RotSft):Urot.charAt(0)) +Urot.slice(1);
        } else Rev = 1;
        turnStart(String.fromCharCode(Urote.charCodeAt(0) ^ 0x20)+Urote.slice(1));
        turnN -= 1; Urot="";
        return;
    }
}
function crtDiv(e) {
    let trans="";
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
function kiir(){
    let r =                         createFaces( 1,  3,-59,-39,"X(-90deg)");
    r+=unfold(17,"").charAt(0)!="f"?createFaces(17,-10,-46,-39,"Y(-90deg)"):createFaces(117,-91,-13, -52,"Y(-90deg)");
    r+=                             createFaces(33,  3,-46, 52,"X(0deg)");
    r+=unfold(49,"").charAt(0)!="f"?createFaces(49, 94,-46, 39,"Y(-90deg)"):createFaces(149,185,-13,  26,"Y(-90deg)");
    r+=unfold(65,"").charAt(0)!="f"?createFaces(65, 81,-46,-52,"X(0deg)"):  createFaces(165,118,-13,-215,"X(0deg)");
    r+=unfold(81,"").charAt(0)!="f"?createFaces(81,  3, 45, 39,"X(-90deg)"):createFaces(181,-26,118,  13,"X(-90deg)");
    $("#cubeFields").html(r);
    $("#rotLayer").html("");
    $(".mezo span").css("display",Disp);
}
function createFaces(no,x,y,z,rotate) {
    let r="",i,j,x1,y1,z1,x4,y4,z4,udfbrl;
    rotate=="X(-90deg)"&&z<0&&(x1=26,y1=0,z1=0,x4=0,y4=0,z4=26,udfbrl="U");
    rotate=="X(-90deg)"&&z>0&&(x1=26,y1=0,z1=0,x4=0,y4=0,z4=-26,udfbrl="D");
    rotate=="Y(-90deg)"&&z<0&&(x1=0,y1=0,z1=26,x4=0,y4=26,z4=0,udfbrl="L");
    rotate=="Y(-90deg)"&&z>0&&(x1=0,y1=0,z1=-26,x4=0,y4=26,z4=0,udfbrl="R");
    rotate=="X(0deg)"&&z>0&&(x1=26,y1=0,z1=0,x4=0,y4=26,z4=0,udfbrl="F");
    rotate=="X(0deg)"&&z<0&&(x1=-26,y1=0,z1=0,x4=0,y4=26,z4=0,udfbrl="B");
    for (i=0;i<4;i++)
        for (j=0;j<4;j++) {
            let segs = " matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,"+(x+i*x4+j*x1)+","+(y+i*y4+j*y1)+","+(z+i*z4+j*z1)+",1) rotate"+rotate ;
            let clsN = (no>100?(no-100+i*4+j):(no+i*4+j));
            r+='<div class="mezo'+ unfold(clsN," szin")+a[clsN]+ ' field mezo" style="transform:'+segs+
               '"><span>'+(Face=="F"?"&nbsp;"+udfbrl:clsN) +'</span></div>';
        }
    return r;
}            
function kiirRotLayer(r,e){
    let odiv, i, s, t, lo="";
    for(i=0;i<r.length;i++) {
        s = unfold(r[i]," szin");
        t="#cubeFields .mezo"+ s.slice(0,-6);
        lo += '<div class="mezo'+ s +a[r[i]]+' layer mezo" style="transform:'+$(t).css('transform')+'">'+$(t).html()+'</div>';
        $(t).hide();
    }
    if (e==99) { $("#rotLayer").html(lo); return;}
    const core_e1 =[0,1,2,3,4,5,6,2,1,3,10,10,10,13,14,15,16];
    const core_e2 =[0,0,0,0,0,0,0,4,6,5, 0, 2, 4, 1, 6, 3, 5];
    odiv = crtDiv(core_e1[e])+(core_e2[e]>0?crtDiv(core_e2[e]):"");
    $("#cubeFields").append(odiv);
    $("#rotLayer").html(lo+odiv);
    $(".mezo span").css("display",Disp);
}
function unfold(i,szin) {
    if (FaceF=="") return i+szin+"e";
    if (cubey<355) return (i>16&&i<33||i>64)?FaceF+i+szin+"f":i+szin+"e";
    if (cubey>365) return (i>48)?FaceF+i+szin+"f":i+szin+"e";
    return (i>16&&i<33||i>48)?FaceF+i+szin+"f":i+szin+"e";
}

var cubex=-20,cubey=335,cubez=0,segs="yo", speed=80,NxPaus=1000;
var a=new Array(),s=new Array();
var Maprote = new Map([["F","FLBR"], ["f","flbr"],["L","LBRF"], ["l","lbrf"],
                       ["B","BRFL"], ["b","brfl"],["R","RFLB"], ["r","rflb"],
                       ["M","MsmS"], ["m","mSMs"],["S","SmsM"], ["s","sMSm"]]);
var Disp="none", Pause=false, Face="F", FaceF="", counter=0;
var Comment="", Tid=null, turnN=1, ClipDT="", W=null;
var Rotates = new Array();
var RotSft = 0, Urot = "", Urote = "";

function initnotscrambled(){
    let i,j;
    if (window.outerWidth<500) window.resizeTo(380,580);
    else                       window.resizeTo(580,440);
    speed=80; if (NxPaus<1100) NxPaus=1000;
    if (turnN==16) NxPaus=1500;
    Disp="none"; Pause=false; Face="F"; Comment="";RotSft=0;Rotates=[]; turnN=1; clearTimeout(Tid);
    $("#solve3").attr('disabled',true);
    $("#parity").attr('disabled',true);
    $("#comment").html("");  $("#turn").html("&nbsp;"); $("#rotate").html("&nbsp;");
    if ((window.name=="cube3dg")||(window.name=="cube3dh")) setTimeout("checkRot()",100);
    initCube();
}
function initCube() {
    let i,j;
    for(a[0]=0,j=0;6>j;j++)for(i=1;17>i;i++)a[i+16*j]=(j==0)?8:j+1;
    kiirRotLayer(wholecube,99);
    kiir();
    $(".mezo span").css("display",Disp);
}
function turn(a) {
    Rotates.push(a);
    clearTimeout(Tid);
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
        rote = Rotates.shift();
        while (rote && (rote.charAt(0)=="*")) {
            if (rote=="*fin") check33();
            if (rote.charAt(1)=="*") {      // step reset 
                Comment = rote.slice(2);
                check33(); turnN=1;}
            else if (rote.charAt(1)=="#") { // flushing important post #mmnn of 4x4
                let cn, n=2, lo="", kuro="#888";
                while (n<rote.length-1) {
                    cn = parseInt(rote.slice(n,n+2));
                    s1 = unfold(cn," szin");
                    t1="#cubeFields .mezo"+ s1.slice(0,-6);
                    lo += '<div class="mezo'+s1+0+' field mezo" style="transform:'+$(t1).css('transform')+';"><span>'+ cn +'</span></div>';
                    $(t1).css("background-color",newcolor);
                    n += 2;
                }
                $("#rotLayer").html(lo); flush(200,4); setTimeout("checkRot()",1000); return; }
            else if (rote.charAt(1)=="+") { // virtual Y rotation convert 
                RotSft = parseInt(rote.slice(2));} 
            else if (rote.charAt(1)=="-") { // Turn count decrement 
                turnN -= parseInt(rote.slice(2));} 
            else if (rote.charAt(1)=="0") { // Cube setup without rotation
                let i,j;
                const rotS = "U,u,U2,Mu,mu,Mu2,F,f,F2,Mf,mf,Mf2,D,d,D2,Md,md,Md2,B,b,B2,Mb,mb,Mb2,R,r,R2,Mr,mr,Mr2,L,l,L2,Ml,ml,Ml2,X,x,Y,y,Z,z,Rw,rw,**".split(",");
                if (rote.length==2) initCube();
                while (Rotates.length>0) {
                    let rot = Rotates.shift();
                    let rand = rotS.indexOf(rot);if (rand<0) alert('Error '+rot);
                    0==rand&&uu(),1==rand&&ui(),2==rand&&u2(),3==rand&&Mu(),4==rand&&mu(),5==rand&&(mu(),mu()),6==rand&&ff(),7==rand&&fi(),8==rand&&(ff(),ff()),9==rand&&Mf(),10==rand&&mf(),11==rand&&(mf(),mf()),12==rand&&dd(),13==rand&&di(),14==rand&&(dd(),dd()),15==rand&&Md(),16==rand&&md(),17==rand&&(md(),md()),
                    18==rand&&bb(),19==rand&&bi(),20==rand&&(bb(),bb()),21==rand&&Mb(),22==rand&&mb(),23==rand&&(mb(),mb()),24==rand&&rr(),25==rand&&ri(),26==rand&&(rr(),rr()),27==rand&&Mr(),28==rand&&mr(),29==rand&&(mr(),mr()),30==rand&&ll(),31==rand&&li(),32==rand&&(ll(),ll()),33==rand&&Ml(),34==rand&&ml(),35==rand&&(ml(),ml()),
                    36==rand&&(bor2(),bor()),37==rand&&bor(),38==rand&&fd(),39==rand&&fd3(),40==rand&&(fd(),bor(),fd3()),41==rand&&(fd3(),bor(),fd()),42==rand&&(rr(),Mr()),43==rand&&(ri(),mr());    
                    if (44==rand) break;    
                }
                kiirRotLayer(wholecube,99),kiir();
                turnN=1;
            } 
            else Comment = (Rotates.length==0)?"":rote.slice(1);  
            rote = Rotates.shift();
        }
        $("#comment").html(Comment);
        if (rote) {
            Urot = rote;
            $("#turn").html(String(turnN));
            $("#rotate").html((rote.charCodeAt(0) & 0x20)>0?String.fromCharCode(rote.charCodeAt(0) ^ 0x20)+"'"+rote.slice(1):rote);
            rot = Maprote.get(rote.charAt(0));
            rote = ((typeof rot==='string')?rot.charAt(RotSft):rote.charAt(0)) +rote.slice(1);
            turnStart(rote);
            Urote = rote;
        }
    }
    Tid = setTimeout("checkRot()",NxPaus);
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
    if (RotatesText==null) rot = []; 
    else if (RotatesText.indexOf(",")>-1) rot = regRot(RotatesText.trim().split(","));
         else                             rot = regRot(RotatesText.trim().split(" "));
    setRot(rot);
    clearTimeout(Tid);
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

var YdF,YtF;
function check33() {
    if (counter>0) return;
    let i,diff, Yd=0,Ye=0;
    YdF = 0;
    $("#solve3").attr('disabled',true);
    for (i=0;i<24;i+=4) if ((a[c[i]]!=a[c[i+1]])|| (a[c[i+1]]!=a[c[i+3]])) return;
    if (a[6]==White)       { for (i=0;i<4 ;i++)  diff=a[ccoW[i+1]]-a[ccoW[i]];if((diff!=1)&&(diff!=-3))return; }
    else if (a[6]==Yellow) { for (i=0;i<4 ;i++)  diff=a[ccoY[i+1]]-a[ccoY[i]];if((diff!=1)&&(diff!=-3))return; }
    for (i=0;i<48;i++)  { if (((i&3)==0)&&((a[eg[i]]!=a[eg[i+2]])||(a[eg[i+1]]!=a[eg[i+3]]))) return;
                          else if (a[eg[i]]==a[6]) if (eg[i]<17) Ye++;  // UP面のedge色が中央と一致する数
                                                   else if ((i>15) && (i<32)) {
                                                       Yd++;  // 垂下色Edge一致数
                                                       YtF = (7-(i/4).toFixed()) & 3; } // 垂下色EdgeのY軸最終回転位置
    }
    $("#solve3").attr('disabled',false);
//    if (opener && opener.ClipDT && (opener.ClipDT!="")) opener.ClipDT = "";
    if ((Yd+Ye==8)&&((Ye & 2)==2)) { // TOP色Edgeペアが奇数か？
        $("#parity").attr('disabled',false);
        YdF = Yd/2;
    }
}
function next44() {
    if (counter>0) return;
    if (Pause) {
         accel(false);return;
    }
    if($("#solve3").prop('disabled')==false) {flush33(200);return; }

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
    if (lo=="") { edgePair(); return; }

    if (!navigator.userAgent.match(/iPhone|Android.+/)) speed=40,NxPaus=600;
    if (cent6()) return;

    $("#rotLayer").html(lo);
    flush(200);
}
function flush(tm,cnt=8) {
    counter++;
    setTimeout(function(){
        $("#rotLayer").toggle();
        cnt>counter?flush(tm,cnt):($("#rotLayer").html(""), kiir(),counter=0)},tm); // 
}
function flush33(tm,cnt=8,id="#solve3") {
    counter++;
    setTimeout(function(){
        $(id).css('background-color',counter%2?'#ce4b42':'#ccc');
        cnt>counter?flush33(tm,cnt,id):($(id).css('background-color',""),counter=0)},tm); // 
}
function pythonSolve() {
    Pause = true;
    window.open('python/computing.html',"Python",'height=140,width=480,left='+(window.screenX+300)+',dependent=yes,scrollbars=no');
    setTimeout('goPython()',100); 
}
var preRot = "";
function goPython() {
    let rotation = "";
/*    if (opener && opener.ClipDT && (opener.ClipDT!="")) {
        ClipDT = opener.ClipDT;
        rotation = encodeURIComponent(ClipDT.trim());
        if (rotation.charAt(0)=="*")
            rotation = encodeURIComponent(ClipDT.slice(ClipDT.indexOf(" ")+1).trim());
        W = window.open('https://mori1-hakua.tokyo/python/Cube2phase_Fast3.py?value1='+rotation,"Python");
    }
    else {    */
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
                (!((c0[1]==White) || (c0[1]==Yellow)) &&
                 ((c0[0]==Blue)  && (ix<2))          ||
                 ((c0[0]==Green) && (ix<4))))     dx = 0;
            else dx = 1;
            edge   += ix + ((i>41)?"]":",");
            edge_d += dx + ((i>41)?"]":",");
        }
        let q = 'value1='+corner+'&value2='+corner_d+'&value3='+edge+'&value4='+edge_d;
//        alert(corner+','+corner_d+','+edge+','+edge_d);
        W = window.open('https://mori1-hakua.tokyo/python/Cube2phase_Fast3.py?'+q ,"Python");
//    }
    speed=40,NxPaus=500;
    if (preRot.length>0) {
        let preRotA = regRot(preRot.trim().split(" "));
        setRot(["*0*"]),setRot(["!",preRotA].flat(2)),setRot(["**",preRotA].flat(2)); // 
        console.log(Rotates);
    }
    if (!navigator.userAgent.match(/iPhone|Android.+/)) Pause = false;
    setTimeout('ckPython()',100); 
}
async function ckPython() {
    if (!W.closed || (await clipIn()=="")) {
        setTimeout('ckPython()',1000);
        return;
    }
    Pause = false;
    let rot = await clipIn();
    navigator.clipboard.writeText("");
    $("#solve3").attr('disabled',true);
    setRot(regRot(rot.trim().split(" ")));
    clearTimeout(Tid);
    setTimeout("checkRot()",100)
 //   if (opener && opener.document.getElementsByName('pythonQ')) 
 //       opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = preRot+" "+rot;
 }
function facerotate(a, tm) {
    var w = tm * 10 * counter;
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
    counter++,10>counter?facerotate(a, tm):($("#rotLayer").html(""),$("#rotLayer").css("transform","rotateY(0deg)"),  //  
    $("#rotLayer").css("transform-origin","50% 50%"),kiir(),counter=0,turnN+=1)},speed)}
                                  
function turnStart(a){
    if ((a.charAt(1)=="2")||(a.charAt(2)=="2")) {
        turnStart2(a.slice(0,2));
        return;
    }
    0==counter&&(
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
    0==counter&&(
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
    initCube();
    for(i=0;22>i;i++)rand=Math.floor(18*Math.random()),sym+=rotS[rand]+" ",
        0==rand&&uu(),1==rand&&ui(),2==rand&&u2(),3==rand&&ff(),4==rand&&fi(),5==rand&&(ff(),ff()),6==rand&&dd(),7==rand&&di(),8==rand&&(dd(),dd()),9==rand&&bb(),10==rand&&bi(),11==rand&&(bb(),bb()),12==rand&&rr(),13==rand&&ri(),14==rand&&(rr(),rr()),15==rand&&ll(),16==rand&&li(),17==rand&&l2();
    symset(sym);
}
function scramble4(){
    let i,j,sym="";
    const rotS = "U,U',U2,u,u',u2,F,F',F2,f,f',f2,D,D',D2,d,d',d2,B,B',B2,b,b',b2,R,R',R2,r,r',r2,L,L',L2,l,l',l2".split(",");
    initCube();
    for(i=0;50>i;i++)rand=Math.floor(36*Math.random()),sym+=rotS[rand]+" ",
         0==rand&&uu(), 1==rand&&ui(), 2==rand&&u2(), 3==rand&&Mu(), 4==rand&&mu(), 5==rand&&(mu(),mu()), 6==rand&&ff(), 7==rand&&fi(), 8==rand&&(ff(),ff()), 9==rand&&Mf(),10==rand&&mf(),11==rand&&(mf(),mf()),12==rand&&dd(),13==rand&&di(),14==rand&&(dd(),dd()),15==rand&&Md(),16==rand&&md(),17==rand&&(md(),md()),
        18==rand&&bb(),19==rand&&bi(),20==rand&&(bb(),bb()),21==rand&&Mb(),22==rand&&mb(),23==rand&&(mb(),mb()),24==rand&&rr(),25==rand&&ri(),26==rand&&(rr(),rr()),27==rand&&Mr(),28==rand&&mr(),29==rand&&(mr(),mr()),30==rand&&ll(),31==rand&&li(),32==rand&&(ll(),ll()),33==rand&&Ml(),34==rand&&ml(),35==rand&&(ml(),ml());
    $("#solve3").attr('disabled',true);
    symset(sym);
}
function symset(sym) {
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
wholecube=[...Array(96)].map((v, i)=> i+1);

function mousedragRotate(element){
    let target; // Moving target
    let e = element ;
    if (typeof window.touchEvent === "undefined") {
        $(e).mousedown(function (event) {
            event.preventDefault();
            target = $(e); // Moving target
            $(target).data({
                "down": true,
                "move": false,
                "x": event.pageX,
                "y": event.pageY,
                "nx": event.pageX,
                "ny": event.pageY
            });
            return false
        });
        // link disable after move action
        $(e).click(function (event) {
            if ($(target).data("move")) {
               return false
            }
        });
        $(document).mouseup(function (event) {
            $(target).data("down", false);
            return false;
        });
        // event of global area
        $(document).mousemove(function (event) {
          if ($(target).data("down")) {
            event.preventDefault();
            $(target).data("nx", event.pageX);
            $(target).data("ny", event.pageY);
            return emove(1);
          }
        });
    }
    const Area1 = document.getElementsByClassName(e.slice(1))[0];
    if (typeof window.touchEvent !== undefined) { 
        Area1.addEventListener("touchstart", () => {
            event.preventDefault();
            target = $(e); // Moving target
            $(target).data({
                "down": true,
                "move": false,
                "x": event.changedTouches[0].pageX,
                "y": event.changedTouches[0].pageY,
                "nx": event.changedTouches[0].pageX,
                "ny": event.changedTouches[0].pageY
            });
            return false
        });
        Area1.addEventListener("touchmove", () => {
            if ($(target).data("down")) {
                event.preventDefault();  // Suppless scroll
                $(target).data("nx", event.changedTouches[0].pageX);
                $(target).data("ny", event.changedTouches[0].pageY);
            }
        });
        Area1.addEventListener("touchend", () => {
            emove(5);
            $(target).data("down", false);
            return false;
        });
    }
    function emove(dev) {
        let diff_x = parseInt($(target).data("x") - $(target).data("nx"));
        let diff_y = parseInt($(target).data("y") - $(target).data("ny")); 
        $("#comment").html(diff_x + "," + diff_y);
        if ((!$(target).data("move")) && (diff_x+diff_y!=0)) {
            $(target).data("move", true);
            $(target).data("x", $(target).data("nx"));
            $(target).data("y", $(target).data("ny"));
            cubex += diff_y / dev;
            if ((FaceF!="")&&(cubex<-85))  cubex = -85;
            if ((FaceF!="")&&(cubex> -5))  cubex =  -5;
            cubey -= diff_x / dev;
            if ((FaceF!="")&&(cubey<290))  cubey = 290;
            if ((FaceF!="")&&(cubey>420))  cubey = 420; 
            rotCubeXY();
            $(target).data("move", false);
        }
        return false;
    }
}
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
  $(".rotateZiview").mouseup(function(){  cubez-=5,rotCube()}),
  mousedragRotate(".cube");
});
