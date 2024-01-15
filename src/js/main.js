const navMobile = document.querySelector('.nav-mobile__list')
const navMobileLink = document.querySelectorAll('.nav-mobile__link')
const popup = document.querySelector('.contact__popup')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const textArea = document.querySelector('#text-area')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const closeBtn = document.querySelector('.close')
const burgerBtn = document.querySelector('.hamburger')

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const showNav = () => {
	burgerBtn.classList.toggle('is-active')
	navMobile.classList.toggle('show')

	navMobileLink.forEach(item => {
		item.addEventListener('click', () => {
			navMobile.classList.remove('show')
			burgerBtn.classList.remove('is-active')
		})
	})
}
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}
const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. 3 znaków`)
	}
}
const checkMail = () => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest niepoprawny')
	}
}
const checkNumber = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z 9 cyfr`)
	}
}
const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})
	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
	console.log(errorCount)
}
document.addEventListener('click', event => {
	const isClickInsideNav = navMobile.contains(event.target)
	const isClickInsideBurger = burgerBtn.contains(event.target)

	if (!isClickInsideNav && !isClickInsideBurger) {
		navMobile.classList.remove('show')
		burgerBtn.classList.remove('is-active')
	}
})

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([username, email, phone, textArea])
	checkLength(username, 3)
	checkLength(email, 32)
	checkMail(email)
	checkNumber(phone, 9)
	checkErrors()
})
clearBtn.addEventListener('click', e => {
	e.preventDefault()
	;[username, email, phone, textArea].forEach(el => {
		el.value = ''
		clearError(el)
	})
})

const closePopup = () => {
	popup.classList.remove('show-popup')
}
closeBtn.addEventListener('click', e => {
	e.preventDefault()
	closePopup()
	;[username, email, phone, textArea].forEach(el => {
		el.value = ''
		clearError(el)
	})
})

burgerBtn.addEventListener('click', showNav)
