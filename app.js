/**
 * Ishchi AI - Frontend Logic
 */

const app = {
    // Current active section ID
    currentSection: 'landing-page',

    regionsData: {
        'tashkent_city': { name: 'Toshkent shahri', districts: ['Bektemir', 'Mirobod', 'Mirzo Ulug\'bek', 'Sergeli', 'Olmazor', 'Uchtepa', 'Shayxontohur', 'Yashnobod', 'Yunusobod', 'Yakkasaroy', 'Chilonzor'] },
        'tashkent': { name: 'Toshkent viloyati', districts: ['Sirdaryo', 'Yangiyo\'l', 'Chinoz', 'Zangiota', 'Qibray', 'Parkent', 'Bo\'stonliq', 'Ohangaron', 'Olmaliq', 'Angren', 'Chirchiq', 'Piskent', 'Bekobod'] },
        'andijan': { name: 'Andijon viloyati', districts: ['Andijon shahri', 'Andijon tumani', 'Asaka', 'Baliqchi', 'Buloqboshi', 'Bo\'z', 'Jalaquduq', 'Izboskan', 'Qo\'rg\'ontepa', 'Marhamat', 'Oltinko\'l', 'Paxtaobod', 'Ulug\'nor', 'Xo\'jaobod', 'Shahrixon'] },
        'bukhara': { name: 'Buxoro viloyati', districts: ['Buxoro shahri', 'Buxoro tumani', 'Vobkent', 'G\'ijduvon', 'Jondor', 'Kogon', 'Olot', 'Peshku', 'Romitan', 'Shofirkon', 'Qorovulbozor', 'Qorako\'l'] },
        'fergana': { name: 'Farg\'ona viloyati', districts: ['Farg\'ona shahri', 'Marg\'ilon', 'Qo\'qon', 'Beshariq', 'Bog\'dod', 'Buvayda', 'Dang\'ara', 'Farg\'ona tumani', 'Furqat', 'Oltiariq', 'Qo\'shtepa', 'Quva', 'Rishton', 'So\'x', 'Toshloq', 'Uchko\'prik', 'Yozyovon'] },
        'jizzakh': { name: 'Jizzax viloyati', districts: ['Jizzax shahri', 'Arnasoy', 'Baxmal', 'Do\'stlik', 'Forish', 'G\'allaorol', 'Mirzacho\'l', 'Paxtakor', 'Yangiobod', 'Zomin', 'Zafarobod', 'Zarbdor'] },
        'kashkadarya': { name: 'Qashqadaryo viloyati', districts: ['Qarshi', 'G\'uzor', 'Dehqonobod', 'Qamashi', 'Koson', 'Kitob', 'Mirishkor', 'Muborak', 'Nishon', 'Kasbi', 'Ko\'kdala', 'Chiroqchi', 'Shahrisabz', 'Yakkabog\''] },
        'khorezm': { name: 'Xorazm viloyati', districts: ['Urganch shahri', 'Urganch tumani', 'Bog\'ot', 'Gurlan', 'Xonqa', 'Hazorasp', 'Xiva', 'Qo\'shko\'pir', 'Shovot', 'Yangiariq', 'Yangibozor'] },
        'namangan': { name: 'Namangan viloyati', districts: ['Namangan shahri', 'Chortoq', 'Chust', 'Kosonsoy', 'Mingbuloq', 'Namangan tumani', 'Norin', 'Pop', 'To\'raqo\'rg\'on', 'Uchqo\'rg\'on', 'Uychi', 'Yangiqo\'rg\'on'] },
        'navoiy': { name: 'Navoiy viloyati', districts: ['Navoiy shahri', 'Zarafshon', 'Karmana', 'Kanimex', 'Navbahor', 'Nurota', 'Qiziltepa', 'Tomdi', 'Uchquduq', 'Xatirchi'] },
        'samarkand': { name: 'Samarqand viloyati', districts: ['Samarqand shahri', 'Kattaqo\'rg\'on', 'Bulung\'ur', 'Ishtixon', 'Jomboy', 'Narpay', 'Nurobod', 'Oqdaryo', 'Paxtachi', 'Payariq', 'Pastdarg\'om', 'Qo\'shrabot', 'Toyloq', 'Urgut'] },
        'sirdaryo': { name: 'Sirdaryo viloyati', districts: ['Guliston', 'Yangiyer', 'Shirin', 'Oqoltin', 'Boyovut', 'Guliston tumani', 'Xovos', 'Sirdaryo tumani', 'Sayxunobod', 'Mirzaobod'] },
        'surkhandarya': { name: 'Surxondaryo viloyati', districts: ['Termiz', 'Boysun', 'Angor', 'Denov', 'Jarqo\'rg\'on', 'Qiziriq', 'Qumqo\'rg\'on', 'Muzrabot', 'Oltinsoy', 'Sariosiyo', 'Sherobod', 'Sho\'rchi', 'Uzun', 'Bandixon'] },
        'karakalpakstan': { name: 'Qoraqalpog\'iston Respublikasi', districts: ['Nukus', 'Amudaryo', 'Beruniy', 'Chimboy', 'Ellikqal\'a', 'Kegeyli', 'Mo\'ynoq', 'Nukus tumani', 'Qonliko\'l', 'Qo\'ng\'irot', 'Shumanay', 'Taxtako\'pir', 'To\'rtko\'l', 'Xo\'jayli'] }
    },

    // Initialize App
    init() {
        this.bindEvents();
        this.populateRegions('worker-region');
        this.populateRegions('emp-region');
    },

    populateRegions(regionSelectId) {
        const regionSelect = document.getElementById(regionSelectId);
        if (!regionSelect) return;
        
        regionSelect.innerHTML = '<option value="" disabled selected>Viloyatni tanlang...</option>';
        for (const key in this.regionsData) {
            regionSelect.innerHTML += `<option value="${key}">${this.regionsData[key].name}</option>`;
        }
    },

    onRegionChange(regionSelectId, districtSelectId) {
        const regionSelect = document.getElementById(regionSelectId);
        const districtSelect = document.getElementById(districtSelectId);
        if (!regionSelect || !districtSelect) return;

        districtSelect.innerHTML = '<option value="" disabled selected>Tumanni tanlang...</option>';
        const regionKey = regionSelect.value;
        if (regionKey && this.regionsData[regionKey]) {
            this.regionsData[regionKey].districts.forEach(district => {
                districtSelect.innerHTML += `<option value="${district}">${district}</option>`;
            });
            districtSelect.disabled = false;
        } else {
            districtSelect.disabled = true;
        }
    },

    // Bind Global Events
    bindEvents() {
        // Landing Page logic
        const langSelect = document.getElementById('language-select');
        const startBtn = document.getElementById('start-btn');

        if (langSelect && startBtn) {
            langSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    startBtn.disabled = false;
                }
            });

            startBtn.addEventListener('click', () => {
                this.navigate('main-menu');
            });
        }
    },

    /**
     * SPA Navigation logic
     * @param {string} sectionId - ID of the section to show
     */
    navigate(sectionId) {
        const currentEl = document.getElementById(this.currentSection);
        const newEl = document.getElementById(sectionId);

        if (!newEl) {
            console.error(`Section [${sectionId}] not found in DOM`);
            return;
        }

        // Hide current
        if (currentEl) {
            currentEl.classList.remove('active');
            /* Small timeout to wait for CSS exit animations if we add them later */
            currentEl.classList.add('hidden');
        }

        // Show new
        newEl.classList.remove('hidden');
        // Force reflow to restart animations
        void newEl.offsetWidth;
        newEl.classList.add('active');

        this.currentSection = sectionId;

        // Process Hooks for dynamically populated sections
        if (sectionId === 'announcements-list') {
            this.renderAnnouncements();
        } else if (sectionId === 'worker-dashboard') {
            this.renderDashboardMatches();
        }

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Demo Data
    dummyAnnouncements: [
        { id: 1, type: 'service', title: 'Santexnik', region: 'urganch', regionLabel: 'Urganch shahar', price: 'Kelishilgan narxda', date: 'Bugun', contact: '+998 90 111 22 33' },
        { id: 2, type: 'service', title: 'Santexnik', region: 'urganch', regionLabel: 'Urganch shahar', price: 'Kelishilgan narxda', date: 'Bugun', contact: '+998 90 222 33 44' },
        { id: 3, type: 'service', title: 'Santexnik', region: 'shovot', regionLabel: 'Shovot tuman', price: 'Kelishilgan narxda', date: 'Bugun', contact: '+998 90 333 44 55' },
        { id: 4, type: 'service', title: 'Santexnik', region: 'gurlan', regionLabel: 'Gurlan tuman', price: 'Kelishilgan narxda', date: 'Bugun', contact: '+998 90 444 55 66' },
        { id: 5, type: 'job', title: 'Kunlik ishchi kerak', region: 'shovot', regionLabel: 'Shovot tuman', price: '100,000 so\'m/kun', date: 'Bugun', contact: '+998 90 555 66 77' },
        { id: 6, type: 'job', title: 'Yuk tushuruvchi kerak', region: 'shovot', regionLabel: 'Shovot tuman', price: '120,000 so\'m', date: 'Bugun', contact: '+998 90 666 77 88' },
        { id: 7, type: 'service', title: 'Elektrik', region: 'shovot', regionLabel: 'Shovot tuman', price: 'Kelishilgan narxda', date: 'Bugun', contact: '+998 90 777 88 99' },
        { id: 8, type: 'job', title: 'Kunlik ishchi', region: 'shovot', regionLabel: 'Shovot tuman', price: '100,000 so\'m/kun', date: 'Bugun', contact: '+998 90 888 99 00' },
        { id: 9, type: 'job', title: 'Kunlik ishchi', region: 'shovot', regionLabel: 'Shovot tuman', price: '100,000 so\'m/kun', date: 'Bugun', contact: '+998 90 999 00 11' },
        { id: 10, type: 'job', title: 'Kunlik Ishchi', region: 'urganch', regionLabel: 'Urganch shahar', price: '100,000 so\'m/kun', date: 'Bugun', contact: '+998 90 000 11 22' }
    ],

    renderAnnouncements(filterRegion = '', filterType = '', filterPrice = '', filterDate = '') {
        const container = document.getElementById('announcements-container');
        if (!container) return;

        container.innerHTML = '';
        container.className = 'card-grid col-2';

        let filtered = this.dummyAnnouncements.filter(ad => {
            const matchRegion = filterRegion ? ad.region === filterRegion : true;
            const matchType = filterType ? ad.type === filterType : true;
            return matchRegion && matchType;
        });

        // Mock Sorting
        if (filterPrice === 'asc') {
            filtered.sort((a, b) => parseInt(a.price.replace(/\D/g, '') || 0) - parseInt(b.price.replace(/\D/g, '') || 0));
        } else if (filterPrice === 'desc') {
            filtered.sort((a, b) => parseInt(b.price.replace(/\D/g, '') || 0) - parseInt(a.price.replace(/\D/g, '') || 0));
        }

        if (filterDate === 'oldest') {
            filtered.reverse(); // Just a simple mock for oldest
        }

        if (filtered.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Ushbu filtrlarga mos e\'lonlar topilmadi.</div>';
            return;
        }

        filtered.forEach(ad => {
            const badgeMap = { job: 'Ish / Vakansiya', service: 'Xizmat Taklifi', material: 'Qurilish Moli' };
            const typeStr = badgeMap[ad.type];
            const isPriority = ad.type === 'service'; // Mock AI priority for services
            const html = `
                <div class="ad-card" onclick="app.navigate('worker-profile')">
                    <span class="ad-badge ${ad.type}">${typeStr}</span>
                    <h3 class="ad-title">${ad.title}</h3>
                    <div class="ad-detail"><i class="fa-solid fa-location-dot"></i> ${ad.regionLabel}</div>
                    <div class="ad-detail"><i class="fa-regular fa-calendar"></i> ${ad.date}</div>
                    ${ad.store ? `<div class="ad-detail"><i class="fa-solid fa-shop"></i> ${ad.store}</div>` : ''}
                    <div class="ad-price">${ad.price}</div>
                    <button class="btn btn-primary" style="${isPriority ? 'background: linear-gradient(135deg, var(--secondary-color), #8b5cf6); border-color: transparent;' : ''}" onclick="event.stopPropagation(); alert('Telefon: ${ad.contact}')">
                        <i class="fa-solid ${isPriority ? 'fa-bolt' : 'fa-phone'}"></i> ${isPriority ? "Bog'lanish (AI Ustuvor)" : "Bog'lanish"}
                    </button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    },

    renderDashboardMatches() {
        const container = document.getElementById('ai-matches-container');
        if (!container) return;

        container.innerHTML = '';

        const matches = [
            { id: 1, type: 'Santexnik', region: 'Urganch shahar', distance: '3.2 km', time: '10 min ago', match: 87 },
            { id: 2, type: 'Santexnik', region: 'Urganch shahar', distance: '3.2 km', time: '1 h ago', match: 88 },
            { id: 3, type: 'Santexnik', region: 'Shovot tuman', distance: '1.1 km', time: 'Today', match: 85 },
            { id: 4, type: 'Santexnik', region: 'Gurlan tuman', distance: '1.7 km', time: '2 hrs ago', match: 79 },
            { id: 5, type: 'Kunlik ishchi kerak', region: 'Shovot tuman', distance: '1.1 km', time: '3 hrs ago', match: 80 },
            { id: 6, type: 'Yuk tushuruvchi kerak', region: 'Shovot tuman', distance: '1.1 km', time: '3 hrs ago', match: 80 },
            { id: 7, type: 'Elektrik', region: 'Shovot tuman', distance: '1.7 km', time: '4 h ago', match: 75 },
            { id: 8, type: 'Kunlik ishchi', region: 'Shovot tuman', distance: '1.7 km', time: '2 hrs ago', match: 72 },
            { id: 9, type: 'Kunlik ishchi', region: 'Shovot tuman', distance: '1.7 km', time: '3 hrs ago', match: 50 },
            { id: 10, type: 'Kunlik Ishchi', region: 'Urganch shahar', distance: '1.7 km', time: '1 hrs ago', match: 40 },
        ];

        matches.forEach(m => {
            const html = `
                <div class="match-card" id="match-${m.id}">
                    <img src="./images/plumber.png" style="width:50px; height:50px; min-width: 50px;">
                    <div class="match-info">
                        <h4>${m.type}</h4>
                        <div class="match-meta">
                            ${m.region} &middot; <i class="fa-solid fa-location-dot" style="margin:0 2px;"></i>${m.distance} &middot; <i class="fa-solid fa-clock" style="margin:0 2px; font-size: 0.6rem;"></i>${m.time}
                        </div>
                        <div class="match-badge">
                            <i class="fa-solid fa-robot" style="color: #166534;"></i> AI Match ${m.match}%
                        </div>
                    </div>
                    <div class="match-actions">
                        <button class="btn-accept" onclick="app.acceptMatch(${m.id})">Qabul qilish <i class="fa-solid fa-chevron-right" style="font-size: 0.6rem;"></i></button>
                        <button class="btn-reject" onclick="app.rejectMatch(${m.id})">Rad etish</button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    },

    acceptMatch(id) {
        alert("Ish muvaffaqiyatli qabul qilindi! Buyurtmachi bilan bog'lanish uchun raqam berildi.");
        const card = document.getElementById('match-' + id);
        if (card) {
            card.style.transition = 'all 0.3s ease-out';
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
            setTimeout(() => card.remove(), 300);
        }
    },

    rejectMatch(id) {
        const card = document.getElementById('match-' + id);
        if (card) {
            card.style.transition = 'all 0.3s ease-out';
            card.style.transform = 'translateX(-100%)';
            card.style.opacity = '0';
            setTimeout(() => card.remove(), 300);
        }
    },

    applyFilters() {
        const reg = document.getElementById('filter-region')?.value || '';
        const typ = document.getElementById('filter-type')?.value || '';
        const price = document.getElementById('filter-price')?.value || '';
        const date = document.getElementById('filter-date')?.value || '';
        this.renderAnnouncements(reg, typ, price, date);
    },

    switchTab(tabId) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

        // Show selected
        const selectedTab = document.getElementById(`tab-${tabId}`);
        if (selectedTab) selectedTab.classList.remove('hidden');

        const btn = document.querySelector(`.tab-btn[onclick="app.switchTab('${tabId}')"]`);
        if (btn) btn.classList.add('active');
    },

    submitMock(msg) {
        alert(msg);
        // Clear all form inputs in active tab
        const activeTab = document.querySelector('.tab-content:not(.hidden) form');
        if (activeTab) activeTab.reset();

        this.navigate('announcements-menu');
    },

    submitReview() {
        alert("Fikringiz uchun rahmat!");
        document.getElementById('review-form').reset();
    },

    /**
     * Form Steps Logic
     */
    workerNextStep() {
        const fname = document.getElementById('worker-fname').value;
        const lname = document.getElementById('worker-lname').value;
        const phone = document.getElementById('worker-phone').value;
        const region = document.getElementById('worker-region').value;
        const district = document.getElementById('worker-district').value;

        if (!fname || !lname || !phone || !region || !district) {
            alert("Iltimos, barcha maydonlarni to'ldiring.");
            return;
        }

        document.getElementById('worker-step-1').classList.add('hidden');
        document.getElementById('worker-step-2').classList.remove('hidden');

        document.getElementById('worker-step-1-indicator').classList.remove('active');
        document.getElementById('worker-step-2-indicator').classList.add('active');
    },

    workerPrevStep() {
        document.getElementById('worker-step-2').classList.add('hidden');
        document.getElementById('worker-step-1').classList.remove('hidden');

        document.getElementById('worker-step-2-indicator').classList.remove('active');
        document.getElementById('worker-step-1-indicator').classList.add('active');
    },

    onSkillChange() {
        const skillSelect = document.getElementById('worker-skill');
        const otherInput = document.getElementById('worker-skill-other');
        
        if (skillSelect && otherInput) {
            if (skillSelect.value === 'boshqa') {
                otherInput.classList.remove('hidden');
                otherInput.required = true;
            } else {
                otherInput.classList.add('hidden');
                otherInput.required = false;
                otherInput.value = '';
            }
        }
    },

    submitWorker() {
        const skillSelect = document.getElementById('worker-skill');
        let skill = skillSelect ? skillSelect.value : '';
        if (skill === 'boshqa') {
            skill = document.getElementById('worker-skill-other').value;
        }

        const exp = document.getElementById('worker-experience').value;

        if (!skill || !exp) {
            alert("Iltimos, kasbingiz va tajribangizni kiriting.");
            return;
        }

        // Mock success
        alert("Shaxsiy ma'lumotlar muvaffaqiyatli saqlandi!");
        // Reset form
        document.getElementById('worker-form').reset();
        this.workerPrevStep();
        this.navigate('worker-dashboard');
    },

    submitEmployer() {
        const phone = document.getElementById('emp-phone').value;
        const region = document.getElementById('emp-region').value;
        const district = document.getElementById('emp-district').value;
        const job = document.getElementById('emp-job-type').value;
        const payment = document.getElementById('emp-payment').value;

        if (!phone || !region || !district || !job || !payment) {
            alert("Barcha qatorlarni to'ldiring.");
            return;
        }

        // Mock success
        alert("Ish e'loni muvaffaqiyatli yuborildi!");
        document.getElementById('employer-job-form').reset();
        this.navigate('main-menu');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
