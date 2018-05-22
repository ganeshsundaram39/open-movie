// get input from text boxes and convert it into object
export const getInput = type => {

    // title and year
    if (type === "title") {
        return {
            title: $(`.search [name="title"]`).val(),
            year: $(`.search [name="year"]`).val()
        };
        // id
    } else if (type === "id") {
        return {
            id: $(`.search [name="id"]`).val()
        };
    }
};

//  show title year textbox
const searchByTitleYear = current => {
    current.val("title");
    current.text("By IMDb ID");

    $('.search [name="id"]').val("");
    $('.search [name="id"]').hide();
    $(".search div").fadeIn("slow");
};

// show imdb id textbox
const searchByIMDbId = current => {
    current.val("id");
    current.text("By Title");

    $('.search [name="title"]').val("");
    $('.search [name="year"]').val("");
    $(".search div").hide();
    $('.search [name="id"]').fadeIn("slow");
};

// when user clicks search type button
export const searchOption = function(e) {
    e.preventDefault();

    if ($(this).val() === "id") {
        searchByTitleYear($(this));
    } else if ($(this).val() === "title") {
        searchByIMDbId($(this));
    }
};


// Generate error message
export const errorMessageUser = () => {
    if ($(".search__type").val() === "title") {
        return `Title ${$('.search [name="title"]')
            .val()
            .toUpperCase()}${
            $(".search input[name=year]").val()
                ? " (" + $('.search input[name="year"]').val() + ")"
                : ""
        }`;
    } else if ($(".search__type").val() === "id") {
        return "IMDb id " + $('.search [name="id"]').val();
    }
};

export const backToTopVisibility = () => {
    // hide  back to top button if scroll bar less than 200
    if ($(window).scrollTop() < 200) {
        $(".back__to--top").hide();
    } else {
        $(".back__to--top").show();
    }
};

//  scrolling animation
export const scrollToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
};

export const showSearchView = () => {
    $(".full__details").hide();
    $(".search__results").show();
    $(".full__details .container").html("");
};

export const hideSearchView = () => {
    $(".search__results").hide();
    $(".full__details").show();
    scrollToTop();
};

export const removeHtml = () => {
    $(".full__details .container").html("");
    $(".search__results .row").html("");
    $(".search__results .title").text("");
};

export const minToHour = min => {
    const minutes = Number(min.split(" ")[0]);
    if (minutes >= 60) {
        return `${Math.floor(minutes / 60)}h ${
            minutes % 60 === 0 ? "" : minutes % 60 + "m"
        }`;
    } else {
        return min;
    }
};

// replace http with https
export const formatUrl = poster =>
    poster.indexOf("https") === -1 ? poster.replace("http", "https") : poster;
