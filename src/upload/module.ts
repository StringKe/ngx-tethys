import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ThyFileDropDirective } from './file-drop.directive';
import { ThyFileSelectComponent } from './file-select.component';
import { THY_UPLOAD_DEFAULT_OPTIONS_PROVIDER } from './upload.config';
import { ThyUploadService } from './upload.service';

// import { ThyDirectiveModule } from 'ngx-tethys/directive';

@NgModule({
    imports: [CommonModule, HttpClientModule, ThyFileSelectComponent, ThyFileDropDirective],
    providers: [ThyUploadService, THY_UPLOAD_DEFAULT_OPTIONS_PROVIDER],
    exports: [ThyFileSelectComponent, ThyFileDropDirective]
})
export class ThyUploadModule {}
