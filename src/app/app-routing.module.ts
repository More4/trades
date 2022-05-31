import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradesComponent } from './pages/trades/trades.component';

const routes: Routes = [
    { path: '', component: TradesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
