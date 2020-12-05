import localeEsCo from "@angular/common/locales/es-CO";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule, LOCALE_ID } from "@angular/core";
import { registerLocaleData, CommonModule } from "@angular/common";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./services/guards/auth.guard";
import { ComponentsModule } from "./components/components.module";
import { InterceptRequestsService } from "src/app/services/intercepts/intercept-request.service";

registerLocaleData(localeEsCo, "es-Co");

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    InterceptRequestsService,
    { provide: LOCALE_ID, useValue: "es-Co" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptRequestsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
