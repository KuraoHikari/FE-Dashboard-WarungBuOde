import { useState, useEffect } from "react";
function OfflineHandler() {
 const [isOnline, setIsOnline] = useState(navigator.onLine);

 useEffect(() => {
  const goOnline = () => setIsOnline(true);
  const goOffline = () => setIsOnline(false);

  window.addEventListener("online", goOnline);
  window.addEventListener("offline", goOffline);

  // Cleanup function to remove the event listeners
  return () => {
   window.removeEventListener("online", goOnline);
   window.removeEventListener("offline", goOffline);
  };
 }, []);
 if (!isOnline) {
  return <div>Please connect to a network to use our app.</div>;
 }
 return null;
}

export default OfflineHandler;
