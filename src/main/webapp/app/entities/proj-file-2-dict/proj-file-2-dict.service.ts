import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProjFile2Dict } from './proj-file-2-dict.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProjFile2DictService {

    private resourceUrl = '/translate/api/proj-file-2-dicts';
    private resourceSearchUrl = '/translate/api/_search/proj-file-2-dicts';

    constructor(private http: Http) { }

    create(projFile2Dict: ProjFile2Dict): Observable<ProjFile2Dict> {
        const copy = this.convert(projFile2Dict);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(projFile2Dict: ProjFile2Dict): Observable<ProjFile2Dict> {
        const copy = this.convert(projFile2Dict);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProjFile2Dict> {
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
     * Convert a returned JSON object to ProjFile2Dict.
     */
    private convertItemFromServer(json: any): ProjFile2Dict {
        const entity: ProjFile2Dict = Object.assign(new ProjFile2Dict(), json);
        return entity;
    }

    /**
     * Convert a ProjFile2Dict to a JSON which can be sent to the server.
     */
    private convert(projFile2Dict: ProjFile2Dict): ProjFile2Dict {
        const copy: ProjFile2Dict = Object.assign({}, projFile2Dict);
        return copy;
    }
}
