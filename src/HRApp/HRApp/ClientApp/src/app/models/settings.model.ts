export class Company {
    public Id: number = 1;
    public Email :string;
    public ContactNumber :string;
    public Address :string = '420 Poplar Street';
    public BusinessName :string = 'ScaleSquad'; 
    public Phone :string = '000-0000-0000';
    public City :string = 'Bellevue';
    public State :string = 'KY';
    public PostalCode :string = '41094';
}

export class User {
    public Id: number = 1;
    public Username: string = ''; 
    public Email: string = '';
    public FirstName: string = '';
    public LastName: string = '';
    public IsActive: boolean = true;
    public Role: number = 0;
    public Company: Company = new Company();
    public Details: UserDetails = new UserDetails();
}

export class UserDetails {
    public FullAddress: string = '';
    public BankName: string = '';
    public AccountNumber: string = '';
    public BankFullAddress: string = '';
    public NetSalary: string = '';
}