import  'jquery';

$('#search__type').on('click',function(e){
    e.preventDefault();

    if($(this).val()==="id"){

        $(this).val("title");
        $(this).text("By IMDb ID");

        $('[name="id"]').hide();
        $('.search__bar div').fadeIn("slow");

    } else if($(this).val()==="title"){

        $(this).val("id");
        $(this).text("By Title");

        $('.search__bar div').hide();
        $('[name="id"]').fadeIn("slow");
    }
});

$(function(){
    setInterval(function(){
        $('.container.omovie').fadeIn("slow");
    },1500);
});