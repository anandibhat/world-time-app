const cities = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Chicago', timezone: 'America/Chicago' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai' },
    { name: 'Seoul', timezone: 'Asia/Seoul' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Amsterdam', timezone: 'Europe/Amsterdam' },
    { name: 'Rome', timezone: 'Europe/Rome' },
    { name: 'Madrid', timezone: 'Europe/Madrid' },
    { name: 'Zurich', timezone: 'Europe/Zurich' },
    { name: 'Vancouver', timezone: 'America/Vancouver' },
    { name: 'Auckland', timezone: 'Pacific/Auckland' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
    { name: 'Tel Aviv', timezone: 'Asia/Tel_Aviv' }
];

let activeCities = [];

function initializeApp() {
    populateTimezoneSelects();
    loadActiveCities();
    setupEventListeners();
    setInterval(updateClocks, 1000);
    updateClocks();
    setDefaultConverterTime();
}

function populateTimezoneSelects() {
    const fromSelect = document.getElementById('fromTimezone');
    const toSelect = document.getElementById('toTimezone');

    cities.forEach(city => {
        const option1 = new Option(`${city.name} (${city.timezone})`, city.timezone);
        const option2 = new Option(`${city.name} (${city.timezone})`, city.timezone);
        fromSelect.add(option1);
        toSelect.add(option2);
    });

    fromSelect.value = 'America/New_York';
    toSelect.value = 'Europe/London';
}

function loadActiveCities() {
    const saved = localStorage.getItem('activeCities');
    if (saved) {
        activeCities = JSON.parse(saved);
    } else {
        activeCities = [
            cities.find(c => c.timezone === 'America/New_York'),
            cities.find(c => c.timezone === 'Europe/London'),
            cities.find(c => c.timezone === 'Asia/Tokyo')
        ];
        saveActiveCities();
    }
    renderClocks();
}

function saveActiveCities() {
    localStorage.setItem('activeCities', JSON.stringify(activeCities));
}

function setupEventListeners() {
    document.getElementById('fromTime').addEventListener('change', convertTime);
    document.getElementById('fromTimezone').addEventListener('change', convertTime);
    document.getElementById('toTimezone').addEventListener('change', convertTime);
    document.getElementById('addCityBtn').addEventListener('click', showSearchResults);
    document.getElementById('citySearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') showSearchResults();
    });
}

function setDefaultConverterTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
    document.getElementById('fromTime').value = localISOTime;
    convertTime();
}

function convertTime() {
    const fromTimezone = document.getElementById('fromTimezone').value;
    const toTimezone = document.getElementById('toTimezone').value;
    const fromTimeStr = document.getElementById('fromTime').value;

    if (!fromTimeStr) return;

    const fromDate = new Date(fromTimeStr);

    const fromFormatted = fromDate.toLocaleString('en-US', { timeZone: fromTimezone });
    const fromTime = new Date(fromFormatted);

    const toFormatted = fromTime.toLocaleString('en-US', { timeZone: toTimezone });
    const toDate = new Date(toFormatted);

    const offset = toDate.getTimezoneOffset() * 60000;
    const localISOTime = new Date(toDate - offset).toISOString().slice(0, 16);

    document.getElementById('toTime').value = localISOTime;
}

function updateClocks() {
    const container = document.getElementById('clocksContainer');
    container.innerHTML = '';

    activeCities.forEach((city, index) => {
        const clockCard = createClockCard(city, index);
        container.appendChild(clockCard);
    });
}

function createClockCard(city, index) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        timeZone: city.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateString = now.toLocaleDateString('en-US', {
        timeZone: city.timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <button class="remove-btn" onclick="removeCity(${index})">×</button>
        <h3>${city.name}</h3>
        <div class="timezone">${city.timezone}</div>
        <div class="time">${timeString}</div>
        <div class="date">${dateString}</div>
    `;

    return card;
}

function showSearchResults() {
    const searchTerm = document.getElementById('citySearch').value.toLowerCase();

    if (!searchTerm) {
        alert('Please enter a city name to search');
        return;
    }

    const results = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm) ||
        city.timezone.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        alert('No cities found matching your search');
        return;
    }

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay active';
    overlay.onclick = closeSearchResults;

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = `
        <button class="close-btn" onclick="closeSearchResults()">×</button>
        <h3>Select a City</h3>
        <ul>
            ${results.map(city => `
                <li onclick="addCity('${city.timezone}')">
                    ${city.name} - ${city.timezone}
                </li>
            `).join('')}
        </ul>
    `;

    document.body.appendChild(overlay);
    resultsDiv.classList.add('active');
}

function closeSearchResults() {
    const overlay = document.querySelector('.overlay');
    if (overlay) overlay.remove();

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.classList.remove('active');
    document.getElementById('citySearch').value = '';
}

function addCity(timezone) {
    const city = cities.find(c => c.timezone === timezone);

    if (activeCities.some(c => c.timezone === timezone)) {
        alert('This city is already in your list');
        closeSearchResults();
        return;
    }

    activeCities.push(city);
    saveActiveCities();
    renderClocks();
    closeSearchResults();
}

function removeCity(index) {
    if (confirm('Remove this city from your clocks?')) {
        activeCities.splice(index, 1);
        saveActiveCities();
        renderClocks();
    }
}

function renderClocks() {
    updateClocks();
}

document.addEventListener('DOMContentLoaded', initializeApp);
