import type { ReactNode } from "react";

export function StepShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-card-foreground">
        {title}
      </h2>

      {description ? (
        <p className="mt-1.5 text-sm leading-normal text-muted-foreground">
          {description}
        </p>
      ) : null}

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}