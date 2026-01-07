import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4" data-testid="about-title">About Kashoe Chess Club</h1>
            <p className="text-xl text-purple-100">
              Nurturing young minds through chess and faith in Nairobi, Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Kashoe Chess Club was founded with a vision to combine the intellectual rigor of chess with faith-based values. Located in the heart of Nairobi, Kenya, we've created a nurturing environment where children can develop their chess skills while building strong moral foundations.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our club is more than just a place to learn chess – it's a community where young minds are encouraged to think critically, act with integrity, and grow in wisdom. We believe that the principles learned through chess – patience, strategy, and perseverance – are essential life skills that extend far beyond the board.
              </p>
              <p className="text-lg text-gray-700">
                Since our inception, we've helped hundreds of children discover the joy of chess while instilling values that will guide them throughout their lives. Whether a child is a complete beginner or an experienced player, Kashoe Chess Club provides the perfect environment for growth and learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1763635031729-b3db264dd8c0" 
              alt="Child playing chess"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/7104222/pexels-photo-7104222.jpeg" 
              alt="Children at chess club"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To nurture young chess players through quality training, faith-based values, and a supportive community in Nairobi, Kenya.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To be Kenya's leading chess club where children develop both intellectual excellence and strong character.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <p className="text-gray-600">
                  Integrity, excellence, faith, community, and continuous learning guide everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Commitment</h3>
                <p className="text-gray-600">
                  Providing accessible, high-quality chess education to every child who wants to learn and grow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Structured Lessons</h3>
                <p className="text-gray-600">
                  Age-appropriate chess training from beginner to advanced levels, taught by experienced coaches.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Regular Tournaments</h3>
                <p className="text-gray-600">
                  Exciting competitions that help students apply their skills and build confidence.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Character Development</h3>
                <p className="text-gray-600">
                  Faith-based guidance that helps children develop integrity, patience, and good sportsmanship.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Community Events</h3>
                <p className="text-gray-600">
                  Fun activities, workshops, and social events that bring families together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;