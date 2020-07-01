import java.util.*;

class Solution {
	public static boolean containsNearbyDuplicate(int[] nums, int k) {
		HashMap<Integer, Integer> map = new HashMap<>();
		for (int i = 0; i < nums.length; i++) {
			if (map.containsKey(nums[i])) {
				if (i - map.get(nums[i]) <= k)
					return true;
			}
			map.put(nums[i], i);
		}
		for (HashMap.Entry<Integer, Integer> entry : map.entrySet()) {
			System.out.println(entry.getKey() + " " + entry.getValue());
		}
		return false;
	}

	public static void main(String[] args) {
		int[] nums = { 1, 0, 1, 1 };
		boolean check = containsNearbyDuplicate(nums, 1);
		System.out.println(check);
	}
}
