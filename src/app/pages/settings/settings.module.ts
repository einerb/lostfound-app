import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { ComponentsModule } from "../../components/components.module";
import { SettingsComponent } from "./settings.component";
import { SettingsRoutingModule } from "./settings-routing.module";
import { ModalDonateComponent } from "./modal-donate/modal-donate.component";

@NgModule({
  declarations: [SettingsComponent, ModalDonateComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatCheckboxModule,
    SettingsRoutingModule,
  ],
  entryComponents: [ModalDonateComponent],
})
export class SettingsModule {}
