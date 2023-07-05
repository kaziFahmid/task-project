import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useUsers() {


  
      const{refetch,data:users=[]}= useQuery({
          queryKey: ['users'],
          queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allusers`)
     
            return res.json()
          },
        })
  
  
    return [refetch,users]
}
