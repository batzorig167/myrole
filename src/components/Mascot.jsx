// «Сэтгэлийн найз» маскот болон сэтгэл санааны царайнууд — бүх хуудсанд ашиглана.

export function Face({ mood, className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill={mood.color} />
      <circle cx="17" cy="19" r="3" fill="#1f1b3a" />
      <circle cx="31" cy="19" r="3" fill="#1f1b3a" />
      <path d={mood.mouth} stroke="#1f1b3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {mood.tear && <path d="M33 23 q2 4 0 6 q-2 -2 0 -6" fill="#dcedfd" />}
    </svg>
  );
}

// Найрсаг маскот — толгой дээрээ нахиатай дугуй дүр. mood: "happy" | "calm"
export function Mascot({ mood = "happy" }) {
  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true">
      <ellipse cx="110" cy="205" rx="62" ry="9" fill="#1f1b3a" opacity="0.08" />
      <path d="M110 46 C110 30 118 20 134 18 C134 34 126 44 110 46 Z" fill="#2fbf8f" />
      <path d="M110 50 C108 36 98 28 84 30 C86 44 96 50 110 50 Z" fill="#45d3a3" />
      <path d="M110 50 L110 62" stroke="#1f9a71" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M40 128 C40 84 72 58 110 58 C150 58 180 86 180 128 C180 172 150 196 110 196 C70 196 40 172 40 128 Z"
        fill="#ffc93c"
      />
      <path d="M44 132 C26 120 20 104 26 96" stroke="#ffc93c" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M176 128 C196 132 204 150 198 160" stroke="#ffc93c" strokeWidth="14" strokeLinecap="round" fill="none" />
      {mood === "calm" ? (
        <>
          <path d="M78 118 Q88 126 98 118" stroke="#1f1b3a" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M122 118 Q132 126 142 118" stroke="#1f1b3a" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="88" cy="118" r="9" fill="#1f1b3a" />
          <circle cx="132" cy="118" r="9" fill="#1f1b3a" />
          <circle cx="91" cy="115" r="3" fill="#fff" />
          <circle cx="135" cy="115" r="3" fill="#fff" />
        </>
      )}
      <circle cx="72" cy="140" r="9" fill="#ff7a59" opacity="0.45" />
      <circle cx="148" cy="140" r="9" fill="#ff7a59" opacity="0.45" />
      <path d="M94 144 Q110 160 126 144" stroke="#1f1b3a" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

