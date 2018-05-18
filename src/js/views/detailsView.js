const backButton = () =>
    $(".search__type").val() === "title"
        ? `<div class="back"><i class="ion-ios-arrow-back"></i>Back</div>`
        : ``;

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
        if (bunch[b] !== "N/A") {
            output += bunch[b];
            if (b !== "country" && b !== "released") output += " | ";
            if (b === "released") output += `(${bunch[b]})`;
        }
    }

    return output;
};

const plotHtml = plot =>
    plot !== "N/A" ? `<div class="sub plot">${plot}</div>` : "";

const commonHtml = common => {
    let output = "";
    for (let c in common) {
        if (common[c] !== "N/A") {
            output += `<div class="header">${c}</div>
            <div class="sub">${common[c]}</div>`;
        }
    }
    return output;
};

const ratingsHtml = ratings => {
    let output = '<div class="header">Ratings</div><div class="sub ratings">';

    output += ratings.map(
        rating =>
            `<div class="single"><span class="value">${rating.Value}</span><br><span class="source">${rating.Source}</span></div>`
    ).join('');

    output += "</div>";
};

const websiteHtml = website => `<div class="header">Website</div><div class="sub"><a href="${website}">${website}</a></div>`;

const otherDetailsHtml = otherData => {
    return `<div class="header bunch">${bunchHtml({
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
        otherData.Awards !== "N/A"
            ? '<div class="sub awards">' + otherData.Awards + "</div>"
            : ""
    }${otherData.Ratings !== "N/A" ? ratingsHtml(otherData.Ratings) : ""
    }${
        commonHtml({
            Production:otherData.Production,
            BoxOffice:otherData.BoxOffice
        })
    }${
        otherData.Website!=='N/A'?websiteHtml(otherData.Website):''
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
        })}</div><div class="row">${posterHtml({
            url:
                data.Poster !== "N/A" ? data.Poster : "./img/not-available.jpg",
            title: data.Title
        })} <div class="details">${otherDetailsHtml(data)}</div></div>`
    );
};
