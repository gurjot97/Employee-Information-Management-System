import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { 	ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: []
})
export class PositionComponent implements OnInit {

  private	paramSubscription : any;
  private	positionSubscription : any;
  private	savePositionSubscription : any;
  position : Position;
  successMessage : boolean = false;
  failMessage : boolean = false;


  constructor(private positionService: PositionService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe( params => {

      this.positionSubscription = this.positionService.getPosition(params['_id']).subscribe((pos) => {
        this.position = pos[0];
      });  
    });
  }

  onSubmit(f : NgForm) : void  {
    this.savePositionSubscription = this.positionService.savePosition(this.position).subscribe(() => {
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
    });
  }

  ngOnDestroy() {

    if (this.paramSubscription) { 
      this.paramSubscription.unsubscribe(); 
    }

    if (this.positionSubscription) { 
      this.positionSubscription.unsubscribe(); 
    }

    if (this.savePositionSubscription) { 
      this.savePositionSubscription.unsubscribe(); 
    }
  }
  
}
