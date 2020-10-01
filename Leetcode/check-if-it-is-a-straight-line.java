class Solution {
    
    public boolean checkStraightLine(int[][] coors) {
        if(coors.length == 2) return true;
        
        // vector BO = k * AO
        int dx = coors[1][0] - coors[0][0];
        int dy = coors[1][1] - coors[0][1];
        
        for(int i = 2; i < coors.length; i++) {
            int dx1 = coors[i][0] - coors[0][0];
            int dy1 = coors[i][1] - coors[0][1];
            if(dx*dy1 != dy*dx1) return false;
        }
        return true;
    }
}
