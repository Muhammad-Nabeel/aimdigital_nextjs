import Image from "next/image";
import { Handshake, Layers3, Workflow } from "lucide-react";
import { Section } from "@/components/section";
import { leadership } from "@/config/site";

export function Leadership() {
  const [nabeel, ...team] = leadership;

  return (
    <Section id="leadership" className="border-t border-border bg-muted/40">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow">Meet our leadership</p>
          <h2 className="section-title max-w-xl">
            Good people.
            <br />
            <span className="text-primary">Connected thinking.</span>
          </h2>
        </div>
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:pb-1">
          Your goals bring us together. From the first conversation to the
          systems we build, we connect business understanding, thoughtful
          planning and AI automation to move your ideas forward.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        <article className="overflow-hidden rounded-3xl border border-blue-900/15 bg-[#0f172a] text-white">
          <div className="relative isolate overflow-hidden bg-[#0782f9] px-7 pt-8 sm:px-10">
            <div
              aria-hidden="true"
              className="absolute -bottom-32 left-1/2 -z-10 size-110 -translate-x-1/2 rounded-full border border-white/20 ring-48 ring-white/5"
            />
            <div className="relative mb-5 flex items-center justify-between text-xs font-medium tracking-wide text-white/90">
              <span className="rounded-full border border-white/30 bg-blue-950/15 px-3 py-1.5">
                {nabeel.focus}
              </span>
              <Workflow aria-hidden="true" className="size-5" />
            </div>
            {nabeel.photo && (
              <Image
                src={nabeel.photo}
                alt="Muhammad Nabeel, AI Automation Engineer at AIM Digital"
                width={400}
                height={400}
                sizes="(max-width: 640px) 240px, 288px"
                className="relative mx-auto h-60 w-60 rounded-t-[7rem] object-cover sm:h-72 sm:w-72"
              />
            )}
          </div>
          <div className="p-7 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {nabeel.name}
            </h3>
            <p className="mt-2 font-medium text-blue-300">{nabeel.role}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              {nabeel.bio}
            </p>
          </div>
        </article>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {team.map((member, index) => {
            const Icon = index === 0 ? Handshake : Layers3;

            return (
              <article
                key={member.name}
                className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    aria-hidden="true"
                    className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/5 font-heading text-2xl font-semibold tracking-tight text-primary"
                  >
                    {index === 0 ? "AN" : "M"}
                  </div>
                  <Icon aria-hidden="true" className="size-5 text-primary/70" />
                </div>
                <p className="eyebrow mt-5">{member.focus}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-primary">
                  {member.role}
                </p>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                  {member.bio}
                </p>
              </article>
            );
          })}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        One team, from understanding your business to building what comes next.
      </p>
    </Section>
  );
}
