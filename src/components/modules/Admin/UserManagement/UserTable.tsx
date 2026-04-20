"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllUsers } from "@/services/admin.services"
import { useQuery } from "@tanstack/react-query"
import { userColumns } from "./userColumns"

const UserTable = () => {
  const { data: usersResponse, isLoading, isFetching } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => getAllUsers(),
  })
  
  const usersList = usersResponse?.data ?? []

  return (
      <DataTable
        data={usersList}
        columns={userColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No users found."
      />
  )
}

export default UserTable
