class Solution {
	public static boolean isPalindromeClean(String s) {
		if (s.isEmpty())
			return true;
		int head = 0, tail = s.length() - 1;
		char cHead, cTail;
		while (head <= tail) {
			cHead = s.charAt(head);
			cTail = s.charAt(tail);
			if (!Character.isLetterOrDigit(cHead))
				head++;
			else if (!Character.isLetterOrDigit(cTail))
				tail--;
			else {
				if (Character.toLowerCase(cHead) != Character.toLowerCase(cTail)) {
					return false;
				}
				// reduce size after check head - tail
				head++;
				tail--;
			}
		}
		return true;
	}

	public static boolean isPalindrome(String s) {
		String str = s.toLowerCase();
		char[] arr = new char[str.length()];
		int n = 0;
		for (int i = 0; i < str.length(); i++) {
			if (Character.isLetter(str.charAt(i)) || Character.isDigit(str.charAt(i))) {
				arr[n++] = str.charAt(i);
			}
		}
		for (int i = 0; i < n / 2; i++) {
			System.out.println(arr[i] + " " + arr[n - i - 1]);
			if (arr[i] != arr[n - i - 1])
				return false;
		}
		return true;
	}

	public static void main(String[] args) {
		boolean result = isPalindromeClean("A man, a plan, a canal: Panama");
		System.out.println(result);
	}
}
