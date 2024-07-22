
//callback - where we want to get result
 export const blobToBase64 = (blob:Blob, callback :any) => {
    const reader = new FileReader();
    reader.onload = function () {
      const base64data = (reader?.result as string)?.split(",")[1];
      callback(base64data);
    };
    reader.readAsDataURL(blob);
  };
  