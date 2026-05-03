import { Users, Video, Globe, Award } from "lucide-react";

const stats = [
  {
    label: "Active Users",
    value: "2M+",
    icon: <Users className="size-6 text-primary" />,
    description: "Growing community of movie enthusiasts",
  },
  {
    label: "Total Content",
    value: "50K+",
    icon: <Video className="size-6 text-primary" />,
    description: "Movies, series, and documentaries",
  },
  {
    label: "Countries",
    value: "150+",
    icon: <Globe className="size-6 text-primary" />,
    description: "Available globally in multiple languages",
  },
  {
    label: "Awards Won",
    value: "25+",
    icon: <Award className="size-6 text-primary" />,
    description: "Recognized for streaming excellence",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-background rounded-2xl border border-border shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold tracking-tight mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
