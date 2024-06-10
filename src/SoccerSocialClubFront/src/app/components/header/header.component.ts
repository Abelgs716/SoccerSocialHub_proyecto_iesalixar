import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  activateFab: boolean = true;
  showAdditionalButtons: boolean = false;
  showAdditionalButtons2: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdministrator();
  }

  logout() {
    this.authService.logout();
    this.resetFab();
  }

  cambioBool1() {
    this.showAdditionalButtons = !this.showAdditionalButtons;
    if (this.showAdditionalButtons) {
      this.showAdditionalButtons2 = false;
      this.activateFab = false;
    } else {
      this.activateFab = true;
    }
  }

  cambioBool2() {
    this.showAdditionalButtons2 = !this.showAdditionalButtons2;
    if (this.showAdditionalButtons2) {
      this.showAdditionalButtons = false;
      this.activateFab = false;
    } else {
      this.activateFab = true;
    }
  }

  resetFab() {
    this.showAdditionalButtons = false;
    this.showAdditionalButtons2 = false;
    this.activateFab = true;
  }
}
