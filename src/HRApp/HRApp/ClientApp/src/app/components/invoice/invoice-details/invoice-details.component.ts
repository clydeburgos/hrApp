import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/settings.model';
import { InvoiceItems } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  InvoiceItems: any[];

  businessInfo: Company;

  constructor(private invoiceService: InvoiceService) { 
    this.InvoiceItems = [];
    this.businessInfo = new Company();
  }

  ngOnInit() {
    this.loadInvoiceItems();
    this.addToItemList(null);
  }

  addToItemList(item){
    let invoices = this.InvoiceItems;
    let invoiceItem = new InvoiceItems();
    invoiceItem.ItemId = invoices.length + 1;
    invoiceItem.Qty = 1;

    if(item) 
    {
      invoiceItem.Amount = invoiceItem.Rate * invoiceItem.Qty;
      this.InvoiceItems.splice(this.InvoiceItems.length - 1, 1, invoiceItem);
      return false;
    }
    else {
      invoiceItem.Rate = 0;
      invoiceItem.Amount = 0;
      this.InvoiceItems.push(invoiceItem);
    }
  }

  changeQty(val, newItem){
    let newVal = val;
    this.InvoiceItems.forEach((item) => {
      if(item.ItemId === newItem.ItemId) {
        item.Amount = item.Rate * newVal;
      }
    })
  }

  loadInvoiceItems(){
    this.invoiceService.getMockInvoiceItems().subscribe((res) => {
      this.InvoiceItems = res;
    });
  }

  deleteItem(item){
    this.invoiceService.removeMockInvoiceItem(item.ItemId);
  }

  addNewItem(){
    let mockServiceItem = new InvoiceItems();
    mockServiceItem.ItemId = this.InvoiceItems.length + 1;
    this.invoiceService.addMockInvoiceItem(mockServiceItem);
  }
}
