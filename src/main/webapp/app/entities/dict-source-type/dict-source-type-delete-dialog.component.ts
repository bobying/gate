import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DictSourceType } from './dict-source-type.model';
import { DictSourceTypePopupService } from './dict-source-type-popup.service';
import { DictSourceTypeService } from './dict-source-type.service';

@Component({
    selector: 'jhi-dict-source-type-delete-dialog',
    templateUrl: './dict-source-type-delete-dialog.component.html'
})
export class DictSourceTypeDeleteDialogComponent {

    dictSourceType: DictSourceType;

    constructor(
        private dictSourceTypeService: DictSourceTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictSourceTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dictSourceTypeListModification',
                content: 'Deleted an dictSourceType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dict-source-type-delete-popup',
    template: ''
})
export class DictSourceTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictSourceTypePopupService: DictSourceTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dictSourceTypePopupService
                .open(DictSourceTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
