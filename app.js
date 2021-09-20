//Create the answer buttons
let answerBtnTrue = document.querySelector('.btn1')
let answerBtnFalseOne = document.querySelector('.btn2')
let answerBtnFalseTwo = document.querySelector('.btn3')

//Create the category buttons
let categoryOne = document.querySelector('.categoryOne')
let categoryTwo = document.querySelector('.categoryTwo')
let categoryThree = document.querySelector('.categoryThree')

//Create the restart button
let restartBtn = document.querySelector('.btn4')

//Create the next question button
let nextBtn = document.querySelector('.btn5')

//Define the variable that we will use to display the question text on screen
let questionTxt = document.querySelector('.question')

//Define the score and attempt variables to display on screen
let scoreDisplay = document.getElementById('scoreNumber')
let attemptsDisplay = document.getElementById('attemptsLeft')


//Create class to contain all the stuff we need to create our quiz
class QuestioneGame {
    constructor(category,questions,attempts,score){
        this.category = category
        this.questions = questions
        this.attempts = attempts
        this.score = score
    }
    guessAnswer() {
        let currentQuestion = 0

        //Create function to shuffle the order of the HTML buttons
        const shuffleButtons = () => {
            var ul = document.querySelector('.pog');
            for (var i = ul.children.length; i >= 0; i--) {
                ul.appendChild(ul.children[Math.random() * i | 0]);
            }
        }
        shuffleButtons()

        //Cycle through each item in the array
        this.questions.every(question => {
            let displayRandomBtn = question.possibleAnswer[Math.floor(Math.random() * question.possibleAnswer.length)]
            let displayRandomBtnTwo = question.possibleAnswer[Math.floor(Math.random() * question.possibleAnswer.length)]

            let questionDisplay = this.questions
            questionTxt.innerHTML = questionDisplay[currentQuestion].question

            this.attempts = 5
            let attemptsRemaining = this.attempts
            attemptsDisplay.innerHTML = attemptsRemaining

            this.score = 0
            let currentScore = this.score
            scoreDisplay.innerHTML = currentScore

            const answerBtnValues = () => {
                answerBtnTrue.value = questionDisplay[currentQuestion].answer
                answerBtnFalseOne.value = questionDisplay[currentQuestion].possibleAnswer[0]
                answerBtnFalseTwo.value = questionDisplay[currentQuestion].possibleAnswer[1]
            }
            answerBtnValues()

            answerBtnFalseOne.disabled = false
            answerBtnFalseTwo.disabled = false
            answerBtnTrue.disabled = false
            nextBtn.disabled = false


            const manageAnswerBtns = () => {
                
                answerBtnTrue.onclick = function() {
                    scoreDisplay.innerHTML++                   
                    disableAnswerBtns()

                    if(currentQuestion == questionDisplay.length - 1) {
                        answerBtnTrue.disabled = true
                        answerBtnFalseOne.disabled = true
                        answerBtnFalseTwo.disabled = true
                        questionTxt.innerHTML = 'Your score is ' + scoreDisplay.innerHTML
                        return
                    }

                    currentQuestion++
                    attemptsRemaining = 5
                    attemptsDisplay.innerHTML = attemptsRemaining
                    shuffleButtons()
                    answerBtnValues()
                    console.log(answerBtnTrue.value)
                    questionTxt.innerHTML = questionDisplay[currentQuestion].question
                }

                answerBtnFalseOne.onclick = function() {
                    attemptsDisplay.innerHTML--
                    attemptsRemaining--
                    disableAnswerBtns()
                }

                answerBtnFalseTwo.onclick = function() {
                    attemptsDisplay.innerHTML--
                    attemptsRemaining--
                    disableAnswerBtns()
                }

                nextBtn.onclick = function() {
                    if(currentQuestion == questionDisplay.length - 1) {

                        answerBtnTrue.disabled = true
                        answerBtnFalseOne.disabled = true
                        answerBtnFalseTwo.disabled = true
                        nextBtn.disabled = true
                        questionTxt.innerHTML = 'Your score is ' + scoreDisplay.innerHTML
                        return
                    } else {
                        answerBtnTrue.disabled = false
                        answerBtnFalseOne.disabled = false
                        answerBtnFalseTwo.disabled = false
                        nextBtn.disabled = false
                        currentQuestion++
                        attemptsRemaining = 5
                        attemptsDisplay.innerHTML = attemptsRemaining
                        shuffleButtons()
                        answerBtnValues()
                        questionTxt.innerHTML = questionDisplay[currentQuestion].question
                    }

                }
            }
            manageAnswerBtns()

            const disableAnswerBtns = () => {
                if (attemptsRemaining < 1) {
                    answerBtnFalseOne.disabled = true
                    answerBtnFalseTwo.disabled = true
                    answerBtnTrue.disabled = true
                }
            }

            const stopGame = () => {
                if(currentQuestion == questionDisplay.length - 1) {

                    answerBtnTrue.disabled = true
                    answerBtnFalseOne.disabled = true
                    answerBtnFalseTwo.disabled = true
                    questionTxt.innerHTML = 'Your score is ' + scoreDisplay.innerHTML
                    return
                }
            }

            const restartGame = () => {
                restartBtn.onclick = function() {

                    currentQuestion = 0
                    questionTxt.innerHTML = questionDisplay[currentQuestion].question
                    shuffleButtons()
                    answerBtnValues()

                    this.attempts = 5
                    attemptsRemaining = this.attempts
                    attemptsDisplay.innerHTML = attemptsRemaining
                    answerBtnFalseOne.disabled = false
                    answerBtnFalseTwo.disabled = false
                    answerBtnTrue.disabled = false
                    nextBtn.disabled = false

                    this.score = 0
                    let currentScore = this.score
                    scoreDisplay.innerHTML = currentScore
                }
            }
            restartGame()
        })
    }
}



//Create our actual quiz
let gameOne = new QuestioneGame ('Dead By Daylight',
    [{question : 'Which killer lays down traps ?', answer : 'Trapper', possibleAnswer : ['Wraith','Trickster']},
    {question : 'Which survivor is completely useless ?', answer : 'Dwight', possibleAnswer : ['Ace','Claudette']},
    {question : 'Which perk allows killers to one shot people after all generators have been repaired ?', answer : 'No one escapes death', possibleAnswer : ['Devour Hope','Haunted Ground']},
    {question : 'Which survivor tool blinds the killer ?', answer : 'Flashlight', possibleAnswer : ['Toolbox','Medkit']},
    {question : 'Is this game balanced ? :(', answer : 'No', possibleAnswer : ['Kind of ','Yes']}],
    5,
)

let gameTwo = new QuestioneGame ('Metal Bands',
    [{question : 'Who wrote the Ride The Lightning Album?', answer : 'Metallica', possibleAnswer : ['Megadeth','Anthrax']},
    {question : 'Who wrote the song In Waves ?', answer : 'Trivium', possibleAnswer : ['Five Finger Death Punch','Kiss']},
    {question : 'Where are Iron Maiden from ?', answer : 'England', possibleAnswer : ['USA','France']},
    {question : 'Who wrote Wait and Bleed ?', answer : 'Slipknot', possibleAnswer : ['Mushroomhead','Cannibal Corpse']},
    {question : 'Who wrote Freak On A Leash ?', answer : 'Korn', possibleAnswer : ['Linkin Park','Limp Bizkit']}],
    5,
)

let gameThree = new QuestioneGame ('Video Game Consoles',
    [{question : 'Which was the first ever console to release ?', answer : 'Magnavox Odyssey', possibleAnswer : ['Commodor 64','Sega Megadrive']},
    {question : 'When did the Xbox 360 release ?', answer : '2005', possibleAnswer : ['2007','2002']},
    {question : 'Which was the first nintendo console ?', answer : 'Nintendo Entertainment System', possibleAnswer : ['Nintendo Wii','Gameboy']},
    {question : 'What was the first ever hand-held console?', answer : 'Milton Bradley Microvision', possibleAnswer : ['Gameboy Colour','PSP']},
    {question : 'What is the best selling console of all time ?', answer : 'PlayStation 2', possibleAnswer : ['Playstation 4','Nintendo Switch']}],
    5,
)

    categoryOne.value = gameOne.category
    categoryTwo.value = gameTwo.category
    categoryThree.value = gameThree.category

    const playGameOne = () => {
        gameOne.guessAnswer()
    }
    const playGameTwo = () => {
        gameTwo.guessAnswer()
    }
    const playGameThree = () => {
        gameThree.guessAnswer()
    }