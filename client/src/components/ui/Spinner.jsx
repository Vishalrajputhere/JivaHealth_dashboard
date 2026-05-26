const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div
        className="w-10 h-10 rounded-full border-4 border-gray-200 animate-spin"
        style={{ borderTopColor: 'var(--jiva-green)' }}
      />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default Spinner;
