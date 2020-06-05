// using Linked list
import java.util.*;

class Node{
	int data; // also is priority lower values indicate higher priority
	int priority;
	Node next;
	
	public Node(int data, int priority){
		this.data = data;
		this.priority = priority;
		this.next = null;
	}
}
public class PriorityQueue{
	Node head;	
	public PriorityQueue(int data, int priority) {
		head = new Node(data, priority);
	}
	public Node push(int data, int priority){
		Node newNode = new Node(data, priority);
		Node start = head;
		if(head.priority > newNode.priority){
			newNode.next = head;
			head = newNode;	
		}
		else {
			// Traverse the list and find a possition to insert new node
			while(start.next != null && start.next.priority < priority){
				start = start.next;
			}
			// Either at the ends of the list
			newNode.next = start.next;
			start.next = newNode;
		}					
		return head;
	}
	public Node peek(){
		return this.head;
	}
	public void printQueue() {
		Node start = head;
		while(start.next != null) {
			System.out.println(start.data);
			start = start.next;
		}
	}
	public static void main(String[] args){
		PriorityQueue heap = new PriorityQueue(10, 10);	
		heap.push(1, 1);
		heap.push(3, 3);
		heap.push(9, 9);
		heap.push(5, 5);
		System.out.println("Heap = " + heap.peek().data);
		heap.printQueue();
	}
}
