const products = [
  {
    id:"cherry-bombs", name:"Cherry Bombs", category:"Bombones", price:2.99,
    image:"images/cherry-bombs.jpg",
    short:"Bombones de cereza con un centro dulce y explosivo.",
    description:"Una creación inspirada en el sabor de la cereza, pensada para convertir cada bocado en una pequeña explosión de dulzura."
  },
  {
    id:"hazelnut-hearts", name:"Hazelnut Hearts", category:"Chocolate", price:3.99,
    image:"images/hazelnut-hearts.jpg",
    short:"Corazones de chocolate y avellana.",
    description:"Chocolate con nuez: cacao cuidadosamente seleccionado y nueces tostadas que aportan un toque crujiente a cada bocado."
  },
  {
    id:"pastel-swirls", name:"Pastel Swirls", category:"Paletas", price:3.99,
    image:"images/pastel-swirls.jpg",
    short:"Paletas artesanales de colores pastel.",
    description:"Paletas suaves y coloridas que combinan una presentación delicada con sabores frutales para una experiencia divertida."
  },
  {
    id:"gummy-galaxies", name:"Gummy Galaxies", category:"Gomitas", price:3.99,
    image:"images/gummy-galaxies.jpg",
    short:"Gomitas camaleonas de sabores frutales.",
    description:"Gomitas con sabores frutales intensos y textura suave y elástica, capaces de transformar su color al contacto."
  },
  {
    id:"rainbow-bubbles", name:"Rainbow Bubbles", category:"Gomitas", price:7.99,
    image:"images/rainbow-bubbles.jpg",
    short:"Chicle frutal en una explosión de colores.",
    description:"Una mezcla vibrante de colores y sabores frutales. Cada burbuja convierte el momento en una experiencia divertida."
  },
  {
    id:"galactic-pop", name:"Paleta Galáctica", category:"Paletas", price:4.99,
    image:"images/paleta-galactica.jpg",
    short:"Una explosión cósmica de sabor.",
    description:"Paleta artesanal inspirada en el cosmos, con diseño de galaxia en espiral y estrellas comestibles. Sabores frutales en cada capa."
  },
  {
    id:"cloud-bombon", name:"Bombón Nube Flotante", category:"Bombones", price:4.49,
    image:"images/bombon-nube.jpg",
    short:"Una nube llena de sorpresas.",
    description:"Malvavisco ligero y delicado inspirado en las nubes, relleno de sabores sorpresa. La magia está en no saber cuál encontrarás."
  }
];

let cart = JSON.parse(localStorage.getItem("bc_demo_cart") || "[]");
let activeCategory = "Todos";
let detailProduct = null;
let detailQty = 1;
let currentOrder = null;

const $ = (selector, parent=document) => parent.querySelector(selector);
const $$ = (selector, parent=document) => [...parent.querySelectorAll(selector)];

function money(n){ return `$${n.toFixed(2)} USD`; }
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function saveCart(){ localStorage.setItem("bc_demo_cart", JSON.stringify(cart)); }
function cartCount(){ return cart.reduce((sum,i)=>sum+i.qty,0); }
function subtotal(){ return cart.reduce((sum,i)=>sum+i.price*i.qty,0); }
function tax(){ return subtotal()*0.08; }
function total(){ return subtotal()+tax(); }

function toast(message){
  const box=document.createElement("div");
  box.className="toast";
  box.textContent=message;
  $("#toastContainer").appendChild(box);
  setTimeout(()=>box.remove(),3000);
}

function renderProducts(){
  const query=$("#productSearch").value.trim().toLowerCase();
  const list=products.filter(p =>
    (activeCategory==="Todos" || p.category===activeCategory) &&
    (!query || `${p.name} ${p.category} ${p.short}`.toLowerCase().includes(query))
  );
  $("#productGrid").innerHTML=list.length ? list.map(p=>`
    <article class="product-card">
      <div class="product-image" style="background-image:url('${p.image}')" data-id="${p.id}" title="Ver detalle">
        <span class="image-hint">Haz clic para ver detalle</span>
      </div>
      <div class="product-body">
        <span class="tag">${p.category}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.short)}</p>
        <div class="product-footer">
          <strong class="product-price">${money(p.price)}</strong>
          <button class="add-btn" data-add="${p.id}" aria-label="Agregar ${escapeHtml(p.name)}">+</button>
        </div>
      </div>
    </article>
  `).join("") : `<div class="empty-state"><h3>No encontramos ese dulce 🍬</h3><p>Prueba con otro nombre o categoría.</p></div>`;
}

function renderCart(){
  $("#cartCount").textContent=cartCount();
  $("#cartItems").innerHTML=cart.length ? cart.map(item=>`
    <div class="cart-item">
      <div class="cart-thumb" style="background-image:url('${item.image}')"></div>
      <div>
        <h4>${escapeHtml(item.name)}</h4>
        <small>${money(item.price)} c/u</small>
        <div class="mini-qty">
          <button data-cart-minus="${item.id}">−</button><b>${item.qty}</b><button data-cart-plus="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-item" data-remove="${item.id}" aria-label="Eliminar">×</button>
    </div>
  `).join("") : `<div class="cart-empty"><div style="font-size:52px">🍭</div><h3>Tu carrito está vacío</h3><p>Agrega tus dulces favoritos para comenzar.</p></div>`;

  $("#cartSubtotal").textContent=money(subtotal());
  $("#cartTax").textContent=money(tax());
  $("#cartTotal").textContent=money(total());
}

function addToCart(id, qty=1){
  const p=products.find(x=>x.id===id);
  if(!p) return;
  const existing=cart.find(x=>x.id===id);
  if(existing) existing.qty+=qty;
  else cart.push({...p,qty});
  saveCart(); renderCart();
  toast(`${p.name} se agregó al carrito ✦`);
}

function updateQty(id,delta){
  const item=cart.find(x=>x.id===id);
  if(!item) return;
  item.qty+=delta;
  if(item.qty<=0) cart=cart.filter(x=>x.id!==id);
  saveCart(); renderCart();
}

function openModal(id){
  const m=$("#"+id);
  m.classList.add("open"); m.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
}
function closeModal(id){
  const m=$("#"+id);
  m.classList.remove("open"); m.setAttribute("aria-hidden","true");
  if(!$$(".modal.open").length && !$("#cartDrawer").classList.contains("open")) document.body.classList.remove("modal-open");
}

function openCart(){
  $("#cartDrawer").classList.add("open"); $("#drawerBackdrop").classList.add("open"); $("#cartDrawer").setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
}
function closeCart(){
  $("#cartDrawer").classList.remove("open"); $("#drawerBackdrop").classList.remove("open"); $("#cartDrawer").setAttribute("aria-hidden","true");
  if(!$$(".modal.open").length) document.body.classList.remove("modal-open");
}

function openProduct(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  detailProduct=p; detailQty=1;
  $("#detailImage").style.backgroundImage=`url('${p.image}')`;
  $("#detailCategory").textContent=p.category;
  $("#detailName").textContent=p.name;
  $("#detailDescription").textContent=p.description;
  $("#detailPrice").textContent=money(p.price);
  $("#detailQty").textContent=detailQty;
  openModal("productModal");
}

function renderCheckout(){
  $("#checkoutItems").innerHTML=cart.map(item=>`
    <div class="summary-item">
      <img src="${item.image}" alt="">
      <div><strong>${escapeHtml(item.name)}</strong><span>${item.qty} × ${money(item.price)}</span></div>
      <b>${money(item.qty*item.price)}</b>
    </div>
  `).join("");
  $("#checkoutTotal").textContent=money(total());
}

function formatCard(e){
  e.target.value=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
}
function formatExpiry(e){
  let v=e.target.value.replace(/\D/g,"").slice(0,4);
  if(v.length>2) v=v.slice(0,2)+"/"+v.slice(2);
  e.target.value=v;
}

function createConfetti(){
  const c=$("#confetti"); c.innerHTML="";
  for(let i=0;i<45;i++){
    const el=document.createElement("i");
    el.style.left=Math.random()*100+"%";
    el.style.top=(-10-Math.random()*30)+"px";
    el.style.transform=`rotate(${Math.random()*180}deg)`;
    el.style.animationDelay=(Math.random()*.6)+"s";
    c.appendChild(el);
  }
}

function generateOrderNumber(){
  return "BC-"+Math.floor(100000+Math.random()*900000);
}

function fillTicket(order){
  $("#successOrderNumber").textContent=order.number;
  $("#ticketCode").textContent=order.number;
  $("#ticketCustomer").textContent=order.customer;
  $("#ticketEmail").textContent=order.email;
  $("#ticketBranch").textContent=order.branch;
  $("#ticketPickup").textContent=order.pickup;
  $("#ticketItems").innerHTML=order.items.map(i=>`
    <div class="ticket-line"><span>${i.qty} × ${escapeHtml(i.name)}</span><b>${money(i.qty*i.price)}</b></div>
  `).join("");
  $("#ticketTotal").textContent=money(order.total);
  $("#ticketBarcode").innerHTML="";
  const bars=18;
  for(let i=0;i<bars;i++){
    const b=document.createElement("span");
    b.style.display="inline-block"; b.style.height="45px"; b.style.width=(2+Math.random()*3)+"px"; b.style.marginRight=(1+Math.random()*2)+"px"; b.style.background="#222";
    $("#ticketBarcode").appendChild(b);
  }
}

function submitCheckout(e){
  e.preventDefault();
  if(!cart.length){ closeModal("checkoutModal"); toast("Agrega al menos un producto."); return; }

  const form=new FormData(e.target);
  const card=form.get("cardNumber").replace(/\s/g,"");
  const expiry=form.get("expiry");
  const cvv=form.get("cvv");

  if(card.length!==16){ toast("El número de tarjeta demo debe tener 16 dígitos."); return; }
  if(!/^\d{2}\/\d{2}$/.test(expiry)){ toast("Usa el formato MM/AA."); return; }
  if(cvv.length<3){ toast("El CVV demo debe tener 3 o 4 dígitos."); return; }

  const order={
    number:generateOrderNumber(),
    customer:form.get("customerName"),
    email:form.get("customerEmail"),
    branch:form.get("branch"),
    pickup:form.get("pickupTime"),
    items:cart.map(x=>({...x})),
    total:total(),
    created:new Date()
  };
  currentOrder=order;

  closeModal("checkoutModal");
  $("#processingOverlay").classList.add("open");
  setTimeout(()=>{
    $("#processingOverlay").classList.remove("open");
    fillTicket(order);
    createConfetti();
    openModal("successModal");
    cart=[];
    saveCart();
    renderCart();
    e.target.reset();
  },2200);
}

function openSearch(){
  openModal("searchModal");
  $("#globalSearch").focus();
  renderSearchResults("");
}
function renderSearchResults(q){
  const query=q.toLowerCase();
  const list=products.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(query));
  $("#searchResults").innerHTML=list.slice(0,6).map(p=>`
    <button class="search-result" data-search-id="${p.id}">
      <span><b>${escapeHtml(p.name)}</b> · ${p.category}</span><strong>${money(p.price)}</strong>
    </button>
  `).join("") || `<p class="muted">No encontramos coincidencias.</p>`;
}

let slideIndex=0;
function initSlider(){
  const slides=$$(".hero-slide"), dots=$("#heroDots");
  slides.forEach((_,i)=>{
    const b=document.createElement("button"); b.setAttribute("aria-label",`Diapositiva ${i+1}`);
    b.addEventListener("click",()=>showSlide(i)); dots.appendChild(b);
  });
  showSlide(0);
  setInterval(()=>showSlide((slideIndex+1)%slides.length),6000);
}
function showSlide(i){
  const slides=$$(".hero-slide"), dots=$$("#heroDots button");
  slideIndex=i;
  slides.forEach((s,n)=>s.classList.toggle("active",n===i));
  dots.forEach((d,n)=>d.classList.toggle("active",n===i));
}

document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");
  if(add){ addToCart(add.dataset.add); return; }
  const img=e.target.closest(".product-image");
  if(img){ openProduct(img.dataset.id); return; }
  const minus=e.target.closest("[data-cart-minus]");
  if(minus){ updateQty(minus.dataset.cartMinus,-1); return; }
  const plus=e.target.closest("[data-cart-plus]");
  if(plus){ updateQty(plus.dataset.cartPlus,1); return; }
  const rem=e.target.closest("[data-remove]");
  if(rem){ updateQty(rem.dataset.remove,-999); return; }
  const searchId=e.target.closest("[data-search-id]");
  if(searchId){ closeModal("searchModal"); openProduct(searchId.dataset.searchId); return; }
  const close=e.target.closest("[data-close]");
  if(close){ closeModal(close.dataset.close); return; }
  if(e.target.classList.contains("modal")) closeModal(e.target.id);
});

$$(".pill").forEach(btn=>{
  btn.addEventListener("click",()=>{
    $$(".pill").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); activeCategory=btn.dataset.category; renderProducts();
  });
});

$("#productSearch").addEventListener("input",renderProducts);
$("#searchBtn").addEventListener("click",openSearch);
$("#globalSearch").addEventListener("input",e=>renderSearchResults(e.target.value));
$("#accountBtn").addEventListener("click",()=>openModal("accountModal"));
$("#cartBtn").addEventListener("click",openCart);
$("#closeCart").addEventListener("click",closeCart);
$("#drawerBackdrop").addEventListener("click",closeCart);
$("#menuBtn").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$("#viewAllBtn").addEventListener("click",()=>{activeCategory="Todos";$$(".pill").forEach(x=>x.classList.toggle("active",x.dataset.category==="Todos"));$("#productSearch").value="";renderProducts();document.querySelector("#productos").scrollIntoView({behavior:"smooth"});});
$("#clearCartBtn").addEventListener("click",()=>{cart=[];saveCart();renderCart();toast("Carrito vacío.");});
$("#detailMinus").addEventListener("click",()=>{detailQty=Math.max(1,detailQty-1);$("#detailQty").textContent=detailQty;});
$("#detailPlus").addEventListener("click",()=>{detailQty++;$("#detailQty").textContent=detailQty;});
$("#detailAdd").addEventListener("click",()=>{addToCart(detailProduct.id,detailQty);closeModal("productModal");openCart();});
$("#checkoutBtn").addEventListener("click",()=>{
  if(!cart.length){toast("Tu carrito está vacío.");return;}
  closeCart();renderCheckout();openModal("checkoutModal");
});
$("#checkoutForm").addEventListener("submit",submitCheckout);
$("#cardNumber").addEventListener("input",formatCard);
$("#expiry").addEventListener("input",formatExpiry);
$("#cvv").addEventListener("input",e=>e.target.value=e.target.value.replace(/\D/g,"").slice(0,4));
$("#accountForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target); closeModal("accountModal"); toast(`¡Hola, ${f.get("name")}! Cuenta demo iniciada.`); e.target.reset();
});
$("#viewTicketBtn").addEventListener("click",()=>{closeModal("successModal");openModal("ticketModal");});
$("#closeSuccessBtn").addEventListener("click",()=>closeModal("successModal"));
$("#printTicketBtn").addEventListener("click",()=>window.print());

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    $$(".modal.open").forEach(m=>closeModal(m.id));
    closeCart();
  }
});

renderProducts();
renderCart();
initSlider();
