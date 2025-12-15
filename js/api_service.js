/**
 * api_service.js
 * 
 * Handles interactions with the Upstage API (Mocked for now)
 * and generates PDF documents using jsPDF.
 */

const ApiService = {
    // Mock API Call to Upstage
    generateLessonPlan: async function (eventData, gradeBand) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: `${eventData.eventName} 계기교육 지도안`,
                    grade: gradeBand === 'lower' ? '초등학교 1-3학년' : '초등학교 4-6학년',
                    objectives: [
                        `${eventData.eventName}의 유래와 의미를 설명할 수 있다.`,
                        `관련 활동을 통해 ${eventData.eventName}의 가치를 내면화한다.`
                    ],
                    activities: [
                        { time: '10분', content: '동기유발: 관련 영상 시청 및 퀴즈' },
                        { time: '20분', content: '전개: 주요 사건 및 인물 탐구' },
                        { time: '10분', content: '정리: 소감 나누기 및 활동지 작성' }
                    ],
                    worksheet: {
                        question1: `${eventData.eventName}은(는) 어떤 날인가요?`,
                        question2: `오늘 배운 내용 중 가장 기억에 남는 것은 무엇인가요?`
                    }
                });
            }, 2000); // Simulate 2s delay
        });
    },

    // Generate PDF using jsPDF
    createPdf: async function (data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add Korean Font (NotoSansKR) - This requires a base64 font string in a real app.
        // For this demo, we'll use the default font but warn about Korean support.
        // To properly support Korean in jsPDF, we need to add a font file.
        // Since we can't easily add a large font file here, we will use English for the demo or standard text.
        // *Critical*: jsPDF default fonts don't support Korean.
        // We will try to render text, but it might show as garbage without a font.
        // As a fallback for this environment, we will generate an HTML-based print view or just English placeholders if needed.
        // However, let's try to be helpful. We'll assume the user might have a font or we use a standard trick.
        // Actually, without a font file, Korean won't render.
        // Strategy: We will create a simple HTML print window instead of a raw PDF for better Korean support in this MVP.

        this.printHtml(data);
    },

    printHtml: function (data) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${data.title}</title>
                <style>
                    body { font-family: 'Noto Sans KR', sans-serif; padding: 40px; line-height: 1.6; }
                    h1 { color: #333; border-bottom: 2px solid #4dabf7; padding-bottom: 10px; }
                    h2 { color: #555; margin-top: 30px; }
                    .meta { color: #666; margin-bottom: 30px; }
                    .box { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background-color: #e7f5ff; }
                    .worksheet { border: 2px dashed #aaa; padding: 20px; margin-top: 40px; }
                </style>
            </head>
            <body>
                <h1>${data.title}</h1>
                <div class="meta">
                    <p><strong>대상 학년:</strong> ${data.grade}</p>
                    <p><strong>생성일:</strong> ${new Date().toLocaleDateString()}</p>
                </div>

                <h2>1. 학습 목표</h2>
                <ul>
                    ${data.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>

                <h2>2. 수업 흐름 (40분)</h2>
                <table>
                    <tr>
                        <th width="20%">시간</th>
                        <th>활동 내용</th>
                    </tr>
                    ${data.activities.map(act => `
                        <tr>
                            <td>${act.time}</td>
                            <td>${act.content}</td>
                        </tr>
                    `).join('')}
                </table>

                <div class="worksheet">
                    <h2>📝 활동지</h2>
                    <p><strong>Q1.</strong> ${data.worksheet.question1}</p>
                    <br><br><br>
                    <p><strong>Q2.</strong> ${data.worksheet.question2}</p>
                    <br><br><br>
                </div>
                
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
};
