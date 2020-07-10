import { Component, OnInit } from '@angular/core';
import { AuthenticationGuardService } from 'src/app/core/security/authentication-guard.service';
import { LoginService } from 'src/app/cts/shared/services/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.logout();
  }

}
