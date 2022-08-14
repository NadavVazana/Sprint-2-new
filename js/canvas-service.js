var gElCanvas
var gCtx
const gElInput = document.querySelector('.input-text')
var gTextColor = '#FFFFFF'
var gText = createTextObject()
var gImgDetails = createCurrImage()
var gTouchEvs = ['touchstart', 'touchend', 'touchmove']
var gIsMove = false
var gStartPos

function initCanvas() {
    
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    resizeCanvas()
    renderCanvas()
}


function changeTextColor(color) {
    gText.textColor = color
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight


}

function renderCanvas() {
    gElCanvas.height = gImgDetails.imgHeight
    gCtx.fillStyle = "rgba(1,1,1,0)"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    if (gImgDetails.currImg) {
        drawImg(gImgDetails.currImg)

    }
}

function addListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })

    addMouseListeners()
    // addTouchListeners()
    
    
    
}

function addMouseListeners(){
    gElCanvas.addEventListener('mousedown',onDown)
}

function onDown(ev){
    var pos = getEvPos(ev)
    isTextClicked(pos)
    gIsMove = true
    gStartPos = pos

    
}

function onMove(){
    if(!gIsMove) return

}

function isTextClicked(pos) {
    
    if(pos.x > gText.text1Pos.x && pos.x < gText.text1Width
        && pos.y < gText.fontSize && pos.y > gText.text1Pos.x) console.log('sdasd');

    // else if (pos.x > gText.text2Pos.x && pos.x < gText.text1Width
    //     && pos.y < gText.fontSize && pos.y > 20) return 2  
    
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}
function createTextObject(text1 = '', text2 = '', fontSize = 50, currLine = 1, textColor = gTextColor, text1Width,text2Width,text1Pos,text2Pos) {
   return {
        text1,
        text2,
        fontSize,
        currLine,
        textColor,
        text1Width,
        text2Width,
        text1Pos,
        text2Pos

    }
    
}

function createCurrImage(imgHeight, currImg) {
    return {
        imgHeight,
        currImg,


    }
   
}

function drawImg(img) {
    gImgDetails.currImg = img
    const image = new Image()

    image.src = gImgDetails.currImg.url
    var imgWidth = image.naturalWidth
    var imgHeight = image.naturalHeight

    gImgDetails.imgHeight = (imgHeight * gElCanvas.width) / imgWidth


    gElCanvas.height = gImgDetails.imgHeight


    gCtx.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, gElCanvas.width, gImgDetails.imgHeight)

}




function drawText(text) {
    if (gCtx.measureText(text).width >= gElCanvas.width - 25) {
        document.querySelector('.input-text').maxLength = text.length
        return
    }
    gElInput.maxLength = 500



    if (gText.currLine === 1) {

        gImgDetails.currImg.text1 = text
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        drawImg(gImgDetails.currImg)
        setCtxProperties()
        gText.text1Width = gCtx.measureText(text).width
        gCtx.fillText(`${text}`, 20, 50)
        gCtx.strokeText(`${text}`, 20, 50)
        gText.text1Pos = {x:20,y:50}
        



        if (gText.text2) {
            gCtx.fillText(`${gText.text2}`, 20, gImgDetails.imgHeight - 50)
            gCtx.strokeText(`${gText.text2}`, 20, gImgDetails.imgHeight - 50)
        }

        gText.text1 = text
    }


    else {
        {
            gImgDetails.currImg.text2 = text
            gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
            drawImg(gImgDetails.currImg)
            setCtxProperties()
            gCtx.fillText(`${text}`, 20, gImgDetails.imgHeight - 50)
            gCtx.strokeText(`${text}`, 20, gImgDetails.imgHeight - 50)


            if (gText.text1) {
                gCtx.fillText(`${gText.text1}`, 20, 50)
                gCtx.strokeText(`${gText.text1}`, 20, 50)
            }

            gText.text2 = text
        }
    }

}


function setCtxProperties() {
    gCtx.fillStyle = gText.textColor
    gCtx.strokeStyle = 'black'
    gCtx.font = `${gText.fontSize}px impact`
}

function addLine() {
    if(gText.currLine === 2){
        gElInput.focus()
        return
    } 
    gText.currLine = 2
    gElInput.value = ''
    gElInput.focus()
}


function switchLines() {

    gText.currLine = gText.currLine === 1 ? 2 : 1
    if (gText.currLine === 1) {
        gElInput.value = gText.text1
        gElInput.focus()
    }
    else if (gText.text2) {
        gElInput.value = gText.text2
        gElInput.focus()
    }
    else {
        gElInput.value = ''
        gElInput.focus()
    }
}

function drawDefaultText() {

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImg(gImgDetails.currImg)
    setCtxProperties()
    gCtx.fillText(`Meme text\'s here :)`, 20, 50)
    gCtx.strokeText(`Meme text\'s here :)`, 20, 50)
    gCtx.fillText(``, 20, gImgDetails.imgHeight - 50)
    gCtx.strokeText(``, 20, gImgDetails.imgHeight - 50)




}


function resetInputs() {
    gText.text1 = ''
    gText.text2 = ''
    gElInput.value = ''
    gText.currLine = 1
    gText.text1Pos = { x: 20, y: 0 }
    gText.text2Pos = { x: 20, y: 0 }
}



function changeFontSize(value) {
    gText.fontSize = value
    gElInput.focus()
    resetInputs()
    drawText('')
}



function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}

function getCurrImage() {
    return gImgDetails
}

function getCurrTexts() {
    return gText
}

function getTextColor() {
    return gText.textColor
}

