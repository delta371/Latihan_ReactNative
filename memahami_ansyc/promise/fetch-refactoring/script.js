// $('.search-button').on('click', function () {
//   $.ajax({
//     url:
//       'http://www.omdbapi.com/?apikey=b6c876e6&s=' + $('.input-keyword').val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = '';
//       movies.forEach((m) => {
//         cards += showCard(m);
//       });
//       $('.movie-container').html(cards);

//       // ketika tombol detail di klik

//       $('.modal-detail-button').on('click', function () {
//         $.ajax({
//           url:
//             'http://www.omdbapi.com/?apikey=b6c876e6&i=' +
//             $(this).data('imdbid'),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);

//             $('.modal-body').html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// ?  fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
//   const inputKeyword = document.querySelector('.input-keyword');
//   fetch('http://www.omdbapi.com/?apikey=b6c876e6&s=' + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = '';
//       movies.forEach((m) => (cards += showCard(m)));
//       const movieContainer = document.querySelector('.movie-container');
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail di klik
//       // querySelectorAll buat klik banyak
//       const modalDetailButton = document.querySelectorAll(
//         '.modal-detail-button'
//       );
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener('click', function () {
//           const imdbid = this.dataset.imdbid;
//           fetch('http://www.omdbapi.com/?apikey=b6c876e6&i=' + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector('.modal-body');
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-keyword');
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

// event binding
// untuk content yang awalnya tidak ada lalu ada
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const imdbid = e.target.dataset.imdbid;
    const movieDeatail = await getMovieDetail(imdbid);
    updateUIDetail(movieDeatail);
  }
});

function getMovieDetail(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=b6c876e6&i=' + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=b6c876e6&s=' + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = '';
  movies.forEach((m) => (cards += showCard(m)));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = cards;
}

function showCard(m) {
  return `
    <div class="col-md-4 my-3">
      <div class="card">
        <img src="${m.Poster}" class="card-img-top"  alt="..." />
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h5 class="card-title">${m.Year}</h5>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
      </div>
    </div>
  </div>
    `;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md-9">
          <ul class="list-group">
              <li class="list-group-item">${m.Title} (${m.Year})</li>
              <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
              <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
              <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
              <li class="list-group-item"><strong>Plot: </strong><br> ${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}
