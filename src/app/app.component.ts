import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppConfigService } from './providers/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'globex-ui';

  constructor(private http: HttpClient, private config: AppConfigService) {
    console.log(this.config.getConfig());
  }
}