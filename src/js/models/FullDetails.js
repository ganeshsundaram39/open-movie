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
                timeout: 3000,
                beforeSend: () => {},
                url: `http://www.omdbapi.com/?i=${
                    this._imdbId
                }&plot=full&apikey=${key}`,
                complete: () => {}
            });
        } catch (error) {
            console.log(error);
            console.error('sometimes it fails to load ');
            console.info('Click again')
        }
    }
}
