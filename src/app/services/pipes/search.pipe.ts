import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchPipe",
})
export class SearchPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === "" || arg.length < 3) return value;
    const results = [];
    for (const accessory of value) {
      if (
        accessory.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        accessory.description.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        accessory.category.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        accessory.user[0].name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        accessory.user[0].lastname.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        results.push(accessory);
      }
    }
    return results;
  }
}
