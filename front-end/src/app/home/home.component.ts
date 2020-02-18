import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../http.service'
import { environment } from 'environments/environment'
import { FormGroup, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tableData: TableData;
  public resourcesList: any;
  public searchString: string;
  public formGroup: FormGroup;
  public titleModal: any;
  public editMode: boolean;
  public _id: any;

constructor(public http: HttpService, private toastr: ToastrService) { 
  this.tableData = {
    headerRow: [ 'ID', 'Name', 'Author', 'Type', 'Date of Publication'],
    dataRows: [[]]
  };
  this.getResourcesList();
  this.titleModal = "New Resource";
}

async getResourcesList() {
  const request = await this.http.GET<any>(environment.resourceApi + '/list');
  request.subscribe(
    (result) => {
        this.resourcesList = result.data;
        this.tableData.dataRows = this.resourcesList.data;

        console.log(this.resourcesList.data);
    },
    (error) => {
      console.log(error);
    }
  );
}

process_() {
  console.log(this.formGroup.value);

  if(this.editMode) {
     this.updateResource(this._id, this.formGroup.value);  
  }
  else {
    this.saveResource(this.formGroup.value);  
  }
  
}

delete() {
  this.deleteResource(this._id);
}

register(id: any) {
  let data = {"ResourceId": "" + id + "" }
  this.registerResource(data);
}

new_click() {

  this.titleModal = "New Resource";
  this.editMode = false;
  this.formGroup = new FormGroup({
    Name: new FormControl(''),
    DateOfPublication: new FormControl(''),
    Author: new FormControl(''),
    Tags: new FormControl(''),
    Type: new FormControl(''),
    Description: new FormControl('')
  });

}

update_click(row: any) {

  this.titleModal = "Update Resource";
  this.editMode = true;
  this._id = row._id;
  this.formGroup = new FormGroup({
    Name: new FormControl(row.Name),
    DateOfPublication: new FormControl(row.DateOfPublication),
    Author: new FormControl(row.Author),
    Tags: new FormControl(row.Tags),
    Type: new FormControl(row.Type),
    Description: new FormControl(row.Description)
  });

}

delete_click(_id: any) {

  this.titleModal = "Delete Resource";
  this.editMode = false;
  this._id = _id;
  this.formGroup = new FormGroup({
    Name: new FormControl(''),
    DateOfPublication: new FormControl(''),
    Author: new FormControl(''),
    Tags: new FormControl(''),
    Type: new FormControl(''),
    Description: new FormControl('')
  });

}

async saveResource(data:any) {
  const request = await this.http.POST<any>(environment.resourceApi + '/create', data);
  request.subscribe(
    (result) => {
        this.getResourcesList();
        console.log(result);
    },
    (error) => {
      console.log(error);
    }
  );
    
}

async updateResource(_id:any, data:any) {
  const request = await this.http.PUT<any>(environment.resourceApi + '/update/' + _id, data);
  request.subscribe(
    (result) => {
        this.getResourcesList();
        console.log(result);
    },
    (error) => {
      console.log(error);
    }
  );
    
}

async registerResource(data:any) {
  const request = await this.http.POST<any>(environment.inventoryApi + '/register', data);
  request.subscribe(
    (result) => {
        this.getResourcesList();
        console.log(result);
        this.toastr.success("Register successfully.")
    },
    (error) => {
      this.toastr.error(error);
      console.log(error);
    }
  );
    
}

async deleteResource(_id:any) {
  const request = await this.http.DELETE<any>(environment.resourceApi + '/delete/' + _id);
  request.subscribe(
    (result) => {
        this.getResourcesList();
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
    DateOfPublication: new FormControl(''),
    Author: new FormControl(''),
    Tags: new FormControl(''),
    Type: new FormControl(''),
    Description: new FormControl('')
  });

}

}
