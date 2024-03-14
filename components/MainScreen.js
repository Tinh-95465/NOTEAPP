import React, { useState } from 'react';
import Note from './Node'; 
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const MainScreen = () => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');

  const addNote = () => {
    if (inputText.trim() !== '') {
      setNotes([...notes, { id: Date.now().toString(), text: inputText }]);
      setInputText('');
    }
  };

  const deleteNote = id => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id, newText) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return { ...note, text: newText };
      }
      return note;
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Add a new note..."
      />
      <Button title="Add Note" onPress={addNote} />
      <FlatList
        data={notes}
        renderItem={({ item }) => <Note note={item} onDelete={() => deleteNote(item.id)} onSave={updateNote} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MainScreen;
