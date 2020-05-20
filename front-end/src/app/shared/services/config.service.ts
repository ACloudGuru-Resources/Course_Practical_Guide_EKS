import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public config;

    constructor(private http: HttpClient) { }

    load() {
        this.http
            .get<any[]>('./assets/json/config.json')
            .subscribe(config => {
                localStorage.setItem('config', JSON.stringify(config['config']));
                this.config = config['config'];
            });
    }

    get api() { return this.config.api; }
}
