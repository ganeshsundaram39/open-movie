import {key} from '../config';

export class FullDetails {
    constructor(id) {
        this._imdbId = id;
    }

    async getDetails() {
        try {
            this._results = await $.ajax({
                type: "GET",
                dataType: "json",
                async:true,
                timeout: 3000,
                beforeSend: () => {
                    NProgress.start();
                },
                url: `https://www.omdbapi.com/?i=${
                    this._imdbId
                }&plot=full&apikey=${key}`,
                complete: () => {
                    NProgress.done();
                }
            });
        } catch (error) {
            console.log(error);
            console.error('Something wrong with the api..!! Sometimes it fails to load.');
            console.info('Click again')
            window.location.hash="";
        }
    }
}
