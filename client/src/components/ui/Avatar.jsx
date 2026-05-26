import { getInitials } from '../../utils/formatters';

// cycle through these so each user avatar has a consistent color
const avatarColors = [
  '#1f6d4a',
  '#1d4ed8',
  '#7c3aed',
  '#b45309',
  '#0e7490',
  '#be185d',
];

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

const getColorForName = (name) => {
  if (!name) return avatarColors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const Avatar = ({ name, size = 'md', bgColor }) => {
  const initials = getInitials(name);
  const backgroundColor = bgColor || getColorForName(name);
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
      style={{ backgroundColor }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
