import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  private employees : Employee[];
  private	getEmployeesSub;
  private loadingError: boolean = false;
  filteredEmployees: Employee[] 

  constructor(private e : EmployeeService,
              private router : Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.e.getEmployees().subscribe(
      employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
      },
      function(e) {
        this.loadingError = true;
      }
    );
  }

  ngOnDestroy() {
    if(this.getEmployeesSub !== "undefined") {
      this.getEmployeesSub.unsubscribe();
    }
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  onEmployeeSearchKeyUP(event: any) {
    let substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((employees) => 
    ((employees.FirstName.toLowerCase().indexOf(substring) != -1) || 
    (employees.LastName.toLowerCase().indexOf(substring) != -1) ||
    (employees.Position["PositionName"].toLowerCase().indexOf(substring) != -1)))

  }
}
