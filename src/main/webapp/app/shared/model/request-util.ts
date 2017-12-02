import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any, queryParams?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        params.set('query', req.query);
        if (queryParams) {
            for (const key in queryParams) {
                if (queryParams.hasOwnProperty(key)) {
                    params.set(key, queryParams[key]);
                }
            }
        }

        options.params = params;
    }
    return options;
};
