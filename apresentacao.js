const flores = JSON.parse(localStorage.getItem('flores')) || [];
        const catalogo = document.getElementById('catalogo');

        if (flores.length === 0) {
            catalogo.innerHTML = '<p>Nenhuma flor cadastrada.</p>';
        } else {
            flores.forEach(flor => {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${flor.imagemUrl || 'https://placehold.co/200x200'}" alt="Imagem de ${flor.nomeComum}" onerror="this.src='https://placehold.co/200x200?text=Sem+Imagem'">
                    <h2>${flor.nomeComum}</h2>
                    <p><strong>Nome Científico:</strong> ${flor.nomeCientifico}</p>
                    <p><strong>Cor:</strong> ${flor.cor}</p>
                    <p><strong>Tamanho:</strong> ${flor.tamanho}</p>
                    <p><strong>Preço:</strong> R$ ${parseFloat(flor.preco).toFixed(2)}</p>
                `;

                catalogo.appendChild(card);
            });
        }