import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';
import { Invoice, InvoiceItems } from 'src/app/models/invoice.model';

@Injectable({
    providedIn: "root"
})
export class InvoiceService {
    private mockInvoices: BehaviorSubject<Invoice[]>;
    private mockInvoiceItems: BehaviorSubject<InvoiceItems[]>;
    constructor(private httpClient: HttpClient) { 
        this.mockInvoiceItems = new BehaviorSubject<InvoiceItems[]>([]);
    }

    //MOCK DATA
    getMockInvoices<T>(): Observable<Invoice[]>{
        return this.mockInvoices.asObservable();
    }

    getMockInvoiceItems<T>() : Observable<InvoiceItems[]>{
        return this.mockInvoiceItems.asObservable();
    }

    addMockInvoiceItem(invoiceItem: InvoiceItems){
        let items = this.mockInvoiceItems.getValue();
        items.push(invoiceItem);
        this.mockInvoiceItems.next(items);
    }

    removeMockInvoiceItem<T>(itemId: number) {
        let items = this.mockInvoiceItems.getValue();
        let filtered = items.filter((item) => {
        return item.ItemId !== itemId;
        });
        this.mockInvoiceItems.next(filtered);
    }
}
