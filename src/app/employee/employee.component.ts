import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { Position } from '../data/position';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  private paramSubscription : any;
  private employeeSubscription : any;
  private getPositionsSubcription : any;
  private	saveEmployeeSubscription : any;
  employee : EmployeeRaw;
  positions : Position[] = [];
  successMessage : boolean = false;
  failMessage : boolean = false;


  constructor(private employeeService: EmployeeService, 
              private route: ActivatedRoute, 
              private positionService: PositionService) { }

  ngOnInit() {

    this.paramSubscription = this.route.params.subscribe(params => {

      this.employeeSubscription = this.employeeService.getEmployee(params['_id']).subscribe((emp) => {
        this.employee = emp[0];

        this.getPositionsSubcription = this.positionService.getPositions().subscribe(data => {
          this.positions = data;
        });
      });

      
    });
  }

  onSubmit(f : NgForm) : void { 
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(() => {
        this.successMessage = true;
        
        setTimeout(() => {
          this.successMessage = false;
        }, 
        2500);
      },
      () => {
        this.failMessage = true;
        setTimeout(() => {
          this.failMessage = false;
        }, 
        2500);
      })
  }

  ngOnDestroy() {

    if (this.paramSubscription) { 
      this.paramSubscription.unsubscribe(); 
    }

    if (this.employeeSubscription) { 
      this.employeeSubscription.unsubscribe(); 
    }

    if (this.getPositionsSubcription) { 
      this.getPositionsSubcription.unsubscribe(); 
    }

    if (this.saveEmployeeSubscription) { 
      this.saveEmployeeSubscription.unsubscribe(); 
    }
  }

}
