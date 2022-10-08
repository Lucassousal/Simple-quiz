//InitialData
let select = (e) => document.querySelector(e);

let currentQuestion = 0;
let correctAnswers = 0;

let selected = '';

showQuestion();

//Events
select('.button button').addEventListener('click', nextQuestion);

select('.scoreArea button').addEventListener('click', resetEvent);

select('.warning button').addEventListener('click', () => {
    select('.container--warning').style.display = 'none';
})

//Functions
function showQuestion(){
    select('.button button').style.display = 'none';

    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length)*100);
        select('.progress--bar').style.width = `${pct}%`;

        select('.scoreArea').style.display = 'none';
        select('.questionArea').style.display = 'block';

        select('.question').innerHTML = q.question;
        
        for (let i in q.options){
            document.querySelectorAll('.option')[i].innerHTML = `<span>${+i+1}</span>${q.options[i]}`;
        }

        document.querySelectorAll('.options').forEach((item) => {
            item.addEventListener('click', optionClickEvent);
        })

    }else{
        finishQuiz();
    }
}

function optionClickEvent(e){
    
    select('.button button').style.display = 'block';
    
    document.querySelectorAll('.option').forEach((item) => {
        item.classList.remove('selected')
    });
    
    e.target.classList.add('selected');

    selected = e.target;

}

function nextQuestion(){
    
    let clickedOption = parseInt(selected.getAttribute('data-op'));

    if(clickedOption === questions[currentQuestion].answer){
        correctAnswers++;
    }

    currentQuestion++;

    document.querySelectorAll('.option').forEach((item) => {
        item.classList.remove('selected')
    });

    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswers/questions.length)*100);

    if(points < 30){
        select('.scoreText1').innerHTML = 'Vai estudar, melhor...'
        select('.scorePct').style.color = '#FF0000';
        select('.prizeImage').setAttribute('src', 'assets/images/prize2.png');
    } else if(points >= 30 && points < 70){
        select('.scoreText1').innerHTML = 'Tá bom, mas pode melhorar'
        select('.scorePct').style.color = '#FFFF00';
        select('.prizeImage').setAttribute('src', 'assets/images/prize2.png');
    } else{
        select('.scoreText1').innerHTML = 'Parabéns'
        select('.scorePct').style.color = '#0D630D';
    }
    
    select('.scorePct').innerHTML = `Acertou ${points}%`;
    select('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acetou ${correctAnswers} `;
    
    select('.scoreArea').style.display = 'block';
    select('.questionArea').style.display = 'none';
    select('.progress--bar').style.width = '100%';
};

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}