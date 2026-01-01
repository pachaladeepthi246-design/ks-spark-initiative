import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  RobotMascot, 
  RobotMegaphone, 
  RobotPhone, 
  RobotPen, 
  RobotRocket, 
  RobotChart,
  RobotCoin,
  RobotStar
} from '@/components/icons/CuteRobots';
import { Check, Sparkles, Zap, Shield, Clock } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <RobotPhone size={56} />,
      title: 'WhatsApp Marketing',
      description: 'Bulk messaging, automated campaigns, and smart replies powered by AI.',
    },
    {
      icon: <RobotRocket size={56} />,
      title: 'Social Media Poster',
      description: 'AI-generated posts scheduled across all your social platforms.',
    },
    {
      icon: <RobotPen size={56} />,
      title: 'Ad Copy Generator',
      description: 'Create compelling ad copy in seconds with our AI engine.',
    },
    {
      icon: <RobotMegaphone size={56} />,
      title: 'Campaign Manager',
      description: 'Orchestrate multi-channel campaigns from a single dashboard.',
    },
    {
      icon: <RobotChart size={56} />,
      title: 'Analytics & Insights',
      description: 'Track performance with real-time analytics and smart recommendations.',
    },
    {
      icon: <RobotCoin size={56} />,
      title: 'ROI Optimization',
      description: 'Maximize your marketing spend with AI-powered optimization.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for trying out MarketBot',
      features: ['100 AI generations/month', '1 social account', 'Basic analytics', 'Email support'],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Best for growing businesses',
      features: ['Unlimited AI generations', '10 social accounts', 'Advanced analytics', 'Priority support', 'WhatsApp integration', 'Custom templates'],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large teams & agencies',
      features: ['Everything in Pro', 'Unlimited accounts', 'White-label options', 'Dedicated manager', 'API access', 'Custom AI training'],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechFlow Inc.',
      content: 'MarketBot has revolutionized our content creation. We\'ve cut our campaign time by 70% while doubling engagement.',
      avatar: 'https://source.unsplash.com/100x100/?woman,professional',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder & CEO',
      company: 'GrowthLab',
      content: 'The AI-powered WhatsApp campaigns have been a game-changer. Our conversion rates have never been higher.',
      avatar: 'https://source.unsplash.com/100x100/?man,business',
    },
    {
      name: 'Emily Watson',
      role: 'Social Media Manager',
      company: 'BrandWave Agency',
      content: 'I was skeptical at first, but the cute robot assistants and powerful AI won me over. Best marketing tool I\'ve used!',
      avatar: 'https://source.unsplash.com/100x100/?woman,creative',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass-card sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <RobotMascot size={40} />
            <span className="text-2xl font-bold gradient-text">MarketBot</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="btn-electric">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <RobotMascot size={180} />
              <div className="absolute -right-4 -top-4">
                <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">AI-Powered Marketing</span>
            <br />
            <span className="text-foreground">Made Adorably Simple</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Meet your new robot marketing team. Generate ads, automate WhatsApp campaigns, 
            and dominate social media — all powered by cutting-edge AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="btn-electric text-lg px-8 py-6">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="btn-glass text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              Setup in 2 minutes
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Enterprise-grade security
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Dominate Marketing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our cute robot assistants handle the heavy lifting so you can focus on what matters.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text-sunset">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. Scale as you grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'glass-card border-2 border-primary shadow-xl shadow-primary/20' 
                    : 'glass-card border-0'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-xl flex items-center gap-1">
                      <RobotStar size={20} />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-electric' : 'btn-glass'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">Marketers Worldwide</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses transforming their marketing with MarketBot.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <Card className="gradient-bg-electric text-white border-0 overflow-hidden relative">
            <div className="absolute right-0 bottom-0 opacity-20">
              <RobotMascot size={300} />
            </div>
            <CardContent className="py-16 px-8 md:px-16 relative z-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your Marketing?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Join over 10,000 businesses already using MarketBot to supercharge their marketing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                      Start Your Free Trial
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <RobotMascot size={32} />
              <span className="text-xl font-bold gradient-text">MarketBot</span>
            </div>
            <div className="flex gap-8 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 MarketBot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
