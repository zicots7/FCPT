package FreelanceClientsAndPayementsTracker.FCPT.Entity.Projects;

public enum Status {
    Complete("Complete"),
    Pending("Pending"),
    Delivered("Delivered");
    private final String label;
    Status(String label) {
        this.label = label;
    }

    public String getLabel() {

        return label;
    }
}