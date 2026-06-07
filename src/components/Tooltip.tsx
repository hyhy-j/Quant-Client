import { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  content: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  dir?: 'up' | 'down';
}

export default function Tooltip({ content, children, showIcon = false, dir = 'up' }: Props) {
  const [visible, setVisible] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isUp = dir === 'up';

  return (
    <div className="relative inline-flex items-center gap-2">
      {children}
      {showIcon && (
        <span
          ref={iconRef}
          className="relative inline-flex"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onClick={() => setVisible((v) => !v)}
        >
          <HelpCircle size={13} className="text-gray-400 cursor-pointer flex-shrink-0" />
          {visible && (
            <div
              className={`absolute z-50 left-1/2 -translate-x-1/2 w-60 bg-gray-900 text-white text-xs rounded-xl px-3 py-2.5 leading-relaxed shadow-xl pointer-events-none ${
                isUp ? 'bottom-full mb-2' : 'top-full mt-2'
              }`}
            >
              {content}
              <div
                className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
                  isUp ? 'top-full border-t-gray-900' : 'bottom-full border-b-gray-900'
                }`}
              />
            </div>
          )}
        </span>
      )}
    </div>
  );
}
