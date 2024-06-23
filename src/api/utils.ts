import { revalidatePath, revalidateTag } from "next/cache";
// const fs = require('fs');
// const path = require('path');

export function revalidateCache(paths: string[] = [], tags: string[] = []) {
  for (const path of paths) {
    revalidatePath(path);
  }
  for (const tag of tags) {
    revalidateTag(tag);
  }
}


// export function getpaths() {
//   const rootDirectory = './.next'; // Replace this with the actual root directory of your project

//   // Read the contents of the directory
//   fs.readdir(rootDirectory, (err:any, files:any) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
  
//     // Separate files and folders
//     const folders:any = [];
//     const filesList:any = [];
  
//     files.forEach((file:any) => {
//       const filePath = path.join(rootDirectory, file);
//       const isDirectory = fs.statSync(filePath).isDirectory();
  
//       if (isDirectory) {
//         folders.push(file);
//       } else {
//         filesList.push(file);
//       }
//     });
  
//     console.log('Folders in the root directory:');
//     console.log(folders);
  
//     console.log('\nFiles in the root directory:');
//     console.log(filesList);
//     return {folders, filesList}
//   });
// }

// export function getImages(type:string, name: string) {
//   return `./.next/images/products/plants/chemparuthy/1.js`
// }
