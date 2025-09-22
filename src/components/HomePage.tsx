import { useState, useEffect } from "react";
import { FeedPost } from "./FeedPost";
import { Plus, Image, MapPin, Briefcase, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useAuth } from "../contexts/AuthContext";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { supabase } from "../utils/supabase/client";

interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  location?: string;
  type: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
}

export function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
    location: "",
    type: "experience"
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2e9e596/posts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPost.content.trim()) return;

    setCreating(true);
    try {
      if (user) {
        // Authenticated user - use backend
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2e9e596/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(newPost),
          });

          if (response.ok) {
            const data = await response.json();
            setPosts([data.post, ...posts]);
            setNewPost({ content: "", image: "", location: "", type: "experience" });
            setShowCreatePost(false);
          }
        }
      } else {
        // Anonymous user - create local post
        const anonymousPost = {
          id: crypto.randomUUID(),
          userId: 'anonymous',
          content: newPost.content,
          image: newPost.image,
          location: newPost.location,
          type: newPost.type,
          likes: 0,
          comments: 0,
          shares: 0,
          createdAt: new Date().toISOString()
        };
        
        setPosts([anonymousPost, ...posts]);
        setNewPost({ content: "", image: "", location: "", type: "experience" });
        setShowCreatePost(false);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setCreating(false);
    }
  };

  const mockPosts = [
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c2c2?w=150&h=150&fit=crop',
        type: 'traveler' as const,
        location: 'Bali, Indonesia',
        verified: true
      },
      content: 'Just had the most incredible sunrise hike to Mount Batur! The view was absolutely breathtaking and totally worth the 4am wake-up call. Pro tip: bring layers - it gets chilly at the summit!',
      image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMG1vdW50YWlufGVufDF8fHx8MTc1ODM2OTE2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Mount Batur, Bali',
      tags: ['hiking', 'sunrise', 'bali', 'adventure'],
      likes: 247,
      comments: 32,
      timeAgo: '2h',
      type: 'experience' as const
    },
    {
      id: '2',
      author: {
        name: 'Marco Adventure Tours',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        type: 'business' as const,
        location: 'Costa Rica',
        verified: true
      },
      content: 'Looking for experienced photographers and videographers to join our wildlife expedition team! 📸 We offer competitive rates and the chance to capture amazing biodiversity in Costa Rica\'s rainforests.',
      tags: ['photography', 'wildlife', 'costarica', 'job'],
      likes: 89,
      comments: 15,
      timeAgo: '4h',
      type: 'opportunity' as const
    }
  ];

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Create Post */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span>{user?.name?.charAt(0).toUpperCase() || '✈️'}</span>
          </div>
          <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
            <DialogTrigger asChild>
              <input 
                type="text" 
                placeholder={user ? "Share your travel experience..." : "Share anonymously or sign in..."}
                className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm border-none outline-none cursor-pointer"
                readOnly
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="What's your travel story?"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="min-h-[100px]"
                />
                <Input
                  placeholder="Add image URL (optional)"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                />
                <Input
                  placeholder="Location (optional)"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                />
                <Select value={newPost.type} onValueChange={(value) => setNewPost({ ...newPost, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="experience">Travel Experience</SelectItem>
                    <SelectItem value="tip">Travel Tip</SelectItem>
                    <SelectItem value="opportunity">Job Opportunity</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-between items-center">
                  {!user && (
                    <p className="text-sm text-gray-500">Posting anonymously</p>
                  )}
                  <Button onClick={createPost} disabled={creating || !newPost.content.trim()}>
                    {creating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      user ? 'Create Post' : 'Post Anonymously'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Image size={16} className="mr-2" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <MapPin size={16} className="mr-2" />
              Location
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Briefcase size={16} className="mr-2" />
              Opportunity
            </Button>
          </div>
          <Button size="sm" onClick={() => setShowCreatePost(true)}>
            <Plus size={16} className="mr-2" />
            Post
          </Button>
        </div>
      </div>

      {/* Feed */}
      <div>
        {posts.length > 0 ? (
          posts.map(post => (
            <FeedPost key={post.id} post={{
              ...post,
              author: {
                name: post.userId === 'anonymous' ? 'Anonymous Wanderer' : (user?.name || 'Anonymous User'),
                avatar: post.userId === 'anonymous' ? '' : (user?.profileImage || ''),
                type: post.userId === 'anonymous' ? 'traveler' : (user?.userType as any || 'traveler'),
                location: post.location || 'Unknown Location',
                verified: false
              },
              tags: [],
              timeAgo: new Date(post.createdAt).toLocaleString()
            }} />
          ))
        ) : (
          mockPosts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}