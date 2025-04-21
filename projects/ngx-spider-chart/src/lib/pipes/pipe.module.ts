import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InitialsPipe } from './initials/initials.pipe';

@NgModule({
  declarations: [InitialsPipe],
  imports: [CommonModule],
  exports: [InitialsPipe],
  providers: [InitialsPipe],
})
export class PipeModule {}
