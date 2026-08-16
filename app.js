const URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
let ques = document.querySelector("#ques");
let options = document.querySelectorAll("#option");
let opt1 = document.querySelector("#opt1");
let opt2 = document.querySelector("#opt2");
let opt3 = document.querySelector("#opt3");
let opt4 = document.querySelector("#opt4");

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
            console.log(incorrectAns[1]);
            }
    } catch (error) {
        getQuiz();
    };

}





window.addEventListener("load", () => {
  getQuiz();
});
