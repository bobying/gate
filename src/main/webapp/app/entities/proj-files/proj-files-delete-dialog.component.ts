import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjFiles } from './proj-files.model';
import { ProjFilesPopupService } from './proj-files-popup.service';
import { ProjFilesService } from './proj-files.service';

@Component({
    selector: 'jhi-proj-files-delete-dialog',
    templateUrl: './proj-files-delete-dialog.component.html'
})
export class ProjFilesDeleteDialogComponent {

    projFiles: ProjFiles;

    constructor(
        private projFilesService: ProjFilesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projFilesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projFilesListModification',
                content: 'Deleted an projFiles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proj-files-delete-popup',
    template: ''
})
export class ProjFilesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projFilesPopupService: ProjFilesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projFilesPopupService
                .open(ProjFilesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
