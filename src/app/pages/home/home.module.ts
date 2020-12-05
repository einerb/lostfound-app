import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "src/app/components/components.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { PipeModule } from "src/app/services/pipes/pipe.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    HomeRoutingModule,
    PipeModule.forRoot(),
  ],
})
export class HomeModule {}
