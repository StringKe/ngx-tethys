import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

import { ThyDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('ThyWeekPickerComponent', () => {
    let fixture: ComponentFixture<TestWeekPickerComponent>;
    let fixtureInstance: TestWeekPickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyDatePickerModule, FormsModule],
            providers: [],
            declarations: [TestWeekPickerComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWeekPickerComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('general api testing', () => {
        it('should open by click and close by click at outside', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();
        }));

        it('should support thyAllowClear and work properly', fakeAsync(() => {
            const clearBtnSelector = By.css('thy-picker .thy-calendar-picker-clear .thy-icon');
            const date = new Date();
            fixtureInstance.thyValue = date;
            fixtureInstance.thyAllowClear = false;
            fixture.detectChanges();
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();

            fixtureInstance.thyAllowClear = true;
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(date);
            expect(debugElement.query(clearBtnSelector)).toBeDefined();

            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            debugElement.query(clearBtnSelector).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(null);
            expect(thyOnChange).toHaveBeenCalledWith(null);
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();
        }));

        it('should support thyDisabled', fakeAsync(() => {
            // Make sure picker clear button shown up
            fixtureInstance.thyValue = new Date();

            fixtureInstance.thyDisabled = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();

            fixtureInstance.thyDisabled = false;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(debugElement.query(By.css('.thy-picker .thy-input-disabled'))).toBeNull();
        }));

        it('should support thyPlaceHolder', () => {
            const featureKey = (fixtureInstance.thyPlaceHolder = 'TEST_PLACEHOLDER');
            fixture.detectChanges();
            expect(getPickerTrigger().getAttribute('placeholder')).toBe(featureKey);
        });
    });

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker')).nativeElement as HTMLInputElement;
    }

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker input.thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }
});

@Component({
    template: `
        <thy-week-picker
            class="d-block w-50 mb-3"
            [(ngModel)]="thyValue"
            (ngModelChange)="modelValueChange($event)"
            [thyAllowClear]="thyAllowClear"
            [thyDisabled]="thyDisabled"
            [thyPlaceHolder]="thyPlaceHolder"
        >
        </thy-week-picker>
    `
})
class TestWeekPickerComponent {
    thyAllowClear: boolean;
    thyDisabled: boolean;
    thyPlaceHolder: string = '请选择周';
    thyValue: Date;
    modelValueChange(): void {}
}