class Solution {
    
    // int a1 = 40, a2 = 41;
    // int b1 = 91, b2 = 93;
    // int c1 = 123, c2 = 125;
    
    public boolean isValid(String s) {
        
        if(s.length() == 0) return true;

        Stack<Integer> stack = new Stack<Integer>();
        
        char character = s.charAt(0);
        int ascii = (int) character;
        
        if(ascii == 41 || ascii == 93 || ascii == 125) return false;
        stack.push(ascii);
        
        for(int i = 1; i < s.length(); i++) {
            character = s.charAt(i);
            ascii = (int) character;
            if(ascii == 41 || ascii == 93 || ascii == 125) {
                if(stack.empty()) return false;
                int lastOpen = stack.peek();
                if(Math.abs(ascii - lastOpen) > 2) return false;
                else stack.pop();
            } else {
                stack.push(ascii);
            }
        }
        return stack.empty();
    }
}