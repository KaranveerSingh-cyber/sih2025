import { TrendingUp, Users, MapPin, Star, Eye } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DiscoverPage() {
  const trendingDestinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop',
      posts: 1247,
      followers: 8965,
      trending: '+15%'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop',
      posts: 2156,
      followers: 12453,
      trending: '+22%'
    },
    {
      id: 3,
      name: 'Iceland',
      image: 'https://images.unsplash.com/photo-1531168556467-80aace4d0144?w=300&h=200&fit=crop',
      posts: 892,
      followers: 6781,
      trending: '+8%'
    }
  ];

  const featuredGuides = [
    {
      id: 1,
      name: 'Maria Santos',
      specialty: 'Cultural Tours',
      location: 'Barcelona, Spain',
      rating: 4.9,
      reviews: 156,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c2c2?w=100&h=100&fit=crop',
      verified: true
    },
    {
      id: 2,
      name: 'Kenji Tanaka',
      specialty: 'Food & Culinary',
      location: 'Tokyo, Japan',
      rating: 4.8,
      reviews: 203,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      verified: true
    },
    {
      id: 3,
      name: 'Adventure Nordic',
      specialty: 'Nature & Adventure',
      location: 'Reykjavik, Iceland',
      rating: 4.7,
      reviews: 89,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      verified: false
    }
  ];

  const popularExperiences = [
    {
      id: 1,
      title: 'Northern Lights Photography Workshop',
      location: 'Iceland',
      price: '$299',
      duration: '3 days',
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
      rating: 4.9,
      participants: 142
    },
    {
      id: 2,
      title: 'Sunset Sailing in Santorini',
      location: 'Santorini, Greece',
      price: '$89',
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&h=200&fit=crop',
      rating: 4.8,
      participants: 387
    },
    {
      id: 3,
      title: 'Street Food Tour & Cooking Class',
      location: 'Tokyo, Japan',
      price: '$125',
      duration: '6 hours',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop',
      rating: 4.9,
      participants: 256
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Trending Destinations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp className="mr-2 text-green-500" size={20} />
            Trending Destinations
          </h2>
          <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingDestinations.map(destination => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <ImageWithFallback 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-32 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                  {destination.trending}
                </Badge>
              </div>
              <div className="p-3">
                <h3 className="font-medium mb-2">{destination.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Eye size={14} className="mr-1" />
                    {destination.posts.toLocaleString()} posts
                  </span>
                  <span className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {destination.followers.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Guides */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Star className="mr-2 text-yellow-500" size={20} />
            Featured Guides
          </h2>
          <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredGuides.map(guide => (
            <Card key={guide.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <ImageWithFallback 
                  src={guide.avatar} 
                  alt={guide.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <h3 className="font-medium">{guide.name}</h3>
                    {guide.verified && <span className="text-blue-500 text-sm">✓</span>}
                  </div>
                  <p className="text-sm text-gray-600">{guide.specialty}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {guide.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                    {guide.rating} ({guide.reviews} reviews)
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">Connect</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Experiences */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Popular Experiences</h2>
          <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularExperiences.map(experience => (
            <Card key={experience.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <ImageWithFallback 
                src={experience.image} 
                alt={experience.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium mb-1">{experience.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={14} className="mr-1" />
                  {experience.location}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-green-600">{experience.price}</span>
                    <span className="text-gray-500">• {experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={12} className="mr-1 text-yellow-500 fill-current" />
                    <span>{experience.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {experience.participants} participants
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}