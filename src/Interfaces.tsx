
export interface ModalButtons {
    name : string;
    color : string;
    InAction : boolean;
    callback : ()=> void;
}

export interface ClientStructure {
    ID : number;
    CreatedAt : string;
    UpdatedAt : string;
    DeletedAt : string;
    ClientID : string;
    FirstName : string;
    LastName : string;
    Email : string;
    Phone : string;
    Address : string;
    BusinessName : string;
    Status : string;
    ValidTill : string;
}

export interface BillStructure{
    ID : number;
    CreatedAt : string;
    UpdatedAt : string;
    DeletedAt : string;
    ClientID : string;
    BackupCount : Number;
    BackupSize : number;
    TotalCost : string;
    Billed : boolean;
}

export interface BackUpStructure{
    ID : number;
    CreatedAt : string;
    UpdatedAt : string;
    ClientID : string;
    Name : string;
    Size : number;
    Bill : number;

}