import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DictSourceType } from './dict-source-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DictSourceTypeService {

    private resourceUrl = '/translate/api/dict-source-types';
    private resourceSearchUrl = '/translate/api/_search/dict-source-types';

    constructor(private http: Http) { }

    create(dictSourceType: DictSourceType): Observable<DictSourceType> {
        const copy = this.convert(dictSourceType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dictSourceType: DictSourceType): Observable<DictSourceType> {
        const copy = this.convert(dictSourceType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DictSourceType> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any, queryParams?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req, queryParams);
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
     * Convert a returned JSON object to DictSourceType.
     */
    private convertItemFromServer(json: any): DictSourceType {
        const entity: DictSourceType = Object.assign(new DictSourceType(), json);
        return entity;
    }

    /**
     * Convert a DictSourceType to a JSON which can be sent to the server.
     */
    private convert(dictSourceType: DictSourceType): DictSourceType {
        const copy: DictSourceType = Object.assign({}, dictSourceType);
        return copy;
    }
}
