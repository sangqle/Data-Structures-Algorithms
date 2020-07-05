class Solution {

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> permutes = new ArrayList<List<Integer>>();
        backtrack(nums, new ArrayList<Integer>(), permutes);
        return permutes;
    }
    public static void backtrack(int[] nums, List<Integer> tempList, List<List<Integer>> permutes) {
        if(tempList.size() == nums.length) {
            permutes.add(new ArrayList<>(tempList));
        } else {
            for(int i = 0; i < nums.length; i++) {
                if(tempList.contains(nums[i])) continue;
                tempList.add(nums[i]);
                backtrack(nums, tempList, permutes);
                tempList.remove(tempList.size() - 1);
            }
        }
    }
}
