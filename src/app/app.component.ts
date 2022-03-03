import { Component } from '@angular/core';
import { DataSourceService } from "./helper/datasource";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
operators = [];
operands = [];
scode:string = ''
n1:number = 0;n2:number = 0;N1:number = 0;N2:number = 0;
programLength:number = 0;programVocabulary:number = 0;programVolume:number = 0;
programLevel:number = 0; programDifficulty:number = 0; programEffort:number = 0; 
programTime:number = 0; programBug:number = 0; 
constructor(private dataSource:DataSourceService,private spinner:NgxSpinnerService){

}
calculate(){
  this.spinner.show();
  this.dataSource.calculate({code:this.scode})
  .subscribe(data =>{
   if(data.operators){
     this.n1 = data.operators.length;
     this.n2 = data.operands.length;
     this.N1 = this.getSum(data.operators);
     this.N2 = this.getSum(data.operands);
     this.compute();
     this.spinner.hide();
   }
  });
}
getSum(arr:any):number{
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].counter;
  }
  return sum;
}
round(n:number){
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
compute(){
  this.programLength = this.round(this.N1)+this.round(this.N2);
  this.programVocabulary = this.round(this.n1)+this.round(this.n2);
  this.programVolume = this.round(this.programLength * (Math.log(this.programVocabulary)/Math.log(2)));
  this.programDifficulty = this.round((this.round(this.n1)/2)*(this.round(this.N2)/this.round(this.n2)));  //(n1 / 2) * (N2 / n2)  
  this.programLevel =this.round( 1/this.programDifficulty);
  this.programEffort = this.round(this.programDifficulty * this.programVolume);
  this.programTime = this.round(this.programEffort/this.programVolume);
  this.programBug = this.round(this.programEffort/18);
}
manualCompute(){
  this.compute();
}
}
