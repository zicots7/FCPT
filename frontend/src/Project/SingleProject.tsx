
import { getProjects } from '../Apis/Project/getProjects';
import type { Projects, User } from '../Types/Types'
import React,{useEffect, useState } from 'react'
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';
import { getProject } from '../Apis/Project/getProject';
import ProjectsDetails from './ProjectsDetails';
import Invoice from '../Invoice/Invoice';

interface Props{
    reload:boolean;
    user?:User
}
export default function SingleProject({reload,user
}:Props) {
 const [project,setProject]=useState<Projects[]>([]);
const [loading, setLoading] = useState<boolean>(true);
   const tryFetchProject = async()=>{

        try{

            setLoading(true);

             let data: Projects[] = [];

            if(user?.role === "admin"){

                // admin gets all projects
                data = await getProjects();

            }else if(user?.role === "client"){

                // client gets only their projects
                data = await getProject(user.id);

            }

            setProject(data);

        }catch(error){

            console.log(error);

        }finally{

            setLoading(false);

        }

    };

    useEffect(()=>{
        if(user){
            tryFetchProject();
        }

    },[reload,user]);

if(loading){
    return (
        <tbody>
            <tr>
                <td colSpan={8} className="text-center">
                    Loading projects...
                </td>
            </tr>
        </tbody>
    );
}
  return (
       <>
         <tbody>
         {project.length === 0 ? (
           <tr >
             <td colSpan={8} className="text-center text-muted py-5">
               <p className="mb-1 fs-5">No clients found</p>
               <small>Add your first client to get started</small>
             </td>
           </tr>
         ) : (
           project.map((project, index) => (
             <tr key={project.pid}>
               <td className="fw-semibold">{project.title}</td>
               <td className="fw-semibold">{project.client}</td>
               <td className="text-muted">{project.description}</td>
               <td className="text-muted small">{project.startDate}</td>
               <td className="text-muted small">{project.deadline}</td>
               <td>
                 {project.status === "Delivered" ? (
                   <span className="badge bg-success">Delivered</span>
                 ) : project.status === "Complete" ? (
                   <span className="badge bg-primary">Complete</span>
                 ) : project.status === "Pending" ? (
                   <span className="badge bg-warning text-dark">Pending</span>
                 ) : (
                   <span className="badge bg-secondary">{project.status}</span>
                 )}
               </td>
               <td className="text-muted">{project.totalValue}</td>
                <td>
                
            {user?.role==="admin"&&(
                <>
                 <EditProject
                   className="btn btn-sm btn-outline-primary me-1"
                   id={project.pid}
                   project={project}
                   onSuccess={tryFetchProject}
                 />
                 <DeleteProject
                   className="btn btn-sm btn-outline-danger me-1"
                   id={project.pid}
                   onSuccess={tryFetchProject}
                   title={project.title}
                 />
                 
                 </>
                 )}
                <Invoice
                 className="btn btn-sm btn-outline-info me-1"
                  pid={project.pid}
                 />
                <ProjectsDetails
                 className="btn btn-sm btn-outline-success me-1"
                   onSuccess={tryFetchProject}
                   projects={project}
                 />
                    
                
              </td>
                   
             
               
                
             </tr>
           ))
         )}
       </tbody>
       </>
    
  )

}
