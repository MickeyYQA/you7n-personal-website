const texts = [
    { text: "Hello", lang: "[həˈləʊ], English" },
    { text: "你好", lang: "[ni˨˩˦.xɑʊ˨˩˦], Chinese" },
    { text: "Guten Tag", lang: "[ɡuːtn taːk]German" },
    { text: "Hola", lang: "['ola], Spanish" },
    { text: "Bonjour", lang: "[bɔ̃ʒuʀ], French" },
    { text: "Salve", lang: "['salʋe], Latin" },
    { text: "こんにちは", lang: "konnichiwa, [ko̞nˈni̥tɕiwa], Japanese" },
    { text: "안녕하세요", lang: "annyeonghaseyo, [a̠n.njʌ̹ŋ.ha̠.se̞.jo̞], Korean" },
    { text: "ئامانمۇسىز", lang: "amanmusiz, [ɑː.mɑn.muː.sɯz], Uyghur" },
    { text: "Привет", lang: "privet, [prʲɪˈvʲet], Russian" },
    { text: "Molo", lang: "[ˈmɔːlo], isiXhosa" },
    { text: "مرحبا", lang: "marhaban, [marḥabā], Arabic" },
    { text: "Olá", lang: " [oˈla], Portuguese" },
    { text: "Ciao", lang: "/tʃao/, Italian" },
    { text: "Goedendag", lang: "[ˈɣudə(n)dɑx], Dutch" },
    { text: "नमस्ते", lang: "namaste, [nəˈməs̪te̞], Hindi" },
    { text: "Γεια σας", lang: "geia sas, [ʝaˈsas], Greek" },
    { text: "ᐊᐃᓐᖓᐃ", lang: "aingna, [ɑːiŋŋɑːi], Inuktitut" },
    { text: "ᎣᏏᏲ", lang: "osiyo, [oːsijo], Cherokee" },
    { text: "გამარჯობა", lang: "gamarjoba, [ɡɑ.mɑr.dʒoˈbɑ], Georgian" },
    { text: "Բարև", lang: "barev, [bɑˈɾɛv], Armenian" },
    { text: "Xin chào", lang: "[sin t͡ɕa̤w], Vietnamese" },
    { text: "העלא", lang: "hala, [haˈʕɑ], Hebrew" },
    { text: "สวัสดี", lang: "sawatdee, [sa.wát.dīː], Thai" },
    { text: "Góðan dag", lang: "[ˈkouːðanˌtɑːɣ], Icelandic" },
    { text: "Merhaba", lang: "[ˈmɛɾhaba], Turkish" },
    { text: "བཀྲ་ཤིས་བདེ་ལེགས།", lang: "Tashi Delek, [ˈtʂʰaʃi ˈdeːleɡ], Tibetan" },
    { text: "Ciallo~(∠·ω< )⌒★", lang: "[t͡ɕɑ̈˦.lo̞˨˧]" }
];

let currentIndex = 0;
const typingSpeed = 200; // Typing speed in milliseconds
const eraseSpeed = 100; // Erase speed in milliseconds
const delayBetweenTexts = 2000; // Delay between texts in milliseconds

function typeText(text, element, callback) {
    let index = 0;
    element.style.animation = `typing ${text.length * typingSpeed}ms steps(${text.length}, end), blink 0.5s step-end infinite`; // Set animation dynamically
    
    // Display the language as soon as typing starts
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

    function cycleText() {
        const { text, lang } = texts[currentIndex];

        // Clear previous text and language
        element.textContent = '';
        langContainer.textContent = '';

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

    // Ensure the modal and overlay are hidden on load
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

// Modal functionality
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const container = document.querySelector('.container');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    overlay.style.display = 'block';
    container.classList.add('blurred-background');
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    container.classList.remove('blurred-background');
});

overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    container.classList.remove('blurred-background');
});
