import { usePapaParse } from 'react-papaparse';

async function sanitizeFile(file, option) {

  const {readRemoteFile} = usePapaParse();

  const resolvedOutput = new Promise((resolve) => {
    readRemoteFile(file, {
      complete: async(results) => {
        const splitString = file.name.split(".");
        const fileExt = splitString[splitString.length-1];
        const fileLength = results.data[0].length;
        switch(option){
          case 0 :
            if(fileLength===15 && fileExt==="csv"){resolve(true)}
            else{resolve(false)}
            break;
          case 1 :
            if(fileLength===14 && fileExt==="csv"){resolve(true)}
            else{resolve(false)}
            break;
          default:
            resolve(false)
        };
      },
    });
  })

  return resolvedOutput
};

export {sanitizeFile}