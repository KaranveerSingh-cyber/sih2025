import { Heart, MessageCircle, Share, Bookmark, MapPin, Star } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeedPostProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar: string;
      type: 'traveler' | 'guide' | 'business';
      location?: string;
      verified?: boolean;
    };
    content: string;
    image?: string;
    location?: string;
    tags: string[];
    likes: number;
    comments: number;
    timeAgo: string;
    type: 'experience' | 'opportunity' | 'tip' | 'review';
  };
}

export function FeedPost({ post }: FeedPostProps) {
  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800';
      case 'experience': return 'bg-blue-100 text-blue-800';
      case 'tip': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return '🎯';
      case 'business': return '🏢';
      default: return '✈️';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              {post.author.avatar ? (
                <ImageWithFallback 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  {post.author.name === 'Anonymous Wanderer' ? '🌍' : post.author.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{post.author.name}</span>
                <span className="text-sm">{getUserTypeIcon(post.author.type)}</span>
                {post.author.verified && <span className="text-blue-500">✓</span>}
              </div>
              {post.author.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={12} className="mr-1" />
                  {post.author.location}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getPostTypeColor(post.type)}>
              {post.type}
            </Badge>
            <span className="text-sm text-gray-500">{post.timeAgo}</span>
          </div>
        </div>
        
        <p className="text-gray-800 mb-3">{post.content}</p>
        
        {post.location && (
          <div className="flex items-center text-sm text-blue-600 mb-3">
            <MapPin size={14} className="mr-1" />
            {post.location}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <div className="aspect-square relative">
          <ImageWithFallback 
            src={post.image} 
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
              <Heart size={20} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
              <MessageCircle size={20} />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button className="text-gray-600 hover:text-blue-500">
              <Share size={20} />
            </button>
          </div>
          <button className="text-gray-600 hover:text-yellow-500">
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}