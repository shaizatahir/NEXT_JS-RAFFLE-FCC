import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="bg-bg-light mt-0 pt-0">
      <div className="m-8 pt-10 flex justify-between bg-bg-light">
        <h2 className="text-2xl font-medium">Raffle</h2>
        <ConnectButton moralisAuth={false}  />
      </div>
      <h1>Join Our Decentralized Lottery</h1>
    </div>
  );
}
