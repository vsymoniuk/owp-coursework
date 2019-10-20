import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterializeService } from '../materialize/materialize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeService.toast('Вітаємо! Тепер ви можете увійти в систему.')
      } else if (params['accesDenied']) {
        MaterializeService.toast('Для початку роботи, пройдіть авторизацію.')
      } else if (params['sessionExpired']) {
        MaterializeService.toast('Поточна сесія завершилась. Для продовження пройдіть повторну аутентифікацію ')
      }
    })
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe()
  }

  onSubmit() {
    this.form.disable()

    // const user = {
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // }

    this.sub = this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/categories'])
      },
      error => {
        this.form.enable()
        MaterializeService.toast(error.error.message)
      }
    )
  }
}
