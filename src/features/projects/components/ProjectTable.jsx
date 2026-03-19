import React from 'react'
import { Box } from "lucide-react";
import TableHead from '../components/TableHead';



const Table = ({children}) => {

  return (
          <div className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              {/* table head component  */}
              <TableHead headers={["Project_Header","Tech_Stack","Status","Action"]} /> 
    
              {children}
            </table>
          </div>
  )
}

export default Table