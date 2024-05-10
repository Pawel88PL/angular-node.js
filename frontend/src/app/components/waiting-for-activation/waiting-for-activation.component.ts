import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-waiting-for-activation',
  templateUrl: './waiting-for-activation.component.html',
  styleUrls: ['./waiting-for-activation.component.css']
})
export class WaitingForActivationComponent implements OnInit {

  progressValue = 0;
  delay = 5000;

  constructor(private router: Router) { }


  ngOnInit(): void {
    gsap.from('.container', {
      duration: 1,
      x: '100%',
      opacity: 0,
      scale: 0.5,
      delay: 0.5,
      ease: "power1.out"
    });
    
    this.redirectToLoginPage();
  }

  private redirectToLoginPage() {
    const interval = setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 100 / (this.delay / 100);
      } else {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 100);
  }
}