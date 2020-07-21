import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountyUpdateComponent } from 'app/entities/county/county-update.component';
import { CountyService } from 'app/entities/county/county.service';
import { County } from 'app/shared/model/county.model';

describe('Component Tests', () => {
  describe('County Management Update Component', () => {
    let comp: CountyUpdateComponent;
    let fixture: ComponentFixture<CountyUpdateComponent>;
    let service: CountyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CountyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CountyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new County(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new County();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
