import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}

const statusMap: Record<Status, {lable:string, color:'red' | 'violet' | 'green'}> = {
    OPEN: {lable:'Open', color:'red'},
    IN_PROGRESS: {lable: 'In Progress', color:'violet'},
    CLOSED: {lable:'CLosed', color:'green'}

}

const IssueStatusBadge = ({status}:Props) => {
  return (
    <Badge color={statusMap[status].color}>
        {statusMap[status].lable}
    </Badge>
  )
}

export default IssueStatusBadge