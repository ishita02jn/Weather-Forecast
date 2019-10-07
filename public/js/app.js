
const weatherForm = document.getElementById('forecastFormID')
//const location = document.getElementById('address')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = document.getElementById('address').value
    const msg1 =  document.getElementById("msg-1")
    const msg2 =  document.getElementById("msg-2")

    msg1.style.color= "#333333"
    msg1.textContent = "Loading....."
    msg2.textContent = ""

    fetch('http://localhost:3000/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.style.color = "red"
                msg1.innerHTML=data.error
                msg2.innerHTML=""
            } else {
                msg1.style.color = "#27c4a2"
                msg1.innerHTML=data.location
                msg2.innerHTML=data.forecast
            }
        })
    })
})