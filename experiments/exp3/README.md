# Exp3 – QR Code Generator (PHP)

A QR code generator built with PHP using the [phpqrcode](https://phpqrcode.sourceforge.net/) library.

## Prerequisites

- PHP 7.0 or higher
- The `phpqrcode` library placed in a `phpqrcode/` folder inside `exp3/`

## Setup

1. Download the phpqrcode library and place it in `exp3/phpqrcode/`:
   ```
   https://sourceforge.net/projects/phpqrcode/
   ```

2. Make sure `phpqrcode/qrlib.php` exists.

## How to Run

Start the built-in PHP development server from inside the `exp3/` folder:

```bash
php -S localhost:8000
```

Then open your browser and visit:

```
http://localhost:8000
```

Enter any text in the form and click **Generate** to produce a QR code.
