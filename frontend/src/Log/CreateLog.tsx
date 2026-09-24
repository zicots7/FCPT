import React, { useState } from 'react'
import type { ContractDetails, DisputeDetails, GeneralNoteDetails, Log,Projects, RequirementDetails, RevisionRequestDetails } from '../Types/Types'
import { InteractionType } from "../Types/Types";
import {
  RevisionDetailsForm,
  ContractDetailsForm,
  RequirementDetailsForm,
  DisputeDetailsForm,
  GeneralNoteDetailsForm,
} from "./DynamicLog"
import postLogs from '../Apis/Logs/postLogs';
type props={
    project:Projects;
    onSuccess:()=>void;
    className?:string;
}

export default function CreateLog({ project, onSuccess, className }: props) {
  const [open, setOpen] = useState(false);
  const [interactionType, setInteractionType] = useState<InteractionType>(
    InteractionType.general_note
  );
  const [message, setMessage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [details, setDetails] = useState<Record<string, any>>({});

  const handleInteractionTypeChange = (type: InteractionType) => {
    setInteractionType(type);
    setDetails({});
  };

  const resetForm = () => {
    setMessage("");
    setTagsInput("");
    setInteractionType(InteractionType.general_note);
    setDetails({});
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct type-safe Log payload without unsafe assertions
    const basePayload = {
      pid: project.pid,
      message,
      tags: tagsInput, // Log type expects string for top-level tags
      timestamp: new Date().toISOString(),
    };

    let logData: Log;

    switch (interactionType) {
      case InteractionType.revision_request:
        logData = {
          ...basePayload,
          interactionType: InteractionType.revision_request,
          details: details as RevisionRequestDetails,
        };
        break;
      case InteractionType.contract:
        logData = {
          ...basePayload,
          interactionType: InteractionType.contract,
          details: details as ContractDetails,
        };
        break;
      case InteractionType.requirement:
        logData = {
          ...basePayload,
          interactionType: InteractionType.requirement,
          details: details as RequirementDetails,
        };
        break;
      case InteractionType.dispute:
        logData = {
          ...basePayload,
          interactionType: InteractionType.dispute,
          details: details as DisputeDetails,
        };
        break;
      case InteractionType.general_note:
      default:
        logData = {
          ...basePayload,
          interactionType: InteractionType.general_note,
          details: details as GeneralNoteDetails,
        };
        break;
    }

    try {
      await postLogs(logData);
      handleClose();
      onSuccess();
    } catch (error) {
      console.error("Failed to create log:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        className={className || "btn btn-primary"}
        onClick={() => setOpen(true)}
      >
        + Add Log
      </button>

      {open && (
        <div
          className="modal d-block"
          tabIndex={-1}
          
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Log</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Interaction Type</label>
                    <select
                      className="form-select"
                      value={interactionType}
                      onChange={(e) =>
                        handleInteractionTypeChange(
                          e.target.value as InteractionType
                        )
                      }
                    >
                      <option value={InteractionType.general_note}>
                        General Note
                      </option>
                      <option value={InteractionType.revision_request}>
                        Revision Request
                      </option>
                      <option value={InteractionType.contract}>
                        Contract
                      </option>
                      <option value={InteractionType.requirement}>
                        Requirement
                      </option>
                      <option value={InteractionType.dispute}>
                        Dispute
                      </option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Overview Message</label>
                    <input
                      type="text"
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. urgent, frontend"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                    />
                  </div>

                  <hr />

                  <div className="p-3 bg-light rounded border">
                    <h6 className="text-capitalize mb-3">
                      {interactionType.replace("_", " ")} Details
                    </h6>

                    {interactionType === InteractionType.revision_request && (
                      <RevisionDetailsForm
                        details={details as Partial<RevisionRequestDetails>}
                        onChange={setDetails}
                      />
                    )}
                    {interactionType === InteractionType.contract && (
                      <ContractDetailsForm
                        details={details as Partial<ContractDetails>}
                        onChange={setDetails}
                      />
                    )}
                    {interactionType === InteractionType.requirement && (
                      <RequirementDetailsForm
                        details={details as Partial<RequirementDetails>}
                        onChange={setDetails}
                      />
                    )}
                    {interactionType === InteractionType.dispute && (
                      <DisputeDetailsForm
                        details={details as Partial<DisputeDetails>}
                        onChange={setDetails}
                      />
                    )}
                    {interactionType === InteractionType.general_note && (
                      <GeneralNoteDetailsForm
                        details={details as Partial<GeneralNoteDetails>}
                        onChange={setDetails}
                      />
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Create Log
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

