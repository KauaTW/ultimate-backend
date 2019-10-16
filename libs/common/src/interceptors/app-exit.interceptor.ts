import {NestInterceptor, ExecutionContext, HttpException, Injectable, CallHandler} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ExitInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle()
      .pipe(
        catchError((e) => {
          if (e instanceof  HttpException) {
            return throwError(e);
          } else {
            return throwError(new HttpException('Internal Error', 500));
          }
        }),
      )
      .pipe(
        map((data) => {
          return {data};
        }),
      );
  }
}
