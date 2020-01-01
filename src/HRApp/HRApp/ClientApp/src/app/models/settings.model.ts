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
    public Username: string = 'clydeburgos'; 
    public Email: string = 'clyde@scalesquad.com';
    public FirstName: string = 'Vincent Clyde';
    public LastName: string = 'Burgos';
    public IsActive: boolean = true;
    public Role: number = 0;
    public Company: Company = new Company();
    public Details: UserDetails = new UserDetails();
}

export class UserDetails {
    public FullAddress: string = '462 – A Durian Street, Juliville Subd., Tigatto, Davao City, Philippines';
    public BankName: string = 'BDO';
    public AccountNumber: string = '003250343050';
    public BankFullAddress: string = 'Bangoy, Davao City, 8000, Philippines';
}