class Node{
	int value;
	Node left;
	Node right;

	public Node(int value){
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
public class MaxHeap{
	Node root; // This is root node of tree
	// node i have 2 child
	// left_child = 2*i + 1;
	// right_child = 2*i + 2; 
	public static void main(String[] args){
		MaxHeap heap = new MaxHeap();
		heap.insert(4);
		heap.insert(0);
		heap.insert(8);
		heap.insert(6);
		heap.insert(9);
		heap.insert(18);
		heap.insert(21);
	}
}
