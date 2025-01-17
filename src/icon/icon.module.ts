import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyIconComponent } from './icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [ThyIconComponent, CommonModule, FormsModule, HttpClientModule],
    exports: [ThyIconComponent]
})
export class ThyIconModule {}
