import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeesService } from 'src/app/pages/employees/employees.service';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: any;
  private isEmail: string = '/S+@S+.S+/';
  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };
  employee: Employee | any = {
    id: '1',
    name: 'ss',
    email: 'd@gmail.com',
    startDate: 'dkkkss',
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeesService: EmployeesService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras.state;
  }

  ngOnInit(): void {
    this.initForm();
    if (typeof this.employee === undefined) {
      this.router.navigate(['new']);
    } else {
      this.employeeForm.patchValue(this.employee);
    }
  }
  onSave() {
    console.log('saved', this.employeeForm.value);
    console.log('hey');

    const employee = this.employeeForm.value;
    const employeeId = this.employee?.id || null;
    this.employeesService.onSaveEmployee(this.employeeForm.value, employeeId);
    this.employeeForm.reset();
  }
  private initForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      startDate: ['', [Validators.required]],
    });
  }
  back() {
    this.router.navigate(['list']);
  }
}
