"use client"

import StatsCard from "@/components/shared/StatsCard"
import { getDashboardData } from "@/services/dashboard.services"
import { ApiResponse } from "@/types/api.types"
import { IAdminDashboardData } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"

const AdminDashboardContent = () => {
    const {data : adminDashboardData} = useQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: getDashboardData,
        refetchOnWindowFocus: "always" // Refetch the data when the window regains focus
    })

    const {data} = adminDashboardData as ApiResponse<IAdminDashboardData>;

    console.log(data);
  return (
    <div>
        {/* <StatsCard
        title="Total Users"
        value={data?.appointmentCount || 0}
        iconName="CalendarDays"
        description="Number of Users"
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
            title="Total Users"
            value={data?.userCount || 0}
            iconName="CalendarDays"
            description="Number of Users"
            />
        </div>


       
    </div>
  )
}

export default AdminDashboardContent