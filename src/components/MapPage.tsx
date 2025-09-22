import { MapPin, Star, Users, Camera, Navigation, Filter } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MapPage() {
  const mapLocations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      type: 'destination',
      coordinates: { lat: 36.3932, lng: 25.4615 },
      posts: 1247,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop',
      popularWith: ['couples', 'photographers', 'luxury travelers']
    },
    {
      id: 2,
      name: 'Mount Fuji, Japan',
      type: 'destination',
      coordinates: { lat: 35.3606, lng: 138.7274 },
      posts: 892,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=300&h=200&fit=crop',
      popularWith: ['hikers', 'nature lovers', 'photographers']
    },
    {
      id: 3,
      name: 'Marco\'s Adventure Tours',
      type: 'guide',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      specialty: 'Adventure Tours',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      verified: true
    },
    {
      id: 4,
      name: 'Northern Lights Chase',
      type: 'event',
      coordinates: { lat: 64.1466, lng: -21.9426 },
      date: 'March 20, 2025',
      attendees: 24,
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
      organizer: 'Arctic Adventures'
    },
    {
      id: 5,
      name: 'Bali Digital Nomad Hub',
      type: 'community',
      coordinates: { lat: -8.3405, lng: 115.0920 },
      members: 567,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop',
      category: 'Work & Travel'
    }
  ];

  const selectedLocation = mapLocations[0]; // Mock selected location

  return (
    <div className="flex h-screen">
      {/* Map Area */}
      <div className="flex-1 relative bg-gray-100">
        {/* Mock Map */}
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-white to-transparent"></div>
          </div>
          
          {/* Map Pins */}
          {mapLocations.map((location, index) => (
            <div 
              key={location.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`
              }}
            >
              <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <MapPin size={16} className="text-white" />
              </div>
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-white">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <Button size="sm" variant="outline" className="bg-white">
              <Navigation size={16} className="mr-2" />
              My Location
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
            <h4 className="font-medium mb-2">Legend</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Destinations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Guides</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Events</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Communities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-semibold mb-4">Explore Locations</h3>
          
          {/* Selected Location Detail */}
          {selectedLocation && (
            <Card className="mb-4 overflow-hidden">
              <ImageWithFallback 
                src={selectedLocation.image} 
                alt={selectedLocation.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium mb-2">{selectedLocation.name}</h4>
                {selectedLocation.type === 'destination' && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm">
                        <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                        {selectedLocation.rating}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Camera size={14} className="mr-1" />
                        {selectedLocation.posts} posts
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedLocation.popularWith?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
                <Button className="w-full mt-3" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          )}

          {/* Location List */}
          <div className="space-y-3">
            {mapLocations.map((location) => (
              <Card key={location.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <ImageWithFallback 
                    src={location.image} 
                    alt={location.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{location.name}</h5>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {location.type}
                      </Badge>
                      {location.type === 'destination' && (
                        <span className="flex items-center">
                          <Star size={12} className="mr-1 text-yellow-500 fill-current" />
                          {location.rating}
                        </span>
                      )}
                      {location.type === 'community' && (
                        <span className="flex items-center">
                          <Users size={12} className="mr-1" />
                          {location.members}
                        </span>
                      )}
                      {location.type === 'event' && (
                        <span className="flex items-center">
                          <Users size={12} className="mr-1" />
                          {location.attendees}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}