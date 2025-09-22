import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { BottomNavigation } from "./components/BottomNavigation";
import { HomePage } from "./components/HomePage";
import { DiscoverPage } from "./components/DiscoverPage";
import { CommunityPage } from "./components/CommunityPage";
import { MapPage } from "./components/MapPage";
import { ProfilePage } from "./components/ProfilePage";
import { EmergencyAlert, EmergencyButton } from "./components/EmergencyAlert";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthModal } from "./components/Auth/AuthModal";
import { useAuth } from "./contexts/AuthContext";

function AppContent() {
  const [activeTab, setActiveTab] = useState("home");
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading } = useAuth();

  // Check for panic mode on app load
  useEffect(() => {
    const panicMode = localStorage.getItem('emergency_panic_mode');
    if (panicMode === 'true') {
      console.log('Panic mode enabled - emergency alerts will be sent automatically');
    }
  }, []);

  // Show auth modal only when explicitly requested (removed auto-show)
  // Users can now use the app without authentication

  const handleEmergencyClick = () => {
    const panicMode = localStorage.getItem('emergency_panic_mode');
    
    if (panicMode === 'true') {
      setShowEmergencyAlert(true);
    } else {
      setShowEmergencyAlert(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Wanderlust...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "discover":
        return <DiscoverPage />;
      case "community":
        return <CommunityPage />;
      case "map":
        return <MapPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - hidden on map page for full screen experience */}
      {activeTab !== "map" && <Header onShowAuth={() => setShowAuthModal(true)} />}
      
      {/* Main Content */}
      <main className={`${activeTab !== "map" ? "pt-16 pb-20" : "pb-20"}`}>
        {renderContent()}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Emergency Button - floating button always visible */}
      <EmergencyButton onClick={handleEmergencyClick} />
      
      {/* Emergency Alert Dialog */}
      <EmergencyAlert 
        isOpen={showEmergencyAlert} 
        onClose={() => setShowEmergencyAlert(false)} 
      />
      
      {/* Auth Modal - now optional */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}