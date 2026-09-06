import type { ReactNode } from "react";

export function ChatBubble({ side, children }: { side: "in" | "out"; children: ReactNode }) {
  const isIn = side === "in";
  return (
    <div className={`flex ${isIn ? "justify-start" : "justify-end"}`}>
      <p
        className={`max-w-[85%] px-4 py-3 text-[0.86rem] leading-snug shadow-md ${
          isIn
            ? "rounded-[14px_14px_14px_2px] bg-secondary text-card-foreground"
            : "rounded-[14px_14px_2px_14px] bg-cream-lt text-ink"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export function AvatarStack({ avatars, caption }: { avatars: string[]; caption: string }) {
  return (
    <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
      <div className="flex -space-x-2 rounded-full bg-cream-lt p-1.5 w-fit">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-8 w-8 rounded-full border-2 border-cream-lt object-cover"
          />
        ))}
      </div>
      <span className="max-w-[28ch] text-[0.72rem] font-semibold leading-snug tracking-wide text-muted-foreground">
        {caption}
      </span>
    </div>
  );
}

export function ChatPanel({
  avatar,
  title,
  subtitle,
  children,
}: {
  avatar: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col gap-3 rounded-3xl border border-border bg-ink-2/80 p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <img src={avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
        <div>
          <strong className="block text-[0.9rem] font-bold text-rose-pale">{title}</strong>
          <span className="text-[0.72rem] text-muted-foreground">{subtitle}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
