/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
// 1, 2, 5, 3
class Solution {
    public boolean isLeaf(TreeNode current) {
        if (current.left == null && current.right == null)
            return true;
        return false;
    }

    public void NLR(TreeNode current, String paths, List<String> output) {
        if (current != null) {
            if (!isLeaf(current)) {
                paths += current.val + "->";
            } else {
                paths += current.val;
                output.add(paths);
            }
            // pre-order on the left tree
            NLR(current.left, paths, output);
            // pre-order ont the right tree
            NLR(current.right, paths, output);
        }
    }

    public List<String> binaryTreePaths(TreeNode root) {
        List<String> output = new ArrayList<String>();

        NLR(root, new String(""), output);
        return output;
    }
}