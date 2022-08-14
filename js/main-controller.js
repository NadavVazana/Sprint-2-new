var gKeywordSearchCountMap
var gLang = window.navigator.language.substring(0, 2)
var gIsTextWritten = false
var gIsUserGallery = false
var gIsRandom = false

function init() {
    
    initCanvas()
    initGallery()
    initKeywords()
    addMainListeners()

}

function onKeywordPress(value) {
    document.querySelector('.clear-gallery').hidden = true
    gIsUserGallery = false
    if (gKeywordSearchCountMap[value] >= 45) return
    gKeywordSearchCountMap[value]++
    saveToLocalStorage('keywords', gKeywordSearchCountMap)
    renderKeywords()

}

function renderUserGallery() {
    document.querySelector('.rnd-meme').hidden=true
    document.querySelector('.clear-gallery').hidden = false
    gIsUserGallery = true
    var savedImgs = loadFromLocalStorage('saved')
    var elGallery = document.querySelector('.gallery-body')
    if (!savedImgs || !savedImgs.length) {
        elGallery.innerHTML = '<span class="no-saved">No saved memes :(</span>'
        return}
    var strHTML = savedImgs.map(img => {
        return `<div onclick=  "onClickCard(${img.id})" class="gal-item"><div class="details"><span data-trans ="hover" class="info">Build your own meme!</span></div><img class="gal-img " src="${img.url}"></div>`
    }).join('')
    elGallery.innerHTML = strHTML
    savedImgs.forEach(img => {
        var image = gImgs.find(image => image.id === img.id)
        if (image) {
            img.text1 = image.text1
            img.text2 = image.text2
        }

    })


}

function renderGallery(filter = gImgs) {
    document.querySelector('.rnd-meme').hidden=false
    gIsUserGallery = false
    var elGallery = document.querySelector('.gallery-body')
    var strHTML = filter.map(img => {

        return `<div onclick=  "onClickCard(${img.id})" class="gal-item"><div class="details"><span data-trans ="hover" class="info">Build your own meme!</span></div><img class="gal-img " src="${img.url}"></div>`
    }).join('')
    

    elGallery.innerHTML = strHTML
}

function initKeywords() {
    var keys = loadFromLocalStorage('keywords')
    if (!keys) {
        keys = { Funny: 25, Angry: 15, Happy: 20 }
        saveToLocalStorage('keywords', keys)

    }

    gKeywordSearchCountMap = keys
    renderKeywords()

}

function renderKeywords() {

    var elKeywords = Array.from(document.querySelectorAll('.keywords > *'))
    elKeywords.forEach(keyword => {

        keyword.style.fontSize = `${gKeywordSearchCountMap[keyword.innerText]}px`
    })


}

function onClickCard(id) {
    var img = getImgById(id)
    openModal(img)
}

function openFlexModal(img) {
    document.querySelector('.modal').classList.add('open-modal')
    drawImg(img)
}

function openModal(img) {
    var text = getCurrTexts()
    document.querySelector('.modal').classList.add('open-modal')
    drawImg(img)
    if (!gIsUserGallery) {
        drawDefaultText()
    }
    if (gIsUserGallery) {
        if (img.text1) {
            drawImg(img)
            drawText(img.text1)
            gElInput.value = img.text2
            text.currLine = 2
        }
        if (img.text2) {
            drawImg(img)
            drawText(img.text2)
            gElInput.value = img.text2
            text.currLine = 2
        }
    }


}



function closeModal() {
    resetInputs()
    document.querySelector('.modal').classList.remove('open-modal')
}

function onTranslate(value) {
    if (value === 'select') gLang = window.navigator.language.substring(0, 2)
    else gLang = value
    saveToLocalStorage('LANG', gLang)
    translate(gLang)
}


function onAddLine() {
    addLine()
}


function closeShare() {
    document.querySelector('.share-section').classList.remove('open-share')
}

function onFilterByKeyword(text) {
    document.querySelector('.clear-gallery').hidden = true
    filterByKeyword(text)
    gIsUserGallery = false
}


function makeTextBigger(elText) {


}

function onChangeFontSize(value) {
    changeFontSize(value)
}

function onImgInput(ev) {
    loadImageFromInput(ev, drawImg)
}

function loadImageFromInput(ev, drawImg) {
    document.querySelector('.share-container').innerHTML = ''

    var reader = new FileReader()

    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        var image = { url: img.src }
        img.onload = drawImg.bind(null, image)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function addMainListeners() {
    // On press ESC close modal
    window.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
            closeModal()
        }
    })
}



