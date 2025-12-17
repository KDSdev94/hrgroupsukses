/**
 * Utility Script: Sync Firebase Auth Users to Firestore Admins Collection
 *
 * This script helps migrate existing Firebase Auth users to the Firestore admins collection.
 * Run this once to ensure all existing admins are in the database.
 *
 * Usage:
 * 1. Open browser console on admin dashboard
 * 2. Copy and paste this entire script
 * 3. Call: await syncAuthUsersToFirestore()
 */

import { auth, db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export const syncAuthUsersToFirestore = async () => {
  console.log("Starting sync of Firebase Auth users to Firestore...");

  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("No user is currently logged in. Please login first.");
      return;
    }

    // Check if current user exists in Firestore
    const q = query(
      collection(db, "admins"),
      where("uid", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Add current user to Firestore
      await addDoc(collection(db, "admins"), {
        uid: currentUser.uid,
        name: currentUser.displayName || currentUser.email.split("@")[0],
        email: currentUser.email,
        role: "super_admin",
        status: "active",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(
        `✅ Added ${currentUser.email} to Firestore admins collection`
      );
    } else {
      console.log(`ℹ️ ${currentUser.email} already exists in Firestore`);
    }

    console.log("✅ Sync completed successfully!");
    console.log("Current user has been added to admins collection.");
  } catch (error) {
    console.error("❌ Error syncing users:", error);
  }
};

// Auto-run if this file is imported
console.log(
  "Admin sync utility loaded. Run syncAuthUsersToFirestore() to sync current user."
);
