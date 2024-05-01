let score = 0;
let totalQuestions = 0;
let operator;

function generateQuestion(operator) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let question;
    let correctAnswer;

    switch (operator) {
        case '+':
            question = `${num1} + ${num2} = ?`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2} = ?`;
            correctAnswer = num1 - num2;
            break;
        case '×':
            question = `${num1} × ${num2} = ?`;
            correctAnswer = num1 * num2;
            break;
        case '÷':
            if (num2 === 0) {
                return generateQuestion(operator);
            }
            question = `${num1 * num2} ÷ ${num2} = ?`;
            correctAnswer = num1;
            break;
        default:
            return;
    }

    totalQuestions++;
    
    // Create question container
    let questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    
    // Add question text
    let questionText = document.createElement('p');
    questionText.textContent = question;
    
    // Add input field
    let answerInput = document.createElement('input');
    answerInput.type = 'text';
    
    // Add submit button
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => {
        let userAnswer = parseInt(answerInput.value);
        if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
            score++;
            alert("Correct!");
        } else {
            alert("Incorrect!");
        }

        let continueQuiz = confirm("Do you want to continue?");
        if (continueQuiz) {
            generateQuestion(operator);
        } else {
            endQuiz();
        }
    });
    
    // Append elements to container
    questionContainer.appendChild(questionText);
    questionContainer.appendChild(answerInput);
    questionContainer.appendChild(submitButton);

    // Clear previous questions
    document.getElementById('quizContainer').innerHTML = '';
    // Append current question
    document.getElementById('quizContainer').appendChild(questionContainer);
}

function endQuiz() {
    let percentage = (score / totalQuestions) * 100;
    alert(`Quiz ended!\nScore: ${score}/${totalQuestions}\nPercentage: ${percentage.toFixed(2)}%`);
}

document.getElementById('operation').addEventListener('change', (event) => {
    operator = event.target.value;
    generateQuestion(operator);
});
