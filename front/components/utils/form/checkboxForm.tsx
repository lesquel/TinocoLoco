interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  children,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          checked={checked}
          className="sr-only"
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-6 h-6 border-2 rounded-md ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300"} transition-colors`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                fillRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-2 text-sm">{children}</span>
    </label>
  );
};
