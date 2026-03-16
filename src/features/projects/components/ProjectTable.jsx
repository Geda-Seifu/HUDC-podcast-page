import React from 'react'
import { Box } from "lucide-react";
import TableHead from '../components/TableHead';
import ProjectTableBody from '../components/ProjectTableBody';

const Table = ({filteredProjects,approveMutation,setSelectedProject}) => {
  return (
          <div className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              {/* table head component  */}
              <TableHead headers={["Project_Header","Tech_Stack","Status","Action"]} /> 
    
              <ProjectTableBody filteredProjects={filteredProjects} approveMutation={approveMutation} setSelectedProject={setSelectedProject} />
            </table>
          </div>
  )
}

export default Table