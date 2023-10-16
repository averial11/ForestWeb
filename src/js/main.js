const burgerBtn = document.querySelector('.hamburger')
const navMobile = document.querySelector('.nav-mobile__list')
const navMobileLink = document.querySelectorAll('.nav-mobile__link')

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

burgerBtn.addEventListener('click', showNav)
