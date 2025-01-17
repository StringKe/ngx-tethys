import { Component, HostBinding, Inject, InjectionToken, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyProgressType } from './interfaces';
import { NgStyle } from '@angular/common';
import { InputNumber } from 'ngx-tethys/core';

export interface ThyParentProgress {
    max: number;
    bars: ThyProgressStripComponent[];
}
export const THY_PROGRESS_COMPONENT = new InjectionToken<ThyParentProgress>('THY_PROGRESS_COMPONENT');

/**
 * @private
 */
@Component({
    selector: 'thy-progress-bar',
    templateUrl: './progress-strip.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgStyle]
})
export class ThyProgressStripComponent {
    private value: number;

    private hostRenderer = useHostRenderer();

    color: string;

    @HostBinding(`class.progress-bar`) isProgressBar = true;

    @HostBinding('style.width.%') percent = 0;

    @Input() thyTips: string | TemplateRef<HTMLElement>;

    @Input() set thyType(type: ThyProgressType) {
        this.hostRenderer.updateClass(type ? [`progress-bar-${type}`] : []);
    }

    @Input()
    @InputNumber()
    set thyValue(value: number) {
        if (!value && value !== 0) {
            return;
        }
        this.value = value;
        this.recalculatePercentage();
    }

    @Input() set thyColor(color: string) {
        this.color = color || '';
    }

    constructor(@Inject(THY_PROGRESS_COMPONENT) private progress: ThyParentProgress) {}

    recalculatePercentage(): void {
        this.percent = +((this.value / this.progress.max) * 100).toFixed(2);
    }
}
