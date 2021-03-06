import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { JwtService } from './jwt.service';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

// key that is used to access the data in local storage
const STORAGE_KEY = 'cached_jwt_token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model = {
    "key": null,
    "jwt": null
  };

  private submitted = false;
  private hasValidJwt = true;

  onSubmit() {
    this.submitted = true;
    this.jwtService.checkValidSandboxToken(this.jwtService.getJwtToken());
  }

  onInit() {
    
  }


  constructor(private jwtService: JwtService, @Inject(SESSION_STORAGE) private storage: StorageService) {
    
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  isValid(token) {
    var valid = this.jwtService.checkValidSandboxToken(token)
    if (valid) {
      this.delay(2000).then(any=>{
        this.hasValidJwt = true;
        this.storage.set(STORAGE_KEY, this.model.jwt);
      });
    }
    return valid
  }

  ngOnInit() {
    var els = document.querySelectorAll(".tile a");

    [].forEach.call(els, function(el) {
      el.addEventListener("click", function() {
        if(el.innerHTML === "View More") {
        el.parentElement.querySelectorAll('.more-data')[0].style.display = 'flex';
        el.parentElement.style.height = '400px';
        el.innerHTML = "View Less";
      } else {
        el.parentElement.querySelectorAll('.more-data')[0].style.display = 'none';
        el.parentElement.style.height = '300px';
        el.innerHTML = "View More";
      }
      }, false);
    });

    if (environment.environment == "testbed") {
      this.model.jwt = this.jwtService.createJwtToken();
      this.hasValidJwt = true;
    } else {
      // Check to see if we have a cached JWT, and if so see if it's OK for reuse.
      var cachedToken = this.storage.get(STORAGE_KEY) || null;
      var valid = this.jwtService.checkValidSandboxToken(cachedToken)
      if (valid) {
        this.model.jwt = cachedToken;
        this.hasValidJwt = true;
      } else {
        this.hasValidJwt = false;
      }
    }
  }

}
