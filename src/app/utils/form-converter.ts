export function FormConverter (data: Record<string, any>, namespace: string = ''): FormData {
  const formData = new FormData();

  function appendFormData(obj: any, parentKey: string) {
    if (obj instanceof Date) {
      formData.append(parentKey, obj.toISOString());
    } else if (obj instanceof File) {
      formData.append(parentKey, obj);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const formKey = `${parentKey}[${index}]`;
        appendFormData(item, formKey);
      });
    } else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      for (const [key, value] of Object.entries(obj)) {
        const formKey = namespace ? `${namespace}[${key}]` : key;
        appendFormData(value, formKey);
      }
    } else {
      formData.append(parentKey, obj);
    }
  }

  appendFormData(data, namespace);

  return formData;
}