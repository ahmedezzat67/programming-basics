// ==================== تأثير الكتابة الآلية على العنوان ====================
const titleText = "أهلاً بك في رحلتك إلى عالم البرمجة والذكاء الاصطناعي 🚀";
const titleElement = document.getElementById("mainTitle");
let index = 0;

// إنشاء الصوت مع معالجة الأخطاء
let typingSound;
try {
    typingSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_2d7b05cc59.mp3?filename=typing-sound-1-103198.mp3");
} catch (err) {
    console.warn("⚠️ لم يتم تحميل الصوت، سيتم تشغيل التأثير بدون صوت.");
    typingSound = null;
}

function typeWriter() {
    if (index < titleText.length) {
        titleElement.textContent += titleText.charAt(index);
        if (typingSound) {
            try {
                typingSound.currentTime = 0;
                typingSound.play().catch(() => {}); // يتجاهل الخطأ لو الصوت مش متاح
            } catch (err) {}
        }
        index++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = typeWriter;

// ==================== حركة التمرير السلس ====================
document.getElementById('startButton').addEventListener('click', function () {
    document.querySelector('.definition-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// ==================== ظهور الأقسام تدريجيًا عند التمرير ====================
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('fade-in');
        }
    });
});

// ==================== مختبر المتغيرات التفاعلي ====================
function createVariable() {
    const type = document.getElementById('dataTypeSelect').value;
    const input = document.getElementById('variableInput').value.trim();
    const outputDiv = document.getElementById('variableOutput');
    let displayCode = '';
    let description = '';

    outputDiv.innerHTML = '<p style="color: #fff;">⏳ جاري التخزين والمعالجة...</p>';

    setTimeout(() => {
        if (type === 'string') {
            const finalValue = input || 'نص افتراضي';
            displayCode = `let myVariable = "${finalValue}";\n// النوع: String (نص)`;
            description = `📦 <strong>myVariable</strong> يحمل الآن نص: <strong>${finalValue}</strong>.`;
        } 
        else if (type === 'number') {
            const numValue = parseFloat(input) || 0;
            if (input.includes('.') || input.includes(',')) {
                displayCode = `let myVariable = ${numValue};\n// النوع: Float (عشري)`;
                description = `🔢 المتغير يحتوي رقم عشري: <strong>${numValue}</strong>.`;
            } else {
                displayCode = `let myVariable = ${parseInt(input) || 0};\n// النوع: Integer (صحيح)`;
                description = `🔢 المتغير يحتوي رقم صحيح: <strong>${parseInt(input) || 0}</strong>.`;
            }
        } 
        else if (type === 'boolean') {
            const boolValue = (input.toLowerCase() === 'true' || input === '1');
            displayCode = `let myVariable = ${boolValue};\n// النوع: Boolean (منطقي)`;
            description = `⚙️ المتغير يحتوي قيمة منطقية: <strong>${boolValue ? 'True' : 'False'}</strong>.`;
        }

        outputDiv.innerHTML = `
            <pre>${displayCode}</pre>
            <p style="color: #cce7ff;">${description}</p>
        `;
    }, 700);
}

document.addEventListener('DOMContentLoaded', createVariable);
