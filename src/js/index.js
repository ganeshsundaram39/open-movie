import "jquery";
import {
    searchOption,
    getInput,
    errorMessageUser,
    backToTopVisibility,
    scrollToTop,
    showSearchView,
    hideSearchView,
    removeHtml
} from "./views/base";
import { Search } from "./models/SearchResults";
import { renderSearchList } from "./views/searchResultsView";
import { FullDetails } from './models/FullDetails';
import { renderFullDetails,showMorePlot } from "./views/fullDetailsView";


const state = {};
window.state = state;


const controlSearch = async (page = 1) => {
    const userInput = getInput($(".search__type").val());

    userInput.page = page;

    if (userInput.id) {
        state.search='';
        window.location.hash=userInput.id;

    } else if (userInput.title) {
        state.search = new Search(userInput);

        showSearchView();
        await state.search.getResults();
        //console.log(`Results:${JSON.stringify(state.search._results, null, 2)}`);
        if (!state.search._results) return;

        if (state.search._results.Response === "True") {
            if (page === 1)
                $(".search__results .title").text(
                    `${state.search._results.totalResults} results found..`
                );
            renderSearchList(state.search._results.Search);

        } else if (state.search._results.Response === "False") {
            console.log(state.search._results.Error);
            if (page === 1)
                $(".search__results .title").text(
                    `No results found for ${errorMessageUser()}..`
                );
        }
        state.fullDetails="";
    }
};

$(".search").on("submit", e => {
    e.preventDefault();
    controlSearch();
});



const pagination = () => {
    backToTopVisibility();

    if (state.fullDetails&&state.fullDetails._results&&state.fullDetails._results.Response === "True") return;

    if (
        !(
            state.search &&
            state.search._results &&
            state.search._results.Response === "True"
        )
    ) return;

    if (
        $(window).scrollTop() + $(window).height() >
        $(document).height() - 100
    ) {
        if (Number(state.search._results.totalResults) > 10) {
            if (
                state.search._page <
                Math.ceil(Number(state.search._results.totalResults) / 10)
            ) controlSearch(++state.search._page);

        }
    }
};

$(window).on('scroll',pagination);







const controlFullDetails = async () => {
    // Get ID from url
    const id = window.location.hash.replace("#", "");

    if (!id) return;

    state.fullDetails = new FullDetails(id);

    await state.fullDetails.getDetails();

    //console.log(`Results:${JSON.stringify(state.fullDetails._results, null, 2)}`);
    if (!state.fullDetails._results) return;


    if (state.fullDetails._results.Response === "True") {
        hideSearchView();
        $(".full__details .error").hide();
        $(".full__details .error").text('');
        renderFullDetails(state.fullDetails._results);
    } else if (state.fullDetails._results.Response === "False") {
        hideSearchView();
        removeHtml();
        $(".full__details .error").show();
        $(".full__details .error").text(
            state.fullDetails._results.Error
        );
        console.log(state.fullDetails._results.Error);
    }
    if(state.search)$('.full__details .back').addClass('d-inline-block');
};

["hashchange", "load"].forEach(eventType =>
    $(window).on(eventType, controlFullDetails)
);







// Others
$(".back__to--top").on('click',scrollToTop);

$(".search__type").on("click", searchOption);

$(document).on('click','.details .show__more',showMorePlot);


const goBack = () => {
    showSearchView();
    state.fullDetails="";
    window.location.hash="";
};

$(document).on('click','.full__details .back',goBack);

$(() => {
    removeHtml();
    setTimeout(() => {
        $(".container.omovie").fadeIn("slow");
    }, 1500);
});
