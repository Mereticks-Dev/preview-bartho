/* =========================================
   PROTEÇÃO BÁSICA (ANTI-CÓPIA)
   ========================================= */
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if (e.keyCode == 123) { // Bloqueia F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { // Bloqueia Ctrl+Shift+I
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { // Bloqueia Ctrl+Shift+C
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { // Bloqueia Ctrl+U (Ver Fonte)
        return false;
    }
}

