let score = 0;
let currentGroup = null;
let currentQuestionIndex = 0;
let answeredGroups = {};
let studentName = "";
let studentClass = "";

let player = null;
let videoReady = false;
let videoTimer = null;
let lessonStarted = false;

const YOUTUBE_VIDEO_ID = "LmtHI_ARagc";

const questionGroups = [
    {
        id: "group1",
        time: 91,
        title: "Phần 1: Tình huống mở đầu",
        pointPerQuestion: 5,
        questions: [
            {
                title: "Vì sao đèn, quạt và điện thoại của Minh cùng ngừng hoạt động?",
                desc: "Dựa vào tình huống trong video.",
                answers: [
                    "Do bóng đèn bị hỏng",
                    "Do mất nguồn điện hoặc mạch điện bị ngắt",
                    "Do điện thoại hết pin",
                    "Do quạt điện chạy quá lâu"
                ],
                correct: 1,
                explainCorrect: "Chính xác! Khi mất nguồn điện hoặc mạch điện bị ngắt, các thiết bị điện không thể tiếp tục hoạt động.",
                explainWrong: "Chưa đúng. Vì nhiều thiết bị cùng dừng hoạt động nên nguyên nhân phù hợp nhất là mất nguồn điện hoặc mạch điện bị ngắt."
            },
            {
                title: "Thiết bị nào trong phòng Minh sử dụng điện để phát sáng?",
                desc: "Quan sát tình huống ở đầu video.",
                answers: ["Quạt điện", "Đèn bàn", "Điện thoại", "Sách vở"],
                correct: 1,
                explainCorrect: "Đúng rồi! Đèn bàn sử dụng điện năng để phát sáng.",
                explainWrong: "Chưa đúng. Thiết bị dùng điện để phát sáng trong tình huống này là đèn bàn."
            },
            {
                title: "Khi mất điện, quạt điện sẽ như thế nào?",
                desc: "Liên hệ với cảnh quạt điện trong phòng Minh.",
                answers: ["Quay nhanh hơn", "Ngừng quay", "Tự phát sáng", "Tự sạc điện"],
                correct: 1,
                explainCorrect: "Chính xác! Khi không còn điện năng cung cấp, quạt điện sẽ ngừng quay.",
                explainWrong: "Chưa đúng. Khi mất điện, quạt điện không có năng lượng để hoạt động nên sẽ ngừng quay."
            },
            {
                title: "Điện thoại đang sạc được là nhờ yếu tố nào?",
                desc: "Chọn đáp án phù hợp nhất.",
                answers: [
                    "Có ánh sáng từ đèn bàn",
                    "Có điện năng truyền đến qua bộ sạc",
                    "Có quạt điện đang quay",
                    "Có sách vở trên bàn"
                ],
                correct: 1,
                explainCorrect: "Đúng rồi! Điện thoại sạc được vì có điện năng truyền đến thông qua bộ sạc.",
                explainWrong: "Chưa chính xác. Điện thoại sạc được là do có điện năng truyền đến qua bộ sạc."
            },
            {
                title: "Tình huống của Minh dẫn chúng ta đến nội dung nào?",
                desc: "Chọn nội dung phù hợp nhất với bài học.",
                answers: [
                    "Cách trang trí phòng học",
                    "Khái quát về mạch điện",
                    "Cách sử dụng điện thoại",
                    "Cách sửa quạt điện"
                ],
                correct: 1,
                explainCorrect: "Chính xác! Tình huống mất điện dẫn vào bài học về mạch điện.",
                explainWrong: "Chưa đúng. Nội dung chính của bài là Khái quát về mạch điện."
            }
        ]
    },
    {
        id: "group2",
        time: 121,
        title: "Phần 2: Cấu tạo mạch điện",
        pointPerQuestion: 5,
        questions: [
            {
                title: "Mạch điện là gì?",
                desc: "Dựa vào phần khái niệm vừa học.",
                answers: [
                    "Một thiết bị dùng để phát sáng",
                    "Tập hợp các bộ phận điện được nối với nhau bằng dây dẫn",
                    "Một loại pin dùng trong gia đình",
                    "Một chiếc công tắc điện"
                ],
                correct: 1,
                explainCorrect: "Đúng rồi! Mạch điện là tập hợp các bộ phận điện được nối với nhau bằng dây dẫn để thực hiện một chức năng nhất định.",
                explainWrong: "Chưa đúng. Mạch điện không phải một thiết bị riêng lẻ mà gồm nhiều bộ phận được nối với nhau."
            },
            {
                title: "Bộ phận nào cung cấp điện năng cho toàn bộ mạch điện?",
                desc: "Chọn đáp án đúng nhất.",
                answers: ["Nguồn điện", "Dây dẫn", "Công tắc", "Bóng đèn"],
                correct: 0,
                explainCorrect: "Chính xác! Nguồn điện cung cấp điện năng cho mạch điện.",
                explainWrong: "Chưa đúng. Bộ phận cung cấp điện năng cho mạch là nguồn điện."
            },
            {
                title: "Dây dẫn có nhiệm vụ gì?",
                desc: "Liên hệ với cảnh dây dẫn trong video.",
                answers: [
                    "Phát sáng",
                    "Truyền dòng điện và nối các bộ phận",
                    "Đóng ngắt dòng điện",
                    "Tiêu thụ điện năng"
                ],
                correct: 1,
                explainCorrect: "Đúng rồi! Dây dẫn giúp truyền dòng điện và kết nối các bộ phận trong mạch.",
                explainWrong: "Chưa đúng. Dây dẫn có nhiệm vụ truyền dòng điện và nối các bộ phận trong mạch."
            },
            {
                title: "Ví dụ nào sau đây là nguồn điện?",
                desc: "Chọn ví dụ đúng nhất.",
                answers: ["Pin", "Bóng đèn", "Quạt điện", "Công tắc"],
                correct: 0,
                explainCorrect: "Chính xác! Pin là một ví dụ quen thuộc của nguồn điện.",
                explainWrong: "Chưa đúng. Pin là nguồn điện, còn bóng đèn và quạt điện là thiết bị sử dụng điện."
            },
            {
                title: "Muốn mạch điện hoạt động, các bộ phận cần được nối với nhau bằng gì?",
                desc: "Dựa vào vai trò của dây dẫn.",
                answers: ["Dây dẫn", "Giấy", "Nhựa", "Gỗ"],
                correct: 0,
                explainCorrect: "Đúng rồi! Các bộ phận trong mạch điện cần được nối với nhau bằng dây dẫn.",
                explainWrong: "Chưa đúng. Trong mạch điện, dây dẫn có nhiệm vụ nối các bộ phận và truyền dòng điện."
            }
        ]
    }
];

window.onYouTubeIframeAPIReady = function () {
    createYouTubePlayer();
};

function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
        createYouTubePlayer();
        return;
    }

    if (document.getElementById("youtube-api-script")) {
        return;
    }

    const tag = document.createElement("script");
    tag.id = "youtube-api-script";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
}

function createYouTubePlayer() {
    if (player) return;

    player = new YT.Player("lessonVideo", {
        videoId: YOUTUBE_VIDEO_ID,
        width: "100%",
        height: "500",
        playerVars: {
            rel: 0,
            modestbranding: 1,
            controls: 1,
            playsinline: 1
        },
        events: {
            onReady: function () {
                videoReady = true;

                if (lessonStarted) {
                    player.playVideo();
                }
            },
            onStateChange: function (event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    startVideoTimer();
                } else {
                    stopVideoTimer();
                }

                if (event.data === YT.PlayerState.ENDED) {
                    document.getElementById("afterVideo").classList.remove("hidden");
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadYouTubeAPI();
});

function startLesson() {
    studentName = document.getElementById("studentName").value.trim();
    studentClass = document.getElementById("studentClass").value.trim();

    if (studentName === "" || studentClass === "") {
        alert("Bạn hãy nhập đầy đủ họ tên và lớp trước khi bắt đầu.");
        return;
    }

    lessonStarted = true;

    localStorage.setItem("studentName", studentName);
    localStorage.setItem("studentClass", studentClass);

    document.getElementById("displayName").innerText = studentName;
    document.getElementById("displayClass").innerText = studentClass;

    document.getElementById("studentCard").classList.add("hidden");
    document.getElementById("lessonSection").classList.remove("hidden");

    loadYouTubeAPI();

    if (player && videoReady && typeof player.playVideo === "function") {
        player.playVideo();
    }
}

function startVideoTimer() {
    if (videoTimer) return;

    videoTimer = setInterval(function () {
        if (!player || !player.getCurrentTime) return;

        const currentTime = Math.floor(player.getCurrentTime());

        questionGroups.forEach(function (group) {
            if (currentTime >= group.time && !answeredGroups[group.id]) {
                showQuestionGroup(group);
            }
        });
    }, 500);
}

function stopVideoTimer() {
    if (videoTimer) {
        clearInterval(videoTimer);
        videoTimer = null;
    }
}

function showQuestionGroup(group) {
    currentGroup = group;
    currentQuestionIndex = 0;
    answeredGroups[group.id] = true;

    if (player && player.pauseVideo) {
        player.pauseVideo();
    }

    document.getElementById("stepVideo").classList.remove("active");
    document.getElementById("stepInteract").classList.add("active");

    document.getElementById("questionOverlay").classList.remove("hidden");
    renderQuestionInGroup();
}

function renderQuestionInGroup() {
    const q = currentGroup.questions[currentQuestionIndex];

    document.getElementById("questionTag").innerText =
        `${currentGroup.title} · Câu ${currentQuestionIndex + 1}/${currentGroup.questions.length}`;

    document.getElementById("questionTitle").innerText = q.title;
    document.getElementById("questionDesc").innerText = q.desc;

    const answerBox = document.getElementById("answerBox");
    answerBox.innerHTML = "";

    q.answers.forEach(function (answer, index) {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.innerHTML = `<span>${String.fromCharCode(65 + index)}.</span> ${answer}`;
        btn.onclick = function () {
            chooseAnswer(index);
        };
        answerBox.appendChild(btn);
    });

    document.getElementById("feedbackBox").className = "feedback hidden";
    document.getElementById("continueBtn").classList.add("hidden");
}

function chooseAnswer(index) {
    const q = currentGroup.questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-btn");

    const feedbackBox = document.getElementById("feedbackBox");
    const feedbackIcon = document.getElementById("feedbackIcon");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackText = document.getElementById("feedbackText");

    buttons.forEach(function (btn, btnIndex) {
        btn.classList.add("disabled");

        if (btnIndex === q.correct) {
            btn.classList.add("correct");
        }

        if (btnIndex === index && index !== q.correct) {
            btn.classList.add("wrong");
        }
    });

    if (index === q.correct) {
        score += currentGroup.pointPerQuestion;
        updateScore();

        feedbackBox.className = "feedback correct";
        feedbackIcon.innerText = "✓";
        feedbackTitle.innerText = "Chính xác!";
        feedbackText.innerText = q.explainCorrect;
    } else {
        feedbackBox.className = "feedback wrong";
        feedbackIcon.innerText = "!";
        feedbackTitle.innerText = "Chưa đúng";
        feedbackText.innerText = q.explainWrong;
    }

    localStorage.setItem("interactiveScore", score);

    feedbackBox.classList.remove("hidden");

    const continueBtn = document.getElementById("continueBtn");
    continueBtn.classList.remove("hidden");

    if (currentQuestionIndex < currentGroup.questions.length - 1) {
        continueBtn.innerText = "Câu tiếp theo";
    } else {
        continueBtn.innerText = "Tiếp tục xem video";
    }
}

function continueVideo() {
    if (currentGroup && currentQuestionIndex < currentGroup.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestionInGroup();
        return;
    }

    document.getElementById("questionOverlay").classList.add("hidden");

    document.getElementById("stepInteract").classList.remove("active");
    document.getElementById("stepVideo").classList.add("active");

    currentGroup = null;
    currentQuestionIndex = 0;

    if (player && player.playVideo) {
        player.playVideo();
    }
}

function closeQuestion() {
    continueVideo();
}

function restartVideo() {
    score = 0;
    currentGroup = null;
    currentQuestionIndex = 0;
    answeredGroups = {};

    localStorage.setItem("interactiveScore", "0");
    updateScore();

    document.getElementById("afterVideo").classList.add("hidden");
    document.getElementById("questionOverlay").classList.add("hidden");

    document.getElementById("stepInteract").classList.remove("active");
    document.getElementById("stepSim").classList.remove("active");

    const stepQuiz = document.getElementById("stepQuiz");
    if (stepQuiz) stepQuiz.classList.remove("active");

    document.getElementById("stepVideo").classList.add("active");

    if (player) {
        player.seekTo(0, true);
        player.playVideo();
    }
}

function updateScore() {
    document.getElementById("scoreText").innerText = score;
}

function goSimulation() {
    localStorage.setItem("interactiveScore", score);

    document.getElementById("stepVideo").classList.remove("active");
    document.getElementById("stepInteract").classList.remove("active");
    document.getElementById("stepSim").classList.add("active");

    window.location.href = "mophong.html";
}

function toggleAIChat() {
    const box = document.getElementById("aiChatBox");
    box.classList.toggle("hidden");

    if (!box.classList.contains("hidden")) {
        setTimeout(function () {
            document.getElementById("aiInput").focus();
        }, 100);
    }
}

function handleAIEnter(event) {
    if (event.key === "Enter") {
        sendAIMessage();
    }
}

function quickAsk(text) {
    document.getElementById("aiInput").value = text;
    sendAIMessage();
}

async function sendAIMessage() {
    const input = document.getElementById("aiInput");
    const message = input.value.trim();

    if (message === "") return;

    appendChatMessage(message, "user");
    input.value = "";

    const loadingId = appendChatMessage("Trợ lý AI đang suy nghĩ...", "bot", "loading");

    try {
        const response = await fetch("api/chat.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();
        removeChatMessage(loadingId);

        if (data.success) {
            appendChatMessage(data.reply, "bot");
        } else {
            appendChatMessage(data.reply || "Có lỗi khi gọi trợ lý AI.", "bot");
        }
    } catch (error) {
        removeChatMessage(loadingId);
        appendChatMessage("Không kết nối được chatbot. Hãy chạy dự án bằng XAMPP tại localhost, không dùng Live Server.", "bot");
    }
}

function appendChatMessage(text, type, extraClass = "") {
    const messages = document.getElementById("aiChatMessages");
    const id = "msg_" + Date.now() + "_" + Math.floor(Math.random() * 9999);

    const row = document.createElement("div");
    row.className = "chat-row " + type + " " + extraClass;
    row.id = id;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = escapeHTML(text).replace(/\n/g, "<br>");

    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;

    return id;
}

function removeChatMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbxkaF2RKwFehrcVTToghKs1dNLTKT7d_K0mdA9YZ5LrZVsMXCaJ17nLYA3frvA5un-x/exec";

function showFinalResult() {
    const name = localStorage.getItem("studentName") || studentName || "";
    const className = localStorage.getItem("studentClass") || studentClass || "";

    const interactiveScore = Number(localStorage.getItem("interactiveScore") || score || 0);
    const simulationScore = Number(localStorage.getItem("simulationScore") || 0);
    const totalScore = interactiveScore + simulationScore;

    document.getElementById("resultName").innerText = name;
    document.getElementById("resultClass").innerText = className;
    document.getElementById("resultInteractive").innerText = interactiveScore;
    document.getElementById("resultSimulation").innerText = simulationScore;
    document.getElementById("resultTotal").innerText = totalScore;

    document.getElementById("resultModal").classList.remove("hidden");

    sendResultToSheet(name, className, interactiveScore, simulationScore, totalScore);
}

async function sendResultToSheet(name, className, interactiveScore, simulationScore, totalScore) {
    const status = document.getElementById("sendStatus");

    try {
        await fetch(SHEET_API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                className: className,
                interactiveScore: interactiveScore,
                simulationScore: simulationScore,
                totalScore: totalScore,
                time: new Date().toLocaleString("vi-VN")
            })
        });

        status.innerText = "Đã gửi kết quả về hệ thống.";
    } catch (error) {
        status.innerText = "Chưa gửi được kết quả. Hãy kiểm tra kết nối.";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);

    if (params.get("result") === "1") {
        document.getElementById("studentCard").classList.add("hidden");
        document.getElementById("lessonSection").classList.remove("hidden");

        showFinalResult();
    }
});