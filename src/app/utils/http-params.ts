import { HttpParams } from "@angular/common/http";

export function setHttpParams<T>(props: T): HttpParams {
  let params = new HttpParams();

  for( let key in props ) {
    if(!!props[key]) params = params.append(key, String(props[key]));
  }

  return params;
}