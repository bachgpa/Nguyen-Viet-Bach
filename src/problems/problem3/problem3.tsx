interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
// Props extends is not neccessery, can use BoxProps instead
// BoxProps is not defined or imported
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  //take the children out of the props, put the rest part into {...rest}, but {...rest} is doing nothing
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  //return priority rate by name of blockchain
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        //wrong logic on filter
        .filter((balance: WalletBalance) => {
          //balancePriority is not used
          const balancePriority = getPriority(
            balance.blockchain
          );
          //lhsPriority is not defined
          if (lhsPriority > -99) {
            //money in the wallet should be positive number, not <=0
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
    );
  }, [balances, prices]);

  //formattedBalances is not used in anywhere
  const formattedBalances = sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    }
  );

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue =
        //curency is string, causing wrong caculate
        prices[balance.currency] * balance.amount;
      return (
        // WalletRow is not imported
        //the code only have the amount of currency, not the price, so caculate the usd value is not possible
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  // {...rest} inside the div doing nothing
  return <div {...rest}>{rows}</div>;
};
