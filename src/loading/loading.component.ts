import { Component, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { NgIf } from '@angular/common';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 加载组件，页面调用接口等待请求时，给用户的反馈
 * @name thy-loading
 * @order 10
 */
@Component({
    selector: 'thy-loading',
    templateUrl: './loading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf]
})
export class ThyLoadingComponent {
    public isDone: boolean;

    public tip: string;

    public isMask: boolean;

    /**
     * 数据是否加载完成
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyDone(value: boolean | string) {
        this.isDone = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /**
     * 自定义加载提示文案
     */
    @Input()
    set thyTip(value: string) {
        this.tip = value;
        this.changeDetectorRef.markForCheck();
    }

    /**
     * 加载时是否启用嵌套遮罩模式，不传或传 false，没有遮罩层，加载完成出现内容
     */
    @Input()
    @InputBoolean()
    set thyIsMask(value: boolean | string) {
        this.isMask = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    @HostBinding('class.thy-loading') loadingClassName = true;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}
}
