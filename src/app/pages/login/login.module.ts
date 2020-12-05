import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "src/app/components/components.module";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ComponentsModule, LoginRoutingModule],
})
export class LoginModule {}
