import { Component, OnInit} from '@angular/core';
import { ClientResponse } from '../client-response';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  public clientList = [];
  filterForm: FormGroup;
  public errorMsg: String;

  constructor(
    private clientApi: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      fromDate: '',
      toDate: ''
    });
  }

  ngOnInit(): void {
    this.getClients(null, null);
  }

  getClients(fromDate: String, toDate: String) {
    console.log("retrieving list of clients");
    this.clientApi.getClients(fromDate, toDate)
      .subscribe((resp: ClientResponse) => {
      this.errorMsg =  resp.message;
      this.clientList = resp.entities;
      console.log("response: " + JSON.stringify(resp));
    }, e => {
      console.error(e);
      this.errorMsg = e;
     });

  }

  onSubmit(filterData) {
    console.warn('filtering started', filterData);
    this.getClients(filterData.fromDate, filterData.toDate);
  }

}
