import { ProjectsHeader } from "@/components/projects-header"
import { ProjectCard } from "@/components/project-card"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Real-Time Threat Intelligence Dashboard",
      description:
        "A web application designed to aggregate, process, and visualize global cyber threat intelligence feeds in real time.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Next.js", "React", "Three.js", "Cybersecurity"],
      link: "/dashboard",
    },
    {
      title: "Zero Trust Architecture Implementation",
      description:
        "Implementation of Zero Trust principles by enforcing strict identity verification for every person and device.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Security", "Architecture", "Identity", "Access Control"],
      link: "/projects/zero-trust",
    },
    {
      title: "IAM Policy Configuration",
      description:
        "Implementation of least-privilege access principles in cloud environments for AWS S3 buckets and Azure VMs.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["AWS", "Azure", "IAM", "Cloud Security"],
      link: "/projects/iam-policy",
    },
    {
      title: "Secure DevOps Pipeline",
      description: "Integration of security controls into CI/CD pipelines to ensure secure software delivery.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["DevSecOps", "CI/CD", "Automation", "Security Testing"],
      link: "/projects/secure-devops",
    },
    {
      title: "Network Security Monitoring",
      description:
        "Implementation of network security monitoring using open-source tools to detect and respond to threats.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Networking", "Monitoring", "IDS/IPS", "SIEM"],
      link: "/projects/network-security",
    },
    {
      title: "Security Awareness Training Platform",
      description: "Development of an interactive security awareness training platform for employees.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Training", "Awareness", "Phishing", "Education"],
      link: "/projects/security-awareness",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <ProjectsHeader />
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-bottom-5 duration-700"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
