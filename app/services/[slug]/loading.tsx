export default function Loading() {
  return (
    <div role="status" className="mx-auto max-w-7xl px-8 py-24">
      <p className="text-muted-foreground">Loading your page…</p>
      <div aria-hidden="true" className="mt-6 h-64 rounded-3xl bg-muted" />
    </div>
  );
}
