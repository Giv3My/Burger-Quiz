document.addEventListener("DOMContentLoaded", function () {

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');

  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add('d-block');

    playTest();
  })

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove('d-block');
  })

  const playTest = () => {
    const renderQuestions = () => {
      const imgStandart = './image/burger.png';
      const nameStandart = 'Стандарт';
      const imgBlack = './image/burgerBlack.png';
      const nameBlack = 'Черный';

      questionTitle.textContent = "Какого цвета бургер вы хотите?";

      formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
              <input type="radio" id="answerItem1" name="answer" class="d-none">
              <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${imgStandart}" alt="burger">
                <span>${nameStandart}</span>
              </label>
            </div>
            <div class="answers-item d-flex justify-content-center">
              <input type="radio" id="answerItem2" name="answer" class="d-none">
              <label for="answerItem2" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${imgBlack}" alt="burger">
                <span>${nameBlack}</span>
              </label>
            </div>
          `
    }

    renderQuestions();
  }
})
