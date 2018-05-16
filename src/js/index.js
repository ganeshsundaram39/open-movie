import "jquery";
import {
    searchOption,
    errorMessageUser,
    backToTopVisibility,
    scrollToTop
} from "./views/base";
import { getInput, renderSearchList } from "./views/searchView";
import { Search } from "./models/Search";
import {FullDetails} from './models/FullDetails';

const state = {};
window.state = state;

$(".search__type").on("click", searchOption);

const controlSearch = async (page = 1) => {
    const userInput = getInput($(".search__type").val());

    userInput.page = page;

    if (userInput.id) {
    } else if (userInput.title) {
        state.search = new Search(userInput);
        await state.search.getResults();
        //console.log(`Results:${JSON.stringify(state.search._results, null, 2)}`);
        if (!state.search._results) return;

        if (state.search._results.Response === "True") {
            if (page === 1)
                $(".title").text(
                    `${state.search._results.totalResults} results found..`
                );
            renderSearchList(state.search._results.Search);
        } else if (state.search._results.Response === "False") {
            console.log(state.search._results.Error);
            if (page === 1)
                $(".title").text(
                    `No results found for ${errorMessageUser()}..`
                );
        }
    }
};

$(".search").on("submit", e => {
    e.preventDefault();
    controlSearch();
});


const controlFullDetails= async()=>{
    // Get ID from url
    const id = window.location.hash.replace("#", "");

    if (!id) return;

    state.fullDetails = new FullDetails(id);

    await state.fullDetails.getDetails();

    console.log(state.fullDetails._results);
};




["hashchange", "load"].forEach(eventType =>
    $(window).on(eventType, controlFullDetails)
);

const pagination = () => {
    backToTopVisibility();

    if (
        !(
            state.search &&
            state.search._results &&
            state.search._results.Response === "True"
        )
    )return;

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

$(window).scroll(pagination);

$(".back__to--top").click(scrollToTop);

$(() => {
    setTimeout(() => {
        $(".container.omovie").fadeIn("slow");
    }, 1500);
});
