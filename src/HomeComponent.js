import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser, addDriver, updateDriver, deleteDriver } from './provider/redux/actions';
import { Button, TextInput, Appbar, Card, Snackbar } from 'react-native-paper';
import { AppColors, setWidth } from './provider/AppColors';

// Input Section
const InputSection = React.memo(({ name, isDriver, isEditing, handleInputChange, handleAddEntry, handleUpdateEntry, toggleUserDriver }) => (
  <View>
    <TextInput
      style={styles.input}
      label={isDriver ? "Driver Name" : "User Name"}
      value={name}
      onChangeText={handleInputChange}
      mode="outlined"
      activeOutlineColor="#6200ee"
      placeholder="Enter name"
      placeholderTextColor={AppColors.blackColor}
    />

    <Button
      mode="contained"
      onPress={isEditing ? handleUpdateEntry : handleAddEntry}
      style={styles.button}
      contentStyle={styles.buttonContent}
    >
      {isEditing ? "Update Entry" : "Add Entry"}
    </Button>

    <Button
      mode='outlined'
      onPress={toggleUserDriver}
      style={styles.switchButton}
    >
      Switch to {isDriver ? 'User' : 'Driver'}
    </Button>
  </View>
));

// Entry List
const EntryList = React.memo(({ data, handleEditEntry, handleDeleteEntry, isDriver }) => {

  return( <FlatList
    showsVerticalScrollIndicator={false}
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardText}>{item.name}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleEditEntry(item)}>Edit</Button>
          <Button onPress={() => handleDeleteEntry(item)} >Delete</Button>
        </Card.Actions>
      </Card>
    )}
  />)
});

// Snackbar Notification
const SnackbarNotification = ({ snackbarVisible, snackbarMessage, hideSnackbar }) => (
  <Snackbar
  wrapperStyle={{position:'absolute',
    top:0,
    zIndex:999,
  }}
  
    style={{    
      width: setWidth(96),
      backgroundColor: AppColors.themeColor
    }}
    
    visible={snackbarVisible}
    onDismiss={hideSnackbar}
    duration={Snackbar.DURATION_SHORT}
  >
    {snackbarMessage}
  </Snackbar>
);

const HomeComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.sort((a, b) => b.id - a.id));
  const drivers = useSelector((state) => state.drivers?.sort((a, b) => b.id - a.id));

  const [name, setName] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Memoized version of the list
  const memoizedUsers = useMemo(() => users, [users]);
  const memoizedDrivers = useMemo(() => drivers, [drivers]);

  const handleInputChange = (name) => setName(name);

  const handleAddEntry = () => {
    if (!name.trim()) {
      showSnackbar('Please enter a name.');
      return;
    }

    const entry = { id: Date.now().toString(), name, isDriver };
    
    isDriver ? dispatch(addDriver(entry)) : dispatch(addUser(entry));
    resetForm();
    showSnackbar(`${isDriver?`Driver`:`User`} Added Successfully`)
  };

  const handleUpdateEntry = () => {
    if (!name.trim()) {
      showSnackbar('Please enter a name.');
      return;
    }

    isDriver ? dispatch(updateDriver(selectedId, { name })) : dispatch(updateUser(selectedId, { name }));
    resetForm();
    showSnackbar(`${isDriver?`Driver`:`User`} Updated Successfully`)
  };

  const handleEditEntry = useCallback((item) => {
    setName(item.name);
    setSelectedId(item.id);
    setIsDriver(item.isDriver);
    setIsEditing(true);
   
  },[users]);

  const handleDeleteEntry = useCallback((item) => {
    Alert.alert(
      `Delete ${isDriver?"Driver":"User"}`,
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () =>{
           (item.isDriver ? dispatch(deleteDriver(item.id)) : dispatch(deleteUser(item.id)))
           showSnackbar("Deleted Successfully")
          }}
      ]
    );
  },[users]);

  const resetForm = () => {
    setName('');
    setIsEditing(false);
    setSelectedId(null);
    
  };

  const toggleUserDriver = useCallback(() => {
    setIsDriver(!isDriver);
    setIsEditing(false);
    setSelectedId(null);
    setName('')
  });

  const showSnackbar = (message) => {
    setSnackbarVisible(true);
    setSnackbarMessage(message);
  };

  const hideSnackbar = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="User & Driver Management" />
      </Appbar.Header>

      {/* Input Section */}
      <InputSection
        name={name}
        isDriver={isDriver}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
        handleAddEntry={handleAddEntry}
        handleUpdateEntry={handleUpdateEntry}
        toggleUserDriver={toggleUserDriver}
      />

      {/* User List or Driver List based on switch */}
      <Text style={styles.header}>{isDriver ? "Drivers" : "Users"}</Text>
      <EntryList
        data={isDriver ? memoizedDrivers : memoizedUsers}
        handleEditEntry={handleEditEntry}
        handleDeleteEntry={handleDeleteEntry}
        isDriver={isDriver}
      />

      {/* Snackbar Notification */}
      <SnackbarNotification
        snackbarVisible={snackbarVisible}
        snackbarMessage={snackbarMessage}
        hideSnackbar={hideSnackbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  input: {
   color: AppColors.blackColor,
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
  buttonContent: {
    height: 50,
  },
  switchButton: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    color: AppColors.themeColor,
  },
  card: {
    width:'100%',
    margin:10,
    alignSelf:'center',
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 18,
    color: AppColors.blackColor,
  },
});

export default HomeComponent;
