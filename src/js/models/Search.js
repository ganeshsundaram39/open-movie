export class Search {
    constructor(query) {
        this._query = `s=${
            query.title.replace(/ +(?= )/g, '').trim()
            }${
            $.isNumeric(query.year) ? "&y=" + query.year : ""
            }&p=${query.page}`;
            console.log(query);
        this._page=query.page;
    }

    async getResults() {
        // https://www.omdbapi.com/?s=whip&y=2014&apikey=eac24ac
        const key = "eac24ac";
        try {
            this._results = await $.ajax({
                type: "GET",
                dataType: "json",
                timeout: 3000,
                beforeSend: () => {
                    if(this._page===1)$(".results .row").html("");
                },
                url: `https://www.omdbapi.com/?${this._query}&apikey=${key}`,
                complete: () => {

                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
