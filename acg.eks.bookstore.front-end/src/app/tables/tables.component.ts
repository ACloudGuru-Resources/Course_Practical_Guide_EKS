import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'environments/environment';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData: TableData;
    public inventoryList: any;
    public searchString: string;

  constructor(public http: HttpService) { 
    this.tableData = {
        headerRow: [ 'ID', 'Name', 'Available Copies', 'Unavailable Copies', 'Total'],
        dataRows: [[]]
      };
    this.getInventoryList();
  }

  async getInventoryList() {
    const request = await this.http.GET<any>(environment.inventoryApi + '/summary');
    request.subscribe(
      (result) => {
          this.inventoryList = result;
          this.tableData.dataRows = this.inventoryList;
  
          console.log(this.inventoryList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

  }

}
