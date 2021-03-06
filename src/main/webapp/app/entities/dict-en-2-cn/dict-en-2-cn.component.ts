import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { DictEn2Cn } from './dict-en-2-cn.model';
import { DictEn2CnService } from './dict-en-2-cn.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dict-en-2-cn',
    templateUrl: './dict-en-2-cn.component.html'
})
export class DictEn2CnComponent implements OnInit, OnDestroy {

currentAccount: any;
    dictEn2Cns: DictEn2Cn[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    queryCritical: DictEn2Cn;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private dictEn2CnService: DictEn2CnService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.queryCritical = new DictEn2Cn();
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        var cache = {}; 
        
        if (this.queryCritical.id!=null) {
            cache["id.in"] = this.queryCritical.id;
	}
	if (this.queryCritical.english) {
            cache["english.contains"] = this.queryCritical.english;    	
        }
	if (this.queryCritical.chinese) {
	    cache["chinese.contains"] = this.queryCritical.chinese;
        }
        if (this.queryCritical.hits!=null) {
            cache["hits.in"] = this.queryCritical.hits;
        }
        if (this.queryCritical.enable!=null) {
            cache["enable.in"] = this.queryCritical.enable;
        }
        if (this.queryCritical.priority!=null) {
            cache["priority.in"] = this.queryCritical.priority;
        }
        if (this.queryCritical.regex!=null) {
            cache["regex.in"] = this.queryCritical.regex;
        }
        if (this.queryCritical.sourceId!=null) {
            cache["chinese.sourceId"] = this.queryCritical.sourceId;
        }

        if (this.currentSearch) {
            this.dictEn2CnService.query({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()}, cache
                ).subscribe(
                    (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
        }
        this.dictEn2CnService.query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()}, cache
                ).subscribe(
                    (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                    (res: ResponseWrapper) => this.onError(res.json)
                );
         return;
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/dict-en-2-cn'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/dict-en-2-cn', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/dict-en-2-cn', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDictEn2Cns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DictEn2Cn) {
        return item.id;
    }
    registerChangeInDictEn2Cns() {
        this.eventSubscriber = this.eventManager.subscribe('dictEn2CnListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.dictEn2Cns = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
