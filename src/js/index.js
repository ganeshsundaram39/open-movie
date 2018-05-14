import "jquery";
import { searchOption } from "./views/base";
import { getInput, renderSearchList } from "./views/searchView";
import { Search } from "./models/Search";

const state = {};
//window.state = state;
$(".search__type").on("click", searchOption);

const controlSearch = async (page = 1) => {
    const userInput = getInput($(".search__type").val());

    userInput.page = page;

    if (userInput.id) {
    } else if (userInput.title) {
        state.search = new Search(userInput);

        await state.search.getResults();

        console.log(`Results:${JSON.stringify(state.search._results, null, 2)}`);
        if (!state.search._results) return;

        if (state.search._results.Response === "True") {
            renderSearchList(state.search._results.Search);
        } else if (state.search._results.Response === "False") {
            console.log(state.search._results.Error);
        }
    }
};

const pagination = function() {
    if(!(state.search&&state.search._results)) return;

    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        console.log('hello');
       // controlSearch();
    }
}

$(window).scroll(pagination);

$(".search").on("submit", e => {
    e.preventDefault();
    controlSearch();
});

$(() => {
    setTimeout(() => {
        $(".container.omovie").fadeIn("slow");
    }, 1500);
});
