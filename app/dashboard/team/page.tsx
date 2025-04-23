import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Mail, Phone, Shield, Users, UserCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeamPage() {
  // Mock team members data
  const teamMembers = [
    {
      id: "TM001",
      name: "Alex Johnson",
      role: "Security Analyst",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Active",
      department: "SOC",
    },
    {
      id: "TM002",
      name: "Jamie Smith",
      role: "Threat Intelligence Specialist",
      email: "jamie.smith@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Active",
      department: "Threat Intel",
    },
    {
      id: "TM003",
      name: "Morgan Lee",
      role: "Security Engineer",
      email: "morgan.lee@example.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Active",
      department: "Engineering",
    },
    {
      id: "TM004",
      name: "Taylor Wilson",
      role: "CISO",
      email: "taylor.wilson@example.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "Active",
      department: "Executive",
    },
    {
      id: "TM005",
      name: "Jordan Rivera",
      role: "Incident Responder",
      email: "jordan.rivera@example.com",
      phone: "+1 (555) 567-8901",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "On Leave",
      department: "SOC",
    },
  ]

  // Mock teams data
  const teams = [
    {
      id: "TEAM001",
      name: "Security Operations Center",
      shortName: "SOC",
      members: 8,
      lead: "Alex Johnson",
      description: "24/7 monitoring and response to security incidents",
    },
    {
      id: "TEAM002",
      name: "Threat Intelligence",
      shortName: "TI",
      members: 5,
      lead: "Jamie Smith",
      description: "Research and analysis of emerging threats and vulnerabilities",
    },
    {
      id: "TEAM003",
      name: "Security Engineering",
      shortName: "SE",
      members: 6,
      lead: "Morgan Lee",
      description: "Design and implementation of security controls and infrastructure",
    },
    {
      id: "TEAM004",
      name: "Governance, Risk, and Compliance",
      shortName: "GRC",
      members: 4,
      lead: "Casey Brown",
      description: "Management of security policies, standards, and regulatory compliance",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <DashboardNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Team</h2>
            <Button className="gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Add Member</span>
            </Button>
          </div>
          <p className="mt-2 text-muted-foreground">Manage your security team members and access permissions.</p>

          <Tabs defaultValue="members" className="mt-6">
            <TabsList>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>View and manage security team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-slate-800/50 p-3 text-sm font-medium">
                      <div className="col-span-3">Name</div>
                      <div className="col-span-3">Role</div>
                      <div className="col-span-2">Department</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Contact</div>
                    </div>
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="grid grid-cols-12 items-center border-b p-3 text-sm hover:bg-slate-800/30"
                      >
                        <div className="col-span-3 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.id}</div>
                          </div>
                        </div>
                        <div className="col-span-3">{member.role}</div>
                        <div className="col-span-2">{member.department}</div>
                        <div className="col-span-2">
                          <Badge
                            variant="outline"
                            className={
                              member.status === "Active"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-amber-500/10 text-amber-500"
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                            <span className="sr-only">Call</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Teams</CardTitle>
                  <CardDescription>View and manage security teams and departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {teams.map((team) => (
                      <Card key={team.id} className="hover:border-cyan-500/50 transition-colors duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{team.name}</CardTitle>
                            <Badge variant="outline" className="bg-slate-800">
                              {team.shortName}
                            </Badge>
                          </div>
                          <CardDescription>{team.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-cyan-500" />
                              <span className="text-sm">Lead: {team.lead}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{team.members} members</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-4 w-full">
                            View Team
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>Manage security roles and access permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-slate-800/50 p-3 text-sm font-medium">
                      <div className="col-span-3">Role</div>
                      <div className="col-span-5">Description</div>
                      <div className="col-span-2">Members</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    {[
                      {
                        role: "Administrator",
                        description: "Full access to all system features and settings",
                        members: 2,
                      },
                      {
                        role: "Analyst",
                        description: "Access to threat intelligence data and analysis tools",
                        members: 5,
                      },
                      {
                        role: "Engineer",
                        description: "Access to security infrastructure and configuration",
                        members: 4,
                      },
                      {
                        role: "Manager",
                        description: "Access to team management and reporting features",
                        members: 3,
                      },
                      {
                        role: "Read-Only",
                        description: "View-only access to dashboards and reports",
                        members: 6,
                      },
                    ].map((role, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 items-center border-b p-3 text-sm hover:bg-slate-800/30"
                      >
                        <div className="col-span-3 font-medium">{role.role}</div>
                        <div className="col-span-5">{role.description}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span>{role.members}</span>
                        </div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Edit Role
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
