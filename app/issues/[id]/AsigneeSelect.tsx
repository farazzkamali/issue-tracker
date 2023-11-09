'use client'

import Spinner from '@/app/components/Spinner'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import toast , {Toaster} from 'react-hot-toast'
import axios from 'axios'
import React from 'react'

const AsigneeSelect = ({issue}:{issue:Issue}) => {

    const {data:users, error, isLoading}= useQuery<User[]>({
        queryKey:['users'],
        queryFn:()=>axios.get<User[]>('/api/users').then(res=>res.data),
        staleTime:60 * 1000 * 10,
        retry:3
    })

  if (error) {
    return null
  }
  if (isLoading) {
    return <Spinner/>
  }

  const assignIssue = (userId:string)=>{
    axios
      .patch(`/api/issues/${issue.id}`,{assignedToUserId:userId || null})
      .catch(()=>toast.error('Changes could not be saved.'))}

  return (
    <>
      <Select.Root onValueChange={assignIssue} 
          defaultValue={issue.assignedToUserId || ""}>
          <Select.Trigger placeholder='Assign...'/>
          <Select.Content>
              <Select.Group>
                  <Select.Label>Suggestions</Select.Label>
                  {/* <Select.Item value="">Unassigned</Select.Item> */}
                  {users?.map(user=>(
                      <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                  ))}
      
              </Select.Group>
          </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AsigneeSelect