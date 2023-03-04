import { KeyValue } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sortEnum' })
export class SortEnumPipe implements PipeTransform {
    transform<Tkey, Tvalue>(pairArray: KeyValue<Tkey, Tvalue>[]) {
        return pairArray.slice().sort((a, b) => +a.key > +b.key ? 1 : -1);
    }

}