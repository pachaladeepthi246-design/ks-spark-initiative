import { Link } from 'react-router-dom';
import { Heart, Users, Lightbulb, ArrowRight, Star, Award, Target } from 'lucide-react';

export default function KSHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Empowering Communities Since 2024</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Building Tomorrow's
              <span className="text-primary block mt-2">Tech Leaders Today</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              KS Foundation is dedicated to nurturing talent, fostering innovation, and creating opportunities 
              for aspiring technologists to transform their dreams into reality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/ks/join"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/ks/donate"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
              >
                Support Students
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'Students Trained', value: '500+' },
              { icon: Award, label: 'Projects Completed', value: '150+' },
              { icon: Star, label: 'Success Stories', value: '200+' }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-4 p-6 rounded-lg bg-background/50 backdrop-blur">
                <stat.icon className="w-12 h-12 text-primary mx-auto" />
                <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Mission</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Transforming Lives Through Technology Education
              </h2>
              
              <p className="text-lg text-muted-foreground">
                We believe every talented individual deserves access to quality tech education and opportunities, 
                regardless of their financial background. Our foundation provides comprehensive training, mentorship, 
                and real-world project experience to help students build successful careers in technology.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Free technical training and certification programs',
                  'Real-world project experience with industry mentors',
                  'Job placement assistance and career guidance',
                  'Scholarship support for underprivileged students'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur flex items-center justify-center">
                <Lightbulb className="w-32 h-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-primary-foreground/90">
            Join us in our mission to empower the next generation of tech innovators. 
            Your support can change lives and build a better future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ks/students"
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
            >
              Meet Our Students
            </Link>
            <Link
              to="/ks/projects"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
