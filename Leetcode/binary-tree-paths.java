import java.util.ArrayList;
import java.util.List;

import javax.swing.tree.TreeNode;

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

    public void NLR(TreeNode current, StringBuilder path, List<String> output) {
        if (current != null) {
            int len = path.length();
            if (!isLeaf(current)) {
                path.append(current.val);
                path.append("->");
            } else {
                path.append(current.val);
                output.add(path.toString());
            }
            NLR(current.left, path, output);
            NLR(current.right, path, output);
            path.setLength(len);
        }
    }

    public List<String> binaryTreePaths(TreeNode root) {
        List<String> output = new ArrayList<String>();

        // String path use String builder
        StringBuilder path = new StringBuilder();
        NLR(root, path, output);
        return output;
    }
}