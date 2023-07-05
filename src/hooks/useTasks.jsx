import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useTasks() {
    const{refetch,data:tasks=[]}= useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/tasks`)
   
          return res.json()
        },
      })


  return [refetch,tasks]
}
