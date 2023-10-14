import React from 'react';

const DayNightSlider = () => {
  const [isDark, setIsDark] = React.useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="p-4">
      <label className="switch switch-success">
        <input 
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(!isDark)} 
        />
        <span className="switch-toggle">
          {isDark ? '🌙' : '☀️'}
        </span>
      </label>
    </div>
  );
};

export default DayNightSlider;
