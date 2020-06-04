class Node {
	private int value;
	Node left; // The left child of the node
	Node right; // The right child of the node
	
	// Constructor node with one parameter
	public Node(int value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}	

	// Get value of the node
	public int getValue() {
		return this.value;
	}
	// Set value of the node
	public void setValue(int newValue) {
		this.value = newValue;
	}
}
public class BinaryTree{
	private Node root;
	
	// Add recursive node
	public Node addRecursive(Node current, int value){
		if(current == null) {
			return new Node(value);
		}
		// Add node to left or to right
		if(value > current.getValue()) {
			current.right = addRecursive(current.right, value);
		}
		else if(value < current.getValue()){
			current.left = addRecursive(current.left, value);
		}

		return current; // equal not add key to tree

	}	

	// Add key
	public void add(int value){
		root = addRecursive(root, value);
	}

	// Pre order
	public void NLR(Node current){
		if(current != null){
			System.out.println(current.getValue());
			// pre-order on the left tree
			NLR(current.left);	
			// pre-order ont the right tree
			NLR(current.right);
		}
	}
	// In order
	public void LNR(Node current){
		if(current != null){
			LNR(current.left);
			System.out.println(current.getValue());
			LNR(current.right);
		}
	}
	public static void main(String[] args) {
		BinaryTree t = new BinaryTree();
		// Add node for tree
		t.add(3);
		t.add(2);
		t.add(4);
		t.add(9);
		t.add(5);
		t.add(1);
		t.add(0);
		t.add(7);	
		// Traversal tree
		t.NLR(t.root);	
		t.LNR(t.root);
	}
}
