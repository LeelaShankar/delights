export class AddAddressDTO {
    address: Array<AddressDTO> = [];
    employeeid: string;
}

export class AddressDTO {
    AddressType: string;
    City: string;
    Mobile: string;
    State: string;
    StreetName: string;
    UnitStreetNo: string;
    id: string;
}