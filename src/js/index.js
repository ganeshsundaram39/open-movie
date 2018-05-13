import "jquery";
import { searchOption } from "./views/base";
import {getInput,renderSearchList} from "./views/searchView";
import {Search} from "./models/Search";

const state = {};

$(".search__type").on("click", searchOption);

const controlSearch = async (page=1) => {

    const userInput= getInput($('.search__type').val());

    userInput.page=page;

    if(userInput.id){

    } else if(userInput.title){
        console.log(`userInput:${JSON.stringify(userInput,null,2)}`);
        state.search= new Search(userInput);

        await state.search.getResults();

        console.log(`Results:${JSON.stringify(state.search.results,null,2)}`)
        if(state.search.results.Response==="True"){
            renderSearchList(state.search.results.Search);
        } else {
            console.log(state.search.results.Error);
        }
    }
};

$(".search").on("submit", e => {
    e.preventDefault();
    controlSearch();
});

$(() => {
    setTimeout(() => {
        $(".container.omovie").fadeIn("slow");
    }, 1500);
});
