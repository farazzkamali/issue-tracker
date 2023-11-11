import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import IssueActions from './IssueActions'
import Link from '../../components/Link'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props{
  searchParams:{status:Status, orderBy: keyof Issue}
}

const IsuuesPge = async({searchParams}:Props) => {
  const columns: {lable:string, value: keyof Issue, className?:string}[] = [
    {lable:'Issue', value:'title'},
    {lable:'Status', value:'status',className:'hidden md:table-cell'},
    {lable:'Created', value:'createdAt', className:'hidden md:table-cell'},

  ]
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)?searchParams.status:undefined
  const orderBy = columns
  .map(column=>column.value)
  .includes(searchParams.orderBy)
  ?{[searchParams.orderBy]:'asc'}:undefined


  const issues = await prisma.issue.findMany({where:{status:status},orderBy})
  
  return (
    <div>
      <IssueActions/>
      <Table.Root variant='surface'>
        <Table.Header>
            <Table.Row>
              {columns.map((column)=>
              <Table.ColumnHeaderCell key={column.value} className={column.className}> 
              <NextLink href={{
                query:{...searchParams, orderBy:column.value}
              }}>{column.lable}</NextLink>
              {column.value===searchParams.orderBy && <ArrowUpIcon className='inline'/>}
              </Table.ColumnHeaderCell>)}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {issues.map(issue=>(
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  </Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      </div>

  )
}
export const dynamic = 'force-dynamic'

export default IsuuesPge