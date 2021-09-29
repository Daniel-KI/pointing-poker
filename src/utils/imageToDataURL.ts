const imageToDataURL = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = error => rej(error);
    reader.readAsDataURL(file);
  });

export default imageToDataURL;
