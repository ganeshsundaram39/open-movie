import 'jquery';

export class Search {
    constructor(query) {
        this.query = `s=${
            query.title.replace(' ','+')
        }${
            !isNaN(query.year)
             ? "&y=" + query.year : ""
        }${
            query.page !== 1
            ? "&p=" + query.page : ""
        }`;
        console.log(isNaN(query.year));
        console.log(this.query);
    }

    async getResults() {
        // http://www.omdbapi.com/?s=whip&y=2014&apikey=eac24ac
        const key = "eac24ac";
        try{
        const results= await $.ajax({
            type: "GET",
            dataType: "json",
            timeout:3000,
            beforeSend:()=>{

            },
            url: `http://www.omdbapi.com/?${this.query}&apikey=${key}`,
            complete:()=>{

            }
        });
       console.log(results);
        }catch(error){
            console.log(error);
        }
    }
}
