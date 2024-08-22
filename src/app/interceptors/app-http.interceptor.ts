import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!req.url.includes('/login')){
      let request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+this.authService.accessToken)
      });
      return next.handle(request).pipe(
        catchError(err => {
          if(err.status == 401){
            this.authService.logout();
          }
          //console.log("interceptor error :: "+err.status)
          return throwError(err);
        })
      );
    }
    return next.handle(req);
  }
}
