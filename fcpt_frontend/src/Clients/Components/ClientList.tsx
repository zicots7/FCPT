import { SingleClient } from "./SingleClient";

export const ClientList=()=>{
    return(
        <>
        <div className="container py-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold mb-0">Clients</h2>
    <a href="{% url 'add_client' %}" className="btn btn-primary">+ Add Client</a>
  </div>

  <div className="card shadow-sm">
    <div className="card-body p-0">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Platform</th>
            <th>Company</th>
            <th>Password</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
    <>
    <tbody><SingleClient/></tbody>

    </>
      </table>
    </div>
  </div>
  <p className="text-muted small mt-2">Total: {{ clients|length }} client(s)</p>
</div>
        </>
    );
}