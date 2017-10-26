import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Industry } from './industry.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IndustryService {

    private resourceUrl = '/param/api/industries';
    private resourceSearchUrl = '/param/api/_search/industries';

    constructor(private http: Http) { }

    create(industry: Industry): Observable<Industry> {
        const copy = this.convert(industry);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(industry: Industry): Observable<Industry> {
        const copy = this.convert(industry);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Industry> {
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
     * Convert a returned JSON object to Industry.
     */
    private convertItemFromServer(json: any): Industry {
        const entity: Industry = Object.assign(new Industry(), json);
        return entity;
    }

    /**
     * Convert a Industry to a JSON which can be sent to the server.
     */
    private convert(industry: Industry): Industry {
        const copy: Industry = Object.assign({}, industry);
        return copy;
    }
}