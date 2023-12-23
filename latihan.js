$('.search-button').on('click', function(){
  
  $.ajax({
    url: 'http://www.omdbapi.com/?i=tt3896198&apikey=26faccee&s=' + $('.input-keyword').val(),
    success: result => {
      const movie = result.Search;
       let cards = '';
       movie.forEach(m => 
        cards += showcards(m)
        );
        $('.movie-container').html(cards);
        
        //ketika tombol show detail di klik
        $('.modal-detail-button').on('click', function() {
          $.ajax({
            url: 'http://www.omdbapi.com/?apikey=26faccee&i=' + $(this).data('imdbid'),
            success: m => {
              const movieDetail = showmovie(m);
            $('.modal-body').html(movieDetail);
            },
            error: e => console.log(e.responseText)
          });
  
  
        });
  
    },
    error: e => console.log(e.responseText)
  });

})




function showcards(m) {
  return `<div class="col-md-3 my-2">
  <div class="card">
    <img src="${m.Poster}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${m.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
      <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
      data-target="#moviedetailmodal" data-imdbid = "${m.imdbID}">show details</a>
    </div>
  </div>
</div>`
};


function showmovie(m) {
return `<div class="container-fluid">
<div class="row">
  <div class="col-md-4">
    <img src="${m.Poster}" class="img-fluid">
  </div>
  <div class="col-md">
   <ul class="list-group list-group-flush">
     <li class="list-group-item">${m.Title}</li>
     <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
     <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
     <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
     <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
   </ul>
  </div>
</div>
</div>`
}
