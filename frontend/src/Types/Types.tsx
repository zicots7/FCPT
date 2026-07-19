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
type Status= "Complete"|"Pending"|"Delivered";
export type CreateProjects = Omit<Projects, "pid"|"client"|"platform">;
export interface Projects{
    pid:number,
    title:string,
    description:string,
    startDate:string,
    deadline:string,
    Status:Status,
    totalValue:number,
    platform:Platform,
    client:string,
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
export type UpdateClientRequest= Omit<Clients,"userId">;

export type CreateClientRequest=Omit<Clients,"userId">;

type PaymentMethod= "UPI"|"CARD"|"CASH"|"NET_BANKING"| "CRYPTO";
export interface Payment{
    id:number;
    amountPaid:number;
    datePaid:string;
    paymentMethod:PaymentMethod;
    milestoneId:number;
    milestone?:string;
};
export type CreatePayment=Omit<Payment,"id">;

type PaidStatus="Yes"|"No";
export interface Milestone{
    id:number;
    description:string;
    amount:number;
    dueDate:string;
    isPaid:PaidStatus,
    projectNameId?:number
};
export type CreateMilestone= Omit<Milestone,"id">;
export enum InteractionType {
    revision_request = "revision_request",
    contract = "contract",
    requirement = "requirement",
    dispute = "dispute",
    general_note = "general_note"
}
export type Log=|{
        pid: number;

        message: string;

        tags: string;

        timestamp: string;

        interactionType: InteractionType.revision_request;

        details: RevisionRequestDetails;
    }|{
        pid: number;

        message: string;

        tags: string;

        timestamp: string;

        interactionType: InteractionType.contract;

        details: ContractDetails;
    }
    | {
        pid: number;

        message: string;

        tags: string;

        timestamp: string;

        interactionType: InteractionType.requirement;

        details: RequirementDetails;
    }
    | {
        pid: number;

        message: string;

        tags: string;

        timestamp: string;

        interactionType: InteractionType.dispute;

        details: DisputeDetails;
    }
    | {
        pid: number;

        message: string;

        tags: string;

        timestamp: string;

        interactionType: InteractionType.general_note;

        details: GeneralNoteDetails;
    };


// Response from backend

export type LogsResponseDTO = Log & {

    logId: string;

};

export interface RevisionRequestDetails {

    message: string;

    revisionNumber: string;

    affectedPages: string[];

    priority: Priority;
}


// Contract Details
export interface ContractDetails {

    contractValue: string;

    paymentTerms: string;

    deliverables: string[];

    signedDate: string;
}


// Requirement Details
export interface RequirementDetails {

    description: string;

    techPreference: string;

    budgetFlexible: boolean;

    deadlineFlexible: boolean;
}


// Dispute Details
export interface DisputeDetails {

    reason: string;

    amountDisputed: string;

    resolutionStatus: string;
}


// General Note Details
export interface GeneralNoteDetails {

    message: string;

    tags: string[];
}
 type Priority= "Low"|"Medium"|"High";


                                  