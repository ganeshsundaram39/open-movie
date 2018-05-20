import { formatUrl } from "./base";

// single card html
const listItemHTML = single => {
    return `<div class="col-sm-5">
                         <div class="card text-center">
                            <img class="card-img-top" src="${
                                single.Poster !== "N/A"
                                    ? formatUrl(single.Poster)
                                    : "./img/not-available.jpg"
                            }" alt="${single.Title.toLowerCase()}"  onerror="this.onerror=null; this.src='./img/not-available.jpg'">
                            <div class="card-body">
                                <h5 class="card-title">${single.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted"><span class="year">(${
                                    single.Year
                                })</span>
                                <span class="type">(${single.Type})</span></h6>
                                <a href="#${
                                    single.imdbID
                                }" class="btn btn-dark">More Info</a>
                             </div>
                        </div>
                    </div>`;
};

// loops through each search results
export const renderSearchList = searchResults => {
    // map through each search results and get the html
    // finally join each html and append to the dom
    $(".search__results .row").append(
        searchResults.map(single => listItemHTML(single)).join("")
    );
};
