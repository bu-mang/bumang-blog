const Grid = () => {
  return (
    <div className="fixed z-10 grid h-full w-full grid-cols-4 gap-[1.5vw] bg-blue-100 px-[10vw] opacity-50">
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300"></div>
        <div className="h-full bg-blue-300"></div>
      </div>
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300"></div>
        <div className="h-full bg-blue-300"></div>
      </div>
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300"></div>
        <div className="h-full bg-blue-300"></div>
      </div>
      <div className="grid h-full grid-cols-2 gap-[1.5vw] bg-blue-100">
        <div className="h-full bg-blue-300"></div>
        <div className="h-full bg-blue-300"></div>
      </div>
    </div>
  );
};

export default Grid;
