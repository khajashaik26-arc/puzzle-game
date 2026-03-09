let category="", level="";
let questions=[];
let currentQuestion=0;
let score=0;
let totalQuestions=20;
let paused=false;

/* ================= MENU ================= */

function selectCategory(cat){
    category=cat;
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("levelMenu").classList.remove("hidden");
    document.getElementById("levelTitle").innerText =
        cat==="math"?"Mathematics Levels":"Brain Booster Levels";
}

function goMainMenu(){
    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("levelMenu").classList.add("hidden");
    document.getElementById("mainMenu").classList.remove("hidden");

    currentQuestion=0;
    score=0;
    paused=false;
}

/* ================= START GAME ================= */

function startGame(lvl){
    level=lvl;
    currentQuestion=0;
    score=0;
    paused=false;

    document.getElementById("levelMenu").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");

    document.getElementById("gameTitle").innerText =
        (category==="math"?"Mathematics ":"Brain Booster ")
        +"("+level.toUpperCase()+")";

    loadQuestions();
    showQuestion();
}

/* ================= QUESTION DATA ================= */

function loadQuestions(){
    questions=[];

    /* -------- MATHEMATICS -------- */
    if(category==="math"){
        for(let i=0;i<20;i++){
            let a=Math.floor(Math.random()*20)+1;
            let b=Math.floor(Math.random()*20)+1;
            let ops=["+","-","×","÷"];
            let op=ops[Math.floor(Math.random()*4)];
            let question, correct;

            if(op==="+"){ correct=a+b; question=`${a} + ${b} = ?`; }
            if(op==="-"){ correct=a-b; question=`${a} - ${b} = ?`; }
            if(op==="×"){ correct=a*b; question=`${a} × ${b} = ?`; }
            if(op==="÷"){ correct=a; question=`${a*b} ÷ ${b} = ?`; }

            addQuestion(question, correct);
        }
    }

    /* -------- BRAIN BOOSTER -------- */
    if(category==="brain"){

        const hard = [
            {q:"Find next: 2²,3²,4²,?",a:[16,25,36,49],c:1},
            {q:"Find next: 1,1,2,3,5,?",a:[8,13,21,34],c:0},
            {q:"If A=1,Z=26, BAT=?",a:[23,24,25,26],c:0},
            {q:"Find next: 3,5,9,17,?",a:[33,31,29,27],c:0},
            {q:"If 12=144, 13=?",a:[156,169,196,121],c:1},
            {q:"Find next: 2,3,5,9,17,?",a:[33,34,35,36],c:0},
            {q:"Mirror of GAME?",a:["EMAG","GAME","MAGE","EGAM"],c:0},
            {q:"If RED=DER, BLUE=?",a:["EULB","UELB","BULE","LBUE"],c:0},
            {q:"Find next: 10,13,17,22,?",a:[28,29,30,31],c:0},
            {q:"If 3=9, 5=?",a:[15,25,30,35],c:1},
            {q:"Find next: 6,15,28,?",a:[45,40,36,50],c:0},
            {q:"Odd one:",a:["Triangle","Square","Circle","Cube"],c:3},
            {q:"Find next: 4,9,16,25,?",a:[30,36,49,64],c:1},
            {q:"If 2=6, 3=12, 4=?",a:[20,18,24,16],c:0},
            {q:"Find next: 5³,6³,?",a:[343,512,729,216],c:0},
            {q:"All cats meow. Some animals cats. Then:",a:[
                "Some animals meow","All animals meow","None meow","Cannot say"],c:0},
            {q:"Find next: 1,4,13,40,?",a:[121,130,150,160],c:0},
            {q:"Find next: 7,21,63,?",a:[126,189,210,252],c:1},
            {q:"If PEN=QFO, MAP=?",a:["NBQ","NBP","NBO","NAP"],c:0},
            {q:"Mirror of LEFT?",a:["TFEL","LEFT","ELFT","LTFE"],c:0}
        ];

        questions = hard; // using hard as example
    }
}

function addQuestion(text, correct){
    let options=[correct, correct+2, correct-1, correct+3];
    options=options.sort(()=>Math.random()-0.5);
    questions.push({q:text, a:options, c:options.indexOf(correct)});
}

/* ================= GAME FLOW ================= */

function showQuestion(){
    if(currentQuestion>=totalQuestions){
        endGame();
        return;
    }

    document.getElementById("feedback").innerText="";
    let q=questions[currentQuestion];

    document.getElementById("questionText").innerText=q.q;
    document.getElementById("qNumber").innerText=currentQuestion+1;
    document.getElementById("score").innerText=score;

    let html="";
    q.a.forEach((opt,index)=>{
        html+=`<button onclick="checkAnswer(${index})" ${paused?"disabled":""}>${opt}</button>`;
    });

    document.getElementById("options").innerHTML=html;
}

/* ================= ANSWER CHECK ================= */

function checkAnswer(index){
    if(paused) return;

    let buttons=document.querySelectorAll(".optionsGrid button");
    let correctIndex=questions[currentQuestion].c;

    if(index===correctIndex){
        buttons[index].classList.add("correct");
        document.getElementById("feedback").innerText="✅ Correct!";
        score+=5;
    } else {
        buttons[index].classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
        document.getElementById("feedback").innerText="❌ Wrong!";
    }

    setTimeout(()=>{
        currentQuestion++;
        showQuestion();
    },1000);
}

/* ================= PAUSE FIXED ================= */

function pauseGame(){
    paused=!paused;

    let pauseBtn=document.querySelector(".controlButtons button");

    if(paused){
        pauseBtn.innerText="▶ Resume";
    } else {
        pauseBtn.innerText="⏸ Pause";
    }

    showQuestion();
}

/* ================= EXIT FIXED ================= */

function exitGame(){
    if(confirm("Are you sure you want to exit?")){
        goMainMenu();
    }
}

/* ================= END GAME ================= */

function endGame(){
    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    document.getElementById("finalScore").innerText=score;

    let high=localStorage.getItem("highScore")||0;
    if(score>high){
        localStorage.setItem("highScore",score);
        high=score;
    }

    document.getElementById("highScore").innerText=high;
}
