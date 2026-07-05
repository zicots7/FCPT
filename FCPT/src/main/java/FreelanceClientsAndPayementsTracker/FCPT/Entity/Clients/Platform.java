package FreelanceClientsAndPayementsTracker.FCPT.Entity.Clients;

public enum Platform {
    Fiverr("Fiverr"),
    Upwork("Upwork"),
    Direct("Direct");

    private final String displayName;

    Platform(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}