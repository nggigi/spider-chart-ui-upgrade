import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RoutePaths } from '../enums/routes.enum';

export const appRoutes: Routes = [
  { path: RoutePaths.HomeComponent, component: HomeComponent },
  { path: RoutePaths.SpiderChartComponent, component: DashboardComponent },
  { path: `**`, redirectTo: RoutePaths.HomeComponent },
];
