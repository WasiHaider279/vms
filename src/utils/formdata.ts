export function objectToFormData(
  obj: { [key: string]: any },
  formData: FormData = new FormData(),
  parentKey: string = ""
): FormData {
  Object.keys(obj).forEach((key) => {
    const fullKey = parentKey ? `${parentKey}[${key}]` : key;
    const value = obj[key];

    if (value instanceof File) {
      formData.append(fullKey, value, value.name);
    } else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(
          fullKey,
          value.item(i) as File,
          (value.item(i) as File).name
        );
      }
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      objectToFormData(value, formData, fullKey);
    } else {
      formData.append(fullKey, value);
    }
  });

  return formData;
}
