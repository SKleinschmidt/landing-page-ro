emailjs.init("F7YCU-SOPvTy__WmQ");

  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_zojgfxa", "template_99ljqf4", this)
      .then(() => {
        alert("Email enviado com sucesso!");
        this.reset(); // ✅ limpa os campos após o envio
      })
      .catch((err) => {
        console.error("Erro:", err);
        alert("Erro ao enviar. Veja o console para detalhes.");
      });
  });

  // Carregar Serviços Dinamicamente
function loadServices() {
    const serviceSection = document.querySelector('.services-section .row');
    serviceSection.innerHTML = '';
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="service-card">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `;
        serviceSection.appendChild(card);
    });
}

window.addEventListener('storage', () => {
    loadServices();
    loadCarousel();
});

// Carregar Carrossel Dinamicamente
function loadCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';
    const carousel = JSON.parse(localStorage.getItem('carousel') || '[]');
    carousel.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <img src="${item.image}" class="d-block w-100" alt="Imagem do carrossel">
            <div class="carousel-caption d-none d-md-block">
                <h5>${item.caption || ''}</h5>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    loadCarousel();
});
 



  








  
    