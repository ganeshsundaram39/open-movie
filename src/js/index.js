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
import { FullDetails } from "./models/FullDetails";
import { renderFullDetails, showMorePlot } from "./views/fullDetailsView";



// object for saving search results and full information
const state = {};
//window.state = state;




// Function which will create search object  and get results using api
const controlSearch = async (page = 1) => {

    // get input from text boxes
    const userInput = getInput($(".search__type").val());

    // assign page to object
    userInput.page = page;

    // check if its valid id
    if (userInput.id) {

        // assign to url to fire haschange event
        window.location.hash = userInput.id;
        state.search = "";
    } else if (userInput.title) { // check if input is title
        window.location.hash = "";

        // create search object
        state.search = new Search(userInput);

        //  show search section
        showSearchView();

        // get results using jquery ajax api
        await state.search.getResults();

        //console.log(`Results:${JSON.stringify(state.search._results, null, 2)}`);

        // check if results were return
        if (!state.search._results) return;

        // if results were true
        if (state.search._results.Response === "True") {

            // for first page show a message
            if (page === 1)
                $(".search__results .title").text(
                    `${state.search._results.totalResults} results found..`
                );
            // generate html
            renderSearchList(state.search._results.Search);

            // if results were false
        } else if (state.search._results.Response === "False") {

            console.log(state.search._results.Error);
            // show error message
            if (page === 1)
                $(".search__results .title").text(
                    `No results found for ${errorMessageUser()}..`
                );
        }
        // empty the fulldetails object
        state.fullDetails = "";
    }
};

// search button
$(".search").on("submit", e => {
    e.preventDefault();
    controlSearch();
});




// pagination function while scrolling
const pagination = e => {
    e.preventDefault();
    // while scrolling show or hide backtotop button
    backToTopVisibility();

    // dont paginate if scrolling is happening on full details view
    if (
        state.fullDetails &&
        state.fullDetails._results &&
        state.fullDetails._results.Response === "True"
    )
        return;

    // paginate only
    // if search object has been created
    // if  results were true
    // if  response was true
    //   otherwise return
    if (
        !(
            state.search &&
            state.search._results &&
            state.search._results.Response === "True"
        )
    )
        return;

    // when reached bottom of the page call the controlSearch for more pages
    if (
        $(window).scrollTop() + $(window).height() >
        $(document).height() - 150
    ) {
        // if total results were greater than 10 then only paginate
        if (Number(state.search._results.totalResults) > 10) {

            // if page is less than total pages then only paginate
            if (
                state.search._page <
                Math.ceil(Number(state.search._results.totalResults) / 10)
            )
                controlSearch(++state.search._page); // increment the page number
        }
    }
};

// paginate on scroll
$(window).on("scroll", pagination);






//  control full details
const controlFullDetails = async () => {
    // Get ID from url
    const id = window.location.hash.replace("#", "");

    // return if empty
    if (!id) return;

    // create new full details
    state.fullDetails = new FullDetails(id);

    //  get results
    await state.fullDetails.getDetails();

    //console.log(`Results:${JSON.stringify(state.fullDetails._results, null, 2)}`);

    //  return if false
    if (!state.fullDetails._results) return;

    // for true response
    if (state.fullDetails._results.Response === "True") {

        // hide search view and show  full details section
        hideSearchView();

        //  hide full details error message
        $(".full__details .error").hide();
        $(".full__details .error").text("");

        // render full details
        renderFullDetails(state.fullDetails._results);

    } else if (state.fullDetails._results.Response === "False") {

        // hide search view if response was false
        hideSearchView();

        // clear previous html
        removeHtml();

        //  show error message
        $(".full__details .error").show();
        $(".full__details .error").text(state.fullDetails._results.Error);
        console.log(state.fullDetails._results.Error);
    }

    // show back button only if it was searched  usiing title
    if (state.search) $(".full__details .back").addClass("d-inline-block");
};


//  on hash change call control full details
["hashchange", "load"].forEach(eventType =>
    $(window).on(eventType, controlFullDetails)
);




// back to top
$(".back__to--top").on("click", scrollToTop);



// decide current search type
$(".search__type").on("click", searchOption);



// show more in the movie summary
$(document).on("click", ".details .show__more", showMorePlot);




// go back
const goBack = () => {
    showSearchView();
    state.fullDetails = "";
    window.location.hash = "";
};

$(document).on("click", ".full__details .back", goBack);



$(() => {
   // clear comments
    removeHtml();

    // slim progress bar
    NProgress.start();

    // 2 seconds wait
    setTimeout(() => {

        // show main container
        $(".container.omovie").fadeIn("slow");
        NProgress.done();
    }, 2000);
});
