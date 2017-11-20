import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DictSource } from './dict-source.model';
import { DictSourcePopupService } from './dict-source-popup.service';
import { DictSourceService } from './dict-source.service';

@Component({
    selector: 'jhi-dict-source-delete-dialog',
    templateUrl: './dict-source-delete-dialog.component.html'
})
export class DictSourceDeleteDialogComponent {

    dictSource: DictSource;

    constructor(
        private dictSourceService: DictSourceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictSourceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dictSourceListModification',
                content: 'Deleted an dictSource'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dict-source-delete-popup',
    template: ''
})
export class DictSourceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictSourcePopupService: DictSourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dictSourcePopupService
                .open(DictSourceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
