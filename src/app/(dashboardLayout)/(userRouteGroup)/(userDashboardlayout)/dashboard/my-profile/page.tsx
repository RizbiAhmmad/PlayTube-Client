import { getUserInfo } from "@/services/auth.services";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Shield, User as UserIcon, Calendar, Activity } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IUser } from "@/types/user.types";

export default async function MyProfilePage() {
  const userInfo: IUser | null = await getUserInfo();

  if (!userInfo) {
    redirect("/login");
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="relative overflow-hidden border-t-4 border-t-primary shadow-lg dark:shadow-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background pointer-events-none" />
          <CardHeader className="relative pt-12 pb-0 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-background shadow-md overflow-hidden bg-muted flex items-center justify-center mb-4 z-10">
              {userInfo.image ? (
                <Image
                  src={userInfo.image}
                  alt={userInfo.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-4xl font-bold uppercase text-muted-foreground">
                  {userInfo.name.charAt(0)}
                </span>
              )}
            </div>
            <CardTitle className="text-2xl font-bold z-10">{userInfo.name}</CardTitle>
            <CardDescription className="z-10 mt-1">{userInfo.email}</CardDescription>
            <div className="flex gap-2 mt-4 z-10">
              <Badge variant={userInfo.role === "SUPER_ADMIN" ? "default" : userInfo.role === "ADMIN" ? "secondary" : "outline"} className="capitalize">
                {userInfo.role.toLowerCase().replace("_", " ")}
              </Badge>
              {userInfo.status && (
                <Badge variant={userInfo.status === "ACTIVE" ? "success" : "destructive"}>
                  {userInfo.status}
                </Badge>
              )}
              <Badge variant={userInfo.emailVerified ? "default" : "secondary"}>
                {userInfo.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="mt-8 space-y-6 px-4 md:px-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted/80">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none text-muted-foreground mb-1">Full Name</p>
                  <p className="text-base font-semibold">{userInfo.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted/80 overflow-hidden">
                <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium leading-none text-muted-foreground mb-1">Email Address</p>
                  <p className="text-base font-semibold truncate" title={userInfo.email}>{userInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted/80">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none text-muted-foreground mb-1">Account Role</p>
                  <p className="text-base font-semibold capitalize">{userInfo.role.toLowerCase().replace("_", " ")}</p>
                </div>
              </div>
              
              {userInfo.createdAt && (
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted/80">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none text-muted-foreground mb-1">Member Since</p>
                    <p className="text-base font-semibold">{new Date(userInfo.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                Account Status
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm">
                  {userInfo.emailVerified 
                    ? "Your email is verified. Your account is fully active and you have access to all your dashboard features." 
                    : "Please verify your email address to unlock all platform features. Check your inbox for a verification link."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
