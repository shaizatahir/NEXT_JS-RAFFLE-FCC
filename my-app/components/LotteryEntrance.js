import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAdresses, abi } from "../constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
import Image from "next/image";
import Lottery from "../assets/img.jpg";

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  console.log("chainId is: ", parseInt(chainIdHex));
  const chainId = parseInt(chainIdHex);
  console.log("chain Id ", chainId);
  const raffleAddress =
    chainId in contractAdresses ? contractAdresses[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();
  //runContractFunction can both send transaction and read state
  console.log("trying to enter");
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the network Id
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });
  console.log("entering");

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = (await getRecentWinner()).toString();
    setEntranceFee(entranceFeeFromCall);
    setNumPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
    console.log("fee", entranceFee);
    console.log("numPlayers", numPlayersFromCall);
  }
  
  useEffect(() => {
    if (isWeb3Enabled) {
      // try to read the raffle entrance fee
      
      updateUI();
    }
  }, [isWeb3Enabled]);
  console.log("winner", recentWinner);
  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };
  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "tx Notification",
      position: "topR",
      //icon: "bell",
    });
  };
  return (
    <div className="hero-wrapper">
      <div>
        <div className="flex pt-12 text-4xl font-bold text-tx-black">
          Join Our Decentralized Lottery
        </div>
        {raffleAddress ? (
          <div className="mt-16 space-y-6 flex flex-col justify-center items-start">
            <h2 className="text-xl text-tx-black ">Enter the Lottery</h2>
            <div className="flex">
              <div className="pr-2 text-xl text-tx-black">
                Entrannce Fee:{" "}
                {ethers.utils.formatUnits(entranceFee).toString()}{" "}
              </div>
              <div className="pl-2 text-xl text-tx-black">
                ETH Players: {numPlayers}
              </div>
            </div>
            <div className="text-xl text-tx-black">
              recentWinner: {recentWinner}
            </div>
            <button
              className="rounded px-8 py-4 bg-bt-gold text-white"
              onClick={async function () {
                await enterRaffle({
                  onSuccess: handleSuccess,
                  onError: (error) => console.log(error),
                });
              }}
            >
              Enter Raffle
            </button>
          </div>
        ) : (
          <div className="flex justify-center pt-14">
            No Raffle Address detected!
          </div>
        )}
      </div>
      <div className="lottery-img">
        <Image src={Lottery} alt="Lottery" />
      </div>
    </div>
  );
}
