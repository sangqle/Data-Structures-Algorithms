import java.util.SortedSet;
import java.util.TreeSet;

class Main {
  public static void main(String[] args) {
    SortedSet<String> sites = new TreeSet<>();
    sites.add("practice");
    sites.add("geeksforgeeks");
    sites.add("quiz");
    sites.add("code");
    System.out.println("Sorted Set: " + sites);
  }
}
