import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import SuggestionChips from './SuggestionChips';

interface CollapsibleChipsProps {
  onChipClick: (suggestion: string) => void;
}

const CollapsibleChips: React.FC<CollapsibleChipsProps> = ({ onChipClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="
        fixed bottom-24 right-4 z-10
        flex items-end gap-2
      "
    >
      {isExpanded && (
        <div
          className="
            w-[200px] md:w-[600px]
            p-3 bg-surface-primary border border-border rounded-xl shadow-lg
            max-h-32 md:max-h-40 overflow-y-auto
          "
        >
          <SuggestionChips onChipClick={onChipClick} />
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          w-12 h-12 bg-itau-orange hover:bg-itau-orange-hover 
          text-white rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-200 hover-glow
        "
      >
        {isExpanded ? (
          <ChevronDown size={20} />
        ) : (
          <Sparkles size={20} />
        )}
      </button>
    </div>
  );
};

export default CollapsibleChips;
