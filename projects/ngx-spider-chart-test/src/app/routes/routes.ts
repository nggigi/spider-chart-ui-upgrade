import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { SpiderChartDemoComponent } from '../components/spider-chart-demo/spider-chart-demo.component';
import { RoutePaths } from '../enums/routes.enum';

export const appRoutes: Routes = [
  { path: RoutePaths.HomeComponent, component: HomeComponent },
  { path: RoutePaths.SpiderChartComponent, component: SpiderChartDemoComponent },
  { path: `**`, redirectTo: RoutePaths.HomeComponent },
];
