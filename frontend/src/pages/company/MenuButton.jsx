export const MenuButton = ({ menu, menuOptions, id, onClose }) => {
  if (!menu) return null;

  return (
    <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[150px]">
      {menuOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            option.handler(id);
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150"
        >
          {option.icon}
          {option.menuName}
        </button>
      ))}
    </div>
  );
};