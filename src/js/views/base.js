export const getInput = type => {
    if (type === "title") {
        return {
            title: $(`.search [name="title"]`).val(),
            year: $(`.search [name="year"]`).val()
        };
    } else if (type === "id") {
        return {
            id: $(`.search [name="id"]`).val()
        };
    }
};

const searchByTitleYear = current => {
    current.val("title");
    current.text("By IMDb ID");

    $('.search [name="id"]').val("");
    $('.search [name="id"]').hide();
    $(".search div").fadeIn("slow");
};

const searchByIMDbId = current => {
    current.val("id");
    current.text("By Title");

    $('.search [name="title"]').val("");
    $('.search [name="year"]').val("");
    $(".search div").hide();
    $('.search [name="id"]').fadeIn("slow");
};

export const searchOption = function(e) {
    e.preventDefault();

    if ($(this).val() === "id") {
        searchByTitleYear($(this));
    } else if ($(this).val() === "title") {
        searchByIMDbId($(this));
    }
};

export const errorMessageUser = ()=>{

    if($('.search__type').val()==='title'){

    return `Title ${ $('.search [name="title"]').val().toUpperCase() }${
        $('.search input[name=year]').val()
        ?' ('+$('.search input[name="year"]').val()+')'
        :''
     }`;
    } else if($('.search__type').val()==='id'){

     return 'IMDb id '+$('.search [name="id"]').val();
    }
};

export const backToTopVisibility= ()=>{
    if ($(window).scrollTop() < 200) {
        $(".back__to--top").hide();
    } else {
        $(".back__to--top").show();
    }
};

export const scrollToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
};

export const showSearchView = () =>{
    $('.full__details').hide();
    $('.search__results').show();
    $(".full__details .container").html('');
};

export const hideSearchView = () => {
    $('.search__results').hide();
    $('.full__details').show();
    scrollToTop();
};

export const removeHtml= () =>{
    $(".full__details .container").html("");
    $(".search__results .row").html('');
    $(".search__results .title").text('');
};

export const minToHour = min => {
    const minutes = Number(min.split(' ')[0]);
    if(minutes>=60){
    return `${Math.floor(minutes/60)}h ${minutes%60===0?'':minutes%60+'m'}`;
    } else {
        return min;
    }
};

export const formatUrl = poster => poster.indexOf('https')===-1?poster.replace('http','https'):poster;
