let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

//если клацаем по модалке, то что-то должно произойти, а именно вызваться уровень сложности
modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('easy')) {
        speed = 1000;
    } else if (e.target.classList.contains('normal')) {
        speed = 500;
    } else if (e.target.classList.contains('hard')) {
        speed = 200;
    }
    if (e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();
    }
});

function startGame() {

    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    for (let i = 1; i < 181; i++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }

    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel');
    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }

    x = 5;
    y = 15;

//https://www.minifier.org/
    let mainArr = [[[0, 1], [0, 2], [0, 3], [[-1, 1], [0, 0], [1, -1], [2, -2],], [[1, -1], [0, 0], [-1, 1], [-2, 2],], [[-1, 1], [0, 0], [1, -1], [2, -2],], [[1, -1], [0, 0], [-1, 1], [-2, 2],],], [[1, 0], [0, 1], [1, 1], [[0, 0], [0, 0], [0, 0], [0, 0],], [[0, 0], [0, 0], [0, 0], [0, 0],], [[0, 0], [0, 0], [0, 0], [0, 0],], [[0, 0], [0, 0], [0, 0], [0, 0],],], [[1, 0], [0, 1], [0, 2], [[0, 0], [-1, 1], [1, 0], [2, -1],], [[1, -1], [1, -1], [-1, 0], [-1, 0],], [[-1, 0], [0, -1], [2, -2], [1, -1],], [[0, -1], [0, -1], [-2, 0], [-2, 0],],], [[1, 0], [1, 1], [1, 2], [[0, 0], [0, 0], [1, -1], [-1, -1],], [[0, -1], [-1, 0], [-2, 1], [1, 0],], [[2, 0], [0, 0], [1, -1], [1, -1],], [[-2, 0], [1, -1], [0, 0], [-1, 1],],], [[1, 0], [-1, 1], [0, 1], [[0, -1], [-1, 0], [2, -1], [1, 0],], [[0, 0], [1, -1], [-2, 0], [-1, -1],], [[0, -1], [-1, 0], [2, -1], [1, 0],], [[0, 0], [1, -1], [-2, 0], [-1, -1],],], [[1, 0], [1, 1], [2, 1], [[2, -1], [0, 0], [1, -1], [-1, 0],], [[-2, 0], [0, -1], [-1, 0], [1, -1],], [[2, -1], [0, 0], [1, -1], [-1, 0],], [[-2, 0], [0, -1], [-1, 0], [1, -1],],], [[1, 0], [2, 0], [1, 1], [[1, -1], [0, 0], [0, 0], [0, 0],], [[0, 0], [-1, 0], [-1, 0], [1, -1],], [[1, -1], [1, -1], [1, -1], [0, 0],], [[-2, 0], [0, -1], [0, -1], [-1, -1],],],];

    let currentFigure = 0;
    let figureBody = 0;
    let rotate = 1;

    function create() {
        function getRandom() {
            return Math.round(Math.random() * (mainArr.length - 1));
        }

        rotate = 1;
        currentFigure = getRandom();

        figureBody = [
            document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
        ];

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    }

    create();

//Правила начисления очков
    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `YOUR SCORE: ${score}`;

    function move() {
        let moveFlag = true;
        let coordinates = [
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
        ];

        for (let i = 0; i < coordinates.length; i++) {

            //всегда нужно помнить что число нельзя сравнивать со строкой
            if (coordinates[i][1] === "1" || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break;
            }
        }

        if (moveFlag === true) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
            ];
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        } else {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }
            for (let i = 1; i < 15; i++) {  //цикл для проверки полного ряда и его удаления по рядам
                let count = 0;
                //цикл для проверки полного ряда по координатам
                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                        count++;

                        if (count === 10) {
                            score += 10;
                            input.value = `YOUR SCORE: ${score}`;

                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
                            }
                            let set = document.querySelectorAll('.set');  // собираем все элементы с классом Сет
                            let newSet = [];
                            for (let s = 0; s < set.length; s++) {
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];

                                if (setCoordinates[1] > i) {
                                    set[s].classList.remove('set'); //далее обращаемся к ячейке,что стоит под ним и добавлям ей методом ПУШ класс Сет
                                    newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                }
                            }
                            //Теперь пройдемся циклом по новому массиву newSet
                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }
                            i--;
                        }
                    }
                }
            }
            //правила окончания игры: как только фигура застрянет на 15 ряду( невидимый нашему глазу), игра закончилась
            for (let n = 1; n < 11; n++) {
                if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`GAME OVER! YOUR SCORE: ${score}`);
                    break;
                }
            }
            create();
        }
    }

    let interval = setInterval(function () {
        move();
    }, speed);


    let flag = true;
//управление кнопками
    window.addEventListener('keydown', function (e) {
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

        //получаем новые координаты, а - параметр который будет равен от 1 до -1 в зависимости от нажатой клавиши
        function getNewState(a) {

            flag = true;

            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
            ];

            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }
            if (flag === true) {
                for (i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }
                figureBody = figureNew;

                for (i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            }
        }

        if (e.keyCode === 37) {
            getNewState(-1);
        } else if (e.keyCode === 39) {
            getNewState(1);
        } else if (e.keyCode === 40) {
            move();
        } else if (e.keyCode === 38) {
            flag = true;

            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
            ];

            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }
            if (flag === true) {
                for (i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }
                figureBody = figureNew;

                for (i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
                //если ротейт меньше 4 то мы его продолжаем вращать, если же равен 4 , то мы сбрасываем его значение до единицы и можем вращать заново перебирая координаты поновому на новом ряду
                if (rotate < 4) {
                    rotate++;
                } else {
                    rotate = 1;
                }
            }
        }

    });

}