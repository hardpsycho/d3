export const getYMax = (nums: number[], max?: number) => {
    const maxValue = Math.max(...nums) + 20

    if (max !== undefined) {
        return Math.min(maxValue, max)
    }

    return maxValue
}
