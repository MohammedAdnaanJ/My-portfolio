import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import type { Experience } from "@/types";
import { Card, TechTag, Todo } from "@/components/ui/primitives";
import { TimelineDot, TimelineRail } from "@/components/ui/timeline-motion";

function formatPeriod(e: Experience) {
  if (e.start && e.end) return `${e.start} — ${e.end}`;
  if (e.start) return `${e.start} — Present`;
  return null;
}

export function ExperienceTimeline({ items, compact = false }: { items: Experience[]; compact?: boolean }) {
  return (
    <div className="relative">
      <TimelineRail />
      <ol className="space-y-12 pl-6 sm:pl-10">
        {items.map((item) => {
          const period = formatPeriod(item);
          return (
            <li key={item.company} className="relative">
              <TimelineDot
                className="absolute top-1.5 -left-[calc(1.5rem+5px)] flex size-2.5 sm:-left-[calc(2.5rem+5px)]"
                dotClassName="size-full rounded-full bg-primary ring-4 ring-background"
              />
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {item.companyUrl ? (
                      <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </h3>
                  <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {item.engagement}
                  </span>
                </div>

                {item.role && <p className="mt-1 text-base text-foreground/90">{item.role}</p>}

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="size-3.5" aria-hidden />
                    {item.focus.join(" · ")}
                  </span>
                  {period && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden />
                      {period}
                    </span>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden />
                      {item.location}
                    </span>
                  )}
                </div>
                {(!period || !item.role) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {!period && <Todo>confirm start / end dates in src/data/experience.ts</Todo>}
                    {!item.role && <Todo>add official role title (optional)</Todo>}
                  </div>
                )}

                <p className="mt-5 max-w-3xl leading-relaxed text-pretty text-muted-foreground">{item.summary}</p>

                {compact ? (
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {item.tech.map((t) => (
                      <li key={t}>
                        <TechTag>{t}</TechTag>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-8 grid gap-4 lg:grid-cols-2">
                    {item.areas.map((area) => (
                      <li key={area.title}>
                        <Card className="h-full p-5">
                          <h4 className="font-medium">{area.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                          {area.highlights && (
                            <ul className="mt-3 space-y-2">
                              {area.highlights.map((h) => (
                                <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          )}
                          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${area.title} technologies`}>
                            {area.tech.map((t) => (
                              <li key={t}>
                                <TechTag>{t}</TechTag>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
