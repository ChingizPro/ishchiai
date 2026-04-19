/**
 * Ishchi AI - Frontend Logic
 */

const app = {
    currentSection: 'landing-page',
    workerProfile: null,
    currentLang: 'uz',
    originalTexts: new Map(),

    translations: {
        "Ishchi AI": { ru: "Рабочий ИИ", en: "Worker AI" },
        "Xush kelibsiz": { ru: "Добро пожаловать", en: "Welcome" },
        "Tilni tanlang / Выберите язык / Select language": { ru: "Выберите язык / Select language", en: "Select language" },
        "Boshlash": { ru: "Начать ", en: "Start " },
        "Asosiy Menyu": { ru: "Главное меню", en: "Main Menu" },
        "Sizga qanday yordam bera olamiz?": { ru: "Чем мы можем помочь?", en: "How can we help you?" },
        "Ishchi va Usta": { ru: "Рабочий и Мастер", en: "Worker & Craftsman" },
        "O'z xizmatlaringizni taklif qiling": { ru: "Предложите свои услуги", en: "Offer your services" },
        "Ish beruvchi": { ru: "Работодатель", en: "Employer" },
        "Ishchi yoki usta qidiring": { ru: "Найдите рабочего или мастера", en: "Find a worker or craftsman" },
        "E'lonlar": { ru: "Объявления", en: "Ads" },
        "Barcha e'lonlar va bozorni ko'rish": { ru: "Смотреть все объявления", en: "View all ads" },
        "Orqaga": { ru: "Назад", en: "Back" },
        "Ishchi / Usta": { ru: "Рабочий / Мастер", en: "Worker / Craftsman" },
        "Ro'yxatdan o'tish uchun ma'lumotlarni kiriting": { ru: "Введите данные для регистрации", en: "Enter registration details" },
        "1. Shaxsiy ma'lumotlar": { ru: "1. Личные данные", en: "1. Personal Info" },
        "2. Kasb va malaka": { ru: "2. Профессия и навыки", en: "2. Profession & Skills" },
        "Ism": { ru: "Имя", en: "First Name" },
        "Familiya": { ru: "Фамилия", en: "Last Name" },
        "Viloyat": { ru: "Область", en: "Region" },
        "Tuman / Shahar": { ru: "Район / Город", en: "District / City" },
        "Telefon raqam": { ru: "Номер телефона", en: "Phone Number" },
        "Keyingisi": { ru: "Далее ", en: "Next " },
        "Kasb / Ish turi": { ru: "Профессия / Тип работы", en: "Profession / Job Type" },
        "Tajriba (yil)": { ru: "Опыт (лет)", en: "Experience (years)" },
        "Yuborish": { ru: "Отправить ", en: "Submit " },
        "Ishchi izlash uchun e'lon bering": { ru: "Подайте объявление", en: "Publish an ad" },
        "Ish turi": { ru: "Тип работы", en: "Job Type" },
        "Maosh / To'lov (so'm)": { ru: "Зарплата / Оплата (сум)", en: "Salary (UZS)" },
        "Ish e'lonini yuborish": { ru: "Отправить объявление ", en: "Submit Ad " },
        "AI Qanday Ishlaydi?": { ru: "Как работает ИИ?", en: "How AI Works?" },
        "Ishchi AI aqlli tizimi jarayoni": { ru: "Процесс умной системы Рабочий ИИ", en: "Worker AI smart system process" },
        "E'lon qoldiradi": { ru: "Оставляет объявление", en: "Leaves an ad" },
        "AI Tizim": { ru: "ИИ Система", en: "AI System" },
        "Tahlil qiladi va moslaydi": { ru: "Анализирует и подбирает", en: "Analyzes and matches" },
        "Ishchi": { ru: "Рабочий", en: "Worker" },
        "Bildirishnoma oladi": { ru: "Получает уведомление", en: "Receives notification" },
        "Aloqa": { ru: "Связь", en: "Contact" },
        "Bog'lanishadi": { ru: "Связываются", en: "They connect" },
        "E'lonlar Bo'limi": { ru: "Раздел объявлений", en: "Ads Section" },
        "Kerakli bo'limni tanlang": { ru: "Выберите нужный раздел", en: "Select section" },
        "E'lonlarni ko'rish": { ru: "Смотреть объявления", en: "View Ads" },
        "Barcha e'lonlar va xizmatlar": { ru: "Все объявления и услуги", en: "All ads and services" },
        "E'lon joylash": { ru: "Подать объявление", en: "Post an Ad" },
        "Yangi e'lon joylash": { ru: "Разместить новое объявление", en: "Place a new ad" },
        "Filtrlar": { ru: "Фильтры", en: "Filters" },
        "Filtrlash": { ru: "Отфильтровать", en: "Filter" },
        "Yangi E'lon": { ru: "Новое объявление", en: "New Announcement" },
        "Ishga e'lon berish": { ru: "Дать объявление о работе", en: "Post a job ad" },
        "Xizmatlarni taklif qilish": { ru: "Предложить услуги", en: "Offer services" },
        "Qurilish mollari": { ru: "Строительные материалы", en: "Construction materials" },
        "Ism, familiya": { ru: "Имя, фамилия", en: "Full name" },
        "Hudud": { ru: "Регион", en: "Region" },
        "Ish narxi": { ru: "Цена работы", en: "Job price" },
        "AI Tavsiyasi:": { ru: "Рекомендация ИИ:", en: "AI Recommendation:" },
        "E'lon joylangandan so'ng, AI tizimi mos ishchilarga xabar yuboradi. Eng yaqin va mos ishchilar e'londan xabardor bo'ladi.": { ru: "После размещения объявления ИИ уведомит подходящих рабочих.", en: "AI will notify suitable workers after posting." },
        "E'lonni joylash": { ru: "Разместить объявление", en: "Post Ad" },
        "Xizmatni joylash": { ru: "Разместить услугу", en: "Post Service" },
        "Ish turi / qila oladigan xizmat": { ru: "Тип работы / услуга", en: "Job Type / Service offered" },
        "Ushbu e'lonlar mijozlar tomonidan ko'riladi va AI tavsiyasi orqali ustuvorlik bilan chiqadi.": { ru: "Эти объявления рассматриваются клиентами в приоритете.", en: "These ads are prioritized for clients." },
        "Do'kon nomi yoki egasining ismi": { ru: "Название магазина или имя владельца", en: "Store/owner name" },
        "Mahsulot nomi": { ru: "Название товара", en: "Product name" },
        "Mahsulot rasmi": { ru: "Фото товара", en: "Product image" },
        "Mahsulot narxi": { ru: "Цена товара", en: "Product price" },
        "Yetkazib berish narxi (dastavka)": { ru: "Стоимость доставки", en: "Delivery cost" },
        "Eslatma:": { ru: "Примечание:", en: "Note:" },
        "Qurilish mollari onlayn ko'rinadi. Xaridor siz bilan bevosita bog'lanadi.": { ru: "Моллы видны онлайн. Покупатель свяжется с вами.", en: "Materials appear online. Buyers will contact you." },
        "Mahsulotni joylash": { ru: "Разместить товар", en: "Post Product" },
        "G'isht teruvchi va ustasi": { ru: "Каменщик и мастер", en: "Bricklayer" },
        "Samarqand viloyati": { ru: "Самаркандская область", en: "Samarkand region" },
        "(24 ta sharh)": { ru: "(24 отзыва)", en: "(24 reviews)" },
        "Sharhlar": { ru: "Отзывы", en: "Reviews" },
        "Sharh qoldirish": { ru: "Оставить отзыв", en: "Leave a review" },
        "Ismingiz": { ru: "Ваше имя", en: "Your name" },
        "Baho (1-5)": { ru: "Оценка (1-5)", en: "Rating (1-5)" },
        "Fikringiz": { ru: "Ваш отзыв", en: "Your feedback" },
        "Sharhni yuborish": { ru: "Отправить отзыв ", en: "Submit review " },
        "Ishchi Profili": { ru: "Профиль рабочего", en: "Worker Profile" },
        "Yopish": { ru: "Закрыть", en: "Close" },
        "Tajriba:": { ru: "Опыт:", en: "Experience:" },
        "Sizga mos ishlar bor:": { ru: "Вы подходяте:", en: "Matches found:" },
        "Sizga mos ishlar bor": { ru: "Есть подходящая работа", en: "Matches available" },
        "AI sizga mos ishlar": { ru: "ИИ подходящие вам работы", en: "AI matches" },
        "Tanlang...": { ru: "Выберите...", en: "Select..." },
        "Viloyatni tanlang...": { ru: "Выберите область...", en: "Select region..." },
        "Avval viloyatni tanlang": { ru: "Сначала выберите область", en: "Select region first" },
        "Kasbingizni tanlang...": { ru: "Выберите профессию...", en: "Select profession..." },
        "O'zbekcha": { ru: "Узбекский", en: "Uzbek" },
        "Familiyangiz": { ru: "Ваша фамилия", en: "Your surname" },
        "Kasbingizni yozing...": { ru: "Напишите профессию...", en: "Write your profession..." },
        "Masalan: Uy ta'miri, Yuk tashish...": { ru: "Например: Ремонт, Перевозка...", en: "E.g.: Repair, Moving..." },
        "masalan: santexnik, yuk tashuvchi": { ru: "например: сантехник", en: "e.g.: plumber" },
        "kelishilgan yoki aniq summa": { ru: "договорная сумма", en: "negotiable amount" },
        "masalan: elektrik, santexnik, bo'yoqchi": { ru: "например: электрик, сантехник", en: "e.g.: electrician, plumber" },
        "Kimdanligini bildiring": { ru: "Укажите от кого", en: "Specify who from" },
        "Fikringizni shu yerga yozing...": { ru: "Напишите ваш отзыв здесь...", en: "Write feedback here..." }
    },

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

    // Skill keyword map: form value -> keywords to match job titles
    skillKeywordMap: {
        'santexnik':     ['santexnik'],
        'elektrik':      ['elektrik'],
        'usta':          ['usta', 'qurilish', 'g\'isht', 'suvoq'],
        'kunlik_ishchi': ['kunlik ishchi'],
        'yuk_tashuvchi': ['yuk tashuvchi', 'yuk tushuruvchi'],
        'boshqa':        []
    },

    // All announcements pool
    allAnnouncements: [
        // --- Urganch shahri ---
        { id: 1,  type: 'Santexnik',             district: 'Urganch shahri', distance: '500 m',  time: '5 min oldin',  match: 95 },
        { id: 2,  type: 'Santexnik',             district: 'Urganch shahri', distance: '1.2 km', time: '20 min oldin', match: 91 },
        { id: 3,  type: 'Santexnik',             district: 'Urganch shahri', distance: '2.5 km', time: '1 soat oldin', match: 88 },
        { id: 4,  type: 'Santexnik',             district: 'Urganch shahri', distance: '3.0 km', time: '2 soat oldin', match: 85 },
        { id: 5,  type: 'Elektrik',              district: 'Urganch shahri', distance: '600 m',  time: '10 min oldin', match: 93 },
        { id: 6,  type: 'Elektrik',              district: 'Urganch shahri', distance: '1.3 km', time: '30 min oldin', match: 89 },
        { id: 7,  type: 'Kunlik ishchi kerak',   district: 'Urganch shahri', distance: '1.1 km', time: '15 min oldin', match: 92 },
        { id: 8,  type: 'Kunlik ishchi kerak',   district: 'Urganch shahri', distance: '2.4 km', time: '1 soat oldin', match: 87 },
        { id: 9,  type: 'Kunlik ishchi kerak',   district: 'Urganch shahri', distance: '900 m',  time: '2 soat oldin', match: 84 },
        { id: 10, type: 'Yuk tashuvchi kerak',   district: 'Urganch shahri', distance: '700 m',  time: '40 min oldin', match: 90 },
        { id: 11, type: 'Yuk tashuvchi kerak',   district: 'Urganch shahri', distance: '1.6 km', time: '1 soat oldin', match: 86 },
        { id: 50, type: 'Usta kerak',            district: 'Urganch shahri', distance: '1.0 km', time: '2 soat oldin', match: 83 },
        { id: 51, type: 'Qurilish ustasi kerak', district: 'Urganch shahri', distance: '2.0 km', time: '3 soat oldin', match: 80 },
        // --- Shovot ---
        { id: 12, type: 'Santexnik',             district: 'Shovot', distance: '1.1 km', time: 'Bugun',        match: 85 },
        { id: 13, type: 'Santexnik',             district: 'Shovot', distance: '2.3 km', time: '30 min oldin', match: 83 },
        { id: 29, type: 'Santexnik',             district: 'Shovot', distance: '3.0 km', time: '1 soat oldin', match: 80 },
        { id: 30, type: 'Santexnik',             district: 'Shovot', distance: '4.5 km', time: '2 soat oldin', match: 77 },
        { id: 36, type: 'Elektrik',              district: 'Shovot', distance: '1.7 km', time: '4 soat oldin', match: 75 },
        { id: 31, type: 'Elektrik',              district: 'Shovot', distance: '2.5 km', time: '1 soat oldin', match: 73 },
        { id: 14, type: 'Kunlik ishchi kerak',   district: 'Shovot', distance: '1.1 km', time: '3 soat oldin', match: 80 },
        { id: 32, type: 'Kunlik ishchi kerak',   district: 'Shovot', distance: '2.0 km', time: '2 soat oldin', match: 78 },
        { id: 33, type: 'Kunlik ishchi kerak',   district: 'Shovot', distance: '3.2 km', time: '5 soat oldin', match: 74 },
        { id: 15, type: 'Yuk tushuruvchi kerak', district: 'Shovot', distance: '1.1 km', time: '3 soat oldin', match: 80 },
        { id: 34, type: 'Yuk tashuvchi kerak',   district: 'Shovot', distance: '1.8 km', time: '1 soat oldin', match: 78 },
        { id: 35, type: 'Yuk tashuvchi kerak',   district: 'Shovot', distance: '4.2 km', time: '6 soat oldin', match: 72 },
        { id: 52, type: 'Usta kerak',            district: 'Shovot', distance: '2.1 km', time: '1 soat oldin', match: 76 },
        // --- Gurlan ---
        { id: 16, type: 'Santexnik',             district: 'Gurlan', distance: '1.7 km', time: '2 soat oldin', match: 79 },
        { id: 17, type: 'Elektrik',              district: 'Gurlan', distance: '2.0 km', time: '5 soat oldin', match: 74 },
        { id: 18, type: 'Kunlik ishchi kerak',   district: 'Gurlan', distance: '3.2 km', time: '1 soat oldin', match: 78 },
        { id: 53, type: 'Yuk tashuvchi kerak',   district: 'Gurlan', distance: '2.5 km', time: '2 soat oldin', match: 75 },
        // --- Xiva ---
        { id: 19, type: 'Santexnik',             district: 'Xiva', distance: '2.5 km', time: '1 soat oldin', match: 77 },
        { id: 20, type: 'Kunlik ishchi kerak',   district: 'Xiva', distance: '4.5 km', time: '3 soat oldin', match: 73 },
        { id: 54, type: 'Elektrik',              district: 'Xiva', distance: '1.8 km', time: '2 soat oldin', match: 74 },
        // --- Urganch tumani ---
        { id: 55, type: 'Santexnik',             district: 'Urganch tumani', distance: '2.0 km', time: '1 soat oldin', match: 81 },
        { id: 56, type: 'Kunlik ishchi kerak',   district: 'Urganch tumani', distance: '3.5 km', time: '2 soat oldin', match: 78 },
        { id: 57, type: 'Elektrik',              district: 'Urganch tumani', distance: '2.8 km', time: '3 soat oldin', match: 76 },
        // --- Termiz ---
        { id: 25, type: 'Santexnik',             district: 'Termiz', distance: '500 m',  time: '5 min oldin',  match: 93 },
        { id: 26, type: 'Elektrik',              district: 'Termiz', distance: '600 m',  time: '20 min oldin', match: 89 },
        { id: 27, type: 'Kunlik ishchi kerak',   district: 'Termiz', distance: '1.1 km', time: '1 soat oldin', match: 85 },
        { id: 28, type: 'Yuk tashuvchi kerak',   district: 'Termiz', distance: '700 m',  time: '2 soat oldin', match: 82 },
        { id: 58, type: 'Usta kerak',            district: 'Termiz', distance: '1.5 km', time: '1 soat oldin', match: 79 },
        // --- Toshkent (viloyat tumanlari uchun umumiy) ---
        { id: 21, type: 'Santexnik',             district: 'Bektemir',    distance: '500 m',  time: '10 min oldin', match: 94 },
        { id: 22, type: 'Elektrik',              district: 'Chilonzor',   distance: '600 m',  time: '15 min oldin', match: 92 },
        { id: 23, type: 'Kunlik ishchi kerak',   district: 'Yunusobod',   distance: '1.1 km', time: '30 min oldin', match: 88 },
        { id: 24, type: 'Yuk tashuvchi kerak',   district: 'Mirzo Ulug\'bek', distance: '700 m', time: '20 min oldin', match: 90 },
        { id: 59, type: 'Santexnik',             district: 'Olmazor',     distance: '1.2 km', time: '1 soat oldin', match: 87 },
        { id: 60, type: 'Elektrik',              district: 'Sergeli',     distance: '900 m',  time: '45 min oldin', match: 86 },
        { id: 61, type: 'Kunlik ishchi kerak',   district: 'Uchtepa',     distance: '1.5 km', time: '2 soat oldin', match: 83 },
        // --- Namangan ---
        { id: 62, type: 'Santexnik',             district: 'Namangan shahri', distance: '800 m',  time: '10 min oldin', match: 91 },
        { id: 63, type: 'Elektrik',              district: 'Namangan shahri', distance: '1.2 km', time: '30 min oldin', match: 88 },
        { id: 64, type: 'Kunlik ishchi kerak',   district: 'Namangan shahri', distance: '2.0 km', time: '1 soat oldin', match: 85 },
        // --- Samarqand ---
        { id: 65, type: 'Santexnik',             district: 'Samarqand shahri', distance: '600 m',  time: '5 min oldin',  match: 92 },
        { id: 66, type: 'Elektrik',              district: 'Samarqand shahri', distance: '1.0 km', time: '20 min oldin', match: 89 },
        { id: 67, type: 'Kunlik ishchi kerak',   district: 'Samarqand shahri', distance: '1.8 km', time: '1 soat oldin', match: 86 },
        { id: 68, type: 'Yuk tashuvchi kerak',   district: 'Samarqand shahri', distance: '900 m',  time: '40 min oldin', match: 84 },
    ],

    init() {
        this.bindEvents();
        this.populateRegions('worker-region');
        this.populateRegions('emp-region');
        this.populateRegions('ad-job-region');
        this.populateRegions('ad-svc-region');
        this.populateRegions('ad-mat-region');
    },

    showModal(title, message, type = 'success') {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = `custom-modal custom-modal-${type}`;
        
        const iconClass = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-info-circle');
        
        modal.innerHTML = `
            <div class="custom-modal-icon">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <h3 class="custom-modal-title">${title}</h3>
            <p class="custom-modal-message">${message}</p>
            <button class="btn btn-primary custom-modal-btn">Tushunarli</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('visible');
            modal.classList.add('visible');
        });

        const closeBtn = modal.querySelector('.custom-modal-btn');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('visible');
            modal.classList.remove('visible');
            setTimeout(() => overlay.remove(), 300);
        });
    },

    populateRegions(regionSelectId) {
        const regionSelect = document.getElementById(regionSelectId);
        if (!regionSelect) return;
        regionSelect.innerHTML = '<option value="" disabled selected>Viloyatni tanlang...</option>';
        for (const key in this.regionsData) {
            regionSelect.innerHTML += `<option value="${key}">${this.regionsData[key].name}</option>`;
        }
        
        // Populate the dynamic filters as well
        const filterRegion = document.getElementById('filter-region');
        if (filterRegion && !filterRegion.dataset.populated) {
            for (const key in this.regionsData) {
                filterRegion.innerHTML += `<option value="${key}">${this.regionsData[key].name}</option>`;
            }
            filterRegion.dataset.populated = 'true';
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

    bindEvents() {
        const langSelect = document.getElementById('language-select');
        const startBtn = document.getElementById('start-btn');
        if (langSelect && startBtn) {
            langSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    startBtn.disabled = false;
                    this.setLanguage(e.target.value);
                }
            });
            startBtn.addEventListener('click', () => {
                this.navigate('main-menu');
            });
        }
    },

    setLanguage(lang) {
        this.currentLang = lang;
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walk.nextNode()) {
            const parent = node.parentElement;
            if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') continue;
            
            if (!this.originalTexts.has(node)) {
                this.originalTexts.set(node, node.nodeValue);
            }
            
            const originalValue = this.originalTexts.get(node);
            const trimmed = originalValue.trim();
            
            if (trimmed && this.translations[trimmed] && this.translations[trimmed][lang]) {
                node.nodeValue = originalValue.replace(trimmed, this.translations[trimmed][lang]);
            } else if (trimmed && lang === 'uz') {
                node.nodeValue = originalValue;
            }
        }

        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            if (!this.originalTexts.has(input)) {
                this.originalTexts.set(input, input.getAttribute('placeholder'));
            }
            const orig = this.originalTexts.get(input);
            if (orig && this.translations[orig] && this.translations[orig][lang]) {
                input.setAttribute('placeholder', this.translations[orig][lang]);
            } else if (orig && lang === 'uz') {
                input.setAttribute('placeholder', orig);
            }
        });

        // Also translate dynamic announcements if currently rendered
        if (this.currentSection === 'announcements-list') this.renderAnnouncements();
    },

    navigate(sectionId) {
        const currentEl = document.getElementById(this.currentSection);
        const newEl = document.getElementById(sectionId);
        if (!newEl) {
            console.error(`Section [${sectionId}] not found in DOM`);
            return;
        }
        if (currentEl) {
            currentEl.classList.remove('active');
            currentEl.classList.add('hidden');
        }
        newEl.classList.remove('hidden');
        void newEl.offsetWidth;
        newEl.classList.add('active');
        this.currentSection = sectionId;

        if (sectionId === 'announcements-list') {
            this.renderAnnouncements();
        } else if (sectionId === 'worker-dashboard') {
            this.renderDashboardMatches();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ---- ANNOUNCEMENTS ----
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

        if (filterPrice === 'asc') {
            filtered.sort((a, b) => parseInt(a.price.replace(/\D/g, '') || 0) - parseInt(b.price.replace(/\D/g, '') || 0));
        } else if (filterPrice === 'desc') {
            filtered.sort((a, b) => parseInt(b.price.replace(/\D/g, '') || 0) - parseInt(a.price.replace(/\D/g, '') || 0));
        }

        if (filterDate === 'oldest') filtered.reverse();

        if (filtered.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Ushbu filtrlarga mos e\'lonlar topilmadi.</div>';
            return;
        }

        filtered.forEach(ad => {
            const badgeMap = { job: 'Ish / Vakansiya', service: 'Xizmat Taklifi', material: 'Qurilish Moli' };
            const typeStr = badgeMap[ad.type];
            const isPriority = ad.type === 'service';
            const html = `
                <div class="ad-card" onclick="app.navigate('worker-profile')">
                    <span class="ad-badge ${ad.type}">${typeStr}</span>
                    <h3 class="ad-title">${ad.title}</h3>
                    <div class="ad-detail"><i class="fa-solid fa-location-dot"></i> ${ad.regionLabel}</div>
                    <div class="ad-detail"><i class="fa-regular fa-calendar"></i> ${ad.date}</div>
                    ${ad.store ? `<div class="ad-detail"><i class="fa-solid fa-shop"></i> ${ad.store}</div>` : ''}
                    <div class="ad-price">${ad.price}</div>
                    <button class="btn btn-primary" style="${isPriority ? 'background: linear-gradient(135deg, var(--secondary-color), #8b5cf6); border-color: transparent;' : ''}" onclick="event.stopPropagation(); app.showModal('Aloqa', 'Telefon: ${ad.contact}', 'info')">
                        <i class="fa-solid ${isPriority ? 'fa-bolt' : 'fa-phone'}"></i> ${isPriority ? "Bog'lanish (AI Ustuvor)" : "Bog'lanish"}
                    </button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    },

    // ---- DASHBOARD ----
    renderDashboardMatches() {
        const container = document.getElementById('ai-matches-container');
        if (!container) return;
        container.innerHTML = '';

        // 1. Populate profile card
        const p = this.workerProfile || {};
        const fullname = [p.fname, p.lname].filter(Boolean).join(' ') || 'Noma\'lum';
        const skillLabelMap = {
            'santexnik': 'Santexnik', 'elektrik': 'Elektrik',
            'usta': 'Usta', 'kunlik_ishchi': 'Kunlik ishchi',
            'yuk_tashuvchi': 'Yuk tashuvchi', 'boshqa': p.skill || '-'
        };
        const skillLabel = skillLabelMap[p.skill] || p.skill || '-';

        const el = (id) => document.getElementById(id);
        if (el('dash-fullname'))       el('dash-fullname').textContent       = fullname;
        if (el('dash-skill-district')) el('dash-skill-district').textContent = skillLabel + (p.district ? ' · ' + p.district : '');
        if (el('dash-exp'))            el('dash-exp').textContent            = p.experience ? p.experience + ' yil' : '-';
        if (el('dash-phone'))          el('dash-phone').textContent          = p.phone || '-';

        // 2. Filter announcements by district and skill
        const workerSkill    = (p.skill || '').toLowerCase();
        const workerDistrict = (p.district || '').toLowerCase();
        const keywords       = this.skillKeywordMap[workerSkill] || (workerSkill ? [workerSkill] : []);

        let matches = this.allAnnouncements.filter(m => {
            // District: exact match (case-insensitive)
            const districtMatch = workerDistrict
                ? m.district.toLowerCase() === workerDistrict
                : true;
            // Skill: job title must contain one of the keywords
            const skillMatch = keywords.length > 0
                ? keywords.some(kw => m.type.toLowerCase().includes(kw))
                : true;
            return districtMatch && skillMatch;
        });

        // Sort by match % descending
        matches.sort((a, b) => b.match - a.match);

        // 3. Update AI notification badge
        const notifBadge = document.querySelector('.notif-badge');
        const aiText = document.querySelector('.ai-text-dash span');
        if (notifBadge) notifBadge.textContent = matches.length;
        if (aiText) {
            aiText.textContent = matches.length > 0
                ? `${matches.length} ta mos ish topildi`
                : 'Hozircha mos ish topilmadi';
        }

        // 4. Render cards
        if (matches.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Hozircha sizga mos ishlar topilmadi.</div>';
            return;
        }

        matches.forEach(m => {
            const html = `
                <div class="match-card" id="match-${m.id}">
                    <img src="./images/plumber.png" style="width:50px; height:50px; min-width: 50px;">
                    <div class="match-info">
                        <h4>${m.type}</h4>
                        <div class="match-meta">
                            ${m.district} &middot; <i class="fa-solid fa-location-dot" style="margin:0 2px;"></i>${m.distance} &middot; <i class="fa-solid fa-clock" style="margin:0 2px; font-size: 0.6rem;"></i>${m.time}
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
        app.showModal("Muvaffaqiyatli", "Ish muvaffaqiyatli qabul qilindi! Buyurtmachi bilan bog'lanish uchun raqam berildi.", "success");
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
        const reg   = document.getElementById('filter-region')?.value || '';
        const typ   = document.getElementById('filter-type')?.value || '';
        const price = document.getElementById('filter-price')?.value || '';
        const date  = document.getElementById('filter-date')?.value || '';
        this.renderAnnouncements(reg, typ, price, date);
    },

    switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        const selectedTab = document.getElementById(`tab-${tabId}`);
        if (selectedTab) selectedTab.classList.remove('hidden');
        const btn = document.querySelector(`.tab-btn[onclick="app.switchTab('${tabId}')"]`);
        if (btn) btn.classList.add('active');
    },

    submitAd(event, type) {
        const form = event.target;
        
        let newAd = { id: Date.now(), type, date: 'Hozir' };
        
        if (type === 'job') {
            const region = document.getElementById('ad-job-region')?.value || '';
            const district = document.getElementById('ad-job-district')?.value || '';
            const jobType = document.getElementById('ad-job-type')?.value || '';
            const price = document.getElementById('ad-job-price')?.value || '';
            const phone = document.getElementById('ad-job-phone')?.value || '';
            if (!region || !district || !jobType || !price || !phone) {
                app.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
                return;
            }
            newAd.title = jobType;
            newAd.region = region;
            newAd.regionLabel = (this.regionsData[region]?.name || region) + ' · ' + district;
            newAd.contact = phone;
            newAd.price = price + " so'm";
        } else if (type === 'service') {
            const region = document.getElementById('ad-svc-region')?.value || '';
            const district = document.getElementById('ad-svc-district')?.value || '';
            const svcType = document.getElementById('ad-svc-type')?.value || '';
            const phone = document.getElementById('ad-svc-phone')?.value || '';
            if (!region || !district || !svcType || !phone) {
                app.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
                return;
            }
            newAd.title = svcType;
            newAd.region = region;
            newAd.regionLabel = (this.regionsData[region]?.name || region) + ' · ' + district;
            newAd.contact = phone;
            newAd.price = "Kelishilgan narxda";
        } else if (type === 'material') {
            const store = document.getElementById('ad-mat-store')?.value || '';
            const phone = document.getElementById('ad-mat-phone')?.value || '';
            const region = document.getElementById('ad-mat-region')?.value || '';
            const district = document.getElementById('ad-mat-district')?.value || '';
            const product = document.getElementById('ad-mat-product')?.value || '';
            if (!store || !phone || !region || !district || !product) {
                app.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
                return;
            }
            newAd.store = store;
            newAd.contact = phone;
            newAd.region = region;
            newAd.regionLabel = (this.regionsData[region]?.name || region) + ' · ' + district;
            newAd.title = product;
            const matPrice = document.getElementById('ad-mat-price')?.value || '';
            newAd.price = matPrice ? matPrice + " so'm" : "Kelishilgan";
        }
        
        this.dummyAnnouncements.unshift(newAd);
        
        app.showModal("Bajarildi", "E'lon muvaffaqiyatli saqlandi!", "success");
        form.reset();
        this.navigate('announcements-list');
    },

    submitReview() {
        app.showModal("Rahmat", "Fikringiz uchun rahmat!", "success");
        document.getElementById('review-form').reset();
    },

    // ---- WORKER FORM ----
    workerNextStep() {
        const fname    = document.getElementById('worker-fname').value.trim();
        const lname    = document.getElementById('worker-lname').value.trim();
        const phone    = document.getElementById('worker-phone').value.trim();
        const region   = document.getElementById('worker-region').value;
        const district = document.getElementById('worker-district').value;

        if (!fname || !lname || !phone || !region || !district) {
            app.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
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
        const otherInput  = document.getElementById('worker-skill-other');
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
            skill = document.getElementById('worker-skill-other').value.trim();
        }
        const exp = document.getElementById('worker-experience').value.trim();

        if (!skill || !exp) {
            app.showModal("Xatolik", "Iltimos, kasbingiz va tajribangizni kiriting.", "error");
            return;
        }

        // Save BEFORE resetting the form
        this.workerProfile = {
            fname:       document.getElementById('worker-fname').value.trim(),
            lname:       document.getElementById('worker-lname').value.trim(),
            phone:       document.getElementById('worker-phone').value.trim(),
            region:      document.getElementById('worker-region').value,
            regionLabel: this.regionsData[document.getElementById('worker-region').value]?.name || '',
            district:    document.getElementById('worker-district').value,
            skill:       skill,
            experience:  exp
        };

        app.showModal("Saqlandi", "Shaxsiy ma'lumotlar muvaffaqiyatli saqlandi!", "success");

        // Reset form and go back to step 1 visually AFTER saving
        document.getElementById('worker-form').reset();
        this.workerPrevStep();

        // Navigate to dashboard
        this.navigate('worker-dashboard');
    },

    submitEmployer() {
        const phone    = document.getElementById('emp-phone').value;
        const region   = document.getElementById('emp-region').value;
        const district = document.getElementById('emp-district').value;
        const job      = document.getElementById('emp-job-type').value;
        const payment  = document.getElementById('emp-payment').value;

        if (!phone || !region || !district || !job || !payment) {
            app.showModal("Xatolik", "Barcha qatorlarni to'ldiring.", "error");
            return;
        }

        const newAd = {
            id: Date.now(),
            type: 'job',
            title: job,
            region: region,
            regionLabel: (this.regionsData[region]?.name || region) + ' · ' + district,
            price: payment + " so'm",
            date: 'Hozir',
            contact: phone
        };
        this.dummyAnnouncements.unshift(newAd);

        app.showModal("Muvaffaqiyatli", "Ish e'loni muvaffaqiyatli yuborildi!", "success");
        document.getElementById('employer-job-form').reset();
        this.navigate('announcements-list');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
