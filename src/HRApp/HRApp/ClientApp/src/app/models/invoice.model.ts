export class Invoice {
  public InvoiceNumber : string;
  public Client : string;
  public PaymentTerm : string;
  public DueDate : string;
  public BalanceDue: number; 
  public Status: string;
  }

export class InvoiceItems {
  public ItemId: number;
  public ItemName : string;
  public Qty : number;
  public Rate : number;
  public Amount : number;
}