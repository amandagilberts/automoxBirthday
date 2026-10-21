import { date, z } from "zod"; 

export function isValidDate(dateString: string): boolean {
    const parts = parseParts(dateString);
    if (!parts) return false;
    const [year, month, day] = parts;
    const d = new Date(Date.UTC(year, month - 1, day));
    return (
        d.getUTCFullYear() === year &&
        d.getUTCMonth() === month - 1 &&
        d.getUTCDate() === day      

    )
}

export function isNotFutureDate(dateString: string): boolean {
        const parts = parseParts(dateString);
        if (!parts) return false;

        const [year, month, day] = parts;
        const date = new Date(Date.UTC(year, month - 1, day));
        const now = new Date();
        return date <= now;
    }
    function parseParts(value: string): [number, number, number] | null  {
        const parts = value.split("-").map(Number);
        const [year, month, day] = parts;
    if (year === undefined || month === undefined || day === undefined) return null;
        return [year, month, day];
    }
export const validateBirthdayMessage = z.object({
    name: z.string().min(1),
    birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).
    refine(isValidDate, { message: "Invalid date" }
    ).refine(isNotFutureDate, {message: "Date cannot be in the future" })
    })