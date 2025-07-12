# easyStore.js

**easyStore** is a lightweight, dependency-free JavaScript utility that simplifies browser storage (`localStorage` and `sessionStorage`) and adds built-in TTL (Time-To-Live) support.

> Originally developed as a class project to help students understand prototype-based JavaScript and real-world browser storage, this utility is now open for anyone to use, study, or contribute to.

---

## ✨ Features

- 📦 Simple key-value storage with one-line commands
- ⏳ Built-in **TTL support** (auto-expire data after set time)
- 🔐 Safe access with smart fallback
- 🧪 Utility methods: `.has()`, `.ttlLeft()`, `.remove()`, `.clear()`
- ⚠️ Strong validation (strict typing and storage method checks)
- 🚫 No prototype modifications — safe and modular

---

## Installation

You can use it via CDN (replace `yourusername` with your actual GitHub username):

```html
<script src="https://cdn.jsdelivr.net/gh/Intellectro/easyStore/easyStore.min.js"></script>
