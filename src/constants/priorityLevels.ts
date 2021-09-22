export interface Priority {
  name: string;
  label: string;
}

const priorityLevels = {
  low: {
    name: 'Low',
    label: 'Low priority',
  },
  medium: {
    name: 'Medium',
    label: 'Medium priority',
  },
  hight: {
    name: 'Hight',
    label: 'Hight priority',
  },
};

export default priorityLevels;
