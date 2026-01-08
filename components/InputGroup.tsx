import React from 'react';

interface InputGroupProps {
  label: string;
  value: number | string;
  onChange: (val: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  type?: 'text' | 'number';
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  type = 'number',
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs font-semibold text-ninja-muted uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center group">
        {prefix && (
          <span className="absolute left-3 text-ninja-muted font-medium transition-colors group-focus-within:text-ninja-accent">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-ninja-dark border border-ninja-border rounded-lg py-2.5 px-3 text-sm text-ninja-text placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ninja-accent focus:border-transparent transition-all ${
            prefix ? 'pl-8' : ''
          } ${suffix ? 'pr-8' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 text-ninja-muted font-medium">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
