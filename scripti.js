document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DE ABERTURA ---
    const btnSaberMais = document.getElementById("btn-saber-mais");
    const conteudoPrincipal = document.getElementById("conteudo-principal");
    const heroSection = document.getElementById("hero-section");
    const cabecalho = document.getElementById("cabecalho-principal");

    if (btnSaberMais) {
        btnSaberMais.addEventListener("click", () => {
            
            // 1. Já prepara o conteúdo de baixo para aparecer
            cabecalho.classList.add("visivel");
            conteudoPrincipal.style.display = "block";
            
            // Um pequeno atraso pro navegador entender que ele apareceu antes de subir a opacidade
            setTimeout(() => {
                conteudoPrincipal.style.opacity = "1";
            }, 10);

            // 2. Aciona a animação da Capa (faz ela encolher para height: 0 e sumir o texto)
            heroSection.classList.add("aberto");

            // 3. Quando a animação acabar (0.8s), fazemos ela DEIXAR DE EXISTIR na página
            setTimeout(() => {
                heroSection.style.display = "none"; 
                // Dá um rolinho suave garantindo que estamos no topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);

        });
    }

    // --- MODAL 1: CONHECER A HISTÓRIA ---
    const modalHistoria = document.getElementById("modal-historia");
    const btnHistoria = document.getElementById("btn-historia");
    const btnFecharHistoria = modalHistoria ? modalHistoria.querySelector(".close-btn") : null;

    if (btnHistoria && modalHistoria) {
        btnHistoria.addEventListener("click", () => {
            modalHistoria.style.display = "flex";
        });
    }

    if (btnFecharHistoria && modalHistoria) {
        btnFecharHistoria.addEventListener("click", () => {
            modalHistoria.style.display = "none";
        });
    }

    // --- MODAL 3: GALERIA DE IMAGENS COM NAVEGAÇÃO ---
    const modalImagem = document.getElementById("modal-imagem");
    const imgAmpliada = document.getElementById("img-ampliada");
    const linkCreditos = document.getElementById("link-creditos");
    const btnFecharImagem = modalImagem ? modalImagem.querySelector(".close-btn") : null;
    
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    const imagensGaleria = Array.from(document.querySelectorAll(".card-img"));
    let indiceAtual = 0; 

    function atualizarImagemModal(index) {
        const img = imagensGaleria[index];
        imgAmpliada.src = img.src;
        linkCreditos.href = img.getAttribute("data-link");
        indiceAtual = index;
    }

    if (modalImagem && imagensGaleria.length > 0) {
        imagensGaleria.forEach((img, index) => {
            img.addEventListener("click", () => {
                atualizarImagemModal(index);
                modalImagem.style.display = "flex";
            });
        });

        btnPrev.addEventListener("click", () => {
            let novoIndice = indiceAtual - 1;
            if (novoIndice < 0) { novoIndice = imagensGaleria.length - 1; }
            atualizarImagemModal(novoIndice);
        });

        btnNext.addEventListener("click", () => {
            let novoIndice = indiceAtual + 1;
            if (novoIndice >= imagensGaleria.length) { novoIndice = 0; }
            atualizarImagemModal(novoIndice);
        });
    }

    if (btnFecharImagem && modalImagem) {
        btnFecharImagem.addEventListener("click", () => {
            modalImagem.style.display = "none";
        });
    }

    // --- FECHAR CLICANDO FORA ---
    window.addEventListener("click", (event) => {
        if (event.target === modalHistoria) {
            modalHistoria.style.display = "none";
        }
        if (event.target === modalImagem) {
            modalImagem.style.display = "none";
        }
    });

    // =========================================
    // --- CÓDIGO SECRETO (EASTER EGG - nya.mp4) ---
    // =========================================
    let secretStep = 0;

    const semabsTitle = document.querySelector('.logos h2');
    const linkSobre = document.querySelector('nav ul li a[href="#sobre"]');
    const linkChegar = document.querySelector('nav ul li a[href="#como-chegar"]');

    if (semabsTitle && linkSobre && linkChegar) {
        semabsTitle.addEventListener('click', () => {
            secretStep = 1;
        });

        linkSobre.addEventListener('click', () => {
            if (secretStep === 1) {
                secretStep = 2;
            } else {
                secretStep = 0; 
            }
        });

        linkChegar.addEventListener('click', (e) => {
            if (secretStep === 2) {
                secretStep = 0; 
                e.preventDefault();

                const videoOverlay = document.createElement('div');
                videoOverlay.style.position = 'fixed';
                videoOverlay.style.top = '0';
                videoOverlay.style.left = '0';
                videoOverlay.style.width = '100vw';
                videoOverlay.style.height = '100vh';
                videoOverlay.style.backgroundColor = '#000';
                videoOverlay.style.zIndex = '999999';
                videoOverlay.style.display = 'flex';
                videoOverlay.style.alignItems = 'center';
                videoOverlay.style.justifyContent = 'center';

                const vid = document.createElement('video');
                vid.src = 'nya.mp4';
                vid.controls = true;
                vid.autoplay = true;
                vid.style.maxWidth = '100%';
                vid.style.maxHeight = '100%';
                vid.style.boxShadow = '0 0 50px rgba(0,0,0,0.8)';

                const closeBtn = document.createElement('span');
                closeBtn.innerHTML = '×';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '20px';
                closeBtn.style.right = '30px';
                closeBtn.style.fontSize = '50px';
                closeBtn.style.color = '#fff';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.zIndex = '1000000';
                closeBtn.style.fontFamily = 'Arial, sans-serif';

                closeBtn.onclick = () => {
                    document.body.removeChild(videoOverlay);
                };

                videoOverlay.appendChild(closeBtn);
                videoOverlay.appendChild(vid);
                document.body.appendChild(videoOverlay);
            } else {
                secretStep = 0;
            }
        });
    }

});