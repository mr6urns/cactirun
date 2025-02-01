import React, { useState, useEffect } from 'react';

interface NameInputProps {
  currentName: string;
  onSubmit: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({ currentName, onSubmit }) => {
  const [number, setNumber] = useState(currentName.replace('PACA ', ''));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    const input = document.getElementById('number-input');
    if (input) {
      setTimeout(() => {
        input.focus();
        (input as HTMLInputElement).click();
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber) {
      onSubmit(`PACA ${cleanNumber}`);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setNumber(value);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const input = e.currentTarget;
    input.focus();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 touch-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-black p-6 rounded-lg border-2 border-[#8ec7ff] max-w-sm w-full">
        <h2 className="text-[#8ec7ff] text-xl font-['Press_Start_2P'] mb-6 text-center">NEW HIGH SCORE!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="number-input" className="block text-[#8ec7ff] text-sm font-['Press_Start_2P'] mb-2">
              ENTER NUMBER:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[#8ec7ff] font-['Press_Start_2P']">PACA</span>
              <input
                id="number-input"
                inputMode="numeric"
                pattern="[0-9]*"
                value={number}
                onChange={handleInput}
                onClick={handleInputClick}
                className="bg-black border-2 border-[#8ec7ff] text-[#8ec7ff] px-3 py-2 rounded w-24 font-['Press_Start_2P'] text-center text-lg"
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield',
                  touchAction: 'manipulation'
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#8ec7ff] text-black border-2 border-[#8ec7ff] px-4 py-2 rounded font-['Press_Start_2P'] text-sm hover:bg-black hover:text-[#8ec7ff] transition-colors active:scale-95 touch-manipulation"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};