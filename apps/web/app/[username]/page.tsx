/* eslint-disable @next/next/no-img-element */
import React from "react"
import { ComponentsList } from "@/components/ComponentsList"
import { Header } from "@/components/Header"
import { getUserData, getUserComponents } from "@/utils/dataFetchers"
import { UserAvatar } from "@/components/UserAvatar"
import { supabaseWithAdminAccess } from "@/utils/supabase"

export const generateMetadata = async ({
  params,
}: {
  params: { username: string }
  }) => {
  const user = await getUserData(supabaseWithAdminAccess, params.username)
  return {
    title: user
      ? `${user.name}'s Profile | Component Library`
      : "User Not Found",
  }
}

export default async function UserProfile({
  params,
}: {
  params: { username: string }
  }) {
  const user = await getUserData(supabaseWithAdminAccess, params.username)

  if (!user) {  
    return <div>User not found</div>
  }

  const components = await getUserComponents(supabaseWithAdminAccess, user.id)

  return (
    <>
      <Header />
      <div className="flex mx-auto px-4 py-8 mt-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex md:w-[30%] md:min-w-[300px] flex-col items-center w-full ">
            <div className="flex flex-col items-center md:items-start">
              <UserAvatar
                src={user.image_url || "/placeholder.svg"}
                alt={user.name}
                size={184}
              />
              <h1 className="mt-4 text-[44px] font-bold">{user.name}</h1>
              <p className="text-[20px] text-gray-600">@{user.username}</p>
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <ComponentsList components={components || []} />
          </div>
        </div>
      </div>
    </>
  )
}
