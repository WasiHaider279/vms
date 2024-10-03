import numeral from "numeral";

const FormatNumber = (number: number): string => {
  return numeral(number).format("0.0a");
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  const i: number = Math.floor(Math.log(bytes) / Math.log(1024));

  if (i === 0) {
    return `${bytes} ${sizes[i]}`;
  }

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export default FormatNumber;
