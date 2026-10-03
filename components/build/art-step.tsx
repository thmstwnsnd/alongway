"use client";

import { useEffect, useRef, useState } from "react";

import { ALLOWED_ART_EXTENSIONS, MAX_ART_BYTES, hasAllowedExtension, placementZones, type ArtFileRef, type ArtFileRole } from "@/data/placements";
import { Chip } from "./option-controls";

type Props = {
  logoPlacementIds: string[];
  artPlacementIds: string[];
  files: ArtFileRef[];
  onLogoPlacements: (ids: string[]) => void;
  onArtPlacements: (ids: string[]) => void;
  onFiles: (files: ArtFileRef[]) => void;
};

const accept = ALLOWED_ART_EXTENSIONS.join(",");
const size = (bytes: number) => (bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

/** Where the logo and art go on the bag, plus uploads for each. Files are saved to the customer's account. */
export function ArtStep({ logoPlacementIds, artPlacementIds, files, onLogoPlacements, onArtPlacements, onFiles }: Props) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((s) => live && setSignedIn(Boolean(s?.user)))
      .catch(() => live && setSignedIn(false));
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="grid gap-3.5">
      <div>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Logo location</p>
        <div className="grid grid-cols-3 gap-1.5">
          {placementZones.map((z) => {
            const on = logoPlacementIds.includes(z.id);
            return (
              <Chip block key={z.id} selected={on} onClick={() => onLogoPlacements(on ? logoPlacementIds.filter((i) => i !== z.id) : [...logoPlacementIds, z.id])}>
                {z.label}
              </Chip>
            );
          })}
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Art location</p>
        <div className="grid grid-cols-3 gap-1.5">
          {placementZones.map((z) => {
            const on = artPlacementIds.includes(z.id);
            return (
              <Chip block key={z.id} selected={on} onClick={() => onArtPlacements(on ? artPlacementIds.filter((i) => i !== z.id) : [...artPlacementIds, z.id])}>
                {z.label}
              </Chip>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <DropZone role="logo" label="Logo file" files={files} onFiles={onFiles} signedIn={signedIn} />
        <DropZone role="art" label="Art file" files={files} onFiles={onFiles} signedIn={signedIn} />
      </div>
      <p className="text-[12px] leading-5 text-black/70">
        We accept .ai, .pdf and .eps only. PNG and JPEG are not accepted for production.
        {signedIn === false ? " Sign in to upload files, or add them after you sign in. Your placement choices are saved either way." : ""}
      </p>
    </div>
  );
}

function DropZone({ role, label, files, onFiles, signedIn }: { role: ArtFileRole; label: string; files: ArtFileRef[]; onFiles: (f: ArtFileRef[]) => void; signedIn: boolean | null }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");
  const mine = files.filter((f) => f.role === role);
  const filesRef = useRef(files);
  filesRef.current = files;

  async function upload(list: FileList | File[]) {
    setError("");
    const incoming = Array.from(list);
    if (!incoming.length) return;
    if (signedIn === false) return setError("Sign in to upload files.");
    setBusy(true);
    let next = filesRef.current;
    for (const file of incoming) {
      if (!hasAllowedExtension(file.name)) {
        setError(`${file.name}: we accept ${ALLOWED_ART_EXTENSIONS.join(", ")} files only.`);
        continue;
      }
      if (file.size > MAX_ART_BYTES) {
        setError(`${file.name}: files can be up to 50 MB.`);
        continue;
      }
      const body = new FormData();
      body.append("file", file);
      try {
        const res = await fetch("/api/assets", { method: "POST", body });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(json.error ?? "Upload failed. Try again.");
          continue;
        }
        next = [...next, { id: json.id, name: json.name, bytes: json.bytes, role }];
        onFiles(next);
      } catch {
        setError("Upload failed. Check your connection and try again.");
      }
    }
    setBusy(false);
  }

  async function remove(f: ArtFileRef) {
    onFiles(filesRef.current.filter((x) => x.id !== f.id));
    fetch(`/api/assets/${f.id}`, { method: "DELETE" }).catch(() => {});
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          void upload(e.dataTransfer.files);
        }}
        className={`flex h-[4.25rem] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-2 text-center transition ${over ? "border-blue bg-blue/[0.06]" : "border-black/20 bg-black/[0.03] hover:border-blue/60"}`}
      >
        <span className="text-[13px] font-semibold text-charcoal">{busy ? "Uploading…" : label}</span>
        <span className="text-[11px] text-black/70">Drop or click · .ai .pdf .eps</span>
      </button>
      <input ref={input} type="file" accept={accept} multiple className="sr-only" aria-label={label} onChange={(e) => { if (e.target.files) void upload(e.target.files); e.target.value = ""; }} />
      {error ? <p role="alert" className="mt-1 text-[11px] font-medium text-[#B8433B]">{error}</p> : null}
      {mine.length ? (
        <ul className="mt-1.5 grid gap-1">
          {mine.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-2 rounded-lg bg-black/[0.04] px-2.5 py-1 text-[12px]">
              <span className="truncate font-medium text-charcoal">{f.name}</span>
              <span className="flex flex-shrink-0 items-center gap-2 text-black/70">
                {size(f.bytes)}
                <button type="button" onClick={() => void remove(f)} aria-label={`Remove ${f.name}`} className="font-bold text-charcoal hover:text-blue">×</button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
