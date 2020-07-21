import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICounty } from 'app/shared/model/county.model';
import { CountyService } from './county.service';
import { CountyDeleteDialogComponent } from './county-delete-dialog.component';

@Component({
  selector: 'jhi-county',
  templateUrl: './county.component.html',
})
export class CountyComponent implements OnInit, OnDestroy {
  counties?: ICounty[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected countyService: CountyService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.countyService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ICounty[]>) => (this.counties = res.body || []));
      return;
    }

    this.countyService.query().subscribe((res: HttpResponse<ICounty[]>) => (this.counties = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCounties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICounty): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCounties(): void {
    this.eventSubscriber = this.eventManager.subscribe('countyListModification', () => this.loadAll());
  }

  delete(county: ICounty): void {
    const modalRef = this.modalService.open(CountyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.county = county;
  }
}
