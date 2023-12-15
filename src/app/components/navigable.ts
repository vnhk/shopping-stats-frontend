import {Router} from "@angular/router";

export class Navigable {
  constructor(protected router: Router) {
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri])
    );
  }
}
