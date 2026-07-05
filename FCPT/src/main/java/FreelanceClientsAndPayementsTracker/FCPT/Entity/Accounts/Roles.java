package FreelanceClientsAndPayementsTracker.FCPT.Entity.Accounts;

public enum Roles {
    admin("admin"),
    client("client");
    private final String displayRole;
    Roles(String displayRole){
        this.displayRole=displayRole;
    }
    private String DisplayRole(){
        return displayRole;
    }
}
