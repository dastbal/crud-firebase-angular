import { Component, OnInit } from '@angular/core';
import {
  NavigationBehaviorOptions,
  NavigationExtras,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  employees$ = this.employeesService.employees$;

  constructor(
    private router: Router,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {}

  onGoToEdit(item: any): void {
    this.navigationExtras.state = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  onGoToSee(item: any): void {
    this.navigationExtras.state = item;
    this.router.navigate(['details'], this.navigationExtras);
  }
  async onGoToDelete(item: any) {
    try {
      console.log('deleled', item.id);
      await this.employeesService.onDeleteEmployee(item.id);
    } catch (error) {
      console.log(error);
    }
  }
}
