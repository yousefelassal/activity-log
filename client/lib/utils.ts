import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const baseUrl = process.env.BASE_URL || "http://localhost:3001/api";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}