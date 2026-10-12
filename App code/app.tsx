import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Interface defining a Menu Item structure
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

export default function App() {
  // --- Form State ---
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string>('Starter');
  const [price, setPrice] = useState<string>('');

  // --- App Data State ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Available Course Categories
  const courses: string[] = ['Starter', 'Main', 'Dessert'];

  // Handle Form Submission and Input Validation
  const handleAddMenuItem = () => {
    // Reset notification states
    setErrorMessage('');
    setSuccessMessage('');

    // Validation 1: Required Fields Check
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Validation 2: Price must be a valid positive number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Please enter a valid numeric price greater than 0.');
      return;
    }

    // Construct New Menu Item Object
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: parsedPrice,
    };

    // Update List & Clear Form Inputs
    setMenuItems((prevItems) => [newItem, ...prevItems]);
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    
    // Set UX Success Feedback
    setSuccessMessage(`"${newItem.name}" added to the menu!`);
    
    // Auto-clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CHEF CHRISTOFFEL'S MENU</Text>
          <Text style={styles.headerSubtitle}>Menu Item Manager</Text>
        </View>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          
          // Form Section embedded as List Header
          ListHeaderComponent={
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Add New Menu Item</Text>

              {/* Success Banner */}
              {successMessage ? (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>✓ {successMessage}</Text>
                </View>
              ) : null}

              {/* Error Banner */}
              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
                </View>
              ) : null}

              {/* Dish Name Input */}
              <Text style={styles.label}>Dish Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Grilled BBQ Chicken"
                value={dishName}
                onChangeText={setDishName}
              />

              {/* Description Input */}
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter item description..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />

              {/* Course Selector Dropdown */}
              <Text style={styles.label}>Course Category *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={course}
                  onValueChange={(itemValue) => setCourse(itemValue)}
                  style={styles.picker}
                >
                  {courses.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>

              {/* Price Input */}
              <Text style={styles.label}>Price (R) *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 125.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />

              {/* Add Item Button */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddMenuItem}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>Save Menu Item</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Current Menu Items ({menuItems.length})</Text>
            </View>
          }

          // Render Item Component
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.priceTag}>R {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.course.toUpperCase()}</Text>
              </View>
              <Text style={styles.dishDescription}>{item.description}</Text>
            </View>
          )}

          // Empty List UI State
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No menu items added yet</Text>
              <Text style={styles.emptySubtitle}>
                Fill out the form above and tap "Save Menu Item" to display items here.
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
    letterSpacing: 1.2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 14,
    marginTop: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    marginBottom: 14,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  successBox: {
    backgroundColor: '#DEF7EC',
    borderColor: '#31C48D',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  successText: {
    color: '#03543F',
    fontSize: 13,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#FDE8E8',
    borderColor: '#F98080',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    color: '#9B1C1C',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5A5F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
    flex: 1,
  },
  priceTag: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2B6CB0',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4A5568',
  },
  dishDescription: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
  },
});