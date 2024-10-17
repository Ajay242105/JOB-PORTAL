import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const allAppliedJobs=[1,2,3]
const AppliedJobTable = () => {
  return (
    <div>
    <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((item,index) => (
                    <TableRow key={index}>
                        <TableCell>12-11-2021</TableCell>
                        <TableCell>MERN STack Developer</TableCell>
                        <TableCell>Amazon</TableCell>
                        <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
</div>

  )
}

export default AppliedJobTable