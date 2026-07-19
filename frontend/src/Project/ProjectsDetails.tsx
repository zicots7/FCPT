import { useEffect, useState } from 'react'
import type {  LogsResponseDTO, Milestone, Payment, Projects } from '../Types/Types';
import { useAuth } from '../Apis/Auth/AuthContextProvider';
import { getMilestones } from '../Apis/Milestone/getMilestone';
import getPayment from '../Apis/Payments/getPayment';
import getLogs from '../Apis/Logs/getLogs';
import SingleMilestone from '../Milestone/SingleMilestone';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';
import SinglePayment from '../Payment/SinglePayment';
import SingleLog from '../Log/SingleLog';
import AddMilestone from '../Milestone/AddMilestone';
import AddPayment from '../Payment/AddPayment';
import Invoice from '../Invoice/Invoice';



interface Props {
    projects:Projects
    className?:string;
    onSuccess:()=>void;
}

export default function ProjectsDetails({onSuccess,className,projects}:Props) {

  const [open,setOpen] =useState(false);
  const [loading,setLoading]=useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [logs, setLogs] = useState<LogsResponseDTO[]>([]);
  const [totalPaid,setTotalPaid]=useState(0);
  const [totalPending,setTotalPending]=useState(0);
  const {user}=useAuth();
      const fetchDetails= async()=>{
        try{
        setLoading(true);
        let milestone:Milestone[]=[];
        let paymentdata:Payment[]=[];
        let logs:LogsResponseDTO[]=[];
         if(!user) return;
        milestone= await getMilestones(projects.pid);
        paymentdata = await getPayment(projects.pid);
        logs= await getLogs(projects.pid);

        
        const totalPaid = paymentdata.reduce(
            (sum, payment) => sum + payment.amountPaid,
            0
            );
        const amountPending= (projects.totalValue-totalPaid);
        setTotalPaid(totalPaid);
        setTotalPending(amountPending);
        setPayments(paymentdata);
        setMilestones(milestone);
        setLogs(logs);
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
      };
      useEffect(()=>{
        if(user){
          fetchDetails();
        }
      },[user, projects.pid]);
      const refreshProject = async ()=>{
         await fetchDetails();
};
  return (
    <>
     <button 
        className={className}
              onClick={() => {
                setOpen(true);
                fetchDetails();
               
              }}
          >
      Project Details
    </button>
   {open &&(

    <div   className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      tabIndex={-1}>
    <div className="container py-4">
    <div className="mb-3">
      <button 
       className={className}
              onClick={() => {
                setOpen(false);
                fetchDetails();
              }}
          >
        ← Back to Projects
      </button>
    
      
    </div>

    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h3 className="fw-bold mb-1">{ projects.title }</h3>
                    <p className="text-Bold mb-2 ">
                        Client :
                        <span className="fw-semibold text-dark p-2">
                        { projects.client }
                        </span>
                      {projects.status === "Pending" ? (
                        <span className="badge bg-warning text-dark fs-8">Pending</span>
                    ) : projects.status === "Complete" ? (
                        <span className="badge bg-success fs-8">Completed</span>
                    ) : (
                        <span className="badge bg-primary fs-8">Delivered</span>
                    )}
                    </p>
                </div>
                <div className="text-end">
                       {projects.platform === "Direct" ? (
                          <span className="badge bg-warning text-dark ms-2">Direct</span>
                      ) : projects.platform === "Upwork" ? (
                          <span className="badge bg-primary ms-2">Upwork</span>
                      ) : (
                          <span className="badge bg-success ms-2">Fiverr</span>
                      )}

                  
                </div>
            </div>
        </div>
    </div>

    <div className="row mb-4">

        <div className="col-md-3">
            <div className="card text-white bg-primary shadow-sm">
                <div className="card-body">
                    <h6 className="card-title">Total Value</h6>
                    <h4 className="mb-0">₹{ projects.totalValue }</h4>
                </div>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card text-white bg-success shadow-sm">
                <div className="card-body">
                    <h6 className="card-title">Total Paid</h6>
                    <h4 className="mb-0">₹{totalPaid}</h4>
                </div>
            </div>
        </div>

        <div className="col-md-3">
            <div className="card text-white bg-danger shadow-sm">
                <div className="card-body">
                    <h6 className="card-title">Pending</h6>
                    <h4 className="mb-0">₹{totalPending}</h4>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card text-white bg-info shadow-sm">
                <div className="card-body">
                    <h6 className="card-title">Deadline</h6>
                    <h4 className="mb-0">
                        { projects.deadline}
                    </h4>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-8">
            <div className="card shadow-sm mb-4">
                <div className="card-header fw-semibold">
                    Project Description
                </div>
                <div className="card-body">
                    <p className="mb-0">
                        {projects.description}
                    </p>
                </div>
            </div>
            <SingleMilestone
              milestones={milestones}
              onSuccess={refreshProject}
              projects={projects}

            />
        
          <SinglePayment
          payments={payments}
          pid={projects.pid}
          milestone={milestones}
          onSuccess={refreshProject}
          />
          <div className="card shadow-sm mb-4">
            <span className="fw-semibold">Project Activity Logs</span>
               <div className="card-header d-flex justify-content-between align-items-center">
            
               <SingleLog
                    logs={logs}

                    />
         <a href="{% url 'add-logs' projects.Pid %}" className="btn btn-sm btn-primary">+ Add Log</a>
 
    </div>
    </div>
        </div>
        <div className="col-md-4">

            <div className="card shadow-sm mb-4">
                <div className="card-header fw-semibold">
                    Client Information
                </div>
                <div className="card-body">
                    <p className="mb-2">
                        <span className="text-muted">Name:</span>
                        <span className="fw-semibold ms-2">
                            { projects.client }
                        </span>
                    </p>
            
                    <p className="mb-2">
                    <span className="text-muted">Platform:</span>

                      {projects.platform === "Direct" ? (
                          <span className="badge bg-warning text-dark ms-2">Direct</span>
                      ) : projects.platform === "Upwork" ? (
                          <span className="badge bg-primary ms-2">Upwork</span>
                      ) : (
                          <span className="badge bg-success ms-2">Fiverr</span>
                      )}
          
                    
                      {projects.status === "Pending" ? (
                        <span className="badge bg-warning text-dark ms-2">Pending</span>
                    ) : projects.status === "Complete" ? (
                        <span className="badge bg-success ms-2">Completed</span>
                    ) : (
                        <span className="badge bg-primary ms-2">Delivered</span>
                    )}

                    </p>
                </div>
            </div>
             <div className="card shadow-sm mb-4">
                <div className="card-header fw-semibold">
                    Actions
                </div>
                <div className="card-body d-grid gap-2">
                 {(user?.role === "admin" || user?.role === "client") && (
                <Invoice
                    className="btn btn-sm btn-outline-info me-1"
                    pid={projects.pid}
                />
                )}

                {user?.role === "admin" && (
                <>
                    <EditProject
                    className="btn btn-sm btn-outline-primary me-1"
                    id={projects.pid}
                    project={projects}
                    onSuccess={refreshProject}
                    />

                    <DeleteProject
                    className="btn btn-sm btn-outline-danger me-1"
                    id={projects.pid}
                    onSuccess={refreshProject}
                    title={projects.title}
                    />

                    <AddMilestone
                    className="btn btn-outline-success"
                    pid={projects.pid}
                    onSuccess={refreshProject}
                    />

                    <AddPayment
                    milestones={milestones}
                    className="btn btn-outline-success"
                    onSuccess={refreshProject}
                    />
                </>
                )}
                </div>
            </div>
               
           

            <div className="card shadow-sm">
                <div className="card-header fw-semibold">
                    Project Info
                </div>
                <div className="card-body">

                    <p className="mb-2">
                        <span className="text-muted">Started:</span>
                        <span className="ms-2">
                            { projects.startDate}
                        </span>
                    </p>
                    <p className="mb-2">
                        <span className="text-muted">Deadline:</span>
                        <span className="ms-2">
                            { projects.deadline }
                        </span>
                    </p>
                    <p className="mb-0">
                        <span className="text-muted">Total Milestones:</span>
                        <span className="fw-semibold ms-2">
                            { milestones.length }
                        </span>
                    </p>
                     <p className="mb-0">
                        <span className="text-muted">Total Payments:</span>
                        <span className="fw-semibold ms-2">
                            { payments.length }
                        </span>
                    </p>
                </div>
            </div>

        </div>
        
    </div>
</div>
    </div>

     )}
    </>
  )
}
