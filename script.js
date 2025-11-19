/* =========================================
   1. FUNÇÕES DE INTERFACE E WHATSAPP
   ========================================= */
function toggleMenu() {
    const nav = document.getElementById('nav-links');
    if (nav) nav.classList.toggle('active');
}

function handleWhatsAppSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const service = document.getElementById('service-type').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value;
    
    let dataFormatada = date;
    if(date) {
        const parts = date.split('-'); 
        dataFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const text = `*Olá Brot Pão! Orçamento via Site.*%0A%0A` +
                 `*Nome:* ${name}%0A` +
                 `*Interesse:* ${service}%0A` +
                 `*Convidados:* ${guests || 'Não informado'}%0A` +
                 `*Data:* ${dataFormatada || 'A definir'}%0A` +
                 `*Obs:* ${message || '-'}`;

    const phone = "554196050977"; 
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}