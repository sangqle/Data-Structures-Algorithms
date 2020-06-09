import java.util.HashMap;
import java.util.*;

class Solution {
	public static List<Integer> findDuplicates(int[] nums) {
		HashMap<Integer, Integer> map = new HashMap<>();
		List<Integer> dups = new LinkedList<Integer>();
		// Add all element into hash map with the numbers that appear
		for (int i = 0; i < nums.length; i++) {
			if (map.get(nums[i]) == null)
				map.put(nums[i], 1);
			else
				map.replace(nums[i], map.get(nums[i]) + 1);
		}
		// Found all duplicates nums;
		for (HashMap.Entry<Integer, Integer> entry : map.entrySet()) {
			if (entry.getValue() > 1)
				dups.add(entry.getKey());
		}
		return dups;
	}

	public static void main(String[] args) {
		int[] nums = { 4, 3, 2, 7, 8, 2, 3, 1 };
		List<Integer> dups = findDuplicates(nums);
		for (int i = 0; i < dups.size(); i++)
			System.out.println(dups.get(i));
	}
}
