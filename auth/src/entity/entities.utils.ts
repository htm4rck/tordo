export function generateLicenseKey(): string {
    const part1 = generateRandomString(4);
    const part2 = generateRandomString(6);
    return `${part1}-${part2}`;
}

function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}