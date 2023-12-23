$('.search-button').on('click', function () {
  
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=26faccee&s=' + $('.input-keyword').val() ,
     success: results => {
       const movies = results.Search;
       let cards = '';
       movies.forEach(m => {
         cards +=  showCards(m);
       });
       $('.movie-container').html(cards);
       
       // ketika tombol detail diklik
       $('.modal-detail-button').on('click', function (){
         $.ajax({
           url: 'http://www.omdbapi.com/?apikey=26faccee&i=' + $(this).data('imdbid'),
            success: m => {
              const movieDetail = showMovie(m);
            $('.modal-body').html(movieDetail);                   
            },
            error: (e) => {
              console.log(e.responseText);
            }
         });
       });
  
     },
     error: (e) => {
       console.log(e.responseText);
     }
   });
});





 function showCards(m) {
   return `<div class="col-md-4 my-3">
   <div class="card">
     <img src="${m.Poster}" class="card-img-top">
     <div class="card-body">
       <h5 class="card-title">${m.Title}</h5>
       <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
       <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" 
       data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
     </div>
   </div>
  </div>
  </div>`
 };
 
 
 function showMovie (m){
   return ` <div class="container-fluid">
   <div class="row">
     <div class="col-md-3">
       <img src="${m.Poster}" class="img-fluid">
     </div>
     <div class="col-md">
       <ul class="list-group">
         <li class="list-group-item">${m.Title}</li>
         <li class="list-group-item">${m.Released}</li>
         <li class="list-group-item">${m.Runtime}</li>
         <li class="list-group-item">${m.Actors}</li>
         <li class="list-group-item">PLOT : <br>${m.Plot}</li>
       </ul>
     </div>
   </div>
 </div>`
 };