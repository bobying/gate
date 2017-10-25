import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Area_type } from './area-type.model';
import { Area_typePopupService } from './area-type-popup.service';
import { Area_typeService } from './area-type.service';

@Component({
    selector: 'jhi-area-type-delete-dialog',
    templateUrl: './area-type-delete-dialog.component.html'
})
export class Area_typeDeleteDialogComponent {

    area_type: Area_type;

    constructor(
        private area_typeService: Area_typeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.area_typeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'area_typeListModification',
                content: 'Deleted an area_type'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-area-type-delete-popup',
    template: ''
})
export class Area_typeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private area_typePopupService: Area_typePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.area_typePopupService
                .open(Area_typeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
