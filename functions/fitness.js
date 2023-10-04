import { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { updateUserData, FirebaseAuth } from './firebaseConfig';  // Import your Firebase function
import { arrayUnion } from 'firebase/firestore'; 


export const useSteps = () => {
  const [steps, setSteps] = useState(0);
    const uid = FirebaseAuth.currentUser.uid;  // Get the current user's ID
    
    
    const permissionsExpo = async () => {
         console.log(await Pedometer.getPermissionsAsync())
    }

  useEffect(() => {
    const today = new Date().toDateString();  // Get today's date as a string
    permissionsExpo()
    let subscription;
    const subscribe =  () => {
      subscription =  Pedometer.watchStepCount(data => {
        setSteps(prevSteps => {
          const newSteps = prevSteps + data.steps;
        
          // Update Firestore
          const newEntry = { date: today, steps: newSteps };
          updateUserData(uid, {
            dailySteps: arrayUnion(newEntry)
          }).catch((error) => {
            console.error("Error updating Firestore: ", error);
          });

          return newSteps;
        });
      });
    };

    // Subscribe
    subscribe();

    // Unsubscribe when not needed
    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return steps;
};
