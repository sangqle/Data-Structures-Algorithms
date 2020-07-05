import java.lang.*;
import java.util.*;
class Solution {
  public static void main(String[] args) {
   
 	 List<Integer> list = new ArrayList<>();
 	 list.add(2);
 	 list.add(5);
 	 list.add(40);
	 list.remove(list.size() - 1);
	 list.remove(list.size() - 1);
 	 for(int i = 0; i < list.size(); i++) {
 	 	System.out.println(list.get(i));
 	 }
  }
}
