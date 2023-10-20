import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkDown from 'react-markdown'

const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
    <Flex className='space-x-3 my-2'>
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className='prose mt-4 max-w-full'>
        <ReactMarkDown>{issue.description}</ReactMarkDown>
    </Card>
    </>
  )
}

export default IssueDetails