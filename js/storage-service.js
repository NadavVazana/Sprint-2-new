function saveToLocalStorage(key, value) {
    var str = JSON.stringify(value)
    localStorage.setItem(key, str)
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}