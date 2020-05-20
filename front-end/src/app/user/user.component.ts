import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../http.service'
import { environment } from 'environments/environment'
import { FormGroup, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import { ConfigService } from '../shared/services/config.service';


declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public tableData: TableData;
  public resourcesList: any;
  public resourcesList_: any;
  public rentingList: any;
  public searchString: string;
  public formGroup: FormGroup;
  public rentingGroup: FormGroup;
  public titleModal: any;
  public editMode: boolean;
  public _id: any;
  public date: Date;
  public resource: any;
  public options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,    
    displayFormat: 'DD/MM/YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control exclude', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
  };

  constructor(public http: HttpService, private toastr: ToastrService, private config: ConfigService) { 
    this.tableData = {
      headerRow: [ 'ID', 'Name', 'E-mail'],
      dataRows: [[]]
    };
    this.getclientsList();
    this.getResourcesList();
    this.titleModal = "New Client";
    this.rentingGroup = new FormGroup({
      ResourceId: new FormControl(''),
      ClientId: new FormControl(this._id),
      RegistrationDate: new FormControl(new Date(Date.now()))
    });
    console.log(this.config.api);
  }
  
  async getclientsList() {
    const request = await this.http.GET<any>(this.config.api.clientApi + '/list');
    request.subscribe(
      (result) => {
          this.resourcesList = result;
          this.tableData.dataRows = this.resourcesList;
  
          console.log(this.resourcesList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getResourcesList() {
    const request = await this.http.GET<any>(this.config.api.resourceApi + '/list');
    request.subscribe(
      (result) => {
          this.resourcesList_ = result.data.data;
  
          console.log(this.resourcesList_);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getRentingList(id:any) {
    const request = await this.http.GET<any>(this.config.api.rentingApi + '/list/by-client-id/' + id);
    request.subscribe(
      (result) => {
          this.rentingList = result.data.items;
  
          console.log(this.rentingList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  process_() {
       
      console.log(this.formGroup.value);
  
      if(this.editMode) {
        this.updateClient(this._id, this.formGroup.value);  
      }
      else {
        this.saveClient(this.formGroup.value);  
    }
  }

  renting() {
    var date = moment(this.date).format('DD/MM/YYYY');
    this.rentingGroup.value.RegistrationDate = date;
    console.log(this.rentingGroup.value);
    this.saveRenting(this.rentingGroup.value);  
  }

  return() {
    var date = moment(this.date).format('DD/MM/YYYY');
    var obj = { ReturnDate : date};

    this.returnResource(this._id,obj);
    
  }

  delete() {
    this.deleteClient(this._id);
  }

  new_click() {

    this.titleModal = "New Client";
    this.editMode = false;
    this.formGroup = new FormGroup({
      Name: new FormControl(''),
      Email: new FormControl('')
    });
  
  }

  update_click(row: any) {

    this.titleModal = "Update Client";
    this.editMode = true;
    this._id = row._id;
    this.formGroup = new FormGroup({
      Name: new FormControl(row.Name),
      Email: new FormControl(row.Email)
    });
  
  }

  delete_click(_id: any) {

    this.titleModal = "Delete Client";
    this.editMode = false;
    this._id = _id;
    this.formGroup = new FormGroup({
      Name: new FormControl(''),
      Email: new FormControl('')
    });
  
  }

  renting_click(_id: any) {

    this.titleModal = "Renting";
    this.getResourcesList();
    this.editMode = false;
    this._id = _id; 
    
    this.rentingGroup = new FormGroup({
      ResourceId: new FormControl(this.resourcesList_[0]._id),
      ClientId: new FormControl(this._id),
      RegistrationDate: new FormControl('')
    });

    
  
  }

  return_click(_id: any) {

    this.titleModal = "Return";
    this.editMode = false;
    this._id = _id;
    this.getRentingList(this._id);
  
  }

  return_date_click(_id: any) {

    this.titleModal = "Select Return Date";
    this.editMode = false;
    this._id = _id;   
    this.date = new Date(Date.now()); 

  }

  async saveClient(data:any) {
    const request = await this.http.POST<any>(this.config.api.clientApi + '/create', data);
    request.subscribe(
      (result) => {
          this.getclientsList();
          console.log(result);
      },
      (error) => {
        console.log(error);
      }
  );
      
  }

  async saveRenting(data:any) {
    const request = await this.http.POST<any>(this.config.api.rentingApi + '/register', data);
    request.subscribe(
      (result) => {
          if(result.data && result.data.message) {
            this.toastr.warning(result.data.message)
          }
          else{ 
            this.toastr.success("Registration successfully.")
          }
          console.log(result);
          
      },
      (error) => {
        console.log(error);
      }
  );
      
  }

  async updateClient(_id:any, data:any) {
    const request = await this.http.PUT<any>(this.config.api.clientApi + '/update/' + _id, data);
    request.subscribe(
      (result) => {
          this.getclientsList();
          console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
      
  }

  async returnResource(_id:any, data:any) {
    const request = await this.http.PUT<any>(this.config.api.rentingApi + '/return/' + _id, data);
    request.subscribe(
      (result) => {
          this.getclientsList();
          if(result.data &&  result.data.message) {
            this.toastr.success(result.data.message)
          }
          else{ 
            this.toastr.success("Return successfully.")
          }
          
          console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
      
  }

  async deleteClient(_id:any) {
    const request = await this.http.DELETE<any>(this.config.api.clientApi + '/delete/' + _id);
    request.subscribe(
      (result) => {
          this.getclientsList();
          console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
      
  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      Name: new FormControl(''),
      Email: new FormControl('')
    });
  
  }



}



