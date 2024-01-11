//const API_LINK = "https://api.themoviedb.org/3/discover/movie?sort-by=popularity.desc&api_key=118a416e242696514bbe44e8675550a1&page=1";
//link for all trending movies to be used for the main screen:
const API_LINK = "http://localhost:8000/api/v1/reviews/";

//const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
//const SEARCH_API = "https://api.themoviedb.org/3/search/multi?&api_key=118a416e242696514bbe44e8675550a1&query="
//const WATCH_PROVIDER_LINK_1 = "https://api.themoviedb.org/3/movie/";
//const WATCH_PROVIDER_LINK_2 = "/watch/providers?api_key=118a416e242696514bbe44e8675550a1";
//const WATCH_PROVIDER_LINK_TV_1 = "https://api.themoviedb.org/3/tv/";

const url = new URL(location.href);
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")


//The things lefts to do:
//possibly take out undefined things


const main = document.getElementById("section");
const title = document.getElementById("title");
title.innerText = movieTitle;


const div_new = document.createElement('div');

    div_new.innerHTML = `
        <div class="row">
        <div class="column">
            <div class="review_card">
                <h3>ADD REVIEW<h3>
                <p><strong>Review: </strong></p>
                <input type="text" class= "review_input_box" id="new_review" value="">
                
                <p><strong>User: </strong></p>
                <input type="text" class = "review_input_box" id = "new_user" value= "">
                
                <p>
                    <a href="#" onclick="saveReview('new_review', 'new_user')">save</a> 
                </p>
            </div>
        </div>
    </div>
`

    main.appendChild(div_new);

returnReviews(API_LINK);

//dont understand how this works:
function returnReviews(url) {
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data) {
        console.log(data);
        //data.sort(({poster_path: a}, {poster_path: b}) => (a === null) - (b === null) || a-b);
        data.forEach(review => 
            {
                const div_card = document.createElement('div');

                div_card.innerHTML = `
                <div class="row">
                <div class="column">
                    <div class="review_card" id="${review._id}">
                        <p><strong>User: </strong>${review.user}</p>
                        <p><strong>Review: </strong></p>
                        <p class="review_style">${review.review}</p>
                        <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">edit</a> 
                            <a href="#" onclick="deleteReview('${review._id}')">delete</a></p>
                    </div>
                </div>
            </div>
            `

          
                main.appendChild(div_card);
                //button.onclick = openWindow.bind(this, title.innerHTML, date, overview, element.poster_path, element.media_type, ID);
        });
    });
}

function editReview(id, review, user) {
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
    <p><strong>Review: </strong>
            <input type="text" class= "review_input_box" id = "${reviewInputId}" value="${review}">
    </p>
    <p><strong>User: </strong>
            <input type="text" class = "review_input_box" id = "${userInputId}" value="${user}">
    </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">save</a> 
    </p>`
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    //if there is an id, means editing a previous review
    if (id) {
        fetch(API_LINK + id,  {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    }
    else { //if no id, means we are creating new review
        fetch(API_LINK + "new",  {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });
    }
    
}

function deleteReview(id) {
    fetch (API_LINK + id, {
        method: 'DELETE'
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload();
        });
}








