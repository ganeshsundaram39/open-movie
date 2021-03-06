import { showSearchView, minToHour, formatUrl } from "./base";

// back button html
const backButton = () =>
    `<div class="back"><i class="ion-ios-arrow-back"></i>Back</div>`;

// header section in full details
const headerHtml = head => `<div class="name">
                                    <i class="ion-arrow-right-b"></i> ${
    head.title
    }(${head.year})</div>${
    head.imdbRating !== "N/A"
        ? '<div class="imdb__votes"><i class="ion-android-star"></i>' +
        head.imdbRating +
        "/10</div>"
        : ""
    }`;


// Poster image of movie
const posterHtml = poster => `<div class="poster">
                    <img src="${formatUrl(
        poster.url
    )}" alt="${poster.title.toLowerCase()}" class="img-fluid" onerror="this.onerror=null; this.src='./img/not-available.jpg'">
                    </div>`;


// bunch of field shown without header
const bunchHtml = bunch => {
    let output = "";
    for (let b in bunch) {

        // check if it exists
        if (bunch[b] && bunch[b] !== "N/A") {

            // if the field is runtime then convert it into hours and minutes
            if (b === "runtime") {
                output += minToHour(bunch[b]);
            } else if (b !== "country") {
                output += bunch[b];
            } else {
                output += ` (${bunch[b]})`;  // if its country add parentesis
            }

            // add bar
            if (b !== "country" && b !== "released") output += " | ";
        }
    }

    return output;
};


// movie summary
const plotHtml = plot => {
    if (plot !== "N/A") {

        // if more than 400 convert it into two section
        // show it using show more link

        if (plot.length <= 400) {
            return `<div class="sub plot">${plot}</div>`;
        } else {
            return `<div class="sub plot">${plot.slice(0, plot.lastIndexOf(" ", 400))}<span class="more">${plot.slice(plot.lastIndexOf(" ", 400))}</span><span class="show__more"> Show More</span></div>`;
        }
    }
};


// common fields  which will have header and sub
const commonHtml = common => {
    let output = "";
    for (let c in common) {
        if (common[c] && common[c] !== "N/A") {
            output += `<div class="header">${c}</div>
            <div class="sub">${common[c]}</div>`;
        }
    }
    return output;
};


// ratings section
const ratingsHtml = ratings => {
    let output = '<div class="header">Ratings</div><div class="sub ratings">';

    // map through each ratings and then join the html
    output += ratings
        .map(
            rating =>
                `<div class="single"><span class="value">${
                rating.Value
                }</span><br><span class="source">${rating.Source}</span></div>`
        )
        .join("");

    return output + "</div>";
};

// award html
const awardsHtml = awards =>
    `<div class="header">Awards</div><div class="sub awards">${awards}</div>`;


// website html
const websiteHtml = website =>
    `<div class="header">Website</div><div class="sub"><a href="${formatUrl(
        website
    )}">${formatUrl(website)}</a></div>`;


//  other details section
const otherDetailsHtml = otherData =>
    `<div class="header bunch">${bunchHtml({
        rated: otherData.Rated,
        runtime: otherData.Runtime,
        genre: otherData.Genre,
        language: otherData.Language,
        released: otherData.Released,
        country: otherData.Country
    })}</div>${plotHtml(otherData.Plot)}${commonHtml({
        Actors: otherData.Actors,
        Writer: otherData.Writer,
        Director: otherData.Director
    })}${
    otherData.Awards && otherData.Awards !== "N/A"
        ? awardsHtml(otherData.Awards)
        : ""
    }${
    otherData.Ratings && otherData.Ratings.length !== 0
        ? ratingsHtml(otherData.Ratings)
        : ""
    }${commonHtml({
        Production: otherData.Production,
        BoxOffice: otherData.BoxOffice
    })}${
    otherData.Website && otherData.Website !== "N/A"
        ? websiteHtml(otherData.Website)
        : ""
    }`;

// 3 sections
// header
// poster
// otherdetails
export const renderFullDetails = data => {
    $(".full__details .container").html(
        `${backButton()}<div class="title">${headerHtml({
            title: data.Title,
            year: data.Year,
            imdbRating: data.imdbRating
        })}</div><div class="row">${posterHtml({
            url:
                data.Poster !== "N/A" ? data.Poster : "./img/not-available.jpg",
            title: data.Title
        })}<div class="details">${otherDetailsHtml(data)}</div></div>`
    );
};


// show more movie summary
export const showMorePlot = function (e) {
    $(".details .more").show();
    $(this).hide();
};
