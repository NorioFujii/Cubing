async function RotCopy(rot){
    let rote = rot;
    if (rot=="") rote = await clipIn();
    navigator.clipboard.writeText(rot);   
    setRot(regRot((rote + " **").split(" "))); // "*0 "+ 
    clearTimeout(Tid);
    setTimeout("checkRot();",100);
}
function rotCube(){
    segs="rotateX("+cubex+"deg) rotateY("+cubey+"deg) rotateZ("+cubez+"deg) translateX(0) translateY(0) translateZ(0)",$(".cube").css({
    transform:segs});
}
function rotCubeY(){
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
function pause(){
    if (Pause) Pause = false, $("#comment").html("");
    else Pause = true, $("#comment").html("Pausing");
}
function accel(){
    if (speed==80) speed=40, NxPaus=500;
    else speed=80, NxPaus=1000;
}
function kiir(){
    let r="", i , v;
    for(i=1;i<55;i++)
        r+='<div class="field mezo mezo'+unfold(i," szin")+a[i]+'"><span>'+i+"</span></div>";
    $("#cubeFields").html(r);
    $("#rotLayer").html("");
}
function kiirRotLayer(r,e){
    let odiv, i, t, o="";
    for(i=0;i<r.length;i++) {
        t="#cubeFields .mezo"+unfold(r[i],"").slice(0,-1), $(t).hide();
        o+='<div class="layer mezo mezo'+unfold(r[i]," szin")+a[r[i]]+'"><span>'+r[i]+"</span></div>";
    }
    7>e&&( odiv='<div class="core core'+e+'"></div>',                          o+=odiv,$("#cubeFields").append(odiv));
    7==e&&(odiv='<div class="core core2"></div><div class="core core4"></div>',o+=odiv,$("#cubeFields").append(odiv));
    8==e&&(odiv='<div class="core core1"></div><div class="core core6"></div>',o+=odiv,$("#cubeFields").append(odiv));
    9==e&&(odiv='<div class="core core3"></div><div class="core core5"></div>',o+=odiv,$("#cubeFields").append(odiv));
    $("#rotLayer").html(o);
}
function unfold(i,szin) {
    if (FaceF=="") return i+szin+"e";
    if (cubey<355) return (i>9&&i<19||i>36)?FaceF+i+szin+"f":i+szin+"e";
    if (cubey>365) return (i>27)?FaceF+i+szin+"f":i+szin+"e";
    return (i>9&&i<19||i>27)?FaceF+i+szin+"f":i+szin+"e";
}

var Comment="", Tid=null, turnN=1, ClipDT="", W=null;
var Rotates = new Array();
var RotSft = 0;
function initnotscrambled(){
    if (window.outerWidth>600) window.resizeTo(580,440);
    else                       window.resizeTo(380,580);
    speed=80; if (NxPaus<1100) NxPaus=1000;
    if (turnN==16) NxPaus=1500;
    Pause=false; Comment="";RotSft=0;Rotates=[]; turnN=1; clearTimeout(Tid);
    $("#comment").html("");  $("#turn").html("&nbsp;"); $("#rotate").html("&nbsp;");
    for(a[0]=0,j=0;6>j;j++)for(i=1;10>i;i++)a[i+9*j]=j+1;
    kiirRotLayer(wholecube,99);
    -1==String(document.domain).indexOf("norio")&&(a=0),kiir();
    setTimeout("checkRot()",100);
}
function turn(a) {
    Rotates.push(a);
    clearTimeout(Tid);
    setTimeout("checkRot()",100);
}
function checkRot() {
    let rot;
/*    if ((window.name=="cube3d") || (parent.swin==null) || (parent.swin.closed)) {
        if (opener && opener.Rotates.length>0) {
            rot = regRot(opener.Rotates.trim().split(" "));
            opener.Rotates = "";
            setRot(rot);
        }
    } */
    if ((Pause==false) && (Rotates.length>0)) {
        rote = Rotates.shift();
        while (rote && rote.charAt(0)=="*") {
            if (rote.charAt(1)=="*") {      // step reset 
                 Comment = rote.slice(2);
                 turnN=1;}
            else if (rote.charAt(1)=="+") { // virtual Y rotation convert 
                 RotSft = parseInt(rote.slice(2));} 
            else if (rote.charAt(1)=="-") { // Turn count decrement 
                 turnN -= parseInt(rote.slice(2));} 
            else if (rote.charAt(1)=="0") { // Cube setup without rotation
                let i,j;
                const rotS = "U,u,U2,F,f,F2,D,d,D2,B,b,B2,R,r,R2,L,l,L2,**".split(",");
                for(a[0]=0,j=0;6>j;j++)for(i=1;10>i;i++)a[i+9*j]=j+1;
                while (Rotates.length>0) {
                    let rot = Rotates.shift();
                    let rand = rotS.indexOf(rot.charAt(1)=="2"?rot.toUpperCase():rot);
                    0==rand&&uu(),1==rand&&ui(),2==rand&&(uu(),uu()),3==rand&&ff(),4==rand&&fi(),5==rand&&(ff(),ff()),6==rand&&dd(),7==rand&&di(),8==rand&&(dd(),dd()),9==rand&&bb(),10==rand&&bi(),11==rand&&(bb(),bb()),12==rand&&rr(),13==rand&&ri(),14==rand&&(rr(),rr()),15==rand&&ll(),16==rand&&li(),17==rand&&(ll(),ll());
                    if (18==rand) break;    
                }
                kiirRotLayer(wholecube,99),kiir();
                turnN=1;
            }
            else Comment = (Rotates.length==0)?"":rote.slice(1);  
            rote = Rotates.shift();
        }
        $("#comment").html(Comment);
        if (rote) {
            $("#turn").html(String(turnN));
            $("#rotate").html((rote.charCodeAt(0) & 0x20)>0?String.fromCharCode(rote.charCodeAt(0) ^ 0x20)+"'"+rote.slice(1):rote);
            rot = Maprote.get(rote.charAt(0));
            rote = ((rot)?rot.charAt(RotSft):rote.charAt(0)) +rote.slice(1);
            turnStart(rote);
        }
    }
    Tid = setTimeout("checkRot()",NxPaus);
}
function regRot(seq) {
    let seqR = seq.map(function (value, index, array) {
                       return ((value.charAt(1)=="'")?
                                String.fromCharCode(value.charCodeAt(0) ^ 0x20)+value.charAt(2):
                                value);
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
        console.error("text is nothing", err);
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
    if (RotatesText==null) RotatesText = ""; 
    if (RotatesText.indexOf(",")>-1) rot = regRot(RotatesText.trim().split(","));
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
               return (String.fromCharCode(value.charCodeAt(0) ^ 0x20)+value.charAt(1));
        });
        turnN -= rot.length * 2;
    }
    Rotates = Rotates.concat(rotR);
}
function pythonSolve() {
    window.open('python/computing.html',"Python",'height=140,width=480,left='+(window.screenX+300)+',dependent=yes,scrollbars=no');
    setTimeout('goPython()',100); 
}
function goPython() {
    let rotation = "";
 //   if (opener && opener.ClipDT && (opener.ClipDT!="")) ClipDT = opener.ClipDT;
    rotation = encodeURIComponent(ClipDT.trim());
    if (rotation.charAt(0)=="*")
        rotation = encodeURIComponent(ClipDT.slice(ClipDT.indexOf(" ")+1).trim());
    W = window.open('https://mori1-hakua.tokyo/python/Cube2phase_Fast2.py?value1='+rotation,"Python");
    setTimeout('ckPython()',100); 
}
async function ckPython() {
        if (!W.closed || (await clipIn()=="")) {
        setTimeout('ckPython()',1000);
        return;
    }
    let rot = await clipIn();
    setRot(regRot(rot.split(" ")));
    clearTimeout(Tid);
    setTimeout("checkRot()",100)
    if (opener && opener.document.getElementsByName('pythonQ')) 
        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = rot;
}
function facerotate(a, tm) {
    var w = tm * 10 * counter;
    setTimeout(function(){
11==a&&$("#rotLayer").css("transform","rotatey(-"+w+"deg)"),12==a&&$("#rotLayer").css("transform","rotatey("+w+"deg)"),
21==a&&$("#rotLayer").css("transform","rotatex(-"+w+"deg)"),22==a&&$("#rotLayer").css("transform","rotatex("+w+"deg)"),
31==a&&$("#rotLayer").css("transform","rotatez("+w+"deg)"),32==a&&$("#rotLayer").css("transform","rotatez(-"+w+"deg)"),
41==a&&$("#rotLayer").css("transform","rotatex("+w+"deg)"),42==a&&$("#rotLayer").css("transform","rotatex(-"+w+"deg)"),
51==a&&$("#rotLayer").css("transform","rotatez(-"+w+"deg)"),52==a&&$("#rotLayer").css("transform","rotatez("+w+"deg)"),
61==a&&$("#rotLayer").css("transform","rotatey("+w+"deg)"),62==a&&$("#rotLayer").css("transform","rotatey(-"+w+"deg)"),
71==a&&$("#rotLayer").css("transform","rotatex(-"+w+"deg)"),72==a&&$("#rotLayer").css("transform","rotatex("+w+"deg)"),
81==a&&$("#rotLayer").css("transform","rotatey("+w+"deg)"),82==a&&$("#rotLayer").css("transform","rotatey(-"+w+"deg)"),
91==a&&$("#rotLayer").css("transform","rotatez("+w+"deg)"),92==a&&$("#rotLayer").css("transform","rotatez(-"+w+"deg)"),
101==a&&$("#rotLayer").css("transform","rotatex("+w+"deg)"),102==a&&$("#rotLayer").css("transform","rotatex(-"+w+"deg)"),
111==a&&$("#rotLayer").css("transform","rotatey(-"+w+"deg)"),112==a&&$("#rotLayer").css("transform","rotatey("+w+"deg)"),
121==a&&$("#rotLayer").css("transform","rotatez("+w+"deg)"),122==a&&$("#rotLayer").css("transform","rotatez(-"+w+"deg)"),
    counter++,10>counter?facerotate(a, tm):($("#rotLayer").html(""),$("#rotLayer").css("transform","rotatey(0deg)"),kiir(),counter=0,turnN+=1)},speed)}
                                  
function turnStart(a){
    if (a.charAt(1)=="2") {
        turnStart2(a);
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
"Y"==a&&(kiirRotLayer(wholecube,99),facerotate(111,1),fd()),"y"==a&&(kiirRotLayer(wholecube,99),facerotate(112,1),fd2(),fd()),
"Z"==a&&(kiirRotLayer(wholecube,99),facerotate(121,1),fd(),bor(),fd2(),fd()),"z"==a&&(kiirRotLayer(wholecube,99),facerotate(122,1),fd2(),fd(),bor(),fd()),
"M"==a&&(kiirRotLayer(layerm,7),facerotate(71,1),bor(),rr(),li()),"m"==a&&(kiirRotLayer(layerm,7),facerotate(72,1),bor2(),bor(),ri(),ll()),
"E"==a&&(kiirRotLayer(layere,8),facerotate(81,1),di(),uu(),fd2(),fd()),"e"==a&&(kiirRotLayer(layere,8),facerotate(82,1),dd(),ui(),fd()),
"S"==a&&(kiirRotLayer(layers,9),facerotate(91,1),fi(),bb(),fd(),bor(),fd2(),fd()),"s"==a&&(kiirRotLayer(layers,9),facerotate(92,1),ff(),bi(),fd2(),fd(),bor(),fd()))
}
function turnStart2(a){
    0==counter&&(
"U2"==a&&(kiirRotLayer(layeru,1),facerotate(11,2),uu(),uu()),"u2"==a&&(kiirRotLayer(layeru,1),facerotate(12,2),ui(),ui()),
"R2"==a&&(kiirRotLayer(layerr,4),facerotate(41,2),rr(),rr()),"r2"==a&&(kiirRotLayer(layerr,4),facerotate(42,2),ri(),ri()),
"D2"==a&&(kiirRotLayer(layerd,6),facerotate(61,2),dd(),dd()),"d2"==a&&(kiirRotLayer(layerd,6),facerotate(62,2),di(),di()),
"F2"==a&&(kiirRotLayer(layerf,3),facerotate(31,2),ff(),ff()),"f2"==a&&(kiirRotLayer(layerf,3),facerotate(32,2),fi(),fi()),
"B2"==a&&(kiirRotLayer(layerb,5),facerotate(51,2),bb(),bb()),"b2"==a&&(kiirRotLayer(layerb,5),facerotate(52,2),bi(),bi()),
"L2"==a&&(kiirRotLayer(layerl,2),facerotate(21,2),ll(),ll()),"l2"==a&&(kiirRotLayer(layerl,2),facerotate(22,2),li(),li()),
"M2"==a&&(kiirRotLayer(layerm,7),facerotate(71,2),bor(),rr(),li(),bor(),rr(),li()),"m2"==a&&(kiirRotLayer(layerm,7),facerotate(72,2),bor2(),bor(),ri(),ll(),bor2(),bor(),ri(),ll()),
"X2"==a&&(kiirRotLayer(wholecube,99),facerotate(101,2),bor2(),bor2(),bor2()),"x2"==a&&(kiirRotLayer(wholecube,99),facerotate(102,2),bor2()),
"Y2"==a&&(kiirRotLayer(wholecube,99),facerotate(111,2),fd2()),"y2"==a&&(kiirRotLayer(wholecube,99),facerotate(112,2),fd2(),fd2(),fd2()))
}

function bor(){
    s[1]=a[1],s[2]=a[4],s[3]=a[7],a[1]=a[45],a[4]=a[42],a[7]=a[39],a[45]=a[46],a[42]=a[49],a[39]=a[52],a[46]=a[19],a[49]=a[22],a[52]=a[25],a[19]=s[1],a[22]=s[2],a[25]=s[3],
    s[1]=a[2],s[2]=a[5],s[3]=a[8],a[2]=a[44],a[5]=a[41],a[8]=a[38],a[44]=a[47],a[41]=a[50],a[38]=a[53],a[47]=a[20],a[50]=a[23],a[53]=a[26],a[20]=s[1],a[23]=s[2],a[26]=s[3],
    s[1]=a[3],s[2]=a[6],s[3]=a[9],a[3]=a[43],a[6]=a[40],a[9]=a[37],a[43]=a[48],a[40]=a[51],a[37]=a[54],a[48]=a[21],a[51]=a[24],a[54]=a[27],a[21]=s[1],a[24]=s[2],a[27]=s[3],
  s[1]=a[10],s[2]=a[11],a[10]=a[16],a[11]=a[13],a[16]=a[18],a[13]=a[17],a[18]=a[12],a[17]=a[15],a[12]=s[1],a[15]=s[2],s[1]=a[28],s[2]=a[29],a[28]=a[30],a[29]=a[33],a[30]=a[36],a[33]=a[35],a[36]=a[34],a[35]=a[31],a[34]=s[1],a[31]=s[2]}
function bor2(){
      s[1]=a[1],s[2]=a[4],s[3]=a[7],a[1]=a[46],a[4]=a[49],a[7]=a[52],a[46]=s[1],a[49]=s[2],a[52]=s[3],s[1]=a[45],s[2]=a[42],s[3]=a[39],a[45]=a[19],a[42]=a[22],a[39]=a[25],a[19]=s[1],a[22]=s[2],a[25]=s[3],
      s[1]=a[2],s[2]=a[5],s[3]=a[8],a[2]=a[47],a[5]=a[50],a[8]=a[53],a[47]=s[1],a[50]=s[2],a[53]=s[3],s[1]=a[44],s[2]=a[41],s[3]=a[38],a[44]=a[20],a[41]=a[23],a[38]=a[26],a[20]=s[1],a[23]=s[2],a[26]=s[3],
      s[1]=a[3],s[2]=a[6],s[3]=a[9],a[3]=a[48],a[6]=a[51],a[9]=a[54],a[48]=s[1],a[51]=s[2],a[54]=s[3],s[1]=a[43],s[2]=a[40],s[3]=a[37],a[43]=a[21],a[40]=a[24],a[37]=a[27],a[21]=s[1],a[24]=s[2],a[27]=s[3],
 s[1]=a[10],s[2]=a[11],s[3]=a[12],a[10]=a[18],a[11]=a[17],a[12]=a[16],a[18]=s[1],a[17]=s[2],a[16]=s[3],s[1]=a[13],a[13]=a[15],a[15]=s[1],s[1]=a[28],s[2]=a[29],s[3]=a[30],a[28]=a[36],a[29]=a[35],a[30]=a[34],a[36]=s[1],a[35]=s[2],a[34]=s[3],s[1]=a[31],a[31]=a[33],a[33]=s[1]}
function rot(){
    s[1]=a[25],s[2]=a[26],s[3]=a[27],a[25]=a[16],a[26]=a[17],a[27]=a[18],a[16]=a[43],a[17]=a[44],a[18]=a[45],a[43]=a[34],a[44]=a[35],a[45]=a[36],a[34]=s[1],a[35]=s[2],a[36]=s[3],s[1]=a[46],s[2]=a[47],a[46]=a[52],a[47]=a[49],a[52]=a[54],a[49]=a[53],a[54]=a[48],a[53]=a[51],a[48]=s[1],a[51]=s[2]}
function roti(){
    s[1]=a[25],s[2]=a[26],s[3]=a[27],a[25]=a[34],a[26]=a[35],a[27]=a[36],a[34]=a[43],a[35]=a[44],a[36]=a[45],a[43]=a[16],a[44]=a[17],a[45]=a[18],a[16]=s[1],a[17]=s[2],a[18]=s[3],s[1]=a[46],s[2]=a[47],a[46]=a[48],a[47]=a[51],a[48]=a[54],a[51]=a[53],a[54]=a[52],a[53]=a[49],a[52]=s[1],a[49]=s[2]}
function fd(){
    s[1]=a[19],s[2]=a[20],s[3]=a[21],a[19]=a[28],a[20]=a[29],a[21]=a[30],a[28]=a[37],a[29]=a[38],a[30]=a[39],a[37]=a[10],a[38]=a[11],a[39]=a[12],a[10]=s[1],a[11]=s[2],a[12]=s[3],s[1]=a[22],s[2]=a[23],s[3]=a[24],a[22]=a[31],a[23]=a[32],a[24]=a[33],a[31]=a[40],a[32]=a[41],a[33]=a[42],a[40]=a[13],a[41]=a[14],a[42]=a[15],a[13]=s[1],a[14]=s[2],a[15]=s[3],s[1]=a[25],s[2]=a[26],s[3]=a[27],a[25]=a[34],a[26]=a[35],a[27]=a[36],a[34]=a[43],a[35]=a[44],a[36]=a[45],a[43]=a[16],a[44]=a[17],a[45]=a[18],a[16]=s[1],a[17]=s[2],a[18]=s[3],s[1]=a[1],s[2]=a[2],a[1]=a[7],a[2]=a[4],a[7]=a[9],a[4]=a[8],a[9]=a[3],a[8]=a[6],a[3]=s[1],a[6]=s[2],s[1]=a[46],s[2]=a[47],a[46]=a[48],a[47]=a[51],a[48]=a[54],a[51]=a[53],a[54]=a[52],a[53]=a[49],a[52]=s[1],a[49]=s[2]}
function fd2(){
    s[1]=a[19],s[2]=a[20],s[3]=a[21],a[19]=a[37],a[20]=a[38],a[21]=a[39],a[37]=s[1] ,a[38]=s[2] ,a[39]=s[3],
    s[1]=a[22],s[2]=a[23],s[3]=a[24],a[22]=a[40],a[23]=a[41],a[24]=a[42],a[40]=s[1] ,a[41]=s[2] ,a[42]=s[3],
    s[1]=a[25],s[2]=a[26],s[3]=a[27],a[25]=a[43],a[26]=a[44],a[27]=a[45],a[43]=s[1] ,a[44]=s[2] ,a[45]=s[3],
    s[1]=a[28],s[2]=a[29],s[3]=a[30],a[28]=a[10],a[29]=a[11],a[30]=a[12],a[10]=s[1] ,a[11]=s[2] ,a[12]=s[3],
    s[1]=a[31],s[2]=a[32],s[3]=a[33],a[31]=a[13],a[32]=a[14],a[33]=a[15],a[13]=s[1] ,a[14]=s[2] ,a[15]=s[3],
    s[1]=a[34],s[2]=a[35],s[3]=a[36],a[34]=a[16],a[35]=a[17],a[36]=a[18],a[16]=s[1] ,a[17]=s[2] ,a[18]=s[3],
    s[1]=a[1], s[2]=a[2], s[3]=a[3] ,a[1]=a[9],a[2]=a[8],a[3]=a[7], a[9]=s[1],a[8]=s[2],a[7]=s[3], s[1]=a[4],a[4]=a[6],a[6]=s[1],
    s[1]=a[46],s[2]=a[47],s[3]=a[48],a[46]=a[54],a[47]=a[53],a[48]=a[52],a[52]=s[3],a[53]=s[2],a[54]=s[1], s[1]=a[49],a[49]=a[51],a[51]=s[1]}
function uu(){
    bor2(),rot(),bor2()}
function ui(){
    bor2(),roti(),bor2()}
function ff(){
    bor(),rot(),bor2(),bor()}
function fi(){
    bor(),roti(),bor2(),bor()}
function rr(){
    fd(),bor(),rot(),bor2(),bor(),fd2(),fd()}
function ri(){
    fd(),bor(),roti(),bor2(),bor(),fd2(),fd()}
function ll(){
    fd2(),fd(),bor(),rot(),bor2(),bor(),fd()}
function li(){
    fd2(),fd(),bor(),roti(),bor2(),bor(),fd()}
function dd(){
    rot()}
function di(){
    roti()}
function bb(){
    bor2(),bor(),rot(),bor()}
function bi(){
    bor2(),bor(),roti(),bor()}

function scramble(){
    let i,j,sym="";
    const rotS = "U,U',U2,F,F',F2,D,D',D2,B,B',B2,R,R',R2,L,L',L2".split(",");
    for(a[0]=0,j=0;6>j;j++)for(i=1;10>i;i++)a[i+9*j]=j+1;
    for(i=0;22>i;i++)rand=Math.floor(18*Math.random()),sym+=rotS[rand]+" ",
        0==rand&&uu(),1==rand&&ui(),2==rand&&(uu(),uu()),3==rand&&ff(),4==rand&&fi(),5==rand&&(ff(),ff()),6==rand&&dd(),7==rand&&di(),8==rand&&(dd(),dd()),9==rand&&bb(),10==rand&&bi(),11==rand&&(bb(),bb()),12==rand&&rr(),13==rand&&ri(),14==rand&&(rr(),rr()),15==rand&&ll(),16==rand&&li(),17==rand&&(ll(),ll());
    ClipDT = sym;
    kiirRotLayer(wholecube,99),kiir();
    if (opener) {
//        opener.document.getElementsByName('pythonQ')[0].contentDocument.body.innerHTML = sym;
//        if (typeof opener.ClipDT!=="undefined") opener.ClipDT = sym;
    }
    else $("#comment").html(sym);
}
var cubex=-20,cubey=340,cubez=0,segs="yo", speed=80,NxPaus=1000;
var a=new Array(),s=new Array();
const
layeru=[1,2,3,4,5,6,7,8,9,10,11,12,19,20,21,28,29,30,37,38,39],
layerl=[10,11,12,13,14,15,16,17,18,1,4,7,19,22,25,46,49,52,39,42,45],
layerf=[19,20,21,22,23,24,25,26,27,7,8,9,12,15,18,46,47,48,28,31,34],
layerr=[28,29,30,31,32,33,34,35,36,3,6,9,21,24,27,48,51,54,37,40,43],
layerb=[37,38,39,40,41,42,43,44,45,30,33,36,10,13,16,1,2,3,52,53,54],
layerd=[46,47,48,49,50,51,52,53,54,25,26,27,16,17,18,25,26,27,34,35,36,43,44,45],
layerm=[2,5,8,20,23,26,47,50,53,38,41,44],
layere=[13,14,15,22,23,24,31,32,33,40,41,42],
layers=[4,5,6,11,14,17,29,32,35,49,50,51],
wholecube=[...Array(54)].map((v, i)=> i+1);

var Pause=false, FaceF="",counter=0;
var Maprote = new Map([["F","FLBR"], ["f","flbr"],["L","LBRF"], ["l","lbrf"],
                       ["B","BRFL"], ["b","brfl"],["R","RFLB"], ["r","rflb"],
                       ["M","MsmS"], ["m","mSMs"],["S","SmsM"], ["s","sMSm"]]);

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
            rotCubeY();
            $(target).data("move", false);
        }
        return false;
    }
}
$(document).ready(function(){
    initnotscrambled(),
  $(".rotateU").mousedown(function(){
    turn("U")}),
  $(".rotateUi").mousedown(function(){
    turn("u")}),
  $(".rotateR").mousedown(function(){
    turn("R")}),
  $(".rotateRi").mousedown(function(){
    turn("r")}),
  $(".rotateD").mousedown(function(){
    turn("D")}),
  $(".rotateDi").mousedown(function(){
    turn("d")}),
  $(".rotateF").mousedown(function(){
    turn("F")}),
  $(".rotateFi").mousedown(function(){
    turn("f")}),
  $(".rotateB").mousedown(function(){
    turn("B")}),
  $(".rotateBi").mousedown(function(){
    turn("b")}),
  $(".rotateL").mousedown(function(){
    turn("L")}),
  $(".rotateLi").mousedown(function(){
    turn("l")}),
/*
*/
  $(".rotateM").mousedown(function(){
    turn("M")}),
  $(".rotateMi").mousedown(function(){
    turn("m")}),
  $(".rotateE").mousedown(function(){
    turn("E")}),
  $(".rotateEi").mousedown(function(){
    turn("e")}),
  $(".rotateS").mousedown(function(){
    turn("S")}),
  $(".rotateSi").mousedown(function(){
    turn("s")}),
  $(".rotateX").mousedown(function(){
    turn("X")}),
  $(".rotateY").mousedown(function(){
    turn("Y")}),
  $(".rotateZ").mousedown(function(){
    turn("Z")}),
  $(".rotateXi").mousedown(function(){
    turn("x")}),
  $(".rotateYi").mousedown(function(){
    turn("y")}),
  $(".rotateZi").mousedown(function(){
    turn("z")}),
  $(".rotateKiir").mousedown(function(){
    kiir()}),
  $(".rotateXview").mousedown(function(){
    if (cubex<-5) cubex+=5,rotCube()}),
  $(".rotateYview").mousedown(function(){
    if (cubey<420) cubey+=5,rotCubeY()}),
  $(".rotateZview").mousedown(function(){
    cubez+=5,rotCube()}),
  $(".rotateXview").mouseup(function(){
    if (cubex<-5) cubex+=5,rotCube()}),
  $(".rotateYview").mouseup(function(){
    if (cubey<420) cubey+=5,rotCubeY()}),
  $(".rotateZview").mouseup(function(){
    cubez+=5,rotCube()}),
  $(".rotateXiview").mousedown(function(){
    if (cubex>-85) cubex-=5,rotCube()}),
  $(".rotateYiview").mousedown(function(){
    if (cubey>290) cubey-=5,rotCubeY()}),
  $(".rotateZiview").mousedown(function(){
    cubez-=5,rotCube()}),
  $(".rotateXiview").mouseup(function(){
    if (cubex>-85) cubex-=5,rotCube()}),
  $(".rotateYiview").mouseup(function(){
    if (cubey>290) cubey-=5,rotCubeY()}),
  $(".rotateZiview").mouseup(function(){
    cubez-=5,rotCube()}),
  mousedragRotate(".cube");
});
