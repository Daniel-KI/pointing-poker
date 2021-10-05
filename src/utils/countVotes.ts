import { IStatistics } from '../redux/models';

const countVotes = (votes: string[]): IStatistics[] => {
  console.log(votes, 'from count votes');
  if (votes.length === 0) {
    return [];
  }
  return votes
    .reduce((sum: IStatistics[], cur) => {
      const currentValueIndex = sum.findIndex(({ value }) => value === cur);
      if (currentValueIndex !== -1) {
        sum[currentValueIndex].percentage += 1;
      } else {
        sum.push({ value: cur, percentage: 1 });
      }
      return sum;
    }, [])
    .map(({ value, percentage }) => {
      const percentageCount = Math.round((percentage / votes.length) * 100);
      return { value, percentage: percentageCount };
    });
};

export default countVotes;
