function lengthOfLIS(nums) {
  if (!Array.isArray(nums)) throw new Error("Input must be an array");

  const dp = [];
  for (let num of nums) {
    let i = 0, j = dp.length;
    while (i < j) {
      let m = Math.floor((i + j) / 2);
      if (dp[m] < num) i = m + 1;
      else j = m;
    }
    dp[i] = num;
    // console.log(`After processing ${num}, dp:`, dp);
  }

  return dp.length;
}

// Example usage
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const result = lengthOfLIS(nums);
console.log("Length of Longest Increasing Subsequence:", result);
