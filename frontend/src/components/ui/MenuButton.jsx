export const MenuButton = ({ menu, menuoption, id }) => {
  return (
    menu && (
      <div className="bg-white border-1 border-blue-300 p-1 shadow w-[90px] absolute right-40 z-11">
        {menuoption.map((current ,indx) => (
          <>
            <button
              className="w-[100%] cursor-pointer hover:bg-blue-100"
              onClick={() => current.handler(id)}
              key={indx}
            >
              {current.menuName}
            </button>
          </>
        ))}
      </div>
    )
  );
};
