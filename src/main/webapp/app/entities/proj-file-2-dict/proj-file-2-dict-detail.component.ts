import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProjFile2Dict } from './proj-file-2-dict.model';
import { ProjFile2DictService } from './proj-file-2-dict.service';

@Component({
    selector: 'jhi-proj-file-2-dict-detail',
    templateUrl: './proj-file-2-dict-detail.component.html'
})
export class ProjFile2DictDetailComponent implements OnInit, OnDestroy {

    projFile2Dict: ProjFile2Dict;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projFile2DictService: ProjFile2DictService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjFile2Dicts();
    }

    load(id) {
        this.projFile2DictService.find(id).subscribe((projFile2Dict) => {
            this.projFile2Dict = projFile2Dict;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjFile2Dicts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projFile2DictListModification',
            (response) => this.load(this.projFile2Dict.id)
        );
    }
}
