import { Users, Briefcase, Calendar, MapPin, Star, Clock, DollarSign, Globe } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CommunityPage() {
  const communities = [
    {
      id: 1,
      name: 'Adventure Hikers',
      description: 'Community for hiking enthusiasts and mountain lovers',
      members: 12543,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop',
      category: 'Adventure',
      active: true
    },
    {
      id: 2,
      name: 'Digital Nomads Europe',
      description: 'Remote workers exploring European cities',
      members: 8967,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
      category: 'Work Travel',
      active: false
    },
    {
      id: 3,
      name: 'Budget Backpackers',
      description: 'Travel the world on a shoestring budget',
      members: 15678,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop',
      category: 'Budget Travel',
      active: true
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Travel Content Creator',
      company: 'Wanderlust Media',
      location: 'Remote',
      type: 'Full-time',
      salary: '$45,000 - $65,000',
      posted: '2 days ago',
      tags: ['Content Creation', 'Social Media', 'Remote'],
      urgent: false
    },
    {
      id: 2,
      title: 'Tour Guide - Machu Picchu',
      company: 'Inca Trail Adventures',
      location: 'Cusco, Peru',
      type: 'Seasonal',
      salary: '$2,500/month',
      posted: '1 week ago',
      tags: ['Guiding', 'Spanish Required', 'On-site'],
      urgent: true
    },
    {
      id: 3,
      title: 'Travel Photographer',
      company: 'National Geographic',
      location: 'Various',
      type: 'Contract',
      salary: '$80,000 - $120,000',
      posted: '3 days ago',
      tags: ['Photography', 'Travel', 'Freelance'],
      urgent: false
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Travel Bloggers Meetup',
      date: 'March 15, 2025',
      time: '7:00 PM',
      location: 'Barcelona, Spain',
      attendees: 47,
      type: 'Networking',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop',
      virtual: false
    },
    {
      id: 2,
      title: 'Sustainable Tourism Webinar',
      date: 'March 18, 2025',
      time: '2:00 PM GMT',
      location: 'Online',
      attendees: 234,
      type: 'Educational',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop',
      virtual: true
    },
    {
      id: 3,
      title: 'Photography Workshop',
      date: 'March 22, 2025',
      time: '10:00 AM',
      location: 'Tokyo, Japan',
      attendees: 28,
      type: 'Workshop',
      image: 'https://images.unsplash.com/photo-1622525124300-c6bde73bf96a?w=300&h=200&fit=crop',
      virtual: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Tabs defaultValue="communities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="communities" className="flex items-center">
            <Users size={16} className="mr-2" />
            Communities
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center">
            <Briefcase size={16} className="mr-2" />
            Opportunities
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center">
            <Calendar size={16} className="mr-2" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="communities" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Travel Communities</h2>
            <button className="text-blue-600 hover:underline">Create Community</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.map(community => (
              <Card key={community.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <ImageWithFallback 
                  src={community.image} 
                  alt={community.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{community.name}</h3>
                    {community.active && (
                      <Badge variant="default" className="bg-green-500">
                        Joined
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{community.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Users size={14} className="mr-1" />
                      {community.members.toLocaleString()} members
                    </span>
                    <Badge variant="outline">{community.category}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Travel Opportunities</h2>
            <button className="text-blue-600 hover:underline">Post Opportunity</button>
          </div>

          <div className="space-y-4">
            {opportunities.map(opportunity => (
              <Card key={opportunity.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{opportunity.title}</h3>
                      {opportunity.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{opportunity.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {opportunity.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase size={14} className="mr-1" />
                        {opportunity.type}
                      </span>
                      <span className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {opportunity.salary}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {opportunity.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                      Apply
                    </button>
                    <p className="text-xs text-gray-500 mt-2">{opportunity.posted}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Travel Events</h2>
            <button className="text-blue-600 hover:underline">Create Event</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <ImageWithFallback 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{event.type}</Badge>
                    {event.virtual && (
                      <Badge className="bg-purple-500">
                        <Globe size={12} className="mr-1" />
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.attendees} attending
                    </span>
                    <button className="text-blue-600 text-sm hover:underline">
                      Join Event
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}