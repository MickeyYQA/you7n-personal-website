const texts = [
    { text: "Hello", lang: "[həˈləʊ], English" },
    { text: "你好", lang: "[ni˧˥.xɑʊ˨˩˦], Chinese" },
    { text: "こんにちは", lang: "konnichiwa, [ko̞nˈni̥tɕiwa], Japanese" },
    { text: "Bonjour", lang: "[bɔ̃ʒuʀ], French" },
    { text: "Guten Tag", lang: "[ɡuːtn taːk], German" },
    { text: "Xin chào", lang: "[sin t͡ɕa̤w], Vietnamese" },
    { text: "吀嘲", lang: "[sin t͡ɕa̤w], Vietnamese (chữ Nôm / 𡦂喃)" },
    { text: "안녕하세요", lang: "annyeonghaseyo, [a̠n.njʌ̹ŋ.ha̠.se̞.jo̞], Korean" },
    { text: "ئامانمۇسىز", lang: "amanmusiz, [ɑː.mɑn.muː.sɯz], Uyghur" },
    { text: "Привет", lang: "privet, [prʲɪˈvʲet], Russian" },
    { text: "Molo", lang: "[ˈmɔːlo], isiXhosa" },
    { text: "مرحبا", lang: "marhaban, [marḥabā], Arabic" },
    { text: "Hola", lang: "['ola], Spanish" },
    { text: "Salve", lang: "['salʋe], Latin" },
    { text: "Olá", lang: " [oˈla], Portuguese" },
    { text: "Ciao", lang: "/tʃao/, Italian" },
    { text: "Goedendag", lang: "[ˈɣudə(n)dɑx], Dutch" },
    { text: "नमस्ते", lang: "namaste, [nəˈməs̪te̞], Hindi" },
    { text: "Γεια σας", lang: "geia sas, [ʝaˈsas], Greek" },
    { text: "ᐊᐃᓐᖓᐃ", lang: "aingna, [ɑːiŋŋɑːi], Inuktitut" },
    { text: "ᎣᏏᏲ", lang: "osiyo, [oːsijo], Cherokee" },
    { text: "გამარჯობა", lang: "gamarjoba, [ɡɑ.mɑr.dʒoˈbɑ], Georgian" },
    { text: "Բարև", lang: "barev, [bɑˈɾɛv], Armenian" },
    { text: "העלא", lang: "hala, [haˈʕɑ], Hebrew" },
    { text: "สวัสดี", lang: "sawatdee, [sa.wát.dīː], Thai" },
    { text: "Góðan dag", lang: "[ˈkouːðanˌtɑːɣ], Icelandic" },
    { text: "Merhaba", lang: "[ˈmɛɾhaba], Turkish" },
    { text: "བཀྲ་ཤིས་བདེ་ལེགས།", lang: "Tashi Delek, [ˈtʂʰaʃi ˈdeːleɡ], Tibetan" },
    { text: "Ciallo~(∠·ω< )⌒★", lang: "[t͡ɕɑ̈˦.lo̞˨˧], ?" }
];

let currentIndex = 0;
const typingSpeed = 200; // Typing speed in milliseconds
const eraseSpeed = 100; // Erase speed in milliseconds
const delayBetweenTexts = 2000; // Delay between texts in milliseconds

function isRTLText(text) {
    return /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/.test(text);
}

function typeText(text, element, callback) {
    let index = 0;

    const langContainer = document.getElementById('language-text');
    langContainer.textContent = `(${texts[currentIndex].lang})`;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(callback, delayBetweenTexts);
        }
    }
    type();
}

function eraseText(element, callback) {
    let length = element.textContent.length;
    function erase() {
        if (length > 0) {
            element.textContent = element.textContent.substring(0, length - 1);
            length--;
            setTimeout(erase, eraseSpeed);
        } else {
            callback();
        }
    }
    erase();
}

function startTypingAnimation() {
    const element = document.getElementById('welcome-text');
    const langContainer = document.getElementById('language-text');
    const heroHello = element?.closest('.hero__hello');

    function cycleText() {
        const { text, lang } = texts[currentIndex];

        // Clear previous text and language
        element.textContent = '';
        langContainer.textContent = '';
        element.classList.remove('lang-zh', 'lang-ja', 'lang-rtl');
        heroHello?.classList.remove('is-rtl');

        if (text === "你好") {
            element.classList.add('lang-zh');
        } else if (/[\u3040-\u30ff]/.test(text)) {
            element.classList.add('lang-ja');
        } else if (isRTLText(text)) {
            element.classList.add('lang-rtl');
            heroHello?.classList.add('is-rtl');
        }

        typeText(text, element, () => {
            eraseText(element, () => {
                currentIndex = (currentIndex + 1) % texts.length;
                cycleText();
            });
        });
    }
    cycleText();
}

document.addEventListener('DOMContentLoaded', () => {
    startTypingAnimation();
});
