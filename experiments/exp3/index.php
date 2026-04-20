<!DOCTYPE html>
<html>
<head>
  <title>QR Code Generator</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 50px; background: #e0f7fa; }
    form { background: white; padding: 20px; display: inline-block; border-radius: 10px; box-shadow: 0 0 10px #ccc; }
    input, select, button { margin: 10px; padding: 10px; }
  </style>
</head>
<body>
  <h1>QR Code Generator</h1>
  <form method="POST">
    <input type="text" name="text" placeholder="Enter text" required>
    <select name="size">
      <option value="5">Small</option><option value="10">Medium</option>
    </select>
    <button type="submit" name="submit">Generate</button>
  </form>
  <?php
  if (isset($_POST['submit'])) {
    include 'phpqrcode/qrlib.php';
    $file = 'qrcode.png';
    QRcode::png($_POST['text'], $file, QR_ECLEVEL_L, $_POST['size']);
    echo "<br><img src='$file' alt='QR Code'>";
  }
  ?>
</body>
</html>
