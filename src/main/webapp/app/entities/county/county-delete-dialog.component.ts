import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICounty } from 'app/shared/model/county.model';
import { CountyService } from './county.service';

@Component({
  templateUrl: './county-delete-dialog.component.html',
})
export class CountyDeleteDialogComponent {
  county?: ICounty;

  constructor(protected countyService: CountyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('countyListModification');
      this.activeModal.close();
    });
  }
}
