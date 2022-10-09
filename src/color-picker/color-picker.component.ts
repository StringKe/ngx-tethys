import { Directive, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyColorDefaultPanelComponent } from './default-panel.component';
import ThyColor from './helpers/color.class';
/**
 * 颜色选择组件
 */
@Directive({
    selector: '[thyColorPicker]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyColorPickerDirective)
        }
    ]
})
export class ThyColorPickerDirective implements OnInit {
    /**
     * 弹框偏移量
     * @type  number
     * @default 0
     */
    @Input() thyOffset: number = 0;

    private onChangeFn: (value: number | string) => void = () => {};

    private onTouchFn: () => void = () => {};

    color: string;

    public get backgroundColor(): string {
        return this.color;
    }

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {}

    @HostListener('click', ['$event'])
    togglePanel(event: Event) {
        this.thyPopover.open(ThyColorDefaultPanelComponent, {
            origin: event.currentTarget as HTMLElement,
            offset: this.thyOffset,
            manualClosure: true,
            width: '286px',
            originActiveClass: 'thy-default-picker-active',
            initialState: {
                color: new ThyColor(this.color).toHexString(true),
                colorChange: (value: string) => {
                    this.onModelChange(value);
                }
            }
        });
    }

    writeValue(value: string): void {
        this.color = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFn = fn;
    }

    onModelChange(value: string): void {
        this.color = value;
        this.onChangeFn(value);
    }
}