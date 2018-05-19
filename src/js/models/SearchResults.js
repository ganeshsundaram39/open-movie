import {key} from '../config';

export class Search {
    constructor(query) {
        this._query = `s=${
            query.title.replace(/ +(?= )/g, '').trim()
            }${
            $.isNumeric(query.year) ? "&y=" + query.year : ""
            }&page=${query.page}`;
        this._page = query.page;
    }

    async getResults() {
        // https://www.omdbapi.com/?s=whip&y=2014&apikey=eac24ac

        try {
            this._results = await $.ajax({
                type: "GET",
                dataType: "json",
                timeout:3000,
                beforeSend: () => {

                    if (this._page === 1){
                        $('.title').text('');
                        $(".search__results .row").html("");
                    }
                    $(".search__results .container").append('<div class="text-center loader"><i class="ion-android-refresh"></i></div');
                },
                url: `https://www.omdbapi.com/?${this._query}&apikey=${key}`,
                complete: () => {
                    $('.loader').remove();
                }
            });
        } catch (error) {
            console.log(error);
            console.error('Something wrong with the api..!! Sometimes it fails to load.');
            console.info('refresh and try it again')
            $(".full__details .container").html("");
            if (this._page === 1) $('.search__results .title').text('Some Error..!! Refresh And Try Again..!!');
        }
    }
}
