/**
 * config.js
 * 
 * One Source of Truth for:
 * 1. Global Configuration (CONFIG)
 * 2. Event Data (eventsData)
 * 
 * This file is designed to be easily replaced or populated by an external API/JSON in the future.
 */

const CONFIG = {
    appName: "계기교육 캘린더",
    defaultTheme: "light", // 'light' or 'dark'
    currentYear: 2026,     // Default year to show
    messages: {
        loading: "자료를 불러오는 중입니다...",
        noData: "준비된 자료가 없습니다.",
        error: "데이터를 불러오는 데 실패했습니다."
    },
    // Admin & Suggestions
    ADMIN_PASSWORD: "5050", // Client-side check only (Not secure for production)
    SUGGESTION_STORAGE_KEY: "suggestions",

    // Common Education Topics
    commonTopics: [
        { id: "digital", title: "정보통신활용교육" },
        { id: "environment", title: "환경지속가능발전교육" },
        { id: "economy", title: "경제금융교육" },
        { id: "unification", title: "통일교육" },
        { id: "multicultural", title: "다문화교육" },
        { id: "human_rights", title: "인권교육" },
        { id: "democracy", title: "민주시민교육" },
        { id: "career", title: "진로교육" },
        { id: "character", title: "인성교육" },
        { id: "nutrition", title: "영양식생활교육" },
        { id: "safety", title: "안전교육" },
        { id: "class_end", title: "학년말학급경영" },
        { id: "class_start", title: "학기초학급경영" },
        { id: "semester2", title: "2학기시작태도" },
        { id: "smartphone", title: "스마트폰과의존예방교육" }
    ],
    monthlyThemes: {
        3: "새학기 적응, 친구사랑 주간 (학교폭력예방 및 교우관계증진)",
        4: "식목일, 과학의 날, 장애인의 날",
        5: "어린이날, 어버이날, 스승의 날",
        6: "현충일, 6.25 전쟁, 환경의 달",
        7: "제헌절, 여름방학 계획",
        8: "광복절, 여름철 안전교육",
        9: "추석, 독서의 달",
        10: "개천절, 한글날, 독도의 날",
        11: "농업인의 날, 불조심 강조의 달",
        12: "크리스마스, 한해 마무리, 겨울철 안전교육",
        1: "신정, 겨울방학 안전교육",
        2: "졸업 및 종업"
    }
};

/**
 * eventsData
 * 
 * Schema:
 * {
 *   id: string,
 *   date: string (YYYY-MM-DD),
 *   displayDate: string,
 *   eventName: string,
 *   gradeBand: array ["common", "lower", "upper"], // common: 공통, lower: 저학년, upper: 고학년
 *   topicTags: array ["history", "environment", "safety", "human_rights", "digital", "career"],
 *   shortDescription: string,
 *   links: {
 *     common: { videoUrl, pptUrl, worksheetPdfUrl, quizUrl },
 *     lower: { ... },
 *     upper: { ... }
 *   },
 *   isActive: boolean,
 *   notes: string
 * }
 */
const eventsData = [
    {
        id: "20260301-samiljeol",
        date: "2026-03-01",
        displayDate: "3월 1일",
        eventName: "삼일절",
        gradeBand: ["common"],
        topicTags: ["history"],
        shortDescription: "대한독립만세! 1919년 3월 1일, 우리 민족이 일본의 식민 통치에 항거한 날입니다.",
        links: {
            common: {
                videoUrl: "https://www.youtube.com/watch?v=JlPFxpyT7dI&t=21s", // Updated URL
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260302-firstday",
        date: "2026-03-02",
        displayDate: "3월 2일",
        eventName: "입학식/시업식",
        gradeBand: ["common"],
        topicTags: ["career"],
        shortDescription: "새로운 학년, 새로운 친구들을 만나는 설레는 첫 날입니다.",
        links: {
            common: {
                videoUrl: "",
                pptUrl: "#",
                worksheetPdfUrl: "",
                quizUrl: ""
            }
        },
        isActive: true,
        notes: "학교별 일정 상이할 수 있음"
    },
    {
        id: "20260314-pi-day",
        date: "2026-03-14",
        displayDate: "3월 14일",
        eventName: "파이(π) 데이",
        gradeBand: ["upper"],
        topicTags: ["digital"],
        shortDescription: "수학자들은 원주율 3.14를 기념하며 파이를 먹기도 한답니다.",
        links: {
            upper: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260405-arbor-day",
        date: "2026-04-05",
        displayDate: "4월 5일",
        eventName: "식목일",
        gradeBand: ["common"],
        topicTags: ["environment"],
        shortDescription: "나무를 심고 아끼는 마음을 기르는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260416-safety",
        date: "2026-04-16",
        displayDate: "4월 16일",
        eventName: "국민안전의 날",
        gradeBand: ["common"],
        topicTags: ["safety", "human_rights"],
        shortDescription: "세월호 참사를 기억하며, 안전의 중요성을 되새기는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260505-children",
        date: "2026-05-05",
        displayDate: "5월 5일",
        eventName: "어린이날",
        gradeBand: ["common"],
        topicTags: ["human_rights"],
        shortDescription: "모든 어린이가 차별 없이 인간으로서의 존엄성을 지님을 알리는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260515-teacher",
        date: "2026-05-15",
        displayDate: "5월 15일",
        eventName: "스승의 날",
        gradeBand: ["common"],
        topicTags: ["human_rights"],
        shortDescription: "선생님의 은혜에 감사하는 마음을 가지는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260518-democracy",
        date: "2026-05-18",
        displayDate: "5월 18일",
        eventName: "5·18 민주화운동",
        gradeBand: ["upper"],
        topicTags: ["history", "human_rights"],
        shortDescription: "광주에서 일어난 민주화 운동을 기념하는 날입니다.",
        links: {
            upper: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20260605-environment",
        date: "2026-06-05",
        displayDate: "6월 5일",
        eventName: "환경의 날",
        gradeBand: ["common"],
        topicTags: ["environment"],
        shortDescription: "지구 환경 보전을 위해 공동의 노력을 다짐하는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20261009-hangeul",
        date: "2026-10-09",
        displayDate: "10월 9일",
        eventName: "한글날",
        gradeBand: ["common"],
        topicTags: ["history", "culture"],
        shortDescription: "훈민정음을 창제해서 세상에 펴낸 것을 기념하는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    },
    {
        id: "20261025-dokdo",
        date: "2026-10-25",
        displayDate: "10월 25일",
        eventName: "독도의 날",
        gradeBand: ["common"],
        topicTags: ["history", "territory"],
        shortDescription: "독도가 대한민국의 영토임을 널리 알리는 날입니다.",
        links: {
            common: {
                videoUrl: "#",
                pptUrl: "#",
                worksheetPdfUrl: "#",
                quizUrl: "#"
            }
        },
        isActive: true,
        notes: ""
    }
    ,
    {
        id: "20260000-friendship-week",
        date: "",
        displayDate: "교육주간",
        eventName: "친구사랑주간",
        gradeBand: ["common"],
        topicTags: ["human_rights", "culture"],
        shortDescription: "친구와 사이좋게 지내고 학교폭력을 예방하는 주간입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260000-summer-safety-week",
        date: "",
        displayDate: "교육주간",
        eventName: "여름방학안전교육주간",
        gradeBand: ["common"],
        topicTags: ["safety"],
        shortDescription: "여름방학을 안전하고 건강하게 보내기 위한 교육 주간입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260000-24-solar-terms",
        date: "",
        displayDate: "교육주간",
        eventName: "노래로 알아보는 24절기",
        gradeBand: ["common"],
        topicTags: ["culture"],
        shortDescription: "우리나라의 24절기를 노래로 재미있게 배워봅니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260308-womens-day",
        date: "2026-03-08",
        displayDate: "3월 8일",
        eventName: "3월 8일 세계 여성의 날",
        gradeBand: ["common"],
        topicTags: ["human_rights"],
        shortDescription: "여성의 권리 신장과 성평등을 기념하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260419-revolution",
        date: "2026-04-19",
        displayDate: "4월 19일",
        eventName: "4.19 혁명",
        gradeBand: ["common"],
        topicTags: ["history", "democracy"],
        shortDescription: "독재 정권에 맞서 민주주의를 지키기 위해 일어난 시민 혁명입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260420-disability-day",
        date: "2026-04-20",
        displayDate: "4월 20일",
        eventName: "4월 20일 장애인의 날",
        gradeBand: ["common"],
        topicTags: ["human_rights"],
        shortDescription: "장애인에 대한 이해를 깊게 하고 재활 의욕을 고취하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260422-earth-day",
        date: "2026-04-22",
        displayDate: "4월 22일",
        eventName: "4월 22일 지구의 날",
        gradeBand: ["common"],
        topicTags: ["environment"],
        shortDescription: "지구 환경 오염 문제의 심각성을 알리기 위해 제정된 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260508-parents-day",
        date: "2026-05-08",
        displayDate: "5월 8일",
        eventName: "5월 8일 어버이날",
        gradeBand: ["common"],
        topicTags: ["culture"],
        shortDescription: "부모님의 은혜에 감사하고 효 사상을 기리는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260606-memorial-day",
        date: "2026-06-06",
        displayDate: "6월 6일",
        eventName: "6월 6일 현충일",
        gradeBand: ["common"],
        topicTags: ["history", "patriotism"],
        shortDescription: "나라를 위해 목숨을 바친 순국선열과 호국영령을 추모하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260610-democracy-movement",
        date: "2026-06-10",
        displayDate: "6월 10일",
        eventName: "6월 10일 민주항쟁",
        gradeBand: ["common"],
        topicTags: ["history", "democracy"],
        shortDescription: "1987년 6월, 대통령 직선제를 쟁취하기 위해 일어난 민주화 운동입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260625-korean-war",
        date: "2026-06-25",
        displayDate: "6월 25일",
        eventName: "6월 25일 6.25 전쟁",
        gradeBand: ["common"],
        topicTags: ["history", "peace"],
        shortDescription: "1950년 발발한 한국 전쟁을 기억하고 평화의 소중함을 되새깁니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260717-constitution-day",
        date: "2026-07-17",
        displayDate: "7월 17일",
        eventName: "7월 17일 제헌절",
        gradeBand: ["common"],
        topicTags: ["history", "law"],
        shortDescription: "대한민국 헌법 공포를 기념하는 국경일입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260815-liberation-day",
        date: "2026-08-15",
        displayDate: "8월 15일",
        eventName: "8월 15일 광복절",
        gradeBand: ["common"],
        topicTags: ["history", "independence"],
        shortDescription: "1945년 우리나라가 일본으로부터 광복된 것을 기념하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260822-energy-day",
        date: "2026-08-22",
        displayDate: "8월 22일",
        eventName: "8월 22일 에너지의 날",
        gradeBand: ["common"],
        topicTags: ["environment"],
        shortDescription: "에너지의 중요성을 깨닫고 절약을 실천하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260910-suicide-prevention",
        date: "2026-09-10",
        displayDate: "9월 10일",
        eventName: "9월 10일 세계 자살 예방의 날",
        gradeBand: ["common"],
        topicTags: ["safety", "life"],
        shortDescription: "생명의 소중함을 알리고 자살 예방을 위해 노력하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260000-chuseok",
        date: "",
        displayDate: "음력 8월 15일",
        eventName: "음력 8월 15일 추석",
        gradeBand: ["common"],
        topicTags: ["culture"],
        shortDescription: "한 해 농사를 감사하며 조상님께 차례를 지내는 명절입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW. 양력 날짜는 매년 달라지므로 여기서는 음력 표기만 사용"
    },
    {
        id: "20261003-foundation-day",
        date: "2026-10-03",
        displayDate: "10월 3일",
        eventName: "10월 3일 개천절",
        gradeBand: ["common"],
        topicTags: ["history"],
        shortDescription: "우리 민족 최초 국가인 고조선 건국을 기념하는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20261018-mountain-day",
        date: "2026-10-18",
        displayDate: "10월 18일",
        eventName: "10월 18일 산의 날",
        gradeBand: ["common"],
        topicTags: ["environment"],
        shortDescription: "산의 가치와 소중함을 일깨우고 산을 보호하기 위한 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20261111-agriculture-day",
        date: "2026-11-11",
        displayDate: "11월 11일",
        eventName: "11월 11일 농업인의 날",
        gradeBand: ["common"],
        topicTags: ["culture", "career"],
        shortDescription: "농업의 중요성을 알리고 농업인의 긍지를 높이는 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20261119-child-abuse-prevention",
        date: "2026-11-19",
        displayDate: "11월 19일",
        eventName: "11월 19일 아동학대 예방의 날",
        gradeBand: ["common"],
        topicTags: ["human_rights", "safety"],
        shortDescription: "아동 학대를 예방하고 아동의 권리를 보호하기 위한 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    },
    {
        id: "20260000-buy-nothing",
        date: "",
        displayDate: "11월 마지막 주 금요일",
        eventName: "11월 마지막 주 금요일 아무것도 사지 않는 날",
        gradeBand: ["common"],
        topicTags: ["environment"],
        shortDescription: "과소비를 줄이고 환경을 생각하는 캠페인 날입니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW. 정확한 날짜는 해마다 달라지는 Buy Nothing Day – 11월 마지막 금요일"
    },
    {
        id: "20261222-winter-solstice",
        date: "2026-12-22",
        displayDate: "12월 22일",
        eventName: "12월 22일 동지",
        gradeBand: ["common"],
        topicTags: ["culture"],
        shortDescription: "일 년 중 밤이 가장 긴 날로, 팥죽을 먹는 풍습이 있습니다.",
        links: { common: { videoUrl: "", pptUrl: "", worksheetPdfUrl: "", quizUrl: "" } },
        isActive: true,
        notes: "NEW"
    }
];
