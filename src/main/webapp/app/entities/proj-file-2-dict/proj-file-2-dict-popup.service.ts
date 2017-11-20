import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjFile2Dict } from './proj-file-2-dict.model';
import { ProjFile2DictService } from './proj-file-2-dict.service';

@Injectable()
export class ProjFile2DictPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private projFile2DictService: ProjFile2DictService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.projFile2DictService.find(id).subscribe((projFile2Dict) => {
                    this.ngbModalRef = this.projFile2DictModalRef(component, projFile2Dict);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.projFile2DictModalRef(component, new ProjFile2Dict());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    projFile2DictModalRef(component: Component, projFile2Dict: ProjFile2Dict): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.projFile2Dict = projFile2Dict;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
