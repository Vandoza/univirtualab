import { getItem, setItem } from "@/services/storage";

export type ProgressEntry = {
  createdAt: number;
  reagentIds: string[];
  result: {
    color: string | null;
    precipitate: { name: string; color: string } | null;
    gas: { name: string; moreOverTime?: boolean } | null;
    note: string;
    equation: string;
    showRod: boolean;
  };
};

const LOCAL_KEY = "vlk_progress_v1";

export async function saveProgressLocal(entry: ProgressEntry) {
  const raw = (await getItem(LOCAL_KEY)) ?? "[]";
  let arr: ProgressEntry[];
  try {
    arr = JSON.parse(raw) as ProgressEntry[];
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }
  arr.unshift(entry);
  await setItem(LOCAL_KEY, JSON.stringify(arr.slice(0, 200)));
}

export async function loadProgressLocal(): Promise<ProgressEntry[]> {
  const raw = (await getItem(LOCAL_KEY)) ?? "[]";
  try {
    const parsed = JSON.parse(raw) as ProgressEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export async function deleteProgressLocalByIndex(index: number): Promise<void> {
  const raw = (await getItem(LOCAL_KEY)) ?? "[]";
  let arr: ProgressEntry[];
  try {
    arr = JSON.parse(raw) as ProgressEntry[];
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }
  if (index < 0 || index >= arr.length) return;
  arr.splice(index, 1);
  await setItem(LOCAL_KEY, JSON.stringify(arr));
}

export async function saveProgressRemote(uid: string, entry: ProgressEntry): Promise<void> {
  return;
}

export async function loadProgressRemote(uid: string): Promise<ProgressEntry[]> {
  return [];
}
