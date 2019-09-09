import * as emailjs from 'emailjs-com';

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd} from '@angular/router';
import { environment } from '../environments/environment';

declare let gtag : Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  events: String[] = [];
  form: FormGroup;
  date: number;

  constructor(private translate: TranslateService, private snack: MatSnackBar, private router: Router) {
    this.date = new Date().getFullYear();

    translate.get('events').subscribe((result: String[]) => { 
      this.events = result;
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsToken, { 'page_path': event.urlAfterRedirects });
      }
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'message': new FormControl('', [Validators.required])
    });
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }

  send(form: NgForm) {
    let templateParams = {
      'reply_to': this.email.value,
      'from_name': this.name.value,
      'message_html': this.message.value
    };
    this.form.disable();
    emailjs.send(environment.emailjsServiceId, environment.emailjsTemplate, templateParams, environment.emailjsToken)
    .then(() => {
      this.form.enable();
      form.resetForm({})
      this.snack.open(this.translate.instant('success'), 'OK', {
        duration: 5000
      });
    }, (error) => {
      this.form.enable();
      form.resetForm({'name': this.name.value, 'email': this.email.value, 'message': this.message.value })
      this.snack.open(this.translate.instant('failure'), 'OK', {
        duration: 5000
      });
    });
  }
}
