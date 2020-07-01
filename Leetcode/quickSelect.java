// Quickselect is a selection algorithm to find the k-th smallest element in an 
// unordered list. It is related to the quick sort sorting algorithm.
// Input: arr[] = {7, 10, 4, 3, 20, 15}
// k = 3
// Output: 7

class QuickSelect {
	public static int partition(int[] arr, int low, int high) {
		// Considers last element as pivot
		int pivot = arr[high], pivotloc = low;
		for (int i = low; i <= high - 1; i++) {
			// inserting elements of less value to the left of the pivot location
			if (arr[i] < pivot) {
				int temp = arr[i];
				arr[i] = arr[pivotloc];
				arr[pivotloc] = temp;
				pivotloc++;
			}
		}
		// swap the pivotloc to the final pivot location
		int temp = arr[high];
		arr[high] = arr[pivotloc];
		arr[pivotloc] = temp;
		return pivotloc;
	}

	// find the kth position(of the sorted array

	public static int kthSmallest(int[] arr, int low, int high, int k) {
		// fin the partition
		int partition = partition(arr, low, high);
		// if partition value is equal to the kth postion return value at k
		if (partition == k)
			return arr[partition];
		// if partition value is less than kth position search right side of the arr
		else if (partition < k)
			return kthSmallest(arr, partition + 1, high, k);
		else
			return kthSmallest(arr, low, partition - 1, k);

	}

	public static void main(String[] args) {
		int[] array = new int[] { 7, 10, 4, 3, 20, 15 };
		int[] arraycopy = new int[] { 10, 4, 5, 8, 6, 11, 26 };

		int kPosition = 3;
		int length = array.length;

		if (kPosition > length) {
			System.out.println("Index out of bound");
		} else {
			// find kth smallest value
			System.out.println("K-th smallest element in array : " + kthSmallest(array, 0, length - 1, kPosition - 1));
		}
	}
}
