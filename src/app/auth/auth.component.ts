import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  error = null

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return
    }
    const email = authForm.value.email
    const password = authForm.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData => {
      console.log('resData', resData)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      console.log('errorMessage', errorMessage)
      this.error = errorMessage
      this.showErrorAlert(errorMessage)
      this.isLoading = false
    })

    authForm.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent()
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)

  }
}
