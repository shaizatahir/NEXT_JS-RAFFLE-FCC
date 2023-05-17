import Head from "next/head";
import Header from "../components/Header.js";
import ManualHeader from "../components/ManualHeader";
import LotteryEntrance from "../components/LotteryEntrance";

export default function Home() {
  return (
    <div >
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-bg-light w-100vw h-screen -mt-8 px-8 ">
        {/* <Header /> */}
      <ManualHeader />
        <LotteryEntrance />
      </div>
    </div>
  );
}

// gold #deb937
// blue #5f95d5
// silver #d1d2d7
// grey #f7f6f2