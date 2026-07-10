export interface Client{
userId:number,
username:string,
firstName:string,
lastName:string,
email:string,
platform:Platform,
company:string,
addedDate:string
}
enum Platform{
Fiverr="Fiverr",Direct="Direct",Upwork="Upwork"
}
