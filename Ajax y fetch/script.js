const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

const apiURL = 'https://api.lyrics.ovh';

//Busca sugerencias
function buscarCanciones(term) {
    fetch(`${apiURL}/suggest/${term}`).
        then((res) => res.json()).
        then((json) => {
            showData(json);
        });
}

//Muestra sugerencias en el DOM
function showData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
            .map(
                song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Ver letra</button>
    </li>`
            )
            .join('')}
    </ul>
  `;
}

// Encontrar letra de la canción y mostrar en DOM
function verLetra(artist, songTitle) {
    fetch(`${apiURL}/v1/${artist}/${songTitle}`).
        then((res) => res.json()).
        then((data) => {
            if (data.error) {
                result.innerHTML = data.error;
            } else {
                const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
                result.innerHTML = `
                <h2><strong>${artist}</strong> - ${songTitle}</h2>
                <span>${lyrics}</span>
            `;
            }
        });
}
// Mostrar sugerencias al hacer click en el botón
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (!searchTerm) {
        alert('Por favor ingrese un artista o canción');
    } else {
        buscarCanciones(searchTerm);
    }
});

// Mostrar letra al hacer click en el botón
result.addEventListener('click', e => {
    const document = e.target;
    if (document.tagName === 'BUTTON') {
        const artist = document.getAttribute('data-artist');
        const songTitle = document.getAttribute('data-songtitle');
        verLetra(artist, songTitle);
    }
});