import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SortEnumPipe } from './pipes/sort-enum.pipe';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        AppComponent,
        SortEnumPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCheckboxModule,
        MatSliderModule,
        MatSnackBarModule,
        MatButtonToggleModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
