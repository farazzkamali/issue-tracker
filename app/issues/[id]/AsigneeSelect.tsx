'use client'

import Spinner from '@/app/components/Spinner'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const AsigneeSelect = () => {

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
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users?.map(user=>(
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                ))}
            
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AsigneeSelect