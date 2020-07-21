import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICounty, County } from 'app/shared/model/county.model';
import { CountyService } from './county.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country/country.service';

@Component({
  selector: 'jhi-county-update',
  templateUrl: './county-update.component.html',
})
export class CountyUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountry[] = [];

  editForm = this.fb.group({
    id: [],
    countyName: [],
    country: [],
  });

  constructor(
    protected countyService: CountyService,
    protected countryService: CountryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ county }) => {
      this.updateForm(county);

      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));
    });
  }

  updateForm(county: ICounty): void {
    this.editForm.patchValue({
      id: county.id,
      countyName: county.countyName,
      country: county.country,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const county = this.createFromForm();
    if (county.id !== undefined) {
      this.subscribeToSaveResponse(this.countyService.update(county));
    } else {
      this.subscribeToSaveResponse(this.countyService.create(county));
    }
  }

  private createFromForm(): ICounty {
    return {
      ...new County(),
      id: this.editForm.get(['id'])!.value,
      countyName: this.editForm.get(['countyName'])!.value,
      country: this.editForm.get(['country'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICounty>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICountry): any {
    return item.id;
  }
}
