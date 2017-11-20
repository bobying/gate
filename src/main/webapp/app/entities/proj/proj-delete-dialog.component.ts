import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Proj } from './proj.model';
import { ProjPopupService } from './proj-popup.service';
import { ProjService } from './proj.service';

@Component({
    selector: 'jhi-proj-delete-dialog',
    templateUrl: './proj-delete-dialog.component.html'
})
export class ProjDeleteDialogComponent {

    proj: Proj;

    constructor(
        private projService: ProjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projListModification',
                content: 'Deleted an proj'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proj-delete-popup',
    template: ''
})
export class ProjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projPopupService: ProjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projPopupService
                .open(ProjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
