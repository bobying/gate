import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Area_type } from './area-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Area_typeService {

    private resourceUrl = '/param/api/area-types';
    private resourceSearchUrl = '/param/api/_search/area-types';

    constructor(private http: Http) { }

    create(area_type: Area_type): Observable<Area_type> {
        const copy = this.convert(area_type);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(area_type: Area_type): Observable<Area_type> {
        const copy = this.convert(area_type);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Area_type> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Area_type.
     */
    private convertItemFromServer(json: any): Area_type {
        const entity: Area_type = Object.assign(new Area_type(), json);
        return entity;
    }

    /**
     * Convert a Area_type to a JSON which can be sent to the server.
     */
    private convert(area_type: Area_type): Area_type {
        const copy: Area_type = Object.assign({}, area_type);
        return copy;
    }
}
