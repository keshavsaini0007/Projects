"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'

const dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session === null || session === undefined) router.replace('/login')
  }, [])

  return (
    <>
      <Dashboard />
    </>
  )
}

export default dashboard
