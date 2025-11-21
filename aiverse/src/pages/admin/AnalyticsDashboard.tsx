import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Eye, Heart, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalViews: number;
  totalFavorites: number;
  userActivityTrend: { date: string; count: number }[];
  topTools: { name: string; views: number }[];
  categoryDistribution: { category: string; count: number }[];
}

const COLORS = ['#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444', '#3b82f6'];

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    totalViews: 0,
    totalFavorites: 0,
    userActivityTrend: [],
    topTools: [],
    categoryDistribution: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch active users (users with activity in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { count: activeUsers } = await supabase
        .from('user_activity')
        .select('user_id', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Fetch total views
      const { count: totalViews } = await supabase
        .from('tool_views')
        .select('*', { count: 'exact', head: true });

      // Fetch total favorites
      const { count: totalFavorites } = await supabase
        .from('user_favorites')
        .select('*', { count: 'exact', head: true });

      // Fetch user activity trend (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data: activityData } = await supabase
        .from('user_activity')
        .select('created_at')
        .gte('created_at', sevenDaysAgo.toISOString());

      const activityByDay = activityData?.reduce((acc: any, item) => {
        const date = new Date(item.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}) || {};

      const userActivityTrend = Object.entries(activityByDay).map(([date, count]) => ({
        date,
        count: count as number
      }));

      // Fetch top viewed tools
      const { data: viewsData } = await supabase
        .from('tool_views')
        .select('tool_id');

      const toolViewCounts = viewsData?.reduce((acc: any, item) => {
        acc[item.tool_id] = (acc[item.tool_id] || 0) + 1;
        return acc;
      }, {}) || {};

      const topToolIds = Object.entries(toolViewCounts)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 10)
        .map(([id]) => parseInt(id));

      const { data: toolsData } = await supabase
        .from('tools')
        .select('id, name')
        .in('id', topToolIds);

      const topTools = topToolIds.map(id => ({
        name: toolsData?.find(t => t.id === id)?.name || `Tool ${id}`,
        views: toolViewCounts[id]
      }));

      // Fetch category distribution
      const { data: categoriesData } = await supabase
        .from('tools')
        .select('category');

      const categoryCount = categoriesData?.reduce((acc: any, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {}) || {};

      const categoryDistribution = Object.entries(categoryCount).map(([category, count]) => ({
        category,
        count: count as number
      }));

      setAnalytics({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalViews: totalViews || 0,
        totalFavorites: totalFavorites || 0,
        userActivityTrend,
        topTools,
        categoryDistribution
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track user engagement and platform metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users (30d)</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalFavorites}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* User Activity Trend */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity (Last 7 Days)</CardTitle>
            <CardDescription>Daily user engagement trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.userActivityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="Activities" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Tools by Category</CardTitle>
            <CardDescription>Distribution of AI tools across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Most Viewed Tools</CardTitle>
          <CardDescription>Tools with the highest number of views</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analytics.topTools}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#8b5cf6" name="Views" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}