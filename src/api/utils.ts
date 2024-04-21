import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateCache(paths: string[] = [], tags: string[] = []) {
  for (const path of paths) {
    revalidatePath(path);
  }
  for (const tag of tags) {
    revalidateTag(tag);
  }
}
