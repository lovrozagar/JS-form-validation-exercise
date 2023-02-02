/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

const formValidation = (() => {
  function domOnLoad() {
    initInputValidation()
  }

  function initInputValidation() {
    window.onload = () => {
      // EMAIL LISTENERS
      const email = document.getElementById('email')
      email.addEventListener('focusout', () => {
        validateEmail()
        email.addEventListener('input', validateEmail)
      })

      // COUNTRY LISTENERS
      const country = document.getElementById('country')
      country.addEventListener('focusout', () => {
        validateCountry()
        country.addEventListener('input', validateCountry)
      })

      // ZIP CODE LISTENERS
      const zipCode = document.getElementById('zip-code')
      zipCode.addEventListener('focusout', () => {
        validateZipCode()
        zipCode.addEventListener('input', validateZipCode)
      })

      // ZIP CODE LISTENERS
      const password = document.getElementById('password')
      password.addEventListener('focusout', () => {
        validatePassword()
        password.addEventListener('input', validatePassword)
      })

      // PASSWORD CONFIRM LISTENERS
      const passwordConfirm = document.getElementById('password-confirm')
      passwordConfirm.addEventListener('focusout', () => {
        validatePasswordConfirm()
        passwordConfirm.addEventListener('input', validatePasswordConfirm)
      })

      const form = document.getElementById('form')
      form.addEventListener('submit', (event) => validateAllOnSubmit(event))
    }
  }

  function validateAllOnSubmit(event) {
    event.preventDefault()
    // EMAIL
    validateEmail()
    const email = document.getElementById('email')
    email.addEventListener('input', validateEmail)
    // COUNTRY
    validateCountry()
    const country = document.getElementById('country')
    country.addEventListener('input', validateCountry)
    // ZIP CODE
    validateZipCode()
    const zipCode = document.getElementById('zip-code')
    zipCode.addEventListener('input', validateZipCode)
    // PASSWORD
    validatePassword()
    const password = document.getElementById('password')
    password.addEventListener('input', validatePassword)
    // CONFIRM PASSWORD
    validatePasswordConfirm()
    const passwordConfirm = document.getElementById('password-confirm')
    passwordConfirm.addEventListener('input', validatePasswordConfirm)
  }

  function validateEmail() {
    const email = document.getElementById('email')
    const emailError = document.getElementById('email-error')

    if (isEmptyField(email, emailError)) return

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+$/
    if (!emailPattern.test(email.value)) {
      emailError.textContent = 'Value entered must be an email'
      email.classList.add('invalid')
      return
    }

    if (isTooShort(email, emailError)) return

    removeError(email, emailError)
    email.removeEventListener('input', validateEmail)
  }

  function validateCountry() {
    const country = document.getElementById('country')
    const countryError = document.getElementById('country-error')

    if (isEmptyField(country, countryError)) return

    const countryPattern = /^[a-zA-Z]+$/
    if (!countryPattern.test(country.value)) {
      setError(country, countryError, 'Letters allowed only')
      return
    }

    if (isTooShort(country, countryError)) return

    removeError(country, countryError)
    country.removeEventListener('input', validateCountry)
  }

  function validateZipCode() {
    const zipCode = document.getElementById('zip-code')
    const zipCodeError = document.getElementById('zip-code-error')

    if (isEmptyField(zipCode, zipCodeError)) return

    const countryPattern = /^[0-9]+$/
    if (!countryPattern.test(zipCode.value)) {
      setError(zipCode, zipCodeError, 'Numbers allowed only')
      return
    }

    if (isTooShort(zipCode, zipCodeError)) return

    removeError(zipCode, zipCodeError)
    zipCode.removeEventListener('input', validateZipCode)
  }

  function validatePassword() {
    const password = document.getElementById('password')
    const passwordError = document.getElementById('password-error')

    if (isEmptyField(password, passwordError)) return

    if (isTooShort(password, passwordError)) return

    const countryPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/
    if (!countryPattern.test(password.value)) {
      setError(
        password,
        passwordError,
        'Should contain at least one uppercase letter, one lowercase letter and one number'
      )
      return
    }
    removeError(password, passwordError)
    password.removeEventListener('input', validatePassword)
  }

  function validatePasswordConfirm() {
    const passwordConfirm = document.getElementById('password-confirm')
    const passwordConfirmError = document.getElementById(
      'password-confirm-error'
    )
    if (isEmptyField(passwordConfirm, passwordConfirmError)) {
      return
    }
    const password = document.getElementById('password')
    if (passwordConfirm.value !== password.value) {
      setError(passwordConfirm, passwordConfirmError, 'Passwords do not match')
      return
    }
    removeError(passwordConfirm, passwordConfirmError)
    passwordConfirm.removeEventListener('input', validatePasswordConfirm)
  }

  function isEmptyField(inputEl, errorEl) {
    if (inputEl.validity.valueMissing)
      setError(inputEl, errorEl, 'This field is required')
    return inputEl.validity.valueMissing
  }

  function isTooShort(inputEl, errorEl) {
    if (inputEl.validity.tooShort)
      setError(
        inputEl,
        errorEl,
        `Minimum ${inputEl.minLength} characters required`
      )
    return inputEl.validity.tooShort
  }

  function setError(inputEl, errorEl, errorString) {
    errorEl.textContent = errorString
    inputEl.classList.add('invalid')
  }

  function removeError(inputEl, errorEl) {
    errorEl.textContent = ''
    inputEl.classList.remove('invalid')
  }

  return { domOnLoad }
})()

export default formValidation
