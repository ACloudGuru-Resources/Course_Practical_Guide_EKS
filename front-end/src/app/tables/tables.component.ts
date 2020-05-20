import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'environments/environment';
import { ConfigService } from '../shared/services/config.service';

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

  constructor(public http: HttpService, private config: ConfigService) { 
    this.tableData = {
        headerRow: [ 'ID', 'Name', 'Available Copies', 'Unavailable Copies', 'Total'],
        dataRows: [[]]
      };
    this.getInventoryList();
  }

  async getInventoryList() {
    const request = await this.http.GET<any>(this.config.api.inventoryApi + '/summary');
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
