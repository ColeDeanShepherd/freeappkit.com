export function saveStringToFile(content: string, filename = 'download.txt', mimeType = 'text/plain') {
  // Create a Blob containing the string data
  const blob = new Blob([content], { type: mimeType });
  
  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append link to body (required for Firefox)
  document.body.appendChild(link);
  
  // Programmatically click the link to trigger the download
  link.click();
  
  // Clean up by removing the link and revoking the URL
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function openFilePicker(): Promise<File | null> {
  return new Promise((resolve) => {
    // Create an invisible file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';

    // Add an event listener to handle file selection
    input.addEventListener('change', () => {
      const file = input.files ? input.files[0] : null;
      resolve(file);
    });

    // Trigger click to open the file picker
    document.body.appendChild(input);
    input.click();

    // Remove the input element after selection
    input.addEventListener('click', () => {
      setTimeout(() => {
        document.body.removeChild(input);
      }, 1000);
    });
  });
}
