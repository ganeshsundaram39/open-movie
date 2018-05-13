import 'jquery';

export class Search {
    constructor(query) {

        this._query = `s=${
            query.title.replace(/ +(?= )/g,'').trim()
        }${
           $.isNumeric(query.year)? "&y=" + query.year : ""
         }&p=${query.page}`;

        console.log(`query:${this._query}`);
    }

    async getResults() {
        // https://www.omdbapi.com/?s=whip&y=2014&apikey=eac24ac
        const key = "eac24ac";
        try{
        this.results= await $.ajax({
            type: "GET",
            dataType: "json",
            timeout:3000,
            beforeSend:()=>{

            },
            url: `http://www.omdbapi.com/?${this._query}&apikey=${key}`,
            complete:()=>{

            }
        });
        }catch(error){
            console.log(error);
        }
    }
}
