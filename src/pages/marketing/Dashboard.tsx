import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  RobotChart, 
  RobotMegaphone, 
  RobotPen, 
  RobotPhone, 
  RobotRocket,
  RobotCoin 
} from '@/components/icons/CuteRobots';
import { ArrowUpRight, ArrowDownRight, Zap, MessageSquare, Image, FileText } from 'lucide-react';
import DashboardSidebar from '@/components/marketing/DashboardSidebar';
import ChatWidget from '@/components/marketing/ChatWidget';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Credits Used',
      value: '750',
      total: '1,000',
      change: '+12%',
      positive: false,
      icon: <RobotCoin size={32} />,
    },
    {
      title: 'Ads Generated',
      value: '234',
      change: '+28%',
      positive: true,
      icon: <RobotPen size={32} />,
    },
    {
      title: 'Messages Sent',
      value: '12.5K',
      change: '+45%',
      positive: true,
      icon: <RobotPhone size={32} />,
    },
    {
      title: 'Posts Scheduled',
      value: '89',
      change: '+8%',
      positive: true,
      icon: <RobotRocket size={32} />,
    },
  ];

  const recentActivity = [
    { type: 'ad', title: 'Summer Sale Campaign', time: '2 hours ago', status: 'completed' },
    { type: 'whatsapp', title: 'Weekly Newsletter', time: '5 hours ago', status: 'sent' },
    { type: 'social', title: 'Instagram Product Post', time: '1 day ago', status: 'scheduled' },
    { type: 'ad', title: 'Black Friday Teaser', time: '2 days ago', status: 'draft' },
  ];

  const quickActions = [
    { title: 'Generate Ad Copy', icon: <RobotPen size={40} />, href: '/tools/ads-gen', color: 'from-blue-500 to-purple-500' },
    { title: 'Send WhatsApp', icon: <RobotPhone size={40} />, href: '/tools/whatsapp', color: 'from-green-500 to-teal-500' },
    { title: 'Schedule Post', icon: <RobotRocket size={40} />, href: '/tools/social-poster', color: 'from-orange-500 to-pink-500' },
  ];

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="glass-card border-b border-border/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <RobotChart size={40} />
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your marketing.</p>
            </div>
            <Button className="btn-electric">
              <Zap className="mr-2 h-4 w-4" />
              Quick Generate
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-muted">{stat.icon}</div>
                    <span className={`flex items-center text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-orange-500'}`}>
                      {stat.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  {stat.total && (
                    <p className="text-sm text-muted-foreground">of {stat.total}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden">
                    <CardContent className="p-6 relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-muted group-hover:scale-110 transition-transform duration-300">
                          {action.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">Click to start</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activity & Credits Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RobotMegaphone size={28} />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest marketing actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          {activity.type === 'ad' && <FileText className="h-4 w-4 text-primary" />}
                          {activity.type === 'whatsapp' && <MessageSquare className="h-4 w-4 text-green-500" />}
                          {activity.type === 'social' && <Image className="h-4 w-4 text-pink-500" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        activity.status === 'sent' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        activity.status === 'scheduled' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Credits Usage */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RobotCoin size={28} />
                  Credits Usage
                </CardTitle>
                <CardDescription>Track your AI generation credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Main progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Credits</span>
                      <span className="text-sm text-muted-foreground">750 / 1,000</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 gradient-bg-electric rounded-full transition-all duration-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Resets in 12 days</p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm">Ad Generation</span>
                      </div>
                      <span className="text-sm font-medium">450 credits</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm">WhatsApp Messages</span>
                      </div>
                      <span className="text-sm font-medium">180 credits</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm">Social Posts</span>
                      </div>
                      <span className="text-sm font-medium">120 credits</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full btn-glass">
                    <RobotCoin size={20} className="mr-2" />
                    Upgrade for More Credits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Dashboard;
