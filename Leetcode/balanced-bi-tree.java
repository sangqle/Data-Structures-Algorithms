/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */

class Solution {
    public int height(TreeNode root) {
        if (root == null)
            return 0;
        int hf = height(root.left);
        int hr = height(root.right);
        return Math.max(hf, hr) + 1;
    }

    public boolean isBalanced(TreeNode root) {
        if (root == null)
            return true;
        int leftDepth = height(root.left);
        int rightDepth = height(root.right);
        return Math.abs(leftDepth - rightDepth) <= 1 && isBalanced(root.left) && isBalanced(root.right);
    }
}