import { Component, OnInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-autocomplete-custom-example',
    templateUrl: './custom.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyAutocompleteCustomExampleComponent implements OnInit {
    thySize = '';

    value = '';

    children: Array<{ label: string; value: string }> = [];

    listOfOption: Array<{ label: string; value: string }> = [];

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        for (let i = 10; i < 36; i++) {
            this.children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = [...this.children];
    }

    valueChange(newValue: string) {
        this.listOfOption = this.children.filter(item => item.label.includes(newValue));
    }
}