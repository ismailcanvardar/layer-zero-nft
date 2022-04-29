a=0
networkArr=(avalancheFujiTestnet)

while [ $a -lt ${#networkArr[@]} ]
do
   npx hardhat set-remotes --network ${networkArr[$a]}
   a=`expr $a + 1`
done