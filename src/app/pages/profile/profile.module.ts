import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ComponentsModule } from "src/app/components/components.module";
import { ProfileComponent } from "./profile.component";
import { PipeModule } from "src/app/services/pipes/pipe.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ModalAddComponent } from "./modal-add/modal-add.component";
import { ModalUploadComponent } from './modal-upload/modal-upload.component';

@NgModule({
  declarations: [ProfileComponent, ModalAddComponent, ModalUploadComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PipeModule.forRoot(),
    ProfileRoutingModule,
  ],
  entryComponents: [ModalAddComponent, ModalUploadComponent],
})
export class ProfileModule {}
