export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function pickImage(accept = 'image/*'): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => resolve(input.files?.[0] || null);
    input.click();
  });
}

export function pickMultipleImages(accept = 'image/*'): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = true;
    input.onchange = () => resolve(Array.from(input.files || []));
    input.click();
  });
}

export async function pickAndConvertImage(): Promise<string | null> {
  const file = await pickImage();
  if (!file) return null;
  return fileToDataUrl(file);
}

export async function pickAndConvertMultipleImages(): Promise<string[]> {
  const files = await pickMultipleImages();
  return Promise.all(files.map(fileToDataUrl));
}
