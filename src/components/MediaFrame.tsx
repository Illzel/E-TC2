import { useState } from 'react';
import { Monitor } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  fallbackLabel?: string;
}

export function MediaFrame({
  src,
  alt,
  aspectClass = 'aspect-video',
  className = '',
  fallbackLabel = 'Einsteinium Technical Configuration',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1324] via-[#091020] to-[#060913] p-6 text-center ${aspectClass} ${className}`}
      >
        <Monitor className="mb-3 h-8 w-8 text-cyan-400" aria-hidden="true" />
        <span className="text-sm font-medium text-slate-300">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#0a1020] ${aspectClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
