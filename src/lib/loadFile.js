export function loadJson (event) {
  const loadPromise = new Promise((resolve, reject) => {
    var uploadedFile = event.target.files[0];

    if(uploadedFile.type !== "application/json") {
      reject(new Error("WRONG_FORMAT"));
    }

    if (uploadedFile) {
      var readFile = new FileReader();
      readFile.onload = function(readEvent) {
        console.log(" not suer")
        const json = JSON.parse(readEvent.target.result);
        setTimeout(() => {
          console.log("resolved")
          resolve(json)
        }, 5000)
      };
      readFile.readAsText(uploadedFile);
    } else {
      reject(new Error("LOAD_FAILED"));
    }
  })

  return loadPromise;
}
