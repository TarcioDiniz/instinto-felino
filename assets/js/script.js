/* ===== Instinto Felino — interações ===== */
document.addEventListener('DOMContentLoaded', function () {

  /* --- Dados dos kits (ancoragem) --- */
  var KITS = {
    '1': { now: 'R$ 97',  was: 'R$ 149', parc: '12x de R$ 9,79' },
    '2': { now: 'R$ 167', was: 'R$ 297', parc: '12x de R$ 16,85' },
    '3': { now: 'R$ 227', was: 'R$ 497', parc: '12x de R$ 22,90' }
  };
  var selecionado = '2'; // padrão: kit mais popular (ancoragem no meio)

  function aplicarKit(id) {
    selecionado = id;
    var k = KITS[id];
    document.querySelectorAll('.offer').forEach(function (o) {
      o.classList.toggle('sel', o.getAttribute('data-kit') === id);
    });
    var tn = document.getElementById('totNow');
    var tp = document.getElementById('totParc');
    if (tn) tn.innerHTML = '<small>Total: </small>' + k.now;
    if (tp) tp.textContent = 'ou ' + k.parc;
    // barra fixa mobile
    var sp = document.getElementById('stickyNow');
    var sw = document.getElementById('stickyWas');
    if (sp) sp.textContent = k.now;
    if (sw) sw.textContent = k.was;
  }

  document.querySelectorAll('.offer').forEach(function (o) {
    o.addEventListener('click', function () { aplicarKit(o.getAttribute('data-kit')); });
  });
  aplicarKit(selecionado);

  /* --- Galeria: troca imagem principal --- */
  var mainImg = document.getElementById('mainImg');
  document.querySelectorAll('.thumbs img').forEach(function (t) {
    t.addEventListener('click', function () {
      mainImg.src = t.getAttribute('data-full') || t.src;
      document.querySelectorAll('.thumbs img').forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
    });
  });

  /* --- Checkout: usa os links das variáveis de ambiente (window.IF_CONFIG) --- */
  var CFG = window.IF_CONFIG || {};
  function irCheckout() {
    var urls = { '1': CFG.CHECKOUT_URL_1, '2': CFG.CHECKOUT_URL_2, '3': CFG.CHECKOUT_URL_3 };
    var url = urls[selecionado];
    if (url && /^https?:\/\//.test(url)) {
      window.location.href = url;
    } else {
      // Sem link configurado (.env não preenchido): rola para a oferta e avisa.
      console.warn('Checkout do kit ' + selecionado + ' não configurado. Defina CHECKOUT_URL_' + selecionado + ' no .env.');
      document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' });
    }
  }
  document.querySelectorAll('[data-checkout]').forEach(function (b) {
    b.addEventListener('click', irCheckout);
  });

  /* --- Botão flutuante de WhatsApp (aparece só se configurado) --- */
  var wpp = document.getElementById('wppBtn');
  if (wpp && CFG.WHATSAPP_URL && /^https?:\/\//.test(CFG.WHATSAPP_URL)) {
    wpp.href = CFG.WHATSAPP_URL;
    wpp.classList.add('on');
  }

  /* --- CTAs que rolam até a oferta do topo --- */
  document.querySelectorAll('[data-scroll-top]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* --- Cronômetro de escassez (topo) — 14:59 regressivo --- */
  var fim = Date.now() + 15 * 60 * 1000;
  var eM = document.getElementById('cdMin');
  var eS = document.getElementById('cdSec');
  if (eM && eS) {
    setInterval(function () {
      var dif = Math.max(0, fim - Date.now());
      var m = Math.floor(dif / 60000), s = Math.floor((dif % 60000) / 1000);
      eM.textContent = String(m).padStart(2, '0');
      eS.textContent = String(s).padStart(2, '0');
      if (dif === 0) fim = Date.now() + 15 * 60 * 1000;
    }, 1000);
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-q').addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!open) item.classList.add('open');
    });
  });

  /* --- Animação de entrada (não aplicar na primeira dobra) --- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.style.opacity = 1; en.target.style.transform = 'none'; io.unobserve(en.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.step,.bcard,.review,.feature').forEach(function (el) {
    el.style.opacity = 0; el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
});
