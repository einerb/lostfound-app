import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThousandPipe } from "./thousand.pipe";
import { SanitizerPipe } from "./sanitizer.pipe";
import { CapitalizePipe } from "./capitalize.pipe";
import { SearchPipe } from "./search.pipe";

@NgModule({
  declarations: [ThousandPipe, SanitizerPipe, CapitalizePipe, SearchPipe],
  imports: [CommonModule],
  exports: [SanitizerPipe, ThousandPipe, CapitalizePipe, SearchPipe],
})
export class PipeModule {
  static forRoot(): ModuleWithProviders<PipeModule> {
    return {
      ngModule: PipeModule,
    };
  }
}
