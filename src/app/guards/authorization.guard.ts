import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

    if(this.authService.roles.includes("ADMIN")){ //pourquoi on a passé le role dans les data du guards mais ici on a mis le role en dure ?
      return true;
    }
    this.router.navigateByUrl('/admin/notAuthorized');
    return false;
  }

}
