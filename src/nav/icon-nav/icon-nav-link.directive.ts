import { NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thyIconNavLink]',
    template: '<ng-content></ng-content><thy-icon *ngIf="icon" [thyIconName]="icon"></thy-icon>',
    standalone: true,
    imports: [NgIf, ThyIconComponent]
})
export class ThyIconNavLinkComponent {
    @HostBinding('class.active') navLinkActive = false;

    @HostBinding('class.thy-icon-nav-link') navLinkClass = true;

    icon: string;

    @Input()
    set thyIconNavLinkIcon(icon: string) {
        this.icon = icon;
    }

    @Input()
    set thyIconNavLinkActive(active: string) {
        this.navLinkActive = coerceBooleanProperty(active);
    }
}
