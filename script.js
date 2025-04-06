const content = {
    pillars: `<h2>The Five Pillars of Islam</h2><ul><li>Shahada - Faith</li><li>Salah - Prayer</li><li>Zakat - Charity</li><li>Sawm - Fasting</li><li>Hajj - Pilgrimage</li></ul>`,
    quran: `<h2>About the Quran</h2><p>The Quran is the holy book of Islam. It was revealed to the Prophet Muhammad (peace be upon him) over 23 years. It has 114 chapters (surahs).</p>`,
    prayers: `<h2>The Five Daily Prayers</h2><p>They are: Fajr, Dhuhr, Asr, Maghrib, and Isha. Each prayer has a specific time and number of rakats (units).</p>`
};

function showContent(topic) {
    const section = document.getElementById("contentSection");
    section.innerHTML = content[topic];
}