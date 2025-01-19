const board = document.getElementById("grid");

function show_row1() {
    board.children[7].innerHTML = "M";
    board.children[7].style.color = "red";
    board.children[8].innerHTML = "O";
    board.children[9].innerHTML = "I";
    board.children[10].innerHTML = "T";
    board.children[11].innerHTML = "R";
    board.children[12].innerHTML = "U";
    board.children[13].innerHTML = "O";
    board.children[14].innerHTML = "N";
    board.children[15].innerHTML = "G";
}

function show_row2() {
    board.children[22].innerHTML = "C";
    board.children[23].innerHTML = "A";
    board.children[23].style.color = "red";
    board.children[24].innerHTML = "N";
    board.children[25].innerHTML = "H";
    board.children[26].innerHTML = "A";
    board.children[27].innerHTML = "N";
}


function show_row3() {
    board.children[39].innerHTML = "T";
    board.children[39].style.color = "red";
    board.children[40].innerHTML = "R";
    board.children[41].innerHTML = "A";
    board.children[42].innerHTML = "M";
    board.children[43].innerHTML = "C";
    board.children[44].innerHTML = "A";
    board.children[45].innerHTML = "M";
}


function show_row4() {
    board.children[50].innerHTML = "G";
    board.children[51].innerHTML = "I";
    board.children[52].innerHTML = "A";
    board.children[53].innerHTML = "O";
    board.children[54].innerHTML = "L";
    board.children[55].innerHTML = "U";
    board.children[55].style.color = "red";
    board.children[56].innerHTML = "U";
}

function show_row5() {
    board.children[68].innerHTML = "D";
    board.children[69].innerHTML = "I";
    board.children[70].innerHTML = "T";
    board.children[71].innerHTML = "R";
    board.children[71].style.color = "red";
    board.children[72].innerHTML = "U";
    board.children[73].innerHTML = "Y";
    board.children[74].innerHTML = "E";
    board.children[75].innerHTML = "N";
}

function show_row6() {
    board.children[84].innerHTML = "C";
    board.children[85].innerHTML = "A";
    board.children[86].innerHTML = "T";
    board.children[87].innerHTML = "I";
    board.children[87].style.color = "red";
    board.children[88].innerHTML = "N";
    board.children[89].innerHTML = "H";
}

function show_row7() {
    board.children[96].innerHTML = "P";
    board.children[97].innerHTML = "H";
    board.children[98].innerHTML = "A";
    board.children[99].innerHTML = "M";
    board.children[100].innerHTML = "C";
    board.children[101].innerHTML = "H";
    board.children[102].innerHTML = "A";
    board.children[103].innerHTML = "T";
    board.children[103].style.color = "red";
}

function show_row8() {
    board.children[118].innerHTML = "D";
    board.children[119].innerHTML = "Y";
    board.children[119].style.color = "red";
    board.children[120].innerHTML = "S";
    board.children[121].innerHTML = "L";
    board.children[122].innerHTML = "E";
    board.children[123].innerHTML = "X";
    board.children[124].innerHTML = "I";
    board.children[125].innerHTML = "A";
}


function show_row(index) {
    switch (Number(index)) {
        case 0:
            show_row1();
            break;
        case 1:
            show_row2();
            break;
        case 2:
            show_row3();
            break;
        case 3:
            show_row4();
            break;
        case 4:
            show_row5();
            break;
        case 5:
            show_row6();
            break;
        case 6:
            show_row7();
            break;
        case 7:
            show_row8();
            break;
        default:
            console.log("Không có câu hỏi tương ứng với index: " + index);
    }
}

// Load dữ liệu từ file JSON
fetch('./question.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;

        // Lấy tất cả các nút câu hỏi
        const buttons = document.querySelectorAll('#buttons button');

        // Xử lý sự kiện khi người dùng click vào một câu hỏi
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                showQuestion(index);
            });
        });

        // Hiển thị câu hỏi khi người dùng chọn
        function showQuestion(index) {
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.style.display = 'block'; // Hiển thị quiz container
            document.querySelector(".overlay").style.display = "block";
            document.querySelector(".overlay").style.zIndex = "1";
            const question = questions[index];
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.textContent = question.question;

            const optionsList = document.createElement('ul');
            optionsList.classList.add('options');

            // Thêm các lựa chọn
            question.options.forEach(option => {
                const optionItem = document.createElement('li');
                const optionButton = document.createElement('button');
                optionButton.textContent = option;
                optionButton.addEventListener('click', () => checkAnswer(option, question.correct_answer, index));
                optionItem.appendChild(optionButton);
                optionsList.appendChild(optionItem);
            });

            // Xóa câu hỏi cũ và thêm câu hỏi mới
            quizContainer.innerHTML = '';
            quizContainer.appendChild(questionElement);
            quizContainer.appendChild(optionsList);
        }

        // Kiểm tra câu trả lời
        function checkAnswer(selectedAnswer, correctAnswer, index) {
            if (selectedAnswer === correctAnswer) {
                alert('Đúng rồi!');
                show_row(index);
                document.getElementById("quiz-container").style.display = "none";
                document.querySelector(".overlay").style.display = "none";
                document.querySelector(".overlay").style.zIndex = "-1";
            } else {
                alert('Sai rồi!');
                document.getElementById("quiz-container").style.display = "none";
                document.querySelector(".overlay").style.display = "none";
                document.querySelector(".overlay").style.zIndex = "-1";
            }
        }
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu câu hỏi:', error));
