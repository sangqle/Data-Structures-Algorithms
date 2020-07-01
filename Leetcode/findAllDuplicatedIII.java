import java.util.*;

class Solution {
	public static boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
		HashMap<Long, Long> map = new HashMap<>();
		for (int i = 0; i < nums.length; i++) {
			long remappedNum = (long) nums[i] - Integer.MIN_VALUE; // cover to positve number
			long bucket = remappedNum / ((long) t + 1); // t + 1 avoid devide by 0
			if (map.containsKey(bucket) || map.containsKey(bucket - 1) && remappedNum - map.get(bucket - 1) <= t
					|| map.containsKey(bucket + 1) && map.get(bucket + 1) - remappedNum <= t) {
				return true;
			}
			if (map.entrySet().size() >= k) {
				long lastBucket = ((long) nums[i - k] - Integer.MIN_VALUE) / ((long) t + 1);
				map.remove(lastBucket);
			}
			map.put(bucket, remappedNum); // replace the duplicated key
		}
		return false;
	}

	public static void main(String[] args) {
		int[] nums = { 3, -3, 1, 0, 1 };
		boolean check = containsNearbyAlmostDuplicate(nums, 1, 2);
		System.out.println(check);
	}
}
