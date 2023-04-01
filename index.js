const moviesContainer = document.getElementById('watchlist')
const searchInput = document.getElementById('search-input')

async function getMovieIds() {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=f33d3ee8`)
    const data = await response.json()
    const movieIds = data.Search.map(movie => movie.imdbID)
    
    return movieIds
}

async function renderMovieDetails(movieIds) {
    let html = ''

    for(const id of movieIds) {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=f33d3ee8`)
        const data = await response.json()
        
        html += `
            <div class="movie-container">
                <img src="${data.Poster}"> 
                <div class="details">
                    <div class="detail-1">
                        <p>${data.Title}</p>
                        <p><span class="star-icon"></span>${data.imdbRating}</p>
                    </div>
                    <div class="detail-2">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <p><span class="plus-icon"></span>Watchlist</p>
                    </div>
                    <p>${data.Plot}</p>
                </div>
            </div>
        `
    }
    moviesContainer.innerHTML = html
}

document.getElementById('search-btn').addEventListener('click', async() => {
    try {
        const movieIds = await getMovieIds()
        renderMovieDetails(movieIds)
    } 
    catch(err) {
        moviesContainer.innerHTML = '<p>Unable to find what you’re looking for. Please try another search.</p>'
    }
    searchInput.value = ''
})