import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DictSource } from './dict-source.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DictSourceService {

    private resourceUrl = '/translate/api/dict-sources';
    private resourceSearchUrl = '/translate/api/_search/dict-sources';

    constructor(private http: Http) { }

    create(dictSource: DictSource): Observable<DictSource> {
        const copy = this.convert(dictSource);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dictSource: DictSource): Observable<DictSource> {
        const copy = this.convert(dictSource);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DictSource> {
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
     * Convert a returned JSON object to DictSource.
     */
    private convertItemFromServer(json: any): DictSource {
        const entity: DictSource = Object.assign(new DictSource(), json);
        return entity;
    }

    /**
     * Convert a DictSource to a JSON which can be sent to the server.
     */
    private convert(dictSource: DictSource): DictSource {
        const copy: DictSource = Object.assign({}, dictSource);
        return copy;
    }
}
