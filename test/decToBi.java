import java.util.*;
// Solution
class Solution {
	public static List dec2bi(int num) {
		int num2 = num;
		List<Integer> binary = new ArrayList<>();
		while (num != 0) {
			binary.add(0, num % 2);
			num = num / 2;
		}
		int n = 0;
		if (num2 < Math.pow(2, 8))
			n = 8;
		else if (num2 < Math.pow(2, 16))
			n = 16;
		else if (num2 < Math.pow(2, 32))
			n = 32;
		while (binary.size() < n)
			binary.add(0, 0);
		return binary;
	}

	public static void main(String[] args) {
		List<Integer> binary = dec2bi((int) Math.pow(2, 17) + 1);
		for (int i = 0; i < binary.size(); i++) {
			System.out.print(binary.get(i));
		}
	}
}
