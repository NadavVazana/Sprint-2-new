var gTrans = {
    about: {
        en: 'About',
        he: 'מי אנחנו'
    },

    flexible: {
        en: 'I\'m flexible!',
        he: 'אני גמיש מאוד'
    },
    search: {
        en: 'Search by keywords',
        he: 'חפש על פי מילות מפתח'
    },
    text: {
        en: 'Input text here:',
        he: 'הכנס טקסט כאן'
    },
    hover: {
        en: 'Build your own meme!',
        he: 'בוא תבנה את המימ שלך'
    }
}

function translate(transKey) {
    if (transKey === 'he') document.querySelector('body').style.direction = 'rtl'
    else document.querySelector('body').style.direction = 'ltr'
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        el.innerText = gTrans[el.dataset.trans][transKey]
        if (el.placeholder !== undefined) el.placeholder = gTrans[el.dataset.trans][transKey]
    })

}