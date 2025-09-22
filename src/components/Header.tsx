import { Search, Bell, MessageCircle, LogOut, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface HeaderProps {
  onShowAuth?: () => void;
}

export function Header({ onShowAuth }: HeaderProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-40">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-blue-600">Wanderlust</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Search destinations, guides, experiences..." 
              className="pl-10 bg-gray-50 border-none"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MessageCircle size={20} className="text-gray-600" />
          </button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <User size={16} />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-600"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowAuth}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}