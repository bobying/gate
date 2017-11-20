import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DictSourceType } from './dict-source-type.model';
import { DictSourceTypeService } from './dict-source-type.service';

@Component({
    selector: 'jhi-dict-source-type-detail',
    templateUrl: './dict-source-type-detail.component.html'
})
export class DictSourceTypeDetailComponent implements OnInit, OnDestroy {

    dictSourceType: DictSourceType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dictSourceTypeService: DictSourceTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDictSourceTypes();
    }

    load(id) {
        this.dictSourceTypeService.find(id).subscribe((dictSourceType) => {
            this.dictSourceType = dictSourceType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDictSourceTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dictSourceTypeListModification',
            (response) => this.load(this.dictSourceType.id)
        );
    }
}
