import Image from "next/image";
import { Quote } from "lucide-react";
import { clients, testimonials } from "@/content/testimonials";
import { Section } from "@/components/section";
export function LogoCloud() {
  return (
    <Section id="clients" className="py-12 sm:py-14">
      <div className="text-center">
        <p className="eyebrow">Our clients over the years</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Businesses we’ve worked with.
        </h2>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {clients.map((client) => (
          <li key={client.name}>
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${client.name} website (opens in a new tab)`}
              className="flex h-full flex-col items-center rounded-2xl border border-border bg-card px-5 py-5 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-white p-4">
                <Image
                  src={client.logo.src}
                  alt={client.logo.alt}
                  width={client.logo.width}
                  height={client.logo.height}
                  sizes="(max-width: 640px) 130px, 180px"
                  className={
                    client.logo.padded
                      ? "h-44 w-44 max-w-full shrink-0 object-contain"
                      : "max-h-16 w-auto max-w-full object-contain"
                  }
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium">
                {client.name}
              </p>
            </a>
          </li>
        ))}
      </ul>
      {clients.some((client) => !client.permissionConfirmed) && (
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Logo display permissions to be confirmed.
        </p>
      )}
      {testimonials.map((testimonial) => (
        <figure
          key={`${testimonial.company}-${testimonial.title}`}
          className="mx-auto mt-10 max-w-4xl rounded-3xl border border-border bg-muted/50 p-7 text-center sm:p-10"
        >
          <Quote aria-hidden="true" className="mx-auto size-8 text-primary" />
          <p className="eyebrow mt-4">Client testimonial</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {testimonial.title}
          </h3>
          <blockquote className="mt-5 text-lg leading-relaxed text-muted-foreground">
            <p>“{testimonial.quote}”</p>
          </blockquote>
          <figcaption className="mt-6">
            {testimonial.logo && (
              <div className="mx-auto mb-4 flex h-16 w-52 max-w-full items-center justify-center rounded-xl bg-white px-5 py-3">
                <Image
                  src={testimonial.logo.src}
                  alt={testimonial.logo.alt}
                  width={testimonial.logo.width}
                  height={testimonial.logo.height}
                  sizes="168px"
                  className="h-auto max-h-10 w-full object-contain"
                />
              </div>
            )}
            <span className="block font-semibold">{testimonial.company}</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {testimonial.name ? `${testimonial.name}, ` : ""}
              {testimonial.role}
            </span>
          </figcaption>
        </figure>
      ))}
    </Section>
  );
}
