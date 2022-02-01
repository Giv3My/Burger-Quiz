document.addEventListener("DOMContentLoaded", function () {

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add('d-block');

        playTest();
    })

    closeModal.addEventListener("click", () => {
        modalBlock.classList.remove('d-block');
    })

    const playTest = () => {
        const finalAnswers = [];
        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach(answer => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-contant-center');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" value="${answer.title}" name="answer" class="d-none">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            switch (true) {
                case numberQuestion === 0:
                    prevButton.classList.add('d-none');
                    break;
                case numberQuestion <= questions.length - 1:
                    prevButton.classList.remove('d-none');
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;
                case numberQuestion === questions.length:
                    prevButton.classList.add('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    break;
                default:
                    break;
            }

            if (numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
            }

            if (numberQuestion === questions.length) {
                formAnswers.innerHTML = `
                    <div class="mb-3">
                        <label for="numberPhone" class="form-label">Enter your number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `;
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест!';

                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
        }

        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {};

            const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone');

            inputs.forEach((input, index) => {
                if (numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj['Phone Number'] = input.value;
                }
            })

            finalAnswers.push(obj);
        }

        nextButton.addEventListener('click', () => {
            checkAnswer();
            numberQuestion++;

            renderQuestions(numberQuestion);
        })

        prevButton.addEventListener('click', () => {
            numberQuestion--;

            renderQuestions(numberQuestion);
        })

        sendButton.addEventListener('click', () => {
            checkAnswer();
            numberQuestion++;

            renderQuestions(numberQuestion);
        })
    }
})
