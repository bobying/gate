import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ProjFiles } from './proj-files.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProjFilesService {

    private resourceUrl = '/translate/api/proj-files';
    private resourceSearchUrl = '/translate/api/_search/proj-files';

    constructor(private http: Http) { }

    create(projFiles: ProjFiles): Observable<ProjFiles> {
        const copy = this.convert(projFiles);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(projFiles: ProjFiles): Observable<ProjFiles> {
        const copy = this.convert(projFiles);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProjFiles> {
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
     * Convert a returned JSON object to ProjFiles.
     */
    private convertItemFromServer(json: any): ProjFiles {
        const entity: ProjFiles = Object.assign(new ProjFiles(), json);
        return entity;
    }

    /**
     * Convert a ProjFiles to a JSON which can be sent to the server.
     */
    private convert(projFiles: ProjFiles): ProjFiles {
        const copy: ProjFiles = Object.assign({}, projFiles);
        return copy;
    }
}
