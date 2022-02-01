import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBlihMgdgMd2nOObXyXl4_LvtfKgaelT-0",
    authDomain: "testburger-7337e.firebaseapp.com",
    databaseURL: "https://testburger-7337e-default-rtdb.firebaseio.com",
    projectId: "testburger-7337e",
    storageBucket: "testburger-7337e.appspot.com",
    messagingSenderId: "242452772631",
    appId: "1:242452772631:web:a58a96571db045ffbfa952",
    measurementId: "G-1XPR13JP89"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

document.addEventListener("DOMContentLoaded", function () {

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    const getData = () => {
        formAnswers.textContent = 'LOAD';
        prevButton.classList.add('d-none');
        nextButton.classList.add('d-none');

        setTimeout(() => {
            const dbRef = ref(getDatabase());

            get(child(dbRef, 'questions')).then((snapshot) => {
                if (snapshot.exists()) {
                    playTest(snapshot.val());
                    // console.log(snapshot.val());
                } else {
                    formAnswers.textContent = 'Ошибка загрузки данных!';
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }, 500);
    }

    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add('d-block');

        getData();
    })

    closeModal.addEventListener("click", () => {
        modalBlock.classList.remove('d-block');
    })

    const playTest = (questions) => {
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
                    nextButton.classList.remove('d-none');
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

            set(ref(db, 'contacts'), {
                ...finalAnswers
            });

            renderQuestions(numberQuestion);
        })
    }
})
