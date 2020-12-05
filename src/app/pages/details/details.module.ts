import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "src/app/components/components.module";
import { DetailsComponent } from "./details.component";
import { DetailsRoutingModule } from "./details-routing.module";
import { PipeModule } from 'src/app/services/pipes/pipe.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DetailsRoutingModule,
    PipeModule.forRoot(),
  ],
})
export class DetailsModule {}
