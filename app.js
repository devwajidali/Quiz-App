const URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
let ques = document.querySelector("#ques");
let options = document.querySelectorAll("#option");
let opt1 = document.querySelector("#opt1");
let opt2 = document.querySelector("#opt2");
let opt3 = document.querySelector("#opt3");
let opt4 = document.querySelector("#opt4");
let input1 = document.querySelector("#input1");
let input2 = document.querySelector("#input2");
let input3 = document.querySelector("#input3");
let input4 = document.querySelector("#input4");
let container = document.querySelector(".container");
let msgCont = document.querySelector(".msg");
let msg = document.querySelector("#msg");
let nextBtn = document.querySelector("#next");
let restartBtn = document.querySelector(".button");
let scoreBoard = document.querySelector(".score-board");
let restBtn = document.querySelector("#restart-btn");
let scoreHolder = document.querySelector("#score");

let userAns ;
let score = 0;




function decodeHTML(html) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}


async function getQuiz() {

    try {
        let promise = await fetch(URL);

        if (!promise.ok) {
            throw new Error();
        }

        let data = await promise.json();

        if (!data.results || data.results.length === 0) {
            throw new Error();
        }

        let question = decodeHTML(data.results[1].question);
        let incorrectAns =  data.results[1].incorrect_answers;
        let correctAns =  data.results[1].correct_answer;
        incorrectAns.push(correctAns);

  

        ques.innerText = question;
  

        let idx1 = Math.floor(Math.random() * 4);
        let idx2 = Math.floor(Math.random() * 4);
        let idx3 = Math.floor(Math.random() * 4);
        let idx4 = Math.floor(Math.random() * 4);
        if (
            idx1 === idx2 ||
            idx1 === idx3 ||
            idx1 === idx4 ||
            idx2 === idx3 ||
            idx2 === idx4 ||
            idx3 === idx4
        ){
            while (
                idx1 === idx2 ||
                idx1 === idx3 ||
                idx1 === idx4 ||
                idx2 === idx3 ||
                idx2 === idx4 ||
                idx3 === idx4
            ) {
                idx1 = Math.floor(Math.random() * 4);
                idx2 = Math.floor(Math.random() * 4);
                idx3 = Math.floor(Math.random() * 4);
                idx4 = Math.floor(Math.random() * 4);

    

        
                opt1.innerText = decodeHTML(incorrectAns[idx1]);
                opt2.innerText = decodeHTML(incorrectAns[idx2]);
                opt3.innerText = decodeHTML(incorrectAns[idx3]);
                opt4.innerText = decodeHTML(incorrectAns[idx4]);

                } 
            } else {
                opt1.innerText = decodeHTML(incorrectAns[idx1]);
                opt2.innerText = decodeHTML(incorrectAns[idx2]);
                opt3.innerText = decodeHTML(incorrectAns[idx3]);
                opt4.innerText = decodeHTML(incorrectAns[idx4]);
            }
        
        checkAns(correctAns);
    } catch (error) {
        getQuiz();
    };

}

function showResult(corr,user) {
    container.classList.add("hide");
    restBtn.classList.add("hide");
    msgCont.classList.remove("hide");
    if (corr === user) {
        msg.innerText = "Correct Answer";
        score++;

        scoreHolder.innerText = score;

    } else {
        msg.innerText = `Wrong. Correct answer is ${decodeHTML(corr)}`;
    }
}






function checkAns(correctAns) {
    input1.addEventListener("click" , () => {
        userAns = opt1.innerText;
        showResult(correctAns,userAns);
    
    });


    input2.addEventListener("click" , () => {
        userAns = opt2.innerText;
        showResult(correctAns,userAns);
    
    });

    input3.addEventListener("click" , () => {
        userAns = opt3.innerText;
        showResult(correctAns,userAns);
    
    });

    input4.addEventListener("click" , () => {
        userAns = opt4.innerText;
        showResult(correctAns,userAns);
    
    });
}

function resetInput () {
    input1.checked = false;
    input2.checked = false;
    input3.checked = false;
    input4.checked = false;
}


window.addEventListener("load", () => {
  getQuiz();
});


nextBtn.addEventListener("click", () => {
    getQuiz();
    container.classList.remove("hide");
    restBtn.classList.remove("hide");
    msgCont.classList.add("hide");

    resetInput();
});

restBtn.addEventListener("click", () => {
    getQuiz();
    score = 0 ;

    scoreHolder.innerText = score;
    resetInput();
});
