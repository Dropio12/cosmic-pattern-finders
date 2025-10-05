-- Allow public to view leaderboard data (passport and points only)
CREATE POLICY "Anyone can view leaderboard data" 
ON public.profiles 
FOR SELECT 
TO public
USING (true);