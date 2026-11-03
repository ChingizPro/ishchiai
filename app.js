/**
 * Ishchi AI - Frontend Logic
 */

const app = {
    currentSection: 'landing-page',
    workerProfile: null,
    currentLang: 'uz',
    originalTexts: new Map(),
    userListings: [],
    selectedListingId: null,
    storageKey: 'ishchiai.listings',
    profileKey: 'ishchiai.worker',
    langKey: 'ishchiai.lang',

    seoCopy: {
        uz: {
            lang: 'uz',
            locale: 'uz_UZ',
            title: "Ishchi AI — ishchi va usta topish | O'zbekiston",
            description: "O'zbekistonda ishchi va usta toping yoki ish e'lonini joylang. Santexnik, elektrik, kunlik ishchi, yuk tashish va qurilish materiallari — Ishchi AI bepul."
        },
        ru: {
            lang: 'ru',
            locale: 'ru_RU',
            title: "Ishchi AI — поиск рабочих и мастеров | Узбекистан",
            description: "Найдите рабочего или мастера в Узбекистане или разместите объявление. Сантехник, электрик, подённая работа, грузчики и стройматериалы — Ishchi AI бесплатно."
        },
        en: {
            lang: 'en',
            locale: 'en_US',
            title: "Ishchi AI — find workers and craftsmen | Uzbekistan",
            description: "Find a worker or craftsman in Uzbekistan, or post a job. Plumbers, electricians, day labor, movers, and building materials — Ishchi AI is free."
        }
    },

    translations: {
        "Ishchi AI": { ru: "Рабочий ИИ", en: "Worker AI" },
        "Xush kelibsiz": { ru: "Добро пожаловать", en: "Welcome" },
        "Tilni tanlang / Выберите язык / Select language": { ru: "Выберите язык / Select language", en: "Select language" },
        "Tilni tanlang": { ru: "Выберите язык", en: "Select language" },
        "Ishchi va ustalarni toping yoki e'lon joylang.": { ru: "Найдите рабочего или мастера либо разместите объявление.", en: "Find a worker or craftsman, or post an ad." },
        "Boshlash": { ru: "Начать ", en: "Start " },
        "Asosiy Menyu": { ru: "Главное меню", en: "Main Menu" },
        "Sizga qanday yordam bera olamiz?": { ru: "Чем мы можем помочь?", en: "How can we help you?" },
        "Ishchi va Usta": { ru: "Рабочий и Мастер", en: "Worker & Craftsman" },
        "O'z xizmatlaringizni taklif qiling": { ru: "Предложите свои услуги", en: "Offer your services" },
        "Ish beruvchi": { ru: "Работодатель", en: "Employer" },
        "Ish Beruvchi": { ru: "Работодатель", en: "Employer" },
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
        "Rasm tanlash": { ru: "Выбрать фото", en: "Choose photo" },
        "Fayl tanlanmagan": { ru: "Файл не выбран", en: "No file chosen" },
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
        "Fikringizni shu yerga yozing...": { ru: "Напишите ваш отзыв здесь...", en: "Write feedback here..." },
        "Kasb, tuman yoki mahsulot...": { ru: "Профессия, район или товар...", en: "Trade, district, or product..." },
        "Hudud": { ru: "Регион", en: "Area" },
        "Ish / Vakansiya": { ru: "Работа / Вакансия", en: "Job" },
        "Xizmat": { ru: "Услуга", en: "Service" },
        "Qurilish moli": { ru: "Стройматериал", en: "Building material" },
        "Narx": { ru: "Цена", en: "Price" },
        "Arzonroq": { ru: "Дешевле", en: "Lower price" },
        "Qimmatroq": { ru: "Дороже", en: "Higher price" },
        "Sana": { ru: "Дата", en: "Date" },
        "Yangi e'lonlar": { ru: "Новые объявления", en: "Newest" },
        "Eski e'lonlar": { ru: "Старые объявления", en: "Oldest" },
        "Santexnik": { ru: "Сантехник", en: "Plumber" },
        "Elektrik": { ru: "Электрик", en: "Electrician" },
        "Kunlik ishchi": { ru: "Подённый рабочий", en: "Day laborer" },
        "Usta (g'isht teruvchi, suvoqchi, ...)": { ru: "Мастер (каменщик, штукатур, ...)", en: "Craftsman (bricklayer, plasterer, ...)" },
        "Yuk tashuvchi / Yuk tushuruvchi": { ru: "Грузчик", en: "Mover" },
        "Boshqa": { ru: "Другое", en: "Other" },
        "Santexnik kerak": { ru: "Нужен сантехник", en: "Plumber needed" },
        "Elektrik kerak": { ru: "Нужен электрик", en: "Electrician needed" },
        "Kunlik ishchi kerak": { ru: "Нужен подённый рабочий", en: "Day laborer needed" },
        "Yuk tashuvchi kerak": { ru: "Нужен грузчик", en: "Mover needed" },
        "Usta kerak": { ru: "Нужен мастер", en: "Craftsman needed" },
        "Usta": { ru: "Мастер", en: "Craftsman" },
        "Sement": { ru: "Цемент", en: "Cement" },
        "G'isht": { ru: "Кирпич", en: "Brick" },
        "Quvur": { ru: "Труба", en: "Pipe" },
        "Bo'yoq": { ru: "Краска", en: "Paint" },
        "Kabel": { ru: "Кабель", en: "Cable" },
        "Kelishilgan narxda": { ru: "Цена договорная", en: "Price negotiable" },
        "so'm": { ru: "сум", en: "UZS" },
        "kun": { ru: "день", en: "day" },
        "Hozir": { ru: "Только что", en: "Just now" },
        "1 soat oldin": { ru: "1 ч. назад", en: "1 hour ago" },
        "Kecha": { ru: "Вчера", en: "Yesterday" },
        "{n} soat oldin": { ru: "{n} ч. назад", en: "{n} hours ago" },
        "{n} kun oldin": { ru: "{n} дн. назад", en: "{n} days ago" },
        "{n} ta e'lon": { ru: "{n} объявл.", en: "{n} ads" },
        "Ushbu filtrlarga mos e'lonlar topilmadi.": { ru: "По этим фильтрам объявлений нет.", en: "No ads match these filters." },
        "Bog'lanish": { ru: "Связаться", en: "Call" },
        "Bog'lanish (AI Ustuvor)": { ru: "Связаться (приоритет ИИ)", en: "Call (AI priority)" },
        "Tushunarli": { ru: "Понятно", en: "OK" },
        "Aloqa": { ru: "Контакт", en: "Contact" },
        "Xatolik": { ru: "Ошибка", en: "Error" },
        "Iltimos, barcha maydonlarni to'ldiring.": { ru: "Заполните все поля.", en: "Please fill in every field." },
        "Barcha qatorlarni to'ldiring.": { ru: "Заполните все строки.", en: "Please fill in every field." },
        "Iltimos, kasbingiz va tajribangizni kiriting.": { ru: "Укажите профессию и опыт.", en: "Enter your trade and experience." },
        "Bajarildi": { ru: "Готово", en: "Done" },
        "E'lon muvaffaqiyatli saqlandi!": { ru: "Объявление сохранено.", en: "The ad was saved." },
        "Rahmat": { ru: "Спасибо", en: "Thank you" },
        "Fikringiz uchun rahmat!": { ru: "Спасибо за отзыв.", en: "Thanks for your review." },
        "Saqlandi": { ru: "Сохранено", en: "Saved" },
        "Shaxsiy ma'lumotlar muvaffaqiyatli saqlandi!": { ru: "Данные сохранены.", en: "Your details were saved." },
        "Muvaffaqiyatli": { ru: "Готово", en: "Success" },
        "Ish e'loni muvaffaqiyatli yuborildi!": { ru: "Объявление о работе отправлено.", en: "The job ad was posted." },
        "Ish muvaffaqiyatli qabul qilindi! Buyurtmachi bilan bog'lanish uchun raqam berildi.": { ru: "Работа принята. Номер заказчика сохранён для связи.", en: "Job accepted. The client's number is ready for you to call." },
        "Qabul qilish": { ru: "Принять", en: "Accept" },
        "Rad etish": { ru: "Отклонить", en: "Decline" },
        "Hozircha mos ish topilmadi": { ru: "Подходящей работы пока нет", en: "No matching jobs yet" },
        "Hozircha sizga mos ishlar topilmadi.": { ru: "Пока нет подходящих работ.", en: "No matching jobs for you yet." },
        "{n} ta mos ish topildi": { ru: "Найдено подходящих работ: {n}", en: "{n} matching jobs" },
        "Noma'lum": { ru: "Неизвестно", en: "Unknown" },
        "yil": { ru: "лет", en: "years" },
        "Tumanni tanlang...": { ru: "Выберите район...", en: "Select district..." },
        "Ishchi profili": { ru: "Профиль рабочего", en: "Worker profile" },
        "Toshkent shahri": { ru: "город Ташкент", en: "Tashkent city" },
        "Toshkent viloyati": { ru: "Ташкентская область", en: "Tashkent region" },
        "Andijon viloyati": { ru: "Андижанская область", en: "Andijan region" },
        "Buxoro viloyati": { ru: "Бухарская область", en: "Bukhara region" },
        "Farg'ona viloyati": { ru: "Ферганская область", en: "Fergana region" },
        "Jizzax viloyati": { ru: "Джизакская область", en: "Jizzakh region" },
        "Qashqadaryo viloyati": { ru: "Кашкадарьинская область", en: "Kashkadarya region" },
        "Xorazm viloyati": { ru: "Хорезмская область", en: "Khorezm region" },
        "Namangan viloyati": { ru: "Наманганская область", en: "Namangan region" },
        "Navoiy viloyati": { ru: "Навоийская область", en: "Navoiy region" },
        "Sirdaryo viloyati": { ru: "Сырдарьинская область", en: "Sirdaryo region" },
        "Surxondaryo viloyati": { ru: "Сурхандарьинская область", en: "Surkhandarya region" },
        "Qoraqalpog'iston Respublikasi": { ru: "Республика Каракалпакстан", en: "Karakalpakstan" },
        "1 kun oldin": { ru: "1 день назад", en: "1 day ago" },
        "3 kun oldin": { ru: "3 дня назад", en: "3 days ago" },
        "Olimjon T.": { ru: "Олимжон Т.", en: "Olimjon T." },
        "Akmal aka": { ru: "Акмал ака", en: "Akmal aka" },
        "Ishni yorib yubordi. Vaqtida kelib hamma ishlarni hal qildi. Rahmat!": { ru: "Сделал работу отлично и вовремя. Спасибо!", en: "Finished the work well and on time. Thank you!" },
        "Yaxshi ishlaydi, biroz qimmat ekan lekin sifatiga javob.": { ru: "Работает хорошо. Дороже, но качество того стоит.", en: "Works well. A bit expensive, but the quality matches." },
        "G'isht teruvchi va ustasi": { ru: "Каменщик и мастер", en: "Bricklayer and craftsman" }
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

    listingsSeed: [
        { id: 1, type: 'service', title: 'Santexnik', region: 'khorezm', district: 'Urganch shahri', price: null, hoursAgo: 1, contact: '+998 90 111 22 33' },
        { id: 2, type: 'job', title: 'Kunlik ishchi kerak', region: 'khorezm', district: 'Shovot', price: 100000, perDay: true, hoursAgo: 2, contact: '+998 90 555 66 77' },
        { id: 3, type: 'material', title: 'Sement', region: 'khorezm', district: 'Urganch shahri', price: 72000, hoursAgo: 6, contact: '+998 90 123 00 11', store: 'Urganch qurilish' },
        { id: 4, type: 'service', title: 'Elektrik', region: 'khorezm', district: 'Xiva', price: 150000, hoursAgo: 8, contact: '+998 90 222 33 44' },
        { id: 5, type: 'job', title: 'Yuk tashuvchi kerak', region: 'khorezm', district: 'Gurlan', price: 120000, hoursAgo: 4, contact: '+998 90 666 77 88' },
        { id: 6, type: 'service', title: 'Santexnik', region: 'tashkent_city', district: 'Chilonzor', price: null, hoursAgo: 1, contact: '+998 90 700 11 22' },
        { id: 7, type: 'job', title: 'Elektrik kerak', region: 'tashkent_city', district: 'Yunusobod', price: 200000, hoursAgo: 3, contact: '+998 90 700 22 33' },
        { id: 8, type: 'material', title: "G'isht", region: 'tashkent_city', district: 'Sergeli', price: 900, hoursAgo: 12, contact: '+998 90 700 33 44', store: 'Sergeli mol' },
        { id: 9, type: 'job', title: 'Kunlik ishchi kerak', region: 'tashkent_city', district: 'Bektemir', price: 130000, perDay: true, hoursAgo: 5, contact: '+998 90 700 44 55' },
        { id: 10, type: 'service', title: 'Usta', region: 'tashkent', district: 'Chirchiq', price: null, hoursAgo: 7, contact: '+998 90 710 11 22' },
        { id: 11, type: 'job', title: 'Santexnik kerak', region: 'tashkent', district: 'Olmaliq', price: 180000, hoursAgo: 9, contact: '+998 90 710 22 33' },
        { id: 12, type: 'material', title: 'Quvur', region: 'andijan', district: 'Andijon shahri', price: 45000, hoursAgo: 10, contact: '+998 91 200 11 22', store: 'Andijon santexnika' },
        { id: 13, type: 'service', title: 'Santexnik', region: 'andijan', district: 'Asaka', price: 100000, hoursAgo: 2, contact: '+998 91 200 22 33' },
        { id: 14, type: 'job', title: 'Kunlik ishchi kerak', region: 'andijan', district: 'Andijon shahri', price: 110000, perDay: true, hoursAgo: 6, contact: '+998 91 200 33 44' },
        { id: 15, type: 'service', title: 'Elektrik', region: 'bukhara', district: 'Buxoro shahri', price: null, hoursAgo: 4, contact: '+998 93 310 11 22' },
        { id: 16, type: 'job', title: 'Usta kerak', region: 'bukhara', district: "G'ijduvon", price: 250000, hoursAgo: 15, contact: '+998 93 310 22 33' },
        { id: 17, type: 'material', title: "Bo'yoq", region: 'bukhara', district: 'Buxoro shahri', price: 85000, hoursAgo: 20, contact: '+998 93 310 33 44', store: "Buxoro bo'yoq" },
        { id: 18, type: 'service', title: 'Santexnik', region: 'fergana', district: "Farg'ona shahri", price: 90000, hoursAgo: 3, contact: '+998 90 320 11 22' },
        { id: 19, type: 'job', title: 'Elektrik kerak', region: 'fergana', district: "Qo'qon", price: 160000, hoursAgo: 11, contact: '+998 90 320 22 33' },
        { id: 20, type: 'material', title: 'Kabel', region: 'fergana', district: "Marg'ilon", price: 12000, hoursAgo: 18, contact: '+998 90 320 33 44', store: "Marg'ilon elektrik" },
        { id: 21, type: 'job', title: 'Kunlik ishchi kerak', region: 'jizzakh', district: 'Jizzax shahri', price: 95000, perDay: true, hoursAgo: 8, contact: '+998 90 330 11 22' },
        { id: 22, type: 'service', title: 'Usta', region: 'jizzakh', district: 'Zomin', price: null, hoursAgo: 14, contact: '+998 90 330 22 33' },
        { id: 23, type: 'service', title: 'Santexnik', region: 'kashkadarya', district: 'Qarshi', price: 110000, hoursAgo: 2, contact: '+998 91 340 11 22' },
        { id: 24, type: 'job', title: 'Yuk tashuvchi kerak', region: 'kashkadarya', district: 'Shahrisabz', price: 140000, hoursAgo: 9, contact: '+998 91 340 22 33' },
        { id: 25, type: 'material', title: 'Sement', region: 'namangan', district: 'Namangan shahri', price: 70000, hoursAgo: 5, contact: '+998 94 350 11 22', store: 'Namangan qurilish' },
        { id: 26, type: 'job', title: 'Santexnik kerak', region: 'namangan', district: 'Chortoq', price: 130000, hoursAgo: 7, contact: '+998 94 350 22 33' },
        { id: 27, type: 'service', title: 'Elektrik', region: 'namangan', district: 'Namangan shahri', price: null, hoursAgo: 1, contact: '+998 94 350 33 44' },
        { id: 28, type: 'job', title: 'Kunlik ishchi kerak', region: 'navoiy', district: 'Navoiy shahri', price: 150000, perDay: true, hoursAgo: 4, contact: '+998 90 360 11 22' },
        { id: 29, type: 'material', title: "G'isht", region: 'navoiy', district: 'Zarafshon', price: 850, hoursAgo: 16, contact: '+998 90 360 22 33', store: "Zarafshon g'isht" },
        { id: 30, type: 'service', title: 'Santexnik', region: 'samarkand', district: 'Samarqand shahri', price: null, hoursAgo: 1, contact: '+998 90 370 11 22' },
        { id: 31, type: 'job', title: 'Usta kerak', region: 'samarkand', district: 'Urgut', price: 220000, hoursAgo: 6, contact: '+998 90 370 22 33' },
        { id: 32, type: 'service', title: 'Elektrik', region: 'samarkand', district: "Kattaqo'rg'on", price: 120000, hoursAgo: 13, contact: '+998 90 370 33 44' },
        { id: 33, type: 'job', title: 'Yuk tashuvchi kerak', region: 'sirdaryo', district: 'Guliston', price: 100000, hoursAgo: 3, contact: '+998 90 380 11 22' },
        { id: 34, type: 'material', title: 'Quvur', region: 'sirdaryo', district: 'Yangiyer', price: 38000, hoursAgo: 22, contact: '+998 90 380 22 33', store: 'Yangiyer santexnika' },
        { id: 35, type: 'service', title: 'Santexnik', region: 'surkhandarya', district: 'Termiz', price: 80000, hoursAgo: 2, contact: '+998 91 390 11 22' },
        { id: 36, type: 'job', title: 'Elektrik kerak', region: 'surkhandarya', district: 'Denov', price: 140000, hoursAgo: 10, contact: '+998 91 390 22 33' },
        { id: 37, type: 'service', title: 'Usta', region: 'karakalpakstan', district: 'Nukus', price: null, hoursAgo: 5, contact: '+998 90 400 11 22' },
        { id: 38, type: 'job', title: 'Kunlik ishchi kerak', region: 'karakalpakstan', district: 'Nukus', price: 90000, perDay: true, hoursAgo: 8, contact: '+998 90 400 22 33' },
        { id: 39, type: 'material', title: "Bo'yoq", region: 'tashkent_city', district: 'Yakkasaroy', price: 95000, hoursAgo: 9, contact: '+998 90 700 55 66', store: 'Yakkasaroy bozor' },
        { id: 40, type: 'job', title: 'Santexnik kerak', region: 'samarkand', district: 'Samarqand shahri', price: 170000, hoursAgo: 0.4, contact: '+998 90 370 44 55' },
        { id: 41, type: 'job', title: 'Santexnik kerak', region: 'khorezm', district: 'Urganch shahri', price: 150000, hoursAgo: 1, contact: '+998 90 111 44 55' },
        { id: 42, type: 'job', title: 'Elektrik kerak', region: 'khorezm', district: 'Xiva', price: 160000, hoursAgo: 2, contact: '+998 90 222 44 55' },
        { id: 43, type: 'job', title: 'Santexnik kerak', region: 'tashkent_city', district: 'Chilonzor', price: 200000, hoursAgo: 1, contact: '+998 90 700 66 77' }
    ],


    init() {
        this.loadState();
        this.bindEvents();
        this.populateRegions('worker-region');
        this.populateRegions('emp-region');
        this.populateRegions('ad-job-region');
        this.populateRegions('ad-svc-region');
        this.populateRegions('ad-mat-region');
        const savedLang = this.readStorage(this.langKey, '');
        const langSelect = document.getElementById('language-select');
        const startBtn = document.getElementById('start-btn');
        if (savedLang && langSelect && this.seoCopy[savedLang]) {
            langSelect.value = savedLang;
            if (startBtn) startBtn.disabled = false;
            this.setLanguage(savedLang);
        }
        this.openFromLocation();
    },

    readStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw == null ? fallback : JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    },

    loadState() {
        const listings = this.readStorage(this.storageKey, []);
        const profile = this.readStorage(this.profileKey, null);
        this.userListings = Array.isArray(listings) ? listings : [];
        if (profile && typeof profile === 'object') this.workerProfile = profile;
    },

    saveListings() {
        try { localStorage.setItem(this.storageKey, JSON.stringify(this.userListings)); } catch (e) {}
    },

    saveProfile() {
        try { localStorage.setItem(this.profileKey, JSON.stringify(this.workerProfile)); } catch (e) {}
    },

    allListings() {
        const now = Date.now();
        const seed = this.listingsSeed.map(ad => ({
            ...ad,
            postedAt: now - (ad.hoursAgo || 0) * 3600000
        }));
        return [...this.userListings, ...seed];
    },

    t(text) {
        if (!text || this.currentLang === 'uz') return text || '';
        const entry = this.translations[text];
        return (entry && entry[this.currentLang]) || text;
    },

    esc(value) {
        return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[ch]));
    },

    fold(value) {
        return String(value || '').toLowerCase().replace(/[`'ʻʼ']/g, "'");
    },

    regionName(key) {
        return this.t(this.regionsData[key]?.name || key || '');
    },

    typeLabel(type) {
        const labels = { job: 'Ish / Vakansiya', service: 'Xizmat', material: 'Qurilish moli' };
        return this.t(labels[type] || type || '');
    },

    formatPrice(ad) {
        if (ad.price == null || ad.price === '') return this.t('Kelishilgan narxda');
        const amount = Number(ad.price);
        if (!Number.isFinite(amount)) return this.t(String(ad.price));
        const formatted = amount.toLocaleString('ru-RU');
        return formatted + ' ' + this.t("so'm") + (ad.perDay ? '/' + this.t('kun') : '');
    },

    timeAgo(postedAt) {
        const hours = Math.max(0, (Date.now() - Number(postedAt || Date.now())) / 3600000);
        if (hours < 1) return this.t('Hozir');
        if (hours < 24) {
            const n = Math.max(1, Math.round(hours));
            return (n === 1 ? this.t('1 soat oldin') : this.t('{n} soat oldin').replace('{n}', n));
        }
        const days = Math.round(hours / 24);
        if (days <= 1) return this.t('Kecha');
        return this.t('{n} kun oldin').replace('{n}', days);
    },

    moneyAmount(value) {
        const digits = String(value || '').replace(/\D/g, '');
        if (!digits) return null;
        const amount = parseInt(digits, 10);
        return Number.isFinite(amount) ? amount : null;
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
            <h3 class="custom-modal-title">${this.esc(this.t(title))}</h3>
            <p class="custom-modal-message">${this.esc(this.t(message))}</p>
            <button class="btn btn-primary custom-modal-btn">${this.esc(this.t('Tushunarli'))}</button>
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
                districtSelect.innerHTML += `<option value="${this.esc(district)}">${this.esc(district)}</option>`;
            });
            districtSelect.disabled = false;
        } else {
            districtSelect.disabled = true;
        }
        this.translateTree(districtSelect);
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
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.addEventListener('change', (e) => {
                if (e.target.value) this.setLanguage(e.target.value);
            });
        }
        this.bindFilePicker();
        this.bindSearch();
    },

    bindFilePicker() {
        const input = document.getElementById('ad-mat-image');
        if (!input) return;
        const picker = input.closest('.file-picker');
        const name = picker.querySelector('.file-picker-name');
        const preview = picker.querySelector('.file-picker-preview');
        const showFile = () => {
            const file = input.files && input.files[0];
            if (!file) {
                delete name.dataset.chosen;
                name.textContent = 'Fayl tanlanmagan';
                this.translateTree(name);
                preview.hidden = true;
                preview.removeAttribute('src');
                return;
            }
            name.dataset.chosen = '1';
            name.textContent = file.name;
            preview.src = URL.createObjectURL(file);
            preview.hidden = false;
        };
        input.addEventListener('change', showFile);
        const form = input.closest('form');
        if (form) {
            form.addEventListener('reset', () => {
                window.setTimeout(showFile, 0);
            });
        }
    },

    bindSearch() {
        const search = document.getElementById('filter-search');
        if (search) {
            search.addEventListener('input', () => {
                if (this.currentSection === 'announcements-list') this.renderAnnouncements();
            });
        }
        ['filter-region', 'filter-type', 'filter-price', 'filter-date'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => this.applyFilters());
        });

        document.addEventListener('click', (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            const id = link.getAttribute('href').slice(1);
            const section = document.getElementById(id);
            if (!section || !section.classList.contains('section')) return;
            event.preventDefault();
            this.navigate(id);
        });

        window.addEventListener('popstate', () => {
            this.openFromLocation();
        });
    },

    openFromLocation() {
        const id = location.hash.replace(/^#/, '') || 'landing-page';
        if (id === this.currentSection) return;
        const section = document.getElementById(id);
        if (section && section.classList.contains('section')) {
            this.navigate(id, false);
        }
    },

    applySeo(lang) {
        const copy = this.seoCopy[lang] || this.seoCopy.uz;
        document.title = copy.title;
        document.documentElement.lang = copy.lang;

        const setMeta = (selector, value) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute('content', value);
        };
        setMeta('meta[name="description"]', copy.description);
        setMeta('meta[property="og:title"]', copy.title);
        setMeta('meta[property="og:description"]', copy.description);
        setMeta('meta[property="og:locale"]', copy.locale);
        setMeta('meta[name="twitter:title"]', copy.title);
        setMeta('meta[name="twitter:description"]', copy.description);

        const ld = document.getElementById('seo-structured-data');
        if (!ld) return;
        try {
            const data = JSON.parse(ld.textContent);
            (data['@graph'] || []).forEach((node) => {
                if (node['@type'] === 'WebSite' || node['@type'] === 'WebApplication') {
                    node.description = copy.description;
                }
            });
            ld.textContent = JSON.stringify(data);
        } catch (e) {}
    },

    setLanguage(lang) {
        this.currentLang = lang;
        try { localStorage.setItem(this.langKey, JSON.stringify(lang)); } catch (e) {}
        this.translateTree(document.body);
        const langSwitch = document.getElementById('lang-switch');
        const langSelect = document.getElementById('language-select');
        const startBtn = document.getElementById('start-btn');
        if (langSwitch && langSwitch.value !== lang) langSwitch.value = lang;
        if (langSelect && langSelect.value !== lang) langSelect.value = lang;
        if (startBtn) startBtn.disabled = false;
        if (this.currentSection === 'announcements-list') this.renderAnnouncements();
        if (this.currentSection === 'worker-dashboard') this.renderDashboardMatches();
        if (this.currentSection === 'worker-profile') this.renderProfile();
        this.applySeo(lang);
    },

    translateTree(root) {
        if (!root) return;
        const lang = this.currentLang;
        const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        let node;
        while (node = walk.nextNode()) {
            const parent = node.parentElement;
            if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') continue;
            if (parent.closest('#language-select, .lang-switch')) continue;
            if (parent.closest('.file-picker-name[data-chosen="1"]')) continue;
            if (!this.originalTexts.has(node)) this.originalTexts.set(node, node.nodeValue);
            const originalValue = this.originalTexts.get(node);
            const key = originalValue.trim().replace(/\s+/g, ' ');
            if (!key) continue;
            const translated = lang !== 'uz' && this.translations[key] && this.translations[key][lang];
            if (translated) {
                const leading = originalValue.match(/^\s*/)[0];
                const trailing = originalValue.match(/\s*$/)[0];
                node.nodeValue = leading + translated + trailing;
            } else {
                node.nodeValue = originalValue;
            }
        }

        const inputs = [];
        if (root.matches && root.matches('input[placeholder], textarea[placeholder]')) inputs.push(root);
        root.querySelectorAll?.('input[placeholder], textarea[placeholder]').forEach(input => inputs.push(input));
        inputs.forEach(input => {
            if (!this.originalTexts.has(input)) this.originalTexts.set(input, input.getAttribute('placeholder'));
            const orig = this.originalTexts.get(input);
            if (!orig) return;
            const translated = lang !== 'uz' && this.translations[orig] && this.translations[orig][lang];
            input.setAttribute('placeholder', translated || orig);
        });
    },

    navigate(sectionId, updateHash = true) {
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
        document.body.classList.toggle('on-landing', sectionId === 'landing-page');

        if (updateHash) {
            const nextHash = '#' + sectionId;
            if (location.hash !== nextHash) {
                history.pushState({ section: sectionId }, '', nextHash);
            }
        }

        if (sectionId === 'announcements-list') {
            this.renderAnnouncements();
        } else if (sectionId === 'worker-dashboard') {
            this.renderDashboardMatches();
        } else if (sectionId === 'worker-profile') {
            this.renderProfile();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ---- ANNOUNCEMENTS ----
    currentFilters() {
        return {
            query: document.getElementById('filter-search')?.value || '',
            region: document.getElementById('filter-region')?.value || '',
            type: document.getElementById('filter-type')?.value || '',
            price: document.getElementById('filter-price')?.value || '',
            date: document.getElementById('filter-date')?.value || ''
        };
    },

    listingHaystack(ad) {
        return [
            ad.title,
            this.t(ad.title),
            ad.district,
            this.regionName(ad.region),
            this.regionsData[ad.region]?.name,
            ad.store,
            this.typeLabel(ad.type),
            ad.contact
        ].filter(Boolean).join(' ');
    },

    renderAnnouncements() {
        const container = document.getElementById('announcements-container');
        if (!container) return;
        const filters = this.currentFilters();
        container.innerHTML = '';
        container.className = 'card-grid col-2';

        const query = this.fold(filters.query.trim());
        let filtered = this.allListings().filter(ad => {
            if (filters.region && ad.region !== filters.region) return false;
            if (filters.type && ad.type !== filters.type) return false;
            if (query && !this.fold(this.listingHaystack(ad)).includes(query)) return false;
            return true;
        });

        const priceRank = (ad) => (ad.price == null || ad.price === '' ? null : Number(ad.price));
        filtered.sort((a, b) => {
            if (filters.price === 'asc' || filters.price === 'desc') {
                const left = priceRank(a);
                const right = priceRank(b);
                if (left == null && right == null) {
                    return (b.postedAt || 0) - (a.postedAt || 0);
                }
                if (left == null) return 1;
                if (right == null) return -1;
                const direction = filters.price === 'asc' ? 1 : -1;
                const priced = (left - right) * direction;
                if (priced !== 0) return priced;
            }
            const newest = (b.postedAt || 0) - (a.postedAt || 0);
            return filters.date === 'oldest' ? -newest : newest;
        });

        const count = this.t("{n} ta e'lon").replace('{n}', filtered.length);
        container.insertAdjacentHTML('beforeend', `<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.9rem;">${this.esc(count)}</div>`);

        if (filtered.length === 0) {
            container.insertAdjacentHTML('beforeend', `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">${this.esc(this.t("Ushbu filtrlarga mos e'lonlar topilmadi."))}</div>`);
            return;
        }

        filtered.forEach(ad => {
            const isPriority = ad.type === 'service';
            const place = this.regionName(ad.region) + ' · ' + ad.district;
            const callLabel = isPriority ? "Bog'lanish (AI Ustuvor)" : "Bog'lanish";
            const html = `
                <div class="ad-card" onclick="app.openListing(${Number(ad.id)})">
                    <span class="ad-badge ${this.esc(ad.type)}">${this.esc(this.typeLabel(ad.type))}</span>
                    <h3 class="ad-title">${this.esc(this.t(ad.title))}</h3>
                    <div class="ad-detail"><i class="fa-solid fa-location-dot"></i> ${this.esc(place)}</div>
                    <div class="ad-detail"><i class="fa-regular fa-calendar"></i> ${this.esc(this.timeAgo(ad.postedAt))}</div>
                    ${ad.store ? `<div class="ad-detail"><i class="fa-solid fa-shop"></i> ${this.esc(ad.store)}</div>` : ''}
                    <div class="ad-detail"><i class="fa-solid fa-phone"></i> ${this.esc(ad.contact || '')}</div>
                    <div class="ad-price">${this.esc(this.formatPrice(ad))}</div>
                    <a class="btn ${isPriority ? 'btn-priority' : 'btn-primary'}" href="tel:${this.esc(ad.contact || '')}" onclick="event.stopPropagation()">
                        <i class="fa-solid ${isPriority ? 'fa-bolt' : 'fa-phone'}"></i> ${this.esc(this.t(callLabel))}
                    </a>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    },

    openListing(id) {
        this.selectedListingId = id;
        this.navigate('worker-profile');
    },

    renderProfile() {
        const ad = this.allListings().find(item => item.id === this.selectedListingId);
        const nameEl = document.getElementById('profile-name');
        const roleEl = document.getElementById('profile-role');
        const locationEl = document.getElementById('profile-location');
        const summaryEl = document.getElementById('profile-summary');
        const reviewsEl = document.getElementById('profile-reviews');
        if (!ad || !nameEl || !summaryEl) {
            if (reviewsEl) reviewsEl.style.display = '';
            return;
        }
        nameEl.textContent = this.t(ad.title);
        if (roleEl) roleEl.textContent = this.typeLabel(ad.type) + (ad.store ? ' · ' + ad.store : '');
        if (locationEl) locationEl.textContent = this.regionName(ad.region) + ' · ' + ad.district;
        summaryEl.innerHTML = `
            <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem;">${this.esc(this.formatPrice(ad))}</div>
            <a class="btn btn-primary" href="tel:${this.esc(ad.contact || '')}">
                <i class="fa-solid fa-phone"></i> ${this.esc(ad.contact || '')}
            </a>
        `;
        if (reviewsEl) reviewsEl.style.display = 'none';
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
        if (el('dash-fullname'))       el('dash-fullname').textContent       = this.t(fullname);
        if (el('dash-skill-district')) el('dash-skill-district').textContent = this.t(skillLabel) + (p.district ? ' · ' + p.district : '');
        if (el('dash-exp'))            el('dash-exp').textContent            = p.experience ? p.experience + ' ' + this.t('yil') : '-';
        if (el('dash-phone'))          el('dash-phone').textContent          = p.phone || '-';

        const workerSkill = this.fold(p.skill || '');
        const workerDistrict = this.fold(p.district || '');
        const keywords = (this.skillKeywordMap[p.skill] && this.skillKeywordMap[p.skill].length)
            ? this.skillKeywordMap[p.skill]
            : (workerSkill ? [workerSkill] : []);

        let matches = this.allListings().filter(ad => ad.type === 'job').map(ad => {
            const title = this.fold(ad.title);
            const skillHit = keywords.length === 0 || keywords.some(kw => title.includes(this.fold(kw)));
            if (!skillHit) return null;
            const sameDistrict = workerDistrict && this.fold(ad.district) === workerDistrict;
            const sameRegion = p.region && ad.region === p.region;
            if (workerDistrict && !sameDistrict && !sameRegion) return null;
            const score = Math.min(99, 68 + (sameDistrict ? 22 : sameRegion ? 10 : 0) + (skillHit && keywords.length ? 8 : 0));
            return { ...ad, match: score };
        }).filter(Boolean);

        matches.sort((a, b) => b.match - a.match || (b.postedAt || 0) - (a.postedAt || 0));

        // 3. Update AI notification badge
        const notifBadge = document.querySelector('.notif-badge');
        const aiText = document.querySelector('.ai-text-dash span');
        if (notifBadge) notifBadge.textContent = matches.length;
        if (aiText) {
            aiText.textContent = matches.length > 0
                ? this.t('{n} ta mos ish topildi').replace('{n}', matches.length)
                : this.t('Hozircha mos ish topilmadi');
        }

        if (matches.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">${this.esc(this.t('Hozircha sizga mos ishlar topilmadi.'))}</div>`;
            return;
        }

        matches.forEach(m => {
            const html = `
                <div class="match-card" id="match-${Number(m.id)}">
                    <img src="./images/worker.png" alt="" width="50" height="50" style="width:50px; height:50px; min-width: 50px;">
                    <div class="match-info">
                        <h4>${this.esc(this.t(m.title))}</h4>
                        <div class="match-meta">
                            ${this.esc(m.district)} &middot; <i class="fa-solid fa-clock" style="margin:0 2px; font-size: 0.6rem;"></i>${this.esc(this.timeAgo(m.postedAt))}
                        </div>
                        <div class="match-badge">
                            <i class="fa-solid fa-robot" style="color: #166534;"></i> AI Match ${m.match}%
                        </div>
                    </div>
                    <div class="match-actions">
                        <button class="btn-accept" onclick="app.acceptMatch(${Number(m.id)})">${this.esc(this.t('Qabul qilish'))} <i class="fa-solid fa-chevron-right" style="font-size: 0.6rem;"></i></button>
                        <button class="btn-reject" onclick="app.rejectMatch(${Number(m.id)})">${this.esc(this.t('Rad etish'))}</button>
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
        this.renderAnnouncements();
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
        const newAd = { id: Date.now(), type, postedAt: Date.now() };

        if (type === 'job') {
            const region = document.getElementById('ad-job-region')?.value || '';
            const district = document.getElementById('ad-job-district')?.value || '';
            const jobType = document.getElementById('ad-job-type')?.value.trim() || '';
            const price = document.getElementById('ad-job-price')?.value || '';
            const phone = document.getElementById('ad-job-phone')?.value.trim() || '';
            if (!region || !district || !jobType || !price || !phone) {
                this.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
                return;
            }
            newAd.title = jobType;
            newAd.region = region;
            newAd.district = district;
            newAd.contact = phone;
            newAd.price = this.moneyAmount(price);
        } else if (type === 'service') {
            const region = document.getElementById('ad-svc-region')?.value || '';
            const district = document.getElementById('ad-svc-district')?.value || '';
            const svcType = document.getElementById('ad-svc-type')?.value.trim() || '';
            const phone = document.getElementById('ad-svc-phone')?.value.trim() || '';
            if (!region || !district || !svcType || !phone) {
                this.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
                return;
            }
            newAd.title = svcType;
            newAd.region = region;
            newAd.district = district;
            newAd.contact = phone;
            newAd.price = null;
        } else if (type === 'material') {
            const store = document.getElementById('ad-mat-store')?.value.trim() || '';
            const phone = document.getElementById('ad-mat-phone')?.value.trim() || '';
            const region = document.getElementById('ad-mat-region')?.value || '';
            const district = document.getElementById('ad-mat-district')?.value || '';
            const product = document.getElementById('ad-mat-product')?.value.trim() || '';
            const matPrice = document.getElementById('ad-mat-price')?.value || '';
            if (!store || !phone || !region || !district || !product) {
                this.showModal("Xatolik", "Iltimos, barcha maydonlarni to'ldiring.", "error");
                return;
            }
            newAd.store = store;
            newAd.contact = phone;
            newAd.region = region;
            newAd.district = district;
            newAd.title = product;
            newAd.price = this.moneyAmount(matPrice);
        }

        this.userListings.unshift(newAd);
        this.saveListings();
        this.showModal("Bajarildi", "E'lon muvaffaqiyatli saqlandi!", "success");
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
        this.saveProfile();

        this.showModal("Saqlandi", "Shaxsiy ma'lumotlar muvaffaqiyatli saqlandi!", "success");

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
            title: job.trim(),
            region: region,
            district: district,
            price: this.moneyAmount(payment),
            postedAt: Date.now(),
            contact: phone.trim()
        };
        this.userListings.unshift(newAd);
        this.saveListings();

        this.showModal("Muvaffaqiyatli", "Ish e'loni muvaffaqiyatli yuborildi!", "success");
        document.getElementById('employer-job-form').reset();
        this.navigate('announcements-list');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
