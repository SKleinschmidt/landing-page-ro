// Credenciais de login (apenas para demonstração)
        const adminCredentials = { username: "admin", password: "12345" };

        // Login
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === adminCredentials.username && password === adminCredentials.password) {
                document.getElementById('login-section').classList.add('d-none');
                document.getElementById('admin-panel').classList.remove('d-none');
                loadDashboard();
            } else {
                alert('Usuário ou senha inválidos!');
            }
        });

        // Logout
        document.getElementById('logout').addEventListener('click', function() {
            document.getElementById('login-section').classList.remove('d-none');
            document.getElementById('admin-panel').classList.add('d-none');
            document.getElementById('loginForm').reset();
        });

        // Alternar Sidebar
        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('full-width');
        }

        // Navegação
       document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.section').forEach(section => section.classList.add('d-none'));
                document.getElementById(this.dataset.section).classList.remove('d-none');
                if (this.dataset.section === 'services') loadServices();
                if (this.dataset.section === 'carousel') loadCarousel();
                if (this.dataset.section === 'contacts') loadContacts();
                if (this.dataset.section === 'tandem') loadTandem();
                if (this.dataset.section === 'faq') loadFaq();
                if (this.dataset.section === 'dashboard') loadDashboard();
                if (window.innerWidth <= 768) toggleSidebar();
            });
        });

        // Carregar Dashboard
        function loadDashboard() {
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            const services = JSON.parse(localStorage.getItem('services') || '[]');
            const carousel = JSON.parse(localStorage.getItem('carousel') || '[]');
            document.getElementById('total-messages').textContent = contacts.length;
            document.getElementById('total-services').textContent = services.length;
            document.getElementById('total-carousel').textContent = carousel.length;
        }

        // Carregar Serviços
        function loadServices() {
            const serviceList = document.getElementById('serviceList');
            const servicePreview = document.getElementById('servicePreview');
            serviceList.innerHTML = '';
            servicePreview.innerHTML = '';
            const services = JSON.parse(localStorage.getItem('services') || '[]');
            if (services.length === 0) {
                services.push(
                    { title: "Análise de Campanhas", description: "Monitoramos e otimizamos suas campanhas para maximizar o ROI, com relatórios detalhados e insights estratégicos." },
                    { title: "Postagens no Facebook", description: "Criamos conteúdo envolvente e estratégias personalizadas para engajar sua audiência no Facebook." },
                    { title: "Postagens no Instagram", description: "Desenvolvemos posts visuais e estratégias de hashtags para aumentar sua visibilidade e engajamento no Instagram." }
                );
                localStorage.setItem('services', JSON.stringify(services));
            }
            services.forEach((service, index) => {
                const card = document.createElement('div');
                card.className = 'col mb-3';
                card.innerHTML = `
                    <div class="card shadow">
                        <div class="card-body">
                            <h5 class="card-title">${service.title}</h5>
                            <p class="card-text">${service.description}</p>
                            <button class="btn btn-primary btn-sm me-2" onclick="editService(${index})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteService(${index})">Excluir</button>
                        </div>
                    </div>
                `;
                serviceList.appendChild(card);
                const preview = document.createElement('div');
                preview.className = 'preview-card';
                preview.innerHTML = `
                    <h6>Serviço ${index + 1}</h6>
                    <p><strong>Título:</strong> ${service.title}</p>
                    <p><strong>Descrição:</strong> ${service.description}</p>
                `;
                servicePreview.appendChild(preview);
            });
            document.getElementById('serviceForm').onsubmit = function(e) {
                e.preventDefault();
                const title = document.getElementById('serviceTitle').value;
                const description = document.getElementById('serviceDescription').value;
                if (editIndex !== null) {
                    services[editIndex] = { title, description };
                    editIndex = null;
                } else {
                    services.push({ title, description });
                }
                localStorage.setItem('services', JSON.stringify(services));
                loadServices();
                this.reset();
            };
        }

        let editIndex = null;

        function editService(index) {
            const services = JSON.parse(localStorage.getItem('services') || '[]');
            const service = services[index];
            document.getElementById('serviceTitle').value = service.title;
            document.getElementById('serviceDescription').value = service.description;
            editIndex = index;
        }

        // Excluir Serviço
        function deleteService(index) {
            const services = JSON.parse(localStorage.getItem('services') || '[]');
            services.splice(index, 1);
            localStorage.setItem('services', JSON.stringify(services));
            loadServices();
        }

        // Carregar Imagens do Carrossel
        function loadCarousel() {
            const carouselList = document.getElementById('carouselList');
            const carouselPreview = document.getElementById('carouselPreview');
            carouselList.innerHTML = '';
            carouselPreview.innerHTML = '';
            const carousel = JSON.parse(localStorage.getItem('carousel') || '[]');
            if (carousel.length === 0) {
                carousel.push(
                    { image: "../../img/marketing-digital-1.jpg", caption: "" },
                    { image: "../../img/marketing-digital-22.01.21.jpg", caption: "" },
                    { image: "../../img/marketing_digital.jpg", caption: "" }
                );
                localStorage.setItem('carousel', JSON.stringify(carousel));
            }
            carousel.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'col mb-3';
                card.innerHTML = `
                    <div class="card shadow">
                        <img src="${item.image}" class="card-img-top" alt="Imagem do carrossel" style="height: 150px; object-fit: cover;">
                        <div class="card-body">
                            <p class="card-text">${item.caption || 'Sem legenda'}</p>
                            <button class="btn btn-primary btn-sm me-2" onclick="editCarousel(${index})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteCarousel(${index})">Excluir</button>
                        </div>
                    </div>
                `;
                carouselList.appendChild(card);
                const preview = document.createElement('div');
                preview.className = 'preview-card';
                preview.innerHTML = `
                    <h6>Imagem ${index + 1}</h6>
                    <img src="${item.image}" alt="Pré-visualização" class="preview-image">
                    <p><strong>Legenda:</strong> ${item.caption || 'Sem legenda'}</p>
                `;
                carouselPreview.appendChild(preview);
            });
            document.getElementById('carouselForm').onsubmit = function(e) {
                e.preventDefault();
                const action = document.querySelector('input[name="carouselAction"]:checked').value;
                const caption = document.getElementById('carouselCaption').value;
                let image = document.getElementById('carouselImage').value;
                const fileInput = document.getElementById('carouselImageUpload');
                if (fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
        resizeImage(e.target.result, 800, function(resizedImage) {
            image = resizedImage;
            saveCarouselImage(action, image, caption);
        });
    };
    reader.readAsDataURL(fileInput.files[0]);
} else {
    saveCarouselImage(action, image, caption);
}

            };
        }

        let editCarouselIndex = null;

        function editCarousel(index) {
            const carousel = JSON.parse(localStorage.getItem('carousel') || '[]');
            const item = carousel[index];
            document.getElementById('carouselImage').value = item.image;
            document.getElementById('carouselCaption').value = item.caption;
            document.getElementById('editImage').checked = true;
            editCarouselIndex = index;
        }

        function saveCarouselImage(action, image, caption) {
            const carousel = JSON.parse(localStorage.getItem('carousel') || '[]');
            if (action === 'edit' && editCarouselIndex !== null) {
                carousel[editCarouselIndex] = { image, caption };
                editCarouselIndex = null;
            } else {
                carousel.push({ image, caption });
            }
            localStorage.setItem('carousel', JSON.stringify(carousel));
            loadCarousel();
            document.getElementById('carouselForm').reset();
        }

        // Excluir Imagem do Carrossel
        function deleteCarousel(index) {
            const carousel = JSON.parse(localStorage.getItem('carousel') || '[]');
            carousel.splice(index, 1);
            localStorage.setItem('carousel', JSON.stringify(carousel));
            loadCarousel();

            
        }

        // Carregar Contatos
        function loadContacts() {
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.forEach((contact, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.name || 'Não informado'}</td>
                    <td>${contact.phone || 'Não informado'}</td>
                    <td>${contact.instagram || 'Não informado'}</td>
                    <td>${contact.email || 'Não informado'}</td>
                    <td>${contact.message || 'Não informado'}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Excluir</button></td>
                `;
                contactList.appendChild(row);
            });
        }

        // Excluir Contato
        function deleteContact(index) {
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            loadContacts();
        }

        // Carregar Tandem
        function loadTandem() {
            const whoIsRobertaPreview = document.getElementById('whoIsRobertaPreview');
            whoIsRobertaPreview.innerHTML = '';
            let whoIsRobertaData = JSON.parse(localStorage.getItem('whoIsRoberta') || '{}');
            if (!whoIsRobertaData.content || !whoIsRobertaData.image) {
                whoIsRobertaData = {
                    content: "Sou uma especialista em Marketing Digital com mais de 5 anos de experiência, dedicada a ajudar empresas a crescerem online. Apaixonada por estratégias de conteúdo, análise de dados e engajamento nas redes sociais, trabalho para transformar sua marca em um sucesso digital!",
                    image: "../../img/Ro2 2025-07-20 at 23.40.19.png"
                };
                localStorage.setItem('whoIsRoberta', JSON.stringify(whoIsRobertaData));
            }
            whoIsRobertaPreview.innerHTML = `
                <img src="${whoIsRobertaData.image}" alt="Roberta" class="preview-image">
                <p>${whoIsRobertaData.content}</p>
            `;

            document.getElementById('whoIsRobertaForm').onsubmit = function(e) {
                e.preventDefault();
                const content = document.getElementById('whoIsRobertaContent').value;
                let image = document.getElementById('whoIsRobertaImage').value;
                const fileInput = document.getElementById('whoIsRobertaImageUpload');
                if (fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        image = e.target.result;
                        saveWhoIsRoberta(content, image);
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                } else {
                    saveWhoIsRoberta(content, image);
                }
            };
        }

        function saveWhoIsRoberta(content, image) {
            const whoIsRobertaData = JSON.parse(localStorage.getItem('whoIsRoberta') || '{}');
            whoIsRobertaData.content = content;
            if (image) whoIsRobertaData.image = image;
            localStorage.setItem('whoIsRoberta', JSON.stringify(whoIsRobertaData));
            loadTandem();
            document.getElementById('whoIsRobertaForm').reset();
        }

        // Carregar Perguntas Frequentes

        function loadFaq() {
            const faqPreview = document.getElementById('faqPreview');
            faqPreview.innerHTML = '';
            let faq = localStorage.getItem('faq');
            if (!faq) {
                faq = "1. Qual é o prazo para campanhas? Geralmente, 30 dias.\n2. Oferecemos suporte 24/7? Sim, via e-mail.";
                localStorage.setItem('faq', faq);
            }
            faqPreview.innerHTML = `<p>${faq.replace(/\n/g, '<br>')}</p>`;

            document.getElementById('faqForm').onsubmit = function(e) {
                e.preventDefault();
                const content = document.getElementById('faqContent').value;
                localStorage.setItem('faq', content);
                loadFaq();
                this.reset();
            };
        }

        function resizeImage(base64Str, maxWidth = 800, callback) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% qualidade
        callback(resizedBase64);
    };
    img.src = base64Str;
}
