import { MapPin, Star, Users, Camera, Calendar, Award, Edit, Settings, Share } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProfilePage() {
  const userProfile = {
    name: 'Sarah Chen',
    type: 'traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c2c2?w=150&h=150&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?w=800&h=300&fit=crop',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    verified: true,
    bio: 'Adventure seeker, photography enthusiast, and cultural explorer. Sharing my journey one destination at a time. Currently planning my next adventure to Southeast Asia! 🌍📸',
    stats: {
      destinations: 47,
      posts: 156,
      followers: 2834,
      following: 892
    },
    badges: [
      { name: 'Adventure Seeker', icon: '🏔️', description: 'Visited 10+ adventure destinations' },
      { name: 'Photo Pro', icon: '📸', description: 'Posts with 1000+ likes' },
      { name: 'Community Helper', icon: '🤝', description: 'Helped 50+ travelers' },
      { name: 'Early Adopter', icon: '⭐', description: 'Joined in the first month' }
    ]
  };

  const recentPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?w=300&h=300&fit=crop',
      location: 'Mount Batur, Bali',
      likes: 247,
      comments: 32
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1622525124300-c6bde73bf96a?w=300&h=300&fit=crop',
      location: 'Tokyo, Japan',
      likes: 189,
      comments: 28
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1659398053359-d2f3fe6c95a7?w=300&h=300&fit=crop',
      location: 'Maldives',
      likes: 312,
      comments: 41
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1652176862396-99e525e9f87b?w=300&h=300&fit=crop',
      location: 'Barcelona, Spain',
      likes: 156,
      comments: 23
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=300&fit=crop',
      location: 'Santorini, Greece',
      likes: 298,
      comments: 35
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1531168556467-80aace4d0144?w=300&h=300&fit=crop',
      location: 'Iceland',
      likes: 234,
      comments: 29
    }
  ];

  const visitedDestinations = [
    { name: 'Japan', flag: '🇯🇵', count: 8 },
    { name: 'Indonesia', flag: '🇮🇩', count: 12 },
    { name: 'Spain', flag: '🇪🇸', count: 6 },
    { name: 'Greece', flag: '🇬🇷', count: 4 },
    { name: 'Iceland', flag: '🇮🇸', count: 3 },
    { name: 'Thailand', flag: '🇹🇭', count: 9 },
    { name: 'Peru', flag: '🇵🇪', count: 5 },
    { name: 'New Zealand', flag: '🇳🇿', count: 7 }
  ];

  const endorsements = [
    { skill: 'Photography', count: 47 },
    { skill: 'Cultural Knowledge', count: 32 },
    { skill: 'Adventure Planning', count: 28 },
    { skill: 'Budget Travel', count: 23 },
    { skill: 'Solo Travel', count: 19 }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Cover & Profile Header */}
      <Card className="overflow-hidden mb-6">
        <div className="relative">
          <ImageWithFallback 
            src={userProfile.coverImage} 
            alt="Cover"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 space-x-2">
            <Button size="sm" variant="outline" className="bg-white/90">
              <Share size={16} className="mr-2" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90">
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative -mt-16">
              <ImageWithFallback 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              {userProfile.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <Star size={12} className="text-white fill-current" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin size={16} className="mr-1" />
                    {userProfile.location}
                  </div>
                  <div className="flex items-center text-gray-500 mt-1">
                    <Calendar size={16} className="mr-1" />
                    Joined {userProfile.joinDate}
                  </div>
                </div>
                <Button>
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
              
              <p className="text-gray-700 mt-3 max-w-2xl">{userProfile.bio}</p>
              
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="font-bold text-lg">{userProfile.stats.destinations}</div>
                  <div className="text-gray-500 text-sm">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{userProfile.stats.posts}</div>
                  <div className="text-gray-500 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{userProfile.stats.followers.toLocaleString()}</div>
                  <div className="text-gray-500 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{userProfile.stats.following}</div>
                  <div className="text-gray-500 text-sm">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-3 gap-1">
            {recentPosts.map(post => (
              <div key={post.id} className="relative aspect-square group cursor-pointer">
                <ImageWithFallback 
                  src={post.image} 
                  alt={post.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Star size={16} className="mr-1 fill-current" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <Camera size={16} className="mr-1" />
                        {post.comments}
                      </span>
                    </div>
                    <div className="mt-2 text-xs">{post.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visitedDestinations.map((destination, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-2">{destination.flag}</div>
                <h3 className="font-medium">{destination.name}</h3>
                <p className="text-sm text-gray-500">{destination.count} visits</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.badges.map((badge, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{badge.icon}</div>
                  <div>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="endorsements" className="mt-6">
          <div className="space-y-4">
            {endorsements.map((endorsement, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{endorsement.skill}</h3>
                    <p className="text-sm text-gray-600">{endorsement.count} endorsements</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Award size={16} className="mr-2" />
                    Endorse
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}