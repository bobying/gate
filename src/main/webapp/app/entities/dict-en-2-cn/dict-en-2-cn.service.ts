import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { DictEn2Cn } from './dict-en-2-cn.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DictEn2CnService {

    private resourceUrl = '/translate/api/dict-en-2-cns';
    private resourceSearchUrl = '/translate/api/_search/dict-en-2-cns';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dictEn2Cn: DictEn2Cn): Observable<DictEn2Cn> {
        const copy = this.convert(dictEn2Cn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dictEn2Cn: DictEn2Cn): Observable<DictEn2Cn> {
        const copy = this.convert(dictEn2Cn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DictEn2Cn> {
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
     * Convert a returned JSON object to DictEn2Cn.
     */
    private convertItemFromServer(json: any): DictEn2Cn {
        const entity: DictEn2Cn = Object.assign(new DictEn2Cn(), json);
        entity.modified_date = this.dateUtils
            .convertDateTimeFromServer(json.modified_date);
        entity.consumed_date = this.dateUtils
            .convertDateTimeFromServer(json.consumed_date);
        return entity;
    }

    /**
     * Convert a DictEn2Cn to a JSON which can be sent to the server.
     */
    private convert(dictEn2Cn: DictEn2Cn): DictEn2Cn {
        const copy: DictEn2Cn = Object.assign({}, dictEn2Cn);

        copy.modified_date = this.dateUtils.toDate(dictEn2Cn.modified_date);

        copy.consumed_date = this.dateUtils.toDate(dictEn2Cn.consumed_date);
        return copy;
    }
}
