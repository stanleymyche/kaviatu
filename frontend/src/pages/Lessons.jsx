import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users, Trophy, Star } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Lessons = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    age: '',
    lesson_type: '',
    preferred_schedule: '',
    message: '',
  });

  const lessonTypes = [
    {
      name: 'Beginner',
      description: 'Perfect for kids just starting their chess journey',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      features: ['Basic rules and movements', 'Fun chess games', 'Building confidence', 'Ages 6-8'],
    },
    {
      name: 'Intermediate',
      description: 'For young players ready to advance their skills',
      icon: <Users className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      features: ['Strategic thinking', 'Tactics and combinations', 'Opening principles', 'Ages 9-12'],
    },
    {
      name: 'Advanced',
      description: 'Competitive training for serious young players',
      icon: <Trophy className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      features: ['Advanced strategies', 'Tournament preparation', 'Game analysis', 'Ages 12+'],
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/lessons/register`, {
        ...formData,
        age: parseInt(formData.age),
      });
      
      toast.success('Registration submitted successfully! We\'ll contact you soon.');
      
      // Reset form
      setFormData({
        student_name: '',
        parent_name: '',
        email: '',
        phone: '',
        age: '',
        lesson_type: '',
        preferred_schedule: '',
        message: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4" data-testid="lessons-title">Chess Lessons</h1>
            <p className="text-xl text-purple-100">
              Expert-led training programs for all skill levels
            </p>
          </div>
        </div>
      </section>

      {/* Lesson Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lessonTypes.map((lesson, index) => (
              <Card key={index} className="card-hover border-none shadow-lg">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${lesson.color} text-white mb-4`}>
                    {lesson.icon}
                  </div>
                  <CardTitle className="text-2xl">{lesson.name}</CardTitle>
                  <CardDescription className="text-base">{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lesson.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Star className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/5477779/pexels-photo-5477779.jpeg" 
              alt="Colorful chess learning"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16" data-testid="registration-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Register for Lessons</CardTitle>
                <CardDescription className="text-center text-base">
                  Fill out the form below and we'll contact you to confirm your enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="student_name">Student Name *</Label>
                      <Input
                        id="student_name"
                        name="student_name"
                        value={formData.student_name}
                        onChange={handleInputChange}
                        required
                        data-testid="student-name-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parent_name">Parent/Guardian Name *</Label>
                      <Input
                        id="parent_name"
                        name="parent_name"
                        value={formData.parent_name}
                        onChange={handleInputChange}
                        required
                        data-testid="parent-name-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        data-testid="email-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        data-testid="phone-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Student Age *</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="5"
                        max="18"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        data-testid="age-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lesson_type">Lesson Level *</Label>
                      <Select 
                        value={formData.lesson_type} 
                        onValueChange={(value) => setFormData({...formData, lesson_type: value})}
                        required
                      >
                        <SelectTrigger data-testid="lesson-type-select">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferred_schedule">Preferred Schedule *</Label>
                    <Input
                      id="preferred_schedule"
                      name="preferred_schedule"
                      placeholder="e.g., Weekends, After school on Tuesdays"
                      value={formData.preferred_schedule}
                      onChange={handleInputChange}
                      required
                      data-testid="schedule-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Information (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Any questions or special requirements?"
                      value={formData.message}
                      onChange={handleInputChange}
                      data-testid="message-textarea"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary text-white text-lg py-6"
                    disabled={loading}
                    data-testid="submit-registration-button"
                  >
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * All registrations are subject to admin approval. We'll contact you within 24-48 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Kashoe Chess Lessons?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-600">Experienced Coaches</h3>
                <p className="text-gray-600">Learn from certified chess instructors with years of experience</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-600">Small Class Sizes</h3>
                <p className="text-gray-600">Personalized attention with limited students per session</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-600">Faith-Based Values</h3>
                <p className="text-gray-600">Character development alongside chess skills</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-purple-600">Flexible Scheduling</h3>
                <p className="text-gray-600">Weekend and after-school options available</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lessons;