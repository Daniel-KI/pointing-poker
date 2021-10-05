export interface PriorityLevel {
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
    name: 'High',
    label: 'High priority',
  },
};

export default priorityLevels;
