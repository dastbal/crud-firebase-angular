import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/shared/models/employee.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  employees$: Observable<Employee[]> | undefined;
  private employeesCollection: AngularFirestoreCollection<Employee>;

  // constructor(firestore: Firestore) {
  //   const employeesCollection = collection(firestore, 'employees');
  //   this.employees$ = collectionData(employeesCollection);
  //   this.getEmployee()
  // }
  constructor(private readonly afs: AngularFirestore) {
    this.employeesCollection = afs.collection<Employee>('employees');
    this.getEmployee();
  }
  onDeleteEmployee(id: string) {
    return new Promise(async (res, rej) => {
      try {
        const result = await this.employeesCollection.doc(id).delete();
        res(result);
      } catch (error) {}
    });
  }
  onSaveEmployee(employee: any, employeeId: string) {
    return new Promise(async (res, rej) => {
      console.log('hey');
      try {
        const id = employeeId || this.afs.createId();
        const data = { id, ...employee };
        const result = await this.employeesCollection.doc(id).set(data);
        res(result);
      } catch (e) {
        rej(e);
      }
    });
  }
  private getEmployee() {
    this.employees$ = this.employeesCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Employee))
      );
  }
}
