import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DictSource } from './dict-source.model';
import { DictSourceService } from './dict-source.service';

@Component({
    selector: 'jhi-dict-source-detail',
    templateUrl: './dict-source-detail.component.html'
})
export class DictSourceDetailComponent implements OnInit, OnDestroy {

    dictSource: DictSource;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dictSourceService: DictSourceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDictSources();
    }

    load(id) {
        this.dictSourceService.find(id).subscribe((dictSource) => {
            this.dictSource = dictSource;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDictSources() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dictSourceListModification',
            (response) => this.load(this.dictSource.id)
        );
    }
}
