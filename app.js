/**
 * Ishchi AI - Frontend Logic
 */

const app = {
    // Current active section ID
    currentSection: 'landing-page',

    // Initialize App
    init() {
        this.bindEvents();
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
        { id: 1, type: 'job', title: 'Qurilish uchun 3 ta ishchi kerak', region: 'tashkent', regionLabel: 'Toshkent', price: '150,000 so\'m/kun', date: 'Bugun', contact: '+998 90 111 22 33' },
        { id: 2, type: 'service', title: 'Professional Santexnik chqirish', region: 'samarkand', regionLabel: 'Samarqand', price: 'Kelishilgan narxda', date: 'Kecha', contact: '+998 90 444 55 66' },
        { id: 3, type: 'material', title: 'Sement 500 marka - Arzon narxda', region: 'fergana', regionLabel: 'Farg\'ona', price: '45,000 so\'m/qop', date: 'Bugun', contact: '+998 90 777 88 99', store: "Umid Qurilish" },
        { id: 4, type: 'job', title: 'Toshkent elitniy remont uchun ustalar', region: 'tashkent', regionLabel: 'Toshkent', price: '300,000 so\'m/kun', date: '2 kun oldin', contact: '+998 90 555 44 33' },
        { id: 5, type: 'service', title: 'Elektr montaj ishlari', region: 'andijan', regionLabel: 'Andijon', price: 'Shartnoma asosida', date: 'Bugun', contact: '+998 90 333 22 11' },
        { id: 6, type: 'job', title: 'Hovli tozalash uchun yordamchi kerak', region: 'samarkand', regionLabel: 'Samarqand', price: '100,000 so\'m', date: '3 soat oldin', contact: '+998 93 123 45 67' },
        { id: 7, type: 'material', title: 'Pishgan g\'isht (dostavka ichida)', region: 'tashkent', regionLabel: 'Toshkent', price: '900 so\'m/dona', date: 'Kecha', contact: '+998 99 888 77 66', store: "Stroy Market" },
        { id: 8, type: 'job', title: 'Yuk tashish xizmati uchun mardikor', region: 'fergana', regionLabel: 'Farg\'ona', price: '120,000 so\'m/kun', date: 'Bugun', contact: '+998 91 555 66 77' },
        { id: 9, type: 'service', title: 'Kafel terish ustasi (kafelchi)', region: 'tashkent', regionLabel: 'Toshkent', price: '50,000 so\'m/kv', date: '4 kun oldin', contact: '+998 97 999 00 11' },
        { id: 10, type: 'job', title: 'Bog\'bon kerak (daraxtlarni kesish)', region: 'andijan', regionLabel: 'Andijon', price: '200,000 so\'m', date: 'Bugun', contact: '+998 94 444 33 22' }
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
            { id: 1, type: 'Santexnik', region: 'Toshkent Shahri', distance: '2.1 km', time: '10 min ago', match: 87 },
            { id: 2, type: 'Santexnik', region: 'Toshkent Shahri', distance: '1.9 km', time: '1 h ago', match: 88 },
            { id: 3, type: 'Santexnik', region: "Mirzo Ulug'bek", distance: '3.2 km', time: 'Today', match: 85 },
            { id: 4, type: 'Santexnik', region: 'Toshkent Shahri', distance: '4.0 km', time: '2 hrs ago', match: 79 },
            { id: 5, type: 'Santexnik', region: 'Toshkent Shahri', distance: '5.3 km', time: '3 hrs ago', match: 80 },
            { id: 6, type: 'Santexnik', region: 'Toshkent Shahri', distance: '5.3 km', time: '3 hrs ago', match: 80 }
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

        if (!fname || !lname || !phone || !region) {
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

    submitWorker() {
        const skill = document.getElementById('worker-skill').value;
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
        this.navigate('main-menu');
    },

    submitEmployer() {
        const phone = document.getElementById('emp-phone').value;
        const region = document.getElementById('emp-region').value;
        const job = document.getElementById('emp-job-type').value;
        const payment = document.getElementById('emp-payment').value;

        if (!phone || !region || !job || !payment) {
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
