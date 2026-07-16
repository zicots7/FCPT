import React, { useState } from 'react'
import { InteractionType, type LogsResponseDTO, type Projects } from '../Types/Types'
import { useAuth } from '../Apis/Auth/AuthContextProvider';
import DeleteLog from './DeleteLog';

type props={
    logs:LogsResponseDTO[];
}
export default function SingleLog({logs}:props) {
  const [open,setOpen] =useState(false);
  const [loading,setLoading]=useState<boolean>(false);
  const [reload,setReload] = useState(false);
  const {user}=useAuth();
      const refreshLogs = ()=>{
          setReload(!reload);
      };
        const getBadgeClass = (type: InteractionType) => {
    switch (type) {
      case InteractionType.dispute:
        return "bg-danger";

      case InteractionType.contract:
        return "bg-success";

      case InteractionType.revision_request:
        return "bg-warning text-dark";

      case InteractionType.requirement:
        return "bg-info text-dark";

      case InteractionType.general_note:
      default:
        return "bg-secondary";
    }
  };

if (logs.length === 0) {
    return (
        
      <div className="card-body">
        <div className="text-center py-5">
          <p className="text-muted">No logs found for this project.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-body">
      <div className="timeline">
        {logs.map((log) => (
          <div
            key={log.logId}
            className="border-start ps-4 pb-4 position-relative"
          >
            <div className="position-absolute top-0 start-0 translate-middle-x bg-primary rounded-circle"></div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className={`badge ${getBadgeClass(log.interactionType)}`}>
                {log.interactionType.replace("_", " ")}
              </span>

              <small className="text-muted">
                {new Date(log.timestamp).toLocaleString()}
              </small>
                <DeleteLog
                 className="btn btn-sm btn-outline-danger"
                log={log.logId}
                onSuccess={refreshLogs}

              />
            </div>

            <div className="bg-light p-3 rounded shadow-sm">
              {/* General Note */}
              {log.interactionType === InteractionType.general_note && (
                <>
                  <p className="mb-1">{log.details.message}</p>

                  {log.details.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge border text-secondary fw-normal me-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </>
              )}

              {/* Revision Request */}
              {log.interactionType ===
                InteractionType.revision_request && (
                <>
                  <p className="mb-1">
                    <strong>
                      Revision #{log.details.revisionNumber}:
                    </strong>{" "}
                    {log.details.message}
                  </p>

                  <div className="small">
                    <span className="text-muted">
                      Pages:{log.details.affectedPages?.join(", ") ?? "None"}
                    </span>{" "}
                    |{" "}
                    <span className="fw-bold text-uppercase">
                      Priority: {log.details.priority}
                    </span>
                  </div>
                </>
              )}

              {/* Contract */}
              {log.interactionType === InteractionType.contract && (
                <>
                  <p className="mb-0">
                    <strong>Value:</strong> ₹
                    {log.details.contractValue}
                  </p>

                  <p className="mb-0 text-muted small">
                    <strong>Terms:</strong>{" "}
                    {log.details.paymentTerms}
                  </p>

                  {log.details.deliverables.length > 0 && (
                    <div className="mb-2">
                      {log.details.deliverables.map((link) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge bg-info text-decoration-none me-1"
                        >
                          Source / Link
                        </a>
                      ))}
                    </div>
                  )}

                  <p className="mb-0 text-muted small">
                    <strong>Signed Date:</strong>{" "}
                    {log.details.signedDate}
                  </p>
                </>
              )}

              {/* Requirement */}
              {log.interactionType ===
                InteractionType.requirement && (
                <>
                  <p className="mb-1">
                    {log.details.description}
                  </p>

                  <small className="d-block text-muted">
                    Tech: {log.details.techPreference}
                  </small>

                  {log.details.budgetFlexible && (
                    <span className="badge bg-info text-dark me-1">
                      Flexible Budget
                    </span>
                  )}

                  {log.details.deadlineFlexible && (
                    <span className="badge bg-info text-dark">
                      Flexible Deadline
                    </span>
                  )}
                </>
              )}

              {/* Dispute */}
              {log.interactionType === InteractionType.dispute && (
                <>
                  <p className="text-danger mb-1 font-monospace">
                    {log.details.reason}
                  </p>

                  <p className="mb-0 fw-bold small">
                    Amount: ₹
                    {log.details.amountDisputed}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}