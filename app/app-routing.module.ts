import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PinsComponent }      from './pins/pins.component';
import { PinDetailComponent }  from './pin-detail/pin-detail.component';
import { PinFormComponent }  from './pin-form/pin-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/pins', pathMatch: 'full' },
  { path: 'detail/:id', component: PinDetailComponent },
  { path: 'pins',     component: PinsComponent },
  { path: 'form',     component: PinFormComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

// export const routedComponent = [PinDetailComponent, PinsComponent, PinFormComponent ]
