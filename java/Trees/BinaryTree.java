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
	// Find node
	public Node findNode(Node current, int value) {
		if(current == null) {
			return null;
		}
		if(current.getValue() == value) return current;
		if(value > current.getValue()) return findNode(current.right, value);
		return findNode(current.left, value);
	}
	
	// Delete node
	public Node findLeftMost(Node current) {
		return current.left == null ? current : findLeftMost(current.left);
	}
	public Node deleteNode(Node current, int value){
		if(current == null) return null;
		
		if(current.getValue() == value) {	
			// 1. Node is leaf
			if(current.left == null && current.right == null) return null;
			// 2. Node have a single child
			else if(current.left == null) return current.right;
			else if(current.right == null) return current.left;
			// 3. Node have 2 childs
			else {
				Node p = findLeftMost(current.right);
				current.setValue(p.getValue());
				deleteNode(current.right, p.getValue());
				return current;
			}
		}
		if(value > current.getValue()) current.right = deleteNode(current.right, value);
		if(value < current.getValue()) current.left = deleteNode(current.left, value);
		return current; // current deleted
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
		t.add(5);
		t.add(3);
		t.add(7);
		t.add(2);
		t.add(4);
		t.add(6);
		t.add(8);
		// Traversal tree
		//t.NLR(t.root);	

		t.LNR(t.root);
		
		// find node
		Node p = t.findNode(t.root, 5);
		if(p != null)
			System.out.println("Find: " + p.getValue());
		t.deleteNode(t.root, 5);
		t.LNR(t.root);
	}
}
