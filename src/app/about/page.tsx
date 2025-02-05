export default function Blog() {
  return (
    <main className="">
      <div className="mb-[4vw] grid h-fit w-full auto-rows-[4vw] grid-cols-8 gap-x-[1vw] gap-y-[1vw] px-[3vw]">
        <div className="col-start-1 col-end-3 row-start-1 row-end-4 bg-red"></div>
        <div className="col-start-5 col-end-9 row-start-1 row-end-6 bg-red"></div>
        <div className="col-start-3 col-end-4 row-start-6 row-end-9 bg-red"></div>
      </div>
      <div className="grid h-fit w-full auto-rows-[4vw] grid-cols-8 gap-x-[1vw] gap-y-[1vw] border-t-[1px] border-gray-10 px-[3vw] pt-1">
        <div className="col-span-3 bg-blue-500">3</div>
        <div className="col-span-1 bg-red-500">1</div>
        <div className="col-span-4 bg-green-500">4</div>
      </div>
    </main>
  );
}
