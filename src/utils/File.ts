export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== 'string') {
        rej('unexpected result type');
        return;
      }
      res(result);
      return;
    };
    reader.readAsDataURL(file);
  });
};

export const saveFileFromDataUrl = (url: string): void => {
  const linkEl = document.createElement('a');
  linkEl.download = 'export.png';
  linkEl.href = url;
  document.body.appendChild(linkEl);
  linkEl.click();
  document.body.removeChild(linkEl);
};
