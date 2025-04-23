import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

export function ProjectCard({ title, description, image, tags, link }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold group-hover:text-cyan-500 transition-colors duration-300">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-slate-800 hover:bg-slate-700 transition-colors duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-6">
        <Link
          href={link}
          className="group flex items-center text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors duration-300"
        >
          View Project
          <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}
