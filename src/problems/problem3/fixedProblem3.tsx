interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
import BoxProps from "./someWhere/path/BoxProps";

const WalletPage: React.FC<BoxProps> = (
  props: BoxProps
) => {
  const balances = useWalletBalances();
  const prices = usePrices();

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
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(
          balance.blockchain
        );
        if (balancePriority > -99) {
          if (balance.amount >= 0) {
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
      });
  }, [balances, prices]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  return <div>{rows}</div>;
};
