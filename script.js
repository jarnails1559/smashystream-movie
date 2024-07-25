const omdbApiKey = '75d05bec';

function searchMovie() {
    const query = document.getElementById('searchQuery').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const searchUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${encodeURIComponent(query)}&type=movie&r=json`;
    console.log('Fetching data from:', searchUrl); // Log the URL

    fetch(searchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Log received data
            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                alert('No results found.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(movies) {
    const resultDiv = document.getElementById('searchResult');
    resultDiv.innerHTML = '';

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie-item';
        movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <h2>${movie.Title}</h2>
            <button onclick="playMovie('${movie.imdbID}')">Play</button>
        `;
        resultDiv.appendChild(movieDiv);
    });
}

function playMovie(movieId) {
    const streamUrl = `https://player.smashy.stream/movie/${movieId}?s=1&e=1`;
    console.log('Setting stream URL:', streamUrl); // Log the URL
    document.getElementById('streamFrame').src = streamUrl;
    document.getElementById('movieModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
    document.getElementById('streamFrame').src = '';
}
