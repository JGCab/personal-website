import createSignal from "./components/lib/signals.js"

const [count, setCount, onCountChange] = createSignal(0)

const counterButton = document.getElementById("counter-button")
const counter = document.getElementById("counter")

function setCounterCount(value){
    counter.textContent = `current count is ${value}`
}

setCounterCount(count)

onCountChange((value) => {
    setCounterCount(value)
})

counterButton.addEventListener('button-click', () => {
    setCount((prev) => {
        return prev += 1
    })
})