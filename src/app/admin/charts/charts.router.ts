import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const chartRoutes: Routes = [
	
];

@NgModule({
	imports: [
		RouterModule.forChild(chartRoutes),
		
	],
	exports: [
		RouterModule
	]
})
export class ChartsRouterModule { }