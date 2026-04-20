<?php
session_start();
$message = '';
$file = '';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])) {
    $text = trim($_POST['text']);
    $size = intval($_POST['size']);

    if (empty($text)) {
        $message = "<div class='error'>Please enter some text or a URL.</div>";
    } elseif ($size < 1 || $size > 20) {
        $message = "<div class='error'>Invalid QR Code size selected.</div>";
    } else {
        // Validation passed, generate QR
        include 'phpqrcode/qrlib.php';
        
        $uploadDir = 'qrcodes/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'qr_' . time() . '.png';
        $file = $uploadDir . $filename;
        
        // Generate
        QRcode::png($text, $file, QR_ECLEVEL_L, $size);
        $message = "<div class='success'>QR Code generated successfully!</div>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced QR Code Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="qr-container">
        <header>
            <h1>QR Code Generator</h1>
            <p>Enter text or a URL to generate a custom QR code instantly.</p>
        </header>

        <?= $message ?>

        <form method="POST" id="qrForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <div class="form-group">
                <label for="textInput">Content to Encode (*)</label>
                <input type="text" id="textInput" name="text" placeholder="e.g., https://example.com" value="<?= isset($_POST['text']) ? htmlspecialchars($_POST['text']) : '' ?>">
                <div id="textError" class="validation-error"></div>
            </div>

            <div class="form-group">
                <label for="sizeSelect">QR Code Size</label>
                <select name="size" id="sizeSelect">
                    <option value="5" <?= (isset($_POST['size']) && $_POST['size'] == 5) ? 'selected' : '' ?>>Small</option>
                    <option value="10" <?= (isset($_POST['size']) && $_POST['size'] == 10) ? 'selected' : (!isset($_POST['size']) ? 'selected' : '') ?>>Medium</option>
                    <option value="15" <?= (isset($_POST['size']) && $_POST['size'] == 15) ? 'selected' : '' ?>>Large</option>
                </select>
            </div>

            <button type="submit" name="submit" class="generate-btn">Generate QR Code</button>
        </form>

        <?php if (!empty($file) && file_exists($file)): ?>
            <div class="result-box">
                <h3>Your QR Code</h3>
                <img src="<?= $file ?>" alt="Generated QR Code">
                <br>
                <a href="<?= $file ?>" download="my_qrcode.png" class="download-btn">Download Image</a>
            </div>
        <?php endif; ?>
    </div>

</body>
</html>
