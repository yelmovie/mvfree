/**
 * app.js
 * 
 * Main Application Logic
 * 1. Initialize App
 * 2. Render Calendar (Year/Month View)
 * 3. Handle Events (Modals, Theme Toggle, View Toggle)
 * 4. Suggestion System & Admin Panel
 */

let currentView = 'year'; // 'year' or 'month'
let currentMonth = new Date().getMonth() + 1; // 1-12
let currentYear = CONFIG.currentYear;

$(document).ready(function () {
    initApp();
});

function initApp() {
    // 1. Theme Setup
    setupTheme();

    // 2. Header Date
    updateHeaderDate();

    // 3. Render Calendar
    renderApp();

    // 4. Bind Global Events
    bindGlobalEvents();
}

/* =========================================
   Theme Handling
   ========================================= */
function setupTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (!savedTheme) {
        // First visit: Show selection modal
        $('#themeModal').addClass('active');
    } else {
        applyTheme(savedTheme);
    }
}

function selectTheme(theme) {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    $('#themeModal').removeClass('active');
}

function applyTheme(theme) {
    $('html').attr('data-theme', theme);

    // Update Toggle Icon
    const icon = theme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    $('#themeToggleBtn').html(icon);
}

function toggleTheme() {
    const current = $('html').attr('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    selectTheme(next);
}

/* =========================================
   Calendar Rendering
   ========================================= */

// Main Render Router
function renderApp() {
    const $container = $('#calendarContainer');
    // Clear container but keep structure if needed
    $container.empty().removeClass('year-view month-view');

    // Hide/Show Common Topics based on view
    if (currentView === 'year') {
        $container.addClass('year-view');
        $('#commonTopicsContainer').show();
        renderYearView(currentYear);
        renderCommonTopics(); // Render topics in year view
    } else {
        $container.addClass('month-view');
        $('#commonTopicsContainer').hide();
        // Render Single Month with Slide Wrapper
        renderDetailedMonthView(currentYear, currentMonth);
    }
}

// 1. Year View (Summary Cards)
function renderYearView(year) {
    const $container = $('#calendarContainer');

    // Loop 1 to 12 months
    for (let m = 1; m <= 12; m++) {
        const monthHtml = renderSummaryMonthCard(year, m);
        $container.append(monthHtml);
    }
}

// 2. Month View (Single Month with Horizontal Slide)
function renderDetailedMonthView(year, month, animationClass = '') {
    const $container = $('#calendarContainer');

    // Create a wrapper for the slide animation
    const $wrapper = $(`<div class="slide-wrapper ${animationClass}"></div>`);
    const monthHtml = renderDetailedMonthCard(year, month);
    $wrapper.html(monthHtml);

    if (animationClass) {
        // If animating, append to container (don't empty yet)
        $container.append($wrapper);

        // Remove old wrapper after animation
        setTimeout(() => {
            $container.children().not($wrapper).remove();
            $wrapper.removeClass(animationClass);
        }, 400); // Match CSS animation duration
    } else {
        // Initial render
        $container.empty().append($wrapper);
    }
}

// Helper: Render Summary Card (Year View)
function renderSummaryMonthCard(year, month) {
    // Month Icons
    const monthIcons = ["❄️", "🍫", "🌱", "🌸", "🌹", "🌿", "🏖️", "🍉", "🍁", "🎃", "🍂", "⛄"];
    const icon = monthIcons[month - 1];

    // Get events for this month
    const monthEvents = eventsData.filter(e => {
        if (!e.date) return false; // Skip events without fixed date for now
        const d = new Date(e.date);
        return d.getFullYear() === year && (d.getMonth() + 1) === month;
    });

    // Sort events by date
    monthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    let html = `
        <div class="summary-month-card" data-month="${month}" onclick="goToMonth(${month})">
            <div class="summary-month-header month-color-${month}">
                <span class="month-icon">${icon}</span>
                <span class="month-name">${month}월</span>
            </div>
            <div class="summary-events-list">
    `;

    if (monthEvents.length === 0) {
        html += `<div class="no-events">일정 없음</div>`;
    } else {
        monthEvents.forEach(event => {
            html += `
                <button class="event-chip" onclick="event.stopPropagation(); openEventModal('${event.date}')">
                    ${event.eventName}
                </button>
            `;
        });
    }

    html += `
            </div>
        </div>
    `;
    return html;
}

// Helper: Render Detailed Card (Month View)
function renderDetailedMonthCard(year, month) {
    // Get first day and last date of the month
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0(Sun) - 6(Sat)
    const lastDate = new Date(year, month, 0).getDate();

    const monthIcons = ["❄️", "🍫", "🌱", "🌸", "🌹", "🌿", "🏖️", "🍉", "🍁", "🎃", "🍂", "⛄"];
    const icon = monthIcons[month - 1];

    let html = `
        <div class="month-card">
            <div class="month-header">
                <span class="month-icon">${icon}</span>
                <span>${month}월</span>
                
                <div class="month-nav-controls">
                    <button class="nav-arrow-btn" onclick="changeMonth(-1)" title="이전 달">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button class="nav-arrow-btn" onclick="changeMonth(1)" title="다음 달">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="days-grid">
                <div class="day-header sun">일</div>
                <div class="day-header">월</div>
                <div class="day-header">화</div>
                <div class="day-header">수</div>
                <div class="day-header">목</div>
                <div class="day-header">금</div>
                <div class="day-header sat">토</div>
    `;

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="day-cell empty"></div>`;
    }

    // Day cells
    for (let d = 1; d <= lastDate; d++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const event = getEventByDate(dateStr);

        let classes = "day-cell";
        let content = `<span>${d}</span>`;

        // Check if today
        const today = new Date();
        const isToday = today.getFullYear() === year && (today.getMonth() + 1) === month && today.getDate() === d;
        if (isToday) classes += " today";

        // Check if event exists
        if (event) {
            classes += " has-event";
            content += `
                <div class="event-dot"></div>
                <div class="event-label">${event.eventName}</div>
            `;
        }

        html += `<div class="${classes}" data-date="${dateStr}">${content}</div>`;
    }

    // Fill remaining cells
    const totalCellsFilled = firstDay + lastDate;
    const remainingCells = 42 - totalCellsFilled;

    if (remainingCells > 0) {
        const themeText = CONFIG.monthlyThemes[month] || "";
        if (themeText) {
            html += `
                <div class="day-cell empty-theme" style="grid-column: span ${remainingCells}; width: 100%; align-items: flex-start; padding: 5px; text-align: left;">
                    <span style="font-size: 0.7rem; color: var(--text-muted); word-break: keep-all;">${themeText}</span>
                </div>
            `;
        } else {
            for (let i = 0; i < remainingCells; i++) {
                html += `<div class="day-cell empty"></div>`;
            }
        }
    }

    html += `
            </div>
        </div>
    `;
    return html;
}

// Render Common Topics
function renderCommonTopics() {
    const $grid = $('#commonTopicsGrid');
    $grid.empty();

    CONFIG.commonTopics.forEach(topic => {
        const chip = `
            <div class="topic-chip" onclick="openCommonTopicModal('${topic.title}')">
                ${topic.title}
            </div>
        `;
        $grid.append(chip);
    });
}

/* =========================================
   Navigation Logic
   ========================================= */
function goToMonth(month) {
    currentView = 'month';
    currentMonth = month;
    updateViewButtons();
    renderApp();
    window.scrollTo(0, 0);
}

function changeMonth(offset) {
    const newDate = new Date(currentYear, currentMonth - 1 + offset, 1);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;

    // Determine animation direction
    let animationClass = '';
    if (offset > 0) {
        animationClass = 'slide-in-right'; // Next month comes from right
        // Old one slides out left (handled by CSS on existing wrapper if we added class, 
        // but here we just animate the new one in over it or push it)
        // Simplified: New one slides in from right. 
    } else {
        animationClass = 'slide-in-left'; // Prev month comes from left
    }

    currentYear = newYear;
    currentMonth = newMonth;

    renderDetailedMonthView(currentYear, currentMonth, animationClass);
}

/* =========================================
   Data Logic
   ========================================= */
function getEventByDate(dateStr) {
    return eventsData.find(e => e.date === dateStr);
}

/* =========================================
   Event Handling & Modals
   ========================================= */
function bindGlobalEvents() {
    // Theme Toggle
    $('#themeToggleBtn').on('click', toggleTheme);

    // View Toggles
    $('#viewYearBtn').on('click', function () {
        currentView = 'year';
        updateViewButtons();
        renderApp();
    });

    $('#viewMonthBtn').on('click', function () {
        currentView = 'month';
        currentMonth = new Date().getMonth() + 1; // Reset to current month or keep last viewed? 
        // Let's reset to current real month for better UX on switch
        updateViewButtons();
        renderApp();
    });

    // Calendar Date Click (Delegated)
    $(document).on('click', '.day-cell.has-event', function (e) {
        e.stopPropagation();
        const date = $(this).data('date');
        openEventModal(date);
    });

    // Modal Close
    $('#closeEventModal, #eventModal').on('click', function (e) {
        if (e.target === this) closeEventModal();
    });

    // Tab Switching in Modal
    $('.tab-btn').on('click', function () {
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        const target = $(this).data('target');
        const eventId = $('#eventModal').data('event-id');
        updateModalLinks(eventId, target);
    });

    // Suggestion System
    $('#openSuggestionBtn').on('click', openSuggestionModal);
    $('#closeSuggestionModal, #cancelSuggestionBtn, #suggestionModal').on('click', function (e) {
        if (e.target === this) closeSuggestionModal();
    });
    $('#suggestionForm').on('submit', submitSuggestion);

    // Admin System
    $('#openAdminLoginBtn').on('click', openAdminLoginModal);
    $('#closeAdminLoginModal, #cancelAdminLoginBtn, #adminLoginModal').on('click', function (e) {
        if (e.target === this) closeAdminLoginModal();
    });
    $('#adminLoginForm').on('submit', handleAdminLogin);

    $('#closeAdminPanelModal, #adminPanelModal').on('click', function (e) {
        if (e.target === this) closeAdminPanelModal();
    });
}

function updateViewButtons() {
    $('.view-toggle-btn').removeClass('active');
    if (currentView === 'year') {
        $('#viewYearBtn').addClass('active');
    } else {
        $('#viewMonthBtn').addClass('active');
    }
}

function updateHeaderDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    $('#headerDate').text("오늘: " + now.toLocaleDateString('ko-KR', options));
}

function openEventModal(dateStr) {
    const event = getEventByDate(dateStr);
    if (!event) return;

    // Populate Modal Info
    $('#modalDate').text(event.displayDate);
    $('#modalTitle').text(event.eventName);
    $('#modalDesc').text(event.shortDescription);
    $('#modalNotes').text(event.notes || "특이사항 없음");

    // Store current event ID
    $('#eventModal').data('event-id', event.id);

    // Reset Tabs
    $('.tab-btn').removeClass('active');
    $('.tab-btn[data-target="common"]').addClass('active');
    updateModalLinks(event.id, 'common');

    // Show Modal
    $('#eventModal').addClass('active');
}

function openCommonTopicModal(topicTitle) {
    // Reuse Event Modal for Common Topics
    // We can create a fake event object or just populate fields
    $('#modalDate').text("공통 계기교육");
    $('#modalTitle').text(topicTitle);
    $('#modalDesc').text("이 주제에 대한 교육 자료를 확인하세요.");
    $('#modalNotes').text("학년별 수준에 맞는 다양한 활동을 계획해보세요.");

    // Clear links or show generic ones
    $('#resourceLinks').html('<p>관련 자료를 준비 중입니다.</p>');

    $('#eventModal').addClass('active');
}

function closeEventModal() {
    $('#eventModal').removeClass('active');
}

function updateModalLinks(eventId, gradeTarget) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const links = event.links[gradeTarget] || event.links['common'];
    const $grid = $('#resourceLinks');
    $grid.empty();

    if (!links) {
        $grid.html('<p>해당 학년 자료가 없습니다.</p>');
        return;
    }

    const createBtn = (label, url, iconClass) => {
        const isDisabled = !url || url === "#";
        const href = isDisabled ? "javascript:void(0)" : url;
        const disabledClass = isDisabled ? "disabled" : "";
        const clickAttr = isDisabled ? `onclick="alert('준비 중인 자료입니다.')"` : `target="_blank"`;

        return `
            <a href="${href}" class="resource-btn ${disabledClass}" ${clickAttr}>
                <i class="${iconClass}"></i> ${label}
            </a>
        `;
    };

    $grid.append(createBtn("영상 보기", links.videoUrl, "fa-brands fa-youtube"));
    $grid.append(createBtn("PPT 열기", links.pptUrl, "fa-solid fa-file-powerpoint"));
    $grid.append(createBtn("활동지", links.worksheetPdfUrl, "fa-solid fa-file-pdf"));
    $grid.append(createBtn("퀴즈 풀기", links.quizUrl, "fa-solid fa-circle-question"));
}

/* =========================================
   Suggestion System Logic
   ========================================= */
function openSuggestionModal() {
    $('#suggestionForm')[0].reset();
    $('#suggestionModal').addClass('active');
}

function closeSuggestionModal() {
    $('#suggestionModal').removeClass('active');
}

function submitSuggestion(e) {
    e.preventDefault();

    const email = $('#suggestionEmail').val();
    const message = $('#suggestionMessage').val();

    if (!message) {
        alert("제안 내용을 입력해주세요.");
        return;
    }

    const suggestion = {
        id: Date.now(),
        email: email || "익명",
        message: message,
        createdAt: new Date().toISOString()
    };

    try {
        const stored = localStorage.getItem(CONFIG.SUGGESTION_STORAGE_KEY);
        const suggestions = stored ? JSON.parse(stored) : [];
        suggestions.push(suggestion);
        localStorage.setItem(CONFIG.SUGGESTION_STORAGE_KEY, JSON.stringify(suggestions));

        alert("제안이 전송되었습니다. 감사합니다!");
        closeSuggestionModal();
    } catch (error) {
        console.error("Storage Error:", error);
        alert("일시적인 오류로 제안을 저장하지 못했습니다.");
    }
}

/* =========================================
   Admin System Logic
   ========================================= */
function openAdminLoginModal() {
    $('#adminLoginForm')[0].reset();
    $('#adminLoginModal').addClass('active');
}

function closeAdminLoginModal() {
    $('#adminLoginModal').removeClass('active');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const password = $('#adminPassword').val();

    if (password === CONFIG.ADMIN_PASSWORD) {
        closeAdminLoginModal();
        openAdminPanel();
    } else {
        alert("비밀번호가 올바르지 않습니다.");
    }
}

function openAdminPanel() {
    loadSuggestions();
    $('#adminPanelModal').addClass('active');
}

function closeAdminPanelModal() {
    $('#adminPanelModal').removeClass('active');
}

function loadSuggestions() {
    const $tbody = $('#suggestionListBody');
    const $noMsg = $('#noSuggestionsMsg');
    $tbody.empty();

    try {
        const stored = localStorage.getItem(CONFIG.SUGGESTION_STORAGE_KEY);
        const suggestions = stored ? JSON.parse(stored) : [];

        if (suggestions.length === 0) {
            $noMsg.show();
            return;
        }

        $noMsg.hide();
        // Sort by newest first
        suggestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        suggestions.forEach(s => {
            const date = new Date(s.createdAt).toLocaleString('ko-KR');
            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${s.email}</td>
                    <td>${s.message}</td>
                </tr>
            `;
            $tbody.append(row);
        });
    } catch (error) {
        console.error("Load Error:", error);
        $tbody.html('<tr><td colspan="3">데이터를 불러오는 중 오류가 발생했습니다.</td></tr>');
    }
}
