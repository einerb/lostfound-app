import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thousandsPipe",
})
export class ThousandPipe implements PipeTransform {
  transform(value: any) {
    if (value !== null)
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
