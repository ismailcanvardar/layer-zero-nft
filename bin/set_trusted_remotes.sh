a=0
networkArr=(rinkeby bscTestnet avalancheFujiTestnet polygonMumbai arbitrumTestnet optimisticKovan ftmTestnet)

while [ $a -lt ${#networkArr[@]} ]
do
   npx hardhat set-remotes --network ${networkArr[$a]}
   a=`expr $a + 1`
done