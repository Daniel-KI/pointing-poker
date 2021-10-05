const downloadJsonFile = (data: string, fileName: string): void => {
  const a = document.createElement('a');
  const file = new Blob([data], { type: 'text/plain' });
  a.href = URL.createObjectURL(file);
  a.download = `${fileName}.json`;
  a.click();
};

export default downloadJsonFile;
