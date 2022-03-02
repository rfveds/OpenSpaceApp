const passwordInput = document.querySelector('#text-input')
const okButton = document.querySelector('#ok-button')
const checkButtons = document.querySelectorAll('.check-buttons')[0].children
const levers = document.querySelectorAll('.levers')[0].children
const launchButton = document.querySelector('#launch-button')
const leversArr = document.querySelectorAll('input[type=range]')
const checkBoxesArr = document.querySelectorAll('input[type=checkbox]')
const rocket = document.querySelector('.rocket')

const validPassword = 'TrustNo1'
let leversStatus = false
let checkBoxesStatus = false

disableCheckboxes()
disableLevers()
disableLaunchButton()

okButton.addEventListener('click', () => {
    if (checkPassword()) {
        enableLevers()
        enableCheckboxes()
        disableInputs()
    }
    passwordInput.value = ''
})

//added to pass tests, works well without it
leversArr.forEach((e)=>{
    e.onchange = function () {
        checkLevers()
    }
})

leversArr.forEach((e) =>{
    e.addEventListener('click', () => {
        if(checkLevers()){
            leversStatus = true
        }
        if (leversStatus && checkBoxesStatus) {
            enableLaunchButton()
        }
    })
})

checkBoxesArr.forEach((e) =>{
    e.addEventListener('click', () => {
        if(checkCheckboxes()){
            checkBoxesStatus = true
        }
        if (leversStatus && checkBoxesStatus){
            enableLaunchButton()
        }
    })
})

launchButton.addEventListener('click', () => {
    animate(rocket)
})

function animate(rocket){
    let bottom = 300
    let left = 400
    let id = null
    clearInterval(0)
    id = setInterval(frame, 5)
    function frame(){
        if (bottom === 1000){
            clearInterval(id)
        }else {
            bottom ++
            left ++
            rocket.style.bottom = bottom + 'px'
            rocket.style.left = left + 'px'
         }
    }
}

function checkLevers() {
    let result = true
    for (let i = 0; i < levers.length; i++) {
        if (parseInt(levers[i].value) !== 100) {
            result = false
        }
    }
    return result
}

function checkCheckboxes() {
    let result = true
    for (let i = 0; i < checkButtons.length; i++) {
        if (checkButtons[i].checked === false) {
            result = false
        }
    }
    return result
}

function enableLaunchButton() {
    launchButton.disabled = false
}

function disableLaunchButton() {
    launchButton.disabled = true
}

function checkPassword() {
    const pass = passwordInput.value
    return pass === validPassword;
}

function enableCheckboxes() {
    for (let i = 0; i < checkButtons.length; i++) {
        checkButtons[i].disabled = false
    }
}

function disableCheckboxes() {
    for (let i = 0; i < checkButtons.length; i++) {
        checkButtons[i].disabled = true
    }
}

function enableLevers() {
    for (let i = 0; i < levers.length; i++) {
        levers[i].disabled = false
    }
}

function disableLevers() {
    for (let i = 0; i < levers.length; i++) {
        levers[i].disabled = true
    }
}

function disableInputs() {
    passwordInput.disable = true
    okButton.disable = true
}