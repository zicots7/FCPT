import type {
  RevisionRequestDetails,
  ContractDetails,
  RequirementDetails,
  DisputeDetails,
  GeneralNoteDetails,
} from "../Types/Types";

// --- Revision Request Fields ---
export function RevisionDetailsForm({
  details,
  onChange,
}: {
  details: Partial<RevisionRequestDetails>;
  onChange: (d: Partial<RevisionRequestDetails>) => void;
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Specific Revision Message</label>
        <textarea
          className="form-control"
          rows={2}
          value={details.message || ""}
          onChange={(e) =>
            onChange({ ...details, message: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Revision Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Rev-01"
          value={details.revisionNumber || ""}
          onChange={(e) =>
            onChange({ ...details, revisionNumber: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Affected Pages (comma-separated)
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Home, Checkout, Dashboard"
          value={details.affectedPages?.join(", ") || ""}
          onChange={(e) =>
            onChange({
              ...details,
              affectedPages: e.target.value
                .split(",")
                .map((p) => p.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          className="form-select"
          value={details.priority || "Low"}
          onChange={(e) =>
            onChange({
              ...details,
              priority: e.target.value as "Low" | "Medium" | "High",
            })
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </>
  );
}

// --- Contract Fields ---
export function ContractDetailsForm({
  details,
  onChange,
}: {
  details: Partial<ContractDetails>;
  onChange: (d: Partial<ContractDetails>) => void;
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Contract Value</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. $5,000"
          value={details.contractValue || ""}
          onChange={(e) =>
            onChange({ ...details, contractValue: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Payment Terms</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. 50% upfront, 50% on completion"
          value={details.paymentTerms || ""}
          onChange={(e) =>
            onChange({ ...details, paymentTerms: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Deliverables (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Figma Designs, Source Code, Documentation"
          value={details.deliverables?.join(", ") || ""}
          onChange={(e) =>
            onChange({
              ...details,
              deliverables: e.target.value
                .split(",")
                .map((d) => d.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Signed Date</label>
        <input
          type="date"
          className="form-control"
          value={details.signedDate || ""}
          onChange={(e) =>
            onChange({ ...details, signedDate: e.target.value })
          }
        />
      </div>
    </>
  );
}

// --- Requirement Fields (Matches RequirementDetails Interface) ---
export function RequirementDetailsForm({
  details,
  onChange,
}: {
  details: Partial<RequirementDetails>;
  onChange: (d: Partial<RequirementDetails>) => void;
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Describe requirement details..."
          value={details.description || ""}
          onChange={(e) =>
            onChange({ ...details, description: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tech Preference</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. React, Node.js, PostgreSQL"
          value={details.techPreference || ""}
          onChange={(e) =>
            onChange({ ...details, techPreference: e.target.value })
          }
        />
      </div>

      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="budgetFlexible"
          checked={details.budgetFlexible || false}
          onChange={(e) =>
            onChange({ ...details, budgetFlexible: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="budgetFlexible">
          Budget Flexible
        </label>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="deadlineFlexible"
          checked={details.deadlineFlexible || false}
          onChange={(e) =>
            onChange({ ...details, deadlineFlexible: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="deadlineFlexible">
          Deadline Flexible
        </label>
      </div>
    </>
  );
}

// --- Dispute Fields ---
export function DisputeDetailsForm({
  details,
  onChange,
}: {
  details: Partial<DisputeDetails>;
  onChange: (d: Partial<DisputeDetails>) => void;
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Reason</label>
        <input
          type="text"
          className="form-control"
          value={details.reason || ""}
          onChange={(e) => onChange({ ...details, reason: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Amount Disputed</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. $1,200"
          value={details.amountDisputed || ""}
          onChange={(e) =>
            onChange({ ...details, amountDisputed: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Resolution Status</label>
        <select
          className="form-select"
          value={details.resolutionStatus || "Open"}
          onChange={(e) =>
            onChange({ ...details, resolutionStatus: e.target.value })
          }
        >
          <option value="Open">Open</option>
          <option value="In Review">In Review</option>
          <option value="Resolved">Resolved</option>
          <option value="Escalated">Escalated</option>
        </select>
      </div>
    </>
  );
}

// --- General Note Fields ---
export function GeneralNoteDetailsForm({
  details,
  onChange,
}: {
  details: Partial<GeneralNoteDetails>;
  onChange: (d: Partial<GeneralNoteDetails>) => void;
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Note Content</label>
        <textarea
          className="form-control"
          rows={3}
          value={details.message || ""}
          onChange={(e) => onChange({ ...details, message: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Note Tags (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. internal, client-visible"
          value={details.tags?.join(", ") || ""}
          onChange={(e) =>
            onChange({
              ...details,
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
        />
      </div>
    </>
  );
}