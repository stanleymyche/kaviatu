import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Heart, BookOpen, Calendar, ShoppingBag } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community',
      description: 'Join a vibrant community of young chess enthusiasts',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Faith-Based',
      description: 'Building character and values through chess',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Expert Training',
      description: 'Learn from experienced coaches and mentors',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Tournaments',
      description: 'Regular competitions and exciting events',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="chess-pattern h-full w-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-float mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-5xl">♔</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-in-up" data-testid="hero-title">
              Welcome to Kashoe Chess Club
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              A faith-based chess club nurturing young minds in Nairobi, Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/lessons">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8"
                  data-testid="get-started-button"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                  data-testid="learn-more-button"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join Kashoe?</h2>
            <p className="text-xl text-gray-600">Discover the benefits of being part of our chess family</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Chess for Every Child</h2>
              <p className="text-lg text-gray-600 mb-4">
                At Kashoe Chess Club, we believe every child has the potential to excel. Through chess, we teach critical thinking, patience, and strategic planning while fostering a love for learning.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our faith-based approach ensures that children not only learn the game but also develop strong character and values that will serve them throughout their lives.
              </p>
              <Link to="/about">
                <Button className="btn-primary text-white" data-testid="read-more-button">
                  Read Our Story
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1745556377753-9efffe9181ef" 
                alt="Children playing chess"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore More</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/events">
              <Card className="card-hover cursor-pointer h-full">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-2xl font-semibold mb-2">Events</h3>
                  <p className="text-gray-600">Check out our upcoming tournaments and activities</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/shop">
              <Card className="card-hover cursor-pointer h-full">
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="text-2xl font-semibold mb-2">Shop</h3>
                  <p className="text-gray-600">Browse chess boards, clocks, and club merchandise</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/lessons">
              <Card className="card-hover cursor-pointer h-full">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-2xl font-semibold mb-2">Lessons</h3>
                  <p className="text-gray-600">Enroll in our expert-led chess training programs</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl mb-8">Start your chess journey with Kashoe Chess Club today!</p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8"
              data-testid="contact-us-button"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;