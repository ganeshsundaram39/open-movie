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
    if ($(window).scrollTop() < 100) {
        $(".back__to--top").hide();
    } else {
        $(".back__to--top").show();
    }
};

export const scrollToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
};



