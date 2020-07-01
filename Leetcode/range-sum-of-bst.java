/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public static int sum = 0;
    public int NLR(TreeNode curr, int L, int R) {
        if(curr != null) {
            if(curr.val >= L && curr.val <= R) {
                sum += curr.val;
                // System.out.println(curr.val);
            }
            if(L < curr.val)
                NLR(curr.left, L, R);
            if(curr.val < R)
                NLR(curr.right, L, R);
        }
        return sum;
    }
    public int rangeSumBST(TreeNode root, int L, int R) {
        sum = 0;
        return NLR(root, L, R);
    }
}