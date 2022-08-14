const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
const colours = ['#3914AF', '#7109AA', '#7109AA', '#FFD300', '#1240AB', '#9F3ED5', '#48036F','#200772','#A68900']

startBtn.addEventListener('click',(event)=>{

// убираем ' # ' который ставится по умолчанию в адресной строке при нажатии на текст:
 event.preventDefault();
 screens[0].classList.add('up')
 })

//навешиваем обработчик событий сразу на весь список из кнопок:
 timeList.addEventListener('click', event => 
 {
     if (event.target.classList.contains ('time-btn')) {
         time = +(event.target.getAttribute('data-time'))
         screens[1].classList.add('up')
        
         startGame()
     }
 })

 // прикрепляем обработчик событий на доску и если клик попадает на 'circle' то прибавляем score 
 board.addEventListener('click', event => {
     if (event.target.classList.contains('circle')){
         score++;
         event.target.remove();
         createRandomCircles()
     }
 })

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircles()
    setTime(time)
}

function decreaseTime(){
  if (time===0){
      finishGame()
  } else{
    let current = --time
    if (current<10) {
      current = `0${current}`
    }
    setTime(current)
    }
}


function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
 board.innerHTML = `<h1>Ваш счет: <span
 class="primary">${score}</span></h1>`

}

function createRandomCircles() {
    const circle = document.createElement('div')
    const size = getRandomNumber(12, 70)
    const {width,height} = board.getBoundingClientRect() // const {width,height} - деструктуризация
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)
    const colour = addRandomColour()
    const index = Math.floor(Math.random() * colours.length)


    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.style.backgroundColor = colour

    board.append(circle);
     return colours[index]
}

//создаем функцию для того, чтобы образовывались рандомные по размеру круги
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function setColour(element) {
    const colour = addRandomColour()
    element.style.backgroundColor = colour
}
function addRandomColour(element) {
    const index = Math.floor(Math.random() * colours.length)
    return colours[index]
}