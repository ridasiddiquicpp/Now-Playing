//const API_LINK = "https://api.themoviedb.org/3/discover/movie?sort-by=popularity.desc&api_key=118a416e242696514bbe44e8675550a1&page=1";
//link for all trending movies to be used for the main screen:
const API_LINK = "https://api.themoviedb.org/3/trending/all/week?api_key=118a416e242696514bbe44e8675550a1&page=1language=en-US";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
//const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?&api_key=118a416e242696514bbe44e8675550a1&page=1language=en-US&query=";
//const SEARCH_TV_API = "https://api.themoviedb.org/3/search/tv?&api_key=118a416e242696514bbe44e8675550a1&query=";
const SEARCH_API = "https://api.themoviedb.org/3/search/multi?&api_key=118a416e242696514bbe44e8675550a1&query="
const WATCH_PROVIDER_LINK_1 = "https://api.themoviedb.org/3/movie/";
const WATCH_PROVIDER_LINK_2 = "/watch/providers?api_key=118a416e242696514bbe44e8675550a1";
const WATCH_PROVIDER_LINK_TV_1 = "https://api.themoviedb.org/3/tv/";

//const WATCH_PROVIDER_LINK = "https://api.themoviedb.org/3/movie/watch/providers?api_key=118a416e242696514bbe44e8675550a1&query=557";
//{movie id}



//const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?&api_key=118a416e242696514bbe44e8675550a1&query=";


//The things lefts to do:
//make sure movies shown have images, if not put something in its place, also make sure there are 4 on each line

//possibly take out undefined things
//get api calls tv and movie to work at same tim for search
//close buttons are commented out

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const dialog_popup = document.getElementById("popup");
const dialog_logo = document.getElementById("logo");
const home_link = document.getElementById("active");



returnMovies(API_LINK);

//dont understand how this works:
function returnMovies(url) {
/*
    const urls = [SEARCH_MOVIE_API, SEARCH_TV_API];
    Promise.all(fetch(url))/*(urls.map(url => fetch(url)))
    .then(responses =>
        Promise.all(responses.map(r=> r.json())))
    .then(function(data) {
        console.log(data);
        data.results.forEach(element =>
*/
/*
const urls = [SEARCH_MOVIE_API, SEARCH_TV_API];
    Promise.all((urls.map(url => fetch(url))))
    .then(r=> Promise.all(r.json()))
    .then(function(data) {
        console.log(data);
        data.results.forEach(element =>
*/

    fetch(url).then(res => res.json())
    .then(function(data) {
        console.log(data.results);

        data.results.sort(({poster_path: a}, {poster_path: b}) => (a === null) - (b === null) || a-b);
        data.results.forEach(element => 
            {
            //make sure the data is only either a movie or tv
            if (element.media_type === "movie" || element.media_type === "tv"){
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');
                
                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');
                
                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');
                
                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');
                
                const title = document.createElement('h3');
                title.setAttribute('id', 'title');
                
                const button = document.createElement('button');
                button.setAttribute('id', 'imageButton')

                const center = document.createElement('center'); 

                title.innerHTML = element.title;
                date = element.release_date;
                
                //Determine if it a movie or a show
                if (element.media_type === "movie") {
                    title.innerHTML = element.title;
                    //`${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
                    date = element.release_date;
                }
                else if (element.media_type === "tv") {
                    title.innerHTML = element.name;
                    date = element.first_air_date;
                }
            
                ID = element.id;
                overview = element.overview;
                
                if (element.poster_path == null){
                    image.src = "https://t3.ftcdn.net/jpg/04/30/52/02/360_F_430520267_KU9Qni1U5d0ysTu5OjN0MWjMrE4vmorx.jpg"
                }
                else {
                    image.src = IMG_PATH + element.poster_path;
                }

                button.appendChild(image);
                center.appendChild(button);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                main.appendChild(div_row);

                button.onclick = openWindow.bind(this, title.innerHTML, date, overview, element.poster_path, element.media_type, ID);
            }
        });
    });
}

//not completely sure how this works either:
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const searchItem = search.value;
    if (searchItem) {
        returnMovies(SEARCH_API + searchItem);
        //returnMovies(SEARCH_TV_API + searchItem)
        search.value = "";
    }
})

function returnProviders(url) {
    fetch(url).then(res => res.json())
    .then(function(data) {
        console.log(data.results);
        [data.results].forEach(element => 
            {
                const div_logo = document.createElement('div');
                div_logo.setAttribute('id', 'div_logo');
                //const close_button = document.createElement("button");
                //close_button.setAttribute('class', 'closeButton');
                //close_button.innerText = "close";
                //div_logo.appendChild(close_button);
                //check if there is any services available for it if not then
               
            if (element.US){
              if (element.US.flatrate) {
                const flatrate_title = document.createElement('h3');
                flatrate_title.setAttribute('id', 'flat_title');
                flatrate_title.innerText = "Stream:"
                div_logo.appendChild(flatrate_title);
                for (let f=0; f < element.US.flatrate.length; f++) {
                    logo_path = element.US.flatrate[f].logo_path;
                    logo_title = element.US.flatrate[f].provider_name;
                    const logo_image = document.createElement('img');
                    logo_image.setAttribute('class', 'logo_image');
                    logo_image.src = IMG_PATH + logo_path; 
                    logo_image.title = logo_title; 
                    div_logo.appendChild(logo_image)
                }
              }  

            if (element.US.buy && element.US.rent) {
                const buy_rent_title = document.createElement('h3');
                buy_rent_title.setAttribute('id', 'buy_rent_title');
                buy_rent_title.innerText = "Buy or Rent:"
                div_logo.appendChild(buy_rent_title);
                
                
                //find common and diff items so buy and rent can be displayed together, since most movies/tv have the same buy/rent services
                const commonItems = element.US.rent.filter(({provider_id}) => element.US.buy.some((e) => e.provider_id === provider_id))
                const diffItems = element.US.rent.filter(({provider_id}) => !element.US.buy.some((e) => e.provider_id === provider_id))
                
                const merged_providers = commonItems.concat(diffItems);
                //console.log("merged")
                //console.log(merged_providers)
                //console.log("common")
                //console.log(commonItems);
                //console.log("diff")
                //console.log(diffItems);
            
                for (let m=0; m < merged_providers.length; m++) {
                    logo_path = merged_providers[m].logo_path;
                    logo_title = merged_providers[m].provider_name;
                    const logo_image = document.createElement('img');
                    logo_image.setAttribute('class', 'logo_image');
                    logo_image.src = IMG_PATH + logo_path;
                    logo_image.title = logo_title; 
                    div_logo.appendChild(logo_image)
                }
            }

            else if (element.US.buy || element.US.rent) {
                if (element.US.rent) {
                    const rent_title = document.createElement('h3');
                    rent_title.setAttribute('id', 'rent_title');
                    rent_title.innerText = "Rent:"
                    div_logo.appendChild(rent_title);
                    for (let r=0; r < element.US.rent.length; r++) {
                        logo_path = element.US.rent[r].logo_path;
                        logo_title = element.US.rent[r].provider_name;
                        const logo_image = document.createElement('img');
                        logo_image.setAttribute('class', 'logo_image');
                        logo_image.src = IMG_PATH + logo_path; 
                        logo_image.title = logo_title;
                        div_logo.appendChild(logo_image)
                    }
                }
                if (element.US.buy) {
                    const buy_title = document.createElement('h3');
                    buy_title.setAttribute('id', 'buy_title');
                    buy_title.innerText = "Buy:"
                    div_logo.appendChild(buy_title);
                    for (let b=0; b < element.US.buy.length; b++) {
                        logo_path = element.US.buy[b].logo_path;
                        logo_title = element.US.buy[b].provider_name;
                        const logo_image = document.createElement('img');
                        logo_image.setAttribute('class', 'logo_image');
                        logo_image.src = IMG_PATH + logo_path; 
                        logo_image.title = logo_title;
                        div_logo.appendChild(logo_image)
                    }
                } 
            }

        }
        else {
            const none_title = document.createElement('h3');
                none_title.setAttribute('id', 'none_title');
                none_title.innerText = "No services available."
                div_logo.appendChild(none_title);
        }
               
                dialog_logo.appendChild(div_logo);
                dialog_logo.showModal();
                //close_button.onclick = closeWatchWindow;
        
                window.onclick = function(event) {
                    if (event.target == dialog_logo) {
                      closeWatchWindow();
                    }
                  }
            //title.innerHTML = element.title;
            //date = element.release_date;
            
        });
    });
    }
    

function openWindow(title, date, overviewInfo, poster_path, media_type, ID) {
    
    const div_popup = document.createElement("div");
    div_popup.setAttribute('id', 'div_popup');

    //const close_button = document.createElement("button");
    //close_button.setAttribute('class', 'closeButton');

    const movie_image = document.createElement('img');
    movie_image.setAttribute('id', 'movie_image');
            
    const popup_title = document.createElement("h2");
    popup_title.setAttribute('id', 'popupTitle');

    const release = document.createElement("h3");
    release.setAttribute('id', 'release');

    const release_text = document.createElement("p");
    release_text.setAttribute('id', 'movieRelease');

    const overview = document.createElement("h3");
    overview.setAttribute('class', 'text');

    const overview_text = document.createElement("p");
    overview_text.setAttribute('id', 'movieInfo');

    const review_button = document.createElement("button");
    review_button.setAttribute('id', 'watchButton');

    const watch_button = document.createElement("button");
    watch_button.setAttribute('id', 'watchButton');

    movie_image.src = IMG_PATH + poster_path; 
 //  image.src = IMG_PATH + element.poster_path;

    //close_button.innerText = "close";
    review_button.innerHTML = "Reviews"
    watch_button.innerText = "Where to Watch"
    popup_title.innerText = title;
    
    if (media_type === "movie"){
        release.innerText = "Release Date: ";
    }
    else if (media_type === "tv"){
        release.innerText = "First Air Date: ";
    }
    
    //release.innerText = "Release Date: ";
    release_text.innerText = date;
    overview.innerText = "Overview: "
    overview_text.innerText = overviewInfo;
            
    //image.src = IMG_PATH + element.poster_path;

   // div_popup.appendChild(close_button);
    div_popup.appendChild(movie_image);
    div_popup.appendChild(popup_title);
    div_popup.appendChild(release);
    div_popup.appendChild(release_text);
    div_popup.appendChild(overview);
    div_popup.appendChild(overview_text);
    div_popup.appendChild(review_button);
    div_popup.appendChild(watch_button);

    dialog_popup.appendChild(div_popup);
    dialog_popup.showModal();

    window.onclick = function(event) {
        if (event.target == dialog_popup) {
          closeWindow();
        }
      }
    //close_button.onclick = closeWindow;
    watch_button.onclick = watchWindow.bind(this,ID, media_type);

    review_button.onclick = function() {
        location.href = `movie.html?id=${ID}&title=${title}`
    }
    
    //delete the info after it appears

/*
    popup = document.getElementById("popup");
    popupTitle.innerText = title;
    movieInfo.innerText = overview;
    movieRelease.innerText = date;
    popup.showModal();
    closeButton.onclick = closeWindow;
    */
}

dialog_popup.addEventListener('cancel', (e) => {
    e.preventDefault();
});

// what is this:
main.addEventListener('keypress', (e) => {
    void(0);
}); 


function closeWindow() {
    dialog_popup.close()
    dialog_popup.removeChild(div_popup);
}

function closeWatchWindow() {
    dialog_logo.close();
    dialog_logo.removeChild(div_logo);
    
}

function watchWindow(ID, media_type) {
    console.log(ID)
    console.log(media_type)

    if (media_type === "movie"){
        returnProviders(WATCH_PROVIDER_LINK_1 + ID + WATCH_PROVIDER_LINK_2);
    }
    else if (media_type === "tv"){
        returnProviders(WATCH_PROVIDER_LINK_TV_1 + ID + WATCH_PROVIDER_LINK_2);
    }
    //returnProviders(WATCH_PROVIDER_LINK_1 + ID + WATCH_PROVIDER_LINK_2);
    dialog_popup.close();
    dialog_popup.removeChild(div_popup);
   
    
}

