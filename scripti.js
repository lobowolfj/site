document.addEventListener("DOMContentLoaded", () => {
    
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

    // --- MODAL 2: SABER MAIS ---
    const modalSaberMais = document.getElementById("modal-saber-mais");
    const btnSaberMais = document.getElementById("btn-saber-mais");
    const btnFecharSaberMais = modalSaberMais ? modalSaberMais.querySelector(".close-btn") : null;

    if (btnSaberMais && modalSaberMais) {
        btnSaberMais.addEventListener("click", () => {
            modalSaberMais.style.display = "flex";
        });
    }

    if (btnFecharSaberMais && modalSaberMais) {
        btnFecharSaberMais.addEventListener("click", () => {
            modalSaberMais.style.display = "none";
        });
    }

    // --- MODAL 3: GALERIA DE IMAGENS COM NAVEGAÇÃO ---
    const modalImagem = document.getElementById("modal-imagem");
    const imgAmpliada = document.getElementById("img-ampliada");
    const linkCreditos = document.getElementById("link-creditos");
    const btnFecharImagem = modalImagem ? modalImagem.querySelector(".close-btn") : null;
    
    // Pegando os botões de próximo e anterior
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    // Transforma a NodeList em um Array para conseguirmos saber a posição (0, 1, 2...)
    const imagensGaleria = Array.from(document.querySelectorAll(".card-img"));
    let indiceAtual = 0; // Vai guardar a posição da imagem que está aberta

    // Função que troca a foto e o link baseada no número (índice)
    function atualizarImagemModal(index) {
        const img = imagensGaleria[index];
        imgAmpliada.src = img.src;
        linkCreditos.href = img.getAttribute("data-link");
        indiceAtual = index;
    }

    if (modalImagem && imagensGaleria.length > 0) {
        // Ao clicar em qualquer imagem da galeria
        imagensGaleria.forEach((img, index) => {
            img.addEventListener("click", () => {
                atualizarImagemModal(index);
                modalImagem.style.display = "flex";
            });
        });

        // Lógica do botão "Anterior" (<)
        btnPrev.addEventListener("click", () => {
            let novoIndice = indiceAtual - 1;
            // Se passar da primeira foto, volta pra última
            if (novoIndice < 0) {
                novoIndice = imagensGaleria.length - 1;
            }
            atualizarImagemModal(novoIndice);
        });

        // Lógica do botão "Próximo" (>)
        btnNext.addEventListener("click", () => {
            let novoIndice = indiceAtual + 1;
            // Se passar da última foto, volta pra primeira
            if (novoIndice >= imagensGaleria.length) {
                novoIndice = 0;
            }
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
        if (event.target === modalSaberMais) {
            modalSaberMais.style.display = "none";
        }
        if (event.target === modalImagem) {
            modalImagem.style.display = "none";
        }
    });

    // =========================================
    // --- CÓDIGO SECRETO (EASTER EGG - nya.mp4) ---
    // =========================================
    let secretStep = 0;

    // Seleciona os elementos exatos
    const semabsTitle = document.querySelector('.logos h2');
    const linkSobre = document.querySelector('nav ul li a[href="#sobre"]');
    const linkChegar = document.querySelector('nav ul li a[href="#como-chegar"]');

    if (semabsTitle && linkSobre && linkChegar) {
        // Passo 1: Clicar em SEMABS
        semabsTitle.addEventListener('click', () => {
            secretStep = 1;
        });

        // Passo 2: Clicar em SOBRE A CASA
        linkSobre.addEventListener('click', () => {
            if (secretStep === 1) {
                secretStep = 2;
            } else {
                secretStep = 0; // Errou a sequência, zera
            }
        });

        // Passo 3: Clicar em COMO CHEGAR
        linkChegar.addEventListener('click', (e) => {
            if (secretStep === 2) {
                secretStep = 0; // Zera para a próxima vez
                
                // Cancela o "descer a tela" apenas se o segredo for ativado
                e.preventDefault();

                // Cria a tela preta com o vídeo
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

                // Cria o elemento de vídeo
                const vid = document.createElement('video');
                vid.src = 'nya.mp4';
                vid.controls = true;
                vid.autoplay = true;
                vid.style.maxWidth = '100%';
                vid.style.maxHeight = '100%';
                vid.style.boxShadow = '0 0 50px rgba(0,0,0,0.8)';

                // Botão de fechar o vídeo
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
                // Se a sequência não foi feita, age como um link normal e desce a página
                secretStep = 0;
            }
        });
    }

});