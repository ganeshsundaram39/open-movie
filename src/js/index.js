import "jquery";
import { searchOption } from "./views/base";
import {getInput} from "./views/searchView";
import {Search} from "./models/Search";

const state = {};

$(".search__type").on("click", searchOption);

const controlSearch = async (page=1) => {

    const userInput= getInput($('.search__type').val());

    userInput.page=page;

    if(userInput.id){

    } else if(userInput.title){
        console.log(userInput);
        state.search= new Search(userInput);

        await state.search.getResults();
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
