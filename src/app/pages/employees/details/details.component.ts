import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };
  employee: any;
  constructor(
    private router: Router,
    private employeesService: EmployeesService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras.state;
  }

  ngOnInit(): void {}
  onGoToEdit(): void {
    this.navigationExtras.state = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  async onDelete() {
    try {
      await this.employeesService.onDeleteEmployee(this.employee.id);
      console.log('deleled');
    } catch (error) {
      console.log(error);
    }
  }

  back() {
    this.router.navigate(['list']);
  }
}
