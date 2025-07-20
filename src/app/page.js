import GasChart from "./_components/GasChart";
import TransactionSimulator from "./_components/TransactionSimulator";

export default async function Home() {
  return (
    <div className="">
      <main>
        <section className="flex flex-col items-center  bg-background text-white pt-15 pb-15 font-dsans w-full max-w-[1440px] mx-auto  px-5">
          <h1 className="text-4xl font-bold  color-white ">Gas Tracker</h1>
          <div className="w-full mt-14 flex  justify-between gap-5">
            <GasChart />
            <TransactionSimulator />
          </div>
        </section>
      </main>
    </div>
  );
}
