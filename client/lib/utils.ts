import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const baseUrl = process.env.BASE_URL || "http://localhost:3001/api";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleDateString('en-US', options);
}

const gradients: Record<string, string> = {}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getGradient = (name: string) => {
    if (!gradients[name]) {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        const gradient = `linear-gradient(139deg, ${color1} 14.17%, ${color2} 84.99%)`;
        gradients[name] = gradient;
    }
    return gradients[name];
}