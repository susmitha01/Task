function twoSum(nums, target) {
  if (!Array.isArray(nums)) throw new Error("Input must be an array of numbers.");
  if (typeof target !== 'number') throw new Error("Target must be a number.");
  if (nums.length < 2) throw new Error("Array must have at least two elements.");

  const map = new Map(); // Store value => index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      // Found the pair
      return [map.get(complement), i];
    }

    // Store current number with its index
    map.set(nums[i], i);
  }

  throw new Error("No two numbers found that add up to the target.");
}

// Example usage:
try {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = twoSum(nums, target);
  console.log("Indices of numbers that sum to target:", result); // Expected: [0, 1]
} catch (err) {
  console.error("Error:", err.message);
}
