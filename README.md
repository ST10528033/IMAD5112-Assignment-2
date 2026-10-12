# IMAD5112-Assignment-2

Go to Master Branch

Chef's Menu Manager — React Native Mobile Application
Student Name: Jessel Sookha   
Student ID: ST10528033   
Module: MAST5112 — Mobile App Scripting (POE Part 2)   
Institution: The Independent Institute of Education (Pty) Ltd   

Project Overview
Chef's Menu Manager is a React Native mobile application designed specifically for Chef Christoffel to digitally manage and present his restaurant's menu.   

This submission represents Part 2 of the Portfolio of Evidence (POE), delivering a functional mobile app prototype that captures new menu items and dynamically displays them in a structured list view.   

Features Implemented (Part 2)
1. User Interface Design (30 Marks)
Clear application header displaying "CHEF CHRISTOFFEL'S MENU".   
Clean layout with consistent spacing, padding, and typography optimized for mobile devices.   
Styled container cards with dynamic course badges.   

2. Menu Data Capture (25 Marks)
Captures all required details using custom-styled input controls:   
Dish Name: Text input for the title of the dish.   
Description: Multi-line text input for dish ingredients and details.   
Course Category: Dropdown menu selector using @react-native-picker/picker (Starter, Main, Dessert).   
Price: Numeric input field for dish pricing in South African Rands (R).   

3. Dynamic Menu Display (25 Marks)
Built using React Native <FlatList> for high-performance list rendering.   
Displays all added items instantly with real-time UI re-rendering.   
Live counter showing total active menu items.   

4. User Experience & Validation (20 Marks)
Form Validation: Checks for empty inputs and validates numeric price entries.   
Error Alerts: Displays styled inline warning messages for invalid inputs.   
Success Banners: Temporary green success alert confirming item additions.   
Empty State: Dedicated visual placeholder when no menu items exist.   

Tech Stack & Dependencies
Framework: React Native (TypeScript)   
Platform: iOS & Android
UI Components: React Native Core Components (View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView)   
Dropdown Selector: @react-native-picker/picker

Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

Expo CLI or React Native CLI
