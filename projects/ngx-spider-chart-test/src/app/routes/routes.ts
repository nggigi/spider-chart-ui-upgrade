import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RoutePaths } from '../enums/routes.enum';
import { SpiderChartDemoComponent } from '../components/spider-chart-demo/spider-chart-demo.component';

export const appRoutes: Routes = [
  { path: RoutePaths.HomeComponent, component: HomeComponent },
  { path: RoutePaths.SpiderChartComponent, component: DashboardComponent },
  { path: 'spider-chart', component: DashboardComponent },
  { path: 'spider-chart-demo', component: SpiderChartDemoComponent },
  { path: `**`, redirectTo: RoutePaths.HomeComponent },
];
