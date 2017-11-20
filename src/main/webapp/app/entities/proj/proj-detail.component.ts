import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Proj } from './proj.model';
import { ProjService } from './proj.service';

@Component({
    selector: 'jhi-proj-detail',
    templateUrl: './proj-detail.component.html'
})
export class ProjDetailComponent implements OnInit, OnDestroy {

    proj: Proj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private projService: ProjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjs();
    }

    load(id) {
        this.projService.find(id).subscribe((proj) => {
            this.proj = proj;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projListModification',
            (response) => this.load(this.proj.id)
        );
    }
}
