class Solution {
	public static int numIslands(char[][] grid) {
		if (grid == null || grid.length == 0)
			return 0;
		int numIslands = 0;
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[i].length; j++) {
				numIslands += dfs(grid, i, j);
			}
		}
		return numIslands;
	}

	public static int dfs(char[][] grid, int i, int j) {
		// Check grid[i][j] is valid
		if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] == '0') {
			return 0;
		}
		// make grid[i][j] is checked
		grid[i][j] = '0';
		// dfs surrounded grid[i][j]
		dfs(grid, i, j - 1);
		dfs(grid, i, j + 1);
		dfs(grid, i - 1, j);
		dfs(grid, i + 1, j);
		return 1;
	}

	public static void main(String[] args) {
		char[][] test = { { '1', '2', '3', '4' }, { '2', '3', '4', '5' } };
		char[][] grid = new char[][] { "11110".toCharArray(), "11010".toCharArray(), "11000".toCharArray(),
				"00000".toCharArray() };
		System.out.println(grid[0][1]);
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[i].length; j++) {
				System.out.print(grid[i][j] + " ");
			}
			System.out.println();
		}
		int nums = numIslands(grid);
		System.out.println(nums);

	}
}
