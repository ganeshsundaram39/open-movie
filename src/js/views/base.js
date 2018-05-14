const searchByTitleYear = current => {
    current.val("title");
    current.text("By IMDb ID");

    $('.search__bar [name="id"]').val("");
    $('.search__bar [name="id"]').hide();
    $(".search__bar div").fadeIn("slow");
};

const searchByIMDbId = current => {
    current.val("id");
    current.text("By Title");

    $('.search__bar [name="title"]').val("");
    $('.search__bar [name="year"]').val("");
    $(".search__bar div").hide();
    $('.search__bar [name="id"]').fadeIn("slow");
};

export const searchOption = function(e) {
    e.preventDefault();

    if ($(this).val() === "id") {
        searchByTitleYear($(this));
    } else if ($(this).val() === "title") {
        searchByIMDbId($(this));
    }
};
