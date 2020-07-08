import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { AddressInputComponent } from './address-input/address-input.component';
import { IsolateComponent } from './isolate/isolate.component';
import { FlowerExtractComponent } from './flower-extract/flower-extract.component';
import { FormulationComponent } from './formulation/formulation.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, AddressInputComponent, IsolateComponent, FlowerExtractComponent, FormulationComponent],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
