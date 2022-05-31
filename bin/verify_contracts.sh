a=0
networkArr=(bscTestnet)

while [ $a -lt ${#networkArr[@]} ]
do
   npx hardhat verify-contract --network ${networkArr[$a]}
   a=`expr $a + 1`
done