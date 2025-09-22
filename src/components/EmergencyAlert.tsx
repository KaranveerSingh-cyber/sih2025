import { useState } from "react";
import { AlertTriangle, Phone, X, Shield } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { supabase } from "../utils/supabase/client";
import { projectId } from "../utils/supabase/info";

interface EmergencyAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyAlert({ isOpen, onClose }: EmergencyAlertProps) {
  const [panicMode, setPanicMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendAlert = async () => {
    setIsLoading(true);
    
    try {
      // Get user's location (approximate for privacy)
      const location = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000
        });
      });

      // Create approximate location (privacy protection)
      const approxLocation = {
        lat: Math.round(location.coords.latitude * 100) / 100,
        lng: Math.round(location.coords.longitude * 100) / 100
      };

      // Send alert to backend (authenticated users) or simulate for anonymous users
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2e9e596/emergency-alert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            location: approxLocation,
            message: 'Emergency assistance needed'
          }),
        });

        if (response.ok) {
          // Save panic mode preference
          if (panicMode) {
            localStorage.setItem('emergency_panic_mode', 'true');
          }
          
          alert('Emergency alert sent to nearby helpers. Stay safe!');
          onClose();
        } else {
          throw new Error('Failed to send alert');
        }
      } else {
        // Anonymous user - simulate emergency alert
        console.log('Anonymous emergency alert:', { location: approxLocation });
        
        // Save panic mode preference
        if (panicMode) {
          localStorage.setItem('emergency_panic_mode', 'true');
        }
        
        alert('Emergency alert simulated (sign in for real alerts). Please call emergency services if needed!');
        onClose();
      }
    } catch (error) {
      console.error('Emergency alert error:', error);
      alert('Failed to send alert. Please try again or call emergency services.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallEmergency = () => {
    // In a real app, this would initiate a phone call
    // For web apps, we can open the phone dialer
    window.location.href = 'tel:911';
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle size={24} className="text-red-500" />
            <span>🚨 Emergency Help</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3 pt-2">
            <p>
              Do you need immediate help? Nearby helpers will be notified anonymously. 
              Your exact location will not be shared for safety.
            </p>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Shield size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Privacy Protection:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Only approximate area (300-500m radius) is shared</li>
                    <li>• Your identity remains anonymous</li>
                    <li>• You can cancel or escalate anytime</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              You can also cancel or escalate to emergency services anytime.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col space-y-3">
          {/* Panic Mode Checkbox */}
          <div className="flex items-center space-x-2 w-full">
            <Checkbox 
              id="panic-mode" 
              checked={panicMode}
              onCheckedChange={(checked) => setPanicMode(checked as boolean)}
            />
            <label 
              htmlFor="panic-mode" 
              className="text-sm text-gray-600 cursor-pointer"
            >
              Send alert automatically without confirmation next time
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 w-full">
            <Button 
              onClick={handleSendAlert}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Alert...</span>
                </div>
              ) : (
                'Send Alert'
              )}
            </Button>
            
            <Button 
              onClick={handleCallEmergency}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
            >
              <Phone size={16} className="mr-2" />
              Call Emergency Services
            </Button>
            
            <AlertDialogCancel className="w-full mt-2">
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Floating Emergency Button Component
interface EmergencyButtonProps {
  onClick: () => void;
}

export function EmergencyButton({ onClick }: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    onClick();
  };

  return (
    <button
      onClick={handlePress}
      className={`fixed bottom-24 right-4 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-200 ${
        isPressed ? 'scale-95' : 'scale-100'
      } hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300`}
      aria-label="Emergency Alert"
    >
      <AlertTriangle size={24} className="text-white" />
    </button>
  );
}