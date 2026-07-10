export interface User{
     id:number;
    username:string;
    role:string;
    firstName:string;
    lastName:string;
    email:string;
    dateJoined:string;
    lastLogin:string,
    isStaff:boolean;
    isSuperuser:boolean;
    isDemo:boolean;
    isActive:boolean;
};
export interface Projects{
     pid:number,
    title:string,
    description:string,
    startDate:string,
    deadline:string,
    Status:string,
    totalValue:number,
    clientId:number

};
type Platform = "Fiverr" | "Upwork" | "Direct";
export interface Clients{
  userId:number;
  username:string;
    firstName:string;
    lastName:string;
    email:string;
    password?:string;
    platform:Platform;
    company:string;
    addedDate?:string;

};
export interface LoginRequest {
    username:string;
    password:string;
};


export interface LoginResponse {
    token:string;
    username:string;
    role:string;
    id:any;
};
export interface UpdateClientRequest {
    username:string;
    email:string;
    password?:string;
    firstName:string;
    lastName:string;
    company:string;
    platform:Platform;

};
export interface CreateClientRequest {

    username:string;

    firstName:string;

    lastName:string;

    password:string;

    email:string;

    company:string;

    platform:Platform;

}