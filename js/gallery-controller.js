var gImgs
var gFiltered = gImgs
var gSavedImgs
var gRandomTexts = ['I like coding', 'How about..', 'Coding academy?', 'I bet you', 'No one:', 'Be careful', 'Python?', 'Knock knock']

function initGallery() {
    document.querySelector('.clear-gallery').hidden = true
    loadSavedGallery()
    createImgs()
    renderGallery(gImgs)
}


function loadSavedGallery() {
    gSavedImgs = loadFromLocalStorage('saved')
    if (!gSavedImgs || !gSavedImgs.length) {
        gSavedImgs = []
        saveToLocalStorage('saved', gSavedImgs)
    }

}

function createImgs() {
    gImgs = loadFromLocalStorage('images')
    if (!gImgs || !gImgs.length) {
        gImgs = []
        for (var i = 1; i < 10; i++) {
            gImgs.push(createImg(i, `imgs/gallery2/${i}.jpg`, ['funny', 'cat', 'coding', 'academy', 'dogs', 'zebra']))
        }
        for (var i = 11; i < 16; i++) {
            gImgs.push(createImg(i, `imgs/gallery2/${i}.jpg`, ['toxic', 'pc', 'xbox', 'random', 'humor', 'sad', 'angry']))
        }
        for (var i = 17; i < 21; i++) {
            gImgs.push(createImg(i, `imgs/gallery2/${i}.jpg`, ['holiday', 'scary', 'game', 'pic', 'headphones', 'box', 'happy']))
        }

        gImgs.push(createImg(i, `imgs/gallery2/${i}.jpg`, ['politics', 'shows', 'movies', 'bullshit', 'happy']))
        saveToLocalStorage('images', gImgs)
    }
}


function createImg(id, url, keywords, text1 = '', text2 = '') {
    var image = {
        id,
        url,
        keywords,
        text1,
        text2

    }
    return image
}

function randomImg() {
    var rndIdx = getRandomInt(0, gImgs.length - 2)
    var rndText = getRandomInt(0, gRandomTexts.length)
    openFlexModal(gImgs[rndIdx])
    drawImg(gImgs[rndIdx])
    drawText(gRandomTexts[rndText])
    gText.currLine = 2

}




function getImgById(id) {

    var img = gImgs.find(img => img.id === id


    )
    return img
}

function filterByKeyword(text) {
    if (!text) {
        gFiltered = gImgs
        renderGallery(gFiltered)
        return
    }
    var filtered = gImgs.filter(img => {
        var key = img.keywords.find(keyword => {
            return keyword.toLowerCase().includes(text.toLowerCase())

        })

        if (key) {
            return img
        }
    })
    gFiltered = filtered
    renderGallery(gFiltered)


}

function clearUserGallery() {
    if (!gSavedImgs.length) return
    if (!confirm('Are you sure you want to delete all your saved memes?')) return
    gSavedImgs = []
    saveToLocalStorage('saved', gSavedImgs)
    renderUserGallery()
}

function saveImage() {
    var currImg = getCurrImage()
    var texts = getCurrTexts()
    var saves = loadFromLocalStorage('saved')

    var savedImg = saves.find(img => currImg.currImg.id === img.id)
    if (savedImg) {
        savedImg.text1 = texts.text1
        savedImg.text2 = texts.text2
        saveToLocalStorage('images', gImgs)
        saveToLocalStorage('saved', gSavedImgs)
        renderUserGallery()
        document.querySelector('.saved-modal').classList.add('open-saved-modal')
        setTimeout(() => {
            document.querySelector('.saved-modal').classList.remove('open-saved-modal')
    
        }, 2500);
        return

    }


    document.querySelector('.saved-modal').classList.add('open-saved-modal')
    setTimeout(() => {
        document.querySelector('.saved-modal').classList.remove('open-saved-modal')

    }, 2500);
    var image = {
        id: currImg.currImg.id,
        url: currImg.currImg.url,
        text1: texts.text1,
        text2: texts.text2,
        color: getTextColor()
    }


    saveToLocalStorage('images', gImgs)
    gSavedImgs.push(image)
    saveToLocalStorage('saved', gSavedImgs)
    renderUserGallery()

}



