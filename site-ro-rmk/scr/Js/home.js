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

  // Fecha a barra superior ao clicar no botão ×

  document.addEventListener('DOMContentLoaded', function () {
  const closeBtn = document.getElementById('closeBanner');
  const banner = document.querySelector('.top-banner');

  if (closeBtn && banner) {
    closeBtn.addEventListener('click', function () {
      banner.style.display= 'none';
      document.body.style.paddingTop = '0';
    });
  }
});







  
    