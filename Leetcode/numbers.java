// arr = [1, 3, 2, 1, 0, 1, 9]
import java.util.HashMap;

class Solution {
	public static void main(String[] args) {
		int[] arr = {1, 3, 2, 1, 0, 1, 9, 3, 2, 3, 3, 3};
		HashMap<Integer, Integer> map = new HashMap<>();
		for(int i = 0; i < arr.length; i++) {
			if(!map.containsKey(arr[i])) {
				map.put(arr[i], 1);
			}else {
				map.replace(arr[i], map.get(arr[i]) + 1);
			}
		}
		int max = 0;
		int value = 0;
		for (HashMap.Entry<Integer, Integer> entry : map.entrySet()) {
   			 if(entry.getValue() > max) {
			 	max = entry.getValue();
				value = entry.getKey();
			 }
		}

		System.out.println(value);
	}
}

