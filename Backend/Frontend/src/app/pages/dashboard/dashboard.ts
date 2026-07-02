import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  dashboard: any = {};

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {

    console.log("Dashboard Component Loaded");

    this.loadDashboard();

  }

  loadDashboard(): void {

    console.log("Calling Dashboard API");

    this.dashboardService.getDashboard().subscribe({

      next: (response: any) => {

        console.log("Dashboard Response:", response);

        this.dashboard = response;

      },

      error: (err) => {

        console.error("Dashboard Error:", err);

      }

    });

  }

  logout(): void {

    localStorage.removeItem("token");
    localStorage.removeItem("email");

    this.router.navigate(['/login']);

  }

}