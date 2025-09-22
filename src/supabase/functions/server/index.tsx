import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
}));
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Health check
app.get('/make-server-f2e9e596/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// User Authentication Routes
app.post('/make-server-f2e9e596/auth/signup', async (c) => {
  try {
    const { email, password, name, userType } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, userType },
      email_confirm: true // Auto-confirm since no email server configured
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user profile data
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      userType,
      createdAt: new Date().toISOString(),
      bio: '',
      location: '',
      profileImage: '',
      coverImage: '',
      followers: 0,
      following: 0,
      posts: 0
    });

    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error) {
    console.log('Signup server error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.post('/make-server-f2e9e596/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log('Signin error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ session: data.session, user: data.user });
  } catch (error) {
    console.log('Signin server error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Posts Routes
app.get('/make-server-f2e9e596/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('post:');
    
    // Sort posts by creation date (newest first)
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ posts: sortedPosts });
  } catch (error) {
    console.log('Get posts error:', error);
    return c.json({ error: 'Failed to fetch posts' }, 500);
  }
});

app.post('/make-server-f2e9e596/posts', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { content, image, location, type } = await c.req.json();
    const postId = crypto.randomUUID();
    
    const post = {
      id: postId,
      userId: user.id,
      content,
      image,
      location,
      type: type || 'experience',
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`post:${postId}`, post);
    
    // Update user post count
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.posts = (userData.posts || 0) + 1;
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ post, message: 'Post created successfully' });
  } catch (error) {
    console.log('Create post error:', error);
    return c.json({ error: 'Failed to create post' }, 500);
  }
});

// Communities Routes
app.get('/make-server-f2e9e596/communities', async (c) => {
  try {
    const communities = await kv.getByPrefix('community:');
    return c.json({ communities });
  } catch (error) {
    console.log('Get communities error:', error);
    return c.json({ error: 'Failed to fetch communities' }, 500);
  }
});

app.post('/make-server-f2e9e596/communities', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { name, description, category, image } = await c.req.json();
    const communityId = crypto.randomUUID();
    
    const community = {
      id: communityId,
      name,
      description,
      category,
      image,
      createdBy: user.id,
      members: 1,
      posts: 0,
      createdAt: new Date().toISOString()
    };

    await kv.set(`community:${communityId}`, community);
    return c.json({ community, message: 'Community created successfully' });
  } catch (error) {
    console.log('Create community error:', error);
    return c.json({ error: 'Failed to create community' }, 500);
  }
});

// Emergency Alert Routes
app.post('/make-server-f2e9e596/emergency-alert', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { location, message } = await c.req.json();
    const alertId = crypto.randomUUID();
    
    const alert = {
      id: alertId,
      userId: user.id,
      location, // Approximate location for privacy
      message: message || 'Emergency assistance needed',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    await kv.set(`emergency:${alertId}`, alert);
    
    // In a real app, this would trigger notifications to nearby users
    console.log('Emergency alert sent:', alert);
    
    return c.json({ alert, message: 'Emergency alert sent successfully' });
  } catch (error) {
    console.log('Emergency alert error:', error);
    return c.json({ error: 'Failed to send emergency alert' }, 500);
  }
});

// User Profile Routes
app.get('/make-server-f2e9e596/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Get user's posts
    const allPosts = await kv.getByPrefix('post:');
    const userPosts = allPosts.filter(post => post.userId === userId);

    return c.json({ user, posts: userPosts });
  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

app.put('/make-server-f2e9e596/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const existingUser = await kv.get(`user:${user.id}`);
    
    if (!existingUser) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    const updatedUser = {
      ...existingUser,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, updatedUser);
    return c.json({ user: updatedUser, message: 'Profile updated successfully' });
  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Opportunities Routes
app.get('/make-server-f2e9e596/opportunities', async (c) => {
  try {
    const opportunities = await kv.getByPrefix('opportunity:');
    return c.json({ opportunities });
  } catch (error) {
    console.log('Get opportunities error:', error);
    return c.json({ error: 'Failed to fetch opportunities' }, 500);
  }
});

app.post('/make-server-f2e9e596/opportunities', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { title, description, location, type, salary, company } = await c.req.json();
    const opportunityId = crypto.randomUUID();
    
    const opportunity = {
      id: opportunityId,
      title,
      description,
      location,
      type,
      salary,
      company,
      postedBy: user.id,
      applications: 0,
      createdAt: new Date().toISOString()
    };

    await kv.set(`opportunity:${opportunityId}`, opportunity);
    return c.json({ opportunity, message: 'Opportunity created successfully' });
  } catch (error) {
    console.log('Create opportunity error:', error);
    return c.json({ error: 'Failed to create opportunity' }, 500);
  }
});

Deno.serve(app.fetch);