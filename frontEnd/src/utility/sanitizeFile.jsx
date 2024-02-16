import { usePapaParse } from 'react-papaparse';

async function sanitizeFile(file, option) {
  const {readRemoteFile} = usePapaParse();

  readRemoteFile(file, {
    complete: async(results) => {
      console.log(results.data[0])
    },
  });

};