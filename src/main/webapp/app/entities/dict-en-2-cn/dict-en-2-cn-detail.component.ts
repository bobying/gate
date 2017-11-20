import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DictEn2Cn } from './dict-en-2-cn.model';
import { DictEn2CnService } from './dict-en-2-cn.service';

@Component({
    selector: 'jhi-dict-en-2-cn-detail',
    templateUrl: './dict-en-2-cn-detail.component.html'
})
export class DictEn2CnDetailComponent implements OnInit, OnDestroy {

    dictEn2Cn: DictEn2Cn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dictEn2CnService: DictEn2CnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDictEn2Cns();
    }

    load(id) {
        this.dictEn2CnService.find(id).subscribe((dictEn2Cn) => {
            this.dictEn2Cn = dictEn2Cn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDictEn2Cns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dictEn2CnListModification',
            (response) => this.load(this.dictEn2Cn.id)
        );
    }
}
