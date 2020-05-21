console.log("Client side JS loading...")

const formRequest = document.querySelector('form')
const searchInput = document.querySelector('input')
let messageOne = document.querySelector('#weather-message1')
let messageTwo = document.querySelector('#weather-message2')
let messageThree = document.querySelector('#weather-message3')

formRequest.addEventListener('submit', (event) => {
    event.preventDefault()

    const address = searchInput.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""

    fetch(`http://127.0.0.1:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.errorMsg) {
                console.log(data.errorMsg)
            } else {
                messageThree.textContent = `Current Adress: ${data.address}`
                messageOne.textContent = `Locatoin: ${data.location}`
                messageTwo.textContent = data.forcast
            }
        })
    })
})