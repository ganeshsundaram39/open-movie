import { showSearchView,minToHour } from "./base";

const backButton = () =>
   `<div class="back"><i class="ion-ios-arrow-back"></i>Back</div>`;

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

const posterHtml = poster => `<div class="poster">
                    <img src="${
                        poster.url
                    }" alt="${poster.title.toLowerCase()}onerror="this.onerror=null; this.src='./img/not-available.jpg'">
                    </div>`;

const bunchHtml = bunch => {
    let output = "";
    for (let b in bunch) {
        if (bunch[b]&&bunch[b] !== "N/A") {
            if(b==='runtime'){
                output += minToHour(bunch[b]);
            } else if (b !== "country") {
                output += bunch[b];
            } else {
                output += ` (${bunch[b]})`;
            }

            if (b !== "country" && b !== "released") output += " | ";
        }
    }

    return output;
};

const plotHtml = plot => {
    if (plot !== "N/A") {
        if (plot.length <= 400) {
            return `<div class="sub plot">${plot}</div>`;
        } else {
            return `<div class="sub plot">${Array.from(plot)
                .slice(0, 400)
                .join("")}<span class="more">${Array.from(plot)
                .slice(400)
                .join(
                    ""
                )}</span><span class="show__more"> Show More</span></div>`;
        }
    }
};

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

const ratingsHtml = ratings => {
    let output = '<div class="header">Ratings</div><div class="sub ratings">';

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

const awardsHtml = awards =>
    `<div class="header">Awards</div><div class="sub awards">${awards}</div>`;

const websiteHtml = website =>
    `<div class="header">Website</div><div class="sub"><a href="${website}">${website}</a></div>`;

const otherDetailsHtml = otherData => {
    return `<div class="header bunch">${
        bunchHtml({
        rated: otherData.Rated,
        runtime: otherData.Runtime,
        genre: otherData.Genre,
        language: otherData.Language,
        released: otherData.Released,
        country: otherData.Country
    })
    }</div>${
        plotHtml(otherData.Plot)
    }${
        commonHtml({
        Actors: otherData.Actors,
        Writer: otherData.Writer,
        Director: otherData.Director
    })
    }${
        otherData.Awards && otherData.Awards !== "N/A" ? awardsHtml(otherData.Awards) : ""
    }${
        otherData.Ratings && otherData.Ratings.length!==0 ? ratingsHtml(otherData.Ratings) : ""
    }${
        commonHtml({
        Production: otherData.Production,
        BoxOffice: otherData.BoxOffice
    })
    }${
        otherData.Website && otherData.Website !== "N/A" ? websiteHtml(otherData.Website) : ""
    }`;
};

export const renderFullDetails = data => {
    $(".full__details .container").html(
        `${
            backButton()
            }<div class="title">${
            headerHtml({
            title: data.Title,
            year: data.Year,
            imdbRating: data.imdbRating
            })
            }</div><div class="row"><div class="col-5">${
                posterHtml({
                url:data.Poster !== "N/A"
                ? data.Poster
                : "./img/not-available.jpg",
                title: data.Title
        })}</div><div class="col-7"><div class="details">${otherDetailsHtml(data)}</div></div></div>`
    );
};

export const showMorePlot = function(e) {
    $(".details .more").show();
    $(this).hide();
};
