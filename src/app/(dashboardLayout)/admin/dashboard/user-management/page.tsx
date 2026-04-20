import { Users } from "lucide-react";

export const metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage users, roles, and platform access.",
};

const UserManagementPage = () => {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="size-8 text-primary" />
            User Management
          </h2>
          <p className="text-muted-foreground">
            Manage user accounts, change roles, and monitor platform access.
          </p>
        </div>
      </div>
      <div className="rounded-xl border bg-card/30 backdrop-blur-sm p-4">
        <UserTable />
      </div>
    </div>
  );
};

export default UserManagementPage;
