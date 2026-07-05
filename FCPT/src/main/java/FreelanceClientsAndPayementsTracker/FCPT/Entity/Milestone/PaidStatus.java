package FreelanceClientsAndPayementsTracker.FCPT.Entity.Milestone;

public enum PaidStatus {
    Yes("Yes"), No("No");
    private final String paidStatus;
    PaidStatus(String paidStatus){this.paidStatus=paidStatus;}
    private String getPaidStatus(){return paidStatus;}
}