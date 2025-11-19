/* ================================================
   PROTEÇÃO BÁSICA DO SITE
   ================================================
*/

// Desabilitar Clique Direito
document.addEventListener('contextmenu', event => event.preventDefault());

// Desabilitar Teclas de Atalho de Desenvolvedor
document.onkeydown = function(e) {
    // F12
    if(e.keyCode == 123) {
        return false;
    }
    // Ctrl+I (Inspecionar)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+J (Console)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+U (Ver Fonte)
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}
/* ================================================
   CONFIGURAÇÕES PRINCIPAIS (EDITE AQUI)
   ================================================
*/
const WHATSAPP_NUMBER = "5541999637955"; 
const DELIVERY_FEE = 5.00; 

// Caminho da imagem padrão (logo)
const DEFAULT_IMAGE = "logo.png"; 

// LISTA DE PRODUTOS
const produtos = [
    // HAMBURGUERES
    { 
        id: 1, 
        nome: "Barthô Burger", 
        cat: "burgers", 
        preco: 28.90, 
        desc: "Pão brioche, blend 180g, cheddar cremoso, bacon e cebola caramelizada.", 
        destaque: true,
        img: "bartho-burger.jpg" 
    },
    { 
        id: 2, 
        nome: "X-Bacon", 
        cat: "burgers", 
        preco: 24.90, 
        desc: "Pão, carne, queijo, bacon crocante e salada.", 
        destaque: false,
        img: null 
    },
    { 
        id: 3, 
        nome: "X-Salada", 
        cat: "burgers", 
        preco: 19.90, 
        desc: "Clássico: carne, queijo, alface, tomate e maionese da casa.", 
        destaque: false,
        img: null 
    },

    // BUFFET & DOGS
    { 
        id: 4, 
        nome: "Buffet Dog Livre", 
        cat: "dogs", 
        preco: 36.90, 
        desc: "Coma à vontade! Monte seu dog com todas as opções do buffet.", 
        destaque: true,
        img: "buffet-dog.jpg" 
    },
    { 
        id: 5, 
        nome: "Dogão Simples", 
        cat: "dogs", 
        preco: 15.00, 
        desc: "Pão, vina, molho, milho, ervilha e batata palha.", 
        destaque: false,
        img: null
    },
    { 
        id: 6, 
        nome: "Dogão Prensado", 
        cat: "dogs", 
        preco: 18.00, 
        desc: "Prensado na chapa com queijo e bacon.", 
        destaque: false,
        img: null
    },

    // PORÇÕES
    { 
        id: 7, 
        nome: "Fritas c/ Cheddar", 
        cat: "porcoes", 
        preco: 32.00, 
        desc: "Porção generosa para compartilhar.", 
        destaque: true,
        img: "fritas.jpg" 
    },
    { 
        id: 8, 
        nome: "Calabresa Acebolada", 
        cat: "porcoes", 
        preco: 35.00, 
        desc: "Acompanha pão e farofa.", 
        destaque: false,
        img: null
    },

    // BEBIDAS
    { 
        id: 9, 
        nome: "Coca-Cola 600ml", 
        cat: "bebidas", 
        preco: 8.00, 
        desc: "Garrafa gelada.", 
        destaque: false,
        img: "coca.jpg" 
    },
    { 
        id: 10, 
        nome: "Suco Natural", 
        cat: "bebidas", 
        preco: 12.00, 
        desc: "Laranja ou Limão.", 
        destaque: false,
        img: null
    },
    { 
        id: 11, 
        nome: "Heineken Long Neck", 
        cat: "bebidas", 
        preco: 14.00, 
        desc: "Cerveja gelada.", 
        destaque: false,
        img: null
    }
];

/* ================================================
   LÓGICA DO SISTEMA
   ================================================
*/

let cart = JSON.parse(localStorage.getItem('bartho_cart')) || [];
let isDelivery = true;

// Inicialização
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');

    updateCartCount();
    
    if (category) {
        const btn = document.getElementById(`btn-${category}`);
        if (btn) {
            btn.click(); 
            document.getElementById('home-section').classList.add('hidden');
            document.getElementById('menu-section').classList.remove('hidden');
        } else {
            renderMenu('todos');
            renderFeatured();
        }
    } else {
        renderMenu('todos');
        renderFeatured();
    }
};

// Navegação SPA Simples
function navigateTo(sectionId) {
    document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    window.scrollTo(0, 0);
}

function updateNav(element) {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    element.classList.add('active');
}

// Renderizar Destaques (Home)
function renderFeatured() {
    const container = document.getElementById('featured-grid');
    const destaques = produtos.filter(p => p.destaque);
    container.innerHTML = destaques.map(p => createCardHTML(p)).join('');
}

// Renderizar Menu (Cardápio)
function renderMenu(category) {
    const container = document.getElementById('menu-grid');
    const filtered = category === 'todos'
        ? produtos
        : produtos.filter(p => p.cat === category);

    container.innerHTML = filtered.map(p => createCardHTML(p)).join('');
}

// HTML do Card de Produto
function createCardHTML(produto) {
    const imagePath = produto.img ? produto.img : DEFAULT_IMAGE;

    return `
        <div class="product-card">
            <div class="product-img" style="background-image: url('${imagePath}'); background-size: cover; background-position: center;"></div>
            <div class="product-info">
                <div>
                    <h4>${produto.nome}</h4>
                    <p>${produto.desc}</p>
                </div>
                <div class="card-bottom">
                    <span class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="add-btn" onclick="addToCart(${produto.id})">+</button>
                </div>
            </div>
        </div>
    `;
}

// Filtros
function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(cat);
}

function filterMenu() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('menu-grid');
    const filtered = produtos.filter(p => p.nome.toLowerCase().includes(term));
    container.innerHTML = filtered.map(p => createCardHTML(p)).join('');
}

// --- AQUI ESTAVA O PROBLEMA, CORRIGIDO ABAIXO ---
function addToCart(id) {
    const prod = produtos.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qtd++;
    } else {
        cart.push({ ...prod, qtd: 1 });
    }

    saveCart();
    updateCartCount();

    // CORREÇÃO: Se o modal do carrinho estiver visível, atualiza a lista visualmente
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal.classList.contains('hidden')) {
        renderCartItems();
    }

    // Animação do botão (apenas se foi clicado no cardápio, não dentro do carrinho)
    if(event && event.target && event.target.classList.contains('add-btn')) {
        const btn = event.target;
        const originalText = btn.innerText;
        btn.style.backgroundColor = "var(--success)";
        btn.innerText = "✓";
        setTimeout(() => {
            btn.style.backgroundColor = "";
            btn.innerText = originalText;
        }, 1000);
    }
}

function removeFromCart(id) {
    const item = cart.find(i => i.id === id);
    if (item.qtd > 1) {
        item.qtd--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCartItems(); // Isso já existia aqui, por isso o "-" funcionava
}

function saveCart() {
    localStorage.setItem('bartho_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.qtd, 0);
    const badge = document.getElementById('cart-count');
    badge.innerText = count;
    badge.classList.toggle('hidden', count === 0);
}

// Modal do Carrinho
function openCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; margin-top: 20px;">Seu carrinho está vazio.</p>';
        document.getElementById('cart-total').innerText = 'R$ 0,00';
        return;
    }

    let subtotal = cart.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
    let total = isDelivery ? subtotal + DELIVERY_FEE : subtotal;

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div style="font-weight:bold;">${item.nome}</div>
                <div style="font-size:0.8rem; color:#888;">R$ ${item.preco.toFixed(2).replace('.', ',')} un</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="removeFromCart(${item.id})">-</button>
                <span class="cart-item-qty">${item.qtd}</span>
                <button onclick="addToCart(${item.id})">+</button>
            </div>
        </div>
    `).join('');

    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function setDeliveryMode(mode) {
    isDelivery = (mode === 'delivery');
    document.getElementById('opt-delivery').className = isDelivery ? 'toggle-opt active' : 'toggle-opt';
    document.getElementById('opt-pickup').className = !isDelivery ? 'toggle-opt active' : 'toggle-opt';

    const addrField = document.getElementById('address-fields');
    if (isDelivery) {
        addrField.innerHTML = `
            <input type="text" id="client-name" placeholder="Seu Nome" required>
            <input type="text" id="client-address" placeholder="Endereço (Rua, Número, Bairro)" required>
            <input type="text" id="client-obs" placeholder="Observações (ex: Sem cebola)">
        `;
    } else {
        addrField.innerHTML = `
            <input type="text" id="client-name" placeholder="Seu Nome" required>
            <p style="color:#aaa; font-size:0.8rem; margin-bottom:10px;">Retirar em: R. Vieira dos Santos, 343 - Centro</p>
            <input type="text" id="client-obs" placeholder="Observações">
        `;
    }
    renderCartItems(); 
}

// Finalizar Pedido
function finalizeOrder() {
    if (cart.length === 0) return alert("Carrinho vazio!");

    const nome = document.getElementById('client-name').value;
    const obs = document.getElementById('client-obs').value;
    let endereco = "Retirada no Balcão";

    if (!nome) return alert("Por favor, digite seu nome.");

    if (isDelivery) {
        const endInput = document.getElementById('client-address').value;
        if (!endInput) return alert("Por favor, digite seu endereço para entrega.");
        endereco = endInput;
    }

    let msg = `*NOVO PEDIDO - BARTHÔ BURGER*\n\n`;
    msg += `👤 *Cliente:* ${nome}\n`;
    msg += `🛵 *Modo:* ${isDelivery ? 'Entrega' : 'Retirada'}\n\n`;
    msg += `*ITENS:*\n`;

    let subtotal = 0;
    cart.forEach(item => {
        let totalItem = item.preco * item.qtd;
        subtotal += totalItem;
        msg += `• ${item.qtd}x ${item.nome} (R$ ${totalItem.toFixed(2)})\n`;
    });

    let totalFinal = isDelivery ? subtotal + DELIVERY_FEE : subtotal;

    if (isDelivery) msg += `\n📦 Taxa Entrega: R$ ${DELIVERY_FEE.toFixed(2)}`;
    msg += `\n💰 *TOTAL: R$ ${totalFinal.toFixed(2).replace('.', ',')}*\n`;

    if (isDelivery) msg += `\n📍 *Endereço:* ${endereco}`;
    if (obs) msg += `\n📝 *Obs:* ${obs}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}
