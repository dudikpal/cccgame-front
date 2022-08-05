import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  isLoggedIn = false;
  u = "player1";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    //console.log('menu ->' + this.isLoggedIn);
  }

  handleLogout() {
    this.authenticationService.logout();
  }

  toHome() {
    this.router.navigate(['/home']);
  }
}
