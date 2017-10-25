import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Area_type } from './area-type.model';
import { Area_typeService } from './area-type.service';

@Component({
    selector: 'jhi-area-type-detail',
    templateUrl: './area-type-detail.component.html'
})
export class Area_typeDetailComponent implements OnInit, OnDestroy {

    area_type: Area_type;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private area_typeService: Area_typeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArea_types();
    }

    load(id) {
        this.area_typeService.find(id).subscribe((area_type) => {
            this.area_type = area_type;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArea_types() {
        this.eventSubscriber = this.eventManager.subscribe(
            'area_typeListModification',
            (response) => this.load(this.area_type.id)
        );
    }
}
