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