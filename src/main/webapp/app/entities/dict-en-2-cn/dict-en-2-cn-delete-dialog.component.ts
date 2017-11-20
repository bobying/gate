import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DictEn2Cn } from './dict-en-2-cn.model';
import { DictEn2CnPopupService } from './dict-en-2-cn-popup.service';
import { DictEn2CnService } from './dict-en-2-cn.service';

@Component({
    selector: 'jhi-dict-en-2-cn-delete-dialog',
    templateUrl: './dict-en-2-cn-delete-dialog.component.html'
})
export class DictEn2CnDeleteDialogComponent {

    dictEn2Cn: DictEn2Cn;

    constructor(
        private dictEn2CnService: DictEn2CnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictEn2CnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dictEn2CnListModification',
                content: 'Deleted an dictEn2Cn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dict-en-2-cn-delete-popup',
    template: ''
})
export class DictEn2CnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictEn2CnPopupService: DictEn2CnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dictEn2CnPopupService
                .open(DictEn2CnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
