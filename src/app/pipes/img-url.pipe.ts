import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environment/environment';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {
  private url: string = environment.static;

  transform(value: string | null): string | null {
    if (!value) return null
    return `${this.url}/${value}`;
  }

}
