const logos = ["Google", "DHL", "Booking.com", "Spotify", "Facebook", "Amazon"];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted by professionals hired at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {logos.map((l) => (
            <span
              key={l}
              className="text-xl md:text-2xl font-display font-bold text-muted-foreground grayscale hover:opacity-100 hover:text-foreground transition-all"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
