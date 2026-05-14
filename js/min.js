let theme = document.querySelectorAll(".calculat .level-theme button"),
  buttons = document.querySelectorAll(".keys button"),
  calc = document.querySelector(".result span"),
  res = document.querySelector(".result h4")

let audioClick = document.querySelector("audio .click")
let audioReset = document.querySelector("audio .reset")

const sounds = {
  click: new Audio("soundes/click.mp3"),  // نفس اسم الفولدر بتاعك
  reset: new Audio("soundes/reset.mp3"),
  equal: new Audio("soundes/equal.mp3"),
  calc: new Audio("soundes/calc.mp3"),
  delet: new Audio("soundes/delet.mp3"),
}

/*=== Toggle Theme ===*/
theme.forEach(but => {
  but.addEventListener("click", () => {
    theme.forEach(but => {
      but.classList.remove("active")
    })
    but.classList.add("active")
  })
})

/*=== Use keys ===*/
buttons.forEach(but => {
  but.addEventListener("click", () => {

    switch (but.textContent) {
      case 'RESET':
        reset()
        playSouand("reset")
        break;
      case 'DEL':
        deletLastValue()
        playSouand("delet")
        break;
      case '=':
        calc.textContent += res.textContent
        res.textContent = "0"
        evaluate()
        calc.textContent = ""
        playSouand("equal")
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        addNums(but.textContent)
        calc.textContent += res.textContent
        res.textContent = "0"
        playSouand("calc")
        break;
      default:
        addNums(but.textContent)
        playSouand("click")

    }
  })
})

/*=== Keyboard keys ===*/
document.addEventListener("keydown", (e) => {
  for (let i = 0; i < 10; i++) {
    if (e.key === `${i}`) {
      buttons[i].click()
    }
  }

  switch (e.key) {
    case "Enter":
      buttons[buttons.length - 2].click()
      break;

    case "+":
      console.log("+")
      buttons[buttons.length - 6].click()
      break;

    case "-":
      buttons[buttons.length - 5].click()
      break;

    case "*":
      buttons[buttons.length - 4].click()
      break;

    case "/":
      buttons[buttons.length - 3].click()
      break;

    case ".":
      buttons[10].click()
      break;

    case "Backspace":
      buttons[11].click()
      break;

    case "Escape":
      buttons[buttons.length - 1].click()
      break;

  }
})

/*=== Functions ===*/
function reset() {
  res.style.color = ""
  calc.textContent = ""
  res.textContent = "0"
}

function addNums(value) {
  res.style.color = ""
  if (res.textContent === "0") {
    res.textContent = ""
  }
  res.textContent += value
}

function deletLastValue() {
  let currentContent = res.textContent
  res.textContent = currentContent.slice(0, - 1)
}

function evaluate() {
  try {
    let calculation = math.evaluate(calc.textContent)
    res.textContent = calculation
  } catch (error) {
    res.textContent = "Error Invaled"
    res.style.color = "red"
  }
}

function playSouand(name) {
  sounds[name].currentTime = 0
  sounds[name].play()
}