<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'reply' => 'API chỉ nhận phương thức POST.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function loadEnvValue($key)
{
    $envPath = dirname(__DIR__) . '/.env';

    if (!file_exists($envPath)) {
        return null;
    }

    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        if (str_starts_with($line, $key . '=')) {
            return trim(substr($line, strlen($key) + 1), "\"'");
        }
    }

    return null;
}

$apiKey = loadEnvValue('GEMINI_API_KEY');

if (!$apiKey) {
    echo json_encode([
        'success' => false,
        'reply' => 'Chưa cấu hình GEMINI_API_KEY trong file .env.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$message = trim($input['message'] ?? '');

if ($message === '') {
    echo json_encode([
        'success' => false,
        'reply' => 'Bạn chưa nhập câu hỏi.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$systemPrompt = "
Bạn là trợ lý học tập AI trong bài học Công nghệ 8: Bài 14 - Khái quát về mạch điện.
Nhiệm vụ:
- Trả lời ngắn gọn, dễ hiểu, phù hợp học sinh lớp 8.
- Chỉ tập trung vào nội dung mạch điện: nguồn điện, dây dẫn, công tắc, phụ tải, mạch kín, mạch hở, an toàn điện.
- Nếu học sinh hỏi ngoài bài học, hãy nhẹ nhàng kéo về nội dung bài học.
- Không trả lời quá dài. Mỗi câu trả lời nên từ 3 đến 6 câu.
- Dùng tiếng Việt.
";

$payload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                [
                    'text' => $systemPrompt . "\n\nCâu hỏi của học sinh: " . $message
                ]
            ]
        ]
    ]
];

$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . urlencode($apiKey);

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);
$error = curl_error($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

if ($error) {
    echo json_encode([
        'success' => false,
        'reply' => 'Không thể kết nối tới Gemini API: ' . $error
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($response, true);

if ($httpCode < 200 || $httpCode >= 300) {
    echo json_encode([
        'success' => false,
        'reply' => 'Gemini API trả về lỗi. Hãy kiểm tra lại API key hoặc quyền truy cập model.',
        'debug' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Xin lỗi, hiện tại cô trợ lý chưa trả lời được câu hỏi này.';

echo json_encode([
    'success' => true,
    'reply' => $reply
], JSON_UNESCAPED_UNICODE);