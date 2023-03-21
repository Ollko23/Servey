const btnLeft = document.getElementById("left")
const btnRight = document.getElementById("right")
const counter = document.getElementById("counter")
const submitBtn = document.getElementById("submit")
const missingDiv = document.getElementById("missing")
const addSpan = document.getElementById("add")
const questionsNumber = document.getElementsByClassName('question').length
if (btnLeft != null && btnLeft != undefined) btnLeft.addEventListener("click", (e) => changeSlide(e, "left"))
if (btnRight != null && btnRight != undefined) btnRight.addEventListener("click", (e) => changeSlide(e, "right"))
let r = document.querySelector(':root');
let rs = getComputedStyle(r)
submitBtn.addEventListener("click", checkIfChecked)
let activeSlideIndex = 0
counter.innerText = `${activeSlideIndex + 1} / ${questionsNumber}`

// checkIfChecked()
const changeSlide = (e, direction) => {
    e.preventDefault()
    let rsv = rs.getPropertyValue('--transformation')
    if (direction == 'right') {
        activeSlideIndex++
        if (activeSlideIndex > questionsNumber - 1) {
            activeSlideIndex = questionsNumber - 1
        }
    } else {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = 0
        }
    }
    counter.innerText = `${activeSlideIndex + 1} / ${questionsNumber}`
    r.style.setProperty('--transformation', activeSlideIndex)
}

function checkIfChecked() {
    const radios = document.getElementsByTagName("input")
    let names = []
    let missing = []
    for (item of radios) {
        if (item.checked) {
            names.push(Number(item.name))
        }
    }
    for (let i = questionsNumber; i > 0; i--) {
        if (!names.includes(i)) {
            missing.push(i)
        }
    }

    if (missing.length !== 0) {
        addSpan.innerText = missing.sort((a, b) => a - b)
        missingDiv.style.setProperty("display", "block")
    }
}