import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjFile2Dict } from './proj-file-2-dict.model';
import { ProjFile2DictPopupService } from './proj-file-2-dict-popup.service';
import { ProjFile2DictService } from './proj-file-2-dict.service';

@Component({
    selector: 'jhi-proj-file-2-dict-delete-dialog',
    templateUrl: './proj-file-2-dict-delete-dialog.component.html'
})
export class ProjFile2DictDeleteDialogComponent {

    projFile2Dict: ProjFile2Dict;

    constructor(
        private projFile2DictService: ProjFile2DictService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projFile2DictService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projFile2DictListModification',
                content: 'Deleted an projFile2Dict'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proj-file-2-dict-delete-popup',
    template: ''
})
export class ProjFile2DictDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projFile2DictPopupService: ProjFile2DictPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projFile2DictPopupService
                .open(ProjFile2DictDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
