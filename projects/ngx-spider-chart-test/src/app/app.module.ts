import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonsModule, InputFieldModule } from 'nextsapien-component-lib';
import { SpiderChartComponent } from 'ngx-spider-chart';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HighlightCodeModule } from './highlight.code.module';
import { appRoutes } from './routes/routes';

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    IonicModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SpiderChartComponent,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    MatIconModule,
    GoogleMapsModule,
    HighlightCodeModule,
    MatRippleModule,
    InputFieldModule,
    ButtonsModule,
  ],
})
export class AppModule {}
